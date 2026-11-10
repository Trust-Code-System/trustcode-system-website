# TrustCode project-start and pricing review — 10 November 2026

Status: local review only, on `feat/clear-project-start`, based on fetched `origin/main` at `85dbaeb`. No commit, push, PR, merge or deployment was performed after the user changed the release instruction to review first.

## Changes

- One approved NGN rate card (`src/lib/pricing.ts`) feeds the Services price cards, every planner type, add-on estimates, Contact guide, FAQ and assistant knowledge. Monthly care stays labelled per month. Standard-scope disclaimers, separate third-party costs, payment milestones, ownership and the approved support period share that same source.
- Build / Run / Protect now lead service discovery. All seven existing service hash links and contact service slugs remain compatible. Training stays findable as a secondary capability.
- Home has reusable planner entry cards, ownership/payment/demo/scope reassurance, a small price strip, shared FAQ, consistent project actions and complete team names. Selected projects and original portraits/logo remain.
- Motion preference hydration resolves before paint; the switch reserves its footprint until ready. The hero waits for the entrance release before its Fold Text reveal. Explicit opt-out, OS reduced motion and unavailable storage remain supported.
- Company location, response window, NELO actions, proof counts and metadata are consistent. Unsupported company-office and production/client-result claims were removed. London remains in the actual founder biography.
- Planner choices survive Back/Next and navigation. The validated URL fragment handoff also works without storage. Contact drafts survive reload/navigation and failed submissions. Assistant text-only prefill is persisted; server field errors return to the relevant form step.
- International price fields and an OFF flag are prepared; no USD/GBP commercial rates are published. The verified 15-minute Calendly event is now configured once in `src/content/sales.ts`; shared booking actions and assistant knowledge read the same URL.

## Verification

- `pnpm test`: 22 passing tests across five files, including API email formatting, all planner types, migration, pricing consistency and add-on deduplication.
- `pnpm build` with `NEXT_DIST_DIR=.next-review`: production compilation, lint and type validation pass; 26 generated pages. `pnpm lint` and `pnpm typecheck` were also run explicitly. The existing Edge-runtime/static-generation notice is informational.
- Official connected Chrome 157 browser, Windows. All 18 public content routes plus the 404 fallback were navigated and scrolled at 1440px desktop and 390px emulated phone. No document overflow, broken images, duplicate IDs (desktop check), invalid project-start destinations or unexpected failed resources were found in those checks.
- Header containment: 320, 390, 768, 824, 880, 960, 961, 1024, 1201, 1280 and 1920px. Motion ON/OFF; mobile menus closed/open. All 34 sampled states kept visible controls within the header bar. Hidden/inert links were excluded.
- Fresh first paint: root motion was ON while the initial switch was hidden; the first visible switch was checked ON. No visible OFF frame was sampled. The curtain held the hero, opened and released it; three hero atmosphere canvases were present afterward. No application error occurred in the recorded sample.
- Remembered OFF: reload kept the switch OFF, skipped the curtain, rendered readable hero text and mounted no hero canvases. OS reduced motion also kept motion OFF despite a saved ON choice.
- Storage unavailable: fresh motion/entrance completed safely; the Contact fragment retained service, type, feature, budget and brief, then removed the fragment.
- Entrance replay, Escape skip and visible Skip control worked. A cache-bypassed reload with 4× CPU and Fast 4G emulation completed with the hero, three effects and no overflow. Overrides were cleared afterward.
- Home Online store link selected the correct planner type. Phone/desktop Back/Next retained feature, timeline and numeric budget; reload retained Contact name, email, service, budget and message.
- Mocked local contact responses: loading disabled Send, a simulated 500 retained answers, retry used the identical payload, success cleared Contact/planner drafts and reset the form. No real enquiry was sent.
- Shared FAQ with site motion OFF showed intermediate height/opacity frames and the correct approved payment text. All seven service hashes selected their corresponding details. Footer markers measured 17.5px in OFF mode. Header hid on downward scroll and returned upward. Companion Escape/outside dismissal and typed draft retention worked without sending a model request.
- Contact selects remained body portals inside the phone viewport. Keyboard budget selection used Home, arrows and Enter. Escape and subsequent focused keyboard checks were included in the final smoke pass.
- Desktop (1440px) and phone (390px) screenshots cover the Services pricing section, care/security/add-ons/terms, all four planner steps and the Contact form. Captures are original browser images; some are element captures within those viewports. The full initial baseline includes unvisited scroll-triggered content, so blank reveal areas in it are not evidence of missing source content.

## Limits

No production deployment or Vercel/CI preview was triggered under the review hold. Chrome viewport/touch emulation is not physical-device testing; Edge, Safari and physical iOS/Android were not tested in this pass. Live email delivery and paid assistant/model answers were not exercised; pricing prompt content was checked against the shared data instead. Local Vercel Analytics and Speed Insights scripts return the expected two 404s because this is a local Next server; the deliberate missing-page route returns 404 as expected.

Booking follow-up (10 November 2026): the company Google calendar is connected as the conflict-check and booking destination. The saved event uses Google Meet, lasts 15 minutes and retains Monday–Friday 09:00–17:00 West Africa Time availability. The public booking page was verified in Edge at 1440px and 390px. No test meeting was booked, so generated invitation delivery and a live Meet session were not exercised. Booking URL: https://calendly.com/hello-trustcodesystem/15min. The follow-up production build (`NEXT_DIST_DIR=.next-booking-review pnpm build`) and all 22 tests passed. Contact and planner final-step buttons were checked in Edge at 1440px and 390px, with no console warnings or errors recorded in those page checks and no horizontal overflow on phone. Updated screenshots are included in the gallery. Website changes remain local and unpublished.
