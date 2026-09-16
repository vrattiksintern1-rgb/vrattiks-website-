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

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/industries/${industry.slug}`}
                className="focus-glow group flex h-full flex-col rounded-lg border border-n-100 bg-n-0 p-5 shadow-[var(--shadow-sm)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] md:p-6"
              >
                <span className="bg-brand-gradient-soft flex h-11 w-11 items-center justify-center rounded-md text-brand-secondary">
                  <Icon name={industry.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 text-[16px] font-display font-semibold text-n-900">
                  {industry.name}
                </h3>
                <p className="mt-1.5 flex-1 text-[13.5px] leading-[1.55] text-n-500">
                  {industry.application}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-secondary">
                  See use cases
                  <Icon
                    name="arrowUpRight"
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
