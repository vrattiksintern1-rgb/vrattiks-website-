import type { Metadata } from "next";
import Hero from "./components/Hero";
import KpiResults from "./components/KpiResults";
import WhyBusinessesNeedAI from "./components/WhyBusinessesNeedAI";
import WhyVrattiks from "./components/WhyVrattiks";
import ServicesOverview from "./components/ServicesOverview";
import UseCases from "./components/UseCases";
import Industries from "./components/Industries";
import CaseStudies from "./components/CaseStudies";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Vrattiks Intelligence — AI Automation for Growing Businesses",
  },
  description:
    "Vrattiks builds AI voice agents, chatbots, workflow automation, websites, WhatsApp automation, and CRM systems for growing businesses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vrattiks Intelligence — AI Automation for Growing Businesses",
    description:
      "AI voice agents, chatbots, workflow automation, websites, WhatsApp automation, and CRM systems for growing businesses.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Vrattiks Intelligence — AI Automation for Growing Businesses",
    description:
      "AI voice agents, chatbots, workflow automation, websites, WhatsApp automation, and CRM systems for growing businesses.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vrattiks Intelligence",
  legalName: "Vrattiks Intelligence LLP",
  description:
    "Vrattiks builds AI voice agents, chatbots, workflow automation, websites, WhatsApp automation, and CRM systems for growing businesses.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <KpiResults />
      <WhyBusinessesNeedAI />
      <WhyVrattiks />
      <ServicesOverview />
      <UseCases />
      <Industries />
      <CaseStudies />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
