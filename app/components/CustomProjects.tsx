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

/* Custom Projects — large editorial rows. The one idea is the oversized index
   numeral (CLAUDE.md Design Taste, ref 2: a display-scale jump gives the eye
   one place to land per row), with text and visual swapping sides each row so
   rhythm comes from alternation, not decoration (awesome-design §3, alternating
   split rows). No hairline ledger and no cards — those are already used on
   /services and /company.

   Motion (kylezantos-design §1, hierarchy, once): each visual slides 16px in
   from its own side while the text column rises — the slide direction follows
   the alternation, so it carries meaning. Reveal handles reduced motion. */

function ProjectVisual({ study }: { study: CaseStudy }) {
  if (study.image) {
    return (
      <span
        className="relative block w-full overflow-hidden rounded-xl border border-n-200 bg-n-50"
        style={{ aspectRatio: `${study.image.width} / ${study.image.height}` }}
      >
        <Image
          src={study.image.src}
          alt={study.image.alt}
          fill
          sizes="(min-width: 901px) 55vw, 100vw"
          className="object-cover"
        />
      </span>
    );
  }

  /* PLACEHOLDER (vrattiks-standards §3): no screenshot supplied yet. A quiet
     dot field with one icon ring — decorative, so aria-hidden. Distinct from
     the hatched cover on Home's CaseStudies and the browser wireframe in
     WebsiteProjects. Replace by setting `image` in case-studies.ts. */
  return (
    <span
      aria-hidden="true"
      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-n-200 bg-n-50"
      style={{
        backgroundImage:
          "radial-gradient(var(--color-n-300) 1px, transparent 1.5px)",
        backgroundSize: "20px 20px",
      }}
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-n-200 bg-n-0 text-brand-secondary shadow-[var(--shadow-md)]">
        <Icon name="workflow" className="h-8 w-8" />
      </span>
    </span>
  );
}

export default function CustomProjects({
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
  const projects = caseStudiesIn("custom");
  const headingId = `${id}-heading`;

  return (
    <Section
      tone="white"
      id={id}
      labelledBy={headingId}
      className="scroll-mt-30 md:scroll-mt-34"
    >
      <Container>
        <SectionHeading
          id={headingId}
          eyebrow={`${index} · ${label}`}
          title={title}
          description={description}
        />

        <ol className="mt-10 flex flex-col gap-12 md:mt-12 md:gap-16">
          {projects.map((study, i) => {
            const flipped = i % 2 === 1;
            const links = relatedLinks(study);
            const titleId = `${study.slug}-title`;

            return (
              <li key={study.slug} id={study.slug} className="scroll-mt-36 md:scroll-mt-40">
                <article
                  aria-labelledby={titleId}
                  className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center md:gap-12 lg:gap-16"
                >
                  <Reveal
                    className={`md:col-span-5 ${flipped ? "md:order-2" : ""}`}
                  >
                    {/* Decorative: the <ol> already carries the order. n-200 on
                        white is intentionally faint — it's a shape, not text. */}
                    <span
                      aria-hidden="true"
                      className="block font-display text-[96px] leading-[0.8] font-bold tracking-[-0.05em] text-n-200 md:text-[144px] lg:text-[176px]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-6 font-body text-label font-semibold uppercase tracking-[0.14em] text-brand-secondary md:mt-8">
                      {study.kind}
                    </p>
                    <h3
                      id={titleId}
                      className="mt-3 text-[26px] leading-[1.15] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[32px]"
                    >
                      {study.title}
                    </h3>
                    <p className="mt-4 max-w-md text-body-lg text-n-600">
                      {study.summary}
                    </p>

                    {/* Only fields that hold confirmed content render. */}
                    <dl className="mt-8 flex flex-col gap-5">
                      {study.client ? (
                        <div>
                          <dt className="text-[13px] text-n-600">Client</dt>
                          <dd className="mt-1 text-[15px] font-medium text-n-800">{study.client}</dd>
                        </div>
                      ) : null}
                      {/* An industry with its own page shows as a link below
                          instead, so it isn't listed twice. */}
                      {study.industry && !study.industry.slug ? (
                        <div>
                          <dt className="text-[13px] text-n-600">Industry</dt>
                          <dd className="mt-1 text-[15px] font-medium text-n-800">{study.industry.name}</dd>
                        </div>
                      ) : null}
                      {study.challenge ? (
                        <div>
                          <dt className="text-[13px] text-n-600">Challenge</dt>
                          <dd className="mt-1 text-[15px] leading-[1.6] text-n-800">{study.challenge}</dd>
                        </div>
                      ) : null}
                      {study.solution ? (
                        <div>
                          <dt className="text-[13px] text-n-600">Solution</dt>
                          <dd className="mt-1 text-[15px] leading-[1.6] text-n-800">{study.solution}</dd>
                        </div>
                      ) : null}
                      {study.builtWith?.length ? (
                        <div>
                          <dt className="text-[13px] text-n-600">Built with</dt>
                          <dd className="mt-2">
                            <ul className="flex flex-wrap gap-2">
                              {study.builtWith.map((tool) => (
                                <li
                                  key={tool}
                                  className="rounded-full border border-n-200 px-3 py-1 text-[13px] font-medium text-n-700"
                                >
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      ) : null}
                      {study.results?.length ? (
                        <div>
                          <dt className="text-[13px] text-n-600">Results</dt>
                          <dd className="mt-2">
                            <ul className="flex flex-wrap gap-x-10 gap-y-4">
                              {study.results.map((r) => (
                                <li key={r.label}>
                                  <span className="block font-display text-[32px] leading-none font-bold text-n-900">
                                    {r.value}
                                  </span>
                                  <span className="mt-1 block text-[13px] text-n-600">{r.label}</span>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      ) : null}
                    </dl>

                    {/* vrattiks-architecture §5: link to the service/industry involved */}
                    {links.length ? (
                      <ul className="mt-8 flex flex-col gap-1">
                        {links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="focus-glow group inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-semibold text-brand-secondary"
                            >
                              <span className="font-normal text-n-600">{link.label}:</span>
                              <span className="underline-offset-4 group-hover:underline">{link.name}</span>
                              <Icon name="arrowRight" className="h-4 w-4" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Reveal>

                  <Reveal
                    from={flipped ? "start" : "end"}
                    delay={0.06}
                    className={`md:col-span-7 ${flipped ? "md:order-1" : ""}`}
                  >
                    <ProjectVisual study={study} />
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
