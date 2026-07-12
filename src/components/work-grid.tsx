"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProjectCard } from "./project-card";
import {
  CATEGORY_FILTERS,
  getFeaturedProjects,
  getMoreWork,
  type Category,
  type Project,
} from "@/content/portfolio";
import { cn } from "@/lib/utils";

type CategoryFilter = Category | "All";

function FilterChip({
  selected,
  onClick,
  children,
  id,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  id: string;
}) {
  return (
    <button
      type="button"
      id={id}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 font-mono text-[0.78rem] uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint",
        selected
          ? "border-blueprint bg-blueprint text-white"
          : "border-grid bg-surface text-slate hover:border-blueprint hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <div
          key={p.slug}
          className="work-item"
          style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}
        >
          <ProjectCard project={p} />
        </div>
      ))}
    </div>
  );
}

function byCategory(list: Project[], category: CategoryFilter) {
  if (category === "All") return list;
  return list.filter((p) => p.categories.includes(category));
}

export function WorkGrid() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");

  const featured = useMemo(
    () => byCategory(getFeaturedProjects(), categoryFilter),
    [categoryFilter]
  );
  const moreWork = useMemo(
    () => byCategory(getMoreWork(), categoryFilter),
    [categoryFilter]
  );

  const isDefault = categoryFilter === "All";
  const visibleCount = featured.length + moreWork.length;
  const filteredAll = [...featured, ...moreWork];

  return (
    <div>
      <div className="space-y-5">
        <div>
          <p className="mb-2 font-mono text-[0.72rem] uppercase tracking-wider text-slate">
            Filter by category
          </p>
          <div
            role="group"
            aria-label="Filter work by category"
            className="flex flex-wrap gap-2"
          >
            {CATEGORY_FILTERS.map((c) => (
              <FilterChip
                key={c}
                id={`category-${c}`}
                selected={categoryFilter === c}
                onClick={() => setCategoryFilter(c)}
              >
                {c}
              </FilterChip>
            ))}
          </div>
        </div>

        <p className="font-mono text-[0.75rem] text-slate" aria-live="polite">
          Showing {visibleCount} project{visibleCount === 1 ? "" : "s"}
        </p>
      </div>

      {visibleCount === 0 ? (
        <div
          className="mt-12 rounded-card border border-grid bg-surface p-10 text-center"
          role="status"
        >
          <p className="display-h3 text-[1.25rem]">No projects match</p>
          <p className="mt-2 text-slate">Try another category filter.</p>
          <button
            type="button"
            className="btn-secondary mt-6"
            onClick={() => setCategoryFilter("All")}
          >
            Clear filters
          </button>
        </div>
      ) : isDefault ? (
        <div className="mt-12 space-y-16">
          <section aria-labelledby="featured-work-heading">
            <p className="eyebrow">featured work</p>
            <h2
              id="featured-work-heading"
              className="display-h2 mt-2 text-[clamp(1.5rem,3vw,2rem)]"
            >
              Featured work
            </h2>
            <p className="mt-2 max-w-2xl text-[0.95rem] text-slate">
              Selected products, platforms, cloud architectures, and security
              projects delivered by TrustCode System.
            </p>
            <ProjectGrid items={featured} />
          </section>

          <section
            aria-labelledby="more-work-heading"
            className="border-t border-grid pt-14"
          >
            <p className="eyebrow">more from trustcode</p>
            <h2
              id="more-work-heading"
              className="display-h2 mt-2 text-[clamp(1.5rem,3vw,2rem)]"
            >
              More work from TrustCode
            </h2>
            <p className="mt-2 max-w-2xl text-[0.95rem] text-slate">
              Additional live products, experiments, and technical showcases
              from across the TrustCode portfolio.
            </p>
            <ProjectGrid items={moreWork} />
          </section>
        </div>
      ) : (
        <div className="mt-12">
          <section aria-labelledby="filtered-work-heading">
            <h2
              id="filtered-work-heading"
              className="display-h2 text-[clamp(1.5rem,3vw,2rem)]"
            >
              Matching projects
            </h2>
            <ProjectGrid items={filteredAll} />
          </section>
        </div>
      )}
    </div>
  );
}
