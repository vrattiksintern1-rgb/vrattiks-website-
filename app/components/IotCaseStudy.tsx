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
  type IotDetail,
  type IotStudy,
} from "@/app/lib/case-studies";

/* IoT case-study detail layout (docs/case-study-guides/
   iot-projects-case-study.md §2). The one idea is the SIGNAL PATH: the
   architecture is drawn as a ladder, sensor at the top, dashboard at the
   bottom, the protocol written on each rung — readable at every width
   because it never shrinks a horizontal diagram, it is vertical from the
   start (guide §8). Every system section below names the layer it belongs
   to, so the diagram doubles as the page's index.

   Deliberately NOT the listing's graphite spec sheet with crop marks
   (IotProjects), and not the graphite numbered steps or pinned stepper
   (guide §9) — this page stays light: paper → tint → white → paper.

   TODAY THIS RENDERS ONLY THE DRAFT TEMPLATE ENTRY (no confirmed IoT
   project exists). Its values are bracketed field labels; the page is
   noindex, unlinked and carries the "Template preview" notice.

   Motion (kylezantos-design §1): diagram nodes slide in from the start one
   after another, rungs fade; sections rise. Once, nothing loops; no "data
   flowing" animation; the H1 never fades (§1b). */

type Props = { study: IotStudy; detail: IotDetail };

/* Which diagram layer each system section belongs to. */
const blockLayers: Record<string, string[]> = {
  hardware: ["sensors", "device"],
  connectivity: ["gateway"],
  firmware: ["device"],
  cloud: ["cloud", "dashboard"],
};

function Hero({ study, detail }: Props) {
  const client = clientNameOf(study);
  const industry = detail.industry ?? study.industry;
  const facts = [
    { label: "Client", value: client },
    industry ? { label: "Industry", value: industry.name } : null,
    detail.location ? { label: "Location", value: detail.location } : null,
    detail.statusNote ? { label: "Status", value: detail.statusNote } : null,
  ].filter((f) => f !== null);

  return (
    <Section tone="paper" labelledBy="case-study-heading">
      <Container>
        <CaseStudyBreadcrumb study={study} />
        <Eyebrow className="mb-5">{study.kind} case study</Eyebrow>
        {/* Not wrapped in Reveal (kylezantos-design §1b). */}
        <h1
          id="case-study-heading"
          className="max-w-[22ch] text-[36px] leading-[1.05] tracking-[-0.03em] font-display font-semibold break-words text-n-900 sm:text-[44px] md:text-[52px]"
        >
          {study.title}
        </h1>
        <p className="mt-4 text-[17px] text-n-600">
          For <span className="font-semibold text-n-900">{client}</span>
        </p>
        {detail.lede ? (
          <p className="mt-5 max-w-2xl text-body-lg text-n-700">{withClient(detail.lede, study)}</p>
        ) : null}

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

/* The signal-path ladder. W3C complex-images pattern: the visual is an
   ordered list of real text (so the structure IS the long description), and
   the written description sits beside it in the figcaption. */
function Architecture({ study, detail }: Props) {
  const arch = detail.architecture;
  if (!arch) return null;
  const via = (id: string) => arch.links.find((l) => l.from === id)?.via;

  return (
    <Section tone="tint" labelledBy="architecture-heading">
      <Container>
        <SectionHeading id="architecture-heading" eyebrow="Architecture" title="How the system fits together" />
        <figure className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-12 md:gap-14">
          <div className="relative md:col-span-7">
            {detail.showcaseMode === "illustrative" ? <IllustrativeTag className="mb-4" /> : null}
            <ol aria-label={`System diagram for ${study.title}, ${clientNameOf(study)}: layers from sensor to dashboard`}>
              {arch.layers.map((layer, i) => {
                const link = i < arch.layers.length - 1 ? via(layer.id) : undefined;
                return (
                  <li key={layer.id} id={`layer-${layer.id}`} className="scroll-mt-24 md:scroll-mt-28">
                    <Reveal from="start" delay={i * 0.06}>
                      <div className="grid grid-cols-1 gap-1 rounded-md border border-n-200 bg-n-0 px-5 py-4 shadow-[var(--shadow-sm)] sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:items-baseline sm:gap-4">
                        <span className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">
                          {layer.label}
                        </span>
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
            <p className="mt-2 text-[15px] leading-[1.7] break-words text-n-700">{arch.description}</p>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}

function ProblemOnSite({ detail }: { detail: IotDetail }) {
  const objectives = detail.objectives ?? [];
  if (!detail.problem && !detail.siteContext && !objectives.length) return null;
  return (
    <Section tone="white" labelledBy="problem-heading">
      <Container>
        <SectionHeading id="problem-heading" eyebrow="The problem" title="What was happening on site" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-2 md:gap-16">
          <div>
            {detail.siteContext ? (
              <p className="text-[14px] font-semibold break-words text-n-600">{detail.siteContext}</p>
            ) : null}
            {detail.problem ? <p className="mt-3 text-body-lg break-words text-n-700">{detail.problem}</p> : null}
          </div>
          {objectives.length ? (
            <div>
              <h3 className="text-[17px] font-semibold text-n-900">What the system had to do</h3>
              <ul className="mt-3 flex flex-col gap-3">
                {objectives.map((o) => (
                  <li key={o} className="flex gap-3 text-[15px] leading-[1.6] break-words text-n-700">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand-secondary" />
                    <span className="min-w-0">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/* A real <table> at ≥901px; below that each row stacks and every cell
   shows its column name from `data-label` (iot guide §8 — no sideways
   scrolling on phones). */
function DataTable({ caption, columns, rows }: {
  caption: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string | undefined>[];
}) {
  const used = columns.filter((c) => rows.some((r) => r[c.key]));
  return (
    <table className="w-full border-collapse text-left text-[15px]">
      <caption className="sr-only">{caption}</caption>
      <thead className="max-md:sr-only">
        <tr className="border-b border-n-200 text-[13px] text-n-600">
          {used.map((c) => (
            <th key={c.key} scope="col" className="py-2.5 pr-4 font-medium">{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-n-100 max-md:flex max-md:flex-col max-md:gap-1 max-md:py-3">
            {used.map((c, j) =>
              j === 0 ? (
                <th key={c.key} scope="row" className="py-3 pr-4 align-top font-semibold break-words text-n-900 max-md:py-0">
                  {r[c.key]}
                </th>
              ) : (
                <td
                  key={c.key}
                  data-label={c.label}
                  className="py-3 pr-4 align-top break-words text-n-700 max-md:py-0 max-md:before:mr-2 max-md:before:text-[13px] max-md:before:text-n-600 max-md:before:content-[attr(data-label)_':']"
                >
                  {r[c.key] ?? "—"}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function System({ detail }: { detail: IotDetail }) {
  const layerLabel = (id: string) => detail.architecture?.layers.find((l) => l.id === id)?.label;
  const blocks: { id: string; title: string; layers: string[]; body: React.ReactNode }[] = [];

  if (detail.hardware?.length || detail.sensors?.length) {
    blocks.push({
      id: "hardware",
      title: "Hardware and sensors",
      layers: blockLayers.hardware,
      body: (
        <div className="flex flex-col gap-8">
          {detail.sensors?.length ? (
            <DataTable
              caption="Sensors"
              columns={[{ key: "measures", label: "Measures" }, { key: "role", label: "Why" }, { key: "model", label: "Model" }]}
              rows={detail.sensors}
            />
          ) : null}
          {detail.hardware?.length ? (
            <DataTable
              caption="Hardware"
              columns={[
                { key: "component", label: "Component" },
                { key: "role", label: "What it does" },
                { key: "spec", label: "Model / spec" },
                { key: "quantity", label: "Qty" },
              ]}
              rows={detail.hardware}
            />
          ) : null}
        </div>
      ),
    });
  }
  if (detail.connectivity?.length) {
    blocks.push({
      id: "connectivity",
      title: "Connectivity and protocols",
      layers: blockLayers.connectivity,
      body: (
        <DataTable
          caption="Connectivity"
          columns={[{ key: "link", label: "Link" }, { key: "protocol", label: "Protocol" }, { key: "why", label: "Why this choice" }]}
          rows={detail.connectivity}
        />
      ),
    });
  }
  if (detail.firmware) {
    const f = detail.firmware;
    blocks.push({
      id: "firmware",
      title: "Firmware and edge behaviour",
      layers: blockLayers.firmware,
      body: (
        <dl className="flex flex-col gap-4 text-[15px] leading-[1.6]">
          {[
            { k: "On the device", v: f.summary },
            { k: "When the network drops", v: f.offlineBehaviour },
            { k: "Updates", v: f.updates },
          ]
            .filter((x) => x.v)
            .map((x) => (
              <div key={x.k}>
                <dt className="font-semibold text-n-900">{x.k}</dt>
                <dd className="mt-0.5 break-words text-n-700">{x.v}</dd>
              </div>
            ))}
        </dl>
      ),
    });
  }
  if (detail.cloud) {
    const c = detail.cloud;
    blocks.push({
      id: "cloud",
      title: "Cloud, dashboard and alerts",
      layers: blockLayers.cloud,
      body: (
        <dl className="grid grid-cols-1 gap-5 text-[15px] leading-[1.6] sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-n-900">Platform</dt>
            <dd className="mt-0.5 break-words text-n-700">{c.platform}</dd>
          </div>
          {c.dataRetention ? (
            <div>
              <dt className="font-semibold text-n-900">Data kept for</dt>
              <dd className="mt-0.5 break-words text-n-700">{c.dataRetention}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-semibold text-n-900">Dashboard</dt>
            <dd className="mt-0.5 break-words text-n-700">
              <ul className="flex flex-col gap-0.5">{c.dashboard.map((d) => <li key={d}>{d}</li>)}</ul>
            </dd>
          </div>
          {c.alerts?.length ? (
            <div>
              <dt className="font-semibold text-n-900">Alerts</dt>
              <dd className="mt-0.5 break-words text-n-700">
                <ul className="flex flex-col gap-0.5">
                  {c.alerts.map((a) => <li key={a.channel + a.recipient}>{a.channel} → {a.recipient}</li>)}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      ),
    });
  }
  if (detail.deployment) {
    const d = detail.deployment;
    blocks.push({
      id: "deployment",
      title: "Deployment and installation",
      layers: [],
      body: (
        <div>
          <ol className="flex flex-col gap-2 text-[15px] leading-[1.6]">
            {d.steps.map((s, i) => (
              <li key={s} className="flex gap-3 break-words text-n-700">
                <span aria-hidden="true" className="w-5 shrink-0 font-semibold text-brand-secondary tabular-nums">{i + 1}</span>
                <span className="min-w-0">{s}</span>
              </li>
            ))}
          </ol>
          {d.scale || d.duration ? (
            <p className="mt-4 text-[14px] break-words text-n-600">
              {[d.scale, d.duration].filter(Boolean).join(" · ")}
            </p>
          ) : null}
        </div>
      ),
    });
  }
  if (detail.reliability?.length || detail.maintenance) {
    blocks.push({
      id: "reliability",
      title: "Reliability and maintenance",
      layers: [],
      body: (
        <ul className="flex flex-col gap-3 text-[15px] leading-[1.6]">
          {(detail.reliability ?? []).map((r, i) =>
            r.type === "metric" ? (
              <li key={i} className="break-words text-n-700">
                <span className="font-semibold text-n-900">{r.value}</span> {r.label}
                <span className="text-n-600"> · {r.period}</span>
              </li>
            ) : (
              <li key={i} className="break-words text-n-700">{r.text}</li>
            ),
          )}
          {detail.maintenance ? <li className="break-words text-n-700">{detail.maintenance}</li> : null}
        </ul>
      ),
    });
  }
  if (detail.security?.length) {
    blocks.push({
      id: "security",
      title: "Security",
      layers: [],
      body: (
        <ul className="grid grid-cols-1 gap-3 text-[15px] leading-[1.6] sm:grid-cols-2">
          {detail.security.map((s) => (
            <li key={s} className="flex gap-3 break-words text-n-700">
              <Icon name="shield" className="mt-1 h-4 w-4 shrink-0 text-brand-secondary" />
              <span className="min-w-0">{s}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (!blocks.length) return null;

  return (
    <Section tone="paper" labelledBy="system-heading">
      <Container>
        <SectionHeading id="system-heading" eyebrow="The system" title="Layer by layer" />
        <div className="mt-10 flex flex-col md:mt-12">
          {blocks.map((b) => (
            <Reveal key={b.id}>
              <article
                id={b.id}
                aria-labelledby={`${b.id}-title`}
                className="grid scroll-mt-24 grid-cols-1 gap-4 border-t border-n-200 py-8 md:scroll-mt-28 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-12"
              >
                <div>
                  <h3 id={`${b.id}-title`} className="text-[20px] leading-[1.25] tracking-[-0.01em] font-display font-bold text-n-900">
                    {b.title}
                  </h3>
                  {/* Layer tags link back up to the diagram */}
                  <p className="mt-3 flex flex-wrap gap-2">
                    {(b.layers.length ? b.layers : ["system"]).map((id) => {
                      const label = id === "system" ? "Whole system" : layerLabel(id);
                      if (!label) return null;
                      return id === "system" ? (
                        <span key={id} className="rounded-full border border-n-200 px-2.5 py-0.5 text-[12.5px] text-n-600">
                          {label}
                        </span>
                      ) : (
                        <a
                          key={id}
                          href={`#layer-${id}`}
                          className="focus-glow rounded-full border border-n-200 px-2.5 py-0.5 text-[12.5px] text-brand-secondary transition-colors duration-150 hover:border-brand-primary"
                        >
                          Layer: {label}
                        </a>
                      );
                    })}
                  </p>
                </div>
                <div className="min-w-0">{b.body}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* Results, quote and related links. Results render only when verified. */
function Close({ study, detail }: Props) {
  const links = relatedLinks(study, detail.industry ?? study.industry);
  const results = study.results ?? [];
  const quote = detail.testimonial;
  return (
    <Section tone="white" labelledBy="close-heading">
      <Container>
        <SectionHeading id="close-heading" eyebrow="Outcomes" title={results.length || detail.outcomes?.length ? "What changed" : "Results"} />
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
          <ul className="mt-6 flex max-w-2xl flex-col gap-2 text-body-lg text-n-700">
            {detail.outcomes.map((o) => <li key={o}>{o}</li>)}
          </ul>
        ) : null}
        {!results.length && !detail.outcomes?.length ? (
          <p className="mt-4 max-w-xl text-body-lg text-n-700">
            Results are added only once they have been measured with the client.
          </p>
        ) : null}
        {quote ? (
          <figure className="mt-8 max-w-2xl border-l-2 border-brand-secondary pl-6">
            <blockquote className="text-[20px] leading-[1.5] font-display font-semibold text-n-900">{quote.quote}</blockquote>
            <figcaption className="mt-3 text-[14px] text-n-600">{quote.name}, {quote.role}</figcaption>
          </figure>
        ) : null}

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-1 border-t border-n-200 pt-6">
          {[...links.map((l) => ({ href: l.href, text: `${l.label}: ${l.name}` })), { href: "/case-studies", text: "All case studies" }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="focus-glow group inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-semibold text-brand-secondary"
              >
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
  return (
    <>
      <Hero {...props} />
      <Architecture {...props} />
      <ProblemOnSite detail={props.detail} />
      <System detail={props.detail} />
      <Close {...props} />
    </>
  );
}
