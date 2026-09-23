import Container from "./ui/Container";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import Eyebrow from "./ui/Eyebrow";
import Button from "./ui/Button";

/**
 * Final CTA is a full-bleed contrasting band, not a contained gradient panel
 * (ui-ux-pro-max §1). The gradient is spent on the button alone — the page
 * already uses its one gradient *surface* in the hero, and two gradient
 * surfaces cancel each other out (vrattiks-design-system §3).
 *
 * The H2 was clamp(28px,3.6vw,42px) — 2px larger than every other section
 * heading for no reason anyone could point at. It is now on the standard 40px
 * step like the rest, so the page has exactly two type ranks: the 68px Hero H1
 * and the 40px section H2. Presence here comes from the band and the centring,
 * not from a 2px size bump nobody can perceive.
 *
 * Centred layout is deliberate and is the page's second and last centred
 * moment, bookending the Hero — everything between them is asymmetric.
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
      {/* Lit top edge — same device as the results band, so the two dark
          sections read as the same material rather than as two holes. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"
      />

      <div
        aria-hidden="true"
        className="wash-secondary pointer-events-none absolute -bottom-64 left-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
      />

      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow tone="dark" variant="chip">
            Get Started
          </Eyebrow>

          <h2
            id="get-started-heading"
            className="font-display text-[clamp(28px,3.4vw,40px)] leading-heading font-bold tracking-[-0.025em] text-n-0 text-balance"
          >
            Ready to put automation to work in your business?
          </h2>

          <p className="max-w-lg text-body leading-relaxed text-n-300">
            Book a free consultation and we&apos;ll walk through where AI and
            automation fit into how you already run things.
          </p>

          <div className="mt-2 flex flex-col items-center gap-5">
            <Button href="/contact" size="lg">
              Book a Free Consultation
            </Button>
            <p className="font-mono text-micro tracking-[0.1em] text-n-400 uppercase">
              No obligation · We map your process first
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
