import { Code2, Database, Rocket, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

function ServiceCard({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <article className="glass-panel rounded-[2rem] p-6">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy}</p>
    </article>
  );
}

export function ServicesSection() {
  return (
    <AnimatedSection className="container-shell mt-14 sm:mt-20">
      <div className="flex max-w-3xl flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Services</p>
        <h2 className="section-title">Services built around business outcomes, not technical noise.</h2>
        <p className="section-copy">
          I help businesses ship faster, fix what is blocking growth, and turn product ideas into dependable web applications.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <ServiceCard
          icon={<Rocket className="h-5 w-5" />}
          title="Full Stack Web App Development"
          copy="Launch reliable business platforms that handle real users, real workflows, and future growth."
        />
        <ServiceCard
          icon={<Database className="h-5 w-5" />}
          title="REST API Development"
          copy="Build clean backend APIs that keep your product fast, connected, and easier to extend."
        />
        <ServiceCard
          icon={<Wrench className="h-5 w-5" />}
          title="Bug Fixing & Optimization"
          copy="Resolve frustrating issues, improve speed, and stabilize products that are already live."
        />
        <ServiceCard
          icon={<Code2 className="h-5 w-5" />}
          title="CMS Integration"
          copy="Give your team control over content without depending on a developer for every update."
        />
      </div>
    </AnimatedSection>
  );
}
