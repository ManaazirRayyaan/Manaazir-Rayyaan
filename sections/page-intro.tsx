import { AnimatedSection } from "@/components/animated-section";

export function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <AnimatedSection className="container-shell pt-8 sm:pt-10 md:pt-12">
      <div className="max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.32em]">{eyebrow}</p>
        <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold tracking-tight sm:mt-4 sm:text-5xl md:text-6xl">{title}</h1>
        {copy ? <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:mt-5 sm:text-lg sm:leading-8">{copy}</p> : null}
      </div>
    </AnimatedSection>
  );
}
