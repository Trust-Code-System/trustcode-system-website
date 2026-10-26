# Current validation

The lab and previous project collection have been removed. Historical lab verification does not describe the current site.

Verified on 26 October 2026:

- Application TypeScript and ESLint pass.
- Vitest: 9 tests pass (contact API validation/delivery mocks and the unpublished portfolio contract).
- Optimized production build passes: 23 generated pages. Home first-load JavaScript is 248 kB; this is a build measurement, not a field-performance score.
- Edge desktop, 390 px and 320 px: no horizontal overflow; navigation and companion layout inspected.
- Desktop hero mounts three canvas layers; phones mount one. Hero canvases are removed offscreen and with motion disabled. OS reduced motion skips the curtain and animated hero.
- Header hides when scrolling down and returns upward. Mobile menu opens and dismisses with Escape.
- Curtain replay, automatic completion, Skip and Escape verified.
- Companion opens with composer focus; Escape closes and returns focus to the launcher. Phone panel margins and footer navigation overlap were corrected and checked.
- Card Nav: three grouped cards and CTA inspected at 390 px and 320 px; Escape and outside taps dismiss it. Desktop Gooey Nav follows client-side route changes and is not mounted on phones. Compact desktop checked at 1024 px.
- Outside-chat taps dismiss the panel while allowing the page control to act. Draft text survives dismissal and reopening.
- Locally intercepted chat responses verify Thought Line waiting, receiving, completion/collapse and failure states. Sling Button tap and Enter submit; an armed pull submits exactly one request, while a short pull cancels. These are UI network mocks, not live model replies.
- Optimized-build timer check: reopening a pending request showed 18.7 seconds after initially showing 0.2 seconds; completed duration remained 19.5 seconds across another close/reopen. Motion-off and OS reduced motion both leave all three phone navigation cards visible and usable.
- Optimized local HTTP checks: main/work/services/contact return 200; removed lab routes and sampled old project URLs return 404. Sitemap has no lab or project detail URLs.

The assistant's backend was preserved; no live model response was requested during this UI verification. Preview access remains subject to Vercel deployment protection. Browser checks are representative, not an exhaustive GPU/device benchmark.
