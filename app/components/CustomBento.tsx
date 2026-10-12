import Link from "next/link";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import IllustrativeTag from "./IllustrativeTag";
import { ArrowCircle, Chips, StatusPill, type Surface } from "./CaseStudyChips";
import { StepChain } from "./CaseStudyVisuals";
import { cardSteps, caseStudiesIn, type CaseStudy } from "@/app/lib/case-studies";

/* Custom Projects — bento B, "mirrored slabs": each project is one row of a
   wide main tile (8 cols) and a narrow side tile (4 cols), and the rows
   mirror — main left then main right — so the section reads as a
   zig-zag of slabs, not a grid. Main tiles alternate graphite / outlined,
   side tiles alternate violet / lavender: tone changes, no new colour
   (docs/index.html §3; CLAUDE.md Design Taste ref 2 for the dark slab's
   muted n-300 ramp and n-0/10 hairlines).

   Different from the Website bento (tower + ledge) and the IoT bento (tall
   columns), and from every pattern on the site (taste-skill §4).

   The side tile is the link to the project's detail page.

   Motion: each slab slides in from its own side, once (kylezantos-design
   §1) — direction follows the mirroring, so it carries meaning. */

function Main({ study, dark }: { study: CaseStudy; dark: boolean }) {
  const surface: Surface = dark ? "dark" : "light";
  const steps = cardSteps(study);
  return (
    <article
      id={study.slug}
      aria-labelledby={`${study.slug}-title`}
      className={`grid h-full scroll-mt-20 grid-cols-1 gap-8 rounded-xl p-6 md:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 ${
        dark ? "bg-brand-graphite" : "border border-n-200 bg-n-0"
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className={`font-body text-label font-semibold tracking-[0.14em] uppercase ${dark ? "text-brand-primary" : "text-brand-secondary"}`}>
            {study.kind}
          </p>
        </div>
        <h3
          id={`${study.slug}-title`}
          className={`mt-2 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold md:text-[28px] ${dark ? "text-n-0" : "text-n-900"}`}
        >
          {study.title}
        </h3>
        <p className={`mt-1 text-[14px] ${dark ? "text-n-300" : "text-n-600"}`}>{study.clientName}</p>
        <p className={`mt-4 text-[15.5px] leading-[1.6] ${dark ? "text-n-200" : "text-n-700"}`}>{study.summary.text}</p>
        <Chips items={study.tags.map((t) => t.text)} surface={surface} label="Tags" className="mt-5" />
        <div className="mt-5">
          <StatusPill value={study.statusLabel} surface={surface} />
        </div>
      </div>

      {steps.length ? (
        <figure className="min-w-0">
          <IllustrativeTag />
          <div className="mt-4">
            <StepChain steps={steps.map((s) => s.label)} tone={dark ? "dark" : "light"} label={`How the ${study.title} works, in order`} />
          </div>
          <figcaption className={`mt-3 text-[13px] leading-[1.5] ${dark ? "text-n-300" : "text-n-600"}`}>
            The steps it runs, in order.
          </figcaption>
        </figure>
      ) : null}
    </article>
  );
}

/* Side tile: the step count, and the link to the detail page. */
function Side({ study, violet }: { study: CaseStudy; violet: boolean }) {
  const steps = cardSteps(study).length;
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`focus-glow group flex h-full flex-col rounded-xl p-6 transition-shadow duration-150 hover:shadow-[var(--shadow-glow)] md:p-7 ${
        violet ? "bg-brand-secondary text-n-0" : "bg-brand-primary text-brand-graphite"
      }`}
    >
      <span className="flex items-start justify-between gap-4">
        {steps ? (
          <span>
            <span className="block font-display text-[48px] leading-none font-bold tabular-nums">{steps}</span>
            <span className="mt-2 block text-[15px] font-semibold">steps it runs, in order</span>
          </span>
        ) : (
          <span className="text-[15px] font-semibold">{study.kind}</span>
        )}
        <ArrowCircle surface={violet ? "violet" : "lavender"} />
      </span>
      <span className="mt-auto pt-8 text-[15px] font-semibold underline-offset-4 group-hover:underline">
        Read the case study<span className="sr-only">: {study.title}</span>
      </span>
    </Link>
  );
}

export default function CustomBento({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  const projects = caseStudiesIn("custom");
  const headingId = `${id}-heading`;

  return (
    <Section tone="paper" id={id} labelledBy={headingId} className="scroll-mt-16 md:scroll-mt-20">
      <Container>
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
        {/* Description rendered here in n-600, not via SectionHeading's
            n-500, which measures 4.32:1 on the tint band (needs 4.5 —
            vrattiks-accessibility "Contrast"). Shared component untouched. */}
        <p className="mt-4 max-w-2xl text-body-lg text-n-600">{description}</p>
        <div className="mt-10 flex flex-col gap-4 md:mt-12 lg:gap-5">
          {projects.map((study, i) => {
            const flipped = i % 2 === 1;
            return (
              <div key={study.slug} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
                <Reveal from={flipped ? "end" : "start"} className={`lg:col-span-8 ${flipped ? "lg:order-2" : ""}`}>
                  <Main study={study} dark={!flipped} />
                </Reveal>
                <Reveal from={flipped ? "start" : "end"} delay={0.06} className={`lg:col-span-4 ${flipped ? "lg:order-1" : ""}`}>
                  <Side study={study} violet={!flipped} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
