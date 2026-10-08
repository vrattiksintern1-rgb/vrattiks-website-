import type { Metadata } from "next";
import CaseStudiesIntro from "../components/CaseStudiesIntro";
import CaseStudiesNav from "../components/CaseStudiesNav";
import CustomProjects from "../components/CustomProjects";
import IotProjects from "../components/IotProjects";
import WebsiteProjects from "../components/WebsiteProjects";
import FinalCTA from "../components/FinalCTA";
import { caseStudies, caseStudySections, countLabel } from "../lib/case-studies";

/* Case Studies listing (vrattiks-architecture §1 #06, /case-studies).
   §2 asks for: listing → client/industry → challenge → solution →
   implementation → results → CTA. Those are the FIELDS of every entry in
   app/lib/case-studies.ts, rendered per project wherever confirmed content
   exists; the listing itself is split into the three sections the user asked
   for (2026-10-08). /case-studies/[slug] detail pages are not built yet —
   each project is an anchor on this page (/case-studies#{slug}).

   Surfaces alternate for rhythm (CLAUDE.md Design Taste): paper intro →
   white editorial rows → graphite spec sheets → tint gallery with one glow →
   the gradient FinalCTA, the page's one primary. */

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

/* Names and anchors only — no clients, ratings or results, since none are
   confirmed (vrattiks-seo "Structured data", vrattiks-standards §3). Sample
   entries are illustrative, so they are never listed here. */
const caseStudiesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vrattiks Intelligence case studies",
  url: "/case-studies",
  itemListElement: caseStudies.filter((study) => !study.sample).map((study, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: study.title,
    url: `/case-studies#${study.slug}`,
  })),
};

const sectionComponents = {
  custom: CustomProjects,
  iot: IotProjects,
  website: WebsiteProjects,
} as const;

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesJsonLd) }}
      />
      <CaseStudiesIntro />
      {/* One wrapper around the chapter bar and the three sections: sticky
          is bounded by its parent, so the bar stays pinned exactly while
          the reader is inside a section and releases before the CTA. */}
      <div>
        <CaseStudiesNav
          items={caseStudySections.map((s) => ({
            id: s.id,
            index: s.index,
            label: s.label,
            shortLabel: s.shortLabel,
            meta: countLabel(s.category),
          }))}
        />
        {caseStudySections.map((s) => {
          const Component = sectionComponents[s.category];
          return (
            <Component
              key={s.id}
              id={s.id}
              index={s.index}
              label={s.label}
              title={s.title}
              description={s.description}
            />
          );
        })}
      </div>
      <FinalCTA
        title="Have a project like these in mind?"
        description="Tell us what you want built, and we'll walk you through how we'd approach it."
      />
    </>
  );
}
