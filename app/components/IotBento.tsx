import Link from "next/link";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import IllustrativeTag from "./IllustrativeTag";
import { Chips, StatusPill } from "./CaseStudyChips";
import { IotFlowVisual } from "./CaseStudyVisuals";
import { cardSteps, caseStudiesIn, type CaseStudy } from "@/app/lib/case-studies";

/* IoT Projects — bento C, "tall columns": full-height rounded cards side
   by side, after the reference's tall visual cards. Different from the
   Website (tower + ledge) and Custom (mirrored slabs) bentos.

   Each project is a pair of columns: the content card (title, client,
   summary, chips, status, link) and a tall visual card with the system's
   layers drawn as a strip, labelled Illustrative.

   With no IoT entry at all, an honest "in development" card shows instead.

   Motion: the cards fade in (no travel) one after the other, once
   (kylezantos-design §1). Nothing loops. */

/* What every IoT write-up covers — shown only while no IoT entry exists
   (docs/case-study-guides/iot-projects-case-study.md §3). */
const writeUpFields = [
  "Client and industry",
  "The problem on site",
  "Hardware and sensors",
  "Connectivity",
  "Software and dashboard",
  "Results, once measured",
];

function ProjectCard({ study }: { study: CaseStudy }) {
  return (
    <article
      id={study.slug}
      aria-labelledby={`${study.slug}-title`}
      className="flex h-full scroll-mt-20 flex-col rounded-xl border border-n-200 bg-n-0 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">{study.kind}</span>
      </div>
      <h3 id={`${study.slug}-title`} className="mt-3 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
        {study.title}
      </h3>
      <p className="mt-1 text-[14px] text-n-600">{study.clientName}</p>
      <p className="mt-4 text-[15.5px] leading-[1.6] text-n-700">{study.summary.text}</p>
      <Chips items={study.tags.map((t) => t.text)} label="Tags" className="mt-6" />
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
        <StatusPill value={study.statusLabel} />
        <Link
          href={`/case-studies/${study.slug}`}
          className="focus-glow inline-flex min-h-11 items-center rounded-sm text-[15px] font-semibold text-brand-secondary underline-offset-4 hover:underline"
        >
          Read the case study<span className="sr-only">: {study.title}</span>
        </Link>
      </div>
    </article>
  );
}

function VisualCard({ study }: { study: CaseStudy }) {
  const steps = cardSteps(study).map((s) => s.label);
  if (!steps.length) return null;
  return (
    <figure className="flex h-full flex-col rounded-xl bg-n-100 p-6 md:p-8">
      <IllustrativeTag className="self-start" />
      <div className="flex flex-1 items-center py-6">
        <IotFlowVisual steps={steps} label={`Illustrative diagram of the ${study.title} system: ${steps.join(", ")}.`} />
      </div>
      <figcaption className="text-[13px] leading-[1.5] text-n-700">The system, from the machine to the screen.</figcaption>
    </figure>
  );
}

export default function IotBento({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  const projects = caseStudiesIn("iot");
  const headingId = `${id}-heading`;

  return (
    <Section tone="white" id={id} labelledBy={headingId} className="scroll-mt-16 md:scroll-mt-20">
      <Container>
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
        {/* Description rendered here in n-600, not via SectionHeading's
            n-500, which measures 4.32:1 on the tint band (needs 4.5 —
            vrattiks-accessibility "Contrast"). Shared component untouched. */}
        <p className="mt-4 max-w-2xl text-body-lg text-n-600">{description}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-12 lg:grid-cols-12 lg:gap-5">
          {projects.length === 0 ? (
            <Reveal from="fade" className="lg:col-span-12">
              <div className="flex h-full flex-col rounded-xl bg-n-100 p-6 md:p-8">
                <p className="inline-flex self-start rounded-full border border-n-300 px-3 py-1 text-[13px] font-semibold text-n-800">
                  In development
                </p>
                <h3 className="mt-4 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
                  No IoT project to show yet
                </h3>
                <p className="mt-3 max-w-xl text-[15.5px] leading-[1.6] text-n-700">
                  We only list work that exists. When the first IoT project is ready, its write-up
                  will cover:
                </p>
                <ol className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {writeUpFields.map((f, i) => (
                    <li key={f} className="flex items-center gap-3 rounded-md border border-n-200 bg-n-0 px-3 py-2.5 text-[14.5px] text-n-800">
                      <span aria-hidden="true" className="w-5 text-[13px] font-semibold text-brand-secondary tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ) : null}

          {projects.map((s, i) => (
            <div key={s.slug} className="contents">
              <Reveal from="fade" delay={0.08 + i * 0.06} className="lg:col-span-7">
                <ProjectCard study={s} />
              </Reveal>
              <Reveal from="fade" delay={0.14 + i * 0.06} className="lg:col-span-5">
                <VisualCard study={s} />
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
