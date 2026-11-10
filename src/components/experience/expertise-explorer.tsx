"use client";
import { useEffect, useRef, useState } from "react";
import { StarLink } from "../star-link";
import { BookingLink } from "../booking-link";
import { services, serviceGroups } from "@/content/services";
import { plannerHref } from "@/content/project-types";
import { SoftDisclosure } from "../soft-disclosure";
export function ExpertiseExplorer() {
  const [group, setGroup] = useState<string>("build");
  const [selected, setSelected] = useState(services[0].slug);
  const [details, setDetails] = useState(false);
  const [linkedService, setLinkedService] = useState("");
  const detailRef = useRef<HTMLDivElement>(null);
  const service = services.find((item) => item.slug === selected)!;
  const current = serviceGroups.find((item) => item.id === group);
  const available =
    group === "training"
      ? services.filter((item) => item.slug === "training-mentorship")
      : services.filter((item) =>
          (current?.slugs as readonly string[]).includes(item.slug),
        );
  useEffect(() => {
    const followHash = () => {
      const slug = window.location.hash.slice(1);
      const directGroup = serviceGroups.find((item) => item.id === slug);
      const match = services.find((item) => item.slug === slug);
      if (!match && !directGroup) return;
      setGroup(
        directGroup?.id ??
          serviceGroups.find((item) =>
            (item.slugs as readonly string[]).includes(slug),
          )?.id ??
          "training",
      );
      setSelected(match?.slug ?? directGroup!.slugs[0]);
      setDetails(false);
      setLinkedService(slug);
    };
    followHash();
    window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, []);
  useEffect(() => {
    if (linkedService)
      detailRef.current?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
  }, [linkedService]);
  return (
    <div className="expertise-explorer">
      <div>
        <p className="eyebrow mb-5">/ what do you need?</p>
        <div className="grid gap-3" aria-label="Service groups">
          {serviceGroups.map((item) => (
            <button
              className={`card p-5 text-left ${group === item.id ? "border-blueprint" : ""}`}
              key={item.id}
              type="button"
              aria-pressed={group === item.id}
              onClick={() => {
                setGroup(item.id);
                setSelected(item.slugs[0]);
                setDetails(false);
              }}
            >
              <strong className="display-h3 block">{item.title}</strong>
              <span className="mt-3 block text-slate">{item.problem}</span>
            </button>
          ))}
        </div>
        <button
          className="text-action mt-6"
          type="button"
          aria-pressed={group === "training"}
          onClick={() => {
            setGroup("training");
            setSelected("training-mentorship");
            setDetails(false);
          }}
        >
          Also available: training & mentorship ↗
        </button>
      </div>
      <div
        ref={detailRef}
        id={service.slug}
        className="expertise-anchor expertise-detail"
      >
        <p className="eyebrow mb-4">{current?.title ?? "Training"}</p>
        <h2 className="display-h2">
          {current?.problem ?? "Want to build your team’s practical skills?"}
        </h2>
        <p className="expertise-detail-description">
          {current?.outcome ?? service.description}
        </p>
        <div className="flex flex-wrap gap-3" aria-label="Choose a service">
          {available.map((item) => (
            <button
              className={`rounded-[10px] border px-4 py-3 text-left ${selected === item.slug ? "border-blueprint" : "border-grid"}`}
              key={item.slug}
              type="button"
              aria-pressed={selected === item.slug}
              onClick={() => {
                setSelected(item.slug);
                setDetails(false);
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
        <h3 className="mt-6">{service.title}</h3>
        <p className="mt-3 text-slate">{service.short}</p>
        <button
          type="button"
          className="service-disclosure mt-5"
          aria-expanded={details}
          aria-controls="expertise-included"
          onClick={() => setDetails(!details)}
        >
          What’s included <span aria-hidden>{details ? "−" : "+"}</span>
        </button>
        <SoftDisclosure id="expertise-included" open={details}>
          <ul>
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-slate mt-4">
            Typical scope: {service.timeline}. Confirmed in your written
            proposal.
          </p>
        </SoftDisclosure>
        <div className="expertise-detail-actions">
          <StarLink href={plannerHref(service.slug)} className="button-solid">
            Start a project ↗
          </StarLink>
          <BookingLink />
        </div>
      </div>
    </div>
  );
}
