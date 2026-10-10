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

/* Stacking cards: long full-width cards that each go sticky a little lower
   than the one before, so as you scroll each new card slides up over the
   last and the six pile into a stack. Pure CSS sticky — no JS, no
   scroll-linked animation, so nothing to switch off for reduced motion.
   Needs no `overflow-hidden` on any ancestor (it would kill sticky) and
   opaque card fills (so each card covers the one beneath).
   Cards stay uniform white (client request, 2026-09-22 note in memory.md);
   the one emphasised moment is still the verdict at the end, marked by a
   single device — a brand-secondary left edge. */
const STACK_STEP = 14; // px each card docks below the previous one

export default function WhyBusinessesNeedAI() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <SectionHeading
          eyebrow="The Problem"
          title="Growing a business shouldn't mean drowning in busywork"
          description="Most of this isn't a big, dramatic failure — it's small delays and manual steps that quietly add up, cost leads, and wear down a team."
        />

        {/* --stack-top = sticky header height (64 / 80px) + breathing room.
            The gap is the scroll distance between one card docking and the
            next arriving. */}
        <ol className="mt-10 flex flex-col gap-7 [--stack-top:5rem] md:mt-12 md:gap-10 md:[--stack-top:7rem]">
          {problems.map((problem, i) => (
            <li
              key={problem.title}
              className="sticky grid grid-cols-1 gap-y-3 rounded-md border border-n-200 bg-n-0 p-6 md:grid-cols-[96px_minmax(0,1fr)_minmax(0,1.25fr)] md:items-center md:gap-x-8 md:px-10 md:py-6"
              style={{
                top: `calc(var(--stack-top) + ${i * STACK_STEP}px)`,
                boxShadow: "var(--shadow-md)",
              }}
            >
              <span
                aria-hidden="true"
                className="font-display text-[32px] leading-none font-semibold tracking-[-0.03em] text-brand-secondary md:text-[48px]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[19px] leading-[1.3] font-display font-semibold text-n-900 md:text-[22px]">
                {problem.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-n-600">{problem.description}</p>
            </li>
          ))}
        </ol>

        <Reveal className="mt-10 max-w-3xl border-l-2 border-brand-secondary pl-5 md:mt-12 md:pl-7">
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
