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
- Optimized local HTTP checks: main/work/services/contact return 200; removed lab routes and sampled old project URLs return 404. Sitemap has no lab or project detail URLs.

The assistant's backend was preserved; no live model response was requested during this UI verification. Preview access remains subject to Vercel deployment protection. Browser checks are representative, not an exhaustive GPU/device benchmark.
