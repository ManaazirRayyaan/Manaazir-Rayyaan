import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { normalizeSocialLinks } from "@/lib/constants";
import type { SocialLink } from "@/lib/sanity/types";

type SiteFooterProps = {
  name: string;
  socialLinks: SocialLink[];
};

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <FaGithub className="h-4 w-4" />,
  linkedin: <FaLinkedin className="h-4 w-4" />,
  instagram: <FaInstagram className="h-4 w-4" />,
};

export function SiteFooter({ name, socialLinks }: SiteFooterProps) {
  const normalizedLinks = normalizeSocialLinks(socialLinks);

  return (
    <footer className="pb-10 pt-12">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">

        {/* MAIN CARD */}
        <div className="glass-panel relative rounded-3xl px-6 py-8 overflow-visible">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* LEFT CONTENT */}
            <div className="flex flex-col gap-4">
              <p className="text-(--muted) text-sm uppercase tracking-[0.28em]">
                Freelance Web Development
              </p>

              <h2 className="text-2xl font-semibold">{name}</h2>

              <p className="text-(--muted) max-w-sm text-sm leading-relaxed">
                I help businesses plan, build, and launch reliable web applications using Django, React,
                and clean scalable architecture.
              </p>

              <div className="text-(--muted) flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
                <span className="border-(--border) rounded-full border px-3 py-2">
                  Available for freelance work
                </span>
                <span className="border-(--border) rounded-full border px-3 py-2">
                  Based in India
                </span>
                <span className="border-(--border) rounded-full border px-3 py-2">
                  Replies within 24 hours
                </span>
              </div>
            </div>

            {/* RIGHT: logo + social links */}
            <div className="flex flex-col items-center gap-4 shrink-0">

              {/* LOGO CARD — large */}
              <div className="relative flex items-center justify-center rounded-2xl border border-(--border) bg-(--card) shadow-md p-3 w-52 h-52 sm:w-56 sm:h-56">
                <div className="absolute inset-0 rounded-2xl bg-[#F25C29]/10 blur-lg pointer-events-none" />
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/mywebsitelogo.jpeg"
                    alt={`${name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* SOCIAL LINKS — centered below logo */}
              <div className="flex flex-row gap-2">
                {normalizedLinks.map((link) => {
                  const icon = SOCIAL_ICONS[link.label.toLowerCase()];
                  return (
                    <Link
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-(--border) text-(--muted) hover:text-(--foreground) flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors whitespace-nowrap"
                    >
                      {icon}
                      {link.label}
                    </Link>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
