import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

/* The problem this service solves: sticky heading beside a numbered, ruled
   list. `overflow-x-clip` on Section keeps the sticky column working. */
export default function ServiceProblems({
  serviceName,
  problems,
}: {
  serviceName: string;
  problems: { title: string; text: string }[];
}) {
  return (
    <Section tone="white" labelledBy="problems-heading">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading
            id="problems-heading"
            eyebrow="The problem"
            title="Where things slip today"
            description={`The everyday gaps ${serviceName} is built to close.`}
          />
        </div>

        <ol className="border-t border-n-200">
          {problems.map((problem, i) => (
            <Reveal
              as="li"
              key={problem.title}
              delay={i * 0.06}
              className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 border-b border-n-200 py-7 md:grid-cols-[56px_minmax(0,1fr)] md:py-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-[26px] leading-none font-semibold text-n-500 md:text-[30px]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[19px] leading-[1.3] font-display font-semibold text-n-900 md:text-[21px]">
                  {problem.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-[1.6] text-n-600">{problem.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
