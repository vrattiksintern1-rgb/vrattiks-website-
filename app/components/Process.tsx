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
          align="center"
        />

        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 md:grid-cols-5 md:gap-6">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="bg-brand-gradient-soft absolute top-7 left-1/2 hidden h-px w-full md:block"
                />
              ) : null}
              <span className="bg-brand-gradient relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-n-0 shadow-[var(--shadow-md)]">
                <Icon name={step.icon} className="h-6 w-6" />
              </span>
              <span className="mt-4 font-mono text-[12px] text-n-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1.5 text-[16px] font-display font-semibold text-n-900">
                {step.title}
              </h3>
              <p className="mt-1.5 max-w-[220px] text-[13.5px] leading-[1.55] text-n-500">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
