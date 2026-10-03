import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* USER-PROVIDED (vrattiks-standards §3, 2026-10-03): names and roles only.
   No bios, photos or quotes until the client supplies them. Card markup
   mirrors Founders.tsx so the two read as one team; keep them in step.
   Shares Founders' tint band with its top padding removed, so the page
   shows one continuous team block rather than two identical bands. */
const employees = [
  { name: "Bhadiyadra Jay", initials: "BJ", role: "Full Stack AI Engineer" },
  { name: "Kamya Patel", initials: "KP", role: "Full Stack Developer" },
];

export default function Employees() {
  return (
    <Section
      tone="tint"
      labelledBy="employees-heading"
      className="pt-0 sm:pt-0 md:pt-0"
    >
      <Container>
        <SectionHeading
          id="employees-heading"
          eyebrow="Our Team"
          title="The people who build your systems"
        />

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:gap-6">
          {employees.map((employee, i) => (
            <Reveal
              key={employee.name}
              as="li"
              delay={i * 0.08}
              className="flex items-center gap-5 rounded-md border border-n-100 bg-n-0 p-6 shadow-[var(--shadow-sm)] md:gap-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-graphite font-display text-[22px] font-bold text-brand-primary md:h-20 md:w-20 md:text-[26px]"
              >
                {employee.initials}
              </span>
              <div>
                <h3 className="text-[22px] leading-[1.2] font-display font-bold text-n-900 md:text-h3">
                  {employee.name}
                </h3>
                <p className="mt-1 font-body text-label font-semibold uppercase text-n-600">
                  {employee.role}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
