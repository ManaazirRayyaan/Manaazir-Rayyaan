import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RichMedia } from "@/components/rich-media";
import type { Project } from "@/lib/sanity/types";

export function ProjectCard({ project }: { project: Project }) {
  const previewMedia =
    project.media?.length
      ? project.media.slice(0, 1)
      : [
          {
            mediaType: "image" as const,
            imageUrl:
              project.status === "ongoing"
                ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            alt: project.title,
            caption: project.status === "ongoing" ? "Active development and iteration." : "Completed full-stack project showcase.",
          },
        ];

  return (
    <article className="glass-panel overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">{project.status}</p>
          <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white"
          aria-label={`Open ${project.title}`}
        >
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="mt-6">
        <RichMedia items={previewMedia} compact />
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Problem</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{project.problem}</p>
        </div>
        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Solution</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{project.solution}</p>
        </div>
        <div className="rounded-[1.5rem] bg-[var(--accent-soft)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Result</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{project.result}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((item) => (
          <span key={item} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--foreground)]">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
