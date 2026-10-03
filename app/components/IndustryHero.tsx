import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Section from "./ui/Section";
import HeroParticles from "./HeroParticles";
import type { Industry } from "@/app/lib/content";

/* Industry detail hero — same structure as ServiceHero so the two detail
   templates read as one family. The breadcrumb is the link back to
   /industries (vrattiks-architecture §5). */
export default function IndustryHero({
  industry,
  headline,
  intro,
}: {
  industry: Industry;
  headline: string;
  intro: string;
}) {
  return (
    <Section tone="paper" labelledBy="industry-heading">
      <HeroParticles />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 md:mb-14">
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-n-600">
            <li>
              <Link
                href="/industries"
                className="focus-glow rounded-sm transition-colors duration-150 hover:text-brand-secondary"
              >
                Industries
              </Link>
            </li>
            <li aria-hidden="true" className="text-n-500">
              /
            </li>
            <li aria-current="page" className="font-medium text-n-800">
              {industry.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 min-[768px]:grid-cols-2 min-[768px]:items-start min-[768px]:gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-16">
          <div>
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-n-200 bg-n-0 text-brand-secondary">
              <Icon name={industry.icon} className="h-6 w-6" />
            </span>
            {/* Not wrapped in Reveal: the H1 should be readable the instant it
                paints (kylezantos-design §1b). */}
            <h1
              id="industry-heading"
              className="mt-6 text-[40px] leading-[1.05] tracking-[-0.03em] font-display font-semibold text-n-900 md:text-[60px]"
            >
              {industry.name}
            </h1>
            <p className="mt-5 max-w-[24ch] text-[22px] leading-[1.3] font-display font-semibold text-n-700 md:text-[26px]">
              {headline}
            </p>
            <p className="mt-6 text-body-lg text-n-600">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Book a Free Consultation</Button>
              <Button href="#how-it-works" variant="ghost">
                See how we help
              </Button>
            </div>
          </div>

          <div>
            {/* Above the fold, so it loads eagerly. Decorative (alt=""): the
                H1 already names the industry. */}
            <span className="relative block aspect-[3/2] w-full overflow-hidden rounded-lg bg-n-50">
              <Image
                src={industry.image}
                alt=""
                fill
                quality={90}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 901px) 40vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
