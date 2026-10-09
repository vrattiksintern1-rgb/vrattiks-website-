import Link from "next/link";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { services, useCases } from "@/app/lib/content";
import { serviceDetails } from "@/app/lib/service-details";
import { useCaseDetails } from "@/app/lib/use-case-details";

/* Problem → Solution → Benefit for each use case (vrattiks-architecture §2).
   One article per use case, ruled apart rather than carded. Benefit is the
   emphasised block, marked by ONE device only: a brand-primary left edge
   (CLAUDE.md Design Taste, reference 1).

   "Services that do this" is derived from each service's `useCases` list in
   service-details.ts, and links to the live /services/{slug} pages
   (vrattiks-architecture §5). */
const servicesFor = (slug: string) =>
  services.filter((service) => serviceDetails[service.slug]?.useCases.includes(slug));

const subheading = "font-body text-label font-semibold tracking-[0.14em] uppercase";

export default function UseCaseBreakdown() {
  return (
    <Section tone="white" labelledBy="breakdown-heading">
      <Container>
        <SectionHeading
          id="breakdown-heading"
          eyebrow="Problem → Solution → Benefit"
          title="What changes, one use case at a time"
        />

        <div className="mt-10 md:mt-12">
          {useCases.map((useCase, i) => {
            const detail = useCaseDetails[useCase.slug];
            if (!detail) return null;
            const related = servicesFor(useCase.slug);

            return (
              <article
                key={useCase.slug}
                id={useCase.slug}
                aria-labelledby={`${useCase.slug}-title`}
                className="scroll-mt-20 border-t md:scroll-mt-24 border-n-200 py-7 first:pt-6 md:py-9"
              >
                <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
                  <header>
                    <span aria-hidden="true" className="font-body text-label font-semibold tracking-[0.14em] text-n-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      id={`${useCase.slug}-title`}
                      className="mt-3 text-[28px] leading-[1.15] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[32px]"
                    >
                      {useCase.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-[1.6] text-n-600">{useCase.solution}</p>

                    {related.length > 0 ? (
                      <>
                        <p className={`mt-8 ${subheading} text-n-600`}>Services that do this</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {related.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                className="focus-glow inline-flex items-center rounded-full border border-n-200 px-3 py-1.5 text-[13px] font-medium text-n-800 transition-[border-color,color] duration-150 hover:border-brand-primary hover:text-brand-secondary"
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </header>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h4 className={`${subheading} text-n-600`}>The problem</h4>
                      <ul className="mt-4 space-y-3">
                        {detail.problems.map((problem) => (
                          <li key={problem} className="flex gap-3 text-[15px] leading-[1.6] text-n-700">
                            <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-n-400" />
                            {problem}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={`${subheading} text-n-600`}>What we automate</h4>
                      <ol className="mt-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        {detail.steps.map((step, s) => (
                          <li key={step.title} className="border-t border-n-200 pt-4">
                            <p className="flex items-baseline gap-2.5">
                              <span aria-hidden="true" className="font-body text-[12px] font-semibold text-n-500">
                                {String(s + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[17px] font-display font-semibold text-n-900">{step.title}</span>
                            </p>
                            <p className="mt-1.5 text-[14.5px] leading-[1.6] text-n-600">{step.text}</p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="border-l-2 border-brand-primary pl-5 md:pl-6">
                      <h4 className={`${subheading} text-brand-secondary`}>What changes</h4>
                      <ul className="mt-4 space-y-3">
                        {detail.benefits.map((benefit) => (
                          <li key={benefit} className="flex gap-3 text-[15.5px] leading-[1.55] font-medium text-n-800">
                            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand-secondary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
