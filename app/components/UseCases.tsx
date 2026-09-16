import Link from "next/link";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import { useCases } from "@/app/lib/content";

const rows = [
  { key: "problem" as const, label: "Problem" },
  { key: "solution" as const, label: "Solution" },
  { key: "benefit" as const, label: "Benefit" },
];

export default function UseCases() {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Use Cases"
          title="Common business problems, solved end-to-end"
          description="Real situations most growing businesses run into — and how automation changes the outcome."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 sm:grid-cols-2 md:grid-cols-3">
          {useCases.map((useCase, i) => (
            <Reveal key={useCase.slug} delay={i * 0.1}>
              <Link
                href={`/use-cases/${useCase.slug}`}
                className="focus-glow group flex h-full flex-col rounded-lg border border-n-100 bg-n-0 p-6 shadow-[var(--shadow-sm)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                <span className="bg-brand-gradient-soft flex h-11 w-11 items-center justify-center rounded-md text-brand-secondary">
                  <Icon name={useCase.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 text-[16px] font-display font-semibold text-n-900">
                  {useCase.name}
                </h3>

                <dl className="mt-5 flex flex-1 flex-col gap-3.5 border-t border-n-50 pt-5">
                  {rows.map((row) => (
                    <div key={row.key}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-n-400">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-[13.5px] leading-[1.5] text-n-700">
                        {useCase[row.key]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-secondary">
                  See how it works
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
