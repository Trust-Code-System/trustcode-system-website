import { pricing } from "@/lib/pricing";
export type ProjectType = {
  id: string;
  label: string;
  service: string;
  blurb: string;
  group: string;
  weeks: [number, number];
  timeline: string;
};
export const projectTypes: ProjectType[] = [
  ...pricing.map((item) => ({
    id: item.id,
    label: item.title,
    service: item.service,
    blurb: item.description,
    group: item.pillar === "Build" ? item.group : "Something else",
    weeks: item.weeks ?? ([0, 0] as [number, number]),
    timeline: item.timeline,
  })),
  {
    id: "something-else",
    label: "Something else / not sure yet",
    service: "not-sure",
    blurb: "Tell us the problem. We’ll help you find the right approach.",
    group: "Something else",
    weeks: [0, 0],
    timeline: "Agreed after scoping",
  },
];
export const homepageProjectTypes = [
  { id: "business-website", label: "Business website" },
  { id: "online-store", label: "Online store" },
  { id: "app-platform", label: "App or platform" },
  { id: "booking-platform", label: "Booking platform" },
  { id: "ai-tool", label: "AI tool or integration" },
  { id: "something-else", label: "Something else" },
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
