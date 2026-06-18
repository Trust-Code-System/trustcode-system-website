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

## Design system — "The Engineering Ledger"

Defined in [`globals.css`](src/app/globals.css) and
[`tailwind.config.ts`](tailwind.config.ts). Palette: `--ink`, `--paper`,
`--blueprint`, `--verified` (live/success only), `--slate`, `--grid`. Section
eyebrows use the `/ label` file-path motif. The hero's **Deploy Log**
([`deploy-log.tsx`](src/components/deploy-log.tsx)) is the signature element.

Dark mode is class-based with an inline no-flash init script in the root layout.

## Screenshots

Portfolio cards render a branded, deterministic placeholder thumbnail. To use
real screenshots, drop `public/work/<slug>.png` and swap
[`project-thumb.tsx`](src/components/project-thumb.tsx) for `next/image`.

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
