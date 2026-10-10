import type { Metadata } from "next";
import CaseStudiesIndex from "../components/CaseStudiesIndex";
import FeaturedCaseStudy from "../components/FeaturedCaseStudy";
import WebsiteBento from "../components/WebsiteBento";
import CustomBento from "../components/CustomBento";
import IotBento from "../components/IotBento";
import VisualsNote from "../components/VisualsNote";
import FinalCTA from "../components/FinalCTA";
import { isPublishable, listedCaseStudies, overviewOrder, sectionFor } from "../lib/case-studies";

/* Case Studies overview (vrattiks-architecture §1 #06, /case-studies),
   redesigned 2026-10-10 in rounded-bento cards after a reference the user
   supplied (layout language only — no colours, text, icons, photos or
   numbers taken from it).

   Order: index opener → featured project (the first publishable one) →
   Website / Custom / IoT, each a DIFFERENT bento (tower + ledge, mirrored
   slabs, tall columns) → the illustrative-visuals note → FinalCTA, the
   page's one gradient moment (vrattiks-design-system §3).

   §2 asks for listing → client/industry → challenge → solution →
   implementation → results → CTA. Each card carries client, summary,
   features and stack; challenge/solution/results live on detail pages and
   appear only once confirmed (vrattiks-standards §3). A card links to
   /case-studies/{slug} only when that page is publishable.

   All data, copy and counts come from app/lib/case-studies.ts. Sample
   entries (isSample) render only outside production — see IotBento. */

const description =
  "Custom AI automation, IoT and website projects by Vrattiks Intelligence — what each one does and how it was built.";

export const metadata: Metadata = {
  title: "Case Studies",
  description,
  alternates: {
    canonical: "/case-studies",
  },
  /* Next merges metadata shallowly, so this openGraph object REPLACES the
     root app/opengraph-image.png — the existing brand card is re-attached
     here explicitly (vrattiks-seo: og:image + summary_large_image). */
  openGraph: {
    title: "Case Studies | Vrattiks Intelligence",
    description,
    url: "/case-studies",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Vrattiks Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Vrattiks Intelligence",
    description,
    images: ["/opengraph-image.png"],
  },
};

/* Names and anchors only — no clients, ratings or results (vrattiks-seo
   "Structured data", vrattiks-standards §3). REAL projects only:
   listedCaseStudies excludes drafts and samples, so the IoT sample never
   reaches structured data in any build. */
const caseStudiesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vrattiks Intelligence case studies",
  url: "/case-studies",
  itemListElement: listedCaseStudies.map((study, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: study.title,
    url: isPublishable(study) ? `/case-studies/${study.slug}` : `/case-studies#${study.slug}`,
  })),
};

const bentos = {
  website: WebsiteBento,
  custom: CustomBento,
  iot: IotBento,
} as const;

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesJsonLd) }}
      />
      <CaseStudiesIndex />
      <FeaturedCaseStudy />
      {overviewOrder.map((cat, i) => {
        const s = sectionFor(cat);
        const Bento = bentos[cat];
        return (
          <Bento
            key={s.id}
            id={s.id}
            eyebrow={`${String(i + 1).padStart(2, "0")} · ${s.label}`}
            title={s.title}
            description={s.description}
          />
        );
      })}
      <VisualsNote />
      <FinalCTA
        title="Have a project like these in mind?"
        description="Tell us what you want built, and we'll walk you through how we'd approach it."
      />
    </>
  );
}
