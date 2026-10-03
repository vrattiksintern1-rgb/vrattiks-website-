import Link from "next/link";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import type { Industry, UseCase } from "@/app/lib/content";

/* Who it's for: the industries and use cases this service fits, as two ruled
   lists. Industries link to their pages; use cases are plain text since the
   /use-cases route was removed (2026-10-03). */
export default function ServiceFit({
  industries,
  useCases,
  eyebrow = "Who it's for",
  title = "Where it works best",
}: {
  industries: Industry[];
  useCases: UseCase[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <Section tone="white" labelledBy="fit-heading">
      <Container>
        <SectionHeading
          id="fit-heading"
          eyebrow={eyebrow}
          title={title}
        />

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-12 md:grid-cols-2 md:gap-16">
          {industries.length > 0 ? (
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
          ) : null}

          <div>
            <h3 className="font-body text-label font-semibold tracking-[0.14em] uppercase text-n-600">
              Use cases
            </h3>
            <ul className="mt-4 border-t border-n-200">
              {useCases.map((useCase) => (
                <li key={useCase.slug} className="border-b border-n-200 py-5">
                  <span className="block text-[16px] font-medium text-n-800">
                    {useCase.name}
                  </span>
                  <span className="mt-1 block text-[14px] leading-[1.6] text-n-600">
                    {useCase.solution}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
