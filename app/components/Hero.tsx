import Container from "./ui/Container";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import Eyebrow from "./ui/Eyebrow";
import HeroVisual from "./HeroVisual";
import { services } from "@/app/lib/content";

/**
 * Structure: centred statement, product visual beneath it.
 *
 * This replaced a 50/50 split (copy left, visual right). The split was the
 * reason the H1 had to be capped at 48px: at 1024px the headline sat in a
 * ~470px column and wrapped to six lines, so the type could never be large
 * enough to out-rank the section H2s below it. With the headline centred
 * across the full 1180px container it gets a ~30ch measure, which lets it run
 * to 68px in three lines — restoring the display-scale jump (H1 68 vs H2 40,
 * a 1.7x step) that the page was missing.
 *
 * Centring is used HERE ONLY. CLAUDE.md's slop tell #2 is centred-everything
 * repeated down the page; one centred anchor followed by ten asymmetric
 * sections is the opposite of that, and is what makes the hero read as the
 * page's single loudest moment.
 *
 * Weight is 600, not the base 700. At 68px Urbanist 700 with -0.035em tracking
 * reads as shouting; 600 is the weight the reference-tier sites use at display
 * scale. Both weights are already loaded, so this costs nothing.
 */

export default function Hero() {
  return (
    <section className="bg-noise bg-grid-fine relative isolate overflow-hidden bg-n-25 pt-20 pb-16 sm:pt-24 md:pt-32 md:pb-24">
      {/* Soft mesh — two wide, low-opacity brand washes rather than one hard blob.
          Both are pulled toward the top so the glow sits behind the headline,
          which is now the centre of gravity. */}
      <div
        aria-hidden="true"
        className="wash-primary pointer-events-none absolute -top-48 left-1/2 -z-10 h-[620px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="wash-secondary pointer-events-none absolute top-[280px] -left-40 -z-10 h-[460px] w-[460px] rounded-full opacity-25 blur-[130px]"
      />

      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow variant="chip">AI Automation for Growing Businesses</Eyebrow>
          </Reveal>

          {/* Deliberately NOT wrapped in <Reveal>. kylezantos-design §1b, first
              bullet: "Anything above the fold that delays first read — the hero
              headline should be readable the instant it paints; don't fade in
              the value proposition." It was wrapped in <Reveal delay={0.06}>,
              which held the page's single most important line at opacity 0 for
              ~560ms (60ms delay + 500ms duration) on every load. Do not re-wrap
              it to "match" the elements around it. */}
          <h1 className="mt-8 font-display text-[clamp(34px,6.1vw,68px)] leading-display font-semibold tracking-[-0.035em] text-n-900 text-balance">
            We build AI systems that save time, cut manual work, and{" "}
            <span className="text-brand-gradient">grow your business</span>.
          </h1>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-7 max-w-[56ch] text-body-lg leading-relaxed text-n-500">
              Vrattiks builds AI voice agents, chatbots, and workflow automation
              for growing businesses — so leads get answered, customers get
              supported, and your operations run without the manual follow-up.
            </p>
          </Reveal>

          <Reveal delay={0.22} className="w-full">
            <div className="mt-11 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                Book a Free Consultation
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Explore Services
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-20 md:mt-24">
          <HeroVisual />
        </Reveal>
      </Container>

      {/* Capability strip — understated proof of scope, no unverified claims.
          Static wrapped row, NOT a ticker.

          This was a full-bleed marquee scrolling on a 46s infinite loop.
          kylezantos-design §1b: "Things that repeat on a loop — pulsing glows,
          floating orbs, infinite rotation. Nothing on this site should be
          moving when the user isn't acting." A loop has no user action behind
          it and no state change to communicate, so it was removed rather than
          slowed — a slower loop is the same violation at a lower frequency.

          The reduced-motion fallback for the old marquee was already exactly
          this layout (wrap + centre), so this is the design that shipped to
          reduced-motion users all along; it is now what everyone gets.

          The list also stops being decorative, so `aria-hidden` and the
          `sr-only` paragraph that used to carry these names for screen readers
          are both gone — one copy of the content, announced as a real list
          (vrattiks-accessibility, "ARIA only when needed"). */}
      <div className="mt-20 md:mt-28">
        <Container>
          <div className="rule-fade" aria-hidden="true" />

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {services.map((service) => (
              <li
                key={service.slug}
                className="flex items-center gap-2.5 font-mono text-micro tracking-[0.14em] whitespace-nowrap text-n-500 uppercase"
              >
                <span
                  aria-hidden="true"
                  className="bg-brand-primary/50 h-1 w-1 shrink-0 rounded-full"
                />
                {service.name}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
