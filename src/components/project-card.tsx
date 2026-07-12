import Link from "next/link";
import type { Project } from "@/content/portfolio";
import { PROOF_LABELS, proofCtaLabel } from "@/content/portfolio";
import { ProjectThumb } from "./project-thumb";
import { ArrowUpRight } from "./icons";

function liveLabel(project: Project) {
  return project.liveCtaLabel ?? proofCtaLabel(project.proofType);
}

function sourceLabel(project: Project) {
  return (
    project.sourceCtaLabel ??
    proofCtaLabel(
      project.proofType === "architecture" ? "architecture" : "github"
    )
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const showLive = Boolean(project.live);
  const showSource = Boolean(project.sourceUrl);
  // When both destinations exist, expose separate actions (e.g. 9th Luxe).
  const singleExternal =
    showLive && !showSource
      ? { href: project.live!, label: liveLabel(project) }
      : !showLive && showSource
        ? { href: project.sourceUrl!, label: sourceLabel(project) }
        : null;

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.title} case study`}
      >
        <ProjectThumb project={project} />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge">{PROOF_LABELS[project.proofType]}</span>
          <span className="badge">{project.sector}</span>
          {project.categories.slice(0, 2).map((c) => (
            <span key={c} className="badge">
              {c}
            </span>
          ))}
        </div>
        <h3 className="display-h3 mt-4 text-[1.25rem]">
          <Link
            href={`/work/${project.slug}`}
            className="hover:text-blueprint"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-slate">
          {project.tagline}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-grid pt-4">
          <Link
            href={`/work/${project.slug}`}
            className="text-[0.85rem] font-medium text-blueprint hover:underline"
          >
            Case study
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
            {showLive && showSource ? (
              <>
                <a
                  href={project.live!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[0.72rem] text-slate hover:text-ink"
                  aria-label={`${liveLabel(project)} for ${project.title} (opens in new tab)`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-verified" />
                  {liveLabel(project)}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
                <a
                  href={project.sourceUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[0.72rem] text-slate hover:text-ink"
                  aria-label={`${sourceLabel(project)} for ${project.title} (opens in new tab)`}
                >
                  {sourceLabel(project)}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </>
            ) : (
              singleExternal && (
                <a
                  href={singleExternal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[0.72rem] text-slate hover:text-ink"
                  aria-label={`${singleExternal.label} for ${project.title} (opens in new tab)`}
                >
                  {project.live && (
                    <span className="h-1.5 w-1.5 rounded-full bg-verified" />
                  )}
                  {singleExternal.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
