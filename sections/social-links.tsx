import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { normalizeSocialLinks } from "@/lib/constants";
import type { SocialLink } from "@/lib/sanity/types";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <FaGithub className="h-4 w-4" />,
  linkedin: <FaLinkedin className="h-4 w-4" />,
  instagram: <FaInstagram className="h-4 w-4" />,
};

export function SocialLinks({ links }: { links: SocialLink[] }) {
  const normalizedLinks = normalizeSocialLinks(links);

  return (
    <div className="flex flex-wrap gap-3">
      {normalizedLinks.map((link) => {
        const icon = SOCIAL_ICONS[link.label.toLowerCase()];
        return (
          <Link
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            {icon}
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
