import type { MetadataRoute } from "next";
import { industries, services } from "./lib/content";
import { SITE_URL } from "./lib/site";

/* Every public, indexable route. Detail pages come from the same arrays their
   generateStaticParams() use, so a new service or industry in content.ts is
   listed here automatically.
   Deliberately absent: /use-cases/{slug} (not built yet, cards link to
   in-page anchors), case studies (removed in 073c9af), 404, and
   framework/asset routes. Add a route here when it ships. */

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  /* The sitemap is generated at build time, so this is the deploy date: the
     last moment page content could have changed. */
  const lastModified = new Date();

  const page = (
    path: string,
    changeFrequency: Entry["changeFrequency"],
    priority: number,
  ): Entry => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", "weekly", 1),

    page("/services", "monthly", 0.9),
    page("/industries", "monthly", 0.9),
    page("/use-cases", "monthly", 0.8),
    page("/company", "monthly", 0.8),
    page("/contact", "yearly", 0.8),

    ...services.map((s) => page(`/services/${s.slug}`, "monthly", 0.7)),
    ...industries.map((i) => page(`/industries/${i.slug}`, "monthly", 0.6)),

    page("/privacy-policy", "yearly", 0.3),
  ];
}
