import { AnimatedSection } from "@/components/animated-section";
import { RichMedia } from "@/components/rich-media";
import type { ContentSection } from "@/lib/sanity/types";

export function ContentSections({ sections }: { sections?: ContentSection[] }) {
  if (!sections?.length) {
    return null;
  }

  return (
    <div className="container-shell mt-10 space-y-5 sm:mt-12">
      {sections.map((section, index) => (
        <AnimatedSection key={section._key ?? section.title} delay={index === 0 ? 0 : 0.04}>
          <div className="glass-panel grid gap-6 rounded-[1.5rem] p-6 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              {section.eyebrow ? <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">{section.eyebrow}</p> : null}
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{section.title}</h2>
            </div>
            <div>
              <p className="text-base leading-8 text-[var(--foreground)]/88">{section.body}</p>
              {section.highlights?.length ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {section.highlights.map((item) => (
                    <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-medium text-[var(--foreground)]">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="mt-6">
                <RichMedia items={section.media} />
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
