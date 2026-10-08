import Container from "./ui/Container";
import Button from "./ui/Button";
import HeroVideo from "./HeroVideo";

/* The video is the hero's only motion. The particle background and the Reveal
   fade-ins were removed at the user's request (2026-10-08) so nothing competes
   with it, and so the headline is readable the instant it paints
   (kylezantos-design §1b). HeroParticles stays on the other page heroes.

   White in light theme, the page tone in dark (user request 2026-10-08; a
   brief all-dark .bg-ink version was reverted the same day). On white the
   video's baked-in dark backdrop can't dissolve, so it shows as a rounded,
   glowing frame there — see .media-blend in globals.css. */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-n-0 py-10 md:py-16 dark:bg-n-25">
      {/* One soft brand glow behind the headline side. Static and decorative
          only — hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="wash-brand pointer-events-none absolute -top-24 left-1/2 -z-10 h-[300px] w-[420px] -translate-x-1/2 opacity-50 md:-top-32 md:left-[30%] md:h-[420px] md:w-[680px] md:opacity-70"
      />
      <Container className="flex flex-col items-center gap-12 lg:flex-row lg:gap-12">
        <div className="max-w-xl text-center lg:flex-1 lg:text-left">
          <span className="mb-5 inline-flex items-center rounded-full bg-n-50 px-4 py-1.5 text-label font-semibold uppercase text-brand-secondary">
            AI Automation for Growing Businesses
          </span>
          <h1 className="text-[36px] leading-[1.15] tracking-[-0.02em] font-display font-bold text-n-900 md:text-h1">
            We build AI-System that Save time, Reduce work and Grow your business.
          </h1>
          <p className="mt-5 text-body text-n-500">
            Vrattiks builds AI voice agents, chatbots, and workflow automation for
            growing businesses — so leads get answered, customers get supported,
            and your operations run without the manual follow-up.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button href="/contact" size="lg">
              Book a Free Consultation
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore Services
            </Button>
          </div>
        </div>

        <div className="w-full max-w-[560px] lg:flex-1">
          <HeroVideo />
        </div>
      </Container>
    </section>
  );
}
