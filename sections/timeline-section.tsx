import { AnimatedSection } from "@/components/animated-section";
import type { TimelineItem } from "@/lib/sanity/types";

export function TimelineSection({ items }: { items?: TimelineItem[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <AnimatedSection className="container-shell mt-10 sm:mt-12">
      <div className="glass-panel rounded-[1.5rem] p-6 sm:p-7">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Experience</p>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item._key ?? item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
              <p className="text-sm font-medium text-[var(--accent-secondary)]">{item.period}</p>
              <div className="mt-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                {item.organization ? <p className="mt-1 text-sm text-[var(--muted)]">{item.organization}</p> : null}
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/88">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
