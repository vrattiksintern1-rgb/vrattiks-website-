import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import CaseStudyBreadcrumb from "./CaseStudyBreadcrumb";
import IllustrativeTag from "./IllustrativeTag";
import { AnnotatedLanding, DesktopScreen, PhoneScreen } from "./WebsiteScreens";
import {
  clientNameOf,
  relatedLinks,
  withClient,
  type CaseStudyMedia,
  type LeadAnchor,
  type WebsiteDetail,
  type WebsiteStudy,
} from "@/app/lib/case-studies";

/* Website case-study detail layout (docs/case-study-guides/
   website-development-case-study.md §2). Screen-led: the one idea is that
   the work is SHOWN — a desktop + phone pair in the hero (responsiveness
   shown, not claimed), then an annotated screen whose numbered markers walk
   the lead path. None of these patterns exist elsewhere on the site
   (guide §9 audit): no split hero, no browser-frame gallery, no numerals.

   Every section after the hero renders only when its fields hold confirmed
   content (vrattiks-standards §3) — with today's data that is the brief, the
   lead path and "Built with"; quality checks, outcomes, before/after and a
   quote stay hidden until real values exist.

   Motion (kylezantos-design §1, once, transform/opacity only): screens
   `settle`, list items rise in order. Nothing loops; the H1 never fades
   (§1b). Tones: paper → white → tint → paper, then the gradient CTA. */

type Props = { study: WebsiteStudy; detail: WebsiteDetail };

function RealScreen({ media, priority = false }: { media: CaseStudyMedia; priority?: boolean }) {
  return (
    <span
      className="relative block overflow-hidden rounded-lg border border-n-200 bg-n-50 shadow-[var(--shadow-lg)]"
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
    >
      {/* vrattiks-performance: next/image, sized frame (no layout shift);
          `priority` only on the hero screenshot, the LCP element. */}
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        sizes={media.device === "mobile" ? "(min-width: 601px) 22vw, 60vw" : "(min-width: 1440px) 1300px, 92vw"}
        className="object-cover object-top"
      />
    </span>
  );
}

function Hero({ study, detail }: Props) {
  const client = clientNameOf(study);
  const industry = detail.industry ?? study.industry;
  const real = detail.showcaseMode === "real";
  const desktop = real ? detail.media?.find((m) => !m.illustrative && m.device !== "mobile") : undefined;
  const phone = real ? detail.media?.find((m) => !m.illustrative && m.device === "mobile") : undefined;
  const illustrative = !desktop;

  const facts = [
    { label: "Client", value: client },
    industry ? { label: "Industry", value: industry.name, href: industry.slug ? `/industries/${industry.slug}` : undefined } : null,
    detail.location ? { label: "Location", value: detail.location } : null,
    detail.projectType ? { label: "Project type", value: detail.projectType } : null,
    detail.stack?.length ? { label: "Built with", value: detail.stack.map((t) => t.name).join(", ") } : null,
    detail.statusNote ? { label: "Status", value: detail.statusNote } : null,
  ].filter((f) => f !== null);

  return (
    <Section tone="paper" labelledBy="case-study-heading">
      <Container>
        <CaseStudyBreadcrumb study={study} />
        <Eyebrow className="mb-5">{study.kind} case study</Eyebrow>
        {/* Not wrapped in Reveal: the H1 is readable the instant it paints
            (kylezantos-design §1b). */}
        <h1
          id="case-study-heading"
          className="max-w-[20ch] text-[36px] leading-[1.05] tracking-[-0.03em] font-display font-semibold text-n-900 sm:text-[44px] md:text-[56px]"
        >
          {study.title}
        </h1>
        {detail.lede ? (
          <p className="mt-5 max-w-2xl text-body-lg text-n-700">{withClient(detail.lede, study)}</p>
        ) : null}

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6 md:mt-10">
          {facts.map((f) => (
            <div key={f.label} className="min-w-0 border-t border-n-200 pt-3">
              <dt className="text-[13px] text-n-600">{f.label}</dt>
              <dd className="mt-1 text-[15px] font-medium break-words text-n-800">
                {"href" in f && f.href ? (
                  <Link href={f.href} className="focus-glow inline-flex min-h-6 items-center rounded-sm text-brand-secondary underline-offset-4 hover:underline">
                    {f.value}
                  </Link>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
          {/* Live link only with the client's OK — `url` stays empty until then. */}
          {study.url ? (
            <div className="min-w-0 border-t border-n-200 pt-3">
              <dt className="text-[13px] text-n-600">Live site</dt>
              <dd className="mt-1">
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-glow inline-flex min-h-11 items-center gap-1.5 rounded-sm text-[15px] font-semibold text-brand-secondary"
                >
                  Visit site
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </div>
          ) : null}
        </dl>

        <figure className="mt-10 max-w-[1120px] md:mt-12">
          <Reveal from="settle">
            <div className="relative sm:pb-[8%]">
              {desktop ? (
                <div className="sm:pr-[14%]">
                  <RealScreen media={desktop} priority />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label={`Illustrative recreation of the ${client} website on a desktop screen and a phone. Not a screenshot.`}
                >
                  <span className="block sm:pr-[14%]">
                    <DesktopScreen />
                  </span>
                  <PhoneScreen className="absolute right-0 bottom-0 hidden w-[22%] max-w-[220px] sm:block" />
                </div>
              )}
              {desktop && phone ? (
                <span className="absolute right-0 bottom-0 hidden w-[22%] max-w-[220px] sm:block">
                  <RealScreen media={phone} />
                </span>
              ) : null}
              {illustrative ? <IllustrativeTag className="absolute top-12 left-3 sm:top-14 sm:left-4" /> : null}
            </div>
          </Reveal>
          <figcaption className="mt-4 max-w-2xl text-[14px] leading-[1.6] text-n-600">
            {illustrative
              ? `The screens on this page are illustrative recreations, not screenshots of the ${client} website.`
              : desktop?.caption}
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}

/* The brief — audiences side by side. Comparison is the job, so it's a
   layout decision (CLAUDE.md Design Taste, ref 1): columns split by one
   hairline, each with its own page, never equal marketing cards. */
function Brief({ study, detail }: Props) {
  const audiences = detail.audiences ?? [];
  const goals = detail.goals ?? [];
  const approach = detail.designApproach ?? [];
  if (!audiences.length && !goals.length && !approach.length) return null;
  const client = clientNameOf(study);

  return (
    <Section tone="white" labelledBy="brief-heading">
      <Container>
        <SectionHeading id="brief-heading" eyebrow="The brief" title="Who the site is for" />

        {goals.length ? (
          <ul className="mt-8 flex max-w-2xl flex-col gap-2 text-body-lg text-n-700">
            {goals.map((g) => (
              <li key={g} className="flex gap-3">
                <Icon name="check" className="mt-1.5 h-4 w-4 shrink-0 text-brand-secondary" />
                {g}
              </li>
            ))}
          </ul>
        ) : null}

        {audiences.length ? (
          <ul
            className={`mt-10 grid grid-cols-1 gap-10 md:mt-12 md:gap-0 md:divide-x md:divide-n-200 ${
              audiences.length >= 3 ? "md:grid-cols-3" : audiences.length === 2 ? "md:grid-cols-2" : ""
            }`}
          >
            {audiences.map((a, i) => (
              <Reveal
                as="li"
                key={a.name}
                delay={i * 0.06}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] items-center gap-5 md:px-10 md:first:pl-0 md:last:pr-0 lg:gap-8"
              >
                <div>
                  {a.page ? (
                    <p className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">
                      {a.page}
                    </p>
                  ) : null}
                  <h3 className="mt-2 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
                    {a.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-n-600">{a.need}</p>
                </div>
                <figure className="relative">
                  <div role="img" aria-label={`Illustrative recreation of the ${client} page for ${a.name.toLowerCase()}. Not a screenshot.`}>
                    <PhoneScreen variant={i % 2 === 0 ? "a" : "b"} className="max-w-[170px]" />
                  </div>
                </figure>
              </Reveal>
            ))}
          </ul>
        ) : null}

        {approach.length ? (
          <dl className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-x-10">
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

/* The lead path on an annotated screen: numbered markers on the
   recreation, the same numbers on the ordered list beside it. The list is
   the real content; markers are decoration (guide §8). */
function LeadPath({ study, detail }: Props) {
  const steps = detail.leadPath ?? [];
  if (!steps.length) return null;
  const client = clientNameOf(study);
  const markers: Partial<Record<LeadAnchor, number>> = {};
  steps.forEach((s, i) => {
    if (s.on && !markers[s.on]) markers[s.on] = i + 1;
  });

  return (
    <Section tone="tint" labelledBy="lead-path-heading">
      <Container>
        <SectionHeading
          id="lead-path-heading"
          eyebrow="The lead path"
          title="How an enquiry reaches the client"
        />
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-14">
          <figure className="relative">
            <Reveal from="settle">
              <div
                role="img"
                aria-label={`Illustrative recreation of a ${client} landing page, its enquiry form and the notification email, with numbered markers matching the steps. Not a screenshot.`}
              >
                <AnnotatedLanding markers={markers} />
              </div>
            </Reveal>
            <IllustrativeTag className="absolute top-12 right-3" />
          </figure>

          <ol className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.06} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-n-200 bg-n-0 font-body text-[13px] font-semibold text-brand-secondary tabular-nums"
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-[17px] leading-[1.35] font-semibold text-n-900">{s.step}</h3>
                  {s.detail ? <p className="mt-1 text-[15px] leading-[1.6] text-n-600">{s.detail}</p> : null}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* Optional: key pages + features, as one list of name → job. */
function PagesAndFeatures({ detail }: { detail: WebsiteDetail }) {
  const items = [
    ...(detail.keyPages ?? []).map((p) => ({ name: p.name, text: p.purpose })),
    ...(detail.features ?? []).map((f) => ({ name: f.name, text: f.detail })),
  ];
  if (!items.length) return null;
  return (
    <Section tone="paper" labelledBy="pages-heading">
      <Container>
        <SectionHeading id="pages-heading" eyebrow="What we built" title="Key pages and features" />
        <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {items.map((it) => (
            <div key={it.name}>
              <dt className="text-[16px] font-semibold text-n-900">{it.name}</dt>
              <dd className="mt-1 text-[15px] leading-[1.6] text-n-600">{it.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* Optional: measured checks only, as a real table (guide §2.7). */
function QualityChecks({ detail }: { detail: WebsiteDetail }) {
  const rows = detail.qualityChecks ?? [];
  if (!rows.length) return null;
  const area = { responsive: "Responsive", performance: "Performance", seo: "SEO", accessibility: "Accessibility" };
  return (
    <Section tone="white" labelledBy="checks-heading">
      <Container>
        <SectionHeading id="checks-heading" eyebrow="Measured" title="Quality checks" />
        <table className="mt-10 w-full border-collapse text-left text-[15px] md:mt-12">
          <thead className="max-md:sr-only">
            <tr className="border-b border-n-200 text-[13px] text-n-600">
              <th scope="col" className="py-3 pr-4 font-medium">Area</th>
              <th scope="col" className="py-3 pr-4 font-medium">Result</th>
              <th scope="col" className="py-3 pr-4 font-medium">Tool</th>
              <th scope="col" className="py-3 pr-4 font-medium">Page</th>
              <th scope="col" className="py-3 font-medium">Measured on</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.area}-${r.page}`} className="border-b border-n-100 max-md:flex max-md:flex-col max-md:py-3">
                <th scope="row" className="py-3 pr-4 font-semibold text-n-900 max-md:py-1">{area[r.area]}</th>
                <td className="py-3 pr-4 text-n-800 max-md:py-1">{r.result}</td>
                <td className="py-3 pr-4 text-n-600 max-md:py-1">{r.tool}</td>
                <td className="py-3 pr-4 text-n-600 max-md:py-1">{r.page}</td>
                <td className="py-3 text-n-600 max-md:py-1">{r.measuredOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </Section>
  );
}

/* Optional: results, before/after and a quote — verified/approved only. */
function Proof({ study, detail }: Props) {
  const results = study.results ?? [];
  const outcomes = detail.outcomes ?? [];
  const ba = detail.beforeAfter;
  const quote = detail.testimonial;
  if (!results.length && !outcomes.length && !ba && !quote) return null;

  return (
    <Section tone="paper" labelledBy="outcomes-heading">
      <Container>
        <SectionHeading id="outcomes-heading" eyebrow="Outcomes" title="What changed" />
        {results.length ? (
          <ul className="mt-10 flex flex-wrap gap-x-12 gap-y-6 md:mt-12">
            {results.map((r) => (
              <li key={r.label}>
                <span className="block font-display text-[40px] leading-none font-bold text-n-900">{r.value}</span>
                <span className="mt-2 block text-[14px] text-n-700">{r.label}</span>
                <span className="mt-1 block text-[13px] text-n-600">{r.period} · {r.source}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {outcomes.length ? (
          <ul className="mt-8 flex max-w-2xl flex-col gap-2 text-body-lg text-n-700">
            {outcomes.map((o) => <li key={o}>{o}</li>)}
          </ul>
        ) : null}
        {ba ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[{ label: "Before", m: ba.before }, { label: "After", m: ba.after }].map(({ label, m }) => (
              <figure key={label}>
                <RealScreen media={m} />
                <figcaption className="mt-3 text-[14px] text-n-600">
                  <strong className="font-semibold text-n-800">{label}.</strong> {m.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        {quote ? (
          <figure className="mt-10 max-w-2xl border-l-2 border-brand-secondary pl-6">
            <blockquote className="text-[20px] leading-[1.5] font-display font-semibold text-n-900">{quote.quote}</blockquote>
            <figcaption className="mt-3 text-[14px] text-n-600">{quote.name}, {quote.role}</figcaption>
          </figure>
        ) : null}
      </Container>
    </Section>
  );
}

/* Built with + related links (vrattiks-architecture §5): service, industry,
   listing. Tools carry their plain-language role (docs/index.html §5). */
function BuiltWith({ study, detail }: Props) {
  const links = relatedLinks(study, detail.industry ?? study.industry);
  return (
    <Section tone="paper" labelledBy="built-heading" className="border-t border-n-100">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="built-heading" className="text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
            Built with
          </h2>
          {detail.stack?.length ? (
            <dl className="mt-6 flex flex-col">
              {detail.stack.map((t) => (
                <div key={t.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-n-200 py-3">
                  <dt className="text-[16px] font-semibold text-n-900">{t.name}</dt>
                  {t.role ? <dd className="text-[15px] text-n-600">{t.role}</dd> : null}
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <div>
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
            Related
          </h2>
          <ul className="mt-6 flex flex-col">
            {links.map((l) => (
              <li key={l.href} className="border-b border-n-200">
                <Link href={l.href} className="focus-glow group flex min-h-12 items-center justify-between gap-4 rounded-sm py-2 text-[15px]">
                  <span>
                    <span className="text-n-600">{l.label}: </span>
                    <span className="font-semibold text-brand-secondary underline-offset-4 group-hover:underline">{l.name}</span>
                  </span>
                  <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-brand-secondary" />
                </Link>
              </li>
            ))}
            <li className="border-b border-n-200">
              <Link href="/case-studies" className="focus-glow group flex min-h-12 items-center justify-between gap-4 rounded-sm py-2 text-[15px]">
                <span className="font-semibold text-brand-secondary underline-offset-4 group-hover:underline">All case studies</span>
                <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-brand-secondary" />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export default function WebsiteCaseStudy(props: Props) {
  return (
    <>
      <Hero {...props} />
      <Brief {...props} />
      <LeadPath {...props} />
      <PagesAndFeatures detail={props.detail} />
      <QualityChecks detail={props.detail} />
      <Proof {...props} />
      <BuiltWith {...props} />
    </>
  );
}
