# TrustCode experience redesign

A dark, typography-led engineering studio website using the original TrustCode logo, existing typed services and team content, and selected React Bits effects.

## Current experience

- Home: layered Dot Field, Dot Grid and Micro Slats hero, studio standard, reserved portfolio space, expertise, process, people and enquiry. Phones run one animated dot layer with static slats; desktop layers all three. Backgrounds stop when the hero leaves the viewport or the tab is hidden.
- Work: intentional reserved space. All previous project records, screenshots and detail URLs are unpublished. Future projects belong in src/content/portfolio.ts with explicit coverImage paths.
- Header: hides on downward scrolling, returns on upward scrolling and keyboard focus. Mobile menu stays visible while open.
- Entrance: six alternating curtain panels, oversized brand typography and a light sweep, about 1.7 seconds once per tab session. Escape/Skip dismisses; footer can replay. Reduced motion skips it.
- Companion: original TrustCode robot avatar with idle, wave and thinking states, connected to the existing streaming assistant and project-brief handoff.
- No lab route or floating WhatsApp launcher. Static contact links remain available.

## Implementation

Next.js 15, React 19, TypeScript, Tailwind, GSAP and Motion. Only the 20 used React Bits source components are retained. Unused lab assets and Three.js, physics and vgpu dependencies are removed. Fonts are self-hosted. Decorative canvases are dynamically imported, limited in pixel density and removed offscreen.

Global motion control and OS reduced motion have static fallbacks. Original logo, focus indicators, labelled controls, semantic content and contact validation remain. API validation, rate limiting and honeypot are preserved.

Delivery remains on a review branch with a Vercel preview. Main is the production release boundary.
