import Image from "next/image";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Section from "./ui/Section";

export default function CompanyIntro() {
  return (
    <Section tone="paper" labelledBy="company-heading">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-14">
        <div>
          <Eyebrow className="mb-5">Company</Eyebrow>
          {/* Not wrapped in Reveal: the page's H1 should be readable the
              instant it paints. */}
          <h1
            id="company-heading"
            className="max-w-[16ch] text-[clamp(30px,8vw,36px)] leading-[1.1] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[52px] lg:text-[clamp(44px,4.4vw,52px)]"
          >
            Your team focuses on customers. We handle the repetitive work.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-n-600">
            Vrattiks Intelligence is an AI automation company. We design and build
            voice agents, chatbots and workflow automation around the way your
            business already works, so enquiries get answered, follow-ups happen on
            time, and your people get their hours back.
          </p>
        </div>

        {/* Beside the copy from lg up, stacked below it on smaller screens.
            The box keeps the image's own 1536/1024 ratio so the text cards
            baked into its edges are never cropped. Side-by-side waits for lg
            because at md the column is too narrow for those cards to read.
            Above the fold, so no Reveal fade and preloaded — it's the likely LCP. */}
        <div className="relative aspect-[1536/1024] w-full overflow-hidden rounded-xl border border-n-200 bg-n-100">
          <Image
            src="/images/company/company-hero.avif"
            alt="Three Vrattiks team members smiling at a laptop together, beside cards reading Save time with AI Automation, Get accurate data and insights, Automate repetitive workflows, Scale your business faster, Smarter Automation and Better Teams"
            fill
            preload
            sizes="(min-width: 1440px) 740px, (min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </Section>
  );
}
