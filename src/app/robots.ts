import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Allows crawlers full access and points them at the generated sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
