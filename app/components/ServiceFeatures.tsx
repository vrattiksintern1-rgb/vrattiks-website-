import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* Key features: a two-column ruled list, deliberately not a 3-up card grid
   (CLAUDE.md allows one of those per page, and Related services is closer). */
export default function ServiceFeatures({
  features,
}: {
  features: { title: string; text: string }[];
}) {
  return (
    <Section tone="paper" labelledBy="features-heading">
      <Container>
        <SectionHeading
          id="features-heading"
          eyebrow="Key features"
          title="What's included"
        />

        <ul className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2 md:mt-12">
          {features.map((feature, i) => (
            <Reveal
              as="li"
              key={feature.title}
              delay={(i % 2) * 0.06}
              className="flex gap-4 border-t border-n-200 py-4"
            >
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" />
              <div>
                <h3 className="text-[17px] leading-[1.3] font-display font-semibold text-n-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.6] text-n-600">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
