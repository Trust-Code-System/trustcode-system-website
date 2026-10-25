# TrustCode experience redesign

## Purpose and audience

Help founders, teams and business decision makers understand TrustCode's product, cloud and security capabilities, inspect the portfolio, and begin a properly scoped project. The separate interaction lab fulfils the requested broad React Bits experiment.

## Content and evidence

The existing typed service, project, process and team content remains the source of business information. Project proof types and source/case-study destinations are preserved; demonstrations and security labs are not relabelled as live client work. The supplied TrustCode logo assets remain in use. Lagos is the company location; worldwide delivery is supported. No current revenue, customer count, valuation, external funding, permanent London office, trademark registration or certification has been invented.

The existing portfolio counts are carried forward as portfolio statements, not newly audited production uptime metrics. New public copy is in `src/content/redesign.ts`.

## Architecture and creative direction

- Home: expressive typographic introduction → studio standard → selected work → connected expertise → delivery process → people → lab → project enquiry.
- Work: searchable, filterable project collection; larger previews; original proof distinctions and detail pages.
- Expertise: a selectable discipline list and a detailed panel with inclusions, timeline, relevant evidence and service-prefilled enquiry.
- Studio, process, insights, industry and project detail routes: shared dark visual system, animated introductions and route transitions, existing substantive content retained.
- Contact: three stages, with first-stage validation, preserved inputs, optional project vision and explicit final submission.
- Lab: 218 individually selectable experiments, five categories, search, play/pause, replay, expanded view and isolated error boundaries.

Visual thesis: an independent engineering studio with confident type, quiet atmospheric blue light, clear evidence and tactile interaction. The typography and orbit treatment are the signature opening; the content stays readable while motion adds depth. The main site uses selected effects in context, while the complete library is available through the lab. Effects are not all mounted together.

## Technology

Next.js App Router, React, TypeScript and the existing Tailwind system. Actual React Bits source is vendored in `src/components/react-bits`, with the license and credits retained. CSS handles states; GSAP and Motion power the relevant upstream components; GPU/Three effects are dynamically imported. Application adapters are type checked. Upstream TypeScript is isolated from application compiler differences with documented file-level checking suppressions.

## Motion, accessibility and performance

- Original logo; readable contrast; consistent focus indicators; semantic headings; labelled controls; original skip link.
- Global motion switch with a stored preference. The operating system reduced-motion setting is honoured. Main text and statistics have static fallbacks. Lab experiments require deliberate playback and may be played individually even when the main site is paused.
- Heavy home backgrounds are mounted near the viewport and removed offscreen. Lab mounts one experiment at a time. GPU availability and each upstream component's capability checks still apply.
- Keyboard-accessible navigation; Escape closes the mobile menu and returns focus. Service and process controls expose expanded/selected states. Search has clear empty and reset states.
- The enquiry API, validation, rate limiting and honeypot are retained. Browsing or selecting an experiment does not send an enquiry. Voice demos use simulated input, and reflective-card demos do not activate a camera.

## Acceptance and validation

Required gates: application TypeScript, ESLint, existing API/content tests, production build, desktop/mobile inspection, navigation, search/filter states, contact validation and preserved data, and sequential component startup verification. Runtime verification checks mount and asynchronous startup errors; it does not certify visual quality, every pointer/keyboard action, every browser or every GPU. Results and limitations are recorded with the delivery evidence.

## Delivery

Changes are isolated on a redesign branch for a reviewable GitHub PR and Vercel preview. The existing production branch is the release boundary. Review the live preview before promoting the redesign to the company domain.
