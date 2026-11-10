"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  estimatorFeatures,
  timelines,
  RUSH_TIMELINE,
} from "@/content/estimator";
import { getProjectType } from "@/content/project-types";
import { serviceOptions } from "@/lib/contact-schema";
import { ProjectTypeCards } from "./project-type-cards";
import { BudgetPicker } from "./budget-picker";
import { BookingLink } from "./booking-link";
import {
  PLANNER_DRAFT_KEY,
  plannerDraftSchema,
  plannerBrief,
  emptyPlanner,
} from "@/lib/planner";
import {
  addOns,
  commercialTerms,
  priceFor,
  itemPrice,
  formatFrom,
  selectedAddOns,
  startingTotal,
} from "@/lib/pricing";
import { PricingTerms } from "./pricing";
import { site } from "@/content/site";
import { ArrowRight, Check, WhatsApp } from "./icons";
import { cn } from "@/lib/utils";

const STEPS = ["Project", "Features", "Timeline", "Next steps"] as const;

function chipClass(active: boolean) {
  return cn(
    "rounded-full border px-4 py-2 text-left text-[0.9rem] transition-colors",
    active
      ? "border-blueprint bg-blueprint text-white"
      : "border-grid bg-paper text-ink hover:border-blueprint",
  );
}

export function Estimator() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const params = useSearchParams();
  const [typeId, setTypeId] = useState("");
  const [budget, setBudget] = useState("");
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [rushRequested, setRushRequested] = useState(false);
  const [service, setService] = useState("");
  const [restored, setRestored] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");

  const type = getProjectType(typeId);
  const typeLabel = type?.label ?? "";
  useEffect(() => {
    let draft = emptyPlanner;
    try {
      const parsed = plannerDraftSchema.safeParse(
        JSON.parse(sessionStorage.getItem(PLANNER_DRAFT_KEY) ?? "null"),
      );
      if (parsed.success) draft = parsed.data;
    } catch {
      /* Storage is optional. */
    }
    const requested = getProjectType(params.get("type"));
    const requestedService = params.get("service") ?? "";
    const validService = serviceOptions.some(
      (item) => item.value === requestedService,
    );
    setTypeId(
      requested?.id ?? (validService ? "something-else" : draft.typeId),
    );
    setService(
      validService ? requestedService : requested ? "" : (draft.service ?? ""),
    );
    setFeatures(draft.features);
    setTimeline(draft.timeline);
    setBudget(draft.budget);
    setAddOnIds(draft.addOnIds);
    setRushRequested(draft.rush);
    setRestored(true);
  }, [params]);
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(
        PLANNER_DRAFT_KEY,
        JSON.stringify({
          typeId,
          features,
          timeline,
          budget,
          service,
          addOnIds,
          rush: rushRequested,
        }),
      );
    } catch {
      /* In-memory answers still work. */
    }
  }, [
    typeId,
    features,
    timeline,
    budget,
    service,
    addOnIds,
    rushRequested,
    restored,
  ]);
  const rush = timeline === RUSH_TIMELINE;

  const weeksText = type?.timeline ?? "Agreed after scoping";
  const selectedPrice = priceFor(typeId);
  const extras =
    selectedPrice?.pillar === "Build"
      ? selectedAddOns(features, addOnIds, typeId)
      : [];
  const total = startingTotal(
    typeId,
    selectedPrice?.pillar === "Build" ? features : [],
    selectedPrice?.pillar === "Build" ? addOnIds : [],
    selectedPrice?.pillar === "Build" && rushRequested,
  );

  const brief = plannerBrief({
    typeId,
    features,
    timeline,
    budget,
    service,
    addOnIds,
    rush: rushRequested,
  });
  const summary = brief?.message ?? "";

  const canNext =
    (step === 0 && Boolean(type)) ||
    step === 1 ||
    (step === 2 && Boolean(timeline));

  function sendAsBrief() {
    if (!brief) return;
    // URL fragment also carries the brief if session storage is unavailable.
    // It is not sent to the server or included in request/referrer URLs.
    router.push(
      `/contact?service=${brief.service}#brief=${encodeURIComponent(JSON.stringify(brief))}`,
    );
  }

  const whatsappHref = `https://wa.me/${site.phone.replace("+", "")}?text=${encodeURIComponent(
    `Hi TrustCode System, I used your project scoper. ${summary}`,
  )}`;

  return (
    <div
      role="region"
      aria-label="Project planner"
      className="grid gap-6 lg:grid-cols-12"
    >
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
                      : "border-grid text-slate",
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "font-mono text-[0.72rem] uppercase tracking-wider",
                  i === step ? "text-ink" : "text-slate",
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
              <ProjectTypeCards
                selected={typeId}
                onSelect={(id) => {
                  setTypeId(id);
                  if (id !== "something-else") setService("");
                }}
              />
              <PricingTerms />
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
                            : [...cur, f.label],
                        )
                      }
                      className={chipClass(active)}
                    >
                      {f.label}
                      {(() => {
                        const extra = addOns.find(
                          (item) => item.feature === f.label,
                        );
                        if (!extra || selectedPrice?.pillar !== "Build")
                          return null;
                        return selectedPrice.includedAddOns?.includes(extra.id)
                          ? " · Included"
                          : ` · + ${formatFrom(extra.ngn)}`;
                      })()}
                    </button>
                  );
                })}
              </div>
              {selectedPrice?.pillar === "Build" && (
                <div className="mt-6">
                  <h2 className="font-semibold">Optional add-ons</h2>
                  <p className="mt-2 text-[0.85rem] text-slate">
                    Per-page options cover one page each. Tell us if you need
                    more.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {addOns
                      .filter((item) => !item.feature)
                      .map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          aria-pressed={addOnIds.includes(item.id)}
                          className={chipClass(addOnIds.includes(item.id))}
                          onClick={() =>
                            setAddOnIds((ids) =>
                              ids.includes(item.id)
                                ? ids.filter((id) => id !== item.id)
                                : [...ids, item.id],
                            )
                          }
                        >
                          {item.title} · + {formatFrom(item.ngn)}
                        </button>
                      ))}
                  </div>
                  <PricingTerms />
                </div>
              )}
              <div className="mt-6">
                <label htmlFor="budget" className="mb-2 block text-ink">
                  Your budget range (optional)
                </label>
                <BudgetPicker value={budget} onChange={setBudget} />
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
              {selectedPrice?.pillar === "Build" && (
                <label className="mt-5 flex items-start gap-3 text-[0.9rem]">
                  <input
                    className="mt-1"
                    type="checkbox"
                    checked={rushRequested}
                    onChange={(event) => setRushRequested(event.target.checked)}
                  />
                  Request rush delivery (+{commercialTerms.rushPercent}%,
                  subject to availability).
                </label>
              )}
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
                Every project is different. Tell us what you are building, and
                we will recommend the right scope, delivery approach and next
                steps.
              </p>
              {budget && (
                <p className="mt-4 text-slate">
                  Available budget: {budget} (not a quote)
                </p>
              )}
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
                Share this brief with the team and we will review your
                objectives and provide a tailored proposal. Free consultation,
                no obligation.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <BookingLink className="btn-secondary" />
                <button
                  type="button"
                  onClick={sendAsBrief}
                  className="btn-primary"
                >
                  Continue to contact
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <WhatsApp className="h-4 w-4" />
                  Message on WhatsApp
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
            {type
              ? `Typical window: ${weeksText}`
              : "Choose a starting point. We scope with you."}
          </p>
          {selectedPrice && (
            <div className="mt-5 border-t border-grid pt-5">
              <p className="font-display text-[1.3rem] font-semibold">
                {itemPrice(selectedPrice)}
              </p>
              {extras.length > 0 && selectedPrice.pillar === "Build" && (
                <ul className="mt-3 space-y-2 text-[0.85rem] text-slate">
                  {extras.map((item) => (
                    <li key={item.id}>
                      {item.title}: + {formatFrom(item.ngn)}
                    </li>
                  ))}
                </ul>
              )}
              {rushRequested && selectedPrice.pillar === "Build" && (
                <p className="mt-3 text-[0.85rem] text-slate">
                  Rush requested: +{commercialTerms.rushPercent}%
                </p>
              )}
              {total != null &&
                (extras.length > 0 || rushRequested) &&
                selectedPrice.pillar === "Build" && (
                  <p className="mt-4 font-semibold">
                    Starting point with extras: {formatFrom(total)}
                  </p>
                )}
              <PricingTerms />
            </div>
          )}
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
              <dt className="text-slate">Budget</dt>
              <dd className="text-right text-ink">
                {budget || "Not sure yet"}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate">Timeline</dt>
              <dd className="text-right text-ink">{timeline || "-"}</dd>
            </div>
          </dl>
          <p className="mt-6 text-[0.78rem] leading-relaxed text-slate">
            Every project is different. Send your brief and we will recommend
            the right scope, delivery approach and next steps.
          </p>
        </div>
      </aside>
    </div>
  );
}
