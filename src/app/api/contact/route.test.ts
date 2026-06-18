import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const basePayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines Ltd",
  service: "ai-integration",
  budget: "$5k-$15k",
  siteType: "AI-powered tool",
  goal: "Get leads & inquiries",
  startingPoint: "Brand new - starting fresh",
  designVibe: "Clean & minimal",
  features: ["AI features", "Email notifications"],
  timeline: "1-3 months",
  inspiration: "https://example.com",
  message: "We need a production-ready AI workflow for client intake.",
  website: "",
};

async function loadPost() {
  vi.resetModules();
  const mod = await import("./route");
  return mod.POST;
}

function contactRequest(body: unknown, ip = "203.0.113.10") {
  return new Request("https://trustcode.test/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function mockResend(status = 200, body = "{}") {
  const fetchMock = vi.fn<typeof fetch>(
    async () => new Response(body, { status })
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_TO_EMAIL = "hello@example.com";
  process.env.CONTACT_FROM_EMAIL = "TrustCode <hello@example.com>";
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.CONTACT_FROM_EMAIL;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
});

describe("POST /api/contact", () => {
  it("sends valid contact submissions through Resend", async () => {
    const POST = await loadPost();
    const fetchMock = mockResend();

    const response = await POST(contactRequest(basePayload));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [, init] = fetchMock.mock.calls[0]!;
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer re_test",
      "Content-Type": "application/json",
    });

    const sentBody = JSON.parse(String(init?.body));
    expect(sentBody).toMatchObject({
      from: "TrustCode <hello@example.com>",
      to: ["hello@example.com"],
      reply_to: basePayload.email,
    });
    expect(sentBody.subject).toContain("AI Integration & Automation");
    expect(sentBody.text).toContain(basePayload.message);
  });

  it("rejects invalid JSON", async () => {
    const POST = await loadPost();
    const fetchMock = mockResend();

    const response = await POST(contactRequest("{not-json"));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json).toEqual({ ok: false, error: "Invalid request." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns field errors for invalid contact input", async () => {
    const POST = await loadPost();
    const fetchMock = mockResend();

    const response = await POST(
      contactRequest({ ...basePayload, name: "A", email: "not-an-email" })
    );
    const json = await response.json();

    expect(response.status).toBe(422);
    expect(json.ok).toBe(false);
    expect(json.fields.name[0]).toContain("Please enter your name");
    expect(json.fields.email[0]).toContain("valid email");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions without sending email", async () => {
    const POST = await loadPost();
    const fetchMock = mockResend();

    const response = await POST(
      contactRequest({ ...basePayload, website: "https://spam.example" })
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rate limits repeated requests from the same IP", async () => {
    const POST = await loadPost();
    const fetchMock = mockResend();
    const ip = "198.51.100.42";

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(contactRequest(basePayload, ip));
      expect(response.status).toBe(200);
    }

    const limited = await POST(contactRequest(basePayload, ip));
    const json = await limited.json();

    expect(limited.status).toBe(429);
    expect(json).toEqual({
      ok: false,
      error: "Too many requests. Please try again in a minute.",
    });
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("uses the Redis-backed limiter when Upstash is configured", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://redis.example.com";
    process.env.UPSTASH_REDIS_REST_TOKEN = "upstash-test-token";

    const POST = await loadPost();
    const fetchMock = vi.fn<typeof fetch>(async (input) => {
      if (String(input).includes("/pipeline")) {
        return Response.json([{ result: 6 }, { result: 1 }]);
      }
      return new Response("{}", { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(contactRequest(basePayload));
    const json = await response.json();

    expect(response.status).toBe(429);
    expect(json).toEqual({
      ok: false,
      error: "Too many requests. Please try again in a minute.",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(String(url)).toBe("https://redis.example.com/pipeline");
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer upstash-test-token",
      "Content-Type": "application/json",
    });
  });

  it("reports a send failure when Resend rejects the request", async () => {
    const POST = await loadPost();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const fetchMock = mockResend(500, "resend unavailable");

    const response = await POST(contactRequest(basePayload));
    const json = await response.json();

    expect(response.status).toBe(502);
    expect(json).toEqual({
      ok: false,
      error: "We couldn't send your message. Please email us directly.",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
