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

/* vrattiks-seo, "Checklist per page" — every item is satisfied below:
   unique title; one accurate description sentence (no keyword stuffing, voice
   per vrattiks-design-system §5); canonical set to `/`, which is Home's route
   in vrattiks-architecture §1; OG title/description/url/image; a Twitter card.
   Headings are handled in the components (one <h1> in Hero, <h2> per Section).

   The `Organization` JSON-LD below is the skill's "structured data only where
   factually grounded" rule: name, legalName, url, logo and description only.
   No AggregateRating, no review count, no employee or client numbers — none of
   those are verified, and vrattiks-seo's hard rule forbids inventing them to
   fill a field out. */
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
    /* The card itself is `app/opengraph-image.png`, which Next's file
       convention turns into the static route referenced below.

       It is declared EXPLICITLY here rather than left to the convention
       because `app/opengraph-image.alt.txt` is silently ignored when a page
       also exports its own `openGraph` object — verified on Next 16.3.4 with a
       clean `.next`: og:image/type/width/height were all emitted, og:image:alt
       never was. Declaring `images` here emits exactly one og:image tag (no
       duplicate with the convention) AND carries the alt text.

       Trade-off accepted: the convention's content-hash query string is lost,
       so this is a stable URL. If the card art ever changes, social platforms
       must be asked to re-scrape (or the filename bumped) or they will serve
       the cached old card. */
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "The Vrattiks Intelligence logo, white on a dark graphite background.",
      },
    ],
  },
  twitter: {
    /* Was "summary" only because no 1200x630 asset existed. It does now, and
       X falls back to og:image when twitter:image is absent, so the card and
       its alt text are shared rather than duplicated as a second file. */
    card: "summary_large_image",
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
