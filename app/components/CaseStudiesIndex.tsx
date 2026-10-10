import Link from "next/link";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import { CornerAccent } from "./CaseStudyChips";
import {
  caseStudiesIn,
  countByStatus,
  listedCaseStudies,
  overviewOrder,
  sectionFor,
} from "@/app/lib/case-studies";

/* /case-studies opener, after the reference's "Index." slide (layout only):
   a big heading with small tag pills, numbered anchor rows with a short
   descriptor and a live count, then a row of stat tiles.

   EVERY NUMBER IS COUNTED FROM app/lib/case-studies.ts (vrattiks-standards
   §3): real projects only — drafts and samples are excluded by
   listedCaseStudies — so adding an entry updates the page. No percentages,
   time savings or results anywhere.

   Tiles differ by tone, not colour (CLAUDE.md Design Taste; tokens from
   docs/index.html §3): graphite, lavender, outlined, tint. No gradient here
   — the page's one gradient moment is the FinalCTA (vrattiks-design-system
   §3). Motion: stat tiles settle in, staggered, once (kylezantos-design §1);
   the H1 never fades (§1b). */

const pillTone = {
  website: "bg-brand-primary text-brand-graphite",
  custom: "bg-brand-secondary text-n-0",
  iot: "border border-n-300 text-n-800",
} as const;

export default function CaseStudiesIndex() {
  const total = listedCaseStudies.length;
  const stats = [
    { value: total, label: total === 1 ? "Real project on this page" : "Real projects on this page", tone: "bg-brand-graphite text-n-0", sub: "text-n-300" },
    { value: countByStatus("Client project"), label: "Client projects", tone: "bg-brand-primary text-brand-graphite", sub: "text-brand-graphite" },
    { value: countByStatus("Internal tool"), label: "Internal tool", tone: "border border-n-200 bg-n-0 text-n-900", sub: "text-n-600" },
    { value: countByStatus("Final setup in progress"), label: "In final setup", tone: "bg-n-100 text-n-900", sub: "text-n-700" },
  ].filter((s) => s.value > 0);

  return (
    <Section tone="paper" labelledBy="case-studies-heading" className="pb-10 sm:pb-12 md:pb-14">
      <CornerAccent className="top-6 right-4 sm:right-6 md:top-8 md:right-10" />
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            {/* Not wrapped in Reveal: the page's H1 is readable the instant
                it paints (kylezantos-design §1b). */}
            <h1
              id="case-studies-heading"
              className="text-[44px] leading-[1.02] tracking-[-0.035em] font-display font-bold text-n-900 sm:text-[56px] md:text-[72px]"
            >
              Work we&apos;ve built.
            </h1>
            <ul aria-label="Project categories" className="mt-6 flex flex-wrap gap-2">
              {overviewOrder.map((cat) => {
                const s = sectionFor(cat);
                return (
                  <li key={cat}>
                    <Link
                      href={`#${s.id}`}
                      className={`focus-glow inline-flex min-h-8 items-center rounded-full px-3.5 text-[13px] font-semibold ${pillTone[cat]}`}
                    >
                      {s.shortLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 max-w-xl text-body-lg text-n-700">
              Website and custom automation projects, each with what it does and what it&apos;s made
              with. IoT projects are in development.
            </p>
            {/* The page's honest qualifier, said once (vrattiks-standards §3). */}
            <p className="mt-3 max-w-md text-[14px] leading-[1.6] text-n-600">
              Results are added to a project only once they have been measured with the client.
            </p>
          </div>

          {/* Numbered index rows — jump links to the three sections. */}
          <nav aria-label="Case study sections" className="lg:pt-3">
            <ol className="border-t border-n-200">
              {overviewOrder.map((cat, i) => {
                const s = sectionFor(cat);
                const n = caseStudiesIn(cat).length;
                return (
                  <li key={cat} className="border-b border-n-200">
                    <Link
                      href={`#${s.id}`}
                      className="focus-glow group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-sm py-4 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-4"
                    >
                      <span className="text-[14px] font-semibold text-brand-secondary tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[17px] font-semibold text-n-900">{s.label}</span>
                        <span className="mt-0.5 block text-[14px] leading-[1.5] text-n-600">{s.description}</span>
                      </span>
                      <span className="flex items-center gap-2 text-[13.5px] whitespace-nowrap text-n-700">
                        {n === 0 ? "In development" : `${n} ${n === 1 ? "project" : "projects"}`}
                        <Icon name="arrowRight" className="h-4 w-4 text-brand-secondary transition-transform duration-150 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <ul aria-label="Projects at a glance" className="mt-10 grid grid-cols-2 gap-3 md:mt-12 lg:grid-cols-4 lg:gap-4">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.label} from="settle" delay={i * 0.06} className={`rounded-lg px-5 py-5 md:px-6 md:py-6 ${s.tone}`}>
              <span className="block font-display text-[40px] leading-none font-bold tabular-nums md:text-[48px]">{s.value}</span>
              <span className={`mt-2 block text-[14px] font-medium ${s.sub}`}>{s.label}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
