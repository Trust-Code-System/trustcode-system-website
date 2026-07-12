import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Estimator } from "@/components/estimator";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Project Estimator",
  description:
    "Scope your project in 60 seconds, pick what you're building and the features you need, and get an instant ballpark price range and timeline.",
  path: "/estimate",
});

export default function EstimatePage() {
  return (
    <>
      <PageHero
        eyebrow="estimator"
        title="Scope your project in 60 seconds."
        intro="Pick what you're building and the features you need, you'll get an instant ballpark range and typical timeline. No email required to see the number."
      />
      <Section>
        <Estimator />
      </Section>
    </>
  );
}
