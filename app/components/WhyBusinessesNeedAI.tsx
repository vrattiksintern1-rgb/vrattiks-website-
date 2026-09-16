import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon, { type IconName } from "./ui/Icon";

const problems: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "repeat",
    title: "Manual, repetitive work",
    description: "Your team spends hours a week on tasks a system could handle instead.",
  },
  {
    icon: "clock",
    title: "Slow response times",
    description: "Customers wait for replies that could have gone out the moment they asked.",
  },
  {
    icon: "mailX",
    title: "Leads that never get followed up",
    description: "Without a system, follow-up depends on someone remembering to do it.",
  },
  {
    icon: "puzzle",
    title: "Disconnected processes",
    description: "Sales, support, and operations run on separate tools that don't talk to each other.",
  },
  {
    icon: "gauge",
    title: "Operational inefficiency",
    description: "The same information gets entered, checked, and re-entered by hand.",
  },
  {
    icon: "eyeOff",
    title: "Poor visibility",
    description: "It's hard to know what's actually happening across the business day to day.",
  },
];

export default function WhyBusinessesNeedAI() {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="The Problem"
          title="Growing a business shouldn't mean drowning in busywork"
          description="Most of this isn't a big, dramatic failure — it's small delays and manual steps that quietly add up, cost leads, and wear down a team."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {problems.map((problem, i) => (
            <Reveal
              key={problem.title}
              delay={(i % 3) * 0.08}
              className="rounded-lg border border-n-100 bg-n-0 p-5 shadow-[var(--shadow-sm)] md:p-6"
            >
              <Icon name={problem.icon} className="h-6 w-6 text-brand-secondary" />
              <h3 className="mt-4 text-[15.5px] font-display font-semibold text-n-900">
                {problem.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.55] text-n-500">
                {problem.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 md:mt-12">
          <p className="max-w-2xl text-[16px] leading-[1.65] font-medium text-n-800">
            None of this is a people problem — it&apos;s a systems problem. That&apos;s
            exactly where Vrattiks comes in.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
