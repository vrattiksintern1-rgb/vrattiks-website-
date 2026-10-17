import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import CaseStudyBreadcrumb from "./CaseStudyBreadcrumb";
import { Chips } from "./CaseStudyChips";
import IllustrativeTag from "./IllustrativeTag";
import { DesktopScreen, PhoneScreen } from "./WebsiteScreens";
import {
  relatedLinks,
  sectionFor,
  type CaseStudyMedia,
  type WebsiteStudy,
} from "@/app/lib/case-studies";

/* Website case-study detail layout (docs/case-study-guides/
   website-development-case-study.md §2). Screen-led: the one idea is that
   the work is SHOWN — a desktop + phone pair in the hero (responsiveness
   shown, not claimed), with a link to the live site, then the homepage's
   layout as numbered crops.

   Section order (cut back at the user's request, 2026-10-12): opener →
   website layout → outcomes (only when real) → about the client (+ architect profile) →
   related → FinalCTA. The client brief, overview, wellness, location, full
   story, problem/objective, approach, solution, lead path, features, tech
   stack and visuals sections were removed; their data stays in
   app/lib/case-studies.ts.

   CLIENT vs OURS (vrattiks-standards §3): blocks read from `study.client`
   are the client's brochure, not our work. Each carries <BrochureNote />,
   and the architect items carry their own attribution. Every client block
   renders only when `study.client` exists.

   Tones alternate paper / white / tint / white so no two neighbours match; the page
   stays light throughout (the custom layout owns the dark band).
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

function RealScreen({ media, priority = false, sizes }: { media: CaseStudyMedia; priority?: boolean; sizes?: string }) {
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
        sizes={sizes ?? (media.device === "mobile" ? "(min-width: 601px) 22vw, 60vw" : "(min-width: 1440px) 1300px, 92vw")}
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

  /* The feature chips from the overview card (moved off it on 2026-10-13).
     A chip that repeats a fact row word for word is skipped, e.g. "Surat"
     when Location is Surat, or "Next.js" when Built with lists it, so
     nothing shows twice on the page (user brief). Chip text is never
     reworded (vrattiks-standards §3). */
  const factParts = new Set(facts.flatMap((f) => f.value.split(",").map((v) => v.trim().toLowerCase())));
  const chips = study.tags.map((t) => t.text).filter((t) => !factParts.has(t.toLowerCase()));

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
        <Chips items={chips} label="Features" className="mt-5 max-w-3xl" />
        {/* Outline, not primary: the page's one gradient is the FinalCTA. */}
        {study.website ? (
          <Button href={study.website.url} variant="outline" target="_blank" rel="noopener noreferrer" className="mt-6 min-h-12">
            Visit {study.website.label}
            <Icon name="arrowRight" className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </Button>
        ) : null}

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

/* Website layout: crops of the live homepage, numbered in the order a
   visitor scrolls past them, so the grid reads as the page's sequence
   rather than a gallery. Real screenshots, so no Illustrative tag. */
function Layout({ study }: { study: WebsiteStudy }) {
  const layout = study.layout;
  if (!layout?.length) return null;
  return (
    <Section tone="white" labelledBy="layout-heading">
      <Container>
        <SectionHeading id="layout-heading" eyebrow="Website layout" title="The homepage, top to bottom" />
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-n-600">
          {layout.length} sections of the live homepage, in the order a visitor reaches them
          {study.website ? <>, captured from {study.website.label}</> : null}.
        </p>
        <ol className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {layout.map((l, i) => (
            <Reveal as="li" key={l.media.src} delay={(i % 3) * 0.06}>
              <figure>
                <RealScreen media={l.media} sizes="(min-width: 1024px) 400px, (min-width: 601px) 46vw, 92vw" />
                <figcaption className="mt-3 flex items-baseline gap-3">
                  <span className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-semibold text-n-900">{l.section}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ol>
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
    <Section tone="tint" labelledBy="about-heading">
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
      <Layout study={study} />
      <Outcomes study={study} />
      <AboutClient study={study} />
      <Related study={study} />
    </>
  );
}
