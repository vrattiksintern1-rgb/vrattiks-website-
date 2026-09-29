import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import type { Service } from "@/app/lib/content";

/* Related services — the service cards without the icon disc, so the page
   doesn't grow a second icon-card grid. Hover matches ServicesOverview:
   border shift plus the glow token, never a lift. */
export default function RelatedServices({ services }: { services: Service[] }) {
  return (
    <Section tone="paper" labelledBy="related-heading">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="related-heading"
            eyebrow="Related services"
            title="Works well with"
          />
          <Button href="/services" variant="outline" className="shrink-0">
            All services
          </Button>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-5">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className="focus-glow group flex h-full flex-col rounded-lg border border-n-200 bg-n-0 p-6 transition-[border-color,box-shadow] duration-150 ease-out hover:border-brand-primary hover:shadow-[var(--shadow-glow)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[18px] leading-[1.25] font-display font-semibold text-n-900">
                    {service.name}
                  </h3>
                  <Icon
                    name="arrowUpRight"
                    className="mt-1 h-4 w-4 shrink-0 text-n-500 transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-secondary"
                  />
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-n-600">{service.description}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
