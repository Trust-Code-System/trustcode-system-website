# Current validation

The lab and previous project collection have been removed. Historical lab verification does not describe the current site.

Verified on 26 October 2026:

- Application TypeScript and ESLint pass.
- Vitest: 9 tests pass (contact API validation/delivery mocks, the three selected project destinations and removed-project contract).
- Optimized production build passes: 26 generated pages; Home first-load JavaScript is 260 kB. This is a build measurement, not a field speed score.
- Edge desktop, 390 px and 320 px: no horizontal overflow; navigation and companion layout inspected.
- Desktop hero mounts three canvas layers; phones mount one. Hero canvases are removed offscreen and with motion disabled. OS reduced motion skips the curtain and animated hero.
- Header hides when scrolling down and returns upward. Mobile menu opens and dismisses with Escape.
- Curtain replay, automatic completion, Skip and Escape verified.
- Companion opens with composer focus; Escape closes and returns focus to the launcher. Phone panel margins and footer navigation overlap were corrected and checked.
- Card Nav: three grouped cards and CTA inspected at 390 px and 320 px; Escape and outside taps dismiss it. Desktop Gooey Nav follows client-side route changes and is not mounted on phones. Compact desktop checked at 1024 px.
- Outside-chat taps dismiss the panel while allowing the page control to act. Draft text survives dismissal and reopening.
- Locally intercepted chat responses verify Thought Line waiting, receiving, completion/collapse and failure states. Sling Button tap and Enter submit; an armed pull submits exactly one request, while a short pull cancels. These are UI network mocks, not live model replies.
- Optimized-build timer check: reopening a pending request showed 18.7 seconds after initially showing 0.2 seconds; completed duration remained 19.5 seconds across another close/reopen. Motion-off and OS reduced motion both leave all three phone navigation cards visible and usable.
- Optimized local HTTP checks: Home, Work, Studio, Services, Contact and all three selected project pages return 200; removed lab routes and sampled old project URLs return 404. Sitemap includes the three new project detail URLs and excludes removed routes.

Latest polish checks: the hero eyebrow is absent, three Fold Text lines render, and desktop navigation center measures 630.996 px against a 631 px page center. The 320 px headline and footer have no horizontal overflow. Three footer Line Sidebar groups retain real links. Electric Border mounts only while motion-enabled chat is open. Contact Service selection works by ArrowDown/Enter; FAQ, service and process panels expand. Motion-off renders the static headline and no electric border.

The assistant's backend was preserved; no live model response was requested during this UI verification. Preview access remains subject to Vercel deployment protection. Browser checks are representative, not an exhaustive GPU/device benchmark.

## Selected-project release

- Real homepage captures and exact supplied external URLs are present for Sekibat Nig Limited, NELO Woman and Wearables by Ashabi. NELO is labelled Storefront preview. No project-specific technology stack or individual attribution is inferred.
- The technology Logo Loop exposes 17 named marks, self-hosted as SVGs; hover pause and the static motion-off state are provided by the source component and site preference.
- Home and Studio use static team portraits. The previously tested Lanyard presentation has been removed, along with its renderer and Three.js dependency.
- Star Border is present on enquiry links, including the phone menu CTA. The 320 px Card Nav CTA routes to Contact without horizontal overflow.
- The supplied Wearables by Ashabi site displayed a collection-unavailable notice during inspection. Its storefront appearance and navigation were inspected; inventory, checkout and purchase completion were not verified. No external project forms were submitted.

## Contact Stepper

The React Bits Stepper owns all three complete contact panels. Required-field errors prevent advancing and focus the first invalid input. Panel transitions retain name, email, company, selected service, project chips and message; each input ID appears once. A 320 px check keeps all three labels visible without horizontal overflow. A local intercepted submission confirms the complete payload includes values from hidden panels. Mocked failure preserves answers for retry; mocked success shows Brief received, and Send another message resets to a blank first step. No real enquiry was sent.

## Portraits, header and mascot correction

- Production build, TypeScript, lint and all 9 tests pass. Home and Studio render four static portraits, with no Lanyard elements or scenes.
- Insights: clicking the header navigation link left focus inside the header. After scrolling to y=1000, the fixed header had `header-away` and its bottom was above the viewport. At the actual page bottom (y=2394), its opacity remained zero. Keyboard Tab revealed it and focused Motion effects. Further downward scrolling hid it even while focus stayed inside; upward scrolling revealed it.
- Phone: an open Card Nav stayed visible while scrolling. After Escape closed it, another downward scroll hid the header despite the menu button retaining focus.
- The new transparent robot loads in the launcher and chat, with no broken avatar images. Chat fits at 390 px and 320 px without horizontal overflow; its 320 px panel is 286 px wide. Outside-tap dismissal is preserved. No model request or enquiry was sent.
