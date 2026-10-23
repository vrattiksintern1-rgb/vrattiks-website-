import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

/* Every page on the site is public. /_next/ is not disallowed on purpose:
   crawlers need its CSS, JS and images to render pages. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
