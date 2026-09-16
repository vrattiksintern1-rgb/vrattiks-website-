import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Icon, { type IconName } from "./ui/Icon";

/* No verified KPI numbers exist yet for this project — showing outcome
   descriptors instead of fabricated statistics. Replace with real metrics
   once case-study data is approved (see vrattiks-standards §3). */
const outcomes: { icon: IconName; label: string; description: string }[] = [
  {
    icon: "clock",
    label: "Faster response",
    description: "Leads and customer messages get an instant first response, any time of day.",
  },
  {
    icon: "repeat",
    label: "Less manual work",
    description: "Repetitive follow-ups and data entry run in the background, automatically.",
  },
  {
    icon: "headset",
    label: "Always-on coverage",
    description: "Voice and chat support that keeps responding outside business hours.",
  },
  {
    icon: "shield",
    label: "Nothing falls through",
    description: "Every lead and ticket is tracked from first contact to resolution.",
  },
];

export default function KpiResults() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <SectionHeading
          title="What automation changes for your business"
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4 md:gap-5">
          {outcomes.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className="rounded-lg border border-n-100 bg-n-0 p-5 shadow-[var(--shadow-sm)] md:p-6"
            >
              <span className="bg-brand-gradient flex h-10 w-10 items-center justify-center rounded-md text-n-0">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[14.5px] font-semibold text-n-900 md:text-[15.5px]">
                {item.label}
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-n-500">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
