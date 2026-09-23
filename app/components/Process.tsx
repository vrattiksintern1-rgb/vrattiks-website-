import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

/**
 * Structure: numbered horizontal stepper on desktop, vertical timeline on
 * mobile (ui-ux-pro-max §1).
 *
 * The five steps previously each sat in a gradient-filled circle behind an
 * icon — five gradient surfaces in one viewport, where the budget is one.
 * The sequence is now carried by mono numerals against a single gradient
 * hairline rail: the accent is an edge, not five fills, and the numerals do
 * the ordering work the icons were only decorating.
 */
const steps: { title: string; description: string }[] = [
  {
    title: "Discover",
    description:
      "We map how your business runs today — where time goes and where leads drop off.",
  },
  {
    title: "Design",
    description:
      "We design the AI and automation workflows around your actual process.",
  },
  {
    title: "Build & Automate",
    description:
      "We build and connect the voice agents, chatbots, and workflows.",
  },
  {
    title: "Launch",
    description:
      "We roll it out, test it against real conversations, and refine it.",
  },
  {
    title: "Support",
    description: "We monitor and improve the system as your business grows.",
  },
];

export default function Process() {
  return (
    <Section id="process" tone="tint" labelledBy="process-heading">
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="Process"
          title="How we work"
          description="A clear path from where you are today to a business that runs on automation."
        />

        <ol className="relative mt-16 grid grid-cols-1 md:mt-20 md:grid-cols-5 md:gap-8">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.08}
              className="relative flex gap-5 pb-10 last:pb-0 md:flex-col md:gap-0 md:pb-0"
            >
              {/* The rail used to be ONE span on the <ol> at `md:w-full`, which
                  ran the full grid width — roughly 185px of gradient line kept
                  going past the fifth dot at desktop, drawing a sixth step that
                  does not exist. It is now a connector per step, rendered for
                  every step except the last, so the rail ends exactly where the
                  process does.

                  Desktop offsets are derived, not eyeballed: the dot is 24px
                  wide (centre 12px), and the grid gap is 32px — so the next
                  dot's centre sits 44px past this item's right edge, hence
                  `left-6` (24px, the dot's right edge) to `-right-11` (44px).
                  If `md:gap-8` ever changes, `-right-11` must change with it. */}
              {i < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="bg-brand-gradient absolute top-6 bottom-0 left-[11px] w-0.5 rounded-full opacity-30 md:top-[11px] md:-right-11 md:bottom-auto md:left-6 md:h-0.5 md:w-auto"
                />
              ) : null}

              <span
                aria-hidden="true"
                className="bg-n-0 relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-2 ring-n-50"
              >
                <span className="bg-brand-gradient h-2.5 w-2.5 rounded-full" />
              </span>

              <span className="block md:mt-6">
                <span className="block font-mono text-label tracking-[0.12em] text-brand-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-h3 leading-snug font-semibold text-n-900">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[34ch] text-ui leading-normal text-n-600">
                  {step.description}
                </p>
              </span>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
