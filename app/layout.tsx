import type { Metadata } from "next";
import { Urbanist, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  // Only 600/700 are used in the markup — each extra weight is another woff2.
  weight: ["600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400"],
});

/**
 * Next 16 errors on a relative URL in any URL-based metadata field unless
 * `metadataBase` is set (node_modules/next/dist/docs/01-app/03-api-reference/
 * 04-functions/generate-metadata.md), and crawlers need absolute og:image URLs
 * regardless. The production domain is still unconfirmed, so rather than
 * inventing one this reads NEXT_PUBLIC_SITE_URL and falls back to localhost.
 *
 * ⚠ Set NEXT_PUBLIC_SITE_URL before the first production deploy, or every
 * canonical and OG URL will point at localhost.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vrattiks Intelligence",
    template: "%s | Vrattiks Intelligence",
  },
  description: "AI automation solutions for growing businesses",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="focus-glow sr-only rounded-sm bg-n-0 px-4 py-2 text-ui font-semibold text-brand-secondary focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
