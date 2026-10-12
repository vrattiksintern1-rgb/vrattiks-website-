import type { Metadata } from "next";
import CaseStudiesIndex from "../components/CaseStudiesIndex";
import WebsiteBento from "../components/WebsiteBento";
import CustomBento from "../components/CustomBento";
import IotBento from "../components/IotBento";
import VisualsNote from "../components/VisualsNote";
import FinalCTA from "../components/FinalCTA";
import { overviewHasDrafts, overviewOrder, sectionFor, verifiedCaseStudies } from "../lib/case-studies";

/* Case Studies overview (vrattiks-architecture §1 #06, /case-studies),
   redesigned 2026-10-10 in rounded-bento cards after a reference the user
   supplied (layout language only — no colours, text, icons, photos or
   numbers taken from it).

   Order: index opener → Website / Custom / IoT, each a DIFFERENT bento
   (one large opener tile with floating stat tiles, mirrored slabs, tall
   columns) → the illustrative-visuals note → FinalCTA, the page's one
   gradient moment (vrattiks-design-system §3). Each project appears once,
   in its own category's section.

   §2 asks for listing → client/industry → challenge → solution →
   implementation → results → CTA. Each card carries title, client,
   category, summary, tag chips and status, and links to its detail page,
   where the challenge, solution and stack live (vrattiks-standards §3).

   All data, copy and counts come from app/lib/case-studies.ts. While any
   card shows placeholder text (overviewHasDrafts) this page is noindex; it
   lifts automatically once every card is verified (visible Draft chip removed at the user's request, 2026-10-12). Nothing is gated by environment: production shows the
   same page as development. */

const description =
  "Custom AI automation, IoT and website projects by Vrattiks Intelligence — what each one does and how it was built.";

export const metadata: Metadata = {
  title: "Case Studies",
  description,
  alternates: {
    canonical: "/case-studies",
  },
  /* Computed from the data — lifts by itself once no card is a draft. */
  ...(overviewHasDrafts ? { robots: { index: false, follow: false } } : {}),
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

/* Names and URLs only — no clients, ratings or results (vrattiks-seo
   "Structured data", vrattiks-standards §3). Fully verified entries only:
   no JSON-LD for placeholder entries, and none at all while every entry is
   still a draft (today). */
const caseStudiesJsonLd = verifiedCaseStudies.length
  ? {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Vrattiks Intelligence case studies",
      url: "/case-studies",
      itemListElement: verifiedCaseStudies.map((study, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: study.title,
        url: `/case-studies/${study.slug}`,
      })),
    }
  : null;

const bentos = {
  website: WebsiteBento,
  custom: CustomBento,
  iot: IotBento,
} as const;

export default function CaseStudiesPage() {
  return (
    <>
      {caseStudiesJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesJsonLd) }}
        />
      ) : null}
      <CaseStudiesIndex />
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
