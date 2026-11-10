# Website analytics

The website includes consent-gated Google Analytics alongside the existing Vercel usage and performance tools. The visitor notice distinguishes these services.

- The Google tag loads only on `trustcodesystem.tech` and `www.trustcodesystem.tech`, after an explicit analytics acceptance. Local and preview visits do not populate production reports.
- The browser stores the choice for 180 days. Expired, malformed, future-dated or inaccessible stored choices do not grant consent.
- Footer **Analytics settings** reopens the choices. Withdrawing a saved acceptance disables the tag, clears first-party `_ga` cookies and reloads without it.
- Page views are emitted for the initial accepted visit and App Router pathname changes. Query strings/fragments are removed from page locations and referrers.
- `contact_click` records only `contact_method`: `whatsapp`, `email`, `phone` or `booking`. It never includes the raw destination URL, link text, form data or prefilled message. A click is intent, not proof of a completed enquiry.
- Google signals and ad personalization are disabled in the tag configuration. Do not add Google Ads or marketing tags through this integration without a separate change.
- Keep **Enhanced measurement off** in the GA4 web stream: the website emits its own page views and contact-click events. This avoids duplicate SPA page views and automatic collection of URLs containing prefilled messages.
- Do not add a second gtag or Tag Manager snippet alongside this integration.

Code: `src/components/google-analytics.tsx`; consent/URL helpers: `src/lib/analytics-consent.ts`; visitor copy: `src/content/privacy.ts`; public notice: `/privacy`.

Before release: run typecheck, lint, tests and a production build. Check the banner at desktop/mobile sizes, decline persistence, reopening settings, acceptance and withdrawal. After production deployment, accept on a test visit and verify the correct measurement ID in GA4 Realtime; navigate to another route and check for a single page-view event. Verify that no Google tag/request appears before acceptance or after declining. Local/preview checks cannot confirm incoming production data.

References: [Google basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode), [Next.js Script](https://nextjs.org/docs/app/api-reference/components/script).
