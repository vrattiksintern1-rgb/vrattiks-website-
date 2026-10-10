import Button from "./ui/Button";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import IllustrativeTag from "./IllustrativeTag";
import { Chips, CornerAccent, StatusPill } from "./CaseStudyChips";
import { LeadFormVisual } from "./CaseStudyVisuals";
import {
  clientLabelOf,
  isPublishable,
  listedCaseStudies,
  sectionFor,
} from "@/app/lib/case-studies";

/* Featured project opener, after the reference's case-study slide (layout
   only): small label, title, key-fact rows, and a visual tile with two
   floating rounded stat tiles.

   The featured project is the first entry with a publishable detail page
   (isPublishable) — today Auroma Holiday Villas — so the opener always has
   somewhere real to link to. The stat tiles COUNT the entry's own data
   (landing pages, required form fields); nothing is typed as a number
   (vrattiks-standards §3).

   The link is a secondary (graphite) pill, not the gradient primary: the
   page's one gradient moment is the FinalCTA (vrattiks-design-system §3).
   Motion: the visual slides in from the end, the stat tiles settle after
   it — once, nothing loops (kylezantos-design §1). */
export default function FeaturedCaseStudy() {
  const study = listedCaseStudies.find((s) => isPublishable(s) && s.overview);
  if (!study?.overview) return null;
  const o = study.overview;
  const client = clientLabelOf(study);
  const pages = o.landingPages ?? [];
  const required = (o.formFields ?? []).filter((f) => f.required).length;
  const location = study.detail?.location;

  const facts = [
    { label: "Client", value: client },
    study.industry ? { label: "Industry", value: study.industry.name } : null,
    location ? { label: "Location", value: location } : null,
    o.tech.length ? { label: "Built with", value: o.tech.join(", ") } : null,
  ].filter((f) => f !== null);

  const floating = [
    pages.length ? { value: pages.length, label: `landing page variants (${pages.map((p) => p.label).join(", ")})`, tone: "bg-brand-primary text-brand-graphite" } : null,
    required ? { value: required, label: "required form fields", tone: "bg-brand-secondary text-n-0" } : null,
  ].filter((f) => f !== null);

  return (
    <Section tone="white" labelledBy="featured-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <p className="inline-flex rounded-full bg-brand-graphite px-3.5 py-1.5 font-body text-label font-semibold tracking-[0.12em] text-n-0 uppercase">
              Featured project · {sectionFor(study.category).shortLabel}
            </p>
            <h2
              id="featured-heading"
              className="mt-5 text-[32px] leading-[1.1] tracking-[-0.025em] font-display font-bold text-n-900 md:text-[44px]"
            >
              {study.title}
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-n-700">{o.summary}</p>

            <dl className="mt-7 border-t border-n-200">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-4 border-b border-n-200 py-3">
                  <dt className="text-[13px] font-semibold tracking-[0.08em] text-n-600 uppercase">{f.label}</dt>
                  <dd className="text-[15px] font-medium break-words text-n-900">{f.value}</dd>
                </div>
              ))}
            </dl>

            <Chips items={o.features} label="Features" className="mt-6" />

            <div className="mt-7 flex flex-wrap items-center gap-4">
              {study.statusPill ? <StatusPill value={study.statusPill} /> : null}
              {/* Linked only because a publishable detail page exists. */}
              <Button href={`/case-studies/${study.slug}`} variant="secondary">
                Read the case study<span className="sr-only">: {study.title}</span>
              </Button>
            </div>
          </div>

          <Reveal from="end">
            <div className="relative rounded-xl border border-n-200 bg-n-50 px-5 pt-14 pb-6 sm:px-10 sm:pt-16 sm:pb-10">
              <IllustrativeTag className="absolute top-5 left-5" />
              <CornerAccent className="top-6 right-6" />
              <div className="flex justify-center">
                <LeadFormVisual
                  overview={o}
                  label={`Illustrative recreation of the ${client} lead form: ${(o.formFields ?? []).map((f) => f.name).join(", ")}, then a Download Brochure button. Not a screenshot.`}
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
        </div>
      </Container>
    </Section>
  );
}
