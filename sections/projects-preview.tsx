import { AnimatedSection } from "@/components/animated-section";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/sanity/types";

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  if (!projects?.length) {
    return null;
  }

  return (
    <AnimatedSection className="container-shell mt-14 sm:mt-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Proof of Work</p>
          <h2 className="section-title mt-3">Projects framed around business problems, the solution delivered, and the result.</h2>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </AnimatedSection>
  );
}
