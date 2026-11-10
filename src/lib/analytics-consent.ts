export const GA_MEASUREMENT_ID = "G-6KT3X32JXE";
export const CONSENT_KEY = "trustcode-analytics-consent-v1";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsChoice = "accepted" | "declined";

export function readAnalyticsChoice(raw: string | null, now = Date.now()): AnalyticsChoice | null {
  try {
    const value = JSON.parse(raw ?? "null");
    if (
      (value?.choice === "accepted" || value?.choice === "declined") &&
      typeof value.savedAt === "number" &&
      value.savedAt <= now && now - value.savedAt < CONSENT_MAX_AGE
    ) return value.choice;
  } catch { /* Missing or invalid storage means no consent. */ }
  return null;
}

// URLs can contain names, email addresses or project briefs. Only public paths
// are used in page-location/referrer values; queries and fragments are dropped.
export function analyticsUrl(value: string): string {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch { return ""; }
}
