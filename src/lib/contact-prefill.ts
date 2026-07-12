import { z } from "zod";
import {
  serviceOptions,
  budgetOptions,
  siteTypeOptions,
  goalOptions,
  startingPointOptions,
  designVibeOptions,
  featureOptions,
  timelineOptions,
} from "./contact-schema";

/**
 * Bridge between the AI assistant and the contact form. The assistant emits a
 * prefill object (validated by `prefillSchema`); the widget stores it under
 * `PREFILL_STORAGE_KEY` and dispatches `PREFILL_EVENT`; the contact form reads
 * it and fills its fields. The assistant only ever fills, it never submits.
 */

export const PREFILL_STORAGE_KEY = "tc-contact-prefill";
export const PREFILL_EVENT = "tc-contact-prefill-apply";

/** Sentinel wrapping the machine-readable block in the assistant's reply. */
export const PREFILL_OPEN = "⟦TRUSTCODE_PREFILL⟧";
export const PREFILL_CLOSE = "⟦END⟧";

export const prefillSchema = z
  .object({
    name: z.string().max(120).optional(),
    email: z.string().max(200).optional(),
    company: z.string().max(160).optional(),
    service: z.string().max(80).optional(),
    budget: z.string().max(60).optional(),
    siteType: z.string().max(160).optional(),
    goal: z.string().max(160).optional(),
    startingPoint: z.string().max(160).optional(),
    designVibe: z.string().max(160).optional(),
    timeline: z.string().max(160).optional(),
    features: z.array(z.string().max(80)).max(30).optional(),
    inspiration: z.string().max(1000).optional(),
    message: z.string().max(4000).optional(),
  })
  .strip();

export type ContactPrefill = z.infer<typeof prefillSchema>;

const OTHER = "Other";

/** Compare dash- and case-insensitively so "1-3 months" matches "1–3 months". */
function norm(s: string): string {
  return s.trim().toLowerCase().replace(/[‒-―]/g, "-");
}

function matchOption(
  value: string | undefined,
  options: readonly string[]
): string | null {
  if (!value) return null;
  const target = norm(value);
  return options.find((o) => norm(o) === target) ?? null;
}

export type NormalizedPrefill = {
  text: {
    name: string;
    email: string;
    company: string;
    inspiration: string;
    message: string;
  };
  service: string;
  budget: string;
  siteType: string;
  siteTypeOther: string;
  goal: string;
  goalOther: string;
  startingPoint: string;
  designVibe: string;
  timeline: string;
  features: string[];
  featureOther: string;
};

/**
 * Map a raw assistant prefill onto exact form values. Anything that matches a
 * known option snaps to it; free-text answers route to the field's "Other"
 * slot where one exists, otherwise they fall through to the message.
 */
export function normalizePrefill(p: ContactPrefill): NormalizedPrefill {
  // Service: accept the slug value or the visible label.
  let service = "";
  if (p.service) {
    const byValue = serviceOptions.find((o) => norm(o.value) === norm(p.service!));
    const byLabel = serviceOptions.find((o) => norm(o.label) === norm(p.service!));
    service = byValue?.value ?? byLabel?.value ?? "";
  }

  const siteMatch = matchOption(p.siteType, siteTypeOptions);
  const goalMatch = matchOption(p.goal, goalOptions);

  const features: string[] = [];
  const featureExtras: string[] = [];
  for (const f of p.features ?? []) {
    const m = matchOption(f, featureOptions);
    if (m) features.push(m);
    else if (f.trim()) featureExtras.push(f.trim());
  }
  if (featureExtras.length) features.push(OTHER);

  return {
    text: {
      name: p.name?.trim() ?? "",
      email: p.email?.trim() ?? "",
      company: p.company?.trim() ?? "",
      inspiration: p.inspiration?.trim() ?? "",
      message: p.message?.trim() ?? "",
    },
    service,
    budget: matchOption(p.budget, budgetOptions) ?? "",
    siteType: siteMatch ?? (p.siteType ? OTHER : ""),
    siteTypeOther: siteMatch ? "" : p.siteType?.trim() ?? "",
    goal: goalMatch ?? (p.goal ? OTHER : ""),
    goalOther: goalMatch ? "" : p.goal?.trim() ?? "",
    startingPoint: matchOption(p.startingPoint, startingPointOptions) ?? "",
    designVibe: matchOption(p.designVibe, designVibeOptions) ?? "",
    timeline: matchOption(p.timeline, timelineOptions) ?? "",
    features,
    featureOther: featureExtras.join(", "),
  };
}
