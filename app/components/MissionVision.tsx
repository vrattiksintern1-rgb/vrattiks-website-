import Container from "./ui/Container";
import Icon, { type IconName } from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* PLACEHOLDER copy (vrattiks-standards §3): no approved mission or vision
   statement exists yet. These are drafted from the confirmed services and the
   user-provided brand story — replace with client-approved wording. */
const statements: { label: string; icon: IconName; text: string }[] = [
  {
    label: "Mission",
    icon: "target",
    text: "Give growing businesses AI and automation that fits how they already work, so every enquiry gets answered and no follow-up depends on someone remembering.",
  },
  {
    label: "Vision",
    icon: "eye",
    text: "Businesses where systems handle the repetitive work, and people spend their time on the work only people can do.",
  },
];

/* The page's dark band: it resets the eye after two light sections. Text sits
   on the muted n-300 ramp and dividers are n-0/10 hairlines (CLAUDE.md Design
   Taste, reference 2). */
export default function MissionVision() {
  return (
    <Section tone="dark" labelledBy="mission-heading">
      <Container>
        <SectionHeading
          id="mission-heading"
          tone="dark"
          eyebrow="Mission & Vision"
          title="What we do, and where it leads"
        />

        <div className="mt-10 grid grid-cols-1 border-t border-n-0/10 md:mt-14 md:grid-cols-2">
          {statements.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`py-8 md:py-10 ${
                i === 0
                  ? "md:pr-12"
                  : "border-t border-n-0/10 md:border-t-0 md:border-l md:pl-12"
              }`}
            >
              {/* Same icon ring as the KpiResults dark band. */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-n-0/15 text-brand-primary">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-body text-label font-semibold uppercase text-brand-primary">
                  {s.label}
                </h3>
              </div>
              <p className="mt-4 text-[22px] leading-[1.35] tracking-[-0.01em] font-display font-semibold text-n-100 md:text-[26px]">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
