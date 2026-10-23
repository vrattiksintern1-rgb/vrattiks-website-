import type { Metadata } from "next";
import { Urbanist, IBM_Plex_Sans } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { themeInitScript } from "./lib/theme";
import { SITE_URL } from "./lib/site";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600"],
});

// metadataBase resolves every page's relative canonical/OG/Twitter URLs against
// the same origin the sitemap uses (NEXT_PUBLIC_SITE_URL, see app/lib/site.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    // suppressHydrationWarning: the inline script sets data-theme before React
    // hydrates, so <html> legitimately differs from the server render.
    <html lang="en" className={`${urbanist.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="flex min-h-screen flex-col"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}