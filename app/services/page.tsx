import type { Metadata } from "next";
import ServicesIntro from "../components/ServicesIntro";
import ServicesOverview from "../components/ServicesOverview";
import Process from "../components/Process";
import FinalCTA from "../components/FinalCTA";
import { services } from "../lib/content";

/* Section order follows vrattiks-architecture §2 (Services):
   Services overview → 6 service cards → Process → CTA. */

const description =
  "AI voice agents, chatbots, workflow automation, websites, WhatsApp automation and CRM for growing businesses. Use one service on its own or connect them into one system.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Vrattiks Intelligence",
    description,
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Services | Vrattiks Intelligence",
    description,
  },
};

/* Grounded in content.ts only — names and one-line descriptions, no pricing,
   ratings or results (vrattiks-seo, vrattiks-standards §3). */
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vrattiks Intelligence services",
  url: "/services",
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: service.name,
      description: service.description,
      url: `/services/${service.slug}`,
      provider: { "@type": "Organization", name: "Vrattiks Intelligence" },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <ServicesIntro />
      <ServicesOverview showAllLink={false} headingId="services-list-heading" />
      <Process headingId="process-heading" />
      <FinalCTA />
    </>
  );
}
