import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { ProjectThumb } from "@/components/project-thumb";
import { Reveal } from "@/components/reveal";
import { ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import { projects } from "@/content/portfolio";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMeta({
    title: project.title,
    description: `${project.tagline} ${project.outcome}`,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="relative overflow-hidden border-b border-grid">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div className="container-x relative py-12 sm:py-16">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[0.85rem] text-slate hover:text-ink"
          >
            ← All work
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge">{project.sector}</span>
                {project.categories.map((c) => (
                  <span key={c} className="badge">
                    {c}
                  </span>
                ))}
              </div>
              <h1 className="display-h1 mt-5 text-[clamp(2rem,5vw,3.25rem)]">
                {project.title}
              </h1>
              <p className="lead mt-4 max-w-xl">{project.tagline}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Visit live site
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="badge">Internal showcase</span>
                )}
                <Link href="/contact" className="btn-secondary">
                  Start something like this
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-card border border-grid">
              <ProjectThumb project={project} className="aspect-[16/11]" />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-10">
                <p className="eyebrow">/ the problem</p>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-ink">
                  {project.problem}
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="mb-10">
                <p className="eyebrow">/ what we built</p>
                <ul className="mt-4 space-y-3">
                  {project.built.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[1rem] text-ink">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-verified" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="card bg-surface p-7">
                <p className="eyebrow">/ the outcome</p>
                <p className="mt-3 font-display text-[1.4rem] font-semibold leading-snug tracking-tight">
                  {project.outcome}
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <div className="card sticky top-24 p-7">
              <p className="eyebrow mb-3">/ tech stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t} className="badge">
                    {t}
                  </span>
                ))}
              </div>

              <p className="eyebrow mb-3 mt-7">/ team</p>
              <ul className="space-y-2">
                {project.team.map((member) => (
                  <li key={member} className="text-[0.92rem] text-ink">
                    {member}
                  </li>
                ))}
              </ul>

              {project.live && (
                <>
                  <p className="eyebrow mb-3 mt-7">/ live url</p>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 break-all font-mono text-[0.82rem] text-blueprint hover:underline"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-verified" />
                    {project.live.replace(/^https?:\/\//, "")}
                  </a>
                </>
              )}
            </div>
          </aside>
        </div>
      </Section>

      <section className="border-t border-grid bg-surface">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">/ next case study</p>
            <Link
              href={`/work/${next.slug}`}
              className="display-h3 mt-2 inline-flex items-center gap-2 text-[1.5rem] hover:text-blueprint"
            >
              {next.title}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <Link href="/contact" className="btn-primary">
            Start something like this
          </Link>
        </div>
      </section>
    </>
  );
}
