export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  timeline: string;
  /** Indicative starting price, every engagement still gets a written quote. */
  priceFrom: string;
  proof: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: "product-web-engineering",
    icon: "layout",
    title: "Product & Web Engineering",
    short:
      "Custom websites, web apps, and SaaS platforms in Next.js/TypeScript: from landing page to multi-role platform.",
    description:
      "We build custom websites, web apps, and SaaS platforms in Next.js and TypeScript. From a single landing page to a multi-role platform with auth, dashboards, and admin panels: designed, built, and shipped to production.",
    includes: [
      "Next.js / TypeScript architecture",
      "Authentication & role-based access",
      "Dashboards and admin panels",
      "Component systems & design-to-code",
    ],
    timeline: "2–10 weeks",
    priceFrom: "from $1,200",
    proof: { label: "Helping Tribe Academy", href: "/work/helping-tribe-academy" },
  },
  {
    slug: "ecommerce-development",
    icon: "cart",
    title: "E-Commerce Development",
    short:
      "Storefronts with carts, wishlists, custom-order flows, wholesale support, and Paystack/Stripe payments.",
    description:
      "Storefronts that sell: carts, wishlists, custom-order flows, wholesale support, and payment integration with Paystack or Stripe. Editorial, fast, and built to convert.",
    includes: [
      "Cart, wishlist & checkout",
      "Custom-order & wholesale flows",
      "Paystack / Stripe integration",
      "Inventory & order management",
    ],
    timeline: "3–8 weeks",
    priceFrom: "from $2,500",
    proof: { label: "Wearables Atelier", href: "/work/wearables-atelier" },
  },
  {
    slug: "cloud-devops",
    icon: "cloud",
    title: "Cloud & DevOps Engineering",
    short:
      "AWS-native architecture (CDK, Lambda, Fargate, EventBridge), CI/CD, IaC, caching, and cost optimization.",
    description:
      "AWS-native architecture built with CDK, Lambda, Fargate, and EventBridge, plus CI/CD, infrastructure-as-code, caching layers, payment pipelines, and cost optimization. Infrastructure you can reason about and trust.",
    includes: [
      "AWS CDK infrastructure-as-code",
      "CI/CD pipelines (GitHub Actions)",
      "Caching & payment pipelines",
      "Cost & performance optimization",
    ],
    timeline: "2–8 weeks",
    priceFrom: "from $2,000",
    proof: { label: "Serverless YouTube Sync Pipeline", href: "/work/serverless-youtube-pipeline" },
  },
  {
    slug: "ai-integration",
    icon: "spark",
    title: "AI Integration & Automation",
    short:
      "LLM-powered features, AI agents (MCP), study/HR/compliance copilots, chatbots, and automation bots.",
    description:
      "LLM-powered features, AI agents built on MCP, study/HR/compliance copilots, chatbots, and automation bots. We integrate AI where it creates measurable value, not where it makes a demo.",
    includes: [
      "LLM features (OpenAI, LangChain)",
      "AI agents & MCP tooling",
      "Copilots & chatbots",
      "Automation & DOM agents",
    ],
    timeline: "2–6 weeks",
    priceFrom: "from $2,500",
    proof: { label: "StudyCoach", href: "/work/studycoach" },
  },
  {
    slug: "cybersecurity-soc",
    icon: "shield",
    title: "Cybersecurity & SOC Services",
    short:
      "Security monitoring (Sentinel/Splunk), threat hunting, phishing-readiness, IR playbooks, MITRE-mapped reporting.",
    description:
      "Security monitoring setup with Sentinel or Splunk, threat hunting, phishing-readiness assessments, incident response playbooks, firewall configuration, and MITRE ATT&CK-mapped reporting, led by an ISC2-certified SOC analyst.",
    includes: [
      "SIEM setup (Sentinel / Splunk)",
      "Threat hunting & detections",
      "Phishing-readiness assessments",
      "Incident response playbooks",
    ],
    timeline: "1–4 weeks",
    priceFrom: "from $1,500",
    proof: { label: "SOC Detection Lab & KQL Playbook", href: "/work/soc-detection-lab" },
  },
  {
    slug: "it-support-managed",
    icon: "wrench",
    title: "IT Support & Managed Services",
    short:
      "Ongoing maintenance, uptime monitoring, user/access management, and retainer support.",
    description:
      "Ongoing maintenance, uptime monitoring, user and access management, hardware-network troubleshooting, and retainer support, backed by daily enterprise IT operations experience in oil & gas.",
    includes: [
      "Uptime & monitoring",
      "User & access management",
      "Hardware / network troubleshooting",
      "Retainer support",
    ],
    timeline: "Ongoing retainer",
    priceFrom: "from $500/mo",
    proof: { label: "SLN Engineering Ltd", href: "/work/sln-engineering" },
  },
  {
    slug: "training-mentorship",
    icon: "book",
    title: "Training & Technical Mentorship",
    short:
      "Corporate and individual training in web development, Web3 fundamentals, and security awareness.",
    description:
      "Corporate and individual training in web development, Web3 fundamentals, and security awareness. Our team has mentored students at Aptech and runs a 500+ member learning community.",
    includes: [
      "Web development training",
      "Web3 fundamentals",
      "Security awareness",
      "Team & individual mentorship",
    ],
    timeline: "Per cohort",
    priceFrom: "custom per cohort",
    proof: { label: "The Thesis Desk community", href: "/work/the-thesis-desk" },
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
