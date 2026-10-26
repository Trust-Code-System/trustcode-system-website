import { PageHero } from "@/components/page-hero";
import { ProjectShowcase } from "@/components/experience/project-showcase";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "Selected work",
  description: "Explore Sekibat, NELO Woman and Wearables by Ashabi.",
  path: "/work",
});
export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="selected work"
        title="Digital work, out in the world."
        intro="Property, fashion and commerce. Three distinct digital experiences to explore."
      />
      <ProjectShowcase standalone />
    </>
  );
}
