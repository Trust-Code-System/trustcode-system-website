import { describe, expect, it } from "vitest";
import {
  getFeaturedProjects,
  getMoreWork,
  homepagePreviewSlugs,
  projects,
} from "@/content/portfolio";

const LEGACY_SLUGS = [
  "the-thesis-desk",
  "helping-tribe-academy",
  "atlas-hr",
  "airtimevault",
  "wearables-atelier",
  "petrobrain",
  "aureo",
  "studycoach",
  "clabed-autos",
  "sln-engineering",
  "serverless-youtube-pipeline",
  "soc-detection-lab",
] as const;

describe("portfolio data integrity", () => {
  it("keeps the 11 interface-led products in the featured section", () => {
    expect(getFeaturedProjects()).toHaveLength(11);
  });

  it("keeps technical showcases out of the featured product section", () => {
    expect(
      getFeaturedProjects().every(
        (project) =>
          project.live !== null &&
          ["product-screenshot", "branded"].includes(project.visualType)
      )
    ).toBe(true);
  });

  it("uses unique featured orders 1–11", () => {
    const orders = getFeaturedProjects().map((p) => p.featuredOrder);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it("orders the top three featured projects as Atlas, Helping Tribe, 9th Luxe", () => {
    expect(getFeaturedProjects().slice(0, 3).map((p) => p.slug)).toEqual([
      "atlas-hr",
      "helping-tribe-academy",
      "9th-luxe",
    ]);
  });

  it("keeps The Thesis Desk once under featured product work", () => {
    const featured = getFeaturedProjects().filter(
      (p) => p.slug === "the-thesis-desk"
    );
    const more = getMoreWork().filter((p) => p.slug === "the-thesis-desk");
    expect(featured).toHaveLength(1);
    expect(more).toHaveLength(0);
    expect(projects.filter((p) => p.slug === "the-thesis-desk")).toHaveLength(
      1
    );
  });

  it("lists 9th Luxe once with a live store destination", () => {
    const matches = projects.filter((p) => p.slug === "9th-luxe");
    expect(matches).toHaveLength(1);
    const luxe = matches[0];
    expect(luxe.featured).toBe(true);
    expect(luxe.live).toContain("9thluxe-store-two.vercel.app");
    expect(luxe.sourceUrl).toBeUndefined();
    expect(luxe.title).toBe("9th Luxe");
    expect(luxe.title.toLowerCase()).not.toContain("fádé");
    expect(luxe.title.toLowerCase()).not.toContain("fade");
  });

  it("preserves every legacy project slug", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const slug of LEGACY_SLUGS) {
      expect(slugs.has(slug)).toBe(true);
    }
  });

  it("has no duplicate slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("requires title, slug, and proof type on every project", () => {
    for (const p of projects) {
      expect(p.slug.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.proofType).toBeTruthy();
    }
  });

  it("keeps backend, cloud, and security showcases in technical work", () => {
    const more = new Set(getMoreWork().map((p) => p.slug));
    expect(more.has("event-photo-platform")).toBe(true);
    expect(more.has("debt-tracker-api")).toBe(true);
    expect(more.has("multi-carrier-shipping")).toBe(true);
    expect(more.has("serverless-youtube-pipeline")).toBe(true);
    expect(more.has("home-detection-lab")).toBe(true);
    expect(more.has("jojos-hospital-kql")).toBe(true);
    expect(more.has("network-security-segmentation-lab")).toBe(true);
    expect(more.has("soc-detection-lab")).toBe(true);
  });

  it("orders interface-led products before technical showcases", () => {
    expect(getFeaturedProjects().map((p) => p.slug)).toEqual([
      "atlas-hr",
      "helping-tribe-academy",
      "9th-luxe",
      "clabed-autos",
      "sln-engineering",
      "airtimevault",
      "the-thesis-desk",
      "wearables-atelier",
      "petrobrain",
      "aureo",
      "studycoach",
    ]);
  });

  it("does not label github-only projects as live", () => {
    for (const p of projects) {
      if (!p.live) {
        expect(["live", "live-client"]).not.toContain(p.proofType);
      }
    }
  });

  it("keeps careful fork attribution for debt tracker", () => {
    const debt = projects.find((p) => p.slug === "debt-tracker-api")!;
    expect(debt.contribution?.toLowerCase()).toMatch(/contribut/);
    expect(debt.contribution?.toLowerCase()).not.toMatch(
      /abdulhaleem (built|created|completed)/
    );
    expect(debt.sourceUrl).toContain("debt-tracker-api");
  });

  it("uses collective language in contribution copy", () => {
    const personal =
      /(abass|bashir|abdulhaleem|olamilekan)\s+(built|developed|created|completed|led)/i;
    for (const p of projects) {
      if (p.contribution) {
        expect(p.contribution).not.toMatch(personal);
      }
    }
  });

  it("keeps an interface-led homepage preview set", () => {
    const preview = homepagePreviewSlugs.map(
      (s) => projects.find((p) => p.slug === s)!
    );
    expect(preview).toHaveLength(4);
    expect(
      preview.every(
        (project) =>
          project.live !== null &&
          ["product-screenshot", "branded"].includes(project.visualType)
      )
    ).toBe(true);
  });
});
