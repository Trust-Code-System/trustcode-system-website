export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  tag: string;
  date: string; // ISO
  readingTime: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "fintech-security-checklist",
    title: "A practical security checklist for fintech products",
    dek: "The security work that actually matters before your fintech product touches real money — from a team that ships payment flows and runs a SOC practice.",
    tag: "Security",
    date: "2026-06-20",
    readingTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Most fintech founders think about security the way most people think about insurance: important, later. The problem is that in payments, 'later' usually means 'after the incident' — and by then you're not buying security, you're buying crisis management.",
          "This is the checklist we run against our own fintech builds before they touch real money. None of it requires an enterprise budget. All of it requires deciding, before launch, that trust is part of the product.",
        ],
      },
      {
        heading: "1. Treat secrets like they're already leaking",
        paragraphs: [
          "API keys for your payment provider, database credentials, and signing secrets should never live in your codebase — not in a config file, not in a commented-out line, not in the git history. Use environment variables managed by your hosting platform, rotate anything that has ever been committed, and give production keys to as few people as possible.",
          "The most common fintech breach we see in small teams isn't an exotic exploit. It's a live secret sitting in a public or semi-public repository.",
        ],
      },
      {
        heading: "2. Verify every webhook, make every payment idempotent",
        paragraphs: [
          "Payment providers like Paystack and Stripe sign their webhooks. Verify that signature on every event — an unverified webhook endpoint is an open invitation to mark unpaid orders as paid.",
          "Idempotency is the other half: networks fail mid-request, users double-click, providers retry. Every money-moving operation needs an idempotency key so a retried request can never charge or credit twice. Build reconciliation in from day one — a daily job that compares your ledger against the provider's records will catch what your logic misses.",
        ],
      },
      {
        heading: "3. Collect less KYC data than you think you need",
        paragraphs: [
          "KYC data is toxic inventory: valuable to attackers, expensive to protect, and regulated under Nigeria's data protection regime and its equivalents elsewhere. Collect the minimum your compliance obligations require, encrypt it at rest, restrict who and what can read it, and set a retention policy so you're not guarding data you no longer need.",
        ],
      },
      {
        heading: "4. Rate-limit like an adversary is watching",
        paragraphs: [
          "Login endpoints, OTP requests, transfer initiations, and airtime or wallet conversions all get probed. Rate limits per account and per IP, escalating delays on failures, and alerts on anomalous patterns turn an automated attack from a breach into a log entry.",
        ],
      },
      {
        heading: "5. Log actions, not just errors",
        paragraphs: [
          "When a dispute or an incident happens, the question is always 'who did what, when?' — and application error logs can't answer it. Keep an append-only audit trail for sensitive actions: logins, KYC changes, transfers, admin overrides. Store it separately from application data, and treat admin actions as the most important entries in it.",
        ],
      },
      {
        heading: "6. Decide your incident response before you need it",
        paragraphs: [
          "An incident response plan for a small fintech fits on two pages: who gets woken up, how you freeze money movement, how you rotate credentials, what you tell users, and who talks to the payment provider. Write it while you're calm. Practicing it once — even as a tabletop conversation — is worth more than any tooling you'll buy this year.",
          "Security isn't a feature you add at the end. It's a posture you either build with or retrofit at ten times the cost. If you're building something that touches money and want a second pair of eyes on it, that's exactly the work we do.",
        ],
      },
    ],
  },
  {
    slug: "low-bandwidth-web-platforms",
    title: "Building web platforms that work on low-bandwidth connections",
    dek: "Your users are on mobile data, not office fiber. Practical engineering choices that keep a platform fast and usable on a 3G connection.",
    tag: "Engineering",
    date: "2026-07-01",
    readingTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "When we built a school management platform for a counselling academy, one constraint shaped every decision more than any feature request: most users would open it on a phone, on mobile data, sometimes on connections that drop mid-request. That's not an edge case in our markets — it's the default user.",
          "Most performance advice assumes the problem is shaving milliseconds for users on fast connections. Building for low bandwidth is a different discipline: the goal is for the product to remain *usable* when the network is slow, flaky, or briefly gone. Here's what actually moves the needle.",
        ],
      },
      {
        heading: "Set a page-weight budget and defend it",
        paragraphs: [
          "Decide up front what a page is allowed to cost — we aim for well under a megabyte for first load on content pages — and treat anything over budget as a bug. Budgets fail silently: one marketing image, one analytics script, one icon library added 'temporarily' and the page doubles. Check the numbers in every review, not once at launch.",
        ],
      },
      {
        heading: "Render on the server, ship less JavaScript",
        paragraphs: [
          "Server-rendered and statically generated pages (we use Next.js) mean users see real content while JavaScript is still downloading — or even if it never finishes. Reserve client-side interactivity for the parts that genuinely need it: forms, dashboards, live data. A page that renders as HTML works on connections where a client-rendered app shows a spinner forever.",
        ],
      },
      {
        heading: "Images and fonts are where budgets die",
        paragraphs: [
          "Serve modern formats (WebP/AVIF), size images to the layout instead of shipping originals, and lazy-load everything below the fold. For fonts: subset them, preload one or two weights, and always define fallback system fonts so text renders immediately. A platform's data tables and forms don't need a six-weight font family.",
        ],
      },
      {
        heading: "Design forms for connections that drop",
        paragraphs: [
          "The most expensive failure on a slow connection is a long form that loses everything on one failed submit. Keep forms short, validate on the client before the round-trip, keep the user's input intact when a submission fails, and make the retry obvious. Optimistic UI is nice; not losing twenty minutes of typed data is essential.",
        ],
        bullets: [
          "Client-side validation before the network round-trip",
          "Preserve input on failure — never blank the form",
          "Clear pending states so users don't double-submit",
          "Paginate heavy lists instead of loading everything",
        ],
      },
      {
        heading: "Test on the connection your users actually have",
        paragraphs: [
          "Chrome DevTools will throttle your connection to 3G in two clicks, and it's the cheapest usability test you'll ever run. If a flow is painful under throttling, it's painful for a meaningful share of your real users. We make throttled walkthroughs part of pre-launch checks on every platform we ship.",
          "None of this is exotic engineering — it's a set of defaults chosen for the users you actually have rather than the ones in a demo video. If your current platform frustrates users the moment they leave good wifi, it's fixable, and usually without a rebuild.",
        ],
      },
    ],
  },
];
