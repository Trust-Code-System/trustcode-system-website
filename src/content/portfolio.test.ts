import { describe, expect, it } from "vitest";
import {
  projects,
  getFeaturedProjects,
  getMoreWork,
  getProjectBySlug,
  homepagePreviewSlugs,
} from "./portfolio";
describe("selected portfolio publication", () => {
  it("publishes exactly the three user-supplied destinations", () => {
    expect(projects.map((project) => project.live)).toEqual([
      "https://www.sekibat-nig-limited.com/",
      "https://nelo-frontend.vercel.app/ng",
      "https://wearablesbyashabi.store/",
    ]);
    expect(getFeaturedProjects()).toHaveLength(3);
    expect(getMoreWork()).toEqual([]);
    expect(homepagePreviewSlugs).toEqual(
      projects.map((project) => project.slug),
    );
    expect(getProjectBySlug("nelo-woman")?.proofType).toBe("preview");
  });
  it("does not resolve removed project URLs", () => {
    expect(getProjectBySlug("atlas-hr")).toBeUndefined();
    expect(getProjectBySlug("9th-luxe")).toBeUndefined();
  });
});
