import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight, Check } from "@/components/icons";
import { team } from "@/content/team";
import { values, originStory } from "@/content/values";
import { stats } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About & Team",
  description:
    "Four engineers, two countries, one standard: production-ready. Meet the founders of TrustCode Systems and the values we build on.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="about"
        title="Four engineers. Two countries. One standard: production-ready."
      >
        <div className="grid max-w-3xl gap-4">
          {originStory.map((p) => (
            <p key={p.slice(0, 24)} className="lead">
              {p}
            </p>
          ))}
        </div>
      </PageHero>

      {/* Stats */}
      <section className="border-b border-grid bg-surface">
        <div className="container-x grid grid-cols-2 divide-grid lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-8 text-center">
              <p className="font-mono text-3xl font-semibold text-blueprint">
                {s.value}
              </p>
              <p className="mt-2 text-[0.78rem] uppercase tracking-wider text-slate">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Founders */}
      <Section>
        <p className="eyebrow">/ founders</p>
        <div className="mt-8 grid gap-6">
          {team.map((f, i) => (
            <Reveal key={f.slug} delay={(i % 2) * 0.05} as="div">
              <article
                id={f.slug}
                className="card grid scroll-mt-24 gap-8 p-7 md:grid-cols-12 md:p-9"
              >
                <div className="md:col-span-4">
                  <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-card border border-grid bg-paper">
                    {f.image ? (
                      <Image
                        src={f.image}
                        alt={`${f.name}, ${f.role}`}
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <span className="font-display text-6xl font-semibold text-blueprint">
                        {f.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {f.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-grid px-2.5 py-1.5 font-mono text-[0.72rem] text-slate hover:border-blueprint hover:text-ink"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="display-h3 text-[1.6rem]">{f.name}</h2>
                    <span aria-hidden className="text-lg">
                      {f.flag}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[0.78rem] uppercase tracking-wider text-blueprint">
                    {f.role}
                  </p>
                  <p className="mt-1 text-[0.8rem] text-slate">{f.location}</p>
                  <p className="mt-4 font-display text-[1.15rem] font-medium italic leading-snug text-ink">
                    &ldquo;{f.oneLiner}&rdquo;
                  </p>

                  <div className="mt-5 space-y-3">
                    {f.bio.map((b) => (
                      <p
                        key={b.slice(0, 24)}
                        className="text-[0.95rem] leading-relaxed text-slate"
                      >
                        {b}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow mb-3">/ highlights</p>
                      <ul className="space-y-2">
                        {f.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-[0.88rem] text-ink"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow mb-3">/ credentials</p>
                      <ul className="space-y-2">
                        {f.credentials.map((c) => (
                          <li key={c} className="text-[0.85rem] text-slate">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="eyebrow mb-3">/ stack</p>
                    <div className="flex flex-wrap gap-2">
                      {f.stack.map((t) => (
                        <span key={t} className="badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section className="border-y border-grid bg-surface">
        <p className="eyebrow">/ values</p>
        <h2 className="display-h2 mt-4 max-w-2xl">
          What we hold ourselves to.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="card p-7">
              <h3 className="display-h3 text-[1.25rem]">{v.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
