import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://manaazirrayyaan.in",
      lastModified: new Date(),
    },
    {
      url: "https://manaazirrayyaan.in/projects",
      lastModified: new Date(),
    },
    {
      url: "https://manaazirrayyaan.in/contact",
      lastModified: new Date(),
    },
  ];
}
