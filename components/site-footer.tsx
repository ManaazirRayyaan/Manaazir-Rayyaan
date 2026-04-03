import Link from "next/link";
import { normalizeSocialLinks } from "@/lib/constants";
import type { SocialLink } from "@/lib/sanity/types";

export function SiteFooter({ name, socialLinks }: { name: string; socialLinks: SocialLink[] }) {
  const normalizedLinks = normalizeSocialLinks(socialLinks);

  return (
    <footer className="container-shell pb-10 pt-12">
      <div className="glass-panel rounded-[1.5rem] px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Freelance Web Development</p>
            <h2 className="mt-3 text-2xl font-semibold">{name}</h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
              I help businesses plan, build, and launch reliable web applications using Django, React, and clean scalable architecture.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="rounded-full border border-[var(--border)] px-3 py-2">Available for freelance work</span>
              <span className="rounded-full border border-[var(--border)] px-3 py-2">Based in India</span>
              <span className="rounded-full border border-[var(--border)] px-3 py-2">Replies within 24 hours</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {normalizedLinks.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
