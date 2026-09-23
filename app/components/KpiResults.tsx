import Container from "./ui/Container";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import Eyebrow from "./ui/Eyebrow";

/**
 * ⚠ CONTENT DECISION — read before editing.
 *
 * This section previously rendered "60%", "3x", "0" and "24/7" as 76px display
 * numerals with a disclaimer line underneath. Those figures were never measured;
 * they were layout placeholders. A fabricated number set at display scale is a
 * stronger claim than the empty "coming soon" blocks that were just removed from
 * this page, and vrattiks-standards §3 forbids inventing stats outright.
 *
 * So the section keeps its job — showing what changes after automation — but
 * states outcomes in words instead of invented precision. Nothing here asserts a
 * quantity we cannot source.
 *
 * When real, measured client results exist: restore numerals here using the
 * metric-in-context pattern (number + what it measures + over what period),
 * and put the CountUp component in app/components/ui/ back to work.
 *
 * ⚠ TYPE-SCALE DECISION (2026-09-21). This H2 was clamp(30px,4.4vw,46px) —
 * the largest on the page. With the Hero H1 capped at 48px that made the two
 * effectively the same size and the page had no display-scale jump at all.
 * The H1 is now 68px and this is back on the standard section step
 * (clamp(28px,3.4vw,40px)). Do not re-inflate it: the band already carries
 * enough weight from being the only inverted surface this far up the page.
 */
const outcomes: { headline: string; label: string; description: string }[] = [
  {
    headline: "Nights and weekends stop being gaps",
    label: "Always-on coverage",
    description:
      "Calls and messages get answered outside office hours and on holidays.",
  },
  {
    headline: "Follow-up stops depending on memory",
    label: "Nothing slips",
    description:
      "Every enquiry is captured, tracked, and followed up automatically.",
  },
  {
    headline: "Enquiries hear back in minutes",
    label: "Faster first response",
    description:
      "Not the next working day, and not after someone gets to their inbox.",
  },
  {
    headline: "Your team stops re-typing things",
    label: "Less manual work",
    description:
      "Routine follow-ups, data entry, and hand-offs stop needing a person.",
  },
];

export default function KpiResults() {
  return (
    <Section
      tone="dark"
      size="lg"
      labelledBy="results-heading"
      className="bg-noise bg-grid-fine-dark overflow-hidden"
    >
      {/* Bright hairline on the band's top edge. A dark section that begins on a
          hard colour change reads as a gap; a lit edge reads as a plane. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"
      />

      {/* Single wide wash along the top edge — keeps the band from reading flat black */}
      <div
        aria-hidden="true"
        className="wash-secondary pointer-events-none absolute -top-56 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
      />

      <Container>
        {/* Asymmetric head: statement left, context right and baseline-aligned */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-16">
          <Reveal>
            <Eyebrow tone="dark">Results</Eyebrow>
            <h2
              id="results-heading"
              className="mt-6 font-display text-[clamp(28px,3.4vw,40px)] leading-heading font-bold tracking-[-0.025em] text-n-0 text-balance"
            >
              What changes once the busywork runs itself
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body leading-relaxed text-n-300 md:pb-2">
              The gains show up in ordinary places — an enquiry answered at 11pm,
              a follow-up that happens without anyone remembering it.
            </p>
          </Reveal>
        </div>

        <div className="rule-fade-dark mt-16 md:mt-20" aria-hidden="true" />

        {/* Hairline-divided outcomes — no cards, no boxes. The mono index is what
            makes this a ledger rather than a grid, so it stays even though the
            items aren't sequential. */}
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          {outcomes.map((outcome, i) => (
            <Reveal
              key={outcome.label}
              delay={i * 0.08}
              className="group border-b border-n-0/10 py-10 transition-colors duration-300 last:border-b-0 sm:odd:pr-12 sm:even:border-l sm:even:pl-12 sm:nth-last-[-n+2]:border-b-0 md:py-14"
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="font-mono text-micro tracking-[0.12em] text-n-0/25 tabular-nums transition-colors duration-300 group-hover:text-brand-primary"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="font-mono text-micro tracking-[0.12em] text-brand-primary uppercase">
                  {outcome.label}
                </dt>
              </div>
              <dd className="mt-4 pl-[calc(0.75rem+3ch)]">
                <p className="max-w-[20ch] font-display text-[clamp(22px,2.4vw,26px)] leading-snug font-semibold text-n-0 text-balance">
                  {outcome.headline}
                </p>
                <p className="mt-3 max-w-[38ch] text-ui leading-normal text-n-400">
                  {outcome.description}
                </p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
