import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import { services } from "@/app/lib/content";

/* Only repo-confirmed facts here (vrattiks-standards §3): the legal name,
   the six services from content.ts, and the audience from CLAUDE.md. No
   founding year, headcount or client count until one is supplied. */
const facts = [
  { label: "Company", value: "Vrattiks Intelligence LLP" },
  { label: "What we build", value: services.map((s) => s.name).join(", ") },
  { label: "Who we build for", value: "Growing businesses and SMEs across India" },
];

export default function CompanyIntro() {
  return (
    <Section tone="paper" labelledBy="company-heading">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-end md:gap-16">
        <div>
          <Eyebrow className="mb-5">Company</Eyebrow>
          {/* Not wrapped in Reveal: the page's H1 should be readable the
              instant it paints. */}
          <h1
            id="company-heading"
            className="max-w-[16ch] text-[36px] leading-[1.1] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[52px]"
          >
            Your team focuses on customers. We handle the repetitive work.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-n-600">
            Vrattiks Intelligence is an AI automation company. We design and build
            voice agents, chatbots and workflow automation around the way your
            business already works — so enquiries get answered, follow-ups happen on
            time, and your people get their hours back.
          </p>
        </div>

        <Reveal delay={0.1}>
          <dl className="border-t border-n-200">
            {facts.map((fact) => (
              <div key={fact.label} className="border-b border-n-200 py-4">
                <dt className="font-body text-label font-semibold uppercase text-n-600">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-[15px] leading-[1.55] font-medium text-n-800">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
