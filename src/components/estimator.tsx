"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  projectTypes,
  estimatorFeatures,
  timelines,
  RUSH_TIMELINE,
  RUSH_MULTIPLIER,
  formatUsd,
} from "@/content/estimator";
import { site } from "@/content/site";
import { ArrowRight, Check, WhatsApp } from "./icons";
import { cn } from "@/lib/utils";

const STEPS = ["Project", "Features", "Timeline", "Ballpark"] as const;

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

  const estimate = useMemo(() => {
    if (!type) return null;
    let [min, max] = type.price;
    for (const f of estimatorFeatures) {
      if (features.includes(f.label)) {
        min += f.price[0];
        max += f.price[1];
      }
    }
    if (rush) {
      min *= RUSH_MULTIPLIER;
      max *= RUSH_MULTIPLIER;
    }
    const extraWeeks = Math.ceil(features.length / 3);
    const weeks: [number, number] = [
      type.weeks[0] + extraWeeks,
      type.weeks[1] + extraWeeks,
    ];
    return { min, max, weeks };
  }, [type, features, rush]);

  const rangeText = estimate
    ? `${formatUsd(estimate.min)} – ${formatUsd(estimate.max)}`
    : "-";
  const weeksText = estimate
    ? `${estimate.weeks[0]}–${estimate.weeks[1]} weeks`
    : "-";

  const summary = type
    ? `Estimator brief: ${type.label}${
        features.length ? ` with ${features.join(", ")}` : ""
      }.${timeline ? ` Timeline: ${timeline}.` : ""} Ballpark shown on the site: ${rangeText} (${weeksText}). Please confirm with a written quote.`
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
    `Hi TrustCode System, I used your estimator. ${summary}`
  )}`;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Wizard */}
      <div className="card p-7 sm:p-8 lg:col-span-8">
        {/* Progress */}
        <ol
          aria-label="Estimator progress"
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
                  Rush delivery compresses the schedule, expect roughly{" "}
                  {Math.round((RUSH_MULTIPLIER - 1) * 100)}% on top of the
                  standard range.
                </p>
              )}
            </fieldset>
          )}

          {step === 3 && type && estimate && (
            <div>
              <h2 className="display-h3 text-[1.3rem]">Your ballpark</h2>
              <p className="mt-6 font-mono text-3xl font-semibold sm:text-4xl">
                <span className="text-gradient">{rangeText}</span>
              </p>
              <p className="mt-2 font-mono text-[0.95rem] text-slate">
                typical delivery: {weeksText}
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
                    Timeline: {timeline}
                  </li>
                )}
              </ul>
              <p className="mt-6 max-w-lg text-[0.85rem] leading-relaxed text-slate">
                This is a ballpark, not a quote. Send it to us and you&apos;ll
                get a written proposal with a fixed price within 72 hours
                free, no obligation.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" onClick={sendAsBrief} className="btn-primary">
                  Send as project brief
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <WhatsApp className="h-4 w-4" />
                  Discuss on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
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
              {step === 2 ? "See my ballpark" : step === 1 ? "Next" : "Next"}
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

      {/* Live panel */}
      <aside className="lg:col-span-4">
        <div className="card sticky top-24 p-7" aria-live="polite">
          <p className="eyebrow mb-3">/ running estimate</p>
          <p className="font-mono text-2xl font-semibold">
            <span className={type ? "text-gradient" : "text-slate"}>
              {rangeText}
            </span>
          </p>
          <p className="mt-1.5 font-mono text-[0.85rem] text-slate">
            {type ? weeksText : "pick a project type to start"}
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
            Indicative range in USD. Your written quote may land below or above
            it depending on scope, we fix the price before any work starts.
          </p>
        </div>
      </aside>
    </div>
  );
}
