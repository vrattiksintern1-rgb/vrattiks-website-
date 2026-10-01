import type { Metadata } from "next";
import ContactHero from "../components/ContactHero";
import ContactConsultation from "../components/ContactConsultation";
import ContactBusinessInfo from "../components/ContactBusinessInfo";
import { contactDetails } from "../lib/content";

/* vrattiks-architecture §2 (Contact): Contact details → Inquiry form →
   Consultation CTA → Email/phone → Relevant business information.
   - Contact details, email/phone and the form share the hero, so a visitor
     can start the form without scrolling.
   - The consultation CTA is the dark band; its button jumps back to #inquiry.
   - No FinalCTA: every page ends in one primary CTA pointing at /contact
     (§4), and on this page that CTA is the form's submit button. A FinalCTA
     here would link the page to itself. */

const description =
  "Get in touch with Vrattiks Intelligence. Tell us how your business runs today and book a free consultation on AI voice agents, chatbots and workflow automation.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Vrattiks Intelligence",
    description,
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Vrattiks Intelligence",
    description,
  },
};

/* Only confirmed or filled-in values: null placeholders in contactDetails
   are left out rather than guessed (vrattiks-seo, structured data). */
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Vrattiks Intelligence",
  url: "/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Vrattiks Intelligence",
    legalName: "Vrattiks Intelligence LLP",
    ...(contactDetails.email ? { email: contactDetails.email } : {}),
    ...(contactDetails.phone ? { telephone: contactDetails.phone } : {}),
    ...(contactDetails.location ? { address: contactDetails.location } : {}),
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactHero />
      <ContactConsultation />
      <ContactBusinessInfo />
    </>
  );
}
