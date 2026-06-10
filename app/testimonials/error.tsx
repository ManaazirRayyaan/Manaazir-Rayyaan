"use client";

import { SiteHeader } from "@/components/site-header";

export default function TestimonialsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="pb-6">
      <SiteHeader name="Manaazir Rayyaan" />
      <section className="container-shell pt-12 sm:pt-16">
        <div className="glass-panel rounded-[2rem] p-8 text-center sm:p-10">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Testimonials Unavailable</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Could not load client testimonials.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            The page is available, but the testimonial data could not be loaded right now.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
