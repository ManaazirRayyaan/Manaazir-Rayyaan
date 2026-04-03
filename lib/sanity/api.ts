import { normalizeSocialLinks } from "@/lib/constants";
import { allProjectsQuery, featuredProjectsQuery, pageByTypeQuery, projectBySlugQuery, settingsQuery } from "@/lib/sanity/queries";
import { fallbackPages, fallbackProjects, fallbackSettings } from "@/lib/sanity/fallback-data";
import { sanityFetch } from "@/lib/sanity/client";
import type { PageContent, Project, SiteSettings } from "@/lib/sanity/types";

export async function getSiteSettings() {
  const settings = await sanityFetch<SiteSettings>({
    query: settingsQuery,
    fallback: fallbackSettings,
  });

  return {
    ...settings,
    socialLinks: normalizeSocialLinks(settings.socialLinks ?? fallbackSettings.socialLinks),
  };
}

export async function getPageContent(pageType: PageContent["pageType"]) {
  const page = await sanityFetch<PageContent>({
    query: pageByTypeQuery,
    params: { pageType },
    fallback: fallbackPages[pageType],
  });

  return page.socialLinks?.length
    ? {
        ...page,
        socialLinks: normalizeSocialLinks(page.socialLinks),
      }
    : page;
}

export async function getFeaturedProjects() {
  return sanityFetch<Project[]>({
    query: featuredProjectsQuery,
    fallback: fallbackProjects.filter((project) => project.featured),
  });
}

export async function getAllProjects() {
  return sanityFetch<Project[]>({
    query: allProjectsQuery,
    fallback: fallbackProjects,
  });
}

export async function getProjectBySlug(slug: string) {
  return sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    fallback: fallbackProjects.find((project) => project.slug === slug) ?? null,
  });
}
