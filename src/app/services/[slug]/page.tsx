import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-pages";
import { servicePages, servicePageFor } from "@/content/service-pages";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = servicePageFor((await params).slug);
  if (!page) return {};
  return pageMeta({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/services/${page.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = servicePageFor((await params).slug);
  if (!page) notFound();
  return <ServiceDetail page={page} />;
}
