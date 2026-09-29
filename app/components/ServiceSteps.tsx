import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* How it works — the detail page's one graphite band (CLAUDE.md Design
   Taste, ref 2): n-300 body on the muted ramp, n-0/10 hairlines. Each step's
   hairline carries a short brand-primary segment; that's the only accent.
   `id="how-it-works"` is the hero's "See how it works" target. */
export default function ServiceSteps({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <Section tone="dark" id="how-it-works" labelledBy="steps-heading">
      <Container>
        <SectionHeading
          tone="dark"
          id="steps-heading"
          eyebrow="How it works"
          title="From first conversation to up and running"
        />

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative border-t border-n-0/10 pt-6">
              <span aria-hidden="true" className="absolute -top-px left-0 h-px w-10 bg-brand-primary" />
              <span className="font-body text-label font-semibold tracking-[0.14em] uppercase text-brand-primary">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[19px] leading-[1.3] font-display font-semibold text-n-0">
                {step.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-n-300">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
