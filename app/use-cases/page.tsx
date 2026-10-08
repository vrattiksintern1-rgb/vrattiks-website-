import type { Metadata } from "next";
import UseCasesIntro from "../components/UseCasesIntro";
import UseCaseBreakdown from "../components/UseCaseBreakdown";
import UseCaseJourney from "../components/UseCaseJourney";
import FinalCTA from "../components/FinalCTA";
import { useCases } from "../lib/content";

/* Section order follows vrattiks-architecture §2 (Use Cases):
   Use-case overview + 3 use-case cards (UseCasesIntro) → Problem → Solution →
   Benefit (UseCaseBreakdown) → CTA. UseCaseJourney sits before the CTA as the
   page's one non-white band (CLAUDE.md Design Taste).

   The cards link to in-page anchors (#slug on each breakdown article) because
   the /use-cases/{slug} detail pages aren't built yet. */

const description =
  "Automate lead follow-up, customer support and business reporting. See the problem each one solves, what we automate and what changes for your business.";

export const metadata: Metadata = {
  title: "Use Cases",
  description,
  alternates: {
    canonical: "/use-cases",
  },
  openGraph: {
    title: "Use Cases | Vrattiks Intelligence",
    description,
    url: "/use-cases",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Use Cases | Vrattiks Intelligence",
    description,
  },
};

/* Grounded in content.ts only — use-case names and solutions, no clients,
   ratings or results (vrattiks-seo, vrattiks-standards §3). */
const useCasesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Business automation use cases from Vrattiks Intelligence",
  url: "/use-cases",
  itemListElement: useCases.map((useCase, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: useCase.name,
    description: useCase.solution,
    url: `/use-cases#${useCase.slug}`,
  })),
};

export default function UseCasesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(useCasesJsonLd) }}
      />
      <UseCasesIntro />
      <UseCaseBreakdown />
      <UseCaseJourney />
      <FinalCTA
        title="Not sure which one to start with?"
        description="Tell us where customers or time slip through in your business, and we'll show you what to automate first."
        buttonLabel="Book a Free Consultation"
      />
    </>
  );
}
