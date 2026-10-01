import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* USER-PROVIDED (vrattiks-standards §3, 2026-09-12): names only. No titles
   beyond "Co-Founder", bios, photos or quotes until the client supplies them.
   Monograms stand in for photos rather than a stock face. */
const founders = [
  { name: "Arpit Patel", initials: "AP" },
  { name: "Hitesh Dave", initials: "HD" },
];

export default function Founders() {
  return (
    <Section tone="tint" labelledBy="founders-heading">
      <Container>
        <SectionHeading
          id="founders-heading"
          eyebrow="Co-Founders"
          title="The people behind Vrattiks"
        />

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:gap-6">
          {founders.map((founder, i) => (
            <Reveal
              key={founder.name}
              as="li"
              delay={i * 0.08}
              className="flex items-center gap-5 rounded-md border border-n-100 bg-n-0 p-6 shadow-[var(--shadow-sm)] md:gap-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-graphite font-display text-[22px] font-bold text-brand-primary md:h-20 md:w-20 md:text-[26px]"
              >
                {founder.initials}
              </span>
              <div>
                <h3 className="text-[22px] leading-[1.2] font-display font-bold text-n-900 md:text-h3">
                  {founder.name}
                </h3>
                <p className="mt-1 font-body text-label font-semibold uppercase text-n-600">
                  Co-Founder
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
