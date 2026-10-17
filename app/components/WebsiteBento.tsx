import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import PinnedRow from "./ui/PinnedRow";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { caseStudiesIn, type WebsiteStudy } from "@/app/lib/case-studies";

/* Website Projects — one horizontal row of equal cards (2026-10-13, user
   brief). Until then each project was a large two-column "opener" tile,
   stacked vertically. Now every project uses the same standard card and the
   row scrolls sideways, so the section is unlike the Custom bento (mirrored
   slabs) and the IoT bento (tall columns) (taste-skill §4).

   Essentials only (user brief, 2026-10-13): screenshot, kind label, title,
   client, summary and "Read the case study". The summary is full everywhere
   except the desktop pinned row on short viewports, where PinnedRow sets
   `data-clamp` and it clamps to 3 lines (user brief, 2026-10-17); the full
   text is still in the HTML and on the detail page. The
   key-fact rows, feature chips and status pill moved off the card; the
   detail page's opener shows all of them (WebsiteCaseStudy Hero). The data
   stays in app/lib/case-studies.ts, and cardDrafts still counts it, so the
   overview's noindex logic is unchanged (vrattiks-standards §3).

   The row lives in the ui/PinnedRow client leaf (2026-10-17, user brief):
   on desktop the section pins under the header and page scroll slides the
   cards sideways; below 1024px, on touch, with reduced motion, before
   JavaScript, or when every card fits, it falls back to ui/ScrollRow
   (snap, buttons, peek). The `in-data-pinned:` / `in-data-clamp:` classes
   below apply only inside the pinned row, to size the card to the
   viewport (shrinkable screenshot, tighter spacing); the native row is
   unchanged. This section stays a server component
   (vrattiks-performance, "Minimise client components"). Cards come from
   caseStudiesIn("website"), so the row adapts to any number of entries.

   No gradient here: the page's one gradient moment is the FinalCTA
   (vrattiks-design-system §3). No per-card motion; only the heading's
   existing once-only reveal (kylezantos-design §1b). */

function ProjectCard({ study }: { study: WebsiteStudy }) {
  const titleId = `${study.slug}-title`;
  const screen = study.visuals.media.find((m) => m.device !== "mobile");

  return (
    /* The listing anchor (/case-studies#slug).
       Whole card = one link (vrattiks-accessibility, "Accessible
       buttons/links"): the "Read the case study" link stretches over the
       card with an ::after overlay, so there is one tab stop and one name,
       "Read the case study: {title}".
       Hover is a border shift only and focus a 2px inset outline. The
       --shadow-glow halo would be clipped by the scroller's overflow, and
       an inset outline can't be clipped (CLAUDE.md Design Taste ref 3,
       adapted; vrattiks-accessibility, "Focus states"). */
    <article
      id={study.slug}
      aria-labelledby={titleId}
      className="group relative flex w-full scroll-mt-20 flex-col overflow-hidden rounded-xl border border-n-200 bg-n-0 transition-[border-color] duration-150 ease-out hover:border-brand-primary has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-brand-secondary"
    >
      {screen ? (
        <span data-pin-media="" className="relative block aspect-[16/10] border-b border-n-200 bg-n-50 in-data-pinned:h-[var(--pin-media-h,auto)]">
          <Image
            src={screen.src}
            alt={screen.alt}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 85vw"
            className="object-cover object-top"
          />
        </span>
      ) : null}

      <div className="flex flex-1 flex-col p-6 md:p-8 in-data-pinned:px-6 in-data-pinned:py-5">
        <span className="font-body text-label font-semibold tracking-[0.14em] text-brand-secondary uppercase">{study.kind}</span>
        <h3 id={titleId} className="mt-3 text-[24px] in-data-pinned:mt-2 leading-[1.2] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[28px]">
          {study.title}
        </h3>
        <p className="mt-1 text-[14px] text-n-600">{study.clientName}</p>
        <p className="mt-4 text-[15.5px] leading-[1.6] text-n-700 in-data-pinned:mt-3 in-data-clamp:line-clamp-3">{study.summary.text}</p>

        {/* mt-auto pins the link to the bottom, so it lines up across cards
            of different summary lengths. */}
        <div className="mt-auto pt-6 in-data-pinned:pt-3">
          <Link
            href={`/case-studies/${study.slug}`}
            className="inline-flex min-h-11 items-center text-[15px] font-semibold text-brand-secondary underline-offset-4 group-hover:underline focus-visible:outline-none after:absolute after:inset-0 after:rounded-xl"
          >
            Read the case study<span className="sr-only">: {study.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function WebsiteBento({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  const projects = caseStudiesIn("website") as WebsiteStudy[];
  const headingId = `${id}-heading`;

  return (
    <Section
      tone="tint"
      id={id}
      labelledBy={headingId}
      /* While pinned, the frame carries 24px of its own above and below, so
         the Section trims to 40px: 64px to the heading and to the next
         section, the same rhythm as the native row. */
      className="scroll-mt-16 md:scroll-mt-20 lg:has-[[data-pinned]]:py-10"
    >
      <Container>
        <PinnedRow
          label="Website projects"
          itemLabel="project"
          header={
            /* While pinned (in-data-pinned), the description moves beside the
               title so heading + cards fit under the header on more screens. */
            <div className="in-data-pinned:flex in-data-pinned:items-end in-data-pinned:justify-between in-data-pinned:gap-x-12">
              <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
              {/* Description rendered here in n-600, not via SectionHeading's
                  n-500, which measures 4.32:1 on the tint band (needs 4.5 —
                  vrattiks-accessibility "Contrast"). Shared component untouched. */}
              <p className="mt-4 max-w-2xl text-body-lg text-n-600 in-data-pinned:mt-0 in-data-pinned:max-w-md">{description}</p>
            </div>
          }
        >
          {projects.map((study) => (
            <ProjectCard key={study.slug} study={study} />
          ))}
        </PinnedRow>
      </Container>
    </Section>
  );
}
