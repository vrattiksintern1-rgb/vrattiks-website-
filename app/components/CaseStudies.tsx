import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

/* No published case studies exist yet — showing an honest pending state
   instead of fabricated client names or results (vrattiks-standards §3). */
export default function CaseStudies() {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Case Studies"
            title="Results, documented as engagements complete"
            description="We publish real client outcomes — challenge, solution, and results — once each engagement is complete and verified."
            className="max-w-xl"
          />
          <Button href="/case-studies" variant="outline" className="shrink-0">
            View case studies
          </Button>
        </div>

        <Reveal
          delay={0.1}
          className="mt-10 rounded-lg border border-dashed border-n-300 bg-n-50 p-8 md:mt-12 md:p-10"
        >
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-n-0 text-brand-secondary shadow-[var(--shadow-sm)]">
              <Icon name="clock" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-body-lg font-display font-semibold text-n-900">
                Case studies coming soon
              </h3>
              <p className="mt-2 max-w-xl text-ui leading-normal text-n-500">
                We&apos;re documenting client / industry, challenge, solution,
                and measured results from current engagements. Real case studies
                with verified outcomes will appear here as they&apos;re
                completed.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
