import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { ArrowRight, Check } from "@/components/icons";
import { industries } from "@/content/industries";
import { projects } from "@/content/portfolio";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return pageMeta({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const relevantProjects = projects.filter((p) =>
    p.categories.some((c) => industry.categories.includes(c))
  );
  const relevantServices = services.filter((s) =>
    industry.serviceSlugs.includes(s.slug)
  );

  return (
    <>
      <PageHero
        eyebrow={`industries / ${industry.name.toLowerCase()}`}
        title={industry.headline}
        intro={industry.intro}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn-primary">
            Start a Project
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/estimate" className="btn-secondary">
            Request a Consultation
          </Link>
        </div>
      </PageHero>

      {/* Pain points */}
      <Section>
        <SectionHeading
          eyebrow="what we solve"
          title={`The problems ${industry.name.toLowerCase()} teams bring to us.`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {industry.painPoints.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.05} as="div">
              <div className="card h-full p-7">
                <h3 className="display-h3 text-[1.2rem]">{p.title}</h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-slate">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What we deliver */}
      <Section className="border-y border-grid bg-surface">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">/ what we build</p>
            <h2 className="display-h2 mt-4">
              Delivered by the relevant specialists, not generalists.
            </h2>
            <ul className="mt-8 space-y-3">
              {industry.deliver.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2.5 text-[0.95rem] text-ink"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-5">
            {relevantServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="card card-hover group block p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="display-h3 text-[1.15rem]">{s.title}</h3>
                </div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-slate">
                  {s.short}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Proof */}
      {relevantProjects.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="proof"
            title={`${industry.name} work you can inspect.`}
            link={{ href: "/work", label: "All work" }}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relevantProjects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05} as="div">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
