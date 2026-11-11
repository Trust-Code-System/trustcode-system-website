import { describe, expect, it } from "vitest";
import { servicePages, servicePageFor } from "./service-pages";
import { projects } from "./portfolio";
import { itemPrice, priceFor } from "@/lib/pricing";
import sitemap from "@/app/sitemap";
import { site } from "./site";

describe("service page publishing integrity", () => {
  it("has unique public routes and does not resolve an unknown service", () => {
    expect(new Set(servicePages.map((page) => page.slug)).size).toBe(
      servicePages.length,
    );
    expect(servicePageFor("not-a-service")).toBeUndefined();
  });

  it.each(servicePages)(
    "connects $slug to valid pricing, portfolio and sitemap entries",
    (page) => {
      expect(page.priceIds).toContain(page.primaryPriceId);
      for (const id of page.priceIds)
        expect(priceFor(id), `${page.slug}: ${id}`).toBeDefined();
      for (const slug of [
        ...page.proofSlugs,
        ...(page.heroProject ? [page.heroProject] : []),
      ]) {
        expect(
          projects.find((project) => project.slug === slug),
          slug,
        ).toBeDefined();
      }
      expect(
        sitemap().filter(
          (entry) => entry.url === `${site.url}/services/${page.slug}`,
        ),
      ).toHaveLength(1);
      expect(page.seoDescription).toContain(
        itemPrice(priceFor(page.primaryPriceId)!).toLowerCase(),
      );
    },
  );

  it("keeps maintenance monthly and avoids presenting a build as a maintenance contract", () => {
    const page = servicePageFor("website-maintenance")!;
    expect(page.proofSlugs).toEqual([]);
    expect(page.heroProject).toBeUndefined();
    expect(page.priceIds.every((id) => priceFor(id)?.pillar === "Run")).toBe(
      true,
    );
  });

  it("identifies the NELO example as an interface preview", () => {
    const page = servicePageFor("ecommerce-development")!;
    expect(page.proofSlugs).toContain("nelo-woman");
    expect(page.proofIntro).toMatch(/NELO Woman storefront-interface preview/);
    expect(
      projects.find((project) => project.slug === "nelo-woman")?.proofType,
    ).toBe("preview");
  });
});
