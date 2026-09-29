import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Section from "./ui/Section";
import { industries } from "@/app/lib/content";

/* The section's one idea: eleven industries is a long scroll, so the intro
   doubles as a jump list into the directory below (each entry there carries
   the industry slug as its id). Desktop only — on phones the directory is
   already a compact thumbnail list, and the jump list would push it a full
   screen down for no gain. */
export default function IndustriesIntro() {
  return (
    <Section tone="white" labelledBy="industries-heading">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-end md:gap-16">
        <div>
          <Eyebrow className="mb-5">Industries</Eyebrow>
          {/* Not wrapped in Reveal: the page's H1 should be readable the
              instant it paints (kylezantos-design §1b). */}
          <h1
            id="industries-heading"
            className="max-w-[16ch] text-[36px] leading-[1.1] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[52px]"
          >
            Automation shaped around your industry
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-n-600">
            A clinic, a dealership and a coaching institute lose customers in
            different places. We start with how enquiries, bookings and
            follow-ups actually run in your business, then automate the steps
            that slip.
          </p>
        </div>

        <nav aria-label="Jump to an industry" className="hidden md:block">
          <p className="font-body text-label font-semibold tracking-[0.14em] uppercase text-n-600">
            Jump to your industry
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 border-t border-n-200">
            {industries.map((industry) => (
              <li key={industry.slug} className="border-b border-n-200">
                <Link
                  href={`#${industry.slug}`}
                  className="focus-glow block rounded-sm py-2.5 text-[14.5px] font-medium text-n-800 transition-colors duration-150 hover:text-brand-secondary"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
