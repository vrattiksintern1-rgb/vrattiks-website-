import Link from "next/link";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import { industries } from "@/app/lib/content";

export default function Industries() {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Built to adapt to how your industry works"
          description="The same automation foundation, applied to what matters most in your industry."
        />

        {/* Ruled directory, not a card wall: eleven entries hang off hairline
            top rules with no box, background or radius, so the section can't
            be mistaken for the Services cards above it. Composition is
            horizontal (icon square left, text right). Hover fills the icon
            square and turns the name brand-secondary; nothing moves. */}
        <div className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-x-10">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 3) * 0.06}>
              <Link
                href={`/industries/${industry.slug}`}
                className="focus-glow group flex h-full items-start gap-4 border-t border-n-200 pt-5 pb-7 transition-colors duration-150 hover:border-brand-secondary"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-n-50 text-brand-secondary transition-colors duration-150 group-hover:bg-brand-secondary group-hover:text-n-0">
                  <Icon name={industry.icon} className="h-5 w-5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-[15px] leading-[1.3] font-display font-semibold text-n-900 transition-colors duration-150 group-hover:text-brand-secondary">
                    {industry.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13.5px] leading-[1.55] text-n-600">
                    {industry.application}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-secondary">
                    See use cases
                    <Icon
                      name="arrowUpRight"
                      className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
