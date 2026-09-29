import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* The element → quality pairs come from the user-provided brand story
   (vrattiks-standards §3). The one-line descriptions are generated copy and
   make no factual claims. */
const elements = [
  {
    element: "Earth",
    quality: "Structure",
    text: "Clear, dependable processes your team can rely on every day.",
  },
  {
    element: "Water",
    quality: "Clarity",
    text: "You can see what is happening — every lead, reply and follow-up.",
  },
  {
    element: "Fire",
    quality: "Energy",
    text: "Faster responses, so opportunities don't go cold while you're busy.",
  },
  {
    element: "Air",
    quality: "Connection",
    text: "Your tools, channels and teams working together instead of apart.",
  },
  {
    element: "Space",
    quality: "Limitless growth",
    text: "Systems built to grow with you instead of being rebuilt every year.",
  },
];

/* A five-column ruled strip at lg, stacked rows below it. No icons: the
   element names carry the structure. */
export default function CompanyValues() {
  return (
    <Section tone="paper" labelledBy="values-heading">
      <Container>
        <SectionHeading
          id="values-heading"
          eyebrow="Our approach"
          title="Five elements, one way of working"
          description="The five elements behind the Vrattiks name are also how we judge every system we build."
        />

        <ol className="mt-10 border-b border-n-200 md:mt-14 lg:grid lg:grid-cols-5 lg:border-t lg:border-b-0 lg:pt-10">
          {elements.map((item, i) => (
            <Reveal
              key={item.element}
              as="li"
              delay={i * 0.05}
              className="border-t border-n-200 py-6 sm:grid sm:grid-cols-[40px_180px_minmax(0,1fr)] sm:items-baseline sm:gap-6 lg:block lg:border-t-0 lg:border-l lg:px-6 lg:py-1 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="font-body text-[13px] text-n-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-2 sm:mt-0 lg:mt-6">
                <span className="block font-body text-label font-semibold uppercase text-brand-secondary">
                  {item.element}
                </span>
                <h3 className="mt-1.5 text-[22px] leading-[1.2] tracking-[-0.01em] font-display font-bold text-n-900">
                  {item.quality}
                </h3>
              </div>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-n-600 sm:mt-0 lg:mt-3">
                {item.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
