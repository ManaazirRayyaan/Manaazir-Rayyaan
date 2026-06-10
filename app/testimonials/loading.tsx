import { SiteHeader } from "@/components/site-header";

export default function TestimonialsLoading() {
  return (
    <main className="pb-6" aria-busy="true">
      <SiteHeader name="Manaazir Rayyaan" />
      <section className="container-shell pt-12 sm:pt-16">
        <div className="max-w-4xl">
          <div className="h-4 w-36 animate-pulse rounded-full bg-[var(--accent-soft)]" />
          <div className="mt-5 h-14 w-full max-w-3xl animate-pulse rounded-2xl bg-[var(--surface-strong)] sm:h-16" />
          <div className="mt-4 h-6 w-full max-w-2xl animate-pulse rounded-full bg-[var(--surface-strong)]" />
        </div>
      </section>
      <section className="container-shell mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading testimonials">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="glass-panel rounded-[2rem] p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 animate-pulse rounded-full bg-[var(--accent-soft)]" />
              <div className="flex-1">
                <div className="h-4 w-32 animate-pulse rounded-full bg-[var(--surface-strong)]" />
                <div className="mt-3 h-3 w-44 animate-pulse rounded-full bg-[var(--surface-strong)]" />
              </div>
            </div>
            <div className="mt-6 h-4 w-28 animate-pulse rounded-full bg-[var(--accent-soft)]" />
            <div className="mt-6 space-y-3">
              <div className="h-3 w-full animate-pulse rounded-full bg-[var(--surface-strong)]" />
              <div className="h-3 w-11/12 animate-pulse rounded-full bg-[var(--surface-strong)]" />
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-[var(--surface-strong)]" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
