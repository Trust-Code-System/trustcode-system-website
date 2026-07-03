import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { FaqSection } from "@/components/faq";
import { ArrowRight, ArrowUpRight, WhatsApp } from "@/components/icons";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Tell us what you're building. Free 30-minute consultation, written proposal within 72 hours, and a reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="contact"
        title="Tell us what you're building."
        intro="Free 30-minute consultation, a written proposal within 72 hours, and a reply within 24 hours. No jargon, no obligation."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="card h-96 p-8" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-5">
            <div className="grid gap-5">
              <div className="card p-7">
                <p className="eyebrow mb-3">/ chat with us</p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#25D366] px-4 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#1da851]"
                >
                  <WhatsApp className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
                <p className="mt-3 text-[0.82rem] text-slate">
                  Fastest way to reach us — we usually reply in minutes during
                  business hours.
                </p>

                <p className="mt-5 eyebrow mb-2">/ email us</p>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 text-[1.05rem] font-medium text-blueprint hover:underline"
                >
                  {site.email}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="card p-7">
                <p className="eyebrow mb-3">/ locations</p>
                <ul className="space-y-1.5 text-[0.95rem] text-ink">
                  {site.locations.map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blueprint" />
                      {l}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-slate">
                    <span className="h-1.5 w-1.5 rounded-full bg-grid" />
                    Remote, worldwide
                  </li>
                </ul>
              </div>

              <div className="card p-7">
                <p className="eyebrow mb-3">/ not ready to write a brief?</p>
                <p className="text-[0.95rem] leading-relaxed text-slate">
                  Get an instant ballpark price and timeline first — 60
                  seconds, no email required.
                </p>
                <Link
                  href="/estimate"
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-blueprint hover:underline"
                >
                  Try the project estimator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="card bg-surface p-7">
                <p className="eyebrow mb-3">/ response time</p>
                <p className="font-display text-[1.3rem] font-semibold leading-snug tracking-tight">
                  We reply within 24 hours.
                </p>
                <p className="mt-2 text-[0.9rem] text-slate">
                  Prefer to talk? Ask for a call in your message and we&apos;ll
                  send a booking link.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <FaqSection withSchema className="border-t border-grid bg-surface" />
    </>
  );
}
