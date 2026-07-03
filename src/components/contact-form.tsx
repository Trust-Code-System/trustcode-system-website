"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  contactSchema,
  serviceOptions,
  budgetOptions,
  siteTypeOptions,
  goalOptions,
  startingPointOptions,
  designVibeOptions,
  featureOptions,
  timelineOptions,
} from "@/lib/contact-schema";
import { ArrowRight, Check } from "./icons";
import { Select } from "./select";
import { cn } from "@/lib/utils";

const budgetSelectOptions = budgetOptions.map((b) => ({ value: b, label: b }));

const OTHER = "Other";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-[10px] border border-grid bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-slate/70 focus-visible:border-blueprint";

export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const presetValid = serviceOptions.some((o) => o.value === preset);

  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Project-brief state
  const [siteType, setSiteType] = useState("");
  const [goal, setGoal] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [designVibe, setDesignVibe] = useState("");
  const [timeline, setTimeline] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  // Free-text for "Other" selections
  const [siteTypeOther, setSiteTypeOther] = useState("");
  const [goalOther, setGoalOther] = useState("");
  const [featureOther, setFeatureOther] = useState("");

  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Prefill from the /estimate wizard, if the visitor arrived from there.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("tcs-estimate");
      if (!raw) return;
      sessionStorage.removeItem("tcs-estimate");
      const est = JSON.parse(raw) as {
        siteType?: string;
        features?: string[];
        timeline?: string;
        summary?: string;
      };
      if (
        est.siteType &&
        (siteTypeOptions as readonly string[]).includes(est.siteType)
      ) {
        setSiteType(est.siteType);
      }
      if (Array.isArray(est.features)) {
        setFeatures(
          est.features.filter((f) =>
            (featureOptions as readonly string[]).includes(f)
          )
        );
      }
      if (
        est.timeline &&
        (timelineOptions as readonly string[]).includes(est.timeline)
      ) {
        setTimeline(est.timeline);
      }
      if (est.summary && messageRef.current && !messageRef.current.value) {
        messageRef.current.value = est.summary;
      }
    } catch {
      // malformed storage — start with a blank form
    }
  }, []);

  function resolve(selected: string, other: string) {
    return selected === OTHER ? other.trim() : selected;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setFormError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);

    const resolvedFeatures = [
      ...features.filter((f) => f !== OTHER),
      ...(features.includes(OTHER) && featureOther.trim()
        ? [featureOther.trim()]
        : []),
    ];

    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      service: String(fd.get("service") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      siteType: resolve(siteType, siteTypeOther),
      goal: resolve(goal, goalOther),
      startingPoint,
      designVibe,
      features: resolvedFeatures,
      timeline,
      inspiration: String(fd.get("inspiration") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(flat)) {
        if (v && v[0]) next[k] = v[0];
      }
      setFieldErrors(next);
      setStatus("error");
      setFormError("Please check the highlighted fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.fields) {
          const next: Record<string, string> = {};
          for (const [k, v] of Object.entries(
            json.fields as Record<string, string[]>
          )) {
            if (v && v[0]) next[k] = v[0];
          }
          setFieldErrors(next);
        }
        setStatus("error");
        setFormError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
      setSiteType("");
      setGoal("");
      setStartingPoint("");
      setDesignVibe("");
      setTimeline("");
      setFeatures([]);
      setSiteTypeOther("");
      setGoalOther("");
      setFeatureOther("");
    } catch {
      setStatus("error");
      setFormError("Network error. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-start gap-4 p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-verified text-verified">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="display-h3 text-[1.4rem]">Brief received</h2>
        <p className="lead">
          Thanks — that gives us a clear picture. Expect a reply within 24 hours,
          and if it&apos;s a build, a written proposal within 72 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 sm:p-8">
      {/* Honeypot — hidden from users, visible to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5">
        <Field label="Name" name="name" error={fieldErrors.name} required>
          <input id="name" name="name" type="text" autoComplete="name" className={fieldBase} placeholder="Your name" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" name="email" error={fieldErrors.email} required>
            <input id="email" name="email" type="email" autoComplete="email" className={fieldBase} placeholder="you@company.com" />
          </Field>
          <Field label="Company" name="company" error={fieldErrors.company}>
            <input id="company" name="company" type="text" autoComplete="organization" className={fieldBase} placeholder="Optional" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Service" name="service" error={fieldErrors.service} required>
            <Select
              id="service"
              name="service"
              options={serviceOptions}
              defaultValue={presetValid ? preset : ""}
              placeholder="Choose a service"
              aria-invalid={Boolean(fieldErrors.service)}
            />
          </Field>
          <Field label="Budget" name="budget" error={fieldErrors.budget}>
            <Select
              id="budget"
              name="budget"
              options={budgetSelectOptions}
              defaultValue=""
              placeholder="Optional"
              aria-invalid={Boolean(fieldErrors.budget)}
            />
          </Field>
        </div>

        {/* ---- Project brief ---- */}
        <div className="mt-2 border-t border-grid pt-6">
          <p className="eyebrow">/ project brief</p>
          <p className="mt-2 text-[0.9rem] text-slate">
            Optional, but the more you share the faster we can scope it. Pick what
            fits — or choose &ldquo;Other&rdquo; to tell us in your own words.
          </p>
        </div>

        <ChipGroup
          label="What kind of site or product?"
          options={siteTypeOptions}
          value={siteType}
          onChange={setSiteType}
          otherValue={siteTypeOther}
          onOtherChange={setSiteTypeOther}
        />

        <ChipGroup
          label="What's the main goal?"
          options={goalOptions}
          value={goal}
          onChange={setGoal}
          otherValue={goalOther}
          onOtherChange={setGoalOther}
        />

        <ChipGroup
          label="Where are you starting from?"
          options={startingPointOptions}
          value={startingPoint}
          onChange={setStartingPoint}
        />

        <ChipGroup
          label="Design direction"
          options={designVibeOptions}
          value={designVibe}
          onChange={setDesignVibe}
        />

        <ChipMultiGroup
          label="Features you'll likely need"
          options={featureOptions}
          values={features}
          onToggle={(v) =>
            setFeatures((cur) =>
              cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]
            )
          }
          otherValue={featureOther}
          onOtherChange={setFeatureOther}
        />

        <ChipGroup
          label="Timeline"
          options={timelineOptions}
          value={timeline}
          onChange={setTimeline}
        />

        <Field label="Sites or brands you like (inspiration)" name="inspiration" error={fieldErrors.inspiration}>
          <input
            id="inspiration"
            name="inspiration"
            type="text"
            className={fieldBase}
            placeholder="Optional — links or names of sites you admire"
          />
        </Field>

        <Field label="Anything else / details" name="message" error={fieldErrors.message} required>
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            rows={5}
            className={fieldBase}
            placeholder="Tell us what you have in mind — pages, must-haves, anything specific. Where are you now, and what does done look like?"
          />
        </Field>

        {formError && (
          <p role="alert" className="text-[0.85rem] text-red-500">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full justify-center disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send brief"}
          {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
        </button>
        <p className="text-[0.78rem] text-slate">
          By sending this you agree we may reply by email. We don&apos;t share
          your details.
        </p>
      </div>
    </form>
  );
}

function chipClass(active: boolean) {
  return cn(
    "rounded-full border px-3.5 py-1.5 text-[0.85rem] transition-colors",
    active
      ? "border-blueprint bg-blueprint text-white"
      : "border-grid bg-paper text-ink hover:border-blueprint"
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
  otherValue,
  onOtherChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  const hasOther = Boolean(onOtherChange);
  // value holds either an option or the OTHER sentinel; resolved at submit.
  const list = hasOther ? [...options, OTHER] : options;

  return (
    <fieldset>
      <legend className="mb-2 block font-mono text-[0.72rem] uppercase tracking-wider text-slate">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {list.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active ? "true" : "false"}
              onClick={() => onChange(active ? "" : opt)}
              className={chipClass(active)}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {hasOther && value === OTHER && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange?.(e.target.value)}
          className={cn(fieldBase, "mt-3")}
          placeholder="Tell us in your own words…"
          autoFocus
        />
      )}
    </fieldset>
  );
}

function ChipMultiGroup({
  label,
  options,
  values,
  onToggle,
  otherValue,
  onOtherChange,
}: {
  label: string;
  options: readonly string[];
  values: string[];
  onToggle: (v: string) => void;
  otherValue: string;
  onOtherChange: (v: string) => void;
}) {
  const list = [...options, OTHER];
  return (
    <fieldset>
      <legend className="mb-2 block font-mono text-[0.72rem] uppercase tracking-wider text-slate">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {list.map((opt) => {
          const active = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active ? "true" : "false"}
              onClick={() => onToggle(opt)}
              className={chipClass(active)}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {values.includes(OTHER) && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          className={cn(fieldBase, "mt-3")}
          placeholder="Other features…"
          autoFocus
        />
      )}
    </fieldset>
  );
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[0.72rem] uppercase tracking-wider text-slate"
      >
        {label}
        {required && <span className="text-blueprint"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[0.8rem] text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
