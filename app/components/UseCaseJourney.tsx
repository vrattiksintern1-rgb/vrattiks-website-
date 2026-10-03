import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { useCases } from "@/app/lib/content";

/* The page's one graphite band (CLAUDE.md Design Taste, ref 2): n-300 body on
   the muted ramp, n-0/10 hairlines. Its one idea: the three use cases aren't
   separate products, they're three moments with the same customer — so the
   list is a week on a timeline, not three more cards. The scenario is
   illustrative, not a client story. */
const moments = [
  {
    when: "Tuesday, 9:40 pm",
    slug: "lead-management",
    text: "A customer fills in your enquiry form after closing. They get a WhatsApp reply within a minute, and the lead is waiting for the right person in the morning.",
  },
  {
    when: "Wednesday, 11 am",
    slug: "customer-support",
    text: "They message to ask about pricing and timings. The answer comes straight away, and the conversation is saved against their record.",
  },
  {
    when: "Friday evening",
    slug: "business-intelligence",
    text: "You open one dashboard and see how many enquiries came in this week, how many became customers, and where the rest dropped off.",
  },
];

const nameFor = (slug: string) => useCases.find((u) => u.slug === slug)?.name ?? slug;

export default function UseCaseJourney() {
  return (
    <Section tone="dark" labelledBy="journey-heading">
      <Container>
        <SectionHeading
          tone="dark"
          id="journey-heading"
          eyebrow="How they connect"
          title="One customer, all three"
          description="Most businesses start with one. They work best together, because they follow the same customer from first enquiry to the numbers you review."
        />

        <ol className="relative mt-12 grid grid-cols-1 gap-y-10 md:mt-16 lg:grid-cols-3 lg:gap-x-10">
          {moments.map((moment, i) => (
            <Reveal
              as="li"
              key={moment.slug}
              delay={i * 0.08}
              className="relative border-l border-n-0/10 pl-6 lg:border-t lg:border-l-0 lg:pt-8 lg:pl-0"
            >
              {/* Timeline node: on the left rule below lg, on the top rule at lg+ */}
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full bg-brand-primary lg:-top-[4.5px] lg:left-0"
              />
              <p className="font-body text-label font-semibold tracking-[0.14em] uppercase text-brand-primary">
                {moment.when}
              </p>
              {/* Anchor target for UseCasesIntro's cards (and the page's
                  JSON-LD URLs). scroll-mt clears the sticky header. */}
              <h3
                id={moment.slug}
                className="mt-3 scroll-mt-28 text-[20px] leading-[1.3] font-display font-semibold text-n-0"
              >
                {nameFor(moment.slug)}
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-[1.6] text-n-300">{moment.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
