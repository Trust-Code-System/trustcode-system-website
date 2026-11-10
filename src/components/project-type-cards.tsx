"use client";
import Link from "next/link";
import { useState } from "react";
import { projectTypes, homepageProjectTypes } from "@/content/estimator";
import { priceFor, itemPrice } from "@/lib/pricing";
import { SoftDisclosure } from "./soft-disclosure";
const groups = [
  "Websites",
  "Online stores",
  "Platforms & apps",
  "AI",
  "Something else",
];
export function ProjectTypeCards({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect?: (id: string) => void;
}) {
  const selectedGroup = projectTypes.find(
    (type) => type.id === selected,
  )?.group;
  const [opened, setOpened] = useState<string | null>(null);
  const renderCard = (
    type: (typeof projectTypes)[number],
    label = type.label,
  ) => {
    const price = priceFor(type.id);
    const content = (
      <>
        <span className="flex justify-between gap-3 font-medium">
          {label}
          <span aria-hidden>↗</span>
        </span>
        <span className="mt-2 block text-[0.85rem] leading-relaxed text-slate">
          {type.blurb}
        </span>
        {onSelect && price && (
          <span className="mt-3 block text-[0.85rem] text-blueprint">
            {itemPrice(price)}
          </span>
        )}
      </>
    );
    const className = `card p-4 text-left transition-colors hover:border-blueprint ${selected === type.id ? "border-blueprint bg-surface" : ""}`;
    return onSelect ? (
      <button
        className={className}
        key={type.id}
        type="button"
        aria-pressed={selected === type.id}
        onClick={() => onSelect(type.id)}
      >
        {content}
      </button>
    ) : (
      <Link
        className={className}
        key={type.id}
        href={`/estimate?type=${type.id}`}
      >
        {content}
      </Link>
    );
  };
  if (!onSelect)
    return (
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {homepageProjectTypes.map((item) =>
          renderCard(
            projectTypes.find((type) => type.id === item.id)!,
            item.label,
          ),
        )}
      </div>
    );
  return (
    <div className="mt-5 grid gap-3">
      {groups.map((group) => {
        const open =
          opened === group ||
          (opened === null && (selectedGroup ?? "Websites") === group);
        const id = `project-group-${groups.indexOf(group)}`;
        return (
          <div className="card p-4" key={group}>
            <h3>
              <button
                className="flex w-full items-center justify-between gap-3 text-left font-semibold"
                type="button"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpened(open ? "" : group)}
              >
                {group}
                <span aria-hidden>{open ? "−" : "+"}</span>
              </button>
            </h3>
            <SoftDisclosure open={open} id={id}>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {projectTypes
                  .filter((type) => type.group === group)
                  .map((type) => renderCard(type))}
              </div>
            </SoftDisclosure>
          </div>
        );
      })}
    </div>
  );
}
