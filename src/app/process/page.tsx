import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { Timeline } from "@/components/timeline";
import { ArrowRight } from "@/components/icons";
import { steps, communication } from "@/content/process";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Process",
  description:
    "Discover → Design → Build → Harden → Support. No vanishing acts, weekly demos, a shared channel, and a real staging link from week one.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="process"
        title="No vanishing acts. You see progress every week, on a real staging link."
        intro="A five-step delivery method built for clients who have been burned by developers who go quiet. Here is exactly what happens, what you receive, and how long it takes."
      />

      <Section>
        <Timeline>
          <ol className="grid gap-6 pl-7 sm:pl-10">
            {steps.map((step, i) => (
              <Reveal
                key={step.n}
                delay={(i % 3) * 0.04}
                as="li"
                className="timeline-step relative"
              >
                <div className="card grid gap-6 p-7 md:grid-cols-12 md:p-9">
                <div className="md:col-span-3">
                  <span className="font-mono text-[0.8rem] text-verified">
                    step {step.n}
                  </span>
                  <h2 className="display-h3 mt-2 text-[1.6rem]">{step.title}</h2>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-slate">
                    {step.summary}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="eyebrow mb-2">/ what happens</p>
                  <p className="text-[0.95rem] leading-relaxed text-ink">
                    {step.what}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <p className="eyebrow mb-2">/ you receive</p>
                  <p className="text-[0.95rem] leading-relaxed text-ink">
                    {step.deliverable}
                  </p>
                  <p className="eyebrow mb-2 mt-5">/ typical duration</p>
                  <p className="font-mono text-[0.9rem] text-ink">
                    {step.duration}
                  </p>
                </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Timeline>
      </Section>

      {/* How we communicate */}
      <Section className="border-y border-grid bg-surface">
        <p className="eyebrow">/ how we communicate</p>
        <h2 className="display-h2 mt-4 max-w-2xl">
          The part most agencies get wrong.
        </h2>
        <p className="lead mt-4 max-w-2xl">
          If you have ever paid a developer and then watched them disappear,
          this section is for you. Communication is a deliverable, not a
          courtesy.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {communication.map((c) => (
            <div key={c.title} className="card p-7">
              <h3 className="display-h3 text-[1.25rem]">{c.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
                {c.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/contact" className="btn-primary">
            Start a project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
