import Link from "next/link";
import Container from "./ui/Container";
import Section from "./ui/Section";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { industries } from "@/app/lib/content";

/**
 * Structure: asymmetric split — framing left, compact index right.
 *
 * The first pass made this a ruled two-column list, which put it immediately
 * after the Use Cases matrix as a second run of hairline rows (taste-skill §4:
 * no two consecutive sections share a structure). The rows are now unruled
 * blocks that tint on hover, framed by a sticky left column — so it reads as
 * an index, not a table, and doesn't echo the section above it.
 */
export default function Industries() {
  return (
    <Section id="industries" tone="white" labelledBy="industries-heading">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-20">
        <Reveal className="md:sticky md:top-28">
          <Eyebrow>Industries</Eyebrow>
          <h2
            id="industries-heading"
            className="mt-5 font-display text-[clamp(28px,3.4vw,40px)] leading-heading font-bold tracking-[-0.025em] text-n-900 text-balance"
          >
            Built to adapt to how your industry works
          </h2>
          <p className="mt-5 max-w-[46ch] text-body leading-relaxed text-n-500">
            The same automation foundation, applied to what matters most in your
            industry.
          </p>
          <div className="mt-8">
            <Button href="/industries" variant="outline">
              All industries
            </Button>
          </div>
        </Reveal>

        <ul className="-mx-4 flex flex-col">
          {industries.map((industry, i) => (
            <Reveal as="li" key={industry.slug} delay={i * 0.05}>
              <Link
                href={`/industries/${industry.slug}`}
                className="focus-glow group flex items-start justify-between gap-6 rounded-md px-4 py-4 transition-colors duration-150 hover:bg-n-50 md:py-5"
              >
                <span className="min-w-0">
                  <span className="block font-display text-body-lg font-semibold text-n-900 transition-colors duration-150 group-hover:text-brand-secondary">
                    {industry.name}
                  </span>
                  <span className="mt-1 block max-w-[46ch] text-ui leading-normal text-n-500">
                    {industry.application}
                  </span>
                </span>
                <Icon
                  name="arrowUpRight"
                  className="mt-1 h-4 w-4 shrink-0 text-n-300 opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-secondary group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
