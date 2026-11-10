export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  timeline: string;
  /** Consultation CTA label shown on cards and service detail. */
  ctaLabel: string;
  proof: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: "product-web-engineering",
    icon: "layout",
    title: "Business websites & apps",
    short:
      "Make your business easy to find and use online. Get a website or app shaped around your customers and daily work.",
    description:
      "Make your business easy to find and use online. Get a website or app shaped around your customers and daily work.",
    includes: [
      "Next.js / TypeScript architecture",
      "Authentication & role-based access",
      "Dashboards and admin panels",
      "Component systems & design-to-code",
    ],
    timeline: "2–10 weeks",
    ctaLabel: "Start a project",
    proof: { label: "Discuss your project", href: "/contact" },
  },
  {
    slug: "ecommerce-development",
    icon: "cart",
    title: "Online stores",
    short:
      "Give customers a clear way to browse, buy and pay online, with orders your team can manage.",
    description:
      "Give customers a clear way to browse, buy and pay online, with orders your team can manage.",
    includes: [
      "Cart, wishlist & checkout",
      "Custom-order & wholesale flows",
      "Paystack / Stripe integration",
      "Inventory & order management",
    ],
    timeline: "3–8 weeks",
    ctaLabel: "Start a project",
    proof: { label: "Discuss your project", href: "/contact" },
  },
  {
    slug: "cloud-devops",
    icon: "cloud",
    title: "Hosting & cloud operations",
    short:
      "Make releases easier and keep hosting costs and performance visible, with infrastructure your team can maintain.",
    description:
      "Make releases easier and keep hosting costs and performance visible, with infrastructure your team can maintain.",
    includes: [
      "AWS CDK infrastructure-as-code",
      "CI/CD pipelines (GitHub Actions)",
      "Caching & payment pipelines",
      "Cost & performance optimization",
    ],
    timeline: "2–8 weeks",
    ctaLabel: "Start a project",
    proof: { label: "Discuss your project", href: "/contact" },
  },
  {
    slug: "ai-integration",
    icon: "spark",
    title: "AI tools & automation",
    short:
      "Spend less time on repetitive work. Add helpful assistants, document search and connected workflows where they solve a real problem.",
    description:
      "Spend less time on repetitive work. Add helpful assistants, document search and connected workflows where they solve a real problem.",
    includes: [
      "LLM features (OpenAI, LangChain)",
      "AI agents & MCP tooling",
      "Copilots & chatbots",
      "Automation & DOM agents",
    ],
    timeline: "2–6 weeks",
    ctaLabel: "Start a project",
    proof: { label: "Discuss your project", href: "/contact" },
  },
  {
    slug: "cybersecurity-soc",
    icon: "shield",
    title: "Security & data protection",
    short:
      "Understand the risks to your systems and customer data, strengthen your defences and prepare for incidents.",
    description:
      "Understand the risks to your systems and customer data, strengthen your defences and prepare for incidents.",
    includes: [
      "SIEM setup (Sentinel / Splunk)",
      "Threat hunting & detections",
      "Phishing-readiness assessments",
      "Incident response playbooks",
    ],
    timeline: "1–4 weeks",
    ctaLabel: "Start a project",
    proof: { label: "Discuss your project", href: "/contact" },
  },
  {
    slug: "it-support-managed",
    icon: "wrench",
    title: "Maintenance & support",
    short:
      "Keep your business moving with ongoing maintenance, monitoring and help when your team needs it.",
    description:
      "Keep your business moving with ongoing maintenance, monitoring and help when your team needs it.",
    includes: [
      "Uptime & monitoring",
      "User & access management",
      "Hardware / network troubleshooting",
      "Retainer support",
    ],
    timeline: "Ongoing retainer",
    ctaLabel: "Start a project",
    proof: { label: "Discuss your project", href: "/contact" },
  },
  {
    slug: "training-mentorship",
    icon: "book",
    title: "Training & mentorship",
    short:
      "Help your team build practical skills in web development and security awareness, with training shaped around their needs.",
    description:
      "Help your team build practical skills in web development and security awareness, with training shaped around their needs.",
    includes: [
      "Web development training",
      "Web3 fundamentals",
      "Security awareness",
      "Team & individual mentorship",
    ],
    timeline: "Per cohort",
    ctaLabel: "Start a project",
    proof: { label: "Discuss your project", href: "/contact" },
  },
];

export const engagementModels = [
  {
    title: "Project",
    description:
      "Fixed-scope build with a clear deliverable, timeline, and written proposal. Best for launches and redesigns.",
  },
  {
    title: "Retainer",
    description:
      "Ongoing engineering, maintenance, and support on a monthly basis. Best for live products that keep evolving.",
  },
  {
    title: "Staff augmentation",
    description:
      "Embed one or more of our engineers into your team for a defined period. Best for scaling delivery fast.",
  },
];

export const serviceGroups = [
  {
    id: "build",
    title: "Build",
    problem: "Want customers to find and buy from you online?",
    outcome:
      "Get a business website, online store or app that makes the next step clear. Add useful AI tools where they save time.",
    slugs: [
      "product-web-engineering",
      "ecommerce-development",
      "ai-integration",
    ],
    includes: [
      "Business websites and online stores",
      "Apps and customer platforms",
      "Useful AI integrations",
    ],
    glyph: "⌘",
    color: "#8bafff",
  },
  {
    id: "run",
    title: "Run",
    problem: "Need your technology to keep working after launch?",
    outcome:
      "Keep your website and systems maintained, your hosting organised and your team supported as the business grows.",
    slugs: ["cloud-devops", "it-support-managed"],
    includes: [
      "Hosting and cloud operations",
      "Maintenance and monitoring",
      "Ongoing technical support",
    ],
    glyph: "∞",
    color: "#cfedaf",
  },
  {
    id: "protect",
    title: "Protect",
    problem: "Worried about your systems and customer data?",
    outcome:
      "Find security gaps, strengthen access and prepare a clear response when something goes wrong.",
    slugs: ["cybersecurity-soc"],
    includes: [
      "Security reviews and practical fixes",
      "Access and data protection",
      "Monitoring and incident preparation",
    ],
    glyph: "◇",
    color: "#92e3d0",
  },
] as const;
