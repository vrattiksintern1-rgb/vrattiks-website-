import type { Metadata } from "next";
import { Urbanist, IBM_Plex_Sans } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { themeInitScript } from "./lib/theme";
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

// metadataBase intentionally omitted — no confirmed production domain yet;
// canonical/OG URLs below resolve as relative paths until one is set.
export const metadata: Metadata = {
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