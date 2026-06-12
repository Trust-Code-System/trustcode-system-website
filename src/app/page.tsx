import Link from "next/link";
import Image from "next/image";
import { DeployLog } from "@/components/deploy-log";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { ProjectCard } from "@/components/project-card";
import { CtaBand } from "@/components/cta-band";
import { ArrowRight } from "@/components/icons";
import { services } from "@/content/services";
import { projects, featuredSlugs } from "@/content/portfolio";
import { team } from "@/content/team";
import { steps } from "@/content/process";
import { stats } from "@/content/site";

const featured = featuredSlugs
  .map((s) => projects.find((p) => p.slug === s))
  .filter(Boolean) as typeof projects;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-grid">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">/ TrustCode Systems Limited</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-h1 mt-5">
                Software you can stake your business on.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead mt-6 max-w-xl">
                TrustCode Systems is a four-engineer team shipping web platforms,
                cloud systems, AI features, and security — 15+ live products
                across fintech, edtech, e-commerce and beyond.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/work" className="btn-secondary">
                  See live work
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <DeployLog />
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-grid bg-surface">
        <div className="container-x grid grid-cols-2 divide-grid lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-8 text-center lg:py-10">
              <p className="font-mono text-3xl font-semibold text-blueprint sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-[0.8rem] uppercase tracking-wider text-slate">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="services"
          title="One team, full coverage — from the pixel to the server to the security layer."
          link={{ href: "/services", label: "All services" }}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.05} as="div">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured work */}
      <Section className="border-y border-grid bg-surface">
        <SectionHeading
          eyebrow="live work"
          title="Don't take our word for it. Click anything below — it's live."
          link={{ href: "/work", label: "All work" }}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} as="div">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why TrustCode — 4 pillars */}
      <Section>
        <SectionHeading
          eyebrow="why trustcode"
          title="Four engineers. Four standards. One bar: production-ready."
          intro="Each founder owns a discipline — and brings shipped proof, not a résumé line."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {team.map((f, i) => (
            <Reveal key={f.slug} delay={(i % 2) * 0.05} as="div">
              <div className="card flex h-full flex-col p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="display-h3 text-[1.3rem]">{f.pillar.title}</h3>
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
                    {f.flag} {f.name.split(" ")[0]}
                  </span>
                </div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
                  {f.pillar.proof}
                </p>
                <Link
                  href={`/about#${f.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-blueprint hover:underline"
                >
                  Meet {f.name.split(" ")[0]}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process preview */}
      <Section className="border-y border-grid bg-surface">
        <SectionHeading
          eyebrow="process"
          title="No vanishing acts. You see progress every week, on a real staging link."
          link={{ href: "/process", label: "How we work" }}
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.04} as="li">
              <div className="card h-full p-5">
                <span className="font-mono text-[0.7rem] text-verified">
                  {step.n}
                </span>
                <h3 className="display-h3 mt-2 text-[1.1rem]">{step.title}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-slate">
                  {step.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Founder strip */}
      <Section>
        <SectionHeading
          eyebrow="the team"
          title="Four engineers. Two countries. One standard: production-ready."
          link={{ href: "/about", label: "About us" }}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((f, i) => (
            <Reveal key={f.slug} delay={(i % 4) * 0.04} as="div">
              <Link
                href={`/about#${f.slug}`}
                className="card card-hover group block h-full p-6"
              >
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[10px] border border-grid bg-paper">
                  {f.image ? (
                    <Image
                      src={f.image}
                      alt={`${f.name}, ${f.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <span className="font-display text-4xl font-semibold text-blueprint">
                      {f.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  )}
                </div>
                <p className="mt-4 flex items-center gap-2 font-medium text-ink">
                  {f.name.split(" ").slice(0, 2).join(" ")}
                  <span aria-hidden>{f.flag}</span>
                </p>
                <p className="mt-1 text-[0.8rem] leading-snug text-slate">
                  {f.role.split("·")[1]?.trim() ?? f.role}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
