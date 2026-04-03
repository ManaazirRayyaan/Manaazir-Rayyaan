import { AnimatedSection } from "@/components/animated-section";
import type { SkillGroup } from "@/lib/sanity/types";

export function SkillsSection({ groups }: { groups?: SkillGroup[] }) {
  if (!groups?.length) {
    return null;
  }

  return (
    <AnimatedSection className="container-shell mt-10 sm:mt-12">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Capabilities</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Technical capability organized around what clients actually need.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {groups.map((group) => (
          <article key={group._key ?? group.title} className="glass-panel rounded-[1.5rem] p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">{group.title}</p>
            <div className="mt-4 space-y-3">
              {group.skills.map((skill) => (
                <div key={skill} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm leading-6 text-[var(--foreground)]">
                  {skill}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
