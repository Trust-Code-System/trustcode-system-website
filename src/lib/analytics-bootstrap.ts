import { analyticsUrl, GA_MEASUREMENT_ID } from "./analytics-consent";

export type AnalyticsQueue = {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

// Queue settings before gtag.js can load. Initializing in Script.onReady is too
// late: the tag can already emit an automatic, unredacted first page view.
export function prepareAnalytics(target: AnalyticsQueue, page: string, referrer: string) {
  target.dataLayer = target.dataLayer || [];
  // Match Google's Arguments-based command queue.
  // eslint-disable-next-line prefer-rest-params
  target.gtag = function () { target.dataLayer!.push(arguments); };
  target.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  target.gtag("js", new Date());
  target.gtag("set", { page_location: analyticsUrl(page), page_referrer: analyticsUrl(referrer) });
  target.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false, allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
}
