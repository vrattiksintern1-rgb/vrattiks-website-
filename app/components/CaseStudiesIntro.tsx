import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Section from "./ui/Section";

/* Case Studies intro. Deliberately not the split H1 + image every other
   overview page opens with: there is no image, so the one idea is the
   display-scale jump (CLAUDE.md Design Taste, ref 2) — the H1 is the largest
   type on the site, the line under it is small and quiet. The sticky chapter
   bar (CaseStudiesNav) sits directly beneath, so the intro's bottom padding is
   trimmed to let the two read as one block. */
export default function CaseStudiesIntro() {
  return (
    <Section tone="paper" labelledBy="case-studies-heading" className="pb-10 sm:pb-10 md:pb-12">
      <Container>
        <Eyebrow className="mb-6">Case Studies</Eyebrow>
        {/* Not wrapped in Reveal: the page's H1 should be readable the instant
            it paints (kylezantos-design §1b). */}
        <h1
          id="case-studies-heading"
          className="max-w-[14ch] text-[44px] leading-[1.02] tracking-[-0.035em] font-display font-bold text-n-900 sm:text-[56px] md:text-[72px]"
        >
          Work we&apos;ve built
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-16">
          <p className="max-w-xl text-body-lg text-n-700">
            Custom automation, IoT and website projects — what each one does and
            how it was built.
          </p>
          {/* The page's honest qualifier, said once rather than as an empty
              "Results" field on every project (vrattiks-standards §3). */}
          <p className="max-w-md text-[14px] leading-[1.6] text-n-600">
            Results are added to a project only once they have been measured
            with the client.
          </p>
        </div>
      </Container>
    </Section>
  );
}
