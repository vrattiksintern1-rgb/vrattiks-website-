import Button from "./ui/Button";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* Generated copy describing the consultation itself — no response times,
   durations or outcomes are promised, since none are confirmed
   (vrattiks-standards §3). Step 3 restates the FAQ's "timeline before any
   work begins". */
const steps = [
  {
    title: "We read your message",
    description: "Someone from our team reads it and replies to find a time to talk that suits you.",
  },
  {
    title: "We go through how you work today",
    description:
      "On the call, we look at how enquiries, follow-ups and everyday tasks run in your business right now.",
  },
  {
    title: "You get clear next steps",
    description:
      "We point out where automation would help most and outline a timeline before any work begins.",
  },
];

/* The page's one dark band (CLAUDE.md Design Taste, reference 2): it resets
   the eye between the form and the business details. The structure is a
   ruled three-column ledger with display-scale step numbers, so it doesn't
   repeat the hero's split. Text sits on the n-200/n-300 ramp, rules are
   n-0/10. The CTA is `inverse`, not gradient — the form's submit button is
   already the page's one primary. */
export default function ContactConsultation() {
  return (
    <Section tone="dark" labelledBy="consultation-heading">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="consultation-heading"
            tone="dark"
            eyebrow="Free consultation"
            title="What happens after you get in touch"
            description="The first conversation is free. It's about understanding your business, not selling you a package."
          />
          <Reveal className="shrink-0">
            <Button href="#inquiry" variant="inverse">
              Request a consultation
            </Button>
          </Reveal>
        </div>

        <ol className="mt-10 grid grid-cols-1 border-t border-n-0/10 md:mt-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 0.06}
              className="border-b border-n-0/10 py-5 md:border-b-0 md:py-8 md:pr-10 md:not-first:border-l md:not-first:pl-10"
            >
              <span aria-hidden="true" className="block text-[44px] leading-none font-display font-bold text-brand-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-[19px] leading-[1.3] font-display font-bold text-n-0">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-[1.65] text-n-300">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
