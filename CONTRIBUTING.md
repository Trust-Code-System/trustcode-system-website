# Contributing

Thank you for contributing to the TrustCode System website.

## Development

Requirements:

- Node.js 20 or later
- pnpm 9

Copy `.env.example` to `.env.local` for contact-email delivery. Production
deployments should also set the optional Upstash Redis REST variables listed in
`.env.example` so contact-form rate limits are shared across serverless
instances.

```bash
pnpm install
pnpm dev
```

Before opening a pull request:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Content

Typed website content lives in `src/content`. Keep claims factual, measurable,
and supported by published company information or approved client material.
Never commit credentials, private client data, unpublished contracts, or
personal information.

## Pull requests

- Keep changes focused and explain the user or business outcome.
- Include screenshots for visual changes.
- Check responsive layouts and both color themes.
- Preserve accessibility, metadata, and structured-data behavior.
- Link the relevant issue when one exists.

By contributing, you agree that your contribution may be used as part of this
repository under its applicable terms.
