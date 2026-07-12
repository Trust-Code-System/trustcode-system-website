import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { insights } from "@/content/insights";
import { articles } from "@/content/articles";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Insights",
  description:
    "Notes on shipping software in Lagos and London, fintech, edtech, AWS, AI, and security. Writing from the TrustCode team.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="insights"
        title="Notes from shipping real software."
        intro="Plain-spoken writing on web development, cloud, AI, and security, from a team that builds in production. New posts land here as we publish them."
      />

      {/* Articles published here */}
      <Section>
        <SectionHeading
          eyebrow="from the studio"
          title="Long-form guides, published here."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 2) * 0.05} as="article">
              <Link
                href={`/insights/${a.slug}`}
                className="card card-hover group flex h-full flex-col p-7"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="badge">{a.tag}</span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
                    {a.readingTime}
                  </span>
                </div>
                <h2 className="display-h3 mt-4 text-[1.35rem] leading-snug">
                  {a.title}
                </h2>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-slate">
                  {a.dek}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-blueprint">
                  Read the guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-grid bg-surface">
        <SectionHeading
          eyebrow="elsewhere"
          title="Shorter notes on Hashnode and Medium."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((post, i) => (
            <Reveal key={post.title} delay={(i % 3) * 0.04} as="article">
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex h-full flex-col p-7"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="badge">{post.tag}</span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
                    {post.source}
                  </span>
                </div>
                <h2 className="display-h3 mt-4 text-[1.2rem] leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-slate">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-blueprint">
                  Read on {post.source}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
