import type { Metadata } from "next";
import CompanyIntro from "../components/CompanyIntro";
import OurStory from "../components/OurStory";
import MissionVision from "../components/MissionVision";
import CompanyValues from "../components/CompanyValues";
import Founders from "../components/Founders";
import WhyVrattiks from "../components/WhyVrattiks";
import FinalCTA from "../components/FinalCTA";

/* Section order follows vrattiks-architecture §2 (Company / About Us):
   Introduction → Our story → Mission & Vision → Values/approach →
   Co-Founders → Why Vrattiks → CTA. */

const description =
  "Vrattiks Intelligence builds AI voice agents, chatbots and workflow automation for growing businesses. Read our story, our approach and meet the co-founders.";

export const metadata: Metadata = {
  title: "Company",
  description,
  alternates: {
    canonical: "/company",
  },
  openGraph: {
    title: "About Vrattiks Intelligence",
    description,
    url: "/company",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Vrattiks Intelligence",
    description,
  },
};

/* Founder names are user-provided (vrattiks-standards §3) and pending client
   sign-off — keep this in step with Founders.tsx. */
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Vrattiks Intelligence",
  url: "/company",
  mainEntity: {
    "@type": "Organization",
    name: "Vrattiks Intelligence",
    legalName: "Vrattiks Intelligence LLP",
    founder: [
      { "@type": "Person", name: "Hitesh Dave" },
      { "@type": "Person", name: "Arpit Patel" },
    ],
  },
};

export default function CompanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <CompanyIntro />
      <OurStory />
      <MissionVision />
      <CompanyValues />
      <Founders />
      <WhyVrattiks cta={{ label: "Explore our services", href: "/services" }} />
      <FinalCTA />
    </>
  );
}
