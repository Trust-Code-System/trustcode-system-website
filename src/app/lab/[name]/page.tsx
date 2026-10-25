import { notFound } from "next/navigation";
import catalog from "@/content/react-bits-catalog.json";
import { FullExperiment } from "@/components/lab/playground";
export const metadata = {
  title: "Interaction experiment | TrustCode",
  robots: { index: false, follow: true },
};
export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  if (!catalog.some((i) => i.name === name)) notFound();
  return <FullExperiment name={name} />;
}
