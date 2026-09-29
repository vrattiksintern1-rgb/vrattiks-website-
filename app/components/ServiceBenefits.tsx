import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* Benefits as a ledger: each outcome set at display scale on the left, one
   plain sentence on the right. Copy states outcomes in words only; no figures
   until real results exist (vrattiks-standards §3). */
export default function ServiceBenefits({
  benefits,
}: {
  benefits: { title: string; text: string }[];
}) {
  return (
    <Section tone="tint" labelledBy="benefits-heading">
      <Container>
        <SectionHeading
          id="benefits-heading"
          eyebrow="Benefits"
          title="What changes for your business"
        />

        <dl className="mt-10 border-t border-n-200 md:mt-12">
          {benefits.map((benefit, i) => (
            <Reveal
              key={benefit.title}
              delay={i * 0.06}
              className="grid grid-cols-1 gap-2 border-b border-n-200 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-12 md:py-9"
            >
              <dt className="text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-semibold text-n-900 md:text-[32px]">
                {benefit.title}
              </dt>
              <dd className="text-body-lg text-n-600">{benefit.text}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
