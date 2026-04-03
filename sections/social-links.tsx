import Link from "next/link";
import { normalizeSocialLinks } from "@/lib/constants";
import type { SocialLink } from "@/lib/sanity/types";

export function SocialLinks({ links }: { links: SocialLink[] }) {
  const normalizedLinks = normalizeSocialLinks(links);

  return (
    <div className="flex flex-wrap gap-3">
      {normalizedLinks.map((link) => (
        <Link
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
