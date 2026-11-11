import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { recordAcceptedEnquiry } from "./analytics-leads";
import { CONSENT_MAX_AGE, GA_MEASUREMENT_ID } from "./analytics-consent";

const accepted = { ok: true, leadAccepted: true };
let choice: string | null;
let target: {
  location: { hostname: string; href: string };
  localStorage: { getItem: ReturnType<typeof vi.fn> };
  gtag?: ReturnType<typeof vi.fn>;
  [key: string]: unknown;
};

beforeEach(() => {
  choice = JSON.stringify({ choice: "accepted", savedAt: Date.now() });
  target = {
    location: {
      hostname: "trustcodesystem.tech",
      href: "https://trustcodesystem.tech/contact?email=private%40example.com#brief=confidential",
    },
    localStorage: { getItem: vi.fn(() => choice) },
    gtag: vi.fn(),
  };
  vi.stubGlobal("window", target);
});

afterEach(() => vi.unstubAllGlobals());

describe("completed enquiry analytics", () => {
  it("queues one recommended event with only approved parameters, not receipt or form data", () => {
    expect(
      recordAcceptedEnquiry({
        ...accepted,
        name: "Private",
        email: "private@example.com",
        message: "confidential",
        value: 999999,
      }),
    ).toBe(true);
    expect(target.gtag).toHaveBeenCalledTimes(1);
    expect(target.gtag).toHaveBeenCalledWith("event", "generate_lead", {
      lead_source: "website_enquiry",
      page_location: "https://trustcodesystem.tech/contact",
    });
  });

  it.each([
    undefined,
    null,
    {},
    { ok: true },
    { ok: false, leadAccepted: true },
    { ok: true, leadAccepted: false },
    { ok: true, leadAccepted: "true" },
  ])("ignores a non-accepted response: %j", (receipt) => {
    expect(recordAcceptedEnquiry(receipt)).toBe(false);
    expect(target.gtag).not.toHaveBeenCalled();
  });

  it.each([
    null,
    "broken",
    JSON.stringify({ choice: "declined", savedAt: Date.now() }),
    JSON.stringify({
      choice: "accepted",
      savedAt: Date.now() - CONSENT_MAX_AGE - 1000,
    }),
  ])("requires current consent when the response arrives: %s", (raw) => {
    choice = raw;
    expect(recordAcceptedEnquiry(accepted)).toBe(false);
    expect(target.gtag).not.toHaveBeenCalled();
  });

  it.each([
    "localhost",
    "trustcode-preview.vercel.app",
    "trustcodesystem.tech.example.com",
  ])("excludes nonproduction host %s", (hostname) => {
    target.location.hostname = hostname;
    expect(recordAcceptedEnquiry(accepted)).toBe(false);
    expect(target.gtag).not.toHaveBeenCalled();
  });

  it("honours immediate withdrawal even if a tag function still exists", () => {
    target[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    expect(recordAcceptedEnquiry(accepted)).toBe(false);
    expect(target.gtag).not.toHaveBeenCalled();
  });

  it("does not interfere with an enquiry if storage or the tag is unavailable", () => {
    target.localStorage.getItem.mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(recordAcceptedEnquiry(accepted)).toBe(false);
    target.localStorage.getItem.mockImplementation(() => choice);
    delete target.gtag;
    expect(recordAcceptedEnquiry(accepted)).toBe(false);
    target.gtag = vi.fn(() => {
      throw new Error("blocked");
    });
    expect(recordAcceptedEnquiry(accepted)).toBe(false);
  });
});
