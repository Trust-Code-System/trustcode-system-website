import type { Category } from "./portfolio";

export type Industry = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  painPoints: { title: string; body: string }[];
  deliver: string[];
  /** portfolio categories used to pull relevant projects onto the page */
  categories: Category[];
  /** service slugs most relevant to this industry */
  serviceSlugs: string[];
};

export const industries: Industry[] = [
  {
    slug: "fintech",
    name: "Fintech",
    seoTitle: "Fintech Software Development - Lagos, Nigeria & Worldwide",
    seoDescription:
      "TrustCode System builds fintech products, wallets, payments, KYC flows, and trading platforms, with security and compliance thinking built in from day one. Based in Lagos, Nigeria. Working remotely worldwide.",
    headline: "Fintech products people trust with their money.",
    intro:
      "Give customers a clear way to move money and manage their accounts. We bring product design, payment integration and security review together around your requirements.",
    painPoints: [
      {
        title: "Trust is the product",
        body: "A fintech product that looks unfinished loses users before the first transaction. We build interfaces and flows that signal reliability because in payments, design is trust.",
      },
      {
        title: "Security can't be an afterthought",
        body: "KYC data, payment credentials, and webhooks all need protecting from the first commit. Our SOC lead reviews what we ship: threat models, not checklists after launch.",
      },
      {
        title: "Payments are unforgiving",
        body: "Double charges and missing webhooks destroy confidence. We build idempotent payment pipelines on Paystack and Stripe that reconcile cleanly.",
      },
    ],
    deliver: [
      "Wallets, P2P transfers & virtual cards",
      "Paystack / Stripe payment integration",
      "KYC flows & fraud monitoring",
      "Real-time trading & price dashboards",
    ],
    categories: ["Fintech"],
    serviceSlugs: ["product-web-engineering", "cybersecurity-soc"],
  },
  {
    slug: "edtech",
    name: "EdTech",
    seoTitle: "EdTech Platform Development - Lagos, Nigeria & Worldwide",
    seoDescription:
      "TrustCode System builds education platforms, school management systems, role-based portals, AI study tools, that work on real-world connections. Based in Lagos, Nigeria. Working remotely worldwide.",
    headline: "Education platforms that work in the real world.",
    intro:
      "School management systems, role-based portals for students and staff, AI study tools: built to run on everyday devices and everyday connections, not just office wifi.",
    painPoints: [
      {
        title: "Spreadsheet admissions don't scale",
        body: "Manual applications, scattered records, and email chains collapse the moment a cohort grows. We replace them with application pipelines and admin portals that keep everything in one place.",
      },
      {
        title: "Many roles, one platform",
        body: "Students, teachers and administrators need different views of the same information. We design access around what each person needs to see and do.",
      },
      {
        title: "Low bandwidth is the default",
        body: "Your users are on mobile data, not fiber. We build light, fast pages that stay usable on a 3G connection.",
      },
    ],
    deliver: [
      "School & cohort management platforms",
      "Role-based portals (student / staff / admin)",
      "Public application pipelines",
      "AI study & revision tools",
    ],
    categories: ["EdTech"],
    serviceSlugs: ["product-web-engineering", "ai-integration"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    seoTitle: "E-commerce Development - Lagos, Nigeria & Worldwide",
    seoDescription:
      "TrustCode System builds e-commerce storefronts with carts, checkout, custom orders, wholesale flows, and Paystack/Stripe payments, editorial design that converts. Based in Lagos, Nigeria. Working remotely worldwide.",
    headline: "Storefronts that carry the brand, and close the sale.",
    intro:
      "Make it easy for customers to browse your collection, keep a shopping bag and pay online. We shape the store around your brand, products and order process.",
    painPoints: [
      {
        title: "Generic templates flatten premium brands",
        body: "A premium label on a stock theme reads as a discount store. We design storefronts that carry the brand's editorial voice while staying fast.",
      },
      {
        title: "Checkout friction kills conversion",
        body: "Every extra step and every slow page costs orders. We keep carts persistent, checkouts short, and payments local (Paystack) or international (Stripe).",
      },
      {
        title: "WhatsApp-only sales don't scale",
        body: "Answering the same product questions in chat all day takes time. Give customers clear product information and a way to place orders for themselves.",
      },
    ],
    deliver: [
      "Editorial storefronts & collection pages",
      "Cart, checkout & persistent sessions",
      "Custom-order & wholesale flows",
      "Paystack / Stripe payments & order admin",
    ],
    categories: ["E-Commerce"],
    serviceSlugs: ["ecommerce-development", "product-web-engineering"],
  },
  {
    slug: "ai",
    name: "AI & Automation",
    seoTitle: "AI Integration & Automation Development - Lagos, Nigeria & Worldwide",
    seoDescription:
      "TrustCode System builds useful AI assistants, document search and business automation around your requirements. Based in Lagos, Nigeria. Working remotely worldwide.",
    headline: "Useful AI that fits the way your team works.",
    intro:
      "Help your team find information, answer routine questions and spend less time on repeatable tasks. We scope useful AI integrations with clear limits and review before release.",
    painPoints: [
      {
        title: "Demos are easy; production is not",
        body: "Most AI features die between the prototype and real users. We build with rate limits, fallbacks, cost controls, and evaluation from the start.",
      },
      {
        title: "Hallucination is a business risk",
        body: "In compliance, engineering, and safety-critical domains, a confident wrong answer is worse than no answer. We build AI that cites sources and defers when it should.",
      },
      {
        title: "AI needs a product around it",
        body: "A model is not a product. We build the flows, dashboards, and guardrails that turn LLM capability into something your team actually uses.",
      },
    ],
    deliver: [
      "LLM features (OpenAI, LangChain)",
      "Domain copilots that cite sources",
      "AI sandboxes & scenario modeling",
      "Automation bots & agent tooling (MCP)",
    ],
    categories: ["AI"],
    serviceSlugs: ["ai-integration", "cloud-devops"],
  },
  {
    slug: "security",
    name: "Security",
    seoTitle: "Cybersecurity & SOC Services - Lagos, Nigeria & Worldwide",
    seoDescription:
      "TrustCode System provides security monitoring, threat hunting, phishing-readiness, and MITRE-mapped detection, led by an ISC2-certified SOC analyst. Based in Lagos, Nigeria. Working remotely worldwide.",
    headline: "Security rigor for businesses that can't afford surprises.",
    intro:
      "Understand the risks to your systems and customer data. We help you close security gaps, prepare your team for suspicious messages and plan a clear response to incidents.",
    painPoints: [
      {
        title: "You can't defend what you can't see",
        body: "Without monitoring, the first sign of a breach is the damage. We set up Sentinel or Splunk so threats surface as alerts, not incidents.",
      },
      {
        title: "Phishing is the front door",
        body: "Most compromises start with one email. Phishing-readiness assessments show you exactly how your team responds before an attacker tests it for real.",
      },
      {
        title: "Response needs a playbook",
        body: "When something happens, improvising costs hours you don't have. Documented incident response playbooks turn panic into procedure.",
      },
    ],
    deliver: [
      "SIEM setup (Microsoft Sentinel / Splunk)",
      "Threat hunting & detection engineering",
      "Phishing-readiness assessments",
      "MITRE ATT&CK-mapped IR playbooks",
    ],
    categories: ["Security"],
    serviceSlugs: ["cybersecurity-soc", "it-support-managed"],
  },
];
