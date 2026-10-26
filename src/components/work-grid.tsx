"use client";

import { useState, type ReactNode } from "react";
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
          ? "border-blueprint bg-blueprint text-paper"
          : "border-grid bg-surface text-slate hover:border-blueprint hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="mt-8 grid gap-7 sm:grid-cols-2">
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
  const [query, setQuery] = useState("");
  const matches = (p: Project) =>
    !query.trim() ||
    [p.title, p.tagline, p.sector, ...p.categories, ...p.stack]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase());
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");

  const featured = byCategory(getFeaturedProjects(), categoryFilter).filter(
    matches,
  );
  const moreWork = byCategory(getMoreWork(), categoryFilter).filter(matches);

  const isDefault = categoryFilter === "All" && !query.trim();
  const visibleCount = featured.length + moreWork.length;
  const filteredAll = [...featured, ...moreWork];

  return (
    <div className="work-grid-new">
      <label className="work-search">
        <span aria-hidden>⌕</span>
        <span className="sr-only">Search projects</span>
        <input
          aria-label="Search projects"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a project, industry or technology…"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear project search"
            onClick={() => setQuery("")}
          >
            ×
          </button>
        )}
      </label>
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
          <p className="mt-2 text-slate">
            Try another search or category filter.
          </p>
          <button
            type="button"
            className="btn-secondary mt-6"
            onClick={() => {
              setCategoryFilter("All");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : isDefault ? (
        <div className="mt-12 space-y-16">
          <section aria-labelledby="featured-work-heading">
            <p className="eyebrow">product work</p>
            <h2
              id="featured-work-heading"
              className="display-h2 mt-2 text-[clamp(1.5rem,3vw,2rem)]"
            >
              Products designed for real users
            </h2>
            <p className="mt-2 max-w-2xl text-[0.95rem] text-slate">
              Live products and polished digital experiences with thoughtful
              interfaces, clear user journeys, and production-ready delivery.
            </p>
            <ProjectGrid items={featured} />
          </section>

          <section
            aria-labelledby="more-work-heading"
            className="border-t border-grid pt-14"
          >
            <p className="eyebrow">technical work</p>
            <h2
              id="more-work-heading"
              className="display-h2 mt-2 text-[clamp(1.5rem,3vw,2rem)]"
            >
              Engineering &amp; technical work
            </h2>
            <p className="mt-2 max-w-2xl text-[0.95rem] text-slate">
              Backend systems, cloud and serverless architectures, security
              investigations, and practical engineering labs.
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
