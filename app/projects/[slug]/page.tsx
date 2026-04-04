import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CtaSection } from "@/sections/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { RichMedia } from "@/components/rich-media";
import { getAllProjects, getProjectBySlug, getSiteSettings } from "@/lib/sanity/api";
import { buildProjectMetadata } from "@/lib/utils/site";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects
    .filter((project) => project?.slug)
    .map((project) => ({ slug: project.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const [settings, project] = await Promise.all([getSiteSettings(), getProjectBySlug(resolvedParams.slug)]);

  if (!project) {
    return {};
  }

  return buildProjectMetadata(project, settings);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const [settings, project] = await Promise.all([getSiteSettings(), getProjectBySlug(resolvedParams.slug)]);

  if (!project) {
    notFound();
  }

  return (
    <main className="pb-6">
      <SiteHeader name={settings.name} />
      <section className="container-shell pt-12 sm:pt-16">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--muted)]">{project?.status}</p>
          <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold tracking-tight sm:text-6xl">{project?.title}</h1>
          <div className="mt-8 flex flex-wrap gap-3">
            {project?.liveUrl ? (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white">
                Live project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
            {project?.repoUrl ? (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm">
                Source code
              </Link>
            ) : null}
          </div>
        </div>
        {project?.media?.length ? (
          <div className="mt-10">
            <RichMedia items={project.media} />
          </div>
        ) : null}
        <div className="mt-10 grid gap-6">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Case Study</p>
            <div className="mt-6 grid gap-6">
              <div>
                <h2 className="text-2xl font-semibold">Problem</h2>
                <p className="mt-3 text-base leading-8 text-[var(--muted)]">{project?.problem}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Solution</h2>
                <p className="mt-3 text-base leading-8 text-[var(--muted)]">{project?.solution}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Result</h2>
                <p className="mt-3 text-base leading-8 text-[var(--muted)]">{project?.result}</p>
              </div>
              {project?.techStack?.length ? (
                <div>
                <h2 className="text-2xl font-semibold">Tech Stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((item) => (
                    <span key={item} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm text-[var(--foreground)]">
                      {item}
                    </span>
                  ))}
                </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <CtaSection title="Need a similar result for your business?" copy="If you want a custom web application, cleaner backend logic, or a more effective frontend experience, get in touch." />
      <SiteFooter name={settings.name} socialLinks={settings.socialLinks} />
    </main>
  );
}
