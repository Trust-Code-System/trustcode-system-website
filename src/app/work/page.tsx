import { PageHero } from "@/components/page-hero";
import { PortfolioSpace } from "@/components/experience/portfolio-space";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "Selected work",
  description: "A new selection of TrustCode projects is being prepared.",
  path: "/work",
});
export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="selected work"
        title="The next chapter is taking shape."
        intro="A new selection of projects will live here. Thoughtfully selected. Clearly presented."
      />
      <PortfolioSpace standalone />
    </>
  );
}
