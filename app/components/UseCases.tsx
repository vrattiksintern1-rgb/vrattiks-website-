import Link from "next/link";
import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import Button from "./ui/Button";
import { useCases } from "@/app/lib/content";

/**
 * Structure: a real Problem → Solution → Benefit matrix on a dark band.
 *
 * Two decisions, both from the Design Taste section in CLAUDE.md:
 *  - Comparison is the job here, so the layout is a matrix rather than three
 *    marketing cards (Stripe translation). The three columns are labelled once
 *    in mono and read across; on mobile each row restates its own labels.
 *  - This is the mid-page dark band that resets the eye after a run of light
 *    sections (Linear translation). Body text sits on n-300, never n-0, and
 *    borders are n-0 at low alpha.
 */
const columns = [
  { key: "problem" as const, label: "Problem" },
  { key: "solution" as const, label: "Solution" },
  { key: "benefit" as const, label: "Benefit" },
];

export default function UseCases() {
  return (
    <Section
      id="use-cases"
      tone="dark"
      labelledBy="use-cases-heading"
      className="bg-noise bg-grid-fine-dark"
    >
      <Container>
        <SectionHeading
          id="use-cases-heading"
          eyebrow="Use Cases"
          tone="dark"
          title="Common business problems, solved end-to-end"
          description="Real situations most growing businesses run into — and how automation changes the outcome."
        />

        {/* Column headers — desktop only; each row repeats them when stacked */}
        <div
          aria-hidden="true"
          className="mt-16 hidden grid-cols-[1.1fr_1fr_1fr_1fr] gap-8 border-b border-n-0/15 pb-4 md:grid md:mt-20"
        >
          <span />
          {columns.map((column) => (
            <span
              key={column.key}
              className="font-mono text-micro tracking-[0.12em] text-n-400 uppercase"
            >
              {column.label}
            </span>
          ))}
        </div>

        <ul className="md:border-t-0">
          {useCases.map((useCase, i) => (
            <Reveal as="li" key={useCase.slug} delay={i * 0.08}>
              <Link
                href={`/use-cases/${useCase.slug}`}
                /* Without this the link's accessible name is the whole row —
                   the title plus three full sentences — which is what a screen
                   reader announces in a links list. The row text stays in the
                   a11y tree and is still read in browse mode; only the NAME is
                   shortened to the thing the link actually goes to. */
                aria-label={`${useCase.name} use case`}
                className="focus-glow group grid grid-cols-1 gap-6 rounded-md border-t border-n-0/15 py-8 transition-colors duration-150 hover:bg-n-0/[0.04] md:grid-cols-[1.1fr_1fr_1fr_1fr] md:gap-8 md:py-10"
              >
                {/* <div>, not <span> — a <span> cannot legally contain an <h3>. */}
                <div className="flex items-start justify-between gap-4 md:flex-col md:justify-start">
                  <h3 className="font-display text-h3 leading-snug font-semibold text-n-0">
                    {useCase.name}
                  </h3>
                  <Icon
                    name="arrowUpRight"
                    className="mt-1 h-5 w-5 shrink-0 text-n-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-primary md:mt-6"
                  />
                </div>

                {columns.map((column) => (
                  <span key={column.key} className="block">
                    <span className="font-mono text-micro tracking-[0.12em] text-n-400 uppercase md:hidden">
                      {column.label}
                    </span>
                    <span className="mt-2 block text-ui leading-normal text-n-300 md:mt-0">
                      {useCase[column.key]}
                    </span>
                  </span>
                ))}
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* vrattiks-architecture §5: "Home → links out to Services, Industries,
            Use Cases, Case Studies overviews." The rows below link to the three
            use-case DETAIL pages, but this section had no link to the
            `/use-cases` overview itself — the only one of the three catalogue
            sections missing it (ServicesOverview and Industries both carry the
            equivalent outline action). `onDark` rather than `outline` because
            brand-secondary fails contrast on the graphite band (see Button.tsx). */}
        <Reveal className="mt-14 flex justify-center md:mt-16">
          <Button href="/use-cases" variant="onDark">
            All use cases
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
