import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

/* No verified client testimonials exist yet — showing an honest pending
   state instead of a fabricated quote (vrattiks-standards §3). */
export default function Testimonials() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say"
          align="center"
        />

        {/* Quote-first: the statement sits in a speech bubble with a tail,
            and the attribution row below uses a placeholder avatar and blank
            name/role bars — no invented person — so the slot's final shape
            is visible before real quotes exist. Plain divs, not
            figure/blockquote: this is a notice, not a quotation. */}
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl md:mt-12">
          <div>
            <div className="relative rounded-xl border border-n-200 bg-n-0 px-6 pt-14 pb-8 shadow-[var(--shadow-md)] sm:px-10 md:px-12 md:pt-16 md:pb-10">
              <Icon
                name="quote"
                className="absolute top-6 left-6 h-8 w-8 text-brand-primary sm:left-10 md:left-12"
              />
              <p className="text-[17px] leading-[1.65] text-n-700 md:text-[19px]">
                Client testimonials will appear here as engagements are completed and
                verified — we don&apos;t publish quotes we can&apos;t stand behind.
              </p>
              <span
                aria-hidden="true"
                className="absolute -bottom-[9px] left-10 h-4 w-4 rotate-45 border-r border-b border-n-200 bg-n-0 sm:left-14 md:left-16"
              />
            </div>
            <div aria-hidden="true" className="mt-6 flex items-center gap-3 pl-6 sm:pl-10 md:pl-12">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-n-300 bg-n-50 text-n-500">
                <Icon name="users" className="h-5 w-5" />
              </span>
              <span className="flex flex-col gap-2">
                <span className="block h-2.5 w-28 rounded-full bg-n-200" />
                <span className="block h-2 w-20 rounded-full bg-n-100" />
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
