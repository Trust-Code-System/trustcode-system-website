/** Founder-approved public starting prices, 10 November 2026.
 * This is the only source of commercial prices and payment terms.
 */
export type PriceItem = {
  id: string;
  pillar: "Build" | "Run" | "Protect" | "Other";
  group: string;
  title: string;
  description: string;
  ngn: number | null;
  usd?: number;
  gbp?: number;
  timeline: string;
  service: string;
  weeks?: [number, number];
  includedAddOns?: string[];
};
export const INTERNATIONAL_PRICING_ENABLED = false;
export const pricing: PriceItem[] = [
  {
    id: "landing-page",
    pillar: "Build",
    group: "Websites",
    title: "Landing page",
    description: "One page with a contact form or WhatsApp link.",
    ngn: 250000,
    timeline: "1–2 weeks",
    service: "product-web-engineering",
    weeks: [1, 2],
  },
  {
    id: "portfolio",
    pillar: "Build",
    group: "Websites",
    title: "Portfolio / personal site",
    description: "Show your work and make it easy to contact you.",
    ngn: 250000,
    timeline: "1–2 weeks",
    service: "product-web-engineering",
    weeks: [1, 2],
  },
  {
    id: "business-website",
    pillar: "Build",
    group: "Websites",
    title: "Business website",
    description: "Up to six pages explaining your business and services.",
    ngn: 500000,
    timeline: "2–4 weeks",
    service: "product-web-engineering",
    weeks: [2, 4],
  },
  {
    id: "corporate-website",
    includedAddOns: ["blog-cms"],
    pillar: "Build",
    group: "Websites",
    title: "Corporate website",
    description: "Ten or more pages, with content your team can edit.",
    ngn: 900000,
    timeline: "3–6 weeks",
    service: "product-web-engineering",
    weeks: [3, 6],
  },
  {
    id: "blog-news",
    includedAddOns: ["blog-cms"],
    pillar: "Build",
    group: "Websites",
    title: "Blog / news / magazine site",
    description: "Publish and organise articles with an easy content editor.",
    ngn: 700000,
    timeline: "3–5 weeks",
    service: "product-web-engineering",
    weeks: [3, 5],
  },
  {
    id: "restaurant",
    pillar: "Build",
    group: "Websites",
    title: "Restaurant / food site",
    description: "Share your menu and take orders online or on WhatsApp.",
    ngn: 600000,
    timeline: "2–4 weeks",
    service: "product-web-engineering",
    weeks: [2, 4],
  },
  {
    id: "church-ngo",
    pillar: "Build",
    group: "Websites",
    title: "Church / NGO / foundation site",
    description: "Explain your work and accept online donations.",
    ngn: 600000,
    timeline: "2–4 weeks",
    service: "product-web-engineering",
    weeks: [2, 4],
  },
  {
    id: "property",
    pillar: "Build",
    group: "Websites",
    title: "Real estate / property listings site",
    description: "List properties with clear details and enquiry routes.",
    ngn: 900000,
    timeline: "4–6 weeks",
    service: "product-web-engineering",
    weeks: [4, 6],
  },
  {
    id: "redesign",
    pillar: "Build",
    group: "Websites",
    title: "Website redesign",
    description: "Refresh an existing website around your customers and goals.",
    ngn: 400000,
    timeline: "2–5 weeks",
    service: "product-web-engineering",
    weeks: [2, 5],
  },
  {
    id: "online-store",
    pillar: "Build",
    group: "Online stores",
    title: "Starter online store",
    description:
      "Up to about 50 products, payments through Paystack or Stripe, and order emails.",
    ngn: 900000,
    timeline: "4–6 weeks",
    service: "ecommerce-development",
    weeks: [4, 6],
  },
  {
    id: "custom-store",
    pillar: "Build",
    group: "Online stores",
    title: "Custom online store",
    description:
      "Custom orders, wholesale, multiple currencies and regional shipping.",
    ngn: 1800000,
    timeline: "6–10 weeks",
    service: "ecommerce-development",
    weeks: [6, 10],
  },
  {
    id: "marketplace",
    pillar: "Build",
    group: "Online stores",
    title: "Multi-vendor marketplace",
    description: "Let multiple sellers list products and manage orders.",
    ngn: 4000000,
    timeline: "10–16 weeks",
    service: "ecommerce-development",
    weeks: [10, 16],
  },
  {
    id: "booking-platform",
    pillar: "Build",
    group: "Platforms & apps",
    title: "Booking / appointment platform",
    description:
      "Let customers book time with your salon, clinic or consultancy.",
    ngn: 1200000,
    timeline: "4–8 weeks",
    service: "product-web-engineering",
    weeks: [4, 8],
  },
  {
    id: "hotel-booking",
    pillar: "Build",
    group: "Platforms & apps",
    title: "Hotel / shortlet booking site",
    description: "Show rooms, availability and a clear booking journey.",
    ngn: 1500000,
    timeline: "5–8 weeks",
    service: "product-web-engineering",
    weeks: [5, 8],
  },
  {
    id: "event-ticketing",
    pillar: "Build",
    group: "Platforms & apps",
    title: "Event & ticketing platform",
    description: "Publish events and sell tickets online.",
    ngn: 1500000,
    timeline: "5–8 weeks",
    service: "product-web-engineering",
    weeks: [5, 8],
  },
  {
    id: "membership",
    pillar: "Build",
    group: "Platforms & apps",
    title: "Membership / community site",
    description: "Give members paid access to your content or community.",
    ngn: 1500000,
    timeline: "5–8 weeks",
    service: "product-web-engineering",
    weeks: [5, 8],
  },
  {
    id: "school-courses",
    pillar: "Build",
    group: "Platforms & apps",
    title: "School portal / online courses",
    description: "Bring learners, lessons and school information together.",
    ngn: 2500000,
    timeline: "8–12 weeks",
    service: "product-web-engineering",
    weeks: [8, 12],
  },
  {
    id: "app-platform",
    pillar: "Build",
    group: "Platforms & apps",
    title: "Web app / software platform",
    description: "Accounts, dashboards and tools to manage your business.",
    ngn: 2500000,
    timeline: "6–12 weeks",
    service: "product-web-engineering",
    weeks: [6, 12],
  },
  {
    id: "fintech-payments",
    pillar: "Build",
    group: "Platforms & apps",
    title: "Fintech / payments platform",
    description: "Build a payments service with a security review included.",
    ngn: 6000000,
    timeline: "12+ weeks",
    service: "product-web-engineering",
    weeks: [12, 12],
  },
  {
    id: "ai-assistant",
    pillar: "Build",
    group: "AI",
    title: "AI chat assistant",
    description: "Add a helpful chat assistant to your existing website.",
    ngn: 400000,
    timeline: "1–3 weeks",
    service: "ai-integration",
    weeks: [1, 3],
  },
  {
    id: "ai-tool",
    pillar: "Build",
    group: "AI",
    title: "Custom AI tool or automation",
    description: "Connect useful AI tools to save time on repeatable work.",
    ngn: 2000000,
    timeline: "4–10 weeks",
    service: "ai-integration",
    weeks: [4, 10],
  },
  {
    id: "basic-care",
    pillar: "Run",
    group: "Care plans",
    title: "Basic care",
    description:
      "Hosting setup, backups, uptime checks, security updates and one hour of small edits.",
    ngn: 50000,
    timeline: "Monthly",
    service: "it-support-managed",
  },
  {
    id: "standard-care",
    pillar: "Run",
    group: "Care plans",
    title: "Standard care",
    description:
      "Everything in Basic, plus four hours of edits or improvements and a monthly report.",
    ngn: 100000,
    timeline: "Monthly",
    service: "it-support-managed",
  },
  {
    id: "growth-care",
    pillar: "Run",
    group: "Care plans",
    title: "Growth",
    description:
      "Dedicated developer hours for new features, agreed to fit your needs.",
    ngn: 250000,
    timeline: "Monthly",
    service: "it-support-managed",
  },
  {
    id: "security-check",
    pillar: "Protect",
    group: "Security",
    title: "Website security check",
    description:
      "A one-off report explaining security gaps and a list of fixes.",
    ngn: 300000,
    timeline: "Agreed after scoping",
    service: "cybersecurity-soc",
  },
  {
    id: "security-monitoring",
    pillar: "Protect",
    group: "Security",
    title: "Security monitoring & incident response",
    description: "Help watch for threats and respond to security incidents.",
    ngn: null,
    timeline: "Agreed after scoping",
    service: "cybersecurity-soc",
  },
  {
    id: "code-audit",
    pillar: "Other",
    group: "Other",
    title: "Take over or fix an existing project",
    description: "A code audit, credited to the build if you proceed.",
    ngn: 150000,
    timeline: "Agreed after review",
    service: "product-web-engineering",
  },
];
export const addOns: {
  id: string;
  title: string;
  ngn: number;
  usd?: number;
  gbp?: number;
  feature?: string;
}[] = [
  {
    id: "extra-page",
    title: "Extra page (per page)",
    ngn: 50000,
  },
  {
    id: "copywriting",
    title: "Copywriting (per page)",
    ngn: 25000,
  },
  {
    id: "brand-kit",
    title: "Logo & brand kit",
    ngn: 150000,
  },
  {
    id: "multi-language",
    title: "Multi-language",
    ngn: 150000,
    feature: "Multi-language",
  },
  {
    id: "blog-cms",
    title: "Blog / content editor",
    ngn: 150000,
    feature: "Blog / CMS",
  },
  {
    id: "seo",
    title: "Search engine setup",
    ngn: 100000,
  },
];
export const commercialTerms = {
  disclaimer:
    "Starting prices for a standard scope. Your final price is confirmed in a written proposal after a free consultation. Hosting, domain and third-party fees (e.g. Paystack, Stripe, SMS, email) are billed separately at cost.",
  payment:
    "50% deposit to start, 30% at staging approval, 20% before launch. Retainers billed monthly in advance.",
  ownership: "Client owns the code, domain and accounts.",
  support: "Every build includes 30 days of free support after launch.",
  rushPercent: 25,
} as const;
export function formatFrom(amount: number, compact = false) {
  return `From ₦${new Intl.NumberFormat("en-NG", compact ? { notation: "compact", maximumFractionDigits: 1 } : {}).format(amount)}`;
}
export function itemPrice(item: PriceItem, compact = false) {
  return item.ngn == null
    ? "Tailored quote after a scoping call"
    : `${formatFrom(item.ngn, compact)}${item.pillar === "Run" ? "/month" : ""}`;
}
export function priceFor(id: string) {
  return pricing.find((item) => item.id === id);
}
export function selectedAddOns(
  features: string[],
  ids: string[],
  typeId?: string,
) {
  const included = typeId ? (priceFor(typeId)?.includedAddOns ?? []) : [];
  return addOns.filter(
    (item) =>
      !included.includes(item.id) &&
      (ids.includes(item.id) ||
        Boolean(item.feature && features.includes(item.feature))),
  );
}
export function startingTotal(
  id: string,
  features: string[],
  ids: string[],
  rush = false,
) {
  const base = priceFor(id)?.ngn;
  if (base == null) return null;
  const total =
    base +
    selectedAddOns(features, ids, id).reduce((sum, item) => sum + item.ngn, 0);
  return rush
    ? Math.ceil(total * (1 + commercialTerms.rushPercent / 100))
    : total;
}
export function pricingKnowledge() {
  return (
    pricing
      .map(
        (item) =>
          `${item.pillar} / ${item.group}: ${item.title}. ${item.description} ${itemPrice(item)}. ${item.timeline}.`,
      )
      .join("\n") +
    "\nAdd-ons: " +
    addOns
      .map((item) => `${item.title}: + ${formatFrom(item.ngn)}`)
      .join("; ") +
    `; rush delivery +${commercialTerms.rushPercent}%.\n${commercialTerms.disclaimer}\n${commercialTerms.payment}\n${commercialTerms.ownership}\n${commercialTerms.support}`
  );
}
