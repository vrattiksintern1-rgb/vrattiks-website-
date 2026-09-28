import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Icon, { type IconName } from "./ui/Icon";

/* No verified KPI numbers exist yet for this project — showing outcome
   descriptors instead of fabricated statistics. Replace with real metrics
   once case-study data is approved (see vrattiks-standards §3).
   The numbers below are illustrative scenarios (times, days, volumes),
   not measured results — keep it that way until real data exists. */
const outcomes: { icon: IconName; label: string; description: string }[] = [
  {
    icon: "clock",
    label: "Faster response",
    description:
      "An enquiry that lands at 11 PM gets a reply in seconds — not at 10 AM the next morning.",
  },
  {
    icon: "repeat",
    label: "Less manual work",
    description:
      "Day 1, day 3 and day 7 follow-ups go out on their own, and lead details reach your CRM without retyping.",
  },
  {
    icon: "headset",
    label: "Always-on coverage",
    description:
      "Calls and chats are answered 24 hours a day, 7 days a week — Sundays and holidays included.",
  },
  {
    icon: "shield",
    label: "Nothing falls through",
    description:
      "Whether you get 10 leads a day or 500, each one is tracked from the first message to the final reply.",
  },
];

export default function KpiResults() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <SectionHeading
          title="What automation changes for your business"
          description="Same team, same customers. The first reply, the follow-ups and the tracking just stop depending on someone remembering."
          align="center"
          className="mx-auto"
        />

        {/* Stat ledger — no boxes. Columns are separated by hairline rules
            only, and the outcome label is set at display scale so it does the
            job a big number would (no verified metrics exist yet). No hover:
            these aren't links. */}
        <div className="mt-10 grid grid-cols-1 border-y border-n-200 sm:grid-cols-2 md:mt-14 md:grid-cols-4">
          {outcomes.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className="border-n-200 py-7 sm:px-6 md:py-9 [&:not(:first-child)]:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l md:[&:not(:first-child)]:border-t-0 md:[&:not(:first-child)]:border-l"
            >
              <Icon name={item.icon} className="h-5 w-5 text-brand-secondary" />
              <p className="mt-5 text-[22px] leading-[1.15] tracking-[-0.02em] font-display font-semibold text-n-900 md:text-[24px]">
                {item.label}
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-n-600">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
