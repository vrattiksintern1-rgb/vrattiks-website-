import Container from "./ui/Container";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import Eyebrow from "./ui/Eyebrow";
import HeroVisual from "./HeroVisual";
import { services } from "@/app/lib/content";

export default function Hero() {
  return (
    <section className="bg-noise bg-grid-fine relative isolate overflow-hidden bg-n-25 pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Soft mesh — two wide, low-opacity brand washes rather than one hard blob */}
      <div
        aria-hidden="true"
        className="wash-primary pointer-events-none absolute -top-40 -right-32 -z-10 h-[520px] w-[520px] rounded-full opacity-45 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="wash-secondary pointer-events-none absolute -bottom-52 -left-40 -z-10 h-[460px] w-[460px] rounded-full opacity-30 blur-[130px]"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:gap-16">
          <div>
            <Eyebrow>AI Automation for Growing Businesses</Eyebrow>

            <h1 className="mt-6 font-display text-[clamp(32px,4.7vw,48px)] leading-display font-bold tracking-[-0.03em] text-n-900 text-balance">
              We build AI systems that save time, cut manual work, and{" "}
              <span className="text-brand-gradient">grow your business</span>.
            </h1>

            <p className="mt-7 max-w-[48ch] text-body-lg leading-relaxed text-n-500">
              Vrattiks builds AI voice agents, chatbots, and workflow automation
              for growing businesses — so leads get answered, customers get
              supported, and your operations run without the manual follow-up.
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                Book a Free Consultation
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                Explore Services
              </Button>
            </div>

            {/* Capability strip — understated proof of scope, no unverified claims */}
            <div className="mt-12 md:mt-14">
              <div className="rule-fade" aria-hidden="true" />
              <p className="mt-5 font-mono text-micro leading-[1.9] tracking-[0.02em] text-n-400">
                {services.map((service) => service.name).join("  ·  ")}
              </p>
            </div>
          </div>

          <Reveal delay={0.1} className="w-full">
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
