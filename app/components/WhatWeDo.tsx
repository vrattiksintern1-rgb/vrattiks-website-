import Link from "next/link";
import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { capabilities } from "@/app/lib/content";

/**
 * Structure: one-large-plus-grid (awesome-design §3, Notion entry).
 *
 * PROBLEM IT SOLVES: six services in six equal-weight cards reads as "we will
 * do anything", which is an agency without a point of view (ui-ux-pro-max §5,
 * undifferentiated service grids). Home now promotes ONE story — lead
 * generation and outreach — and the other three cards are the services that
 * story is assembled from. The full six-service catalogue still exists, on
 * /services and in CatalogueIndex further down the page, so nothing required
 * by vrattiks-architecture §2 has been dropped.
 *
 * ⚠ THIS IS THE PAGE'S ONLY ICON-IN-A-CARD GRID (taste-skill §4, slop tell #3).
 * The budget is one. If another section is ever tempted toward a 3-up icon
 * grid, it has to take a different structure instead — a list, a split, a
 * stepper, or a table.
 *
 * EMPHASIS IS ONE DEVICE ONLY (Stripe rule, CLAUDE.md reference 1): the
 * featured card is marked by a gradient hairline border via `.border-gradient`
 * and keeps a neutral fill. It does NOT also get a gradient fill, a bigger
 * shadow, and an accent heading — stacking emphasis devices is what makes a
 * promoted card look like an ad rather than a decision.
 */
export default function WhatWeDo() {
  const featured = capabilities.find((capability) => capability.featured);
  const rest = capabilities.filter((capability) => !capability.featured);

  return (
    <Section id="services" tone="paper" labelledBy="what-we-do-heading">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="what-we-do-heading"
            eyebrow="What we do"
            title="One system that finds, writes to, and tracks your leads"
            description="Each piece works on its own. Together they are the outreach engine described below."
            className="max-w-xl"
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button href="/services" variant="outline">
              View all services
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:grid-cols-3 md:gap-5">
          {featured ? (
            <Reveal className="sm:col-span-2 md:col-span-3">
              <Link
                href={featured.href}
                className="focus-glow border-gradient card-lift group flex h-full flex-col gap-6 rounded-md bg-n-0 p-6 shadow-[var(--shadow-soft)] md:flex-row md:items-center md:gap-10 md:p-9"
              >
                <span className="bg-brand-gradient-soft flex h-14 w-14 shrink-0 items-center justify-center rounded-sm text-brand-secondary">
                  <Icon name={featured.icon} className="h-7 w-7" />
                </span>

                {/* <div>, not <span>: a <span> may only contain phrasing
                    content, so an <h3> inside one is invalid markup. <a> is
                    transparent, so flow content is legal here. */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[clamp(22px,2.6vw,30px)] leading-snug font-bold tracking-[-0.02em] text-n-900 text-balance">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-body leading-normal text-n-600">
                    {featured.description}
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-2 text-ui font-semibold text-brand-secondary">
                  Learn more
                  <Icon
                    name="arrowUpRight"
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ) : null}

          {rest.map((capability, i) => (
            <Reveal
              key={capability.href}
              delay={i * 0.06}
              /* 3 cards in a 2-up tablet grid leaves an orphan; the last one
                 spans both columns until the 3-up desktop grid takes over. */
              className="h-full last:sm:col-span-2 md:last:col-span-1"
            >
              <Link
                href={capability.href}
                className="focus-glow card-lift group flex h-full flex-col rounded-md border border-n-200 bg-n-0 p-6 shadow-[var(--shadow-soft)] md:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-n-50 text-brand-secondary">
                  <Icon name={capability.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-body-lg leading-snug font-semibold text-n-900">
                  {capability.title}
                </h3>
                <p className="mt-2.5 flex-1 text-ui leading-normal text-n-600">
                  {capability.description}
                </p>
                {/* Rests visible rather than appearing on hover — there is no
                    hover on touch, and a hidden affordance makes a real link
                    read as static text.

                    ⚠ n-500, NOT n-400. Measured: n-400 (#9c93b8) on n-0 is
                    2.88:1, which FAILS the 3:1 non-text bar in WCAG 1.4.11 —
                    an older comment elsewhere in this repo claims 4.1:1 for
                    that pair and is simply wrong. n-500 measures 4.75:1. */}
                <Icon
                  name="arrowUpRight"
                  className="mt-5 h-4 w-4 text-n-500 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-secondary"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
