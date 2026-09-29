import Link from "next/link";
import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import { services, useCases, industries } from "@/app/lib/content";

/**
 * Structure: a dense three-column link index (ui-ux-pro-max §1 — "Use cases /
 * industries → dense list or 2-column link index, one line of context each";
 * the row directly above it warns against giving every item a full icon card).
 *
 * WHAT THIS REPLACED, AND WHY (2026-09-23). Home previously spent three full
 * sections on catalogues: ServicesOverview (a 1-large-plus-5 card grid),
 * UseCases (a dark Problem/Solution/Benefit matrix) and Industries (a
 * sticky-split index). Fourteen browsable links do not need three sections and
 * two page-heights — that length is a large part of why the page read as a
 * template. All three components remain on disk and are the right components
 * for /services, /use-cases and /industries, which is where a catalogue that
 * size belongs.
 *
 * This satisfies vrattiks-architecture §5 in one block: Home links out to the
 * Services, Use Cases, Industries AND Case Studies overviews, plus every
 * service, use-case and industry detail page.
 *
 * THE ONE IDEA: it is purely typographic. No icons, no cards, no borders
 * around items, no accent fills — a single hairline per column and nothing
 * else. It sits between the narrative above and the FAQ below, and its job is
 * to be scannable, not to compete. A catalogue that shouts is the fastest way
 * back to slop tell #3 (icon-in-a-rounded-square, ×N).
 *
 * ⚠ Industries currently has 5 entries, not the 6 required by
 * vrattiks-architecture §2 — E-commerce was removed at the user's request on
 * 2026-09-22 and that deviation is recorded in app/lib/content.ts. This
 * component renders whatever the array holds; fix it there, not here.
 */
const columns = [
  {
    heading: "Services",
    href: "/services",
    items: services.map((service) => ({
      name: service.name,
      href: `/services/${service.slug}`,
      context: service.description,
    })),
  },
  {
    heading: "Use cases",
    href: "/use-cases",
    items: useCases.map((useCase) => ({
      name: useCase.name,
      href: `/use-cases/${useCase.slug}`,
      context: useCase.benefit,
    })),
  },
  {
    heading: "Industries",
    href: "/industries",
    items: industries.map((industry) => ({
      name: industry.name,
      href: `/industries/${industry.slug}`,
      context: industry.application,
    })),
  },
];

export default function CatalogueIndex() {
  return (
    <Section id="explore" tone="paper" labelledBy="explore-heading">
      <Container>
        <SectionHeading
          id="explore-heading"
          eyebrow="Explore"
          title="Everything else we build"
          description="Outreach is where most businesses start with us. It is not the only place automation pays for itself."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 md:mt-16 md:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <Reveal key={column.heading} delay={columnIndex * 0.06}>
              <div className="border-t border-n-200 pt-6">
                <h3 className="font-body text-label tracking-[0.14em] text-n-500 uppercase">
                  {column.heading}
                </h3>

                <ul className="-mx-3 mt-4 flex flex-col">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="focus-glow group block rounded-sm px-3 py-3 transition-colors duration-150 hover:bg-n-100"
                      >
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="font-display text-body font-semibold text-n-900 transition-colors duration-150 group-hover:text-brand-secondary">
                            {item.name}
                          </span>
                          {/* Rests visible rather than appearing on hover —
                              there is no hover on touch, and a hidden
                              affordance makes a real link read as static
                              text. n-500 (4.57:1 on n-25), not n-400 (2.78:1,
                              under the 3:1 non-text bar). */}
                          <Icon
                            name="arrowUpRight"
                            className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-n-500 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-brand-secondary"
                          />
                        </span>
                        {/* n-600, not n-500. The row tints to n-100 on hover,
                            and n-500 on n-100 measures 3.95:1 — under the
                            4.5:1 bar for 13.5px text. So the resting colour is
                            chosen for the HOVER surface, not the resting one:
                            n-600 is 7.28:1 at rest and still 6.29:1 hovered.
                            Check hover and focus surfaces, not just default
                            ones (vrattiks-accessibility, "Contrast"). */}
                        <span className="mt-1 block text-caption leading-normal text-n-600">
                          {item.context}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={column.href}
                  className="focus-glow mt-4 inline-flex items-center gap-2 rounded-sm py-2 text-ui font-semibold text-brand-secondary hover:underline"
                >
                  All {column.heading.toLowerCase()}
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* vrattiks-architecture §5 also requires a Home → Case Studies link.
            The CaseStudies SECTION stays disabled until a real engagement is
            published (an empty "coming soon" block costs more credibility than
            the missing section does), but the overview must still be reachable
            from Home or it is an orphan. */}
        <Reveal delay={0.12} className="mt-14 md:mt-16">
          <div className="rule-fade" aria-hidden="true" />
          <p className="mt-8 text-ui leading-normal text-n-600">
            Client results are published as they are signed off.{" "}
            <Link
              href="/case-studies"
              className="focus-glow rounded-sm font-semibold text-brand-secondary hover:underline"
            >
              See our case studies
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
