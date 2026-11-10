import { z } from "zod";
import {
  projectTypes,
  timelines,
  estimatorFeatures,
} from "@/content/estimator";
import { getProjectType } from "@/content/project-types";
import {
  addOns,
  selectedAddOns,
  priceFor,
  itemPrice,
  formatFrom,
  startingTotal,
  commercialTerms,
} from "./pricing";
import { serviceOptions } from "./contact-schema";
import { normalizeBudget } from "./budgets";
export const PLANNER_DRAFT_KEY = "tc-planner-draft-v1";
export const plannerDraftSchema = z.object({
  typeId: z.string().refine((id) => !id || Boolean(getProjectType(id))),
  features: z
    .array(z.string())
    .transform((items) => [
      ...new Set(
        items.filter((item) =>
          estimatorFeatures.some((feature) => feature.label === item),
        ),
      ),
    ]),
  timeline: z
    .string()
    .refine(
      (value) => !value || (timelines as readonly string[]).includes(value),
    ),
  budget: z.string().max(60).transform(normalizeBudget),
  service: z
    .string()
    .max(80)
    .refine(
      (value) => !value || serviceOptions.some((item) => item.value === value),
    )
    .optional(),
  addOnIds: z
    .array(z.string())
    .transform((ids) => [
      ...new Set(ids.filter((id) => addOns.some((item) => item.id === id))),
    ])
    .default([]),
  rush: z.boolean().default(false),
});
export type PlannerDraft = z.infer<typeof plannerDraftSchema>;
export const emptyPlanner: PlannerDraft = {
  typeId: "",
  features: [],
  timeline: "",
  budget: "",
  addOnIds: [],
  rush: false,
};
export function deliveryWindow(draft: PlannerDraft) {
  const type = getProjectType(draft.typeId);
  return type?.timeline ?? "Agreed after scoping";
}
export function plannerBrief(draft: PlannerDraft) {
  const type = projectTypes.find((item) => item.id === draft.typeId);
  if (!type) return null;
  const price = priceFor(draft.typeId);
  const isBuild = price?.pillar === "Build";
  const extras = isBuild
    ? selectedAddOns(draft.features, draft.addOnIds, draft.typeId)
    : [];
  const total = startingTotal(
    draft.typeId,
    isBuild ? draft.features : [],
    isBuild ? draft.addOnIds : [],
    isBuild && draft.rush,
  );
  const priceNote = price
    ? ` ${itemPrice(price)} for the standard scope.${total != null && extras.length ? ` With selected extras: ${formatFrom(total)}.` : ""}${isBuild && draft.rush ? ` Rush delivery requested (+${commercialTerms.rushPercent}%), subject to availability.` : ""}`
    : "";
  return {
    service: draft.service || type.service,
    siteType: type.label,
    features: [
      ...draft.features,
      ...extras.filter((extra) => !extra.feature).map((extra) => extra.title),
      ...(isBuild && draft.rush ? ["Rush delivery requested"] : []),
    ],
    timeline: draft.timeline,
    budget: draft.budget,
    message: `Project brief: ${type.label}${extras.some((item) => !item.feature) ? `; requested extras: ${extras.filter((item) => !item.feature).map((item) => item.title).join(", ")}` : ""}${draft.features.length ? ` with ${draft.features.join(", ")}` : ""}.${draft.timeline ? ` Preferred timeline: ${draft.timeline}.` : ""}${draft.budget ? ` Available budget: ${draft.budget} (not a quote).` : ""}${priceNote} Indicative delivery window: ${deliveryWindow(draft)}, subject to scope. Please recommend the right scope and next steps.`,
  };
}
