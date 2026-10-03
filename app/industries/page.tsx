import type { Metadata } from "next";
import IndustriesIntro from "../components/IndustriesIntro";
import Industries from "../components/Industries";
import UseCases from "../components/UseCases";
import FinalCTA from "../components/FinalCTA";
import { industries } from "../lib/content";

/* Section order follows vrattiks-architecture §2 (Industries):
   Industry overview → industry cards → Industry-specific CTA.
   UseCases is added between the cards and the CTA for two reasons: it is the
   page's one non-white band (CLAUDE.md Design Taste), and it shows the same
   problems recur in every industry. (/use-cases was removed 2026-10-03.)

   ⚠ The directory lists the eleven industries in content.ts, not the six in
   vrattiks-architecture §1 (E-commerce removed and seven added at the user's
   request, 2026-09-22 / 09-28). The SSOT has not been updated to match. */

const description =
  "AI and automation for real estate, healthcare, finance, manufacturing, hospitality, education, restaurants, salons, automobile and construction businesses.";

export const metadata: Metadata = {
  title: "Industries",
  description,
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries | Vrattiks Intelligence",
    description,
    url: "/industries",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Industries | Vrattiks Intelligence",
    description,
  },
};

/* Grounded in content.ts only — industry names and links, no clients,
   ratings or results (vrattiks-seo, vrattiks-standards §3). */
const industriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Industries served by Vrattiks Intelligence",
  url: "/industries",
  itemListElement: industries.map((industry, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: industry.name,
    url: `/industries/${industry.slug}`,
  })),
};

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industriesJsonLd) }}
      />
      <IndustriesIntro />
      <Industries
        headingId="industries-list-heading"
        eyebrow="All industries"
        title="Find your industry"
        description="Pick yours to see the problems we solve there and the services that fit."
      />
      <UseCases
        headingId="use-cases-heading"
        title="The same three problems, in every industry"
        description="Whatever you sell, these are the places customers usually slip through — and what changes once they're automated."
      />
      <FinalCTA
        title="Don't see your industry here?"
        description="Most businesses lose customers in the same few places. Tell us how yours runs and we'll show you what to automate first."
        buttonLabel="Talk to us about your industry"
      />
    </>
  );
}
