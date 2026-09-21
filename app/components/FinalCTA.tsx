import Container from "./ui/Container";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

/**
 * Final CTA is a full-bleed contrasting band, not a contained gradient panel
 * (ui-ux-pro-max §1). The gradient is spent on the button alone — the page
 * already uses its one gradient *surface* in the hero, and two gradient
 * surfaces cancel each other out (vrattiks-design-system §3).
 */
export default function FinalCTA() {
  return (
    <Section
      id="get-started"
      tone="dark"
      size="lg"
      labelledBy="get-started-heading"
      className="bg-noise bg-grid-fine-dark overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="wash-secondary pointer-events-none absolute -bottom-64 left-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
      />

      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2
            id="get-started-heading"
            className="font-display text-[clamp(28px,3.6vw,42px)] leading-heading font-bold tracking-[-0.025em] text-n-0 text-balance"
          >
            Ready to put automation to work in your business?
          </h2>
          <p className="max-w-lg text-body leading-relaxed text-n-300">
            Book a free consultation and we&apos;ll walk through where AI and
            automation fit into how you already run things.
          </p>
          <div className="mt-2">
            <Button href="/contact" size="lg">
              Book a Free Consultation
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
