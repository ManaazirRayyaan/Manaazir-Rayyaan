import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import type { PageContent, SiteSettings } from "@/lib/sanity/types";

export function HeroSection({ page, settings }: { page: PageContent; settings: SiteSettings }) {
  return (
    <AnimatedSection className="container-shell pt-6 sm:pt-8 md:pt-10 lg:pt-12">
      <div className="glass-panel relative overflow-hidden rounded-[1.25rem] px-4 py-6 sm:rounded-[1.5rem] sm:px-6 sm:py-10 md:px-8 md:py-12">
        <div className="relative grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">Freelance Django + React Developer</p>
            <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold tracking-tight sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl">
              I build scalable web applications using Django & React
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-lg md:text-xl md:leading-8">
              Helping businesses launch fast, reliable digital products.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:mt-5 sm:text-base md:text-lg">
              {page.intro ?? settings.shortIntroduction}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white sm:w-auto sm:px-6">
                Hire Me
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/projects" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--border)] px-5 py-3 text-sm text-[var(--foreground)] sm:w-auto sm:px-6">
                View Projects
              </Link>
            </div>
          </div>
          <div className="grid gap-4 rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-strong)] p-3 sm:rounded-[1.25rem] sm:p-5 md:p-6">
            <div className="rounded-[0.9rem] bg-[var(--accent-soft)] p-4 sm:rounded-[1rem] sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.24em]">Best fit</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground)] sm:text-base">
                Business websites, dashboards, custom portals, internal tools, and API-powered products.
              </p>
            </div>
            <div className="rounded-[0.9rem] border border-[var(--border)] p-4 sm:rounded-[1rem] sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.24em]">What clients want</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--muted)]">
                <li>Fast delivery without fragile code</li>
                <li>Clear communication and predictable execution</li>
                <li>Products that are easy to maintain after launch</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
