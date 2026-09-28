import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const problems: { title: string; description: string }[] = [
  {
    title: "Manual, repetitive work",
    description: "Your team spends hours a week on tasks a system could handle instead.",
  },
  {
    title: "Slow response times",
    description: "Customers wait for replies that could have gone out the moment they asked.",
  },
  {
    title: "Leads that never get followed up",
    description: "Without a system, follow-up depends on someone remembering to do it.",
  },
  {
    title: "Disconnected processes",
    description: "Sales, support, and operations run on separate tools that don't talk to each other.",
  },
  {
    title: "Operational inefficiency",
    description: "The same information gets entered, checked, and re-entered by hand.",
  },
  {
    title: "Poor visibility",
    description: "You can't easily see how many leads came in today, who got a reply, or which ones went cold.",
  },
];

/* A numbered ledger of full-width rows, not another icon grid: the KPI
   ledger above and the Services grid below both lead with icons, so this
   section drops them and lets the numbering carry the structure (CLAUDE.md
   Design Taste, slop tell 3). The one emphasised moment is the verdict at
   the end, marked by a single device — a brand-secondary left edge. */
const row = "md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.25fr)] md:gap-8";

export default function WhyBusinessesNeedAI() {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="The Problem"
          title="Growing a business shouldn't mean drowning in busywork"
          description="Most of this isn't a big, dramatic failure — it's small delays and manual steps that quietly add up, cost leads, and wear down a team."
        />

        <ol className="mt-10 border-b border-n-200 md:mt-14">
          {problems.map((problem, i) => (
            <Reveal
              key={problem.title}
              as="li"
              delay={i * 0.05}
              className={`grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-2 border-t border-n-200 py-6 md:items-baseline md:py-7 ${row}`}
            >
              <span className="font-mono text-[13px] leading-[1.6] text-n-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[18px] leading-[1.3] font-display font-semibold text-n-900 md:text-[20px]">
                {problem.title}
              </h3>
              <p className="col-start-2 text-[14.5px] leading-[1.6] text-n-600 md:col-start-auto">
                {problem.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 max-w-3xl border-l-2 border-brand-secondary pl-5 md:mt-16 md:pl-7">
          <p className="text-[24px] leading-[1.25] tracking-[-0.02em] font-display font-semibold text-n-900 md:text-[30px]">
            None of this is a people problem — it&apos;s a systems problem.
          </p>
          <p className="mt-3 text-body-lg text-n-600">
            That&apos;s exactly where Vrattiks comes in.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
