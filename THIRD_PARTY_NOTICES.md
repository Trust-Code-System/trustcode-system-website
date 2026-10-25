# React Bits

218 TypeScript/CSS components downloaded from the official https://reactbits.dev/r/registry.json on 25 October 2026. Source: https://github.com/DavidHDev/react-bits. MIT + Commons Clause license: see REACT_BITS_LICENSE.md. Original author credits retained. These components are integrated into the TrustCode website and are not offered as a competing component product.

Upstream source is vendored under src/components/react-bits. A TypeScript checking suppression is added to the upstream files to isolate them from the application TypeScript version; application adapters remain type checked.

## Fonts

Manrope and JetBrains Mono are bundled from the official Google Fonts repository. Their SIL Open Font License notices are included in `src/app/fonts/`. Main-site fonts are self-hosted and do not require requests to a font service at runtime or build time. Optional upstream lab effects can load their own font resources.

## Integration patches

- CircularGallery classifies font stylesheets with a parsed hostname/path instead of a hostname substring.
- Galaxy inserts shader feature defines explicitly after the version directive instead of using a replacement operation that resembles incomplete escaping.
- Shuffle uses `crypto.randomUUID()` for SVG filter IDs. Its non-security animation randomness is unchanged.
