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

/* `cta` defaults to the Company page link used on Home. The Company page
   itself overrides it so the section doesn't link to the page it sits on. */
export default function WhyVrattiks({
  cta = { label: "Learn about our approach", href: "/company" },
}: {
  cta?: { label: string; href: string };
}) {
  return (
    <section className="py-14 md:py-24">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <Reveal>
          <span className="mb-3 block text-label font-semibold uppercase text-brand-secondary">
            Why Vrattiks
          </span>
          <h2 className="text-[28px] leading-[1.15] tracking-[-0.02em] font-display font-bold text-n-900 md:text-h2">
            Automation built for how your business actually runs
          </h2>
          <p className="mt-4 text-body-lg text-n-500">
            We don&apos;t start with the technology — we start with where your team loses
            time and where customers fall through the cracks. Then we build AI and
            automation systems around that, so the result fits your business instead
            of the other way around.
          </p>
          <div className="mt-7">
            <Button href={cta.href} variant="outline">
              {cta.label}
            </Button>
          </div>
        </Reveal>

        {/* A tinted tray of white pill rows, each keyed by a graphite disc.
            Replaces the full gradient panel: the gradient is spent elsewhere
            on the page, and a surface that size read as decoration. */}
        <Reveal delay={0.1} className="rounded-xl border border-n-100 bg-n-50 p-3 sm:p-5 md:p-6">
          <ul className="flex flex-col gap-2.5">
            {differentiators.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-3.5 rounded-[28px] bg-n-0 py-2.5 pr-5 pl-2.5 shadow-[var(--shadow-sm)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-graphite text-brand-primary">
                  <Icon name={item.icon} className="h-4 w-4" />
                </span>
                <span className="text-[14.5px] leading-[1.45] font-medium text-n-800">
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
