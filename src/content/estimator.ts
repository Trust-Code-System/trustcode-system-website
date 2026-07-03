// Ballpark pricing data for the /estimate wizard. These are indicative
// ranges only — every real engagement gets a written quote within 72 hours.
// Labels must match the option lists in src/lib/contact-schema.ts exactly,
// because the estimator hands its selections to the contact form.

export type ProjectType = {
  label: string;
  /** service slug used to preselect the contact form's Service field */
  service: string;
  blurb: string;
  price: [number, number];
  weeks: [number, number];
};

export const projectTypes: ProjectType[] = [
  {
    label: "Business / landing site",
    service: "product-web-engineering",
    blurb: "Marketing site, services, contact — built to convert.",
    price: [1200, 2500],
    weeks: [2, 4],
  },
  {
    label: "Portfolio / personal",
    service: "product-web-engineering",
    blurb: "A sharp personal or portfolio site that loads fast.",
    price: [600, 1500],
    weeks: [1, 3],
  },
  {
    label: "E-commerce store",
    service: "ecommerce-development",
    blurb: "Storefront, cart, checkout, Paystack/Stripe payments.",
    price: [2500, 6000],
    weeks: [4, 8],
  },
  {
    label: "Booking / service platform",
    service: "product-web-engineering",
    blurb: "Scheduling, service flows, and customer accounts.",
    price: [3000, 8000],
    weeks: [6, 10],
  },
  {
    label: "Web app / SaaS",
    service: "product-web-engineering",
    blurb: "Multi-role platform with auth, dashboards, and admin.",
    price: [5000, 15000],
    weeks: [8, 16],
  },
  {
    label: "AI-powered tool",
    service: "ai-integration",
    blurb: "LLM features, copilots, or automation with real value.",
    price: [4000, 12000],
    weeks: [6, 12],
  },
];

export type EstimatorFeature = {
  label: string;
  price: [number, number];
};

export const estimatorFeatures: EstimatorFeature[] = [
  { label: "Online payments", price: [400, 1200] },
  { label: "User accounts / login", price: [400, 1000] },
  { label: "Booking / scheduling", price: [500, 1200] },
  { label: "Blog / CMS", price: [400, 900] },
  { label: "Admin dashboard", price: [800, 2000] },
  { label: "AI features", price: [1000, 3000] },
  { label: "Multi-language", price: [300, 800] },
  { label: "Live chat", price: [200, 500] },
  { label: "Email notifications", price: [150, 400] },
];

export const timelines = [
  "ASAP / under 1 month",
  "1–3 months",
  "3+ months",
  "Flexible",
] as const;

/** Rush delivery compresses the schedule; it costs more. */
export const RUSH_TIMELINE = "ASAP / under 1 month";
export const RUSH_MULTIPLIER = 1.15;

export function formatUsd(n: number) {
  const rounded = Math.round(n / 100) * 100;
  return `$${rounded.toLocaleString("en-US")}`;
}
