import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* USER-PROVIDED copy (vrattiks-standards §3, 2026-09-12): the brand story is
   used verbatim and is pending final client sign-off. Don't embellish it. */
export default function OurStory() {
  return (
    <Section tone="white" labelledBy="story-heading">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
        {/* Sticky works because Section clips with overflow-x-clip, not hidden */}
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading
            id="story-heading"
            eyebrow="Our story"
            title="Named after the natural flow of things"
          />
        </div>

        <div>
          <Reveal>
            <p className="text-[22px] leading-[1.35] tracking-[-0.01em] font-display font-semibold text-n-900 md:text-[26px]">
              Vrattiks was born from the ancient Indian idea of &lsquo;Vritti&rsquo; — the
              natural flow of thought, action, and evolution.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-body-lg text-n-600">
              We combine this timeless wisdom with the power of modern AI to create
              systems that are not just automated, but intelligent, adaptive, and deeply
              aligned with how businesses truly work.
            </p>
            <p className="mt-4 text-body-lg text-n-600">
              Inspired by the 5 Elements: Earth, Water, Fire, Air, and Space —
              everything we build is designed to bring structure, clarity, energy,
              connection, and limitless growth into your operations.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 border-l-2 border-brand-secondary pl-5 md:pl-7">
            <p className="text-[22px] leading-[1.3] tracking-[-0.02em] font-display font-semibold text-n-900 md:text-[28px]">
              This is not just tech. It&apos;s intelligence, with purpose.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
