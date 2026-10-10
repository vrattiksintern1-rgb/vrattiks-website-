import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import IllustrativeTag from "./IllustrativeTag";
import { Chips, SampleTag, StatusPill } from "./CaseStudyChips";
import { IotFlowVisual } from "./CaseStudyVisuals";
import { caseStudiesIn, clientLabelOf, samplesIn, type CaseStudy } from "@/app/lib/case-studies";

/* IoT Projects — bento C, "tall columns": full-height rounded cards side
   by side, after the reference's tall visual cards. Different from the
   Website (tower + ledge) and Custom (mirrored slabs) bentos.

   NO REAL IoT PROJECT EXISTS (vrattiks-standards §3). The section always
   shows an honest "in development" card. Outside production (or with
   NEXT_PUBLIC_SHOW_SAMPLES=true) it ALSO shows the SAMPLE entry so the
   layout can be reviewed with a card in it — labelled "Sample" on the card,
   the visual and the status pill, and never counted anywhere
   (samplesIn / listedCaseStudies). In a production build the in-
   development card spans the full width on its own.

   Motion: the cards fade in (no travel) one after the other, once
   (kylezantos-design §1). Nothing loops. */

/* What every IoT write-up will cover — the same six fields the IoT detail
   template uses (docs/case-study-guides/iot-projects-case-study.md §3). */
const writeUpFields = [
  "Client and industry",
  "The problem on site",
  "Hardware and sensors",
  "Connectivity",
  "Software and dashboard",
  "Results, once measured",
];

function ProjectCard({ study, sample }: { study: CaseStudy; sample: boolean }) {
  const o = study.overview!;
  return (
    <article
      id={study.slug}
      aria-labelledby={`${study.slug}-title`}
      className={`flex h-full scroll-mt-20 flex-col rounded-xl bg-n-0 p-6 md:p-8 ${
        sample ? "border-[1.5px] border-dashed border-sem-warning/60" : "border border-n-200"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {sample ? <SampleTag /> : null}
        <span className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">{study.kind}</span>
      </div>
      <h3 id={`${study.slug}-title`} className="mt-3 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
        {study.title}
      </h3>
      <p className="mt-1 text-[14px] text-n-600">{clientLabelOf(study)}</p>
      <p className="mt-4 text-[15.5px] leading-[1.6] text-n-700">{o.summary}</p>

      <figure className="mt-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {sample ? <SampleTag /> : null}
          <IllustrativeTag />
        </div>
        {o.visual === "iot-flow" ? (
          <IotFlowVisual
            overview={o}
            label={`${sample ? "Sample, illustrative" : "Illustrative"} diagram of the building blocks: ${(o.steps ?? []).join(", ")}.`}
          />
        ) : null}
        <figcaption className="mt-2 text-[13px] text-n-600">Building blocks, from the machine to the screen.</figcaption>
      </figure>

      <Chips items={o.features} label="Features" className="mt-6" />
      <Chips items={o.tech} label="Technology types" className="mt-3" />
      {study.statusPill ? (
        <div className="mt-auto pt-6">
          <StatusPill value={study.statusPill} />
        </div>
      ) : null}
    </article>
  );
}

export default function IotBento({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  const real = caseStudiesIn("iot").filter((s) => s.overview);
  const samples = samplesIn("iot").filter((s) => s.overview);
  const cards = [...real.map((s) => ({ s, sample: false })), ...samples.map((s) => ({ s, sample: true }))];
  const headingId = `${id}-heading`;
  const alone = cards.length === 0;

  return (
    <Section tone="white" id={id} labelledBy={headingId} className="scroll-mt-16 md:scroll-mt-20">
      <Container>
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
        {/* Description rendered here in n-600, not via SectionHeading's
            n-500, which measures 4.32:1 on the tint band (needs 4.5 —
            vrattiks-accessibility "Contrast"). Shared component untouched. */}
        <p className="mt-4 max-w-2xl text-body-lg text-n-600">{description}</p>

        <div className={`mt-10 grid grid-cols-1 gap-4 md:mt-12 lg:gap-5 ${alone ? "" : "lg:grid-cols-12"}`}>
          {real.length === 0 ? (
            <Reveal from="fade" className={alone ? "" : "lg:col-span-5"}>
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
                <ol className={`mt-6 grid grid-cols-1 gap-2 ${alone ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
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

          {cards.map(({ s, sample }, i) => (
            <Reveal key={s.slug} from="fade" delay={0.08 + i * 0.06} className="lg:col-span-7">
              <ProjectCard study={s} sample={sample} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
