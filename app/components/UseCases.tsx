import Link from "next/link";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import { useCases } from "@/app/lib/content";

const rows = [
  { key: "problem" as const, label: "Problem" },
  { key: "solution" as const, label: "Solution" },
  { key: "benefit" as const, label: "Benefit" },
];

/* The page's one full-bleed graphite band. Comparison is the job here, so the
   three use cases are rows of a Problem / Solution / Benefit matrix rather
   than three equal cards (CLAUDE.md Design Taste, reference 1). Benefit is
   the emphasised column, marked by ONE device only: a brand-primary left edge.

   Below md each row stacks and its dt labels become visible; at md+ the dt
   labels go sr-only and the aria-hidden header row carries them visually.
   Text sits on the muted n-200/n-300 ramp, borders at n-0/10. */
const columns = "md:grid-cols-[minmax(0,1.1fr)_minmax(0,3fr)] md:gap-10";

/* Optional props let /industries reframe the matrix as "the same problems in
   every industry". Home passes none. */
export default function UseCases({
  title = "Common business problems, solved end-to-end",
  description = "Real situations most growing businesses run into — and how automation changes the outcome.",
  headingId,
}: {
  title?: string;
  description?: string;
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className="relative isolate overflow-hidden bg-brand-graphite py-10 md:py-16">
      {/* Same grid motif as the Hero, at low white alpha, plus a faint glow
          so the dark band has depth instead of a flat fill. */}
      <div aria-hidden="true" className="bg-grid-fade-dark pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="wash-brand pointer-events-none absolute -top-40 left-1/2 -z-10 h-[360px] w-[720px] -translate-x-1/2 opacity-30"
      />
      <Container>
        <SectionHeading
          id={headingId}
          eyebrow="Use Cases"
          title={title}
          description={description}
          tone="dark"
        />

        <div className="mt-10 border-t border-n-0/10 md:mt-14">
          <div
            aria-hidden="true"
            className={`hidden border-b border-n-0/10 py-4 font-body text-[12px] tracking-[0.08em] uppercase md:grid ${columns}`}
          >
            <span />
            <span className="grid grid-cols-3 gap-8">
              {rows.map((row) => (
                <span
                  key={row.key}
                  className={row.key === "benefit" ? "pl-[26px] text-brand-primary" : "text-n-400"}
                >
                  {row.label}
                </span>
              ))}
            </span>
          </div>

          {useCases.map((useCase, i) => (
            <Reveal
              key={useCase.slug}
              delay={i * 0.1}
              className={`group relative grid grid-cols-1 gap-6 border-b border-n-0/10 py-8 md:py-10 ${columns}`}
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-n-0/15 text-brand-primary">
                  <Icon name={useCase.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[20px] leading-[1.25] font-display font-semibold text-n-0">
                  {/* Stretched link: the ::after covers the whole row, so the
                      row is one click target with one tab stop. */}
                  <Link
                    href={`/use-cases/${useCase.slug}`}
                    className="focus-glow rounded-sm transition-colors duration-150 group-hover:text-brand-primary after:absolute after:inset-0"
                  >
                    {useCase.name}
                  </Link>
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-primary">
                  See how it works
                  <Icon
                    name="arrowUpRight"
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>

              <dl className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
                {rows.map((row) => (
                  <div
                    key={row.key}
                    className={row.key === "benefit" ? "border-l-2 border-brand-primary pl-4 md:pl-6" : ""}
                  >
                    <dt
                      className={`font-body text-[11.5px] tracking-[0.08em] uppercase md:sr-only ${
                        row.key === "benefit" ? "text-brand-primary" : "text-n-400"
                      }`}
                    >
                      {row.label}
                    </dt>
                    <dd
                      className={`mt-1.5 text-[14.5px] leading-[1.6] md:mt-0 ${
                        row.key === "benefit" ? "text-n-200" : "text-n-300"
                      }`}
                    >
                      {useCase[row.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
