import Button from "./ui/Button";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import IllustrativeTag from "./IllustrativeTag";
import { Chips, CornerAccent, StatusPill } from "./CaseStudyChips";
import { LeadFormVisual } from "./CaseStudyVisuals";
import { cardFacts, caseStudiesIn, type WebsiteStudy } from "@/app/lib/case-studies";

/* Website Projects — bento A, "opener tile": each website project is ONE
   large outlined tile on the tint band. Left: category tag, title, client,
   summary, key-fact rows, chips, status and the link to the detail page.
   Right: a visual tile (the lead form, drawn from the entry's own field
   list, labelled Illustrative) with two rounded stat tiles floating over
   its edges. (This layout was a separate section above the bentos until
   2026-10-12; it now lives here, so the project appears once.)

   Clearly unlike the Custom bento (graphite main slab + violet side tile,
   mirrored) and the IoT bento (content card + tall visual card side by
   side): one tile, internal two-column split, overlapping stat tiles
   (user brief; taste-skill §4).

   The stat tiles COUNT the entry's own data (landing pages, required form
   fields); nothing is typed as a number (vrattiks-standards §3).

   The link is a secondary (graphite) pill, not the gradient primary: the
   page's one gradient moment is the FinalCTA (vrattiks-design-system §3).
   Motion: the visual slides in from the end, the stat tiles settle after
   it — once, nothing loops (kylezantos-design §1). */

function OpenerTile({ study }: { study: WebsiteStudy }) {
  const pages = study.landingPages;
  const fields = study.formFields;
  const required = fields.filter((f) => f.required).length;
  const titleId = `${study.slug}-title`;

  /* Rows as before the move: client, industry, then the entry's key facts
     except those the stat tiles already show. A missing field = no row. */
  const facts = [
    { label: "Client", value: study.clientName },
    study.industry ? { label: "Industry", value: study.industry.name } : null,
    ...cardFacts(study).filter((f) => f.label !== "Project type" && f.label !== "Landing pages"),
  ].filter((f) => f !== null);

  const floating = [
    pages.length ? { value: pages.length, label: `landing page variants (${pages.map((p) => p.label).join(", ")})`, tone: "bg-brand-primary text-brand-graphite" } : null,
    required ? { value: required, label: "required form fields", tone: "bg-brand-secondary text-n-0" } : null,
  ].filter((f) => f !== null);

  return (
    /* The listing anchor (/case-studies#slug) */
    <article
      id={study.slug}
      aria-labelledby={titleId}
      className="grid scroll-mt-20 grid-cols-1 gap-10 rounded-xl border border-n-200 bg-n-0 p-6 sm:p-8 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="inline-flex rounded-full bg-brand-graphite px-3.5 py-1.5 font-body text-label font-semibold tracking-[0.12em] text-n-0 uppercase">
            {study.kind}
          </p>
        </div>
        <h3
          id={titleId}
          className="mt-5 text-[28px] leading-[1.1] tracking-[-0.025em] font-display font-bold text-n-900 md:text-[36px]"
        >
          {study.title}
        </h3>
        <p className="mt-4 max-w-xl text-body-lg text-n-700">{study.summary.text}</p>

        <dl className="mt-7 border-t border-n-200">
          {facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-4 border-b border-n-200 py-3">
              <dt className="text-[13px] font-semibold tracking-[0.08em] text-n-600 uppercase">{f.label}</dt>
              <dd className="text-[15px] font-medium break-words text-n-900">{f.value}</dd>
            </div>
          ))}
        </dl>

        <Chips items={study.tags.map((t) => t.text)} label="Features" className="mt-6" />

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <StatusPill value={study.statusLabel} />
          <Button href={`/case-studies/${study.slug}`} variant="secondary">
            Read the case study<span className="sr-only">: {study.title}</span>
          </Button>
        </div>
      </div>

      {fields.length ? (
        <Reveal from="end">
          <div className="relative rounded-xl border border-n-200 bg-n-50 px-5 pt-14 pb-6 sm:px-10 sm:pt-16 sm:pb-10">
            <IllustrativeTag className="absolute top-5 left-5" />
            <CornerAccent className="top-6 right-6" />
            <div className="flex justify-center">
              <LeadFormVisual
                pages={pages}
                fields={fields}
                label={`Illustrative recreation of the ${study.title} lead form: ${fields.map((f) => f.name).join(", ")}, then a Download Brochure button. Not a screenshot.`}
              />
            </div>

            {/* Floating stat tiles on wide screens; a plain row below the
                form on narrow ones, so nothing overlaps at 320px. */}
            <ul aria-label={`${study.title} in numbers`} className="mt-5 grid grid-cols-2 gap-3 lg:mt-0 lg:block">
              {floating.map((f, i) => (
                <Reveal
                  as="li"
                  key={f.label}
                  from="settle"
                  delay={0.12 + i * 0.08}
                  className={`rounded-lg px-4 py-4 shadow-[var(--shadow-lg)] lg:absolute lg:w-44 ${f.tone} ${
                    i === 0 ? "lg:top-20 lg:-right-6" : "lg:bottom-10 lg:-left-6"
                  }`}
                >
                  <span className="block font-display text-[36px] leading-none font-bold tabular-nums">{f.value}</span>
                  <span className="mt-1.5 block text-[13.5px] leading-[1.4] font-medium">{f.label}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}
    </article>
  );
}

export default function WebsiteBento({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  const projects = caseStudiesIn("website") as WebsiteStudy[];
  const headingId = `${id}-heading`;

  return (
    <Section tone="tint" id={id} labelledBy={headingId} className="scroll-mt-16 md:scroll-mt-20">
      <Container>
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
        {/* Description rendered here in n-600, not via SectionHeading's
            n-500, which measures 4.32:1 on the tint band (needs 4.5 —
            vrattiks-accessibility "Contrast"). Shared component untouched. */}
        <p className="mt-4 max-w-2xl text-body-lg text-n-600">{description}</p>

        <div className="mt-10 flex flex-col gap-5 md:mt-12">
          {projects.map((study) => (
            <OpenerTile key={study.slug} study={study} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
