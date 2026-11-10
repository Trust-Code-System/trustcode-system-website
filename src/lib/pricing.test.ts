import { describe, expect, it } from "vitest";
import {
  pricing,
  addOns,
  itemPrice,
  priceFor,
  commercialTerms,
  INTERNATIONAL_PRICING_ENABLED,
  selectedAddOns,
  startingTotal,
} from "./pricing";
import { projectTypes } from "@/content/estimator";
import { faqs } from "@/content/faq";
import { buildSystemPrompt } from "./assistant-knowledge";

describe("founder-approved commercial content", () => {
  it("keeps every approved service available with stable planner identifiers", () => {
    expect(pricing).toHaveLength(27);
    expect(new Set(pricing.map((item) => item.id)).size).toBe(pricing.length);
    for (const price of pricing) {
      expect(projectTypes.find((type) => type.id === price.id)?.label).toBe(
        price.title,
      );
      if (price.ngn != null) expect(itemPrice(price)).toMatch(/^From ₦/);
    }
    expect(INTERNATIONAL_PRICING_ENABLED).toBe(false);
    expect(
      pricing.every((item) => item.usd === undefined && item.gbp === undefined),
    ).toBe(true);
  });
  it("preserves monthly care, one-off audits and the scoped security exception", () => {
    expect(itemPrice(priceFor("basic-care")!)).toBe("From ₦50,000/month");
    expect(itemPrice(priceFor("code-audit")!)).toBe("From ₦150,000");
    expect(priceFor("code-audit")?.description).toContain(
      "credited to the build",
    );
    expect(itemPrice(priceFor("security-monitoring")!)).toBe(
      "Tailored quote after a scoping call",
    );
  });
  it("counts an add-on only once when selected through features and add-ons", () => {
    const base = priceFor("online-store")!.ngn!;
    const extra = addOns.find((item) => item.id === "multi-language")!.ngn;
    expect(
      selectedAddOns(["Multi-language"], ["multi-language", "multi-language"]),
    ).toHaveLength(1);
    expect(
      startingTotal("online-store", ["Multi-language"], ["multi-language"]),
    ).toBe(base + extra);
    expect(startingTotal("online-store", ["Multi-language"], [], true)).toBe(
      Math.ceil((base + extra) * (1 + commercialTerms.rushPercent / 100)),
    );
    expect(startingTotal("security-monitoring", [], [])).toBeNull();
    expect(startingTotal("corporate-website", ["Blog / CMS"], [])).toBe(priceFor("corporate-website")!.ngn);
  });
  it("keeps the FAQ and assistant aligned with the published rate card", () => {
    const prompt = buildSystemPrompt();
    for (const item of pricing) expect(prompt).toContain(itemPrice(item));
    expect(prompt).toContain(commercialTerms.disclaimer);
    expect(prompt).toContain(commercialTerms.payment);
    expect(prompt).not.toMatch(
      /no public package prices|does not publish fixed service prices|based in Lagos and London/i,
    );
    expect(faqs.find((faq) => faq.q === "How do payments work?")?.a).toContain(
      commercialTerms.payment,
    );
    expect(
      faqs.find((faq) => faq.q.startsWith("How do you price"))?.a,
    ).toContain(itemPrice(priceFor("business-website")!));
  });
});
