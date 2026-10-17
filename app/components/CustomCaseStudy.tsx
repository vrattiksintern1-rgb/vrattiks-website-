import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Tabs from "./ui/Tabs";
import { primaryCta } from "./FinalCTA";
import CaseStudyBreadcrumb from "./CaseStudyBreadcrumb";
import IllustrativeTag from "./IllustrativeTag";
import { FlowTrace, MessageMock, PanelsOverview } from "./CouponPlatformVisuals";
import { relatedLinks, sectionFor, type CustomStudy, type Tool } from "@/app/lib/case-studies";

/* Custom-development case-study detail layout (docs/case-study-guides/
   custom-development-case-study.md §2). The one idea is the CASE FILE:
   a ruled fact panel beside the H1 with the project's status in the hero,
   never buried (guide §1), a ledger of decisions, and the pipeline itself
   on the page's one dark band (CLAUDE.md Design Taste, ref 2).

   Section order (user brief 2026-10-12): opener → overview → the full
   story → brief → project breakdown (dark band; since 2026-10-17 ONE tabbed
   section holding problem and objective, approach, solution and process,
   key features and tech stack) → visuals → outcomes (only when real) →
   about the client → related → FinalCTA.

   Different from the website layout (screen-led, light throughout) and the
   IoT layout (signal-path ladder): no audience comparison, no numerals in
   rows, no pinned stepper (guide §9).

   Motion (kylezantos-design §1): rows rise once, the code sample slides in
   from the end; tab panels switch instantly with a 150ms fade on user
   action. Nothing loops; the H1 never fades (§1b).

   Optional, data-driven (added 2026-10-13 for the coupon platform; the
   lead-generator page has none of these fields and renders as before):
   features with `items` → the parts of a platform, each with what it
   covers; `assurance` → a security and quality tile in the Tech stack tab; `illustration: "coupon-platform"` → flow
   trace + parts overview + message mock (CouponPlatformVisuals);
   `illustration: "lead-flow"` → the flow trace alone (added 2026-10-17 for
   Two Rabbits); no `sample` → no code block. */

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

/* ── Project breakdown (user brief 2026-10-17) ─────────────────────────────
   The five sections that used to run from "Problem and objective" to "Tech
   stack" are ONE tabbed section, on the page's one graphite band (it took
   over the band the solution steps had, and sits between two white bands:
   the brief above, the visuals below). Text and data are unchanged; each
   former section is a tab, and its old heading leads its panel.

   Reference (docs/reference: tabs screenshot, layout language only): a row
   of tab labels, the active one bold with a thick underline, a dot list
   below with comfortable spacing, one primary button under the panel.

   Server-rendered: every panel is built here and handed to ui/Tabs, the
   only client code. Panel text stays inside ~75ch however wide the
   container is. Lists use round dots; where the data is a paragraph it is
   split into dots only at sentence boundaries, words unchanged, and a
   single sentence stays a paragraph. */

/* Round dot bullets on the graphite band. */
const dot =
  "relative pl-6 before:absolute before:top-[calc(0.8em-4px)] before:left-0.5 before:h-2 before:w-2 before:rounded-full before:bg-brand-secondary";
const leadText = "text-[17px] leading-[1.4] font-display font-semibold text-n-0";
const bodyText = "text-[16px] leading-[1.6] text-n-200";
const subText = "text-[15px] leading-[1.6] text-n-300";
const groupLabel = "font-body text-label font-semibold tracking-[0.14em] text-n-400 uppercase";

/* Splits only where a sentence ends: . ! or ? followed by a space and a
   capital letter or an opening quote. */
function sentences(text: string) {
  return text.split(/(?<=[.!?])\s+(?=[A-Z"“])/);
}

function Prose({ text }: { text: string }) {
  const parts = sentences(text);
  if (parts.length < 2) return <p className={bodyText}>{text}</p>;
  return (
    <ul className={`flex flex-col gap-4 ${bodyText}`}>
      {parts.map((s) => (
        <li key={s} className={dot}>
          {s}
        </li>
      ))}
    </ul>
  );
}

/* A panel: the former section's heading above the content, and beside it
   from 1280px. Below that a side column would squeeze the content and make
   the tallest panel (which every panel reserves) much taller. */
function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] xl:gap-16">
      <div>
        <h3 className="max-w-[24ch] text-[20px] leading-[1.25] tracking-[-0.015em] font-display font-bold text-n-0 md:text-[22px]">
          {title}
        </h3>
        {description ? <p className={`mt-2 max-w-[40ch] ${subText}`}>{description}</p> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function ProblemPanel({ study }: Props) {
  return (
    <Panel title="What needed to change">
      <div className="flex max-w-[75ch] flex-col gap-8">
        <div>
          <h4 className={leadText}>The problem</h4>
          <div className="mt-3">
            <Prose text={study.problem.text} />
          </div>
        </div>
        <div>
          <h4 className={leadText}>The objective</h4>
          <ul className={`mt-3 flex flex-col gap-4 ${bodyText}`}>
            {study.objectives.map((o) => (
              <li key={o.text} className={dot}>
                {o.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

/* Decisions, each with its reason under it. */
function ApproachPanel({ study }: Props) {
  return (
    <Panel title="Decisions and the reasons for them">
      <ul className="flex max-w-[75ch] flex-col gap-7">
        {study.approach.map((d) => (
          <li key={d.title} className={dot}>
            <p className={leadText}>{d.title}</p>
            <p className={`mt-1 ${bodyText}`}>{d.text}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* The steps, numbered, each with the tool that does it. Two columns from
   901px, filled top to bottom so the order reads down the first column
   and then the second. */
function SolutionPanel({ study }: Props) {
  const rows = Math.ceil(study.solution.length / 2);
  return (
    <Panel title="How it runs, step by step" description="The steps in order, each with the tool that does it.">
      <ol
        style={{ "--rows": rows } as React.CSSProperties}
        className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(var(--rows),auto)]"
      >
        {study.solution.map((s, i) => (
          <li key={s.title} className="grid max-w-[75ch] grid-cols-[2.25rem_minmax(0,1fr)]">
            <span aria-hidden="true" className="font-display text-[17px] leading-[1.4] font-bold text-brand-primary tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h4 className={leadText}>{s.title}</h4>
                {s.tool ? (
                  <span className="inline-flex rounded-full border border-n-0/15 px-2.5 py-0.5 text-[13px] text-n-200">{s.tool}</span>
                ) : null}
              </div>
              <p className={`mt-1.5 ${bodyText}`}>{s.text}</p>
              {s.note ? <p className={`mt-1 ${subText}`}>{s.note.text}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

/* Bold lead words kept: each feature's title leads its line. When the
   features carry `items` (the parts of a platform), each part lists what
   it covers under it, two per row from 901px. */
function FeaturesPanel({ study }: Props) {
  const parts = study.features.some((f) => f.items?.length);
  return (
    <Panel title={parts ? "The parts, and what each one does" : "What it does"}>
      <ul className={`grid grid-cols-1 gap-x-12 md:grid-cols-2 ${parts ? "gap-y-8" : "gap-y-6"}`}>
        {study.features.map((f) => (
          <li key={f.title} className={`max-w-[75ch] ${parts ? "" : dot}`}>
            <h4 className={leadText}>{f.title}</h4>
            <p className={`mt-1 ${parts ? subText : bodyText}`}>{f.text}</p>
            {f.items?.length ? (
              <ul className={`mt-3 flex flex-col gap-2.5 ${bodyText}`}>
                {f.items.map((item) => (
                  <li key={item} className={dot}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* Tools grouped by their part of the pipeline, each with its job; the
   security and quality tile (only with `assurance`) stays in this tab. */
function StackPanel({ study }: Props) {
  const groups = study.stack.reduce<{ name: string; tools: Tool[] }[]>((acc, t) => {
    const name = t.group ?? "Tools";
    const g = acc.find((x) => x.name === name);
    if (g) g.tools.push(t);
    else acc.push({ name, tools: [t] });
    return acc;
  }, []);
  return (
    <Panel title="The tools, and the job each one does">
      {/* One column per group up to three; four or more pair up, so a
          tool's job fits on one line instead of wrapping in a narrow column. */}
      <div
        style={{ "--cols": groups.length > 3 ? 2 : groups.length } as React.CSSProperties}
        className="grid grid-cols-1 gap-8 sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))] sm:gap-x-10"
      >
        {groups.map((g) => (
          <div key={g.name} className="min-w-0">
            <h4 className={groupLabel}>{g.name}</h4>
            <ul className="mt-3 flex flex-col gap-4">
              {g.tools.map((t) => (
                <li key={t.name} className={dot}>
                  <p className={leadText}>{t.name}</p>
                  <p className={`mt-0.5 ${subText}`}>{t.role}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Assurance study={study} />
    </Panel>
  );
}

/* Security and testing as ONE small tile under the stack. High level only,
   and the source line says where it comes from — our project
   documentation, not an audit (vrattiks-standards §3). Hairline border at
   n-0/10, no fill (Design Taste, ref 2). */
function Assurance({ study }: Props) {
  const a = study.assurance;
  if (!a) return null;
  const groups = [
    { name: "Security", items: a.security },
    { name: "Testing", items: a.testing },
  ];
  return (
    <div className="mt-8 rounded-lg border border-n-0/10 p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-[19px] leading-[1.25] tracking-[-0.015em] font-display font-bold text-n-0">Security and quality</h4>
        <p className="inline-flex items-center gap-1.5 rounded-full border border-n-0/15 px-3 py-1 text-[13px] font-semibold text-n-200">
          <Icon name="shield" className="h-3.5 w-3.5 text-brand-primary" />
          {a.source}
        </p>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
        {groups.map((g) => (
          <div key={g.name}>
            <h5 className={groupLabel}>{g.name}</h5>
            <ul className={`mt-3 flex flex-col gap-2 ${subText}`}>
              {g.items.map((item) => (
                <li key={item.text} className={dot}>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Breakdown({ study }: Props) {
  const items = [
    { id: "problem", label: "Problem and objective", content: <ProblemPanel study={study} /> },
    { id: "approach", label: "Approach and strategy", content: <ApproachPanel study={study} /> },
    { id: "solution", label: "Solution and process", content: <SolutionPanel study={study} /> },
    { id: "features", label: "Key features", content: <FeaturesPanel study={study} /> },
    { id: "tech-stack", label: "Tech stack", content: <StackPanel study={study} /> },
  ];
  return (
    <Section tone="dark" labelledBy="breakdown-heading" className="scroll-mt-16 overflow-hidden md:scroll-mt-20">
      <div aria-hidden="true" className="bg-grid-fade-dark pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <h2 id="breakdown-heading" className="text-[28px] leading-[1.15] tracking-[-0.02em] font-display font-bold text-n-0 md:text-h2">
          Project breakdown
        </h2>
        <Tabs label="Project breakdown" idPrefix="breakdown" tone="dark" items={items} className="mt-5 md:mt-6" />
        <div className="mt-10 md:mt-12">
          <Button href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>
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
          description={`${study.sample ? "Screens and code" : "Screens"} here are illustrative recreations; the real system and its data are not shown.`}
        />
        {study.illustration === "coupon-platform" ? <CouponVisuals study={study} /> : null}
        {study.illustration === "lead-flow" ? (
          <Reveal from="settle" className="mt-10 md:mt-12">
            <figure className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <figcaption className="text-[14px] text-n-600">How a lead moves through the platform, from the search to the outreach.</figcaption>
                <IllustrativeTag className="shrink-0" />
              </div>
              <div className="mt-4">
                <FlowTrace steps={study.solution} label={`Illustrative flow of the ${study.title}, in order`} />
              </div>
            </figure>
          </Reveal>
        ) : null}
        {study.illustration !== "coupon-platform" && study.illustration !== "lead-flow" ? (
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

          {study.sample ? (
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
          ) : null}
        </div>
        ) : null}
      </Container>
    </Section>
  );
}

/* Coupon platform (guide §4.2, Mode B): the flow as a trace, full width,
   then the four parts beside the WhatsApp message. Each figure carries its
   own Illustrative chip and a caption; all content comes from the entry. */
function CouponVisuals({ study }: { study: CustomStudy }) {
  return (
    <div className="mt-10 flex flex-col gap-12 md:mt-12 md:gap-14">
      <Reveal from="settle">
        <figure className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <figcaption className="text-[14px] text-n-600">The flow, from the QR scan to the updated profile.</figcaption>
            <IllustrativeTag className="shrink-0" />
          </div>
          <div className="mt-4">
            <FlowTrace steps={study.solution} label={`Illustrative flow of the ${study.title}, in order`} />
          </div>
        </figure>
      </Reveal>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center md:gap-14">
        <Reveal from="start">
          <figure className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <figcaption className="text-[14px] text-n-600">The four parts of the platform, in outline.</figcaption>
              <IllustrativeTag className="shrink-0" />
            </div>
            <div className="mt-4">
              <PanelsOverview parts={study.features.map((f) => f.title)} label="Illustrative overview of the platform's parts" />
            </div>
          </figure>
        </Reveal>
        {study.sampleMessage ? (
          <Reveal from="end" delay={0.06}>
            <figure className="relative min-w-0">
              <MessageMock message={study.sampleMessage} />
              <IllustrativeTag className="absolute -top-3 left-1/2 -translate-x-1/2" />
              <figcaption className="mt-4 text-center text-[14px] text-n-600">{study.sampleMessage.caption}</figcaption>
            </figure>
          </Reveal>
        ) : null}
      </div>
    </div>
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
      <Breakdown study={study} />
      <Visuals study={study} />
      <Outcomes study={study} />
      <AboutClient study={study} />
      <Related study={study} />
    </>
  );
}
