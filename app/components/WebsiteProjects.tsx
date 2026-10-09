import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import {
  caseStudiesIn,
  relatedLinks,
  type CaseStudy,
} from "@/app/lib/case-studies";

/* Website Projects — each project shown in a browser frame, in a two-column
   gallery whose second column drops by 96px so the frames step down the page
   instead of lining up as a card row. Not scroll-snap: the Home services
   slider already owns that. One static brand glow behind the gallery does
   figure/ground work, lifting the white frames off the tint (taste-skill §1.1
   — a glow is only allowed when it does that job). It never moves.

   Motion: frames settle in (12px rise + 0.98 → 1 scale), staggered 60ms
   (kylezantos-design §1: ≤60ms, ≤6 items). Reveal handles reduced motion. */

/* Address-bar text: the host only, so long URLs never overflow the frame. */
function host(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* PLACEHOLDER (vrattiks-standards §3): no screenshot supplied yet. An abstract
   page wireframe — nav, headline lines, a button and an image block — in the
   neutral ramp. Decorative, so aria-hidden. Replace by setting `image` in
   case-studies.ts. */
function ScreenPlaceholder() {
  return (
    <span aria-hidden="true" className="absolute inset-0 flex flex-col bg-n-0 p-[6%]">
      <span className="flex items-center justify-between">
        <span className="h-2.5 w-[18%] rounded-full bg-n-200" />
        <span className="flex w-[34%] justify-between gap-2">
          <span className="h-2 flex-1 rounded-full bg-n-100" />
          <span className="h-2 flex-1 rounded-full bg-n-100" />
          <span className="h-2 flex-1 rounded-full bg-n-100" />
        </span>
      </span>
      <span className="mt-[9%] grid flex-1 grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-[6%]">
        <span className="flex flex-col justify-center gap-[7%]">
          <span className="h-3 w-[92%] rounded-full bg-n-200" />
          <span className="h-3 w-[70%] rounded-full bg-n-200" />
          <span className="h-2 w-[80%] rounded-full bg-n-100" />
          <span className="h-5 w-[40%] rounded-full border border-n-200" />
        </span>
        <span className="rounded-md bg-n-50" />
      </span>
    </span>
  );
}

function BrowserFrame({ study }: { study: CaseStudy }) {
  return (
    <div className="overflow-hidden rounded-lg border border-n-200 bg-n-0 shadow-[var(--shadow-lg)]">
      <span aria-hidden="true" className="flex h-10 items-center gap-3 border-b border-n-100 bg-n-50 px-4">
        <span className="flex shrink-0 gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-n-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-n-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-n-300" />
        </span>
        <span className="mx-auto flex h-6 min-w-0 flex-1 items-center justify-center truncate rounded-full border border-n-200 bg-n-0 px-3 text-[12px] text-n-600 sm:max-w-[60%]">
          {study.url ? host(study.url) : null}
        </span>
        <span className="hidden w-[46px] shrink-0 sm:block" />
      </span>
      <span className="relative block aspect-[16/10]">
        {study.image ? (
          <Image
            src={study.image.src}
            alt={study.image.alt}
            fill
            sizes="(min-width: 901px) 45vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <ScreenPlaceholder />
        )}
      </span>
    </div>
  );
}

export default function WebsiteProjects({
  id,
  index,
  label,
  title,
  description,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
}) {
  const projects = caseStudiesIn("website");
  const headingId = `${id}-heading`;

  return (
    <Section
      tone="tint"
      id={id}
      labelledBy={headingId}
      className="scroll-mt-30 md:scroll-mt-34"
    >
      <div
        aria-hidden="true"
        className="wash-brand pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[420px] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />
      <Container>
        <SectionHeading
          id={headingId}
          eyebrow={`${index} · ${label}`}
          title={title}
          description={description}
        />

        <ul className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:gap-x-14">
          {projects.map((study, i) => {
            const links = relatedLinks(study);
            const titleId = `${study.slug}-title`;

            return (
              <li
                key={study.slug}
                id={study.slug}
                className={`scroll-mt-36 md:scroll-mt-40 ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <Reveal from="settle" delay={Math.min(i, 5) * 0.06}>
                  <article aria-labelledby={titleId}>
                    <BrowserFrame study={study} />
                    <div className="mt-6 px-1">
                      <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                        {study.kind}
                      </p>
                      <h3
                        id={titleId}
                        className="mt-2 text-[22px] leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[24px]"
                      >
                        {study.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[15px] leading-[1.6] text-n-600">
                        {study.summary}
                      </p>

                      {study.results?.length ? (
                        <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
                          {study.results.map((r) => (
                            <li key={r.label}>
                              <span className="block font-display text-[28px] leading-none font-bold text-n-900">
                                {r.value}
                              </span>
                              <span className="mt-1 block text-[13px] text-n-600">{r.label}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {/* vrattiks-architecture §5: service + industry involved,
                          plus the live site when an address is supplied. */}
                      {links.length || study.url || study.industry ? (
                        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                          {/* An industry with no page of its own is plain text. */}
                          {study.industry && !study.industry.slug ? (
                            <li className="inline-flex min-h-11 items-center gap-2 text-[14.5px] text-n-600">
                              Industry: <span className="font-semibold text-n-800">{study.industry.name}</span>
                            </li>
                          ) : null}
                          {links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="focus-glow group inline-flex min-h-11 items-center gap-2 rounded-sm text-[14.5px] font-semibold text-brand-secondary"
                              >
                                <span className="font-normal text-n-600">{link.label}:</span>
                                <span className="underline-offset-4 group-hover:underline">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                          {study.url ? (
                            <li>
                              <a
                                href={study.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="focus-glow group inline-flex min-h-11 items-center gap-2 rounded-sm text-[14.5px] font-semibold text-brand-secondary"
                              >
                                <span className="underline-offset-4 group-hover:underline">
                                  Visit {study.title}
                                </span>
                                <Icon name="arrowUpRight" className="h-4 w-4" />
                                <span className="sr-only">(opens in a new tab)</span>
                              </a>
                            </li>
                          ) : null}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
