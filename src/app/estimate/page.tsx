import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Estimator } from "@/components/estimator";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Start a Project",
  description:
    "Share your objectives, required features and timeline. TrustCode will review your brief and provide a tailored proposal.",
  path: "/estimate",
});

export default function EstimatePage() {
  return (
    <>
      <PageHero
        eyebrow="start a project"
        title="Let's scope your project properly."
        intro="Every project is different. Tell us what you are building, and we will recommend the right scope, delivery approach and next steps."
      />
      <Section>
        <Estimator />
      </Section>
    </>
  );
}
