import { NextResponse } from "next/server";
import { contactSchema, serviceOptions } from "@/lib/contact-schema";
import { site } from "@/content/site";

const WINDOW_SECONDS = 60;
const WINDOW_MS = WINDOW_SECONDS * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function localRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

async function redisRateLimited(ip: string): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const key = `contact:${ip}`;
  const res = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, WINDOW_SECONDS, "NX"],
    ]),
  });

  if (!res.ok) {
    throw new Error(`Rate-limit backend failed with ${res.status}`);
  }

  const result = (await res.json()) as Array<{ result?: unknown; error?: string }>;
  if (result[0]?.error) {
    throw new Error(result[0].error);
  }

  const count = Number(result[0]?.result);
  if (!Number.isFinite(count)) {
    throw new Error("Rate-limit backend returned an invalid count");
  }

  return count > MAX_PER_WINDOW;
}

async function rateLimited(ip: string): Promise<boolean> {
  try {
    const redisLimited = await redisRateLimited(ip);
    if (redisLimited !== null) return redisLimited;
  } catch (err) {
    console.error("Contact rate-limit backend failed:", err);
  }

  return localRateLimited(ip);
}

function serviceLabel(value: string): string {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (await rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot tripped — pretend success, drop silently.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const subject = `New project inquiry — ${serviceLabel(data.service)}`;

  const brief = [
    data.siteType ? `Type of site: ${data.siteType}` : null,
    data.goal ? `Main goal: ${data.goal}` : null,
    data.startingPoint ? `Starting from: ${data.startingPoint}` : null,
    data.designVibe ? `Design direction: ${data.designVibe}` : null,
    data.features && data.features.length
      ? `Features: ${data.features.join(", ")}`
      : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
    data.inspiration ? `Inspiration: ${data.inspiration}` : null,
  ].filter(Boolean);

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${serviceLabel(data.service)}`,
    data.budget ? `Budget: ${data.budget}` : null,
    ...(brief.length ? ["", "— Project brief —", ...brief] : []),
    "",
    "— Details —",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  // Send via Resend if configured; otherwise log so local dev still works.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "TrustCode <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("Resend error:", res.status, detail);
        return NextResponse.json(
          { ok: false, error: "We couldn't send your message. Please email us directly." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Contact send failed:", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please email us directly." },
        { status: 502 }
      );
    }
  } else {
    console.log("[contact] (no RESEND_API_KEY set) would send:\n", subject, "\n", text);
  }

  return NextResponse.json({ ok: true });
}
