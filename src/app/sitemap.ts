import type { MetadataRoute } from "next";
import { projects } from "@/content/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/projects`, priority: 0.8 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      priority: 0.6,
    })),
  ];
}
