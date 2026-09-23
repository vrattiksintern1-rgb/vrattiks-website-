import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

/**
 * Structure: a uniform six-card grid.
 *
 * This was a numbered hairline ledger — which was a good structure, but the
 * section directly above it (KpiResults) is ALSO a two-column hairline ledger,
 * so the page ran the same shape twice in a row. That breaks CLAUDE.md's
 * "no two consecutive sections share a layout structure" rule and is a large
 * part of why the run of sections read as flat.
 *
 * ⚠ CLIENT DECISION (2026-09-22): card 03 ("Leads that never get followed up")
 * used to be a single inverted `bg-brand-graphite` surface among five light
 * ones — the section's only focal point, and the device that did an accent
 * colour's job without spending the page's one-gradient-per-viewport budget.
 * It was asked to be white like the rest, so all six are now uniform.
 *
 * The known cost, recorded so a later pass doesn't "rediscover" it: this grid
 * is now slop tell #4 in CLAUDE.md — everything on white with n-500 text and
 * an n-200 border, no value contrast, nowhere for the eye to land. If the
 * section is ever asked to feel stronger again, restoring ONE promoted card
 * is the cheapest fix; do not reach for a gradient or an icon set instead
 * (the gradient budget is claimed by Services, the icon-grid budget by
 * Services too — slop tell #3).
 *
 * Still no icons. The icon-card grid budget for this page belongs to Services
 * (slop tell #3), so sequence here is carried by mono numerals instead.
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

        <ol className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-5">
          {problems.map((problem, i) => (
            <Reveal
              as="li"
              key={problem.title}
              delay={(i % 3) * 0.06}
              className="h-full"
            >
              <div className="card-lift flex h-full flex-col rounded-md border border-n-200 bg-n-0 p-6 shadow-[var(--shadow-soft)] md:p-7">
                <span
                  aria-hidden="true"
                  className="font-mono text-label tracking-[0.12em] text-brand-secondary tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-body-lg leading-snug font-semibold text-n-900 text-balance">
                  {problem.title}
                </h3>
                <p className="mt-2.5 text-ui leading-normal text-n-500">
                  {problem.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 md:mt-20">
          <div className="rule-fade" aria-hidden="true" />
          <p className="mt-8 max-w-3xl font-display text-[clamp(20px,2.4vw,26px)] leading-snug font-semibold text-n-900 text-balance">
            None of this is a people problem — it&apos;s a systems problem.
            That&apos;s exactly where Vrattiks comes in.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
