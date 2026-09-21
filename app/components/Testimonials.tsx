import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

/* No verified client testimonials exist yet — showing an honest pending
   state instead of a fabricated quote (vrattiks-standards §3). */
export default function Testimonials() {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say"
          align="center"
        />

        <Reveal
          delay={0.1}
          className="mx-auto mt-10 flex max-w-lg flex-col items-center rounded-lg border border-dashed border-n-300 bg-n-50 p-8 text-center md:mt-12 md:p-10"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-n-0 text-brand-secondary shadow-[var(--shadow-sm)]">
            <Icon name="quote" className="h-5 w-5" />
          </span>
          <p className="mt-5 text-ui leading-normal text-n-600">
            Client testimonials will appear here as engagements are completed
            and verified — we don&apos;t publish quotes we can&apos;t stand
            behind.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
