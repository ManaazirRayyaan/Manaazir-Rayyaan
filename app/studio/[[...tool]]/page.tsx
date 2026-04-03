import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio",
  description: "Sanity Studio access and setup instructions.",
  robots: {
    index: false,
    follow: false,
  },
};

const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || process.env.SANITY_STUDIO_URL;

export default function StudioPage() {
  return (
    <main className="container-shell py-10 sm:py-12">
      <section className="glass-panel rounded-[1.25rem] px-5 py-8 sm:rounded-[1.5rem] sm:px-8 sm:py-10">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">
          Sanity Studio
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Content management access</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--foreground)]/84 sm:text-base sm:leading-8">
          The website build is intentionally decoupled from the embedded Studio runtime so production builds stay stable.
          Manage content through your hosted Sanity Studio, or set a studio URL to open it from here.
        </p>

        <div className="mt-6 rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5 sm:p-6">
          {studioUrl ? (
            <>
              <p className="text-sm leading-7 text-[var(--foreground)]/84">
                Your studio is available here:
              </p>
              <Link
                href={studioUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white sm:px-6"
              >
                Open Sanity Studio
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm leading-7 text-[var(--foreground)]/84">
                Add <code className="rounded bg-[var(--accent-soft)] px-2 py-1 text-xs">NEXT_PUBLIC_SANITY_STUDIO_URL</code> to
                your <code className="rounded bg-[var(--accent-soft)] px-2 py-1 text-xs">.env.local</code> to open your hosted
                studio from this route.
              </p>
              <div className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted)]">
                <p>Example: <code className="rounded bg-[var(--accent-soft)] px-2 py-1 text-xs">NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-project.sanity.studio</code></p>
                <p>You can still use the website with Sanity content APIs without embedding Studio into the Next.js runtime.</p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
