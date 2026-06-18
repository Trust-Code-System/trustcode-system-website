import { z } from "zod";

export const serviceOptions = [
  { value: "product-web-engineering", label: "Product & Web Engineering" },
  { value: "ecommerce-development", label: "E-Commerce Development" },
  { value: "cloud-devops", label: "Cloud & DevOps Engineering" },
  { value: "ai-integration", label: "AI Integration & Automation" },
  { value: "cybersecurity-soc", label: "Cybersecurity & SOC Services" },
  { value: "it-support-managed", label: "IT Support & Managed Services" },
  { value: "training-mentorship", label: "Training & Technical Mentorship" },
  { value: "not-sure", label: "Not sure yet — help me scope it" },
] as const;

export const budgetOptions = [
  "Under $2k",
  "$2k–$5k",
  "$5k–$15k",
  "$15k+",
  "Retainer / ongoing",
] as const;

// --- Project brief (all optional) ---------------------------------------

export const siteTypeOptions = [
  "Business / landing site",
  "E-commerce store",
  "Web app / SaaS",
  "Booking / service platform",
  "Portfolio / personal",
  "AI-powered tool",
  "Not sure yet",
] as const;

export const goalOptions = [
  "Get leads & inquiries",
  "Sell products",
  "Sign up & manage users",
  "Showcase work",
  "Share information",
  "Internal / business tool",
] as const;

export const startingPointOptions = [
  "Brand new — starting fresh",
  "Redesign an existing site",
  "Have branding, need a site",
] as const;

export const designVibeOptions = [
  "Clean & minimal",
  "Bold & modern",
  "Premium / luxury",
  "Playful & friendly",
  "Corporate & professional",
  "Guide me",
] as const;

export const featureOptions = [
  "Online payments",
  "User accounts / login",
  "Booking / scheduling",
  "Blog / CMS",
  "Admin dashboard",
  "AI features",
  "Multi-language",
  "Live chat",
  "Email notifications",
] as const;

export const timelineOptions = [
  "ASAP / under 1 month",
  "1–3 months",
  "3+ months",
  "Flexible",
] as const;

const briefText = z.string().trim().max(160).optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Please choose a service.").max(80),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  // Project brief — all optional, free strings so "Other" entries pass through.
  siteType: briefText,
  goal: briefText,
  startingPoint: briefText,
  designVibe: briefText,
  features: z.array(z.string().trim().max(80)).max(30).optional(),
  timeline: briefText,
  inspiration: z.string().trim().max(1000).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(4000),
  // Honeypot: real users never see this field; bot-filled values are accepted
  // by validation so the API can silently drop them.
  website: z.string().trim().max(500).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
