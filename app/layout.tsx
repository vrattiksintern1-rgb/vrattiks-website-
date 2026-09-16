import type { Metadata } from "next";
import { Urbanist, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["500", "600", "700", "800"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
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
    <html lang="en">
      <body
        className={`${urbanist.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} flex min-h-screen flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}