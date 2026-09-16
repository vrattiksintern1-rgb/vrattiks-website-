import Container from "./ui/Container";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="overflow-hidden py-14 md:py-20">
      <Container className="flex flex-col items-center gap-12 md:flex-row md:gap-10">
        <Reveal className="max-w-xl text-center md:text-left">
          <span className="mb-5 inline-flex items-center rounded-full bg-n-50 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-brand-secondary">
            AI Automation for Growing Businesses
          </span>
          <h1 className="text-[36px] leading-[1.1] font-display font-bold text-n-900 md:text-[44px]">
            We build AI-System that Save time, Reduce work and Grow your business.
          </h1>
          <p className="mt-5 text-[16px] leading-[1.65] text-n-500">
            Vrattiks builds AI voice agents, chatbots, and workflow automation for
            growing businesses — so leads get answered, customers get supported,
            and your operations run without the manual follow-up.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
            <Button href="/contact" size="lg">
              Book a Free Consultation
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore Services
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="w-full max-w-[520px] md:flex-1">
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
