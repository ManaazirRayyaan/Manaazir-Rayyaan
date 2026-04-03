import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CtaSection({
  title = "Need a developer who can build your product properly the first time?",
  copy = "I help businesses launch fast, scalable web applications without unnecessary complexity.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="container-shell mt-10 sm:mt-12">
      <div className="glass-panel rounded-[1.25rem] px-5 py-7 sm:rounded-[1.5rem] sm:px-8 sm:py-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">Call to Action</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/88 sm:text-base sm:leading-8">{copy}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/contact" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white sm:w-auto">
              Hire Me
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/projects" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--border)] px-5 py-3 text-sm text-[var(--foreground)] sm:w-auto">
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
