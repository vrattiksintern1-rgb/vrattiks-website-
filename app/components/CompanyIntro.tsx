import Image from "next/image";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Section from "./ui/Section";

export default function CompanyIntro() {
  return (
    <Section tone="paper" labelledBy="company-heading">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center md:gap-16">
        <div>
          <Eyebrow className="mb-5">Company</Eyebrow>
          {/* Not wrapped in Reveal: the page's H1 should be readable the
              instant it paints. */}
          <h1
            id="company-heading"
            className="max-w-[16ch] text-[36px] leading-[1.1] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[52px]"
          >
            Your team focuses on customers. We handle the repetitive work.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-n-600">
            Vrattiks Intelligence is an AI automation company. We design and build
            voice agents, chatbots and workflow automation around the way your
            business already works — so enquiries get answered, follow-ups happen on
            time, and your people get their hours back.
          </p>
        </div>

        {/* Above the fold, so no Reveal fade and preloaded — it's the likely LCP. */}
        <div className="relative aspect-[1178/1335] w-full max-w-md overflow-hidden rounded-xl border border-n-200 bg-n-900 md:justify-self-end">
          <Image
            src="/images/company/ai-business-intelligence.png"
            alt="A business owner's hand beneath a glowing AI brain linked to sales charts, with a dashboard tablet on the desk"
            fill
            preload
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </Section>
  );
}
