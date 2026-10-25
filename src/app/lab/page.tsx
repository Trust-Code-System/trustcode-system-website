import { Playground } from "@/components/lab/playground";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "The Interaction Lab | TrustCode",
  description:
    "Explore motion, texture and interaction in the TrustCode lab. 218 React Bits experiments across typography, backgrounds, components and micro-interactions.",
  path: "/lab",
});
export default function LabPage() {
  return <Playground />;
}
