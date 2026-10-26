# TrustCode System — Project Guide

Marketing website for **TrustCode System Limited**, a software studio. This file
is context for any AI/dev session so the basics never need re-asking.

> Operational/business details that don't belong in a public repo (email
> infrastructure, third-party accounts, WhatsApp specifics, current setup state)
> live in the private session memory, not here.

## What this is
- A **Next.js marketing site** for the studio — services, portfolio/work, team,
  process, insights, and a contact page with a guided project-brief form.
- Live at **https://trustcodesystem.tech**, deployed on **Vercel**.

## The company
- **Name:** TrustCode System Limited (short: "TrustCode System")
- **Tagline:** "Software you can stake your business on."
- **What they do:** full-stack product engineering, cloud/DevOps, AI integration,
  cybersecurity/SOC, IT support, training. The selected projects are Sekibat Nig Limited,
  NELO Woman (storefront preview) and Wearables by Ashabi.
- **Locations:** Lagos, Nigeria · London, UK · remote worldwide.
- **Team (4 co-founders):**
  - **Abass Ibrahim** — Full-Stack Delivery & Design Lead (Lagos). Primary
    owner/operator of this repo and the accounts.
  - **Bashir Abdulah** — Frontend & Product Engineering Lead (London).
  - **Abdulhaleem Sanuth** — Cloud & Backend Engineering Lead (Lagos).
  - **Olamilekan Emmanuel Oyedele** — Security & SOC Lead (Lagos).
- **Brand contact email:** hello@trustcodesystem.tech
- **WhatsApp Business:** +234 913 406 2773 (wa.me/2349134062773)

## Tech stack
- **Next.js 15** (App Router) · **React 19** · **TypeScript 5** · **Tailwind 3**
- **framer-motion** (animation), **zod** (validation), **@vercel/analytics** +
  **@vercel/speed-insights** (telemetry)
- Package manager: **pnpm**. Fonts: Manrope and JetBrains Mono (self-hosted via next/font).
- Selected React Bits source is in `src/components/react-bits`; application adapters are
  in `src/components/experience`. The lab has been removed. See `docs/REDESIGN.md`.

## Project structure
- `src/app/` — routes (App Router): `/`, `/about`, `/services`, `/work`,
  `/work/[slug]`, `/process`, `/insights`, `/contact`, plus `api/contact` (the
  contact-form handler) and SEO routes (`sitemap.ts`, `robots.ts`,
  `opengraph-image.tsx`).
- `src/components/` — UI components (header, footer, project-card, project-thumb,
  contact-form, select, etc.).
- `src/content/` — **all site copy/data as typed TS**: `site.ts` (name, domain,
  email, whatsapp, locations), `portfolio.ts` (three selected projects; use explicit coverImage paths), `team.ts`,
  `services.ts`, `process.ts`, `insights.ts`, `values.ts`. Edit content here,
  not in JSX.
- `src/lib/` — `contact-schema.ts` (zod schema + project-brief option lists),
  `seo.ts`, `utils.ts`.
- `public/` — assets. Logo: `public/trustcode-systems-logo.png`. Icon:
  `public/icon.svg`. Team photos: `public/team/`. Future project covers should use explicit content paths. Business cards: `business-cards/`.
- `scripts/` — generators (`make_cards.py`, `make_whatsapp_assets.ps1`); output
  to `output/` (gitignored-style scratch).

## Commands
- `pnpm dev` — local dev server
- `pnpm build` — production build; always run before committing.
- `pnpm typecheck` — application TypeScript.
- `pnpm lint` — ESLint.
- `pnpm test` — Vitest API/content checks.

## Repo & deployment
- **GitHub:** `Trust-Code-System/trustcode-system-website` (remote `origin`;
  formerly named `trustcode-systems`) — **this is the repo Vercel deploys
  from**. A separate repo `Trust-Code-System/TrustCode-System` also exists (the
  `tcs` remote) but is **not** the deploy source; don't push there expecting a
  deploy.
- **Default/production branch:** `main`. Vercel auto-deploys on push to `main`.
- `main` has branch protection (PR + "validate" status check required) but the
  owner pushes directly with bypass. Commits made in this repo are co-authored
  per the harness footer.
- **DNS** for `trustcodesystem.tech` is managed in **Vercel** (nameservers
  `ns1/ns2.vercel-dns.com`). The domain is **not** registered at Namecheap.

## Environment / dev notes
- Dev OS is **Windows**; prefer PowerShell. pnpm/Next may need
  `$env:PATH = "$env:APPDATA\npm;$env:PATH"`. Git Bash can mis-resolve the
  Next binary, so run builds via PowerShell.
- Git warns LF→CRLF on commit; harmless.
- Contact form posts to `/api/contact`, which sends mail via **Resend** (env:
  `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`). Without
  `CONTACT_TO_EMAIL` it falls back to `site.email` (hello@trustcodesystem.tech).
