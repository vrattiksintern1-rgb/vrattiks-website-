import type { Metadata } from "next";
import PrivacyPolicy from "../components/PrivacyPolicy";
import { ogImage } from "../lib/site";

/* Legal page, linked from the footer's Legal column. Not part of the
   vrattiks-architecture page list, so no FinalCTA — the page is the policy
   text only (app/lib/privacyPolicy.ts). */

const description =
  "How Vrattiks Intelligence LLP collects, uses, stores, shares and protects personal information across our AI voice agents, chatbots, WhatsApp automation, CRM and website.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Vrattiks Intelligence",
    description,
    url: "/privacy-policy",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
    title: "Privacy Policy | Vrattiks Intelligence",
    description,
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
