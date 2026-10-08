import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Icon from "./ui/Icon";
import Section from "./ui/Section";
import { useCases } from "@/app/lib/content";
import { useCaseDetails } from "@/app/lib/use-case-details";

/* The section's one idea: owners recognise their problem before they
   recognise our category name, so each of the three use-case cards leads
   with the symptom in the owner's own words and only then names the use
   case. The cards jump to that use case's article in UseCaseBreakdown below
   (each article carries the slug as its id). */
export default function UseCasesIntro() {
  return (
    <Section tone="paper" labelledBy="use-cases-heading">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-16">
        <div>
          <Eyebrow className="mb-5">Use Cases</Eyebrow>
          {/* Not wrapped in Reveal: the page's H1 should be readable the
              instant it paints (kylezantos-design §1b). */}
          <h1
            id="use-cases-heading"
            className="max-w-[16ch] text-[36px] leading-[1.1] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[52px]"
          >
            Start with the problem, not the technology
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-n-600">
            Most growing businesses lose time and customers in the same three
            places: following up on leads, answering customers, and knowing
            their own numbers. Pick the one that sounds most like yours.
          </p>
          <p className="mt-6 text-[14.5px] text-n-600">
            Prefer to start from your line of business?{" "}
            <Link
              href="/industries"
              className="focus-glow rounded-sm font-semibold text-brand-secondary underline-offset-4 hover:underline"
            >
              Browse by industry
            </Link>
          </p>
        </div>

        <nav aria-labelledby="use-cases-jump-label">
          <p
            id="use-cases-jump-label"
            className="font-body text-label font-semibold tracking-[0.14em] uppercase text-n-600"
          >
            Which sounds like your business?
          </p>
          <ul className="mt-4 space-y-3">
            {useCases.map((useCase) => {
              const detail = useCaseDetails[useCase.slug];
              if (!detail) return null;
              return (
                <li key={useCase.slug}>
                  <Link
                    href={`#${useCase.slug}`}
                    className="focus-glow group flex items-start gap-4 rounded-lg border border-n-200 bg-n-0 p-5 transition-[border-color,box-shadow] duration-150 hover:border-brand-primary/60 hover:shadow-[var(--shadow-glow)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-n-50 text-brand-secondary">
                      <Icon name={useCase.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[17px] leading-[1.35] font-display font-semibold text-n-900">
                        “{detail.symptom}”
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-secondary">
                        {useCase.name}
                        <Icon
                          name="chevronDown"
                          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-y-0.5"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
