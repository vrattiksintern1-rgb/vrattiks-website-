import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

/* The site's primary ask. Exported so an in-page button (the Custom case
   study's "Project breakdown") repeats it exactly instead of retyping it. */
export const primaryCta = { href: "/contact", label: "Book a Free Consultation" } as const;

/* Optional props let a detail page make the closing ask specific
   (vrattiks-architecture §4); the target is always /contact. */
export default function FinalCTA({
  title = "Ready to put automation to work in your business?",
  description = "Book a free consultation and we'll show you where AI and automation fit into how you already run things.",
  buttonLabel = primaryCta.label,
}: {
  title?: string;
  description?: string;
  buttonLabel?: string;
}) {
  return (
    /* Named by its own heading (vrattiks-accessibility: every landmark is
       labelled). One FinalCTA per page, so the fixed id is unique. */
    <section aria-labelledby="final-cta-heading" className="py-8 md:py-12">
      <Container>
        <Reveal className="bg-brand-gradient flex flex-col items-center gap-6 rounded-xl px-[clamp(20px,6vw,32px)] py-10 text-center shadow-[var(--shadow-glow)] md:px-16 md:py-12">
          <h2 id="final-cta-heading" className="max-w-xl text-[26px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-0 md:text-h2">
            {title}
          </h2>
          <p className="max-w-md text-[15px] leading-[1.6] text-white/85">
            {description}
          </p>
          <Button href={primaryCta.href} variant="inverse" size="lg">
            {buttonLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
