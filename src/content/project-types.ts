import { projectTypes } from "./estimator";
export function getProjectType(id: string | null | undefined) {
  return projectTypes.find((type) => type.id === id);
}
export function plannerHref(service: string) {
  const type = projectTypes.find((type) => type.service === service);
  return type
    ? `/estimate?type=${type.id}`
    : `/estimate?service=${encodeURIComponent(service)}`;
}
export const legacyProjectLabels: Record<string, string> = {
  "Online store": "Starter online store",
  "App or platform": "Web app / software platform",
  "Portfolio or personal site": "Portfolio / personal site",
  "Booking platform": "Booking / appointment platform",
  "AI tool or integration": "Custom AI tool or automation",
  "Business / landing site": "Business website",
  "Portfolio / personal": "Portfolio / personal site",
  "E-commerce store": "Starter online store",
  "Booking / service platform": "Booking / appointment platform",
  "Web app / SaaS": "Web app / software platform",
  "AI-powered tool": "Custom AI tool or automation",
};
