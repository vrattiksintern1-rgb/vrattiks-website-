import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import Button from "./ui/Button";
import IndustryTimeline from "./IndustryTimeline";
import { industries } from "@/app/lib/content";

/* Optional props let /industries retitle the section so it doesn't repeat
   its own H1, and name the landmark by its heading. Home passes
   showImages={false} to keep the section a text-only directory, and
   limit={6} to show a shortlist with a "View all industries" link —
   /industries omits it and lists every industry. layout="timeline" swaps
   the ruled grid for the scroll-linked rail in IndustryTimeline (Home). */
export default function Industries({
  eyebrow = "Industries",
  title = "Built to adapt to how your industry works",
  description = "The same automation foundation, applied to what matters most in your industry.",
  headingId,
  showImages = true,
  limit,
  layout = "grid",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  headingId?: string;
  showImages?: boolean;
  limit?: number;
  layout?: "grid" | "timeline";
}) {
  const shown = limit ? industries.slice(0, limit) : industries;

  return (
    <section aria-labelledby={headingId} className="py-8 md:py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            description={description}
            className={limit ? "max-w-xl" : ""}
          />
          {limit ? (
            <Button href="/industries" variant="outline" className="shrink-0">
              View all industries
            </Button>
          ) : null}
        </div>

        {layout === "timeline" ? (
          <IndustryTimeline industries={shown} />
        ) : (
        /* Ruled directory, not a card wall: entries hang off hairline
            top rules with no box or background, so the section can't be
            mistaken for the Services cards above it. Each entry leads with a
            photo of that industry — a thumbnail beside the text on phones,
            a full-width photo above it from sm up. The photo is decorative
            (alt=""): the link text already names the industry. Hover turns
            the rule and name brand-secondary; nothing moves or scales. */
        <div className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-x-10">
          {shown.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 3) * 0.06}>
              {/* id = slug: the jump-list target in IndustriesIntro */}
              <Link
                id={industry.slug}
                href={`/industries/${industry.slug}`}
                className="focus-glow group flex h-full items-start gap-4 border-t border-n-200 pt-5 pb-7 transition-colors duration-150 hover:border-brand-secondary sm:flex-col sm:items-stretch sm:gap-4"
              >
                {showImages && (
                  <span className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-sm bg-n-50 sm:aspect-[3/2] sm:w-full md:aspect-[16/9]">
                    <Image
                      src={industry.image}
                      alt=""
                      fill
                      sizes="(min-width: 901px) 33vw, (min-width: 601px) 50vw, 96px"
                      className="object-cover"
                    />
                    {/* Inset hairline so the bright photos (finance, construction)
                        keep an edge against the n-25 page instead of bleeding into it. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-n-900/10 ring-inset"
                    />
                  </span>
                )}
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-[15px] leading-[1.3] font-display font-semibold text-n-900 transition-colors duration-150 group-hover:text-brand-secondary">
                    {industry.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13.5px] leading-[1.55] text-n-600">
                    {industry.application}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-secondary">
                    See use cases
                    <Icon
                      name="arrowUpRight"
                      className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        )}
      </Container>
    </section>
  );
}
