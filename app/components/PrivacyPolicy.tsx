import { Fragment } from "react";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Section from "./ui/Section";
import HeroParticles from "./HeroParticles";
import {
  privacyPolicy,
  privacyPolicyMeta as meta,
  type PolicyBlock,
} from "@/app/lib/privacyPolicy";

const linkClass =
  "focus-glow rounded-sm font-medium break-words text-brand-secondary underline decoration-brand-secondary/30 underline-offset-2 transition-colors duration-150 hover:decoration-brand-secondary";

/* Emails, http(s) URLs and bare www. hosts. The final character class keeps
   sentence punctuation ("…data-deletion.") out of the link. */
const linkPattern =
  /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/[^\s]*[^\s.,)]|www\.[^\s]*[^\s.,)])/g;

function Linkified({ text }: { text: string }) {
  const parts = text.split(linkPattern);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        const external = !part.includes("@");
        const href = part.includes("@")
          ? `mailto:${part}`
          : part.startsWith("http")
            ? part
            : `https://${part}`;
        return (
          <a
            key={i}
            href={href}
            className={linkClass}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {part}
          </a>
        );
      })}
    </>
  );
}

function Block({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Linkified text={block.text} />
        </p>
      );
    case "h3":
      return (
        <h3 className="pt-4 font-display text-[19px] leading-[1.3] font-bold text-n-900">
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-2.5 pl-1">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-brand-secondary"
              />
              <span>
                <Linkified text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "terms":
      return (
        <ul className="flex flex-col gap-3 border-l border-n-200 pl-5">
          {block.items.map((item) => (
            <li key={item.term}>
              <strong className="font-semibold text-n-900">{item.term}</strong>
              {block.sep === "—" ? " — " : ": "}
              <Linkified text={item.text} />
            </li>
          ))}
        </ul>
      );
    case "fields":
      return (
        <dl className="divide-y divide-n-100 rounded-md border border-n-200 bg-n-0">
          {block.items.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6"
            >
              <dt className="text-[14px] font-semibold text-n-600">{item.label}</dt>
              <dd className="text-n-900">
                {(Array.isArray(item.value) ? item.value : [item.value]).map((line) => (
                  <span key={line} className="block">
                    <Linkified text={line} />
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      );
    case "note":
      return (
        <div className="rounded-md border-l-2 border-brand-secondary bg-n-50 px-5 py-4">
          <strong className="font-semibold text-n-900">{block.label}:</strong>{" "}
          <Linkified text={block.text} />
        </div>
      );
  }
}

function Contents({ className = "" }: { className?: string }) {
  return (
    <ol className={`flex flex-col gap-1 text-[14px] ${className}`}>
      {privacyPolicy.map((section, i) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="focus-glow flex gap-3 rounded-sm py-1 text-n-600 transition-colors duration-150 hover:text-brand-secondary"
          >
            <span className="w-5 shrink-0 text-right tabular-nums text-n-500">{i + 1}.</span>
            <span>{section.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/* Privacy Policy. The one idea: it reads as a document, not a marketing page —
   a numbered contents rail stays pinned beside the text on desktop so any of
   the 19 sections is one click away, and nothing else competes with the copy.
   No gradient surface. The shared particle backdrop sits behind the header
   only, fading out before the policy text so it never moves under the copy. */
export default function PrivacyPolicy() {
  return (
    <Section tone="paper" labelledBy="privacy-heading">
      <HeroParticles className="absolute inset-x-0 top-0 h-[360px] w-full md:h-[440px] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      <Container>
        <header className="max-w-3xl">
          <Eyebrow className="mb-5">Legal</Eyebrow>
          <h1
            id="privacy-heading"
            className="font-display text-[36px] leading-[1.08] font-bold tracking-[-0.02em] text-n-900 md:text-[52px]"
          >
            Privacy Policy
          </h1>
          <p className="mt-5 text-[15px] text-n-600">
            Effective Date: {meta.effectiveDate}
            <span aria-hidden="true" className="mx-2 text-n-300">|</span>
            Last Updated: {meta.lastUpdated}
            <span aria-hidden="true" className="mx-2 text-n-300">|</span>
            Version {meta.version}
          </p>
          <p className="mt-1 text-[15px] font-semibold text-n-800">{meta.entity}</p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-n-200 pt-10 lg:mt-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Privacy Policy contents" className="hidden lg:block">
            <div className="sticky top-28">
              <h2 className="mb-4 font-body text-label font-semibold uppercase tracking-[0.06em] text-n-600">
                Contents
              </h2>
              <Contents />
            </div>
          </nav>

          <details className="rounded-md border border-n-200 bg-n-0 lg:hidden">
            <summary className="focus-glow cursor-pointer rounded-md px-5 py-4 font-body text-label font-semibold uppercase tracking-[0.06em] text-n-700">
              Contents
            </summary>
            <nav aria-label="Privacy Policy contents" className="px-5 pb-4">
              <Contents />
            </nav>
          </details>

          <article className="max-w-[72ch] text-body text-n-700">
            {privacyPolicy.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-28 border-b border-n-200 py-10 first:pt-0 last:border-b-0"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="flex gap-3 font-display text-h3 font-bold text-n-900"
                >
                  <span className="tabular-nums text-brand-secondary">{i + 1}.</span>
                  <span>{section.title}</span>
                </h2>
                <div className="mt-5 flex flex-col gap-4">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}

            <footer className="mt-4 border-t border-n-200 pt-8 text-[14px] text-n-600">
              <p>{meta.copyright}</p>
              <p className="mt-1 font-semibold text-n-800">{meta.tagline}</p>
            </footer>
          </article>
        </div>
      </Container>
    </Section>
  );
}
