import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { ArrowRight } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { StarLink } from "@/components/star-link";
import { projects } from "@/content/portfolio";
import {
  servicePages,
  servicePageUi as ui,
  type ServicePage,
} from "@/content/service-pages";
import { site } from "@/content/site";
import { commercialTerms, itemPrice, priceFor } from "@/lib/pricing";

export function ServicePageLinks({ exclude }: { exclude?: string }) {
  return (
    <div className="service-link-grid">
      {servicePages
        .filter((page) => page.slug !== exclude)
        .map((page) => (
          <Link
            className="service-link-card"
            key={page.slug}
            href={`/services/${page.slug}`}
          >
            <span className="service-link-name">{page.name}</span>
            <span className="service-copy">{page.hubSummary}</span>
            <span className="service-link-action">
              {ui.explore}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        ))}
    </div>
  );
}

export function ServicePageHub() {
  return (
    <Section className="service-pages-hub border-b border-grid">
      <p className="eyebrow">/ {ui.hubEyebrow}</p>
      <h2 className="service-section-title mt-4">{ui.hubTitle}</h2>
      <ServicePageLinks />
    </Section>
  );
}

function Heading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="service-section-heading">
      <p className="eyebrow">/ {eyebrow}</p>
      <h2 className="service-section-title">{title}</h2>
      {intro && <p className="service-copy">{intro}</p>}
    </div>
  );
}

export function ServiceDetail({ page }: { page: ServicePage }) {
  const primary = priceFor(page.primaryPriceId)!;
  const heroProject = projects.find(
    (project) => project.slug === page.heroProject,
  );
  const proofProjects = page.proofSlugs
    .map((slug) => projects.find((project) => project.slug === slug)!)
    .filter(Boolean);
  const estimateUrl = `/estimate?type=${page.primaryPriceId}`;
  const url = `${site.url}/services/${page.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.name,
        description: page.intro,
        url,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Nigeria" },
          { "@type": "Country", name: "United Kingdom" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: ui.services,
            item: `${site.url}/services`,
          },
          { "@type": "ListItem", position: 3, name: page.name, item: url },
        ],
      },
    ],
  };

  return (
    <div className="service-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className="service-hero">
        <div className="container-x">
          <nav aria-label={ui.breadcrumb} className="service-breadcrumb">
            <ol>
              <li>
                <Link href="/">{ui.home}</Link>
              </li>
              <li>
                <Link href="/services">{ui.services}</Link>
              </li>
              <li aria-current="page">{page.name}</li>
            </ol>
          </nav>
          <div className="service-hero-grid">
            <div>
              <p className="eyebrow">/ {page.name}</p>
              <h1 className="service-heading">{page.headline}</h1>
              <p className="service-intro">{page.intro}</p>
              <div className="service-hero-price">
                <strong>{itemPrice(primary)}</strong>
                <span>{primary.timeline}</span>
              </div>
              <StarLink
                href={estimateUrl}
                className="button-solid service-primary"
              >
                {page.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </StarLink>
              <p className="service-audience">{page.audience}</p>
            </div>
            {heroProject?.coverImage ? (
              <figure className="service-hero-proof">
                <div className="service-proof-topline">
                  <span>{ui.heroProof}</span>
                  <span aria-hidden>↗</span>
                </div>
                <Link
                  href={`/work/${heroProject.slug}`}
                  aria-label={`${heroProject.title}: ${ui.caseStudy}`}
                  className="service-hero-image"
                >
                  <Image
                    src={heroProject.coverImage}
                    alt={heroProject.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    className="object-cover object-top"
                  />
                </Link>
                <figcaption>
                  <strong>{heroProject.title}</strong>
                  <Link href={`/work/${heroProject.slug}`}>
                    {ui.caseStudy}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </figcaption>
              </figure>
            ) : (
              <aside className="service-care-panel">
                <p className="eyebrow">/ {ui.careEyebrow}</p>
                <h2>{ui.careTitle}</h2>
                <ol>
                  {page.scope.slice(0, 4).map((item, index) => (
                    <li key={item}>
                      <span aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
                <p className="service-copy">{ui.careNote}</p>
              </aside>
            )}
          </div>
        </div>
      </section>

      <Section className="service-benefits border-y border-grid">
        <Heading eyebrow={ui.benefitsEyebrow} title={ui.benefitsTitle} />
        <div className="service-three-grid">
          {page.benefits.map((benefit, index) => (
            <article key={benefit.title}>
              <span className="service-index" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{benefit.title}</h3>
              <p className="service-copy">{benefit.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="service-scope-grid">
          <Heading eyebrow={ui.scopeEyebrow} title={page.scopeTitle} />
          <div>
            <ul className="service-scope-list">
              {page.scope.map((item) => (
                <li key={item}>
                  <span aria-hidden>↗</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="service-preparation">
              <h3>{ui.preparation}</h3>
              <p className="service-copy">{page.preparation}</p>
            </div>
          </div>
        </div>
      </Section>

      {proofProjects.length > 0 && (
        <Section className="border-y border-grid bg-surface">
          <Heading
            eyebrow={ui.proofEyebrow}
            title={page.proofTitle}
            intro={page.proofIntro}
          />
          <div
            className={`service-project-grid ${proofProjects.length === 1 ? "service-single-project" : ""}`}
          >
            {proofProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      )}

      <Section id="service-pricing">
        <Heading
          eyebrow={ui.pricingEyebrow}
          title={ui.pricingTitle}
          intro={ui.pricingIntro}
        />
        <div className="service-pricing-grid">
          {page.priceIds.map((id) => {
            const item = priceFor(id)!;
            return (
              <article
                key={id}
                className={`service-price-card ${id === primary.id ? "service-price-primary" : ""}`}
              >
                <h3>{item.title}</h3>
                <p className="service-price">{itemPrice(item)}</p>
                <p className="service-copy">{item.description}</p>
                <p className="service-price-timeline">{item.timeline}</p>
                <Link
                  className="service-price-link"
                  href={`/estimate?type=${id}`}
                >
                  {ui.scopeCta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
        <div className="service-terms">
          <p>{commercialTerms.disclaimer}</p>
          <p>{commercialTerms.payment}</p>
          <p>
            {commercialTerms.ownership} {commercialTerms.support}
          </p>
        </div>
        {!proofProjects.length && (
          <div className="service-care-review">
            <h3>{page.proofTitle}</h3>
            <p className="service-copy">{page.proofIntro}</p>
          </div>
        )}
      </Section>

      <Section className="border-y border-grid bg-surface">
        <Heading eyebrow={ui.processEyebrow} title={ui.processTitle} />
        <ol className="service-three-grid service-process">
          {page.steps.map((step, index) => (
            <li key={step.title}>
              <span className="service-index" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p className="service-copy">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="service-faq-grid">
          <Heading eyebrow={ui.questionsEyebrow} title={ui.questionsTitle} />
          <div className="service-faqs">
            {page.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden>+</span>
                </summary>
                <p className="service-copy">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section className="service-closing border-y border-grid">
        <Heading
          eyebrow={page.name}
          title={ui.closingTitle}
          intro={ui.closingIntro}
        />
        <div className="service-closing-actions">
          <StarLink href={estimateUrl} className="button-solid">
            {page.cta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </StarLink>
          <BookingLink />
        </div>
      </Section>
      <Section>
        <Heading eyebrow={ui.relatedEyebrow} title={ui.relatedTitle} />
        <ServicePageLinks exclude={page.slug} />
      </Section>
    </div>
  );
}
