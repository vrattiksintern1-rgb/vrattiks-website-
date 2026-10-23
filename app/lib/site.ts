/* Absolute origin for sitemap.xml and robots.txt. Set NEXT_PUBLIC_SITE_URL per
   environment (see .env.example); falls back to the production domain.
   Trailing slashes are stripped so paths can be appended as `${SITE_URL}/x`. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vrattiks.io").replace(/\/+$/, "");

/* Default social preview (app/opengraph-image.png). Metadata merges shallowly,
   so a page that sets its own openGraph/twitter drops the root image; every
   page spreads this into both. The URL resolves against metadataBase. */
export const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Vrattiks logo on a dark background",
  type: "image/png",
};
