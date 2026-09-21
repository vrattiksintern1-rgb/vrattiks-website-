import type { Metadata } from "next";
import { siteUrl } from "./layout";
import Hero from "./components/Hero";
import KpiResults from "./components/KpiResults";
import WhyBusinessesNeedAI from "./components/WhyBusinessesNeedAI";
import WhyVrattiks from "./components/WhyVrattiks";
import ServicesOverview from "./components/ServicesOverview";
import UseCases from "./components/UseCases";
import Industries from "./components/Industries";
// Hidden until real, verified content exists — an empty "coming soon" placeholder
// costs more credibility than the missing section does (vrattiks-standards §3).
// import CaseStudies from "./components/CaseStudies";
import Process from "./components/Process";
// import Testimonials from "./components/Testimonials";
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
    siteName: "Vrattiks Intelligence",
    locale: "en_IN",
    /* Reusing the real brand mark — the only image asset that exists in
       public/. ⚠ It is 413x126, not a 1200x630 social card, so link previews
       will letterbox it. Replace with a purpose-made OG card and switch the
       Twitter card below to "summary_large_image" when one exists. */
    images: [
      {
        url: "/brand/vrattiks-logo.png",
        width: 413,
        height: 126,
        alt: "Vrattiks Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/brand/vrattiks-logo.png"],
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
  url: siteUrl,
  logo: `${siteUrl}/brand/vrattiks-logo.png`,
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
      {/* <CaseStudies /> — re-enable once at least one engagement is published */}
      <Process />
      {/* <Testimonials /> — re-enable once a verified client quote exists */}
      <FAQ />
      <FinalCTA />
    </>
  );
}
