import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import { integrations } from "@/app/lib/content";

/**
 * Trust strip — the thin band directly under the hero.
 *
 * THE ONE IDEA: it is the only band on the page that deliberately breaks the
 * vertical rhythm. Every other section runs the Section component's 64/80/112
 * padding; this one is a ~72px sliver. That compression is what makes it read
 * as a credential line rather than as another section, and it gives the eye a
 * beat between the hero and the first real content block (ui-ux-pro-max §4:
 * grouping comes from uneven spacing).
 *
 * WHY THERE ARE NO LOGOS HERE. ui-ux-pro-max §5 names "logo walls of clients
 * you don't have" as a credibility anti-pattern, and vrattiks-standards §3
 * forbids inventing them outright. No client engagement is published in this
 * repo, so the proof device is the honest one available: the legal entity, the
 * support geography, and the tools the workflows are actually built on. All
 * three are things an Indian operations buyer checks for (ui-ux-pro-max §5,
 * "Western-only trust signals").
 *
 * ⚠ Do not "fill this out" with grayscale client logos later unless those
 * clients are real and have agreed to be named.
 *
 * Not a landmark: it has no heading, so it renders as a plain <div> rather
 * than an unnamed <section> (vrattiks-accessibility, "ARIA only when needed" —
 * an unnamed landmark is worse than none).
 *
 * Surface is n-0 pure white against the hero's n-25, so the strip reads as a
 * raised plane. That is value contrast doing hierarchy work without spending
 * any accent (ui-ux-pro-max §2).
 */
export default function TrustStrip() {
  return (
    <div className="border-y border-n-100 bg-n-0">
      <Container>
        <Reveal className="flex flex-col gap-6 py-7 md:flex-row md:items-center md:justify-between md:gap-10 md:py-8">
          {/* Both facts here are confirmed: the LLP name is the registered
              entity already used in the footer and the Organization JSON-LD,
              and en_IN / India support is the repo's stated market. Nothing
              here is a claim we cannot stand behind. */}
          {/* No `shrink-0`: at 901–1040px the two halves are tight, and a
              non-shrinking 40ch block would push the integration list into an
              overflow rather than wrapping. */}
          <p className="max-w-[40ch] text-ui leading-normal text-n-600">
            <span className="font-semibold text-n-900">
              Vrattiks Intelligence LLP
            </span>{" "}
            — automation built and supported from India.
          </p>

          <div className="flex flex-col gap-3 md:items-end">
            <span
              id="integrations-label"
              className="font-mono text-micro tracking-[0.14em] text-n-500 uppercase"
            >
              Workflows run on
            </span>
            {/* A real list, labelled by the visible mono line above it, so a
                screen reader announces "Workflows run on, list, 6 items"
                rather than six orphaned words. */}
            <ul
              aria-labelledby="integrations-label"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end"
            >
              {integrations.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-2.5 text-caption font-medium whitespace-nowrap text-n-700"
                >
                  <span
                    aria-hidden="true"
                    className="bg-brand-primary/60 h-1 w-1 shrink-0 rounded-full"
                  />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
