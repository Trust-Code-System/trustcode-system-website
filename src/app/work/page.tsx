import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WorkGrid } from "@/components/work-grid";
import { CtaBand } from "@/components/cta-band";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Engineering Projects",
  description:
    "Explore selected software, cloud, cybersecurity, fintech, education, and commerce projects created and delivered by TrustCode System.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="featured work"
        title="Software, cloud systems and security work delivered by one team."
        intro="Explore selected products, technical platforms, cloud architectures and cybersecurity projects created and delivered by TrustCode System."
      />
      <Section>
        <WorkGrid />
      </Section>
      <CtaBand />
    </>
  );
}
