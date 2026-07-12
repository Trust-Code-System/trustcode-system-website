import Image from "next/image";
import type { Project } from "@/content/portfolio";
import { PROOF_LABELS } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const SCREENSHOT_SLUGS = new Set([
  "the-thesis-desk",
  "helping-tribe-academy",
  "atlas-hr",
  "airtimevault",
  "wearables-atelier",
  "petrobrain",
  "aureo",
  "studycoach",
  "sln-engineering",
]);

function resolveCover(project: Project): string | null {
  if (project.coverImage) return project.coverImage;
  if (SCREENSHOT_SLUGS.has(project.slug)) return `/work/${project.slug}.png`;
  return null;
}

export function ProjectThumb({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const host = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : project.sourceUrl
      ? "github · source"
      : "case study";
  const shot = resolveCover(project);
  const isSvg = shot?.endsWith(".svg");
  const proof = PROOF_LABELS[project.proofType];
  const isLive =
    project.proofType === "live" || project.proofType === "live-client";

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-t-card border-b border-grid bg-paper",
        className
      )}
    >
      {shot ? (
        isSvg ? (
          // SVGs are intentional covers; skip next/image optimizer.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <Image
            src={shot}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top"
          />
        )
      ) : (
        <>
          <div className="grid-bg absolute inset-0" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">
              {project.title}
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-slate">
              {project.sector}
            </span>
          </div>
        </>
      )}

      <div className="absolute left-4 top-4 flex max-w-[70%] flex-wrap items-center gap-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-grid" />
          <span className="h-2 w-2 rounded-full bg-grid" />
          <span className="h-2 w-2 rounded-full bg-grid" />
        </span>
        <span
          className={cn(
            "truncate font-mono text-[0.65rem]",
            shot
              ? "rounded bg-paper/85 px-1.5 py-0.5 text-slate backdrop-blur-sm"
              : "text-slate"
          )}
        >
          {host}
        </span>
      </div>

      <span
        className={cn(
          "absolute bottom-3 right-4 inline-flex items-center gap-1.5 rounded bg-paper/90 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide backdrop-blur-sm",
          isLive ? "text-verified" : "text-slate"
        )}
      >
        {isLive && (
          <span className="h-1.5 w-1.5 rounded-full bg-verified animate-pulse-dot" />
        )}
        {proof}
      </span>
    </div>
  );
}
