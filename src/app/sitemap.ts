import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * XML sitemap covering the single-page portfolio. Rebuilt on `next build`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Cached so `new Date()` (an unstable value during prerendering) is
  // computed once per build instead of on every static render.
  "use cache";
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
