import { describe, expect, it } from "vitest";
import { emptyPlanner, plannerDraftSchema, plannerBrief } from "./planner";
import { projectTypes } from "@/content/estimator";
import { getProjectType, plannerHref } from "@/content/project-types";
import { normalizePrefill, prefillSchema } from "./contact-prefill";
import { contactSchema } from "./contact-schema";
import { priceFor, itemPrice } from "./pricing";

describe("planner and contact handoff", () => {
  it("rejects unknown type identifiers and malformed stored drafts", () => {
    expect(getProjectType("not-a-real-type")).toBeUndefined();
    expect(
      plannerDraftSchema.safeParse({ ...emptyPlanner, typeId: "<script>" })
        .success,
    ).toBe(false);
    expect(
      plannerDraftSchema.safeParse({ ...emptyPlanner, service: "bad-slug" })
        .success,
    ).toBe(false);
    expect(plannerDraftSchema.safeParse(null).success).toBe(false);
    expect(plannerBrief(emptyPlanner)).toBeNull();
  });
  it("carries every type into a valid contact prefill and submission", () => {
    for (const type of projectTypes) {
      const brief = plannerBrief({
        ...emptyPlanner,
        typeId: type.id,
        features: ["Online payments"],
        timeline: "1–3 months",
        budget: "₦1.5m–₦5m",
      })!;
      const n = normalizePrefill(prefillSchema.parse(brief));
      expect(n.siteType).toBe(type.label);
      expect(n.service).toBe(type.service);
      expect(n.features).toContain("Online payments");
      expect(n.budget).toBe("₦1.5m–₦5m");
      expect(
        contactSchema.safeParse({
          ...brief,
          name: "QA Visitor",
          email: "qa@example.com",
        }).success,
      ).toBe(true);
    }
  });
  it("preserves extras in both readable message and contact fields", () => {
    const brief = plannerBrief({
      ...emptyPlanner,
      typeId: "online-store",
      features: ["Multi-language"],
      addOnIds: ["extra-page"],
      rush: true,
      timeline: "Flexible",
    })!;
    expect(brief.message).toContain(itemPrice(priceFor("online-store")!));
    expect(brief.message).toContain("Extra page (per page)");
    expect(brief.features).toContain("Rush delivery requested");
    expect(normalizePrefill(brief).featureOther).toContain("Extra page");
    const retained = plannerDraftSchema.parse(
      JSON.parse(
        JSON.stringify({
          ...emptyPlanner,
          typeId: "online-store",
          features: ["Multi-language"],
          addOnIds: ["extra-page"],
          rush: true,
        }),
      ),
    );
    expect(retained.addOnIds).toEqual(["extra-page"]);
    expect(retained.rush).toBe(true);
  });
  it("does not apply build add-on or rush charges to monthly care", () => {
    const brief = plannerBrief({
      ...emptyPlanner,
      typeId: "basic-care",
      addOnIds: ["extra-page"],
      rush: true,
    })!;
    expect(brief.message).toContain("/month");
    expect(brief.message).not.toContain("With selected extras");
    expect(brief.features).not.toContain("Rush delivery requested");
  });
  it("migrates legacy answers without guessing a numeric budget", () => {
    const n = normalizePrefill({
      siteType: "E-commerce store",
      budget: "Significant",
      service: "ecommerce-development",
    });
    expect(n.siteType).toBe(priceFor("online-store")!.title);
    expect(n.budget).toBe("Not sure yet");
    expect(plannerHref("ecommerce-development")).toBe(
      "/estimate?type=online-store",
    );
  });
});
