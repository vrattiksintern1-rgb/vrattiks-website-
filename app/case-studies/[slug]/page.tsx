import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CustomCaseStudy from "../../components/CustomCaseStudy";
import IotCaseStudy from "../../components/IotCaseStudy";
import WebsiteCaseStudy from "../../components/WebsiteCaseStudy";
import FinalCTA from "../../components/FinalCTA";
import { caseStudies, getCaseStudy, pageDrafts, type CaseStudy } from "../../lib/case-studies";

/* Case study detail (vrattiks-architecture §1 #06, /case-studies/[slug]).
   One route, three layouts — one per category, each following its guide in
   docs/case-study-guides/ and the section order in the user brief of
   2026-10-12. Every entry in app/lib/case-studies.ts gets a page; adding an
   entry there needs no component change.

   Safeguards are computed from the data (pageDrafts): while the page
   renders any placeholder block it is noindex/nofollow and carries no
   JSON-LD (visible Draft chip removed at the user's request, 2026-10-12). Replace the last placeholder block and both lift by
   themselves. Nothing here
   depends on the environment — production renders the same page. */

type Params = Promise<{ slug: string }>;

/* Only slugs with an entry exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

function load(slug: string): CaseStudy {
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return study;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = load(slug);
  const isDraft = pageDrafts(study) > 0;

  /* vrattiks-seo: unique title (≤35 chars before the root template),
     one-sentence description, canonical = the route. `seo` holds verified
     facts only, so metadata never repeats placeholder copy. */
  const { title, description } = study.seo;
  const url = `/case-studies/${study.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(isDraft ? { robots: { index: false, follow: false } } : {}),
    /* Shallow metadata merge drops the root OG image, so it is re-attached
       explicitly (memory.md 2026-10-08). */
    openGraph: {
      title: `${title} | Vrattiks Intelligence`,
      description,
      url,
      type: "article",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: `${study.title}: a Vrattiks case study for ${study.clientName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Vrattiks Intelligence`,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = load(slug);
  const isDraft = pageDrafts(study) > 0;

  /* Verified pages only, visible facts only: breadcrumb + Article. No
     Review/AggregateRating, no dates we don't have (vrattiks-seo, guides
     §7). Placeholder pages carry no structured data. */
  const jsonLd = isDraft
    ? null
    : [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Case Studies", item: "/case-studies" },
            { "@type": "ListItem", position: 2, name: study.title, item: `/case-studies/${study.slug}` },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${study.title} case study`,
          about: { "@type": "Organization", name: study.clientName },
          author: { "@type": "Organization", name: "Vrattiks Intelligence" },
          publisher: { "@type": "Organization", name: "Vrattiks Intelligence" },
          url: `/case-studies/${study.slug}`,
        },
      ];

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      {study.category === "website" ? (
        <WebsiteCaseStudy study={study} />
      ) : study.category === "custom" ? (
        <CustomCaseStudy study={study} />
      ) : (
        <IotCaseStudy study={study} />
      )}
      {/* The page's one gradient surface; copy comes from the entry. */}
      <FinalCTA title={study.cta.title} description={study.cta.description} />
    </>
  );
}
