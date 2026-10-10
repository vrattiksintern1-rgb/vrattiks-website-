import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import IllustrativeTag from "./IllustrativeTag";
import { Chips, StatusPill, type Surface } from "./CaseStudyChips";
import { StepChain, ToolHubVisual } from "./CaseStudyVisuals";
import { caseStudiesIn, clientLabelOf, type CaseStudy } from "@/app/lib/case-studies";

/* Custom Projects — bento B, "mirrored slabs": each project is one row of a
   wide main tile (8 cols) and a narrow side tile (4 cols), and the rows
   mirror — main left then main right — so the section reads as a
   zig-zag of slabs, not a grid. Main tiles alternate graphite / outlined,
   side tiles alternate violet / lavender: tone changes, no new colour
   (docs/index.html §3; CLAUDE.md Design Taste ref 2 for the dark slab's
   muted n-300 ramp and n-0/10 hairlines).

   Different from the Website bento (tower + ledge) and the IoT bento (tall
   columns), and from every pattern on the site (taste-skill §4).

   None of these projects has a publishable detail page yet, so no card is
   a link — each shows its status pill (user brief 2026-10-10). The AI
   Sales Assistant makes no results claim: its setup isn't final.

   Motion: each slab slides in from its own side, once (kylezantos-design
   §1) — direction follows the mirroring, so it carries meaning. */

function Main({ study, dark }: { study: CaseStudy; dark: boolean }) {
  const o = study.overview!;
  const client = clientLabelOf(study);
  const surface: Surface = dark ? "dark" : "light";
  return (
    <article
      id={study.slug}
      aria-labelledby={`${study.slug}-title`}
      className={`grid h-full scroll-mt-20 grid-cols-1 gap-8 rounded-xl p-6 md:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 ${
        dark ? "bg-brand-graphite" : "border border-n-200 bg-n-0"
      }`}
    >
      <div className="min-w-0">
        <p className={`font-body text-label font-semibold tracking-[0.14em] uppercase ${dark ? "text-brand-primary" : "text-brand-secondary"}`}>
          {study.kind}
        </p>
        <h3
          id={`${study.slug}-title`}
          className={`mt-2 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold md:text-[28px] ${dark ? "text-n-0" : "text-n-900"}`}
        >
          {study.title}
        </h3>
        <p className={`mt-1 text-[14px] ${dark ? "text-n-300" : "text-n-600"}`}>{client}</p>
        <p className={`mt-4 text-[15.5px] leading-[1.6] ${dark ? "text-n-200" : "text-n-700"}`}>{o.summary}</p>
        <Chips items={o.tech} surface={surface} label="Built with" className="mt-5" />
        {study.statusPill ? (
          <div className="mt-5">
            <StatusPill value={study.statusPill} surface={surface} />
          </div>
        ) : null}
      </div>

      <figure className="min-w-0">
        <IllustrativeTag />
        <div className="mt-4">
          {o.visual === "tool-hub" ? (
            <ToolHubVisual
              overview={o}
              label={`Illustrative diagram of the tools in the ${study.title}: ${o.tech.join(", ")}. It shows what is connected, not the order of steps.`}
            />
          ) : o.steps?.length ? (
            <StepChain steps={o.steps} tone={dark ? "dark" : "light"} label={`How the ${study.title} works, in order`} />
          ) : null}
        </div>
        <figcaption className={`mt-3 text-[13px] leading-[1.5] ${dark ? "text-n-300" : "text-n-600"}`}>
          {o.visual === "tool-hub" ? "The parts it's built from, not the order of steps." : "The steps it runs, in order."}
        </figcaption>
      </figure>
    </article>
  );
}

/* Side tile: a count when the project has ordered steps, otherwise the
   project's features as a short list. */
function Side({ study, violet }: { study: CaseStudy; violet: boolean }) {
  const o = study.overview!;
  const text = violet ? "text-n-0" : "text-brand-graphite";
  return (
    <div className={`flex h-full flex-col rounded-xl p-6 md:p-7 ${violet ? "bg-brand-secondary" : "bg-brand-primary"} ${text}`}>
      {o.steps?.length ? (
        <>
          <span className="block font-display text-[48px] leading-none font-bold tabular-nums">{o.steps.length}</span>
          <span className="mt-2 block text-[15px] font-semibold">steps it runs, in order</span>
          <Chips items={o.features} surface={violet ? "violet" : "lavender"} label={`${study.title} features`} className="mt-auto pt-6" />
        </>
      ) : (
        <>
          <p className="text-[15px] font-semibold">What it does</p>
          <ul aria-label={`${study.title} features`} className="mt-3 flex flex-col gap-2.5">
            {o.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[15px] leading-[1.45]">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          {study.statusPill === "Final setup in progress" ? (
            <p className="mt-auto pt-6 text-[14px] leading-[1.5]">
              No results are shown until it&apos;s running and the client has measured them.
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}

export default function CustomBento({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  const projects = caseStudiesIn("custom").filter((s) => s.overview);
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
