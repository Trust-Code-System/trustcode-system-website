import { BookingLink } from "@/components/booking-link";
import { PricingSection } from "@/components/pricing";
import { ServicePageHub } from "@/components/service-pages";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq";
import { ExpertiseExplorer } from "@/components/experience/expertise-explorer";
import { ArrowRight } from "@/components/icons";
import { engagementModels } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Build business websites, online stores and apps. Run hosting and maintenance. Protect your systems and customer data. Based in Lagos, Nigeria. Working remotely worldwide.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="services"
        title="One partner. Every layer of your digital world."
        intro="Software, cloud and security expertise working as one team. Build a useful digital presence, keep it running and protect your systems and customer data. Each engagement starts with a clear brief and written proposal."
      />

      <ServicePageHub />
      <Section>
        <ExpertiseExplorer />
      </Section>

      <Section className="border-y border-grid bg-surface">
        <p className="eyebrow">/ engagement models</p>
        <h2 className="display-h2 mt-4 max-w-2xl">
          Three ways to work with us. We shape the engagement around your goals.
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
          <Link href="/estimate" className="btn-primary">
            Start a project
            <ArrowRight className="h-4 w-4" />
          </Link>
          <BookingLink className="btn-secondary" />
        </div>
      </Section>

      <PricingSection />
      <FaqSection />

      <CtaBand />
    </>
  );
}
