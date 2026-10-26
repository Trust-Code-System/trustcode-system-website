import { describe, expect, it } from "vitest";
import {
  projects,
  getFeaturedProjects,
  getMoreWork,
  getProjectBySlug,
  homepagePreviewSlugs,
} from "./portfolio";
describe("portfolio publication state", () => {
  it("publishes no project cards while replacement work is being prepared", () => {
    expect(projects).toEqual([]);
    expect(getFeaturedProjects()).toEqual([]);
    expect(getMoreWork()).toEqual([]);
    expect(homepagePreviewSlugs).toEqual([]);
  });
  it("does not resolve removed project URLs", () => {
    expect(getProjectBySlug("atlas-hr")).toBeUndefined();
    expect(getProjectBySlug("9th-luxe")).toBeUndefined();
  });
});
