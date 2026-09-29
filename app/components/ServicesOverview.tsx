import Link from "next/link";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { services } from "@/app/lib/content";

/* Shared by Home and /services. On /services, pass `showAllLink={false}` —
   the "View all services" button would link the page to itself — and a
   `headingId` so the section landmark is named by its h2. */
export default function ServicesOverview({
  showAllLink = true,
  headingId,
}: {
  showAllLink?: boolean;
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className="py-14 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id={headingId}
            eyebrow="Services"
            title="Six core services, plus custom automation for the rest"
            description="Use one on its own or connect them into one system. If a repetitive task doesn't fit these six — payment reminders, appointment booking, daily reports, stock alerts — we can automate that too."
            className="max-w-xl"
          />
          {showAllLink ? (
            <Button href="/services" variant="outline" className="shrink-0">
              View all services
            </Button>
          ) : null}
        </div>

        {/* Service card — the page's one icon + title + text grid. Icon sits
            in an outlined circle; the CTA lives in a ruled footer with its
            own arrow disc. Hover is a border shift plus the glow token, never
            a lift or scale (CLAUDE.md Design Taste, reference 3). */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-5">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/services/${service.slug}`}
                className="focus-glow group flex h-full flex-col rounded-lg border border-n-200 bg-n-0 p-6 transition-[border-color,box-shadow] duration-150 ease-out hover:border-brand-primary hover:shadow-[var(--shadow-glow)] md:p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-n-200 text-brand-secondary transition-colors duration-150 group-hover:border-brand-primary">
                  <Icon name={service.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-6 text-[18px] leading-[1.25] font-display font-semibold text-n-900">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-n-600">
                  {service.description}
                </p>
                <span className="mt-6 flex items-center justify-between border-t border-n-100 pt-4 text-[13.5px] font-semibold text-brand-secondary">
                  Learn more
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-n-50 transition-colors duration-150 group-hover:bg-brand-secondary group-hover:text-n-0">
                    <Icon
                      name="arrowUpRight"
                      className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
