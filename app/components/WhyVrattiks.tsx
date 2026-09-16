import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Icon, { type IconName } from "./ui/Icon";

const differentiators: { icon: IconName; text: string }[] = [
  { icon: "sparkles", text: "AI-powered systems, not just scripted replies" },
  { icon: "workflow", text: "Automation that fits how your team already works" },
  { icon: "target", text: "Practical, business-first implementation" },
  { icon: "chartUp", text: "Built to scale as your business grows" },
  { icon: "sliders", text: "Custom solutions, not one-size-fits-all templates" },
  { icon: "check", text: "Focused on outcomes you can actually see" },
];

export default function WhyVrattiks() {
  return (
    <section className="py-14 md:py-24">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <Reveal>
          <span className="mb-3 block text-[12.5px] font-semibold uppercase tracking-[0.06em] text-brand-secondary">
            Why Vrattiks
          </span>
          <h2 className="text-[28px] leading-[1.15] font-display font-bold text-n-900 md:text-[32px]">
            Automation built for how your business actually runs
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.65] text-n-500">
            We don&apos;t start with the technology — we start with where your team loses
            time and where customers fall through the cracks. Then we build AI and
            automation systems around that, so the result fits your business instead
            of the other way around.
          </p>
          <div className="mt-7">
            <Button href="/company" variant="outline">
              Learn about our approach
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="bg-brand-gradient rounded-xl p-8 shadow-[var(--shadow-glow)] md:p-10">
          <ul className="flex flex-col gap-5">
            {differentiators.map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/15 text-n-0">
                  <Icon name={item.icon} className="h-4 w-4" />
                </span>
                <span className="text-[14.5px] leading-[1.5] font-medium text-n-0">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
