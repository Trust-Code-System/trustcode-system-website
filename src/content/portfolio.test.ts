import { describe, expect, it } from "vitest";
import {
  getFeaturedByOwner,
  getFeaturedProjects,
  getMoreWork,
  homepagePreviewSlugs,
  projects,
  type ProjectOwnerId,
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
  it("has exactly 12 featured projects", () => {
    expect(getFeaturedProjects()).toHaveLength(12);
  });

  it("keeps internal balance of 3 featured projects per discipline owner", () => {
    const owners: ProjectOwnerId[] = [
      "abass",
      "abdulhaleem",
      "olamilekan",
      "bashir",
    ];
    for (const id of owners) {
      expect(getFeaturedByOwner(id)).toHaveLength(3);
    }
  });

  it("uses unique featured orders 1–12", () => {
    const orders = getFeaturedProjects().map((p) => p.featuredOrder);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
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

  it("keeps non-featured legacy projects in More Work", () => {
    const more = new Set(getMoreWork().map((p) => p.slug));
    expect(more.has("airtimevault")).toBe(true);
    expect(more.has("wearables-atelier")).toBe(true);
    expect(more.has("petrobrain")).toBe(true);
    expect(more.has("aureo")).toBe(true);
    expect(more.has("studycoach")).toBe(true);
    expect(more.has("soc-detection-lab")).toBe(true);
  });

  it("orders featured projects in the established sequence", () => {
    expect(getFeaturedProjects().map((p) => p.slug)).toEqual([
      "atlas-hr",
      "helping-tribe-academy",
      "the-thesis-desk",
      "debt-tracker-api",
      "serverless-youtube-pipeline",
      "multi-carrier-shipping",
      "home-detection-lab",
      "jojos-hospital-kql",
      "network-security-segmentation-lab",
      "clabed-autos",
      "sln-engineering",
      "event-photo-platform",
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
    const personal = /(abass|bashir|abdulhaleem|olamilekan)\s+(built|developed|created|completed|led)/i;
    for (const p of projects) {
      if (p.contribution) {
        expect(p.contribution).not.toMatch(personal);
      }
    }
  });

  it("keeps a balanced homepage preview set", () => {
    const preview = homepagePreviewSlugs.map(
      (s) => projects.find((p) => p.slug === s)!
    );
    expect(preview).toHaveLength(4);
    expect(new Set(preview.map((p) => p.ownerId)).size).toBe(4);
  });
});
