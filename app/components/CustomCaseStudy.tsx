import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import CaseStudyBreadcrumb from "./CaseStudyBreadcrumb";
import IllustrativeTag from "./IllustrativeTag";
import { relatedLinks, sectionFor, type CustomStudy, type Tool } from "@/app/lib/case-studies";

/* Custom-development case-study detail layout (docs/case-study-guides/
   custom-development-case-study.md §2). The one idea is the CASE FILE:
   a ruled fact panel beside the H1 with the project's status in the hero,
   never buried (guide §1), a ledger of decisions, and the pipeline itself
   on the page's one dark band (CLAUDE.md Design Taste, ref 2).

   Section order (user brief 2026-10-12): opener → overview → the full
   story → brief → problem and objective → approach → solution and process
   (dark band) → key features → tech stack → visuals → outcomes (only when
   real) → about the client → related → FinalCTA.

   Different from the website layout (screen-led, light throughout) and the
   IoT layout (signal-path ladder): no audience comparison, no numerals in
   rows, no pinned stepper (guide §9).

   Motion (kylezantos-design §1): rows rise once, the code sample slides in
   from the end. Nothing loops; the H1 never fades (§1b). */

type Props = { study: CustomStudy };

function Hero({ study }: Props) {
  const rows = [
    { label: "Client", value: study.clientName },
    { label: "Category", value: sectionFor(study.category).label },
    ...study.keyFacts,
  ];

  return (
    <Section tone="white" labelledBy="case-study-heading">
      <Container>
        <CaseStudyBreadcrumb study={study} />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start md:gap-16">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Eyebrow>{study.kind} case study</Eyebrow>
            </div>
            {/* Not wrapped in Reveal (kylezantos-design §1b). */}
            <h1
              id="case-study-heading"
              className="max-w-[18ch] text-[36px] leading-[1.05] tracking-[-0.03em] font-display font-semibold text-n-900 sm:text-[44px] md:text-[52px]"
            >
              {study.title}
            </h1>
            <p className="mt-4 text-[17px] text-n-600">
              Built for <span className="font-semibold text-n-900">{study.clientName}</span>
            </p>
            <p className="mt-5 max-w-xl text-body-lg text-n-700">{study.summary.text}</p>
            {/* Status, in the hero (guide §1). Neutral tone: no semantic
                colour for a plain label (docs/index.html §3). */}
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-n-100 px-3.5 py-1.5 text-[14px] font-semibold text-n-800">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-secondary" />
              <span className="sr-only">Status: </span>
              {study.statusLabel}
            </p>
          </div>

          {/* The case file. Accent is confined to its top edge (CLAUDE.md
              Design Taste, ref 1) — one device, no fill, no shadow. */}
          <div className="border-t-2 border-brand-secondary">
            <p className="pt-4 pb-2 font-body text-label font-semibold tracking-[0.14em] text-n-600 uppercase">Case file</p>
            <dl>
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-4 border-b border-n-200 py-3">
                  <dt className="text-[14px] text-n-600">{r.label}</dt>
                  <dd className="text-[15px] font-medium break-words text-n-900">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Overview as one display-size paragraph, then the full story set in two
   columns like a written file. */
function Story({ study }: { study: CustomStudy }) {
  return (
    <>
      <Section tone="paper" labelledBy="overview-heading" className="pb-8 sm:pb-10 md:pb-12">
        <Container>
          <SectionHeading id="overview-heading" eyebrow="Overview" title="The project at a glance" />
          <Reveal>
            <p className="mt-6 max-w-4xl text-[20px] leading-[1.5] tracking-[-0.01em] font-display font-semibold text-n-900 md:text-[24px]">
              {study.overview.text}
            </p>
          </Reveal>
        </Container>
      </Section>
      <Section tone="paper" labelledBy="story-heading" className="pt-0 sm:pt-0 md:pt-0">
        <Container>
          <div className="border-t border-n-200 pt-8 md:pt-12">
            <h2 id="story-heading" className="text-[22px] leading-[1.25] tracking-[-0.015em] font-display font-bold text-n-900">
              The full story
            </h2>
            <div className="mt-6 gap-12 text-body-lg text-n-700 lg:columns-2">
              {study.description.map((p) => (
                <p key={p.text} className="mb-5 break-inside-avoid">
                  {p.text}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Brief({ study }: { study: CustomStudy }) {
  return (
    <Section tone="white" labelledBy="brief-heading">
      <Container className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
        <SectionHeading id="brief-heading" eyebrow="The client brief" title="What we set out to build" />
        <div className="flex max-w-[62ch] flex-col gap-4 text-body-lg text-n-700 md:pt-8">
          {study.brief.map((p) => (
            <p key={p.text}>{p.text}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* The job before, and what "done" means (guide §2.2–2.3). */
function TheJob({ study }: { study: CustomStudy }) {
  return (
    <Section tone="paper" labelledBy="job-heading">
      <Container>
        <SectionHeading id="job-heading" eyebrow="Problem and objective" title="What needed to change" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-[18px] font-semibold text-n-900">The problem</h3>
            <p className="mt-2 text-body-lg text-n-700">{study.problem.text}</p>
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-n-900">The objective</h3>
            <ul className="mt-2 flex flex-col gap-2 text-body-lg text-n-700">
              {study.objectives.map((o) => (
                <li key={o.text} className="flex gap-3">
                  <Icon name="check" className="mt-1.5 h-4 w-4 shrink-0 text-brand-secondary" />
                  {o.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Decisions as a ledger: decision left, reason right, one ruled row each. */
function Approach({ study }: { study: CustomStudy }) {
  return (
    <Section tone="white" labelledBy="approach-heading">
      <Container>
        <SectionHeading id="approach-heading" eyebrow="Approach and strategy" title="Decisions and the reasons for them" />
        <dl className="mt-10 border-t border-n-200 md:mt-12">
          {study.approach.map((d, i) => (
            <Reveal
              key={d.title}
              delay={i * 0.05}
              className="grid grid-cols-1 gap-1.5 border-b border-n-200 py-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16"
            >
              <dt className="text-[17px] font-semibold text-n-900">{d.title}</dt>
              <dd className="text-[15.5px] leading-[1.6] text-n-700">{d.text}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* The pipeline, step by step, on the page's one graphite band. Text on the
   muted n-200/n-300 ramp, hairlines at n-0/10 (Design Taste, ref 2). */
function Solution({ study }: { study: CustomStudy }) {
  return (
    <Section tone="dark" labelledBy="solution-heading" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid-fade-dark pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <SectionHeading
          id="solution-heading"
          tone="dark"
          eyebrow="Solution and process"
          title="How it runs, step by step"
          description="The steps in order, each with the tool that does it."
        />
        <ol className="mt-10 flex flex-col md:mt-12">
          {study.solution.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.05}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-n-0/10 py-6 md:grid-cols-[3.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-10"
            >
              <span className="font-display text-[22px] leading-none font-bold text-brand-primary tabular-nums md:text-[26px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[18px] leading-[1.3] font-semibold text-n-0">{s.title}</h3>
                {s.tool ? (
                  <span className="mt-2 inline-flex rounded-full border border-n-0/15 px-2.5 py-0.5 text-[13px] text-n-200">{s.tool}</span>
                ) : null}
              </div>
              <div className="col-start-2 mt-3 min-w-0 text-[15.5px] leading-[1.6] text-n-300 md:col-start-3 md:mt-0">
                <p className="text-n-200">{s.text}</p>
                {s.note ? <p className="mt-1.5">{s.note.text}</p> : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function Features({ study }: { study: CustomStudy }) {
  return (
    <Section tone="white" labelledBy="features-heading">
      <Container>
        <SectionHeading id="features-heading" eyebrow="Key features" title="What it does" />
        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {study.features.map((f) => (
            <li key={f.title} className="border-t border-n-200 pt-4">
              <h3 className="text-[16px] font-semibold text-n-900">{f.title}</h3>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-n-600">{f.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* Tools grouped by their part of the pipeline, each with its job. */
function Stack({ study }: { study: CustomStudy }) {
  const groups = study.stack.reduce<{ name: string; tools: Tool[] }[]>((acc, t) => {
    const name = t.group ?? "Tools";
    const g = acc.find((x) => x.name === name);
    if (g) g.tools.push(t);
    else acc.push({ name, tools: [t] });
    return acc;
  }, []);
  return (
    <Section tone="paper" labelledBy="stack-heading">
      <Container>
        <SectionHeading id="stack-heading" eyebrow="Tech stack" title="The tools, and the job each one does" />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {groups.map((g) => (
            <div key={g.name}>
              <h3 className="font-body text-label font-semibold tracking-[0.14em] text-n-600 uppercase">{g.name}</h3>
              <ul className="mt-3 flex flex-col gap-3">
                {g.tools.map((t) => (
                  <li key={t.name} className="rounded-md border border-n-200 bg-n-0 px-4 py-3">
                    <p className="text-[16px] font-semibold text-n-900">{t.name}</p>
                    <p className="mt-0.5 text-[14px] leading-[1.5] text-n-600">{t.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* A generated landing page, in outline: a dark hero with a wireframe
   shape, text bars and a button, plus swatches for the category styles.
   No words, colours or shapes from a real page. Static. */
function GeneratedPage({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[420px]">
      <div aria-hidden="true" className="overflow-hidden rounded-xl border border-n-200 bg-n-0 shadow-[var(--shadow-lg)]">
        <div className="relative bg-brand-graphite px-6 pt-8 pb-10">
          <svg viewBox="0 0 120 120" className="absolute top-5 right-5 h-24 w-24 text-brand-primary/70 sm:h-28 sm:w-28">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
              <polygon points="60,10 103,35 103,85 60,110 17,85 17,35" />
              <polyline points="17,35 60,60 103,35" />
              <line x1="60" y1="60" x2="60" y2="110" />
              <polyline points="17,85 60,60 103,85" strokeDasharray="3 4" opacity="0.5" />
            </g>
          </svg>
          <span className="block h-2 w-16 rounded-full bg-n-0/30" />
          <span className="mt-8 block h-3.5 w-[58%] rounded-full bg-n-0/85" />
          <span className="mt-2.5 block h-3.5 w-[42%] rounded-full bg-n-0/85" />
          <span className="mt-4 block h-2 w-[50%] rounded-full bg-n-0/30" />
          <span className="mt-6 block h-8 w-28 rounded-full bg-brand-primary" />
        </div>
        <div className="grid grid-cols-3 gap-3 p-5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex flex-col gap-2">
              <span className="block aspect-[4/3] rounded-md bg-n-50" />
              <span className="block h-1.5 w-[80%] rounded-full bg-n-200" />
            </span>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-4">
        <span className="h-9 w-9 rounded-full bg-brand-primary" />
        <span className="h-0 w-0 border-x-[18px] border-b-[32px] border-x-transparent border-b-brand-secondary" />
        <span className="h-9 w-9 rounded-sm bg-n-400" />
      </div>
    </div>
  );
}

function Visuals({ study }: { study: CustomStudy }) {
  return (
    <Section tone="white" labelledBy="visuals-heading">
      <Container>
        <SectionHeading
          id="visuals-heading"
          eyebrow="Visuals"
          title="What it looks like, in outline"
          description="Screens and code here are illustrative recreations; the real system and its data are not shown."
        />
        <div
          className={`mt-10 grid grid-cols-1 gap-12 md:mt-12 md:items-center md:gap-14 ${
            study.illustration ? "md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : ""
          }`}
        >
          {study.illustration === "generated-page" ? (
          <figure className="relative">
            <Reveal from="settle">
              <GeneratedPage
                label={`Illustrative recreation of a landing page made by the ${study.title}: a dark 3D hero with a wireframe shape, a headline and a button, with swatches for the category styles. Not a real generated page.`}
              />
            </Reveal>
            <IllustrativeTag className="absolute -top-3 left-1/2 -translate-x-1/2" />
            <figcaption className="mt-4 text-center text-[14px] text-n-600">
              A generated page, in outline. Colour and geometry follow the lead&apos;s category.
            </figcaption>
          </figure>
          ) : null}

          <Reveal from="end" delay={0.06}>
            <figure className="relative min-w-0">
              <div className="flex items-center justify-between gap-3">
                <figcaption className="text-[14px] text-n-600">{study.sample.caption}</figcaption>
                <IllustrativeTag className="shrink-0" />
              </div>
              {/* Scrolls inside the block, never widens the page; focusable
                  so keyboard users can scroll it (vrattiks-accessibility).
                  Body face with tabular figures — the design system allows
                  no third (mono) typeface (CLAUDE.md). */}
              <pre
                tabIndex={0}
                aria-label="Sample code"
                className="focus-glow mt-3 overflow-x-auto rounded-md border border-n-200 bg-n-25 p-5 text-[14px] leading-[1.7] text-n-800 tabular-nums md:p-6"
              >
                <code className="font-body">{study.sample.code}</code>
              </pre>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* Only real, confirmed outcomes — otherwise not rendered (guide §2.10). */
function Outcomes({ study }: { study: CustomStudy }) {
  if (!study.outcomes.length) return null;
  return (
    <Section tone="paper" labelledBy="outcomes-heading">
      <Container>
        <SectionHeading id="outcomes-heading" eyebrow="Outcomes" title="What changed" />
        <ul className="mt-8 flex max-w-2xl flex-col gap-2 text-body-lg text-n-700">
          {study.outcomes.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </Container>
    </Section>
  );
}

/* About the client, as the case file's closing note: accent on the top
   edge only, like the hero panel. */
function AboutClient({ study }: { study: CustomStudy }) {
  return (
    <Section tone="paper" labelledBy="about-heading">
      <Container>
        <div className="max-w-3xl border-t-2 border-brand-secondary pt-5">
          <p className="font-body text-label font-semibold tracking-[0.14em] text-n-600 uppercase">About the client</p>
          <h2 id="about-heading" className="mt-2 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
            {study.clientName}
          </h2>
          <div className="mt-4 flex flex-col gap-3 text-body-lg text-n-700">
            {study.aboutClient.map((p) => (
              <p key={p.text}>{p.text}</p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* vrattiks-architecture §5: service + industry + listing, as pills. */
function Related({ study }: { study: CustomStudy }) {
  const links = [
    ...relatedLinks(study).map((l) => ({ href: l.href, text: l.name, pre: l.label })),
    { href: "/case-studies", text: "All case studies", pre: "" },
  ];
  return (
    <Section tone="white" labelledBy="related-heading">
      <Container>
        <h2 id="related-heading" className="font-body text-label font-semibold tracking-[0.14em] text-n-600 uppercase">
          Related services and pages
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="focus-glow inline-flex min-h-11 items-center gap-2 rounded-full border border-n-200 px-4 text-[14.5px] transition-[border-color,box-shadow] duration-150 hover:border-brand-primary hover:shadow-[var(--shadow-glow)]"
              >
                {l.pre ? <span className="text-n-600">{l.pre}:</span> : null}
                <span className="font-semibold text-brand-secondary">{l.text}</span>
                <Icon name="arrowRight" className="h-4 w-4 text-brand-secondary" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export default function CustomCaseStudy(props: Props) {
  const { study } = props;
  return (
    <>
      <Hero {...props} />
      <Story study={study} />
      <Brief study={study} />
      <TheJob study={study} />
      <Approach study={study} />
      <Solution study={study} />
      <Features study={study} />
      <Stack study={study} />
      <Visuals study={study} />
      <Outcomes study={study} />
      <AboutClient study={study} />
      <Related study={study} />
    </>
  );
}
