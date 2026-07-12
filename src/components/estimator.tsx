"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  projectTypes,
  estimatorFeatures,
  timelines,
  RUSH_TIMELINE,
} from "@/content/estimator";
import { site } from "@/content/site";
import { ArrowRight, Check, WhatsApp } from "./icons";
import { cn } from "@/lib/utils";

const STEPS = ["Project", "Features", "Timeline", "Next steps"] as const;

function chipClass(active: boolean) {
  return cn(
    "rounded-full border px-4 py-2 text-left text-[0.9rem] transition-colors",
    active
      ? "border-blueprint bg-blueprint text-white"
      : "border-grid bg-paper text-ink hover:border-blueprint"
  );
}

export function Estimator() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [typeLabel, setTypeLabel] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");

  const type = projectTypes.find((t) => t.label === typeLabel);
  const rush = timeline === RUSH_TIMELINE;

  const weeksText = useMemo(() => {
    if (!type) return "-";
    const extraWeeks = Math.ceil(features.length / 3);
    const min = type.weeks[0] + extraWeeks;
    const max = type.weeks[1] + extraWeeks;
    return `${min}–${max} weeks`;
  }, [type, features]);

  const summary = type
    ? `Project brief: ${type.label}${
        features.length ? ` with ${features.join(", ")}` : ""
      }.${timeline ? ` Preferred timeline: ${timeline}.` : ""} Typical delivery window shown on the site: ${weeksText}. Please recommend the right scope and next steps.`
    : "";

  const canNext =
    (step === 0 && Boolean(type)) || step === 1 || (step === 2 && Boolean(timeline));

  function sendAsBrief() {
    try {
      sessionStorage.setItem(
        "tcs-estimate",
        JSON.stringify({ siteType: typeLabel, features, timeline, summary })
      );
    } catch {
      // storage unavailable, the service preselect below still works
    }
    router.push(`/contact?service=${type?.service ?? ""}`);
  }

  const whatsappHref = `https://wa.me/${site.phone.replace("+", "")}?text=${encodeURIComponent(
    `Hi TrustCode System, I used your project scoper. ${summary}`
  )}`;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card p-7 sm:p-8 lg:col-span-8">
        <ol
          aria-label="Project scoping progress"
          className="flex flex-wrap items-center gap-2"
        >
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[0.7rem]",
                  i < step
                    ? "border-verified bg-verified text-white"
                    : i === step
                      ? "border-blueprint bg-blueprint text-white"
                      : "border-grid text-slate"
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "font-mono text-[0.72rem] uppercase tracking-wider",
                  i === step ? "text-ink" : "text-slate"
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="mx-1 h-px w-5 bg-grid" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-8 min-h-[16rem]">
          {step === 0 && (
            <fieldset>
              <legend className="display-h3 text-[1.3rem]">
                What are you building?
              </legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {projectTypes.map((t) => {
                  const active = typeLabel === t.label;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      aria-pressed={active ? "true" : "false"}
                      onClick={() => setTypeLabel(active ? "" : t.label)}
                      className={cn(chipClass(active), "rounded-[10px] px-4 py-3")}
                    >
                      <span className="block font-medium">{t.label}</span>
                      <span
                        className={cn(
                          "mt-1 block text-[0.8rem] leading-snug",
                          active ? "text-white/80" : "text-slate"
                        )}
                      >
                        {t.blurb}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="display-h3 text-[1.3rem]">
                What features will you likely need?
              </legend>
              <p className="mt-2 text-[0.9rem] text-slate">
                Pick any that apply, you can skip this step.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {estimatorFeatures.map((f) => {
                  const active = features.includes(f.label);
                  return (
                    <button
                      key={f.label}
                      type="button"
                      aria-pressed={active ? "true" : "false"}
                      onClick={() =>
                        setFeatures((cur) =>
                          active
                            ? cur.filter((x) => x !== f.label)
                            : [...cur, f.label]
                        )
                      }
                      className={chipClass(active)}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="display-h3 text-[1.3rem]">
                When do you need it?
              </legend>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {timelines.map((t) => {
                  const active = timeline === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={active ? "true" : "false"}
                      onClick={() => setTimeline(active ? "" : t)}
                      className={chipClass(active)}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              {rush && (
                <p className="mt-4 text-[0.85rem] text-slate">
                  An accelerated timeline is possible. We will confirm what is
                  realistic once we understand the full scope.
                </p>
              )}
            </fieldset>
          )}

          {step === 3 && type && (
            <div>
              <h2 className="display-h3 text-[1.3rem]">
                Let&apos;s scope your project properly.
              </h2>
              <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-slate">
                Every project is different. Tell us what you are building, and we
                will recommend the right scope, delivery approach and next steps.
              </p>
              <ul className="mt-6 space-y-2 text-[0.92rem] text-ink">
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                  {type.label}
                  {features.length > 0 && ` · ${features.join(" · ")}`}
                </li>
                {timeline && (
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                    Preferred timeline: {timeline}
                  </li>
                )}
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                  Typical delivery window: {weeksText}
                </li>
              </ul>
              <p className="mt-6 max-w-lg text-[0.85rem] leading-relaxed text-slate">
                Share this brief with the team and we will review your objectives
                and provide a tailored proposal. Free consultation, no obligation.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" onClick={sendAsBrief} className="btn-primary">
                  Get a Tailored Proposal
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <WhatsApp className="h-4 w-4" />
                  Discuss Your Project
                </a>
              </div>
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="mt-8 flex items-center justify-between border-t border-grid pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-secondary disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="btn-primary disabled:opacity-40"
            >
              {step === 2 ? "Review & continue" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="mt-8 border-t border-grid pt-6">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-secondary"
            >
              Back
            </button>
          </div>
        )}
      </div>

      <aside className="lg:col-span-4">
        <div className="card sticky top-24 p-7" aria-live="polite">
          <p className="eyebrow mb-3">/ your brief so far</p>
          <p className="font-display text-[1.15rem] font-semibold leading-snug text-ink">
            {type ? type.label : "Pick a project type to start"}
          </p>
          <p className="mt-1.5 font-mono text-[0.85rem] text-slate">
            {type ? `Typical window: ${weeksText}` : "No prices shown. We scope with you."}
          </p>
          <dl className="mt-6 space-y-3 border-t border-grid pt-5 text-[0.88rem]">
            <div className="flex justify-between gap-3">
              <dt className="text-slate">Project</dt>
              <dd className="text-right text-ink">{typeLabel || "-"}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate">Features</dt>
              <dd className="text-right text-ink">
                {features.length ? features.length : "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate">Timeline</dt>
              <dd className="text-right text-ink">{timeline || "-"}</dd>
            </div>
          </dl>
          <p className="mt-6 text-[0.78rem] leading-relaxed text-slate">
            Every project is different. Send your brief and we will recommend the
            right scope, delivery approach and next steps.
          </p>
        </div>
      </aside>
    </div>
  );
}
