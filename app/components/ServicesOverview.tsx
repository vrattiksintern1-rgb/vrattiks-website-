import Link from "next/link";
import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { services } from "@/app/lib/content";

/**
 * Structure: one-large-plus-grid (awesome-design §3, Notion entry).
 *
 * Problem it solves: six services in six identical equal-weight cards reads as
 * "we'll do anything" — an agency without a point of view (ui-ux-pro-max §5,
 * undifferentiated service grids). Promoting the lead service gives the section
 * a focal point and states a position.
 *
 * The featured service is services[0] — AI Voice Agent — because that is the
 * order vrattiks-architecture §1 defines (03.1). It is not a claim about
 * popularity or results; change the order in app/lib/content.ts to change which
 * service leads, rather than hardcoding a different one here.
 *
 * This is the page's one permitted icon-card grid (taste-skill §4).
 */
export default function ServicesOverview() {
  const [featured, ...rest] = services;

  return (
    <Section id="services" tone="paper" labelledBy="services-heading">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="Six ways we put automation to work for you"
            description="Each service works on its own, or together as one connected system."
            className="max-w-xl"
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button href="/services" variant="outline">
              View all services
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:grid-cols-3 md:grid-rows-3 md:gap-5">
          {/* Featured — double width and height on desktop */}
          <Reveal className="sm:col-span-2 md:row-span-2">
            <Link
              href={`/services/${featured.slug}`}
              className="focus-glow card-lift group flex h-full flex-col rounded-md border border-n-200 bg-n-0 p-6 shadow-[var(--shadow-soft)] md:p-8"
            >
              <span className="bg-brand-gradient-soft flex h-12 w-12 items-center justify-center rounded-sm text-brand-secondary">
                <Icon name={featured.icon} className="h-6 w-6" />
              </span>
              {/* <div>/<p>, not <span>. A <span> may only contain phrasing
                  content, so the <h3> inside it was invalid — browsers recover
                  by silently re-parenting it, which is how it looked fine.
                  <a> is transparent, so flow content is legal here. */}
              <div className="mt-6">
                <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-snug font-bold tracking-[-0.02em] text-n-900">
                  {featured.name}
                </h3>
                <p className="mt-3 max-w-[46ch] text-body leading-normal text-n-600">
                  {featured.description}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-ui font-semibold text-brand-secondary md:mt-auto md:pt-8">
                Learn more
                <Icon
                  name="arrowUpRight"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </Reveal>

          {rest.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={(i % 3) * 0.06}
              /* 5 cards in a 2-up tablet grid leaves an orphan; the last one
                 spans both columns until the 3-up desktop grid takes over. */
              className="h-full last:sm:col-span-2 md:last:col-span-1"
            >
              <Link
                href={`/services/${service.slug}`}
                className="focus-glow card-lift group flex h-full flex-col rounded-md border border-n-200 bg-n-0 p-5 shadow-[var(--shadow-soft)] md:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-n-50 text-brand-secondary">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-body font-semibold text-n-900">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-caption leading-snug text-n-600">
                  {service.description}
                </p>
                <Icon
                  name="arrowUpRight"
                  className="mt-4 h-4 w-4 text-n-400 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-secondary"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
