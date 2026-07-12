# Portfolio Restructure — Implementation Tracker

## Objective

Restructure the TrustCode Work portfolio so four founders are represented equally with **3 featured projects each (12 total)**, followed by a **More Work** section retaining every existing project that is not in the featured 12. No existing project, route, screenshot, or metadata may be deleted.

## Non-negotiable rules

- [x] Preserve every existing project (move non-featured into More Work)
- [x] Do not duplicate projects on the Work page
- [x] Do not fabricate metrics, testimonials, or unverified claims
- [x] Preserve TrustCode visual identity
- [x] No placeholder / lorem / broken links

---

## Stage 1 — Audit inventory (pre-change)

### Framework

- Next.js 15.5 (App Router), React 18, TypeScript 5, Tailwind 3, pnpm
- Data: hardcoded `src/content/portfolio.ts` (not CMS)
- Live: https://trustcodesystem.tech/work

### Existing projects (12) — routes `/work/<slug>` — all preserved

| # | Slug | Title | Status after restructure |
|---|------|-------|--------------------------|
| 1 | `the-thesis-desk` | The Thesis Desk | Featured · Abass #3 |
| 2 | `helping-tribe-academy` | The Helping Tribe Academy | Featured · Abass #2 |
| 3 | `atlas-hr` | Atlas HR | Featured · Abass #1 |
| 4 | `airtimevault` | AirtimeVault | More Work |
| 5 | `wearables-atelier` | Wearables Atelier | More Work |
| 6 | `petrobrain` | PetroBrain | More Work |
| 7 | `aureo` | Aureo | More Work |
| 8 | `studycoach` | StudyCoach | More Work |
| 9 | `clabed-autos` | Clabed Autos | Featured · Bashir #1 |
| 10 | `sln-engineering` | SLN Engineering Ltd | Featured · Bashir #2 (owner corrected) |
| 11 | `serverless-youtube-pipeline` | Serverless YouTube File Sync | Featured · Abdulhaleem #2 (title updated) |
| 12 | `soc-detection-lab` | SOC Detection Lab & KQL Playbook | More Work |

### New projects added (6)

| Slug | Title | Owner |
|------|-------|-------|
| `debt-tracker-api` | Debt Tracker API | Abdulhaleem |
| `multi-carrier-shipping` | Multi-Carrier Shipping Integration | Abdulhaleem |
| `home-detection-lab` | Home Detection Lab | Olamilekan |
| `jojos-hospital-kql` | Jojo’s Hospital — KQL Threat Investigation | Olamilekan |
| `network-security-segmentation-lab` | Network Security and Segmentation Lab | Olamilekan |
| `event-photo-platform` | Event Photo Platform | Bashir |

**Total visible projects: 18**

---

## Featured 12 mapping

| Order | Owner | Project | Source |
|------:|-------|---------|--------|
| 1 | Abass | Atlas HR | existing `atlas-hr` |
| 2 | Abass | The Helping Tribe Academy | existing `helping-tribe-academy` |
| 3 | Abass | The Thesis Desk | existing `the-thesis-desk` |
| 4 | Abdulhaleem | Debt Tracker API | new `debt-tracker-api` (fork — contribution language) |
| 5 | Abdulhaleem | Serverless YouTube File Sync | existing `serverless-youtube-pipeline` |
| 6 | Abdulhaleem | Multi-Carrier Shipping Integration | new `multi-carrier-shipping` |
| 7 | Olamilekan | Home Detection Lab | new `home-detection-lab` |
| 8 | Olamilekan | Jojo’s Hospital KQL Threat Investigation | new `jojos-hospital-kql` |
| 9 | Olamilekan | Network Security and Segmentation Lab | new `network-security-segmentation-lab` |
| 10 | Bashir | Clabed Autos | existing `clabed-autos` |
| 11 | Bashir | SLN Engineering Ltd | existing `sln-engineering` |
| 12 | Bashir | Event Photo Platform | new `event-photo-platform` |

---

## Tasks

### Audit & docs

- [x] Audit existing project data
- [x] Record all existing project routes
- [x] Record images, filters, components, SEO
- [x] Create this tracker
- [x] Document implementation plan

### Data

- [x] Add owner / proof / featured fields to project model
- [x] Assign Abass featured (Atlas, Helping Tribe, Thesis Desk)
- [x] Add/update Abdulhaleem featured (Debt Tracker, YouTube Sync, Carrier)
- [x] Add Olamilekan featured (Home Lab, Jojo’s Hospital, Network Lab)
- [x] Assign Bashir featured (Clabed, SLN, Event Photo Platform)
- [x] Place remaining existing projects in More Work
- [x] Soften / careful attribution for fork + client work
- [x] Update homepage preview slugs (4 founders)

### UI

- [x] Work page hero copy
- [x] Founder section components
- [x] More Work section
- [x] Founder + category filters
- [x] Project card proof badges + CTAs
- [x] Architecture / lab visuals (SVG covers)
- [x] Case-study page updates (source, contribution, proof)
- [x] Homepage four-founder preview
- [x] Empty filter state
- [x] Reduced-motion for work-item animation

### QA

- [x] Data integrity tests (13 assertions)
- [x] Typecheck
- [x] Production build (41 pages, 18 `/work/[slug]`)
- [x] Verify no duplicate Work-page cards (structure: founder sections + more)
- [x] Verify all original routes resolve (HTTP 200)
- [x] Verify new routes resolve (HTTP 200)
- [x] Verify SVG covers serve (HTTP 200)
- [x] Homepage preview strings present

---

## Files changed

### Created

- `PORTFOLIO_RESTRUCTURE_TODO.md`
- `src/content/portfolio.test.ts`
- `public/work/debt-tracker-api.svg`
- `public/work/serverless-youtube-pipeline.svg`
- `public/work/multi-carrier-shipping.svg`
- `public/work/home-detection-lab.svg`
- `public/work/jojos-hospital-kql.svg`
- `public/work/network-security-segmentation-lab.svg`
- `public/work/event-photo-platform.svg`
- `public/work/clabed-autos.svg`
- `public/work/soc-detection-lab.svg`

### Modified

- `src/content/portfolio.ts`
- `src/components/work-grid.tsx`
- `src/components/project-card.tsx`
- `src/components/project-thumb.tsx`
- `src/app/work/page.tsx`
- `src/app/work/[slug]/page.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/lib/assistant-knowledge.ts`

### Deleted

- none

---

## Verification status

| Check | Status |
|-------|--------|
| 12 featured, 3 per founder | pass (tests + build) |
| More Work retains 6 prior projects | pass |
| No slug removals | pass |
| Typecheck | pass |
| Vitest | 20/20 pass |
| Build | pass (exit 0) |
| Local HTTP routes | pass on `:3002` |

---

## Known limitations / remaining

- Clabed Autos live URL (`https://www.clabedautos.com`) is preserved from the prior site; DNS did not resolve from this environment during QA — confirm domain status before launch messaging
- Clabed Autos uses an intentional branded SVG cover (no production PNG screenshot in-repo yet)
- Debt Tracker API is a **fork** of `AbdurrahmanSogbesan/debt-tracker-api` — copy uses “contributed to”
- Olamilekan additional investigations (Forgando / Titan Shield / Azure Crest) listed as named sanitised exercises without unverified Notion URLs
- Filter URL query params (`?owner=`) not implemented (optional); in-page filters work without reload
- Percentage outcome claims on older live products largely retained as already-published site copy; StudyCoach “40%” claim softened; new entries avoid unverified metrics
- Manual tablet/mobile pixel QA and keyboard walkthrough recommended before production push

---

## Team-first presentation (follow-up)

- [x] Remove founder section headings from Work page
- [x] Remove founder filters from Work UI
- [x] Remove owner names from project cards
- [x] Case studies use collective “delivered by TrustCode” wording
- [x] Contribution copy rewritten to team/neutral language
- [x] Homepage featured preview no longer founder-labelled
- [x] Typecheck / tests / production build pass
