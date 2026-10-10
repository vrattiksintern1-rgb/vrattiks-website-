import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import CaseStudyBreadcrumb from "./CaseStudyBreadcrumb";
import IllustrativeTag from "./IllustrativeTag";
import {
  clientNameOf,
  relatedLinks,
  withClient,
  type CustomDetail,
  type CustomStudy,
  type Tool,
} from "@/app/lib/case-studies";

/* Custom-development case-study detail layout (docs/case-study-guides/
   custom-development-case-study.md §2). The one idea is the CASE FILE:
   honest status first — a ruled fact panel beside the H1 with the project's
   state in the hero, never buried (guide §1, "why status matters most").
   Then a graphite map of the parts on the page's one dark band (CLAUDE.md
   Design Taste, ref 2), a labelled chat + code recreation, and a closing
   "Where it stands".

   Different from the website layout (screen-led, light throughout) and from
   every pattern in the guide §9 audit: no numerals/alternating rows
   (CustomProjects), no pinned stepper (Process), no graphite numbered steps
   (ServiceSteps) — the dark band is a map of parts, not a sequence.

   Sections for problem, objective, approach, workflow, the AI's role and
   data handling render only when those fields are confirmed. Today none
   are (vrattiks-standards §3), so the page is short on purpose.

   Motion (kylezantos-design §1): map nodes fade in once, the code sample
   slides in from the end. Nothing loops; the H1 never fades (§1b). */

type Props = { study: CustomStudy; detail: CustomDetail };

const IN_PROGRESS = new Set(["in-progress", "pilot", "prototype"]);

function Hero({ study, detail }: Props) {
  const client = clientNameOf(study);
  const industry = detail.industry ?? study.industry;
  const rows = [
    { label: "Client", value: client },
    industry ? { label: "Industry", value: industry.name } : null,
    detail.channel ? { label: "Channel", value: detail.channel } : null,
    /* Status is not repeated here: the hero chip carries it. */
    detail.stack?.length ? { label: "Built with", value: detail.stack.map((t) => t.name).join(", ") } : null,
  ].filter((r) => r !== null);

  return (
    <Section tone="white" labelledBy="case-study-heading">
      <Container>
        <CaseStudyBreadcrumb study={study} />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start md:gap-16">
          <div>
            <Eyebrow className="mb-5">{study.kind} case study</Eyebrow>
            {/* Not wrapped in Reveal (kylezantos-design §1b). */}
            <h1
              id="case-study-heading"
              className="max-w-[18ch] text-[36px] leading-[1.05] tracking-[-0.03em] font-display font-semibold text-n-900 sm:text-[44px] md:text-[52px]"
            >
              {study.title}
            </h1>
            <p className="mt-4 text-[17px] text-n-600">
              Built for <span className="font-semibold text-n-900">{client}</span>
            </p>
            {detail.lede ? (
              <p className="mt-5 max-w-xl text-body-lg text-n-700">{withClient(detail.lede, study)}</p>
            ) : null}
            {detail.statusNote ? (
              /* Info colour for its assigned meaning — a neutral status
                 notice, not a warning or a success (docs/index.html §3). */
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-sem-info-bg px-3.5 py-1.5 text-[14px] font-semibold text-sem-info-text">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sem-info" />
                {detail.statusNote}
              </p>
            ) : null}
          </div>

          {/* The case file. Accent is confined to its top edge (CLAUDE.md
              Design Taste, ref 1) — one device, no fill, no shadow. */}
          <div className="border-t-2 border-brand-secondary">
            <p className="pt-4 pb-2 font-body text-label font-semibold tracking-[0.14em] text-n-600 uppercase">
              Case file
            </p>
            <dl>
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-4 border-b border-n-200 py-3"
                >
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

/* Optional: the job before, and what "done" means. */
function TheJob({ detail }: { detail: CustomDetail }) {
  const objective = detail.objective ?? [];
  const approach = detail.approach ?? [];
  if (!detail.problem && !objective.length && !approach.length) return null;
  return (
    <Section tone="paper" labelledBy="job-heading">
      <Container>
        <SectionHeading id="job-heading" eyebrow="The job" title="What needed to change" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-2 md:gap-16">
          {detail.problem ? (
            <div>
              <h3 className="text-[18px] font-semibold text-n-900">The problem</h3>
              <p className="mt-2 text-body-lg text-n-700">{detail.problem}</p>
            </div>
          ) : null}
          {objective.length ? (
            <div>
              <h3 className="text-[18px] font-semibold text-n-900">The objective</h3>
              <ul className="mt-2 flex flex-col gap-2 text-body-lg text-n-700">
                {objective.map((o) => (
                  <li key={o} className="flex gap-3">
                    <Icon name="check" className="mt-1.5 h-4 w-4 shrink-0 text-brand-secondary" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        {approach.length ? (
          <dl className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-16">
            {approach.map((d) => (
              <div key={d.decision} className="border-l-2 border-brand-secondary pl-4">
                <dt className="text-[16px] font-semibold text-n-900">{d.decision}</dt>
                <dd className="mt-1 text-[15px] leading-[1.6] text-n-600">{d.why}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </Section>
  );
}

function ToolNode({ tool, side, delay }: { tool: Tool; side: "start" | "end"; delay: number }) {
  return (
    <Reveal as="li" from="fade" delay={delay} className="relative">
      <div className="rounded-md border border-n-0/10 bg-n-0/5 px-4 py-3">
        <p className="text-[16px] font-semibold text-n-0">{tool.name}</p>
        {tool.role ? <p className="mt-0.5 text-[14px] leading-[1.5] text-n-300">{tool.role}</p> : null}
      </div>
      {/* Connector to the centre node, desktop only. Decorative. */}
      <span
        aria-hidden="true"
        className={`absolute top-1/2 hidden h-px w-8 bg-n-0/20 md:block ${side === "start" ? "-right-8" : "-left-8"}`}
      />
    </Reveal>
  );
}

/* The parts, as a map: the client's own tools on one side, what runs
   underneath on the other, the assistant in the middle. It shows WHAT is
   connected, not the order of steps — the step-by-step flow (`workflow`)
   is a separate list that renders only once confirmed. */
function PartsMap({ study, detail }: Props) {
  const stack = detail.stack ?? [];
  const workflow = detail.workflow ?? [];
  if (!stack.length && !workflow.length) return null;
  const connected = stack.filter((t) => t.group === "connected");
  const internal = stack.filter((t) => t.group !== "connected");

  return (
    <Section tone="dark" labelledBy="setup-heading" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid-fade-dark pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <SectionHeading
          id="setup-heading"
          tone="dark"
          eyebrow="The setup"
          title="The parts it's built from"
          description={workflow.length ? undefined : "This shows what is connected, not the order of the steps."}
        />

        {stack.length ? (
          <figure className="mt-10 md:mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)] md:items-center md:gap-16">
              {connected.length ? (
                <div>
                  <p className="mb-3 font-body text-label font-semibold tracking-[0.14em] text-n-300 uppercase">
                    Connected to the client&apos;s tools
                  </p>
                  <ul className="flex flex-col gap-3">
                    {connected.map((t, i) => (
                      <ToolNode key={t.name} tool={t} side="start" delay={i * 0.06} />
                    ))}
                  </ul>
                </div>
              ) : <div className="hidden md:block" />}

              <Reveal from="fade" delay={0.12} className="relative">
                {/* The project itself, at the centre. One accent: its
                    brand-primary border on the muted ramp. */}
                <div className="rounded-lg border border-brand-primary/60 bg-n-0/5 px-5 py-6 text-center shadow-[var(--shadow-glow)]">
                  <p className="font-body text-label font-semibold tracking-[0.14em] text-brand-primary uppercase">
                    {detail.channel ?? "Project"}
                  </p>
                  <p className="mt-2 text-[20px] leading-[1.25] font-display font-bold text-n-0">{study.title}</p>
                </div>
              </Reveal>

              {internal.length ? (
                <div>
                  <p className="mb-3 font-body text-label font-semibold tracking-[0.14em] text-n-300 uppercase">
                    Under the hood
                  </p>
                  <ul className="flex flex-col gap-3">
                    {internal.map((t, i) => (
                      <ToolNode key={t.name} tool={t} side="end" delay={0.18 + i * 0.06} />
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <figcaption className="mt-8 max-w-2xl text-[14px] leading-[1.6] text-n-300">
              Diagram of the tools {study.title} uses, grouped by whether the client already works in them.
            </figcaption>
          </figure>
        ) : null}

        {workflow.length ? (
          <ol className="mt-12 flex flex-col gap-4">
            {workflow.map((w, i) => (
              <li key={w.step} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-n-0/10 pb-4">
                <span className="text-[14px] text-n-300 tabular-nums">Step {i + 1}</span>
                <span className="text-[16px] font-semibold text-n-0">{w.step}</span>
                {w.tool ? <span className="rounded-full border border-n-0/15 px-2.5 py-0.5 text-[13px] text-n-200">{w.tool}</span> : null}
                {w.detail ? <span className="basis-full text-[15px] text-n-300">{w.detail}</span> : null}
              </li>
            ))}
          </ol>
        ) : null}
      </Container>
    </Section>
  );
}

/* Optional: the trust section — what the AI does, doesn't, and when a
   person takes over (guide §2.6). */
function AiRole({ detail }: { detail: CustomDetail }) {
  const ai = detail.aiRole;
  const data = detail.dataHandling ?? [];
  if (!ai && !data.length) return null;
  const cols = [
    ai?.does.length ? { title: "What the AI does", items: ai.does } : null,
    ai?.doesNot?.length ? { title: "What it doesn't decide", items: ai.doesNot } : null,
    ai?.handoff ? { title: "When a person steps in", items: [ai.handoff] } : null,
    data.length ? { title: "Data it handles", items: data } : null,
  ].filter((c) => c !== null);
  return (
    <Section tone="white" labelledBy="ai-role-heading">
      <Container>
        <SectionHeading id="ai-role-heading" eyebrow="Safeguards" title="Where a person stays in charge" />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {cols.map((c) => (
            <div key={c.title} className="border-t border-n-200 pt-4">
              <h3 className="text-[16px] font-semibold text-n-900">{c.title}</h3>
              <ul className="mt-2 flex flex-col gap-1.5 text-[15px] leading-[1.6] text-n-600">
                {c.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* A chat screen with no words in it: bubbles are bars, so it shows the
   shape of the channel without inventing a single message. */
function ChatRecreation({ label }: { label: string }) {
  const bubbles: { side: "in" | "out"; w: string }[] = [
    { side: "in", w: "w-[62%]" },
    { side: "out", w: "w-[70%]" },
    { side: "out", w: "w-[48%]" },
    { side: "in", w: "w-[40%]" },
    { side: "out", w: "w-[66%]" },
  ];
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] rounded-xl border border-n-200 bg-n-0 p-1.5 shadow-[var(--shadow-lg)]">
      <div aria-hidden="true" className="flex aspect-[9/16] flex-col overflow-hidden rounded-lg bg-n-50">
        <div className="flex items-center gap-3 border-b border-n-100 bg-n-0 px-4 py-3">
          <span className="h-8 w-8 rounded-full bg-n-200" />
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="h-2 w-[50%] rounded-full bg-n-300" />
            <span className="h-1.5 w-[30%] rounded-full bg-n-200" />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          {bubbles.map((b, i) => (
            <span
              key={i}
              className={`block h-9 rounded-md ${b.w} ${
                b.side === "in" ? "self-start border border-n-200 bg-n-0" : "self-end bg-brand-secondary/15"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-n-100 bg-n-0 px-3 py-2.5">
          <span className="h-8 flex-1 rounded-full border border-n-200" />
          <span className="h-8 w-8 rounded-full bg-brand-secondary/70" />
        </div>
      </div>
    </div>
  );
}

function Sample({ study, detail }: Props) {
  if (detail.showcaseMode !== "illustrative" || (!detail.sample && !detail.channel)) return null;
  const client = clientNameOf(study);
  return (
    <Section tone="paper" labelledBy="sample-heading">
      <Container>
        <SectionHeading
          id="sample-heading"
          eyebrow="In outline"
          title="What it looks like"
          description={`Screens and code on this page are illustrative recreations; ${client}'s data and setup are not shown.`}
        />
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:items-center md:gap-14">
          {detail.channel ? (
            <figure className="relative">
              <Reveal from="settle">
                <ChatRecreation
                  label={`Illustrative recreation of a ${detail.channel} chat with the ${study.title} for ${client}. No real messages are shown.`}
                />
              </Reveal>
              <IllustrativeTag className="absolute -top-3 left-1/2 -translate-x-1/2" />
              <figcaption className="mt-4 text-center text-[14px] text-n-600">
                A {detail.channel} chat, in outline
              </figcaption>
            </figure>
          ) : null}

          {detail.sample ? (
            <Reveal from="end" delay={0.06}>
              <figure className="relative min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <figcaption className="text-[14px] text-n-600">{detail.sample.caption}</figcaption>
                  <IllustrativeTag className="shrink-0" />
                </div>
                {/* Scrolls inside the block, never widens the page; focusable
                    so keyboard users can scroll it (vrattiks-accessibility).
                    Body face with tabular figures — the design system allows
                    no third (mono) typeface (CLAUDE.md). */}
                <pre
                  tabIndex={0}
                  aria-label="Sample code"
                  className="focus-glow mt-3 overflow-x-auto rounded-md border border-n-200 bg-n-0 p-5 text-[14px] leading-[1.7] text-n-800 tabular-nums md:p-6"
                >
                  <code className="font-body">{detail.sample.code}</code>
                </pre>
              </figure>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/* Where it stands + related links. For unfinished work the page says so
   and shows no results — not "expected", not "projected" (guide §5). */
function Status({ study, detail }: Props) {
  const links = relatedLinks(study, detail.industry ?? study.industry);
  const unfinished = detail.projectState ? IN_PROGRESS.has(detail.projectState) : false;
  const results = study.results ?? [];
  const quote = detail.testimonial;

  return (
    <Section tone="white" labelledBy="status-heading">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <SectionHeading id="status-heading" eyebrow="Status" title="Where it stands" />
          {detail.statusNote ? (
            <p className="mt-6 text-[24px] leading-[1.25] font-display font-semibold text-n-900 md:text-[28px]">
              {detail.statusNote}.
            </p>
          ) : null}
          {unfinished && !results.length ? (
            <p className="mt-3 max-w-xl text-body-lg text-n-700">
              Results will be added here once it is running and {clientNameOf(study)} has measured them.
            </p>
          ) : null}
          {detail.nextSteps ? <p className="mt-3 max-w-xl text-body-lg text-n-700">{detail.nextSteps}</p> : null}
          {results.length ? (
            <ul className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
              {results.map((r) => (
                <li key={r.label}>
                  <span className="block font-display text-[40px] leading-none font-bold text-n-900">{r.value}</span>
                  <span className="mt-2 block text-[14px] text-n-700">{r.label}</span>
                  <span className="mt-1 block text-[13px] text-n-600">{r.period} · {r.source}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {detail.outcomes?.length ? (
            <ul className="mt-6 flex flex-col gap-2 text-body-lg text-n-700">
              {detail.outcomes.map((o) => <li key={o}>{o}</li>)}
            </ul>
          ) : null}
          {quote ? (
            <figure className="mt-8 border-l-2 border-brand-secondary pl-6">
              <blockquote className="text-[20px] leading-[1.5] font-display font-semibold text-n-900">{quote.quote}</blockquote>
              <figcaption className="mt-3 text-[14px] text-n-600">{quote.name}, {quote.role}</figcaption>
            </figure>
          ) : null}
        </div>

        {/* vrattiks-architecture §5: service + industry + listing */}
        <nav aria-label="Related pages" className="md:pt-2">
          <p className="font-body text-label font-semibold tracking-[0.14em] text-n-600 uppercase">Related</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {[...links.map((l) => ({ href: l.href, text: l.name, pre: l.label })), { href: "/case-studies", text: "All case studies", pre: "" }].map(
              (l) => (
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
              ),
            )}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}

export default function CustomCaseStudy(props: Props) {
  return (
    <>
      <Hero {...props} />
      <TheJob detail={props.detail} />
      <PartsMap {...props} />
      <AiRole detail={props.detail} />
      <Sample {...props} />
      <Status {...props} />
    </>
  );
}
