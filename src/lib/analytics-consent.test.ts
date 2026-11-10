import { describe, expect, it } from "vitest";
import { analyticsUrl, CONSENT_MAX_AGE, readAnalyticsChoice } from "./analytics-consent";

describe("analytics consent boundary", () => {
  const now = 1800000000000;
  it("requires a valid, current explicit choice", () => {
    for (const raw of [null, "broken", "null", JSON.stringify({ choice: "accepted" }), JSON.stringify({ choice: "yes", savedAt: now }), JSON.stringify({ choice: "accepted", savedAt: now + 1 }), JSON.stringify({ choice: "accepted", savedAt: now - CONSENT_MAX_AGE })]) {
      expect(readAnalyticsChoice(raw, now)).toBeNull();
    }
    expect(readAnalyticsChoice(JSON.stringify({ choice: "accepted", savedAt: now - 1 }), now)).toBe("accepted");
    expect(readAnalyticsChoice(JSON.stringify({ choice: "declined", savedAt: now }), now)).toBe("declined");
  });
  it("removes potentially private query and fragment information", () => {
    expect(analyticsUrl("https://trustcodesystem.tech/contact?email=someone%40example.com&brief=private#personal-details")).toBe("https://trustcodesystem.tech/contact");
    expect(analyticsUrl("https://example.com/path?secret=123#fragment")).toBe("https://example.com/path");
    expect(analyticsUrl("")).toBe("");
  });
});
