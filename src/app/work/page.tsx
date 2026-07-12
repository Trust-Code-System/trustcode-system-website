import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WorkGrid } from "@/components/work-grid";
import { CtaBand } from "@/components/cta-band";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Engineering Projects",
  description:
    "Explore selected products, cloud systems, cybersecurity projects and digital platforms designed and delivered by TrustCode.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="featured work"
        title="Engineering work delivered by one multidisciplinary team."
        intro="Explore selected products, cloud systems, cybersecurity projects and digital platforms designed and delivered by TrustCode."
      />
      <Section>
        <WorkGrid />
      </Section>
      <CtaBand />
    </>
  );
}
