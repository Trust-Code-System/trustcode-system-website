# React Bits

28 selected TypeScript/CSS components from the official React Bits registry, retrieved 25–26 October 2026. Source: https://github.com/DavidHDev/react-bits. MIT + Commons Clause license: see REACT_BITS_LICENSE.md. Original author credits retained. Components are integrated into the TrustCode website.

Upstream source is vendored under src/components/react-bits. A TypeScript checking suppression isolates upstream files from application compiler differences; application adapters remain type checked. MicroSlats is capped at device pixel ratio 1 to reduce the layered hero's rendering cost.

Integration patches: GooeyNav supports Next Link, an unselected route, an accessible navigation label and the site's motion preference. CardNav supports the site motion preference and an always-expanded-content CTA placement. SlingButton supports the site motion preference. ThoughtLine has an explicit accessible toggle label and announces request-label changes. ThoughtLine displays request lifecycle feedback; no private model reasoning or simulated reasoning trace is displayed.

Additional integration patches: FoldText supports an entrance delay; LineSidebar supports semantic Next Link destinations and an accessible navigation label; ElectricBorder is capped at device pixel ratio 1.

Lanyard is capped at device pixel ratio 1 and reports its first ready photo frame so its application adapter can retain a static image until rendering succeeds. It is imported only for visible, motion-enabled team badges; hidden or offscreen scenes unmount. StarBorder uses Next Link through a typed adapter and static links when motion is disabled. LogoLoop displays self-hosted SVG technology marks.

## Technology marks

17 monochrome technology icons from Simple Icons, obtained through the official Iconify API: https://api.iconify.design/simple-icons.json. Simple Icons is distributed under CC0 1.0: https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md. Brand names and marks remain the property of their respective owners. The strip describes selected tools, not customer or partnership endorsements.

## Project covers

Homepage captures of the three user-supplied project URLs are stored in public/work/. They depict the inspected interfaces on 26 October 2026. Sekibat imagery is illustrative on its source site; portfolio copy makes no claim that it depicts a completed property development.

## Fonts

Manrope and JetBrains Mono are bundled from the official Google Fonts repository. Their SIL Open Font License notices are in src/app/fonts/. Main-site fonts are self-hosted.
