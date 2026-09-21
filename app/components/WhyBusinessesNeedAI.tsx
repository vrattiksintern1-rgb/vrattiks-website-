import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

/**
 * Structure: numbered ledger, not a card grid.
 *
 * ui-ux-pro-max §1 is explicit that problem-framing must not be a 3-up icon
 * grid — "the problem is not three parallel items". These six are a single
 * accumulating list, so they're set as one numbered run split across two
 * columns, separated by hairlines. The mono numerals carry the sequence, which
 * means no item needs a decorative icon to justify its row.
 */
const problems: { title: string; description: string }[] = [
  {
    title: "Manual, repetitive work",
    description:
      "Your team spends hours a week on tasks a system could handle instead.",
  },
  {
    title: "Slow response times",
    description:
      "Customers wait for replies that could have gone out the moment they asked.",
  },
  {
    title: "Leads that never get followed up",
    description:
      "Without a system, follow-up depends on someone remembering to do it.",
  },
  {
    title: "Disconnected processes",
    description:
      "Sales, support, and operations run on separate tools that don't talk to each other.",
  },
  {
    title: "Operational inefficiency",
    description:
      "The same information gets entered, checked, and re-entered by hand.",
  },
  {
    title: "Poor visibility",
    description:
      "It's hard to know what's actually happening across the business day to day.",
  },
];

export default function WhyBusinessesNeedAI() {
  return (
    <Section id="problem" tone="paper" labelledBy="problem-heading">
      <Container>
        <SectionHeading
          id="problem-heading"
          eyebrow="The Problem"
          title="Growing a business shouldn't mean drowning in busywork"
          description="Most of this isn't a big, dramatic failure — it's small delays and manual steps that quietly add up, cost leads, and wear down a team."
        />

        <ol className="mt-16 grid grid-cols-1 gap-x-16 sm:grid-cols-2 md:mt-20">
          {problems.map((problem, i) => (
            <Reveal
              as="li"
              key={problem.title}
              delay={(i % 2) * 0.06}
              className="border-t border-n-200 py-6 md:py-8"
            >
              <span
                aria-hidden="true"
                className="font-mono text-label tracking-[0.08em] text-brand-secondary"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-body-lg font-semibold text-n-900">
                {problem.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-ui leading-normal text-n-500">
                {problem.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 md:mt-20">
          <div className="rule-fade" aria-hidden="true" />
          <p className="mt-8 max-w-3xl font-display text-[clamp(20px,2.4vw,var(--text-h3))] leading-snug font-semibold text-n-900 text-balance">
            None of this is a people problem — it&apos;s a systems problem.
            That&apos;s exactly where Vrattiks comes in.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
