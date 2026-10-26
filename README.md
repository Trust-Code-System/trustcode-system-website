# TrustCode System — marketing website

Production-grade marketing site for TrustCode System Limited. Next.js 15 (App
Router), TypeScript, Tailwind CSS, Framer Motion.

> Software you can stake your business on.

## Stack

- **Next.js 15** App Router, **TypeScript**, **Tailwind CSS**
- **Framer Motion** — restrained scroll-reveals only
- **Zod** — shared client/server form validation
- **Resend** — contact email delivery (optional; gated by env)
- Fonts: Source Serif 4 (Google, headings) + Switzer (Fontshare, body), JetBrains Mono (`next/font`)

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional — for live email delivery
pnpm dev                     # http://localhost:3000
```

```bash
pnpm build && pnpm start     # production build
pnpm typecheck               # tsc --noEmit
pnpm lint                    # ESLint CLI
pnpm test                    # Vitest API tests
```

## Verification

Before shipping changes, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Editing content

All site content is typed and lives in [`src/content`](src/content) — non-technical
edits are one-file changes:

| File | What it controls |
| --- | --- |
| `site.ts` | Brand, nav, contact details, stats |
| `team.ts` | The four founders, bios, pillars |
| `services.ts` | The seven services + engagement models |
| `portfolio.ts` | All case studies (the `/work` grid + detail pages) |
| `process.ts` | The five delivery steps + comms |
| `values.ts` | Origin story + values |
| `insights.ts` | Blog/insight cards |

## Design system

Defined in `globals.css`, `experience.css`, `refinement.css` and
`tailwind.config.ts`. The dark studio experience combines a layered dot/slat
hero, a six-panel curtain entrance, selected React Bits interactions and an
original TrustCode companion. See [the design notes](docs/REDESIGN.md).

Dark mode is class-based with an inline no-flash init script in the root layout.

## Screenshots

The previous project selection and its screenshots are unpublished. Add future
projects to `src/content/portfolio.ts` with explicit `coverImage` paths; the
thumbnail component already supports Next Image. The current work area is
reserved for the new selection.

## Contact form

`POST /api/contact` — Zod validation, honeypot, rate limiting, and Resend
delivery (set `RESEND_API_KEY`). In production, set
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` so rate limits are
shared across serverless instances. Without those keys it falls back to an
in-memory limiter; without `RESEND_API_KEY` it logs submissions to the server
console so local dev works out of the box.

## SEO

Per-page metadata, Organization + Person + Service JSON-LD, dynamic OG image
(`opengraph-image.tsx`), `sitemap.xml`, and `robots.txt` are all wired up.

## Deploy

Deployed on Vercel at `trustcodesystem.tech`. Set the env vars from
`.env.example` in the Vercel project settings.
