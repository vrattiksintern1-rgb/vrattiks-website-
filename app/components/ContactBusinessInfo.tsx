import Link from "next/link";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { contactDetails, services } from "@/app/lib/content";

const linkClass =
  "focus-glow rounded-sm text-n-800 underline decoration-n-300 underline-offset-4 transition-colors duration-150 hover:text-brand-secondary hover:decoration-brand-secondary";

/* Business facts as one definition list. Confirmed: the legal name, the
   services (content.ts) and the audience (CLAUDE.md). Location and hours are
   placeholders until contactDetails is filled in (vrattiks-standards §3). The
   structure is a two-column ruled <dl> under a left-aligned heading, unlike
   the dark band's numbered ledger above it. */
export default function ContactBusinessInfo() {
  const facts: { label: string; value: React.ReactNode; wide?: boolean }[] = [
    { label: "Registered name", value: "Vrattiks Intelligence LLP" },
    {
      label: "Location",
      value: contactDetails.location ?? <span className="text-n-600">Pending confirmation</span>,
    },
    {
      label: "Business hours",
      value: contactDetails.hours ?? <span className="text-n-600">Pending confirmation</span>,
    },
    { label: "Who we work with", value: "Growing businesses and SMEs across India" },
    {
      label: "What we build",
      wide: true,
      value: (
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className={linkClass}>
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Industries",
      wide: true,
      value: (
        <Link href="/industries" className={linkClass}>
          See the industries we work with
        </Link>
      ),
    },
  ];

  return (
    <Section tone="white" labelledBy="business-info-heading">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <SectionHeading
          id="business-info-heading"
          eyebrow="Business information"
          title="Who you'll be talking to"
          description="Vrattiks Intelligence is an AI automation company. We design and build the systems ourselves."
        />

        <Reveal delay={0.08}>
          <dl className="grid grid-cols-1 border-t border-n-200 sm:grid-cols-2 sm:gap-x-10">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className={`border-b border-n-200 py-5 ${fact.wide ? "sm:col-span-2" : ""}`}
              >
                <dt className="font-body text-label font-semibold uppercase text-n-600">{fact.label}</dt>
                <dd className="mt-2 text-[15.5px] leading-[1.55] font-medium text-n-800">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
