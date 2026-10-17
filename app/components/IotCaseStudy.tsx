import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import CaseStudyBreadcrumb from "./CaseStudyBreadcrumb";
import IllustrativeTag from "./IllustrativeTag";
import { relatedLinks, sectionFor, type IotStudy } from "@/app/lib/case-studies";

/* IoT case-study detail layout (docs/case-study-guides/
   iot-projects-case-study.md §2). The one idea is the SIGNAL PATH: the
   system is drawn as a vertical ladder, sensor at the top, dashboard at the
   bottom, the link written on each rung — readable at every width because
   it never shrinks a horizontal diagram (guide §8). Features carry layer
   tags that link to the diagram, so it doubles as the page's index.

   Section order (user brief 2026-10-12): opener → overview → the full
   story → brief → problem and objectives → approach → solution and process
   → key features → visuals (the diagram) → outcomes (only when real) →
   about the client → related → FinalCTA. The tech stack section was
   removed at the user's request (2026-10-17); `stack` stays in the data.

   Stays light (paper / white / tint) — not the custom layout's dark band,
   not the website layout's screens.
   Motion (kylezantos-design §1): diagram nodes slide in from the start one
   after another, rungs fade; sections rise. Once, nothing loops; no "data
   flowing" animation; the H1 never fades (§1b). */

type Props = { study: IotStudy };

function layerLabel(study: IotStudy, id?: string) {
  return study.architecture.layers.find((l) => l.id === id)?.label;
}

/* A small tag linking to the layer on the diagram. */
function LayerTag({ study, id }: { study: IotStudy; id?: string }) {
  const label = layerLabel(study, id);
  if (!label) return null;
  return (
    <a
      href={`#layer-${id}`}
      className="focus-glow inline-flex min-h-6 items-center rounded-full border border-n-200 px-2.5 text-[12.5px] text-brand-secondary transition-colors duration-150 hover:border-brand-primary"
    >
      Layer: {label}
    </a>
  );
}

function Hero({ study }: Props) {
  const facts = [
    { label: "Client", value: study.clientName },
    { label: "Category", value: sectionFor(study.category).label },
    { label: "Status", value: study.statusLabel },
    ...study.keyFacts,
  ];

  return (
    <Section tone="paper" labelledBy="case-study-heading">
      <Container>
        <CaseStudyBreadcrumb study={study} />
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Eyebrow>{study.kind} case study</Eyebrow>
        </div>
        {/* Not wrapped in Reveal (kylezantos-design §1b). */}
        <h1
          id="case-study-heading"
          className="max-w-[22ch] text-[36px] leading-[1.05] tracking-[-0.03em] font-display font-semibold break-words text-n-900 sm:text-[44px] md:text-[52px]"
        >
          {study.title}
        </h1>
        <p className="mt-4 text-[17px] text-n-600">
          For <span className="font-semibold text-n-900">{study.clientName}</span>
        </p>
        <p className="mt-5 max-w-2xl text-body-lg text-n-700">{study.summary.text}</p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-l-2 border-brand-secondary pl-5 md:mt-10">
          {facts.map((f) => (
            <div key={f.label} className="min-w-0">
              <dt className="text-[13px] text-n-600">{f.label}</dt>
              <dd className="mt-0.5 text-[15px] font-medium break-words text-n-800">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* Overview, then the story on a hairline rail — the ladder's rule, reused
   as a reading line. */
function Story({ study }: { study: IotStudy }) {
  return (
    <>
      <Section tone="white" labelledBy="overview-heading" className="pb-8 sm:pb-10 md:pb-12">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5">
              <SectionHeading id="overview-heading" eyebrow="Overview" title="The project at a glance" />
            </div>
            <Reveal className="md:col-span-7 md:pt-8">
              <p className="text-[20px] leading-[1.5] tracking-[-0.01em] font-display font-semibold text-n-900 md:text-[23px]">
                {study.overview.text}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
      <Section tone="white" labelledBy="story-heading" className="pt-0 sm:pt-0 md:pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-14">
            <h2 id="story-heading" className="text-[22px] leading-[1.25] tracking-[-0.015em] font-display font-bold text-n-900 md:col-span-5">
              The full story
            </h2>
            <div className="flex flex-col gap-5 border-l border-n-300 pl-6 text-body-lg text-n-700 md:col-span-7">
              {study.description.map((p) => (
                <p key={p.text} className="break-words">
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

function Brief({ study }: { study: IotStudy }) {
  return (
    <Section tone="paper" labelledBy="brief-heading">
      <Container>
        <SectionHeading id="brief-heading" eyebrow="The client brief" title="What the client asked for" />
        <div className="mt-6 grid max-w-4xl grid-cols-1 gap-4 text-body-lg text-n-700 md:grid-cols-2 md:gap-10">
          {study.brief.map((p) => (
            <p key={p.text} className="break-words">
              {p.text}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProblemOnSite({ study }: { study: IotStudy }) {
  return (
    <Section tone="white" labelledBy="problem-heading">
      <Container>
        <SectionHeading id="problem-heading" eyebrow="Problem and objectives" title="What the system has to solve" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-[17px] font-semibold text-n-900">The problem</h3>
            <p className="mt-3 text-body-lg break-words text-n-700">{study.problem.text}</p>
          </div>
          <div>
            <h3 className="text-[17px] font-semibold text-n-900">What the system has to do</h3>
            <ul className="mt-3 flex flex-col gap-3">
              {study.objectives.map((o) => (
                <li key={o.text} className="flex gap-3 text-[15.5px] leading-[1.6] break-words text-n-700">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand-secondary" />
                  <span className="min-w-0">{o.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Decisions as small raised nodes — the same object the ladder uses. */
function Approach({ study }: { study: IotStudy }) {
  return (
    <Section tone="tint" labelledBy="approach-heading">
      <Container>
        <SectionHeading id="approach-heading" eyebrow="Approach and strategy" title="Design decisions" />
        <dl className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {study.approach.map((d, i) => (
            <Reveal key={d.title} from="start" delay={i * 0.06} className="rounded-md border border-n-200 bg-n-0 px-5 py-5 shadow-[var(--shadow-sm)]">
              <dt className="text-[17px] font-semibold text-n-900">{d.title}</dt>
              <dd className="mt-1.5 text-[15px] leading-[1.6] break-words text-n-700">{d.text}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* The build, stage by stage: a ruled row per step, title left, work right. */
function Solution({ study }: { study: IotStudy }) {
  return (
    <Section tone="paper" labelledBy="solution-heading">
      <Container>
        <SectionHeading id="solution-heading" eyebrow="Solution and process" title="Stage by stage" />
        <ol className="mt-10 flex flex-col md:mt-12">
          {study.solution.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              className="grid grid-cols-1 gap-2 border-t border-n-200 py-6 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-12"
            >
              <h3 className="flex gap-3 text-[18px] leading-[1.3] font-display font-bold text-n-900">
                <span className="w-6 shrink-0 font-body text-[15px] font-semibold text-brand-secondary tabular-nums">{i + 1}</span>
                <span className="min-w-0">{s.title}</span>
              </h3>
              <div className="min-w-0 pl-9 text-[15.5px] leading-[1.6] break-words text-n-700 md:pl-0">
                <p>{s.text}</p>
                {s.note ? <p className="mt-1.5">{s.note.text}</p> : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function Features({ study }: { study: IotStudy }) {
  return (
    <Section tone="white" labelledBy="features-heading">
      <Container>
        <SectionHeading id="features-heading" eyebrow="Key features" title="What the machine does" />
        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {study.features.map((f) => (
            <li key={f.title} className="flex flex-col items-start">
              <h3 className="text-[17px] font-semibold text-n-900">{f.title}</h3>
              <p className="mt-1.5 text-[15px] leading-[1.6] break-words text-n-600">{f.text}</p>
              {f.layer ? (
                <span className="mt-3">
                  <LayerTag study={study} id={f.layer} />
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* The signal-path ladder. W3C complex-images pattern: the visual is an
   ordered list of real text (so the structure IS the long description), and
   the written description sits beside it in the figcaption. Always labelled
   Illustrative until a confirmed diagram replaces it. */
function Visuals({ study }: { study: IotStudy }) {
  const arch = study.architecture;
  const via = (id: string) => arch.links.find((l) => l.from === id)?.via;

  return (
    <Section tone="tint" labelledBy="visuals-heading">
      <Container>
        <SectionHeading id="visuals-heading" eyebrow="Visuals" title="How the system fits together" />
        <figure className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-12 md:gap-14">
          <div className="relative md:col-span-7">
            <IllustrativeTag className="mb-4" />
            <ol aria-label={`Illustrative system diagram for ${study.title}: layers from sensor to dashboard`}>
              {arch.layers.map((layer, i) => {
                const link = i < arch.layers.length - 1 ? via(layer.id) : undefined;
                return (
                  <li key={layer.id} id={`layer-${layer.id}`} className="scroll-mt-24 md:scroll-mt-28">
                    <Reveal from="start" delay={i * 0.06}>
                      <div className="grid grid-cols-1 gap-1 rounded-md border border-n-200 bg-n-0 px-5 py-4 shadow-[var(--shadow-sm)] sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:items-baseline sm:gap-4">
                        <span className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">{layer.label}</span>
                        <span className="text-[15px] break-words text-n-800">{layer.role}</span>
                      </div>
                    </Reveal>
                    {i < arch.layers.length - 1 ? (
                      <Reveal from="fade" delay={i * 0.06 + 0.03} className="flex items-stretch gap-4 pl-8">
                        <span aria-hidden="true" className="w-px shrink-0 bg-n-300" />
                        <span className="min-w-0 py-3 text-[13.5px] break-words text-n-600">
                          {link ? (
                            <>
                              <span className="sr-only">Connects to the next layer via </span>
                              {link}
                            </>
                          ) : (
                            <span aria-hidden="true">&nbsp;</span>
                          )}
                        </span>
                      </Reveal>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
          <figcaption className="md:col-span-5 md:pt-12">
            <h3 className="text-[17px] font-semibold text-n-900">In words</h3>
            <p className="mt-2 text-[15px] leading-[1.7] break-words text-n-700">{arch.description.text}</p>
            <p className="mt-4 text-[14px] leading-[1.6] text-n-600">
              Diagrams on this page are illustrative; site photos and live data are not shown.
            </p>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}

/* Only real, confirmed outcomes — otherwise not rendered (guide §2.12). */
function Outcomes({ study }: { study: IotStudy }) {
  if (!study.outcomes.length) return null;
  return (
    <Section tone="white" labelledBy="outcomes-heading">
      <Container>
        <SectionHeading id="outcomes-heading" eyebrow="Outcomes" title="What changed" />
        <ul className="mt-6 flex max-w-2xl flex-col gap-2 text-body-lg text-n-700">
          {study.outcomes.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </Container>
    </Section>
  );
}

function AboutClient({ study }: { study: IotStudy }) {
  return (
    <Section tone="white" labelledBy="about-heading">
      <Container>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <Eyebrow className="mb-3">About the client</Eyebrow>
            <h2 id="about-heading" className="text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
              {study.clientName}
            </h2>
          </div>
          <div className="flex flex-col gap-3 border-l border-n-300 pl-6 text-body-lg text-n-700 md:col-span-7 md:mt-8">
            {study.aboutClient.map((p) => (
              <p key={p.text} className="break-words">
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Related links: service(s), industry, listing (vrattiks-architecture §5). */
function Related({ study }: { study: IotStudy }) {
  const links = [
    ...relatedLinks(study).map((l) => ({ href: l.href, text: `${l.label}: ${l.name}` })),
    { href: "/case-studies", text: "All case studies" },
  ];
  return (
    <Section tone="paper" labelledBy="related-heading">
      <Container>
        <h2 id="related-heading" className="text-[20px] leading-[1.25] font-display font-bold text-n-900">
          Related
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-1 border-t border-n-200 pt-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="focus-glow group inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-semibold text-brand-secondary">
                <span className="underline-offset-4 group-hover:underline">{l.text}</span>
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export default function IotCaseStudy(props: Props) {
  const { study } = props;
  return (
    <>
      <Hero {...props} />
      <Story study={study} />
      <Brief study={study} />
      <ProblemOnSite study={study} />
      <Approach study={study} />
      <Solution study={study} />
      <Features study={study} />
      <Visuals study={study} />
      <Outcomes study={study} />
      <AboutClient study={study} />
      <Related study={study} />
    </>
  );
}
