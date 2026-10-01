import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Icon, { type IconName } from "./ui/Icon";

/* No verified KPI numbers exist yet for this project — showing outcome
   descriptors instead of fabricated statistics. Replace with real metrics
   once case-study data is approved (see vrattiks-standards §3).
   The numbers below are illustrative scenarios (times, days, volumes),
   not measured results — keep it that way until real data exists.
   Each `value` is a capability the description already states (reply in
   seconds, day 1/3/7 follow-ups, 24/7, every lead tracked), never an
   outcome claim like "60% more leads". `metric` says what it measures. */
const outcomes: {
  icon: IconName;
  value: string;
  metric: string;
  label: string;
  description: string;
}[] = [
  {
    icon: "clock",
    value: "<60s",
    metric: "To first reply, any hour",
    label: "Faster response",
    description:
      "An enquiry that lands at 11 PM gets a reply in seconds — not at 10 AM the next morning.",
  },
  {
    icon: "repeat",
    value: "3",
    metric: "Follow-ups per lead, sent automatically",
    label: "Less manual work",
    description:
      "Day 1, day 3 and day 7 follow-ups go out on their own, and lead details reach your CRM without retyping.",
  },
  {
    icon: "headset",
    value: "24/7",
    metric: "Calls and chats answered",
    label: "Always-on coverage",
    description:
      "Calls and chats are answered 24 hours a day, 7 days a week — Sundays and holidays included.",
  },
  {
    icon: "shield",
    value: "100%",
    metric: "Of leads tracked, first message to last",
    label: "Nothing falls through",
    description:
      "Whether you get 10 leads a day or 500, each one is tracked from the first message to the final reply.",
  },
];

export default function KpiResults() {
  return (
    <section className="py-10 md:py-12">
      <Container>
        <SectionHeading
          title="What automation changes for your business"
          description="Same team, same customers. The first reply, the follow-ups and the tracking just stop depending on someone remembering."
          align="center"
          className="mx-auto"
        />

        {/* Stat ledger — no boxes. Columns are separated by hairline rules
            only. The KPI numeral is the one display-scale element per column
            (where the eye lands); its metric line says what it measures, then
            the outcome label and the scenario that backs the number. No
            hover: these aren't links. */}
        <div className="mt-10 grid grid-cols-1 border-y border-n-200 sm:grid-cols-2 md:mt-14 md:grid-cols-4">
          {outcomes.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className="border-n-200 py-7 sm:px-6 md:py-9 [&:not(:first-child)]:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l md:[&:not(:first-child)]:border-t-0 md:[&:not(:first-child)]:border-l"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-[44px] font-semibold leading-none tracking-[-0.03em] text-n-900 md:text-[52px]">
                  {item.value}
                </p>
                <Icon name={item.icon} className="h-5 w-5 shrink-0 text-brand-secondary" />
              </div>
              <p className="mt-3 text-[12px] font-medium uppercase leading-[1.4] tracking-[0.08em] text-n-600">
                {item.metric}
              </p>
              <p className="mt-6 border-t border-n-200 pt-5 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.01em] text-n-900">
                {item.label}
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-n-600">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
