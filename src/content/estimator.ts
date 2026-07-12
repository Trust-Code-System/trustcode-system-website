// Project scoping data for the /estimate wizard. Collects project type,
// features, and timeline so visitors can send a structured brief. No public
// pricing. Labels must match the option lists in src/lib/contact-schema.ts
// exactly, because the scoper hands its selections to the contact form.

export type ProjectType = {
  label: string;
  /** service slug used to preselect the contact form's Service field */
  service: string;
  blurb: string;
  weeks: [number, number];
};

export const projectTypes: ProjectType[] = [
  {
    label: "Business / landing site",
    service: "product-web-engineering",
    blurb: "Marketing site, services, contact. Built to convert.",
    weeks: [2, 4],
  },
  {
    label: "Portfolio / personal",
    service: "product-web-engineering",
    blurb: "A sharp personal or portfolio site that loads fast.",
    weeks: [1, 3],
  },
  {
    label: "E-commerce store",
    service: "ecommerce-development",
    blurb: "Storefront, cart, checkout, Paystack/Stripe payments.",
    weeks: [4, 8],
  },
  {
    label: "Booking / service platform",
    service: "product-web-engineering",
    blurb: "Scheduling, service flows, and customer accounts.",
    weeks: [6, 10],
  },
  {
    label: "Web app / SaaS",
    service: "product-web-engineering",
    blurb: "Multi-role platform with auth, dashboards, and admin.",
    weeks: [8, 16],
  },
  {
    label: "AI-powered tool",
    service: "ai-integration",
    blurb: "LLM features, copilots, or automation with real value.",
    weeks: [6, 12],
  },
];

export type EstimatorFeature = {
  label: string;
};

export const estimatorFeatures: EstimatorFeature[] = [
  { label: "Online payments" },
  { label: "User accounts / login" },
  { label: "Booking / scheduling" },
  { label: "Blog / CMS" },
  { label: "Admin dashboard" },
  { label: "AI features" },
  { label: "Multi-language" },
  { label: "Live chat" },
  { label: "Email notifications" },
];

export const timelines = [
  "ASAP / under 1 month",
  "1–3 months",
  "3+ months",
  "Flexible",
] as const;

export const RUSH_TIMELINE = "ASAP / under 1 month";
