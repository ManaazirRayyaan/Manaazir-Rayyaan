import type { SocialLink } from "@/lib/sanity/types";

export const SOCIAL_LINKS = {
  github: "https://github.com/ManaazirRayyaan",
  linkedin: "https://www.linkedin.com/in/manaazir-rayyaan-0311b5361/",
  instagram: "https://www.instagram.com/rayyaanmanaazirpro/",
} as const;

const SOCIAL_LINK_LABEL_MAP: Record<string, string> = {
  github: SOCIAL_LINKS.github,
  linkedin: SOCIAL_LINKS.linkedin,
  instagram: SOCIAL_LINKS.instagram,
};

function isPlaceholderUrl(url: string) {
  const normalized = url.trim().toLowerCase();
  return normalized === "" || normalized === "#" || normalized === "/#" || normalized === "https://github.com/" || normalized === "https://instagram.com/";
}

export function normalizeSocialLink(link: SocialLink): SocialLink {
  const labelKey = link.label.trim().toLowerCase();
  const mappedUrl = SOCIAL_LINK_LABEL_MAP[labelKey];

  if (!mappedUrl) {
    return link;
  }

  return {
    ...link,
    url: isPlaceholderUrl(link.url) ? mappedUrl : mappedUrl,
  };
}

export function normalizeSocialLinks(links: SocialLink[]) {
  return links.map(normalizeSocialLink);
}

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: SOCIAL_LINKS.github },
  { label: "LinkedIn", url: SOCIAL_LINKS.linkedin },
  { label: "Instagram", url: SOCIAL_LINKS.instagram },
];
