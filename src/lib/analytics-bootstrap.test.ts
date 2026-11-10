import { describe, expect, it } from "vitest";
import { prepareAnalytics, type AnalyticsQueue } from "./analytics-bootstrap";
import { GA_MEASUREMENT_ID } from "./analytics-consent";

describe("Google tag initialization boundary", () => {
  it("queues consent, redacted URLs and automatic-page-view suppression before script loading", () => {
    const target: AnalyticsQueue = {};
    prepareAnalytics(target, "https://trustcodesystem.tech/contact?email=private@example.com#brief", "https://example.com/?private=information");
    const commands = target.dataLayer!.map(command => Array.from(command as ArrayLike<unknown>));
    expect(commands.map(command => command[0])).toEqual(["consent", "js", "set", "config"]);
    expect(commands[0][2]).toEqual({ analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    expect(commands[2][1]).toEqual({ page_location: "https://trustcodesystem.tech/contact", page_referrer: "https://example.com/" });
    expect(commands[3]).toEqual(["config", GA_MEASUREMENT_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false }]);
    expect(JSON.stringify(commands)).not.toContain("private");
    expect(commands.some(command => command[0] === "event")).toBe(false);
  });
  it("preserves an existing queue and supplies a working command function", () => {
    const prior = { existing: "command" };
    const target: AnalyticsQueue = { dataLayer: [prior] };
    prepareAnalytics(target, "https://trustcodesystem.tech/", "");
    expect(target.dataLayer![0]).toBe(prior);
    target.gtag!("event", "page_view", { page_location: "https://trustcodesystem.tech/" });
    expect(Array.from(target.dataLayer!.at(-1) as ArrayLike<unknown>)).toEqual(["event", "page_view", { page_location: "https://trustcodesystem.tech/" }]);
  });
});
