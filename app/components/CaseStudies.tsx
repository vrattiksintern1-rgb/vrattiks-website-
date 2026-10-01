import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

/* No published case studies exist yet — showing an honest pending state
   instead of fabricated client names or results (vrattiks-standards §3). */
export default function CaseStudies() {
  return (
    <section className="py-10 md:py-16">
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

        {/* Editorial project card: a hatched "cover" panel where the project
            image will go, and a larger title on the right. Square-ish corners
            and no shadow keep it print-like and distinct from the link cards. */}
        <Reveal
          delay={0.1}
          className="mt-10 grid grid-cols-1 overflow-hidden rounded-sm border border-n-200 bg-n-0 md:mt-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          <div
            aria-hidden="true"
            className="relative flex min-h-[180px] items-center justify-center border-b border-n-200 bg-n-50 md:min-h-[280px] md:border-r md:border-b-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--color-n-200) 0 1px, transparent 1px 14px)",
            }}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-n-200 bg-n-0 text-brand-secondary shadow-[var(--shadow-md)]">
              <Icon name="clock" className="h-6 w-6" />
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12">
            <h3 className="text-[22px] leading-[1.2] tracking-[-0.01em] font-display font-bold text-n-900 md:text-[26px]">
              Case studies coming soon
            </h3>
            <p className="mt-4 max-w-xl border-t border-n-100 pt-4 text-[15px] leading-[1.65] text-n-600">
              We&apos;re documenting client / industry, challenge, solution, and
              measured results from current engagements. Real case studies with
              verified outcomes will appear here as they&apos;re completed.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
