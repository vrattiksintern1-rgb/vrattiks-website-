import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceHero from "../../components/ServiceHero";
import ServiceProblems from "../../components/ServiceProblems";
import ServiceSteps from "../../components/ServiceSteps";
import ServiceFeatures from "../../components/ServiceFeatures";
import ServiceBenefits from "../../components/ServiceBenefits";
import ServiceFit from "../../components/ServiceFit";
import RelatedServices from "../../components/RelatedServices";
import FinalCTA from "../../components/FinalCTA";
import { industries, services, useCases } from "../../lib/content";
import { serviceDetails } from "../../lib/service-details";

/* Service detail template (vrattiks-architecture §2): Hero → Problem → How it
   works → Key features → Benefits → Who it's for → Related services → CTA.
   All six pages come from this one route, driven by content.ts +
   service-details.ts. */

type Params = Promise<{ slug: string }>;

/* Only the six slugs in content.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function getService(slug: string) {
  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();
  return { service, detail };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const { service, detail } = getService(slug);
  const description = `${service.description} ${detail.headline}`;
  const url = `/services/${service.slug}`;

  return {
    title: service.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.name} | Vrattiks Intelligence`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${service.name} | Vrattiks Intelligence`,
      description,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { service, detail } = getService(slug);

  const fitIndustries = industries.filter((i) => detail.industries.includes(i.slug));
  const fitUseCases = useCases.filter((u) => detail.useCases.includes(u.slug));
  const related = detail.related
    .map((s) => services.find((x) => x.slug === s))
    .filter((s) => s !== undefined);

  /* Grounded in the page's own copy only — no offers, pricing, ratings or
     areaServed claims (vrattiks-seo, vrattiks-standards §3). */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.details,
      url: `/services/${service.slug}`,
      provider: { "@type": "Organization", name: "Vrattiks Intelligence" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Services", item: "/services" },
        { "@type": "ListItem", position: 2, name: service.name, item: `/services/${service.slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceHero service={service} headline={detail.headline} />
      <ServiceProblems serviceName={service.name} problems={detail.problems} />
      <ServiceSteps steps={detail.steps} />
      <ServiceFeatures features={detail.features} />
      <ServiceBenefits benefits={detail.benefits} />
      <ServiceFit industries={fitIndustries} useCases={fitUseCases} />
      <RelatedServices services={related} />
      <FinalCTA
        title={`Talk to us about ${service.name}`}
        description="Book a free consultation. We'll look at how you work today and show you where this fits."
      />
    </>
  );
}
