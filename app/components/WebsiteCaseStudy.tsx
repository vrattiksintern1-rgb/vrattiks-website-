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
import { Chips } from "./CaseStudyChips";
import { LeadFormVisual } from "./CaseStudyVisuals";
import { AnnotatedLanding, DesktopScreen, PhoneScreen } from "./WebsiteScreens";
import {
  relatedLinks,
  sectionFor,
  type CaseStudyMedia,
  type LeadAnchor,
  type WebsiteStudy,
} from "@/app/lib/case-studies";

/* Website case-study detail layout (docs/case-study-guides/
   website-development-case-study.md §2). Screen-led: the one idea is that
   the work is SHOWN — a desktop + phone pair in the hero (responsiveness
   shown, not claimed), the two audiences side by side with a phone each,
   and an annotated screen whose numbered markers walk the lead path.

   Section order (user brief 2026-10-12, revised the same day for the
   client's brochure): opener → client brief → project overview (+ villa
   spec tiles) → wellness bento → location → the full story → problem and
   objective → approach → solution and process (+ the lead path, guide
   §2.6) → key features → tech stack → outcomes (only when real) → about
   the client (+ architect profile) → visuals (+ the client's renders and
   plans) → related → FinalCTA.

   CLIENT vs OURS (vrattiks-standards §3): blocks read from `study.client`
   are the client's brochure, not our work. Each carries <BrochureNote />,
   the architect items carry their own attribution, and every render is
   captioned as supplied by the client. Our work starts at "The full story".
   Every client block renders only when `study.client` exists.

   Tones alternate paper / white / tint so no two neighbours match; the page
   stays light throughout (the custom layout owns the dark band). The one
   graphite and one lavender tile in the wellness bento are tiles, not
   bands, and spend no gradient (CLAUDE.md Design Taste, ref 1).
   Motion (kylezantos-design §1, once, transform/opacity only): screens
   `settle`, list items rise in order. Nothing loops; the H1 never fades
   (§1b). */

type Props = { study: WebsiteStudy };

/* The visible source line on every client-provided block (user brief
   2026-10-12). Plain text, so screen readers hear it too; n-600 passes
   4.5:1 on every tone in use (vrattiks-accessibility, "Contrast"). */
function BrochureNote({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`flex items-center gap-2 text-[13.5px] leading-[1.5] text-n-600 ${className}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
      {text}
    </p>
  );
}

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

function Hero({ study }: Props) {
  const desktop = study.visuals.media.find((m) => m.device !== "mobile");
  const phone = study.visuals.media.find((m) => m.device === "mobile");
  const illustrative = !desktop;

  const facts = [
    { label: "Client", value: study.clientName },
    { label: "Category", value: sectionFor(study.category).label },
    { label: "Status", value: study.statusLabel },
    study.industry
      ? { label: "Industry", value: study.industry.name, href: study.industry.slug ? `/industries/${study.industry.slug}` : undefined }
      : null,
    ...study.keyFacts,
  ].filter((f) => f !== null);

  return (
    <Section tone="paper" labelledBy="case-study-heading">
      <Container>
        <CaseStudyBreadcrumb study={study} />
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Eyebrow>{study.kind} case study</Eyebrow>
        </div>
        {/* Not wrapped in Reveal: the H1 is readable the instant it paints
            (kylezantos-design §1b). */}
        <h1
          id="case-study-heading"
          className="max-w-[20ch] text-[36px] leading-[1.05] tracking-[-0.03em] font-display font-semibold text-n-900 sm:text-[44px] md:text-[56px]"
        >
          {study.title}
        </h1>
        <p className="mt-5 max-w-2xl text-body-lg text-n-700">{study.summary.text}</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 md:mt-10">
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
        </dl>

        {/* The client's own key facts, kept as a separate labelled group
            so they never read as our results (vrattiks-standards §3). */}
        {study.client ? (
          <div className="mt-8">
            <BrochureNote text={study.client.note} />
            <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
              {study.client.keyFacts.map((f) => (
                <div key={f.label} className="min-w-0 border-t border-brand-secondary/40 pt-3">
                  <dt className="text-[13px] text-n-600">{f.label}</dt>
                  <dd className="mt-1 text-[15px] font-medium break-words text-n-800">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

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
                  aria-label={`Illustrative recreation of the ${study.title} website on a desktop screen and a phone. Not a screenshot.`}
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
              ? `The screens on this page are illustrative recreations, not screenshots of the ${study.title} website.`
              : desktop?.caption}
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}

/* Project overview: a large pull-paragraph, then the villa as two tiles —
   the room counts with the amenities, and the area ledger whose last row
   is the total. Client-provided, so both carry the brochure note. Figures
   always arrive with what they measure (CLAUDE.md Design Taste, ref 1). */
function Overview({ study }: { study: WebsiteStudy }) {
  const client = study.client;
  return (
    <Section tone="tint" labelledBy="overview-heading">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
          <SectionHeading id="overview-heading" eyebrow="Overview" title="The project at a glance" />
          <div className="md:pt-8">
            <Reveal>
              <p className="text-[20px] leading-[1.5] tracking-[-0.01em] font-display font-semibold text-n-900 md:text-[24px]">
                {study.overview.text}
              </p>
            </Reveal>
            {client ? <BrochureNote text={client.note} className="mt-4" /> : null}
          </div>
        </div>

        {client ? (
          <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <Reveal from="settle" className="rounded-xl border border-n-200 bg-n-0 p-6 sm:p-8">
              <h3 className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">The villa</h3>
              <dl className="mt-5 grid grid-cols-3 gap-4 border-b border-n-200 pb-6">
                {client.specs.map((s) => (
                  <div key={s.label} className="flex min-w-0 flex-col-reverse">
                    <dt className="mt-1.5 text-[13.5px] leading-[1.4] text-n-600">{s.label}</dt>
                    <dd className="font-display text-[40px] leading-none font-bold text-n-900 tabular-nums md:text-[48px]">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <Chips items={client.amenities} label="Amenities" className="mt-6" />
            </Reveal>

            <Reveal from="settle" delay={0.08} className="rounded-xl border border-n-200 bg-n-0 p-6 sm:p-8">
              <h3 className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">Villa area</h3>
              <dl className="mt-3">
                {client.areas.map((a) => (
                  <div
                    key={a.label}
                    className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5 ${
                      a.total ? "border-t-2 border-n-800" : "border-b border-n-200"
                    }`}
                  >
                    <dt className="min-w-0">
                      <span className={`block text-[16px] ${a.total ? "font-bold text-n-900" : "font-semibold text-n-800"}`}>{a.label}</span>
                      {a.detail ? <span className="mt-0.5 block text-[13.5px] leading-[1.5] text-n-600">{a.detail}</span> : null}
                    </dt>
                    <dd className={`tabular-nums ${a.total ? "text-[20px] font-bold text-n-900" : "text-[16px] font-medium text-n-800"}`}>{a.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/* Wellness features as a bento (user brief 2026-10-12): ten tiles on a
   four-column grid, the first and sixth wide so the rows run 2+1+1 /
   1+1+2 / 1+1+1+1 instead of a uniform grid. Typographic tiles, no icons —
   the page already has its card grids (CLAUDE.md slop tell 3). One
   graphite and one lavender tile; the rest outlined. Graphite body text
   sits on the muted n-300 ramp, never n-0 (Design Taste, ref 2). */
function Wellness({ study }: { study: WebsiteStudy }) {
  const client = study.client;
  if (!client?.wellness.length) return null;
  const tone = (i: number) =>
    i === 0
      ? { tile: "border border-n-0/10 bg-brand-graphite", n: "text-brand-primary", title: "text-n-0", text: "text-n-300" }
      : i === 5
        ? { tile: "bg-brand-primary", n: "text-brand-graphite", title: "text-brand-graphite", text: "text-brand-graphite" }
        : { tile: "border border-n-200 bg-n-0", n: "text-brand-secondary", title: "text-n-900", text: "text-n-600" };

  return (
    <Section tone="paper" labelledBy="wellness-heading">
      <Container>
        <SectionHeading id="wellness-heading" eyebrow="Wellness design" title="What the villa is designed around" />
        <BrochureNote text={client.note} className="mt-4" />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {client.wellness.map((w, i) => {
            const wide = i === 0 || i === 5;
            const t = tone(i);
            return (
              <Reveal
                as="li"
                key={w.title}
                delay={(i % 4) * 0.05}
                className={`flex flex-col rounded-lg p-5 sm:p-6 ${wide ? "sm:col-span-2" : ""} ${t.tile}`}
              >
                <span aria-hidden="true" className={`font-body text-label font-semibold tracking-[0.14em] tabular-nums ${t.n}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`mt-6 font-display font-bold tracking-[-0.02em] ${wide ? "text-[26px] md:text-[30px]" : "text-[20px]"} ${t.title}`}>
                  {w.title}
                </h3>
                <p className={`mt-1.5 text-[15px] leading-[1.55] ${wide ? "max-w-[36ch]" : ""} ${t.text}`}>{w.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* Travel times as distance chips (user brief: only these four, none of the
   brochure's other landmark lists). */
function Location({ study }: { study: WebsiteStudy }) {
  const client = study.client;
  if (!client?.distances.length) return null;
  return (
    <Section tone="white" labelledBy="location-heading">
      <Container className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <div>
          <SectionHeading id="location-heading" eyebrow="Location" title={study.location} />
          <BrochureNote text="Travel times as given in the client's brochure." className="mt-4" />
        </div>
        <ul aria-label="Travel times from the villas" className="flex flex-wrap content-start gap-3 md:pt-8">
          {client.distances.map((d, i) => (
            <Reveal
              as="li"
              key={d.place}
              from="fade"
              delay={i * 0.05}
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-n-200 bg-n-0 py-2 pr-5 pl-2"
            >
              <span className="rounded-full bg-n-50 px-3 py-1.5 text-[14px] font-semibold whitespace-nowrap text-brand-secondary tabular-nums">
                {d.time}
              </span>
              <span className="text-[15px] font-medium text-n-800">{d.place}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* The full story — where OUR work starts on the page, after the client's
   project. Reading column, heading in the left margin. */
function FullStory({ study }: { study: WebsiteStudy }) {
  return (
    <Section tone="tint" labelledBy="story-heading">
      <Container className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <SectionHeading id="story-heading" eyebrow="Our work" title="The full story" />
        <div className="flex max-w-[68ch] flex-col gap-5 text-body-lg text-n-700 md:pt-8">
          {study.description.map((p) => (
            <p key={p.text}>{p.text}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* The brief — audiences side by side. Comparison is the job, so it's a
   layout decision (CLAUDE.md Design Taste, ref 1): columns split by one
   hairline, each with its own page, never equal marketing cards. */
function Brief({ study }: { study: WebsiteStudy }) {
  const audiences = study.audiences;
  return (
    <Section tone="white" labelledBy="brief-heading">
      <Container>
        <SectionHeading id="brief-heading" eyebrow="The client brief" title="Who the site is for" />
        <div className="mt-6 flex max-w-2xl flex-col gap-4 text-body-lg text-n-700">
          {study.brief.map((p) => (
            <p key={p.text}>{p.text}</p>
          ))}
        </div>

        {/* The client's three reasons to buy, as the brochure states them. */}
        {study.client ? (
          <div className="mt-8">
            <BrochureNote text={study.client.note} />
            <Chips items={study.client.positioning} label="The client's reasons to buy" className="mt-3" />
          </div>
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
                  <p className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">{a.page}</p>
                  <h3 className="mt-2 text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
                    {a.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-n-600">{a.need.text}</p>
                </div>
                <figure className="relative">
                  <div role="img" aria-label={`Illustrative recreation of ${a.page}, the page for ${a.name.toLowerCase()}. Not a screenshot.`}>
                    <PhoneScreen variant={i % 2 === 0 ? "a" : "b"} className="max-w-[170px]" />
                  </div>
                </figure>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  );
}

function ProblemObjective({ study }: { study: WebsiteStudy }) {
  return (
    <Section tone="white" labelledBy="problem-heading">
      <Container>
        <SectionHeading id="problem-heading" eyebrow="Problem and objective" title="What the site had to fix" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-n-200">
          <div className="md:pr-12">
            <h3 className="text-[18px] font-semibold text-n-900">The problem</h3>
            <p className="mt-3 text-body-lg text-n-700">{study.problem.text}</p>
          </div>
          <div className="md:pl-12">
            <h3 className="text-[18px] font-semibold text-n-900">The objective</h3>
            <ul className="mt-3 flex flex-col gap-3">
              {study.objectives.map((o) => (
                <li key={o.text} className="flex gap-3 text-[16px] leading-[1.6] text-n-700">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand-secondary" />
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

/* Design decisions, each with its reason (guide §2.4). */
function Approach({ study }: { study: WebsiteStudy }) {
  return (
    <Section tone="tint" labelledBy="approach-heading">
      <Container>
        <SectionHeading id="approach-heading" eyebrow="Approach and strategy" title="The decisions behind the site" />
        <dl className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-x-12">
          {study.approach.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06} className="border-l-2 border-brand-secondary pl-5">
              <dt className="text-[17px] font-semibold text-n-900">{d.title}</dt>
              <dd className="mt-1.5 text-[15.5px] leading-[1.6] text-n-700">{d.text}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* How the site was made: a numbered run of steps along a hairline, read
   left to right on wide screens, top to bottom on phones. */
function Solution({ study }: { study: WebsiteStudy }) {
  return (
    <Section tone="white" labelledBy="solution-heading">
      <Container>
        <SectionHeading id="solution-heading" eyebrow="Solution and process" title="How we planned and built it" />
        <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {study.solution.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 0.06} className="border-t-2 border-n-200 pt-4">
              <span className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase tabular-nums">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[18px] leading-[1.3] font-semibold text-n-900">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-n-600">{s.text}</p>
              {s.note ? <p className="mt-1.5 text-[15px] leading-[1.6] text-n-600">{s.note.text}</p> : null}
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* The lead path on an annotated screen: numbered markers on the
   recreation, the same numbers on the ordered list beside it. The list is
   the real content; markers are decoration (guide §8). */
function LeadPath({ study }: { study: WebsiteStudy }) {
  const steps = study.leadPath;
  if (!steps.length) return null;
  const markers: Partial<Record<LeadAnchor, number>> = {};
  steps.forEach((s, i) => {
    if (!markers[s.on]) markers[s.on] = i + 1;
  });

  return (
    <Section tone="tint" labelledBy="lead-path-heading">
      <Container>
        <SectionHeading id="lead-path-heading" eyebrow="The lead path" title="How an enquiry reaches the client" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-14">
          <figure className="relative">
            <Reveal from="settle">
              <div
                role="img"
                aria-label={`Illustrative recreation of a ${study.title} landing page, its lead form and the notification email, with numbered markers matching the steps. Not a screenshot.`}
              >
                <AnnotatedLanding markers={markers} />
              </div>
            </Reveal>
            <IllustrativeTag className="absolute top-12 right-3" />
          </figure>

          <ol className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-n-200 bg-n-0 font-body text-[13px] font-semibold text-brand-secondary tabular-nums"
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-[17px] leading-[1.35] font-semibold text-n-900">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.6] text-n-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

function Features({ study }: { study: WebsiteStudy }) {
  return (
    <Section tone="paper" labelledBy="features-heading">
      <Container>
        <SectionHeading id="features-heading" eyebrow="Key features" title="What the site does" />
        <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {study.features.map((f) => (
            <div key={f.title}>
              <dt className="text-[16px] font-semibold text-n-900">{f.title}</dt>
              <dd className="mt-1 text-[15px] leading-[1.6] text-n-600">{f.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* Tools with their plain-language role (docs/index.html §5). */
function Stack({ study }: { study: WebsiteStudy }) {
  return (
    <Section tone="white" labelledBy="stack-heading">
      <Container className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <SectionHeading id="stack-heading" eyebrow="Tech stack" title="Built with" />
        <dl className="flex flex-col md:pt-2">
          {study.stack.map((t) => (
            <div key={t.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-n-200 py-3.5">
              <dt className="text-[16px] font-semibold text-n-900">{t.name}</dt>
              <dd className="text-[15px] text-n-600">{t.role}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* One of the client's renders or plans. Renders fill a fixed frame
   (`crop`); plans and the map keep their own proportions and are never
   cropped, so their room labels stay whole. vrattiks-performance:
   next/image with `sizes` matched to the grid cell, sized frame (no layout
   shift), lazy — nothing here is above the fold. */
function ClientImage({ media, sizes, frame, fit = "cover" }: { media: CaseStudyMedia; sizes: string; frame?: string; fit?: "cover" | "contain" }) {
  return (
    <figure className="min-w-0">
      <span
        className={`relative block overflow-hidden rounded-lg border border-n-200 bg-n-0 ${frame ?? ""}`}
        style={frame ? undefined : { aspectRatio: `${media.width} / ${media.height}` }}
      >
        <Image src={media.src} alt={media.alt} fill sizes={sizes} className={fit === "cover" ? "object-cover" : "object-contain"} />
      </span>
      <figcaption className="mt-2.5 text-[14px] leading-[1.5] text-n-600">
        <span className="font-medium text-n-800">{media.caption}</span> · Render supplied by the client
      </figcaption>
    </figure>
  );
}

/* Real screenshots once approved (public/case-studies/{slug}/), until then
   the lead form drawn from the entry's own fields, labelled Illustrative.
   Below it, the client's own renders and plans, kept under their own
   heading and note so they never read as our screens. */
function Visuals({ study }: { study: WebsiteStudy }) {
  const media = study.visuals.media;
  const gallery = study.client?.gallery;
  const [lead, ...renders] = gallery?.renders ?? [];
  return (
    <Section tone="tint" labelledBy="visuals-heading">
      <Container>
        <SectionHeading id="visuals-heading" eyebrow="Visuals" title={gallery ? "Screens and renders" : "Screens from the project"} />
        {media.length ? (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-12">
            {media.map((m) => (
              <figure key={m.src}>
                <RealScreen media={m} />
                {m.caption ? <figcaption className="mt-3 text-[14px] text-n-600">{m.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : (
          <figure className="mt-10 grid grid-cols-1 items-center gap-8 md:mt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
            <Reveal from="settle" className="relative flex justify-center rounded-xl border border-n-200 bg-n-0 px-5 pt-14 pb-8 sm:px-10">
              <IllustrativeTag className="absolute top-5 left-5" />
              <LeadFormVisual
                pages={study.landingPages}
                fields={study.formFields}
                label={`Illustrative recreation of the ${study.title} lead form: ${study.formFields.map((f) => f.name).join(", ")}, then a Download Brochure button. Not a screenshot.`}
              />
            </Reveal>
            <figcaption className="max-w-md text-[15px] leading-[1.65] text-n-700">
              The lead form shared by {study.landingPages.map((p) => p.label).join(" and ")}, drawn from the
              project&apos;s real field list. It is an illustrative recreation, not a screenshot; approved
              screens of the pages will replace it.
            </figcaption>
          </figure>
        )}

        {gallery && lead ? (
          <div className="mt-14 border-t border-n-200 pt-10 md:mt-16 md:pt-12">
            <h3 className="text-[22px] leading-[1.25] tracking-[-0.015em] font-display font-bold text-n-900 md:text-[26px]">
              The villa, from the client&apos;s brochure
            </h3>
            <BrochureNote text="Renders and plans supplied by the client. They show the client's design, not our work." className="mt-2" />

            <Reveal from="settle" className="mt-8">
              <ClientImage media={lead} frame="aspect-[16/10] sm:aspect-[16/9]" sizes="(min-width: 1280px) 1200px, 92vw" />
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {renders.map((m, i) => (
                <Reveal key={m.src} delay={(i % 3) * 0.06}>
                  <ClientImage media={m} frame="aspect-[16/10]" sizes="(min-width: 1024px) 400px, (min-width: 601px) 46vw, 92vw" />
                </Reveal>
              ))}
            </div>

            {gallery.plans.length ? (
              <>
                <h4 className="mt-12 text-[18px] font-semibold text-n-900">Floor plans and location</h4>
                <div className="mt-5 grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.8fr)]">
                  {gallery.plans.map((m, i) => (
                    <Reveal key={m.src} delay={i * 0.06} className={m.width > m.height ? "sm:col-span-2 lg:col-span-1" : ""}>
                      <ClientImage media={m} fit="contain" sizes="(min-width: 1024px) 520px, (min-width: 601px) 46vw, 92vw" />
                    </Reveal>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/* Only real, client-confirmed outcomes — otherwise not rendered. */
function Outcomes({ study }: { study: WebsiteStudy }) {
  if (!study.outcomes.length) return null;
  return (
    <Section tone="white" labelledBy="outcomes-heading">
      <Container>
        <SectionHeading id="outcomes-heading" eyebrow="Outcomes" title="What changed" />
        <ul className="mt-8 flex max-w-2xl flex-col gap-2 text-body-lg text-n-700">
          {study.outcomes.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </Container>
    </Section>
  );
}

/* About the client + the architect profile. Each profile item is the
   client's own claim and carries its attribution on the row itself, so a
   cropped screenshot can't separate the two (user brief 2026-10-12;
   vrattiks-standards §3). Neutral wording, no quotes, no portrait. */
function AboutClient({ study }: { study: WebsiteStudy }) {
  const architect = study.client?.architect;
  return (
    <Section tone="paper" labelledBy="about-heading">
      <Container className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <div>
          <Eyebrow className="mb-3">About the client</Eyebrow>
          <h2 id="about-heading" className="text-[24px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
            {study.clientName}
          </h2>
        </div>
        <div className="md:pt-8">
          <div className="flex max-w-[60ch] flex-col gap-4 text-body-lg text-n-700">
            {study.aboutClient.map((p) => (
              <p key={p.text}>{p.text}</p>
            ))}
          </div>
          {study.client ? <BrochureNote text={study.client.note} className="mt-4" /> : null}

          {architect ? (
            <Reveal from="settle" className="mt-8 rounded-xl border border-n-200 bg-n-0 p-6 sm:p-8">
              <h3 className="text-[20px] leading-[1.25] tracking-[-0.015em] font-display font-bold text-n-900">{architect.name}</h3>
              <p className="mt-1 text-[15px] text-n-600">{architect.role}</p>
              <ul aria-label={`${architect.name}: profile, as stated by the client`} className="mt-5 border-t border-n-200">
                {architect.items.map((item) => (
                  <li key={item} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-n-200 py-3">
                    <span className="text-[15.5px] leading-[1.5] text-n-800">{item}</span>
                    <span className="text-[12.5px] whitespace-nowrap text-n-600">{architect.attribution}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/* Related links (vrattiks-architecture §5): service, industry, listing. */
function Related({ study }: { study: WebsiteStudy }) {
  const links = relatedLinks(study);
  return (
    <Section tone="white" labelledBy="related-heading">
      <Container className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <SectionHeading id="related-heading" eyebrow="Related" title="Services and more" />
        <ul className="flex flex-col md:pt-2">
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
      </Container>
    </Section>
  );
}

export default function WebsiteCaseStudy(props: Props) {
  const { study } = props;
  return (
    <>
      <Hero {...props} />
      <Brief study={study} />
      <Overview study={study} />
      <Wellness study={study} />
      <Location study={study} />
      <FullStory study={study} />
      <ProblemObjective study={study} />
      <Approach study={study} />
      <Solution study={study} />
      <LeadPath study={study} />
      <Features study={study} />
      <Stack study={study} />
      <Outcomes study={study} />
      <AboutClient study={study} />
      <Visuals study={study} />
      <Related study={study} />
    </>
  );
}
