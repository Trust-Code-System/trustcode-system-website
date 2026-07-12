import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { serviceIcons, ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import { services, engagementModels } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Product & web engineering, e-commerce, cloud & DevOps, AI integration, cybersecurity, IT support, and training. One team, full coverage.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="services"
        title="One team, full coverage: pixel to server to security layer."
        intro="Seven services, four engineers, one standard. Every service links to a live product you can inspect, with a transparent starting price, and every engagement gets a written, fixed-price quote within 72 hours."
      />

      <Section>
        <div className="grid gap-6">
          {services.map((service, i) => {
            const Icon =
              serviceIcons[service.icon as keyof typeof serviceIcons];
            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.04} as="div">
                <div
                  id={service.slug}
                  className="card grid scroll-mt-24 gap-6 p-7 md:grid-cols-12 md:p-9"
                >
                  <div className="md:col-span-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-grid bg-paper text-blueprint">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <h2 className="display-h3 mt-4 text-[1.4rem]">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
                      {service.description}
                    </p>
                  </div>

                  <div className="md:col-span-4">
                    <p className="eyebrow mb-3">/ what&apos;s included</p>
                    <ul className="space-y-2.5">
                      {service.includes.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2.5 text-[0.92rem] text-ink"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4 md:col-span-4">
                    <div className="flex gap-8">
                      <div>
                        <p className="eyebrow mb-2">/ typical timeline</p>
                        <p className="font-mono text-[0.95rem] text-ink">
                          {service.timeline}
                        </p>
                      </div>
                      <div>
                        <p className="eyebrow mb-2">/ pricing</p>
                        <p className="font-mono text-[0.95rem] text-ink">
                          {service.priceFrom}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="eyebrow mb-2">/ proof</p>
                      <Link
                        href={service.proof.href}
                        className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-ink hover:text-blueprint"
                      >
                        {service.proof.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                    <Link
                      href={`/contact?service=${service.slug}`}
                      className="btn-primary mt-auto w-full sm:w-auto"
                    >
                      Discuss this
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Engagement models */}
      <Section className="border-y border-grid bg-surface">
        <p className="eyebrow">/ engagement models</p>
        <h2 className="display-h2 mt-4 max-w-2xl">
          Three ways to work with us. Starting prices are a guide, every
          quote is written for your scope.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {engagementModels.map((m) => (
            <div key={m.title} className="card p-7">
              <h3 className="display-h3 text-[1.25rem]">{m.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
                {m.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn-primary">
            Request a quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/estimate" className="btn-secondary">
            Get a 60-second ballpark
          </Link>
        </div>
      </Section>

      <FaqSection />

      <CtaBand />
    </>
  );
}
