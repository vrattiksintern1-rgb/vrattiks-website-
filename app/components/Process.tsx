import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon, { type IconName } from "./ui/Icon";

const steps: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "search",
    title: "Discover",
    description: "We map how your business runs today — where time goes and where leads drop off.",
  },
  {
    icon: "layout",
    title: "Design",
    description: "We design the AI and automation workflows around your actual process.",
  },
  {
    icon: "workflow",
    title: "Build & Automate",
    description: "We build and connect the voice agents, chatbots, and workflows.",
  },
  {
    icon: "rocket",
    title: "Launch",
    description: "We roll it out, test it against real conversations, and refine it.",
  },
  {
    icon: "lifeBuoy",
    title: "Support",
    description: "We monitor and improve the system as your business grows.",
  },
];

export default function Process() {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="How we work"
          description="A clear path from where you are today to a business that runs on automation."
        />

        {/* Timeline, not cards. md+: five columns hung off ONE gradient rail
            (the section's only gradient, confined to a 2px band) that runs
            from the first node's centre to the last. Below md: a vertical
            timeline with a hairline segment under each node. Nodes are
            painted in the page colour so the rail passes behind them. */}
        <div className="relative mt-12 md:mt-16">
          <span
            aria-hidden="true"
            className="bg-brand-gradient absolute top-[17px] right-[calc(20%-18px)] left-[18px] hidden h-0.5 md:block"
          />
          <ol className="relative grid grid-cols-1 md:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.08}
                className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-x-4 pb-9 last:pb-0 md:block md:pr-6 md:pb-0"
              >
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-10 bottom-1 left-[17.5px] w-px bg-n-200 md:hidden"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-secondary bg-n-25 font-body text-[12px] font-semibold text-brand-secondary"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5 md:pt-6">
                  <h3 className="flex items-center gap-2 text-[17px] leading-[1.3] font-display font-semibold text-n-900">
                    <Icon name={step.icon} className="h-4.5 w-4.5 shrink-0 text-n-500" />
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[260px] text-[14px] leading-[1.6] text-n-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
