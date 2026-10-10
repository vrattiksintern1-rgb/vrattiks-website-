import Link from "next/link";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import IllustrativeTag from "./IllustrativeTag";
import { ArrowCircle, Chips, StatusPill } from "./CaseStudyChips";
import { TryOnVisual } from "./CaseStudyVisuals";
import {
  caseStudiesIn,
  clientLabelOf,
  isPublishable,
  type CaseStudy,
} from "@/app/lib/case-studies";

/* Website Projects — bento A, "tower + ledge": a tall graphite visual card
   on the left spans two rows; the project's content sits in a wide outlined
   tile beside it; under that, a short ledge of a lavender tile (the
   featured project, linked to its detail page) and a violet count tile.

   Not the site's uniform 3-up card grid (ServicesOverview), not the
   detail pages' screen pair, and unlike the Custom (mirrored slabs) and IoT
   (tall columns) bentos on this page (user brief; taste-skill §4).

   Cards are links ONLY where a publishable detail page exists
   (isPublishable); every other card shows its status pill instead.
   Motion: tiles rise in order, 60ms apart, once (kylezantos-design §1). */

function ProjectCopy({ study }: { study: CaseStudy }) {
  const o = study.overview!;
  return (
    <>
      <p className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">{study.kind}</p>
      <h3 id={`${study.slug}-title`} className="mt-2 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
        {study.title}
      </h3>
      <p className="mt-1 text-[14px] text-n-600">{clientLabelOf(study)}</p>
      <p className="mt-4 max-w-xl text-[15.5px] leading-[1.6] text-n-700">{o.summary}</p>
      <Chips items={o.features} label="Features" className="mt-5" />
      {o.tech.length ? <Chips items={o.tech} label="Built with" className="mt-3" /> : null}
    </>
  );
}

/* The ledge under the content tile: the featured project as a linked
   lavender card (its detail page exists), plus a violet count tile. */
function Ledge({ featured, count, steps }: { featured: CaseStudy; count: number; steps?: string[] }) {
  return (
    <>
      <Reveal delay={0.12} className="lg:col-span-5">
        <Link
          href={`/case-studies/${featured.slug}`}
          className="focus-glow group flex h-full flex-col rounded-xl bg-brand-primary p-6 text-brand-graphite transition-shadow duration-150 hover:shadow-[var(--shadow-glow)] md:p-7"
        >
          <span className="flex items-start justify-between gap-4">
            <span>
              <span className="block font-body text-label font-semibold tracking-[0.14em] uppercase">
                {featured.kind} · Featured above
              </span>
              <span className="mt-2 block text-[22px] leading-[1.2] font-display font-bold">{featured.title}</span>
              <span className="mt-1 block text-[14px]">{clientLabelOf(featured)}</span>
            </span>
            <ArrowCircle surface="lavender" />
          </span>
          <span className="mt-auto flex flex-wrap items-center gap-2 pt-6">
            {featured.statusPill ? <StatusPill value={featured.statusPill} surface="lavender" /> : null}
            <span className="text-[14px] font-semibold underline-offset-4 group-hover:underline">Read the case study</span>
          </span>
        </Link>
      </Reveal>
      <Reveal delay={0.18} className="rounded-xl bg-brand-secondary p-6 text-n-0 sm:col-span-2 lg:col-span-3 md:p-7">
        <span className="block font-display text-[48px] leading-none font-bold tabular-nums">{count}</span>
        <span className="mt-2 block text-[15px] font-semibold">website {count === 1 ? "project" : "projects"}</span>
        {steps?.length ? (
          <span className="mt-3 block text-[14px] leading-[1.5]">
            The try-on takes {steps.length} steps: {steps.join(", then ").toLowerCase()}.
          </span>
        ) : null}
      </Reveal>
    </>
  );
}

export default function WebsiteBento({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  const projects = caseStudiesIn("website").filter((s) => s.overview);
  const featured = projects.find((s) => isPublishable(s));
  const others = projects.filter((s) => s !== featured);
  const headingId = `${id}-heading`;

  return (
    <Section tone="tint" id={id} labelledBy={headingId} className="scroll-mt-16 md:scroll-mt-20">
      <Container>
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
        {/* Description rendered here in n-600, not via SectionHeading's
            n-500, which measures 4.32:1 on the tint band (needs 4.5 —
            vrattiks-accessibility "Contrast"). Shared component untouched. */}
        <p className="mt-4 max-w-2xl text-body-lg text-n-600">{description}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-12 lg:gap-5">
          {others.map((study, i) => {
            const o = study.overview!;
            const client = clientLabelOf(study);
            const first = i === 0;
            return (
              <div key={study.slug} className="contents">
                {/* Tall visual card (reference: tall rounded visual card with
                    a caption and a small pill). */}
                <Reveal
                  delay={0}
                  className={`relative flex flex-col rounded-xl bg-brand-graphite p-5 sm:row-span-2 lg:col-span-4 ${first && featured ? "lg:row-span-2" : "lg:row-span-1"}`}
                >
                  <figure className="flex flex-1 flex-col">
                    <IllustrativeTag className="self-start" />
                    <div className="flex flex-1 items-center py-6">
                      {o.visual === "try-on" ? (
                        <TryOnVisual
                          overview={o}
                          label={`Illustrative recreation of the ${study.title} try-on screen for the ${client.toLowerCase()}: upload a photo, then select a colour. Not a screenshot.`}
                        />
                      ) : null}
                    </div>
                    <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-n-0/10 pt-4">
                      <span className="text-[14px] font-semibold text-n-0">{study.title}</span>
                      {study.statusPill ? <StatusPill value={study.statusPill} surface="dark" /> : null}
                    </figcaption>
                  </figure>
                </Reveal>

                <Reveal delay={0.06} className="lg:col-span-8">
                  {/* The listing anchor (/case-studies#slug) lives here: the
                      wrapper is display:contents and has no box to scroll to. */}
                  <article
                    id={study.slug}
                    aria-labelledby={`${study.slug}-title`}
                    className="h-full scroll-mt-20 rounded-xl border border-n-200 bg-n-0 p-6 md:p-8"
                  >
                    <ProjectCopy study={study} />
                  </article>
                </Reveal>

                {first && featured ? <Ledge featured={featured} count={projects.length} steps={o.visual === "try-on" ? o.steps : undefined} /> : null}
              </div>
            );
          })}
          {/* No other website projects yet: the ledge still shows. */}
          {!others.length && featured ? <Ledge featured={featured} count={projects.length} /> : null}
        </div>
      </Container>
    </Section>
  );
}
