# TrustCode experience redesign

A dark, typography-led engineering studio website using the original TrustCode logo, existing typed services and team content, and selected React Bits effects.

## Current experience

- Home: the small hero eyebrow is removed; the headline uses Fold Text. Work, Expertise, Studio, Process and Insights are centered in the desktop header.
- Home: layered Dot Field, Dot Grid and Micro Slats hero, studio standard, selected projects, expertise, process, people and enquiry. Phones run one animated dot layer with static slats; desktop layers all three. Backgrounds stop when the hero leaves the viewport or the tab is hidden.
- Work: three user-selected projects: Sekibat Nig Limited, NELO Woman and Wearables by Ashabi. Home, Work, detail pages, sitemap and assistant knowledge share typed content. The former collection stays removed. NELO is explicitly a storefront preview; no individual attribution, technology stack or commercial results are invented.
- Logo Loop: 17 self-hosted monochrome technology marks with accessible names, hover pause and a static motion-off state.
- Enquiry links: Star Border on all Let's talk and Let's build links, including the mobile Card Nav CTA. Motion-off uses static links.
- People: real team photos on draggable, flippable Lanyard badges on Home and Studio. Scenes load only near the viewport with motion enabled, unmount offscreen or when hidden, and retain static photo fallbacks until rendering succeeds.
- Header: hides on downward scrolling, returns on upward scrolling and keyboard focus. Mobile menu stays visible while open.
- Navigation: Gooey Nav on desktop with client-side routing and accurate active-page state. Phone Card Nav unfolds three grouped link cards and a project CTA. Escape, outside taps and selecting a link close it. Gooey rendering loads only on desktop.
- Entrance: six alternating curtain panels, oversized brand typography and a light sweep, about 1.7 seconds once per tab session. Escape/Skip dismisses; footer can replay. Reduced motion skips it.
- Companion: original TrustCode robot avatar with idle, wave and thinking states, connected to the existing streaming assistant and project-brief handoff.
- Chat: outside taps dismiss the panel without consuming the underlying action. Thought Line reflects waiting, receiving, completion and failure states. Sling Button sends by tap, Enter or an armed pull-and-release gesture; short pulls cancel. Closing chat preserves its draft and ongoing request.
- Dropdowns and FAQ/service/process panels share soft 450–550 ms transitions; mobile Card Nav has a slower spring. Reduced motion uses immediate states. Footer groups use Line Sidebar with semantic links. The open AI panel uses an Electric Border, which is unmounted when motion is off or chat closes.
- Contact uses the React Bits Stepper for the complete About you, Your vision and The details panels, with a moving active tile, completed ticks, soft panel transitions and persistent inputs. Inactive panels are hidden and inert; dropdowns can extend beyond the panel. Validation, assistant/scoper prefill and the existing delivery handler are preserved. Motion-off changes panels immediately.
- No lab route or floating WhatsApp launcher. Static contact links remain available.

## Implementation

Next.js 15, React 19, TypeScript, Tailwind, GSAP and Motion. 28 selected React Bits source components are vendored. Three.js is used only in the lazily imported Lanyard; standalone physics and vgpu dependencies stay removed. Fonts and technology marks are self-hosted. Decorative canvases are dynamically imported, limited in pixel density and removed offscreen.

Global motion control and OS reduced motion have static fallbacks. Original logo, focus indicators, labelled controls, semantic content and contact validation remain. API validation, rate limiting and honeypot are preserved.

Delivery remains on a review branch with a Vercel preview. Main is the production release boundary.
