import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RichMedia } from "@/components/rich-media";
import type { Project } from "@/lib/sanity/types";

export function ProjectCard({ project }: { project: Project }) {
  const previewMedia = project.media?.length ? project.media.slice(0, 1) : undefined;
  const hasSlug = Boolean(project?.slug);
  const projectTitle = project?.title ?? "Untitled project";
  const techStack = project?.techStack ?? [];

  return (
    <article className="glass-panel overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">{project?.status}</p>
          <h3 className="mt-3 text-2xl font-semibold">{projectTitle}</h3>
        </div>
        {hasSlug ? (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white"
            aria-label={`Open ${projectTitle}`}
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        ) : (
          <div className="inline-flex h-11 w-11 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-[var(--accent)]/40 text-white opacity-50">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        )}
      </div>

      {previewMedia?.length ? (
        <div className="mt-6">
          <RichMedia items={previewMedia} compact />
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Problem</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{project?.problem}</p>
        </div>
        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Solution</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{project?.solution}</p>
        </div>
        <div className="rounded-[1.5rem] bg-[var(--accent-soft)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Result</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{project?.result}</p>
        </div>
      </div>

      {techStack.length ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {techStack.map((item) => (
            <span key={item} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--foreground)]">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
