import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyNotice from "../../components/CaseStudyNotice";
import CustomCaseStudy from "../../components/CustomCaseStudy";
import IotCaseStudy from "../../components/IotCaseStudy";
import WebsiteCaseStudy from "../../components/WebsiteCaseStudy";
import FinalCTA from "../../components/FinalCTA";
import {
  clientNameOf,
  detailCaseStudies,
  getCaseStudy,
  isPublishable,
  withClient,
  type CaseStudy,
} from "../../lib/case-studies";

/* Case study detail (vrattiks-architecture §1 #06, /case-studies/[slug]).
   One route, three layouts — one per category, each following its guide in
   docs/case-study-guides/. Every entry with a `detail` object in
   app/lib/case-studies.ts gets a page; adding an entry there needs no
   component change.

   Publishing rule (decision 2026-10-10, memory.md): a page is indexed, has
   JSON-LD and is linked from /case-studies only when isPublishable() —
   not a draft AND the client name is confirmed. Everything else (the IoT
   template, the AI Sales Assistant while its client is "[Client Name]") is
   reachable by URL but noindex, unlinked and visibly labelled
   (CaseStudyNotice). */

type Params = Promise<{ slug: string }>;

/* Only slugs with a detail entry exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return detailCaseStudies.map((s) => ({ slug: s.slug }));
}

function load(slug: string): CaseStudy {
  const study = getCaseStudy(slug);
  if (!study?.detail) notFound();
  return study;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = load(slug);
  const detail = study.detail!;
  const client = clientNameOf(study);
  const publishable = isPublishable(study);

  /* vrattiks-seo: unique title (≤35 chars before the root template),
     one-sentence description, canonical = the route. The client name comes
     from the one clientName field via withClient(). */
  const title = detail.seo?.title ?? `${study.title} case study`;
  const description = withClient(detail.seo?.description ?? detail.lede ?? study.summary, study);
  const url = `/case-studies/${study.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(publishable ? {} : { robots: { index: false, follow: false } }),
    /* Shallow metadata merge drops the root OG image, so it is re-attached
       explicitly (memory.md 2026-10-08). The alt names the client. */
    openGraph: {
      title: `${title} | Vrattiks Intelligence`,
      description,
      url,
      type: "article",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: `${study.title}: a Vrattiks case study for ${client}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Vrattiks Intelligence`,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

/* Closing ask per category (vrattiks-architecture §4: always /contact).
   Generated copy, no claims (vrattiks-standards §3 bucket 4). */
const closing = {
  website: {
    title: "Planning a website that brings in enquiries?",
    description: "Tell us who it's for and what it needs to do. We'll show you how we'd build it.",
  },
  custom: {
    title: "Have a manual job you'd like automated?",
    description: "Tell us how it's done today. We'll show you what we'd automate first.",
  },
  iot: {
    title: "Have equipment you need to keep an eye on?",
    description: "Tell us what you want to monitor. We'll explain how we'd connect it.",
  },
} as const;

export default async function CaseStudyDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = load(slug);
  const publishable = isPublishable(study);

  /* Published pages only, visible facts only: breadcrumb + Article. No
     Review/AggregateRating, no dates we don't have (vrattiks-seo,
     iot/website/custom guides §7). Drafts carry no structured data. */
  const jsonLd = publishable
    ? [
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
          about: { "@type": "Organization", name: clientNameOf(study) },
          author: { "@type": "Organization", name: "Vrattiks Intelligence" },
          publisher: { "@type": "Organization", name: "Vrattiks Intelligence" },
          ...(study.detail?.updatedOn ? { dateModified: study.detail.updatedOn } : {}),
          url: `/case-studies/${study.slug}`,
        },
      ]
    : null;

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <CaseStudyNotice study={study} />
      {study.category === "website" && study.detail ? (
        <WebsiteCaseStudy study={study} detail={study.detail} />
      ) : study.category === "custom" && study.detail ? (
        <CustomCaseStudy study={study} detail={study.detail} />
      ) : study.category === "iot" && study.detail ? (
        <IotCaseStudy study={study} detail={study.detail} />
      ) : null}
      <FinalCTA {...closing[study.category]} />
    </>
  );
}
