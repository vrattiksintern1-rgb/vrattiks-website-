import Container from "./ui/Container";
import Section from "./ui/Section";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

/**
 * Structure: asymmetric split — argument left, statement stack right.
 *
 * Was a gradient-filled panel holding six icon squares. Two problems with that:
 * ui-ux-pro-max §1 says differentiators must not be "a 6-up icon grid where
 * every item gets equal weight", and it was the page's second full gradient
 * surface, which design-system §3 caps at one promoted moment per page.
 *
 * Now the accent is confined to a 2px edge per row (accent presence without
 * accent dominance), and the items are typographic statements — removing an
 * icon from any of these loses nothing, which is the test for whether it
 * earned its place.
 */
const differentiators: string[] = [
  "AI-powered systems, not just scripted replies",
  "Automation that fits how your team already works",
  "Practical, business-first implementation",
  "Built to scale as your business grows",
  "Custom solutions, not one-size-fits-all templates",
  "Focused on outcomes you can actually see",
];

export default function WhyVrattiks() {
  return (
    <Section id="why-vrattiks" tone="white" labelledBy="why-vrattiks-heading">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-20">
        <Reveal className="md:sticky md:top-28">
          <Eyebrow>Why Vrattiks</Eyebrow>
          <h2
            id="why-vrattiks-heading"
            className="mt-5 font-display text-[clamp(28px,3.4vw,40px)] leading-heading font-bold tracking-[-0.025em] text-n-900 text-balance"
          >
            Automation built for how your business actually runs
          </h2>
          <p className="mt-5 max-w-[52ch] text-body leading-relaxed text-n-500">
            We don&apos;t start with the technology — we start with where your
            team loses time and where customers fall through the cracks. Then we
            build AI and automation systems around that, so the result fits your
            business instead of the other way around.
          </p>
          <div className="mt-8">
            <Button href="/company" variant="outline">
              Learn about our approach
            </Button>
          </div>
        </Reveal>

        <ul className="flex flex-col">
          {differentiators.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={i * 0.06}
              className="group relative border-t border-n-100 py-5 pl-6 last:border-b md:py-6"
            >
              <span
                aria-hidden="true"
                className="bg-brand-gradient absolute top-5 bottom-5 left-0 w-0.5 rounded-full md:top-6 md:bottom-6"
              />
              <span className="block font-display text-body-lg leading-snug font-semibold text-n-800">
                {item}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
