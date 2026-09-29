import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Section from "./ui/Section";
import type { Service } from "@/app/lib/content";

/* Service detail hero. The one idea is the display-scale jump: the service
   name at 60px over a quiet headline and body (CLAUDE.md Design Taste, ref 2).
   The breadcrumb is the detail page's link back to /services
   (vrattiks-architecture §5). */
export default function ServiceHero({
  service,
  headline,
}: {
  service: Service;
  headline: string;
}) {
  return (
    <Section tone="paper" labelledBy="service-heading">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 md:mb-14">
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-n-600">
            <li>
              <Link
                href="/services"
                className="focus-glow rounded-sm transition-colors duration-150 hover:text-brand-secondary"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true" className="text-n-500">
              /
            </li>
            <li aria-current="page" className="font-medium text-n-800">
              {service.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end md:gap-16">
          <div>
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-n-200 bg-n-0 text-brand-secondary">
              <Icon name={service.icon} className="h-6 w-6" />
            </span>
            {/* Not wrapped in Reveal: the H1 should be readable the instant it
                paints (kylezantos-design §1b). */}
            <h1
              id="service-heading"
              className="mt-6 text-[40px] leading-[1.05] tracking-[-0.03em] font-display font-semibold text-n-900 md:text-[60px]"
            >
              {service.name}
            </h1>
            <p className="mt-5 max-w-[24ch] text-[22px] leading-[1.3] font-display font-semibold text-n-700 md:text-[26px]">
              {headline}
            </p>
          </div>

          <div>
            <p className="text-body-lg text-n-600">{service.details}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Book a Free Consultation</Button>
              <Button href="#how-it-works" variant="ghost">
                See how it works
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
