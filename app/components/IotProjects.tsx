import Container from "./ui/Container";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { caseStudiesIn, hasConfirmedClient, type CaseStudy } from "@/app/lib/case-studies";

/* IoT Projects — the page's graphite band (CLAUDE.md Design Taste, ref 2),
   placed between the two light sections. Its one idea: each project is a
   spec sheet, read like a drawing — a sheet code, crop marks at the corners,
   tracked field labels and hairline rules on the muted n-0/10 ramp. Text sits
   on n-200/n-300, never n-0 for body.

   Static by design: the stack motif and the blueprint grid never move
   (kylezantos-design §1b, nothing loops). The only motion is the sheet's top
   rule drawing in once (Reveal `rule`) while its content fades without
   travel (Reveal `fade`) — different from the slides above and the settles
   below.

   NO IoT PROJECTS HAVE BEEN PROVIDED (vrattiks-standards §3). Until an entry
   with `category: "iot"` exists in case-studies.ts, the section shows one
   "in development" sheet listing what each write-up will cover. Nothing in it
   describes a project. */

/* The rows every IoT sheet is organised around — also the empty sheet's
   outline, so the placeholder shows the real structure entries drop into. */
const sheetFields = [
  "Client / industry",
  "The problem",
  "Hardware & sensors",
  "Connectivity",
  "Software & dashboard",
  "Results",
];

/* Crop marks at the four corners — the blueprint cue. Decorative. */
function CropMarks() {
  const mark = "absolute h-3 w-3 border-brand-primary/60";
  return (
    <span aria-hidden="true">
      <span className={`${mark} -top-px -left-px border-t border-l`} />
      <span className={`${mark} -top-px -right-px border-t border-r`} />
      <span className={`${mark} -bottom-px -left-px border-b border-l`} />
      <span className={`${mark} -right-px -bottom-px border-r border-b`} />
    </span>
  );
}

/* Abstract hardware stack: three isometric plates, the top one edged in
   brand-primary with a chip outline on it. No labels — it depicts the
   category, not any particular project. Static SVG, aria-hidden. */
function StackMotif({ className = "" }: { className?: string }) {
  const plates = [100, 50, 0];
  return (
    <svg viewBox="0 0 240 222" fill="none" aria-hidden="true" className={className}>
      {plates.map((y, i) => {
        const top = i === plates.length - 1;
        const stroke = top ? "stroke-brand-primary" : "stroke-n-0/25";
        return (
          <g key={y} strokeWidth={1} strokeLinejoin="round">
            <path
              d={`M10 ${y + 55} L120 ${y + 110} L120 ${y + 120} L10 ${y + 65} Z`}
              className={`fill-brand-graphite ${stroke}`}
            />
            <path
              d={`M120 ${y + 110} L230 ${y + 55} L230 ${y + 65} L120 ${y + 120} Z`}
              className={`fill-brand-graphite ${stroke}`}
            />
            <path
              d={`M120 ${y} L230 ${y + 55} L120 ${y + 110} L10 ${y + 55} Z`}
              className={`fill-brand-graphite ${stroke}`}
            />
            {top ? (
              <>
                <path
                  d={`M120 ${y + 33} L164 ${y + 55} L120 ${y + 77} L76 ${y + 55} Z`}
                  className="stroke-brand-primary"
                />
                <path
                  d={`M98 ${y + 44} L90 ${y + 40} M109 ${y + 38.5} L101 ${y + 34.5} M131 ${y + 38.5} L139 ${y + 34.5} M142 ${y + 44} L150 ${y + 40} M98 ${y + 66} L90 ${y + 70} M109 ${y + 71.5} L101 ${y + 75.5} M131 ${y + 71.5} L139 ${y + 75.5} M142 ${y + 66} L150 ${y + 70}`}
                  className="stroke-brand-primary/70"
                />
              </>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function SheetFrame({
  code,
  status,
  children,
}: {
  code: string;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-lg border border-n-0/10 bg-n-0/[0.03]">
      <CropMarks />
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <span className="font-body text-label font-semibold uppercase tracking-[0.14em] text-n-300">
          {code}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-n-0/15 px-3 py-1 text-[12.5px] font-medium text-n-200">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
          {status}
        </span>
      </div>
      <Reveal from="rule" className="h-px origin-left bg-n-0/15" />
      <Reveal from="fade" delay={0.1} className="px-5 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
        {children}
      </Reveal>
    </div>
  );
}

function ProjectSheet({ study, n }: { study: CaseStudy; n: number }) {
  const titleId = `${study.slug}-title`;
  const rows = [
    ...(hasConfirmedClient(study) || study.industry
      ? [{ label: "Client / industry", value: [hasConfirmedClient(study) ? study.clientName : null, study.industry?.name].filter(Boolean).join(" · ") }]
      : []),
    ...(study.challenge ? [{ label: "The problem", value: study.challenge }] : []),
    ...(study.specs ?? []),
    ...(study.solution ? [{ label: "Solution", value: study.solution }] : []),
    ...(study.builtWith?.length ? [{ label: "Built with", value: study.builtWith.join(", ") }] : []),
  ];

  return (
    <article id={study.slug} aria-labelledby={titleId} className="scroll-mt-36 md:scroll-mt-40">
      <SheetFrame code={`Sheet IOT-${String(n).padStart(2, "0")}`} status={study.kind}>
        <h3
          id={titleId}
          className="text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-0 md:text-[28px]"
        >
          {study.title}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-[1.65] text-n-300">{study.summary}</p>
        {rows.length ? (
          <dl className="mt-8 border-t border-n-0/10">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1 border-b border-n-0/10 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="font-body text-label font-semibold uppercase tracking-[0.14em] text-n-300">
                  {row.label}
                </dt>
                <dd className="text-[15px] leading-[1.6] text-n-100">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {study.results?.length ? (
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {study.results.map((r) => (
              <li key={r.label}>
                <span className="block font-display text-[32px] leading-none font-bold text-n-0">
                  {r.value}
                </span>
                <span className="mt-1 block text-[13px] text-n-300">{r.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </SheetFrame>
    </article>
  );
}

function EmptySheet() {
  return (
    <SheetFrame code="Sheet IOT-00" status="In development">
      <h3 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-0 md:text-[28px]">
        Write-ups in progress
      </h3>
      <p className="mt-3 max-w-xl text-[15px] leading-[1.65] text-n-300">
        Our IoT case studies will appear here as each one is ready to share.
        Every write-up covers the same ground:
      </p>
      <ul className="mt-8 border-t border-n-0/10">
        {sheetFields.map((field, i) => (
          <li
            key={field}
            className="grid grid-cols-[40px_minmax(0,1fr)] items-baseline border-b border-n-0/10 py-4"
          >
            <span aria-hidden="true" className="font-body text-label font-semibold tracking-[0.14em] text-n-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] text-n-200">{field}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {/* Not gradient: the FinalCTA below is the page's one primary. */}
        <Button href="/contact" variant="inverse">
          Discuss an IoT project
        </Button>
      </div>
    </SheetFrame>
  );
}

export default function IotProjects({
  id,
  index,
  label,
  title,
  description,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
}) {
  const projects = caseStudiesIn("iot");
  const headingId = `${id}-heading`;

  return (
    <Section
      tone="dark"
      id={id}
      labelledBy={headingId}
      className="scroll-mt-30 md:scroll-mt-34"
    >
      {/* Static blueprint grid at low white alpha — same utility as the Use
          Cases band, faded from the top so it stays texture. */}
      <div aria-hidden="true" className="bg-grid-fade-dark pointer-events-none absolute inset-0 -z-10" />
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="md:col-span-5">
          <SectionHeading
            id={headingId}
            tone="dark"
            eyebrow={`${index} · ${label}`}
            title={title}
            description={description}
          />
          <StackMotif className="mt-12 hidden w-full max-w-[280px] sm:block md:mt-16" />
        </div>

        <div className="flex flex-col gap-4 md:col-span-7">
          {projects.length ? (
            projects.map((study, i) => <ProjectSheet key={study.slug} study={study} n={i + 1} />)
          ) : (
            <EmptySheet />
          )}
        </div>
      </Container>
    </Section>
  );
}
