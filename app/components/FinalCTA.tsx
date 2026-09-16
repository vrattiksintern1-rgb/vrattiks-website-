import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

export default function FinalCTA() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <Reveal className="bg-brand-gradient flex flex-col items-center gap-6 rounded-xl px-8 py-14 text-center shadow-[var(--shadow-glow)] md:px-16 md:py-16">
          <h2 className="max-w-xl text-[26px] leading-[1.2] font-display font-bold text-n-0 md:text-[32px]">
            Ready to put automation to work in your business?
          </h2>
          <p className="max-w-md text-[15px] leading-[1.6] text-white/85">
            Book a free consultation and we&apos;ll show you where AI and automation
            fit into how you already run things.
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            Book a Free Consultation
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
