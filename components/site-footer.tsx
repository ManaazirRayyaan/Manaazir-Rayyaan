import Image from "next/image";
import Link from "next/link";
import { normalizeSocialLinks } from "@/lib/constants";
import type { SocialLink } from "@/lib/sanity/types";

type SiteFooterProps = {
  name: string;
  socialLinks: SocialLink[];
};

export function SiteFooter({ name, socialLinks }: SiteFooterProps) {
  const normalizedLinks = normalizeSocialLinks(socialLinks);

  return (
    <footer className="container-shell pb-10 pt-12">
      {/* 🔥 IMPORTANT: pr-40 + overflow-visible */}
      <div className="relative glass-panel overflow-visible rounded-3xl px-6 py-8 pr-40 sm:px-8">

        {/* 🔥 FLOATING LOGO */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden lg:block -translate-y-1/2">
          <div className="relative h-36 w-36">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-[#F25C29]/25 blur-3xl" />

            {/* Logo */}
            <Image
              src="/Favicon.png"
              alt="Manaazir Rayyaan Logo"
              width={140}
              height={140}
              className="relative z-10 object-contain drop-shadow-[0_10px_40px_rgba(242,92,41,0.35)]"
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-10">
            <div>
              <p className="text-(--muted) text-sm uppercase tracking-[0.28em]">
                Freelance Web Development
              </p>

              <h2 className="mt-3 text-2xl font-semibold">{name}</h2>

              <p className="text-(--muted) mt-2 max-w-xl text-sm">
                I help businesses plan, build, and launch reliable web applications using Django, React,
                and clean scalable architecture.
              </p>

              <div className="text-(--muted) mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
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
          </div>

          {/* RIGHT SOCIAL LINKS */}
          <div className="flex flex-wrap gap-3">
            {normalizedLinks.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-(--border) text-(--muted) hover:text-(--foreground) rounded-full border px-4 py-2 text-sm transition-colors"
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