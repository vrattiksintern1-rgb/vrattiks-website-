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

/* Dark results band with four EQUAL tiles. The previous bento (one large
   promoted tile + three mixed shapes) read as unbalanced, so every tile now
   shares one shape and one baseline: the metric line reserves the same height
   in each tile so the dividers, labels and descriptions line up across the
   row. Value contrast comes from the band itself (CLAUDE.md Design Taste,
   ref 2) — text on the n-300 ramp, hairlines at n-0/10, no gradient surface.
   No hover: none of these are links. */
export default function KpiResults() {
  return (
    <section className="bg-brand-graphite py-14 text-n-200 md:py-24">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="The difference"
          title="What automation changes for your business"
          description="Same team, same customers. The first reply, the follow-ups and the tracking just stop depending on someone remembering."
        />

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-5">
          {outcomes.map((item, i) => (
            <Reveal
              key={item.label}
              as="li"
              delay={i * 0.08}
              className="flex h-full flex-col rounded-md border border-n-0/10 bg-n-0/[0.04] p-6 md:p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-n-0/15 text-brand-primary">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="mt-8 font-display text-[48px] font-semibold leading-none tracking-[-0.03em] text-n-0 md:text-[56px]">
                {item.value}
              </p>
              <p className="mt-3 text-[12px] font-medium uppercase leading-[1.4] tracking-[0.08em] text-n-300 sm:min-h-[4.2em]">
                {item.metric}
              </p>
              <div className="mt-6 border-t border-n-0/10 pt-5">
                <h3 className="font-display text-[18px] font-semibold leading-[1.25] tracking-[-0.01em] text-n-0">
                  {item.label}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-n-300">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
