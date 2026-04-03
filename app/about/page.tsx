import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Boxes, Code2, Database, ShieldCheck, Wrench } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPageContent, getSiteSettings } from "@/lib/sanity/api";
import type { ContentSection, SkillGroup } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/utils/site";

function getSectionByTitle(sections: ContentSection[] | undefined, title: string) {
  return sections?.find((section) => section.title.toLowerCase() === title.toLowerCase());
}

function getImageFromSection(section: ContentSection | undefined, fallback: string) {
  return section?.media?.find((item) => item.mediaType === "image" && item.imageUrl)?.imageUrl ?? fallback;
}

function getCapabilityCopy(title: string) {
  switch (title.toLowerCase()) {
    case "frontend":
    case "frontend development":
      return "Responsive interfaces, clear user flows, strong structure, and frontend performance that supports conversion.";
    case "backend":
    case "backend development":
      return "Django-powered APIs, business logic, integrations, and backend systems built to stay stable as the product grows.";
    case "full stack systems":
    case "database":
      return "Complete product delivery across frontend, backend, and data handling so the final system works as one coherent whole.";
    default:
      return "Practical implementation focused on reliability, maintainability, and real business use.";
  }
}

function getCapabilityIcon(title: string) {
  switch (title.toLowerCase()) {
    case "frontend":
    case "frontend development":
      return <Code2 className="h-5 w-5" />;
    case "backend":
    case "backend development":
      return <Database className="h-5 w-5" />;
    default:
      return <Boxes className="h-5 w-5" />;
  }
}

function AboutVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-strong)] shadow-[0_12px_28px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-3 sm:px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 rounded-full border border-[var(--border)] px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[var(--muted)] sm:ml-3 sm:px-3 sm:text-[10px] sm:tracking-[0.22em]">
          Product Preview
        </div>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
    </div>
  );
}

function CapabilityCard({ group }: { group: SkillGroup }) {
  return (
    <article className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5 sm:rounded-[1.5rem] sm:p-6">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
        {getCapabilityIcon(group.title)}
      </div>
      <h3 className="mt-5 text-xl font-semibold">{group.title === "Database" ? "Full Stack Systems" : group.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/82">{getCapabilityCopy(group.title)}</p>
    </article>
  );
}

export async function generateMetadata() {
  const [settings, page] = await Promise.all([getSiteSettings(), getPageContent("about")]);
  return buildMetadata(page, settings, "/about");
}

export default async function AboutPage() {
  const [settings, page] = await Promise.all([getSiteSettings(), getPageContent("about")]);

  const whyClientsHireMe = getSectionByTitle(page.contentSections, "Why Clients Hire Me");
  const whatYouGet = getSectionByTitle(page.contentSections, "What You Get");
  const introVisual = getImageFromSection(whyClientsHireMe, "/completed-projects.png");
  const trustVisual = getImageFromSection(whyClientsHireMe, "/completed-projects.png");

  return (
    <main className="pb-6">
      <SiteHeader name={settings.name} />

      <section className="container-shell pt-8 sm:pt-10 md:pt-12">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.32em]">About Me</p>
            <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold tracking-tight sm:mt-4 sm:text-5xl md:text-6xl">
              I build dependable web products for businesses that need clean execution.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/84 sm:mt-5 sm:text-lg sm:leading-8">
              I help businesses turn requirements into stable, scalable web applications. My role is not just to write code, but to understand the product goal, build it properly, and make delivery feel clear from start to finish.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white sm:w-auto sm:px-6">
                Hire Me
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/projects" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--border)] px-5 py-3 text-sm text-[var(--foreground)] sm:w-auto sm:px-6">
                View Projects
              </Link>
            </div>
          </div>
          <AboutVisual src={introVisual} alt="Professional web application interface preview" />
        </div>
      </section>

      <section className="container-shell mt-10 sm:mt-12">
        <div className="mb-6 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">Capabilities</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">Core capabilities structured around delivery, not tools.</h2>
        </div>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {(page.skillGroups ?? []).map((group) => (
            <CapabilityCard key={group._key ?? group.title} group={group} />
          ))}
        </div>
      </section>

      <section className="container-shell mt-10 sm:mt-12">
        <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:rounded-[1.5rem] sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">Experience</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Freelance work built around reliability, speed, and practical delivery.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--foreground)]/84 sm:text-base sm:leading-8">
            I work on business websites, dashboards, APIs, content systems, and internal tools. My focus is on delivering products that are usable, maintainable, and ready for real operations after launch.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4 text-sm text-[var(--foreground)]/84">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-secondary)]" />
              <span>Handled full-stack delivery from planning and architecture through implementation and launch.</span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4 text-sm text-[var(--foreground)]/84">
              <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-secondary)]" />
              <span>Built products that stay stable after handoff, with cleaner maintenance and fewer operational issues.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-10 sm:mt-12">
        <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:rounded-[1.5rem] sm:p-6">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] p-3 shadow-md sm:p-4">
              <AboutVisual src={trustVisual} alt="Dashboard and product UI preview" />
            </div>
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">Why Clients Hire Me</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">Why Clients Hire Me</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/84 sm:text-base sm:leading-8">
                I work best with clients who need a developer that can understand the business goal, execute cleanly, and deliver a product that stays reliable after launch.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  "Clean and scalable code",
                  "Business-focused development",
                  "Clear communication",
                  "Reliable delivery",
                  "Easy-to-maintain systems",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4 text-sm font-medium text-[var(--foreground)] sm:rounded-2xl">
                    <span className="mt-0.5 text-[var(--accent)]">✔</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-10 sm:mt-12">
        <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:rounded-[1.5rem] sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">What You Get</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">A final product that feels ready to use, not just ready to demo.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {(whatYouGet?.highlights ?? [
              "Business-focused execution",
              "Clean, scalable code",
              "Reliable backend systems",
              "Smooth frontend experience",
              "Easy maintenance",
            ]).map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4 text-sm font-medium text-[var(--foreground)] sm:rounded-2xl">
                <span className="mt-0.5 text-[var(--accent)]">✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell mt-10 sm:mt-12">
        <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-8 text-center sm:rounded-[1.5rem] sm:px-6 sm:py-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">Call to Action</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-4xl">
            Need a developer who can build your product properly the first time?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--foreground)]/84 sm:text-base sm:leading-8">
            I help businesses launch fast, scalable web applications without unnecessary complexity.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/contact" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white sm:w-auto sm:px-6">
              Hire Me
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/projects" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--border)] px-5 py-3 text-sm text-[var(--foreground)] sm:w-auto sm:px-6">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter name={settings.name} socialLinks={settings.socialLinks} />
    </main>
  );
}
