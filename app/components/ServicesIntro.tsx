import Image from "next/image";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import { services } from "@/app/lib/content";

/* The section's one idea: the six services aren't a menu, they're three jobs
   in one customer journey. The grouping is ours; the service names come from
   content.ts. Items are plain text, not links — the card grid directly below
   carries the links, so repeating them here would double every tab stop. */
const byName = (slug: string) =>
  services.find((s) => s.slug === slug)?.name ?? slug;

const stages = [
  {
    step: "01",
    title: "Answer every enquiry",
    detail: "Calls, chats and messages get a reply at any hour.",
    slugs: ["ai-voice-agent", "ai-chatbot", "whatsapp-automation", "website-development"],
  },
  {
    step: "02",
    title: "Keep track of every lead",
    detail: "Each customer and conversation lands in one place.",
    slugs: ["crm"],
  },
  {
    step: "03",
    title: "Follow through on time",
    detail: "Reminders, updates and hand-offs run without anyone chasing.",
    slugs: ["workflow-automation"],
  },
];

export default function ServicesIntro() {
  return (
    <Section tone="paper" labelledBy="services-heading">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center md:gap-16">
          <div>
            <Eyebrow className="mb-5">Services</Eyebrow>
            {/* Not wrapped in Reveal: the page's H1 should be readable the
                instant it paints (kylezantos-design §1b). */}
            <h1
              id="services-heading"
              className="max-w-[16ch] text-[36px] leading-[1.1] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[52px]"
            >
              Automation that fits the way you already work
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-n-600">
              Start with the one problem costing you the most — missed calls, slow
              replies, leads nobody followed up. Each service works on its own, and
              they connect when you&apos;re ready for more.
            </p>
          </div>

          {/* Above the fold, so no Reveal fade and preloaded — it's the likely LCP.
              Same treatment as CompanyIntro's image. */}
          <div className="relative aspect-[1176/1338] w-full max-w-md overflow-hidden rounded-xl border border-n-200 bg-n-50 md:justify-self-end">
            <Image
              src="/images/services/connected-services-dashboard.png"
              alt="Laptop showing a business dashboard, with connected app windows passing information into it"
              fill
              preload
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* The page's one non-white surface (CLAUDE.md Design Taste, ref 2):
            muted n-200/n-300 text, n-0/10 hairlines, no pure-white body copy. */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-lg bg-brand-graphite p-6 shadow-[var(--shadow-soft)] md:mt-12 md:p-8">
            <p className="font-body text-label font-semibold tracking-[0.14em] uppercase text-brand-primary">
              How they fit together
            </p>
            <ol className="mt-5 md:grid md:grid-cols-3 md:gap-x-8">
              {stages.map((stage) => (
                <li
                  key={stage.step}
                  className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 border-t border-n-0/10 py-5 last:pb-0 md:pb-0"
                >
                  <span aria-hidden="true" className="pt-0.5 font-body text-[12px] font-semibold text-n-300">
                    {stage.step}
                  </span>
                  <div>
                    <p className="text-[17px] leading-[1.3] font-display font-semibold text-n-0">
                      {stage.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-[1.6] text-n-300">{stage.detail}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {stage.slugs.map((slug) => (
                        <li
                          key={slug}
                          className="rounded-full border border-n-0/10 px-3 py-1 text-[12.5px] font-medium text-n-200"
                        >
                          {byName(slug)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
