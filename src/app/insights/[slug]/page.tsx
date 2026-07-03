import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Aurora } from "@/components/aurora";
import { ArrowRight } from "@/components/icons";
import { articles } from "@/content/articles";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return pageMeta({
    title: article.title,
    description: article.dek,
    path: `/insights/${article.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.dek,
    datePublished: article.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/insights/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative overflow-hidden border-b border-grid">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <Aurora />
        <div className="container-x relative py-16 sm:py-20">
          <p className="eyebrow">
            / insights / {article.tag.toLowerCase()}
          </p>
          <h1 className="display-h1 mt-5 max-w-4xl text-[clamp(2rem,4.5vw,3.25rem)]">
            {article.title}
          </h1>
          <p className="lead mt-6 max-w-2xl">{article.dek}</p>
          <p className="mt-6 font-mono text-[0.78rem] uppercase tracking-wider text-slate">
            {new Date(article.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {article.readingTime} · TrustCode System
          </p>
        </div>
      </header>

      <Section>
        <article className="mx-auto max-w-2xl">
          {article.sections.map((s, i) => (
            <div key={i} className={i > 0 ? "mt-10" : undefined}>
              {s.heading && (
                <h2 className="display-h3 text-[1.35rem]">{s.heading}</h2>
              )}
              {s.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mt-4 text-[1rem] leading-[1.8] text-ink"
                >
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[0.97rem] leading-relaxed text-ink"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blueprint" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-12 border-t border-grid pt-8">
            <p className="text-[0.95rem] text-slate">
              Building something this applies to?
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/insights" className="btn-secondary">
                More insights
              </Link>
            </div>
          </div>
        </article>
      </Section>

      <CtaBand />
    </>
  );
}
