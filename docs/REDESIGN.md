# TrustCode experience redesign

A dark, typography-led engineering studio website using the original TrustCode logo, existing typed services and team content, and selected React Bits effects.

## Current experience

- Home: the small hero eyebrow is removed; the headline uses Fold Text. Work, Expertise, Studio, Process and Insights are centered in the desktop header.
- Home: layered Dot Field, Dot Grid and Micro Slats hero, studio standard, selected projects, expertise, process, people and enquiry. Phones run one animated dot layer with static slats; desktop layers all three. Backgrounds stop when the hero leaves the viewport or the tab is hidden.
- Work: three user-selected projects: Sekibat Nig Limited, NELO Woman and Wearables by Ashabi. Home, Work, detail pages, sitemap and assistant knowledge share typed content. The former collection stays removed. NELO is explicitly a storefront preview; no individual attribution, technology stack or commercial results are invented.
- Logo Loop: 17 self-hosted monochrome technology marks with accessible names, hover pause and a static motion-off state.
- Enquiry links: Star Border on all Let's talk and Let's build links, including the mobile Card Nav CTA. Motion-off uses static links.
- People: clean static team portraits on Home and Studio. The Lanyard badges and their Three.js dependency were removed at the user's request.
- Header: hides on downward scrolling, returns on upward scrolling and keyboard focus. Mouse-focused links no longer hold it open; scroll positions are clamped at page boundaries. Mobile menu stays visible while open.
- Navigation: Gooey Nav on desktop with client-side routing and accurate active-page state. Phone Card Nav unfolds three grouped link cards and a project CTA. Escape, outside taps and selecting a link close it. Gooey rendering loads only on desktop.
- Entrance: six alternating curtain panels, oversized brand typography and a light sweep, about 1.7 seconds once per tab session. Escape/Skip dismisses; footer can replay. Reduced motion skips it.
- Companion: the user's white/silver robot reference, adapted with the original TrustCode symbol in place of the brain on its chest. A transparent 38 kB WebP renders in the launcher and chat avatar, with gentle idle/thinking motion and static reduced-motion states. The existing streaming assistant and project-brief handoff are preserved.
- Chat: outside taps dismiss the panel without consuming the underlying action. Thought Line reflects waiting, receiving, completion and failure states. Sling Button sends by tap, Enter or an armed pull-and-release gesture; short pulls cancel. Closing chat preserves its draft and ongoing request.
- Dropdowns and FAQ/service/process panels share soft 450–550 ms transitions; mobile Card Nav has a slower spring. Reduced motion uses immediate states. Footer groups use Line Sidebar with semantic links. The open AI panel uses an Electric Border, which is unmounted when motion is off or chat closes.
- Contact uses the React Bits Stepper for the complete About you, Your vision and The details panels, with a moving active tile, completed ticks, soft panel transitions and persistent inputs. Inactive panels are hidden and inert; dropdowns can extend beyond the panel. Validation, assistant/scoper prefill and the existing delivery handler are preserved. Motion-off changes panels immediately.
- No lab route or floating WhatsApp launcher. Static contact links remain available.

## Implementation

Next.js 15, React 19, TypeScript, Tailwind, GSAP and Motion. 27 selected React Bits source components are vendored. Three.js, standalone physics and vgpu dependencies are removed. Fonts, technology marks and the robot asset are self-hosted. Decorative canvases are dynamically imported, limited in pixel density and removed offscreen.

Global motion control and OS reduced motion have static fallbacks. Original logo, focus indicators, labelled controls, semantic content and contact validation remain. API validation, rate limiting and honeypot are preserved.

Delivery remains on a review branch with a Vercel preview. Main is the production release boundary.
