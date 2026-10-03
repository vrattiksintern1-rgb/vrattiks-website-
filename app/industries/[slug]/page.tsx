import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryHero from "../../components/IndustryHero";
import ServiceProblems from "../../components/ServiceProblems";
import ServiceSteps from "../../components/ServiceSteps";
import RelatedServices from "../../components/RelatedServices";
import ServiceFit from "../../components/ServiceFit";
import ServiceBenefits from "../../components/ServiceBenefits";
import FinalCTA from "../../components/FinalCTA";
import { industries, services, useCases } from "../../lib/content";
import { industryDetails } from "../../lib/industry-details";
import { serviceDetails } from "../../lib/service-details";

/* Industry detail template (vrattiks-architecture §2): Hero → Industry
   challenges → Vrattiks solutions → Relevant services → Relevant use cases →
   Benefits → Industry CTA. Reuses the service-detail sections so both
   templates share one look. All eleven pages come from this one route, driven
   by content.ts + industry-details.ts. */

type Params = Promise<{ slug: string }>;

/* Only the slugs in content.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

function getIndustry(slug: string) {
  const industry = industries.find((i) => i.slug === slug);
  const detail = industryDetails[slug];
  if (!industry || !detail) notFound();
  return { industry, detail };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const { industry, detail } = getIndustry(slug);
  const description = `${detail.headline} ${industry.application}`;
  const url = `/industries/${industry.slug}`;

  return {
    title: industry.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${industry.name} | Vrattiks Intelligence`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${industry.name} | Vrattiks Intelligence`,
      description,
    },
  };
}

export default async function IndustryDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { industry, detail } = getIndustry(slug);

  /* Relevant services = the services whose detail copy lists this industry,
     so service and industry pages always cross-link consistently. */
  const fitServices = services.filter((s) => serviceDetails[s.slug]?.industries.includes(industry.slug));
  const fitUseCases = useCases.filter((u) => detail.useCases.includes(u.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Industries", item: "/industries" },
      { "@type": "ListItem", position: 2, name: industry.name, item: `/industries/${industry.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustryHero industry={industry} headline={detail.headline} intro={detail.intro} />
      <ServiceProblems
        serviceName={industry.name}
        problems={detail.challenges}
        description={`The everyday gaps we see in ${industry.name} businesses.`}
      />
      <ServiceSteps
        steps={detail.solutions}
        eyebrow="How we help"
        title={`What we set up for ${industry.name}`}
        itemLabel="Solution"
      />
      <RelatedServices services={fitServices} eyebrow="Relevant services" title="Services that fit" />
      <ServiceFit industries={[]} useCases={fitUseCases} eyebrow="Use cases" title="Problems we solve here" />
      <ServiceBenefits benefits={detail.benefits} />
      <FinalCTA
        title={`Talk to us about ${industry.name}`}
        description="Book a free consultation. We'll look at how your business runs today and show you what to automate first."
      />
    </>
  );
}
