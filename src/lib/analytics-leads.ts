import {
  analyticsUrl,
  CONSENT_KEY,
  GA_MEASUREMENT_ID,
  readAnalyticsChoice,
} from "./analytics-consent";

/** Count only an enquiry accepted by the email provider, never a form click.
 * The receipt is not form data. Event parameters are a fixed allowlist.
 * Check consent again when the response arrives, since it may have changed.
 */
export function recordAcceptedEnquiry(
  receipt: unknown,
  submissionPage?: string,
): boolean {
  if (
    !receipt ||
    typeof receipt !== "object" ||
    !("ok" in receipt) ||
    receipt.ok !== true ||
    !("leadAccepted" in receipt) ||
    receipt.leadAccepted !== true ||
    typeof window === "undefined"
  )
    return false;

  try {
    if (
      !["trustcodesystem.tech", "www.trustcodesystem.tech"].includes(
        window.location.hostname,
      ) ||
      readAnalyticsChoice(window.localStorage.getItem(CONSENT_KEY)) !==
        "accepted" ||
      (window as unknown as Record<string, unknown>)[
        `ga-disable-${GA_MEASUREMENT_ID}`
      ] ||
      typeof window.gtag !== "function"
    )
      return false;

    window.gtag("event", "generate_lead", {
      lead_source: "website_enquiry",
      page_location: analyticsUrl(submissionPage ?? window.location.href),
    });
    return true;
  } catch {
    // Optional analytics must not affect a successful enquiry.
    return false;
  }
}
