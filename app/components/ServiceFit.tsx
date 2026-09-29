import Link from "next/link";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import type { Industry, UseCase } from "@/app/lib/content";

/* Who it's for: the industries and use cases this service fits, as two ruled
   link lists (vrattiks-architecture §5: service pages link to relevant
   Industries and Use Cases). */
export default function ServiceFit({
  industries,
  useCases,
}: {
  industries: Industry[];
  useCases: UseCase[];
}) {
  return (
    <Section tone="white" labelledBy="fit-heading">
      <Container>
        <SectionHeading
          id="fit-heading"
          eyebrow="Who it's for"
          title="Where it works best"
        />

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-body text-label font-semibold tracking-[0.14em] uppercase text-n-600">
              Industries
            </h3>
            <ul className="mt-4 border-t border-n-200">
              {industries.map((industry) => (
                <li key={industry.slug} className="border-b border-n-200">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="focus-glow group flex items-center justify-between gap-4 rounded-sm py-4 text-[16px] font-medium text-n-800 transition-colors duration-150 hover:text-brand-secondary"
                  >
                    {industry.name}
                    <Icon
                      name="arrowUpRight"
                      className="h-4 w-4 shrink-0 text-n-500 transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-secondary"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-label font-semibold tracking-[0.14em] uppercase text-n-600">
              Use cases
            </h3>
            <ul className="mt-4 border-t border-n-200">
              {useCases.map((useCase) => (
                <li key={useCase.slug} className="border-b border-n-200">
                  <Link
                    href={`/use-cases/${useCase.slug}`}
                    className="focus-glow group flex items-start justify-between gap-4 rounded-sm py-5"
                  >
                    <span>
                      <span className="block text-[16px] font-medium text-n-800 transition-colors duration-150 group-hover:text-brand-secondary">
                        {useCase.name}
                      </span>
                      <span className="mt-1 block text-[14px] leading-[1.6] text-n-600">
                        {useCase.solution}
                      </span>
                    </span>
                    <Icon
                      name="arrowUpRight"
                      className="mt-1 h-4 w-4 shrink-0 text-n-500 transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-secondary"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
