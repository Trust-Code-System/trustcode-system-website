# React Bits

23 selected TypeScript/CSS components from the official React Bits registry, retrieved 25–26 October 2026. Source: https://github.com/DavidHDev/react-bits. MIT + Commons Clause license: see REACT_BITS_LICENSE.md. Original author credits retained. Components are integrated into the TrustCode website.

Upstream source is vendored under src/components/react-bits. A TypeScript checking suppression isolates upstream files from application compiler differences; application adapters remain type checked. MicroSlats is capped at device pixel ratio 1 to reduce the layered hero's rendering cost.

Integration patches: GooeyNav supports Next Link, an unselected route, an accessible navigation label and the site's motion preference. CardNav supports the site motion preference and an always-expanded-content CTA placement. SlingButton supports the site motion preference. ThoughtLine has an explicit accessible toggle label and announces request-label changes. ThoughtLine displays request lifecycle feedback; no private model reasoning or simulated reasoning trace is displayed.

## Fonts

Manrope and JetBrains Mono are bundled from the official Google Fonts repository. Their SIL Open Font License notices are in src/app/fonts/. Main-site fonts are self-hosted.
