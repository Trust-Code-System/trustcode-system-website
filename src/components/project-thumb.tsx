import Image from "next/image";
import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";

// Slugs that have a real screenshot at /public/work/<slug>.png.
// Anything not listed falls back to the branded placeholder below.
const SHOTS = new Set([
  "the-thesis-desk",
  "helping-tribe-academy",
  "atlas-hr",
  "airtimevault",
  "wearables-atelier",
  "petrobrain",
]);

export function ProjectThumb({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const host = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "internal · showcase";
  const shot = SHOTS.has(project.slug) ? `/work/${project.slug}.png` : null;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-t-card border-b border-grid bg-paper",
        className
      )}
      aria-hidden
    >
      {shot ? (
        <Image
          src={shot}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top"
        />
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

      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-grid" />
          <span className="h-2 w-2 rounded-full bg-grid" />
          <span className="h-2 w-2 rounded-full bg-grid" />
        </span>
        <span
          className={cn(
            "font-mono text-[0.65rem]",
            shot
              ? "rounded bg-paper/85 px-1.5 py-0.5 text-slate backdrop-blur-sm"
              : "text-slate"
          )}
        >
          {host}
        </span>
      </div>
      {project.live && (
        <span
          className={cn(
            "absolute bottom-3 right-4 inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-verified",
            shot && "rounded bg-paper/85 px-1.5 py-0.5 backdrop-blur-sm"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-verified animate-pulse-dot" />
          LIVE
        </span>
      )}
    </div>
  );
}
