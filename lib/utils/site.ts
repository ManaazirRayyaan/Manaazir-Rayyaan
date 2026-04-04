import type { Metadata } from "next";
import type { Project, SiteSettings } from "@/lib/sanity/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type SeoSource = {
  seo?: {
    title?: string;
    description?: string;
    noIndex?: boolean;
    ogImage?: string;
  };
  title?: string;
  subtitle?: string;
};

export function buildMetadata(source: SeoSource, settings?: SiteSettings, pathname = "/"): Metadata {
  const baseTitle = settings?.name ?? "Portfolio";
  const title = source.seo?.title ?? source.title ?? baseTitle;
  const description =
    source.seo?.description ??
    source.subtitle ??
    settings?.shortIntroduction ??
    "Portfolio website built with Next.js and Sanity CMS.";
  const canonicalUrl = new URL(pathname, siteUrl).toString();
  const image = source.seo?.ogImage ?? settings?.defaultOgImage;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: baseTitle,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: source.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export function buildProjectMetadata(project: Project, settings?: SiteSettings): Metadata {
  const title = project?.title ? `${project.title} | Manaazir Rayyaan` : "Manaazir Rayyaan | Project";
  const description =
    project?.seo?.description ??
    project?.result ??
    project?.solution ??
    settings?.shortIntroduction ??
    "Project case study by Manaazir Rayyaan.";

  return {
    ...buildMetadata(
      {
        ...project,
        seo: {
          ...project?.seo,
          title,
          description,
        },
      },
      settings,
      `/projects/${project.slug}`,
    ),
    title,
    description,
  };
}
