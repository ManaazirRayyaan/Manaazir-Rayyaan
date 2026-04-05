import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CtaSection } from "@/sections/cta-section";
import { getAllProjects, getSiteSettings } from "@/lib/sanity/api";
import { buildMetadata } from "@/lib/utils/site";
import { PageIntro } from "@/sections/page-intro";
import { ProjectCard } from "@/components/project-card";

// Disable caching for fresh Sanity data
export const revalidate = 0;

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return buildMetadata(
    {
      title: "Projects",
      subtitle:
        "These projects show how I approach client work: define the problem clearly, build the right solution, and focus on the business outcome.",
      seo: {
        title: "Projects | Portfolio",
        description:
          "These projects show how I approach client work: define the problem clearly, build the right solution, and focus on the business outcome.",
      },
    },
    settings,
    "/projects",
  );
}

// Helper to normalize status safely
const normalizeStatus = (status?: string) =>
  status?.toLowerCase().trim();

export default async function ProjectsPage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getAllProjects(),
  ]);

  const ongoingProjects =
    projects?.filter(
      (project) => normalizeStatus(project.status) === "ongoing"
    ) || [];

  const completedProjects =
    projects?.filter(
      (project) => normalizeStatus(project.status) === "completed"
    ) || [];

  return (
    <main className="pb-6">
      <SiteHeader name={settings.name} />

      <PageIntro
        eyebrow="Projects"
        title="Projects That Show How I Solve Business Problems"
        copy="These case studies are structured around the problem, the solution delivered, and the final result."
      />

      <section className="container-shell mt-10 grid gap-8 sm:mt-12 sm:gap-10 xl:grid-cols-2">
        
        {/* Ongoing Projects */}
        <div>
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">
              Ongoing Projects
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Current client work and active product builds.
            </h2>
          </div>

          {ongoingProjects.length > 0 ? (
            <div className="grid gap-6">
              {ongoingProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              No ongoing projects available yet.
            </p>
          )}
        </div>

        {/* Completed Projects */}
        <div>
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">
              Completed Projects
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Delivered projects with a clear business outcome.
            </h2>
          </div>

          {completedProjects.length > 0 ? (
            <div className="grid gap-6">
              {completedProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              No completed projects available yet.
            </p>
          )}
        </div>

      </section>

      <CtaSection
        title="Want results like these for your business?"
        copy="If you need a developer to build, improve, or stabilize a web product, send me the details."
      />

      <SiteFooter
        name={settings.name}
        socialLinks={settings.socialLinks}
      />
    </main>
  );
}

const [settings, projects] = await Promise.all([
  getSiteSettings(),
  getAllProjects(),
]);

console.log("Projects fetched:", JSON.stringify(projects, null, 2)); // 👈 add this