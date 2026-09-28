import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import { pipelineStages } from "@/app/lib/content";

/**
 * The automation pipeline: lead in → copy → creative → log → send.
 *
 * Structure: vertical timeline up to 1024px, horizontal rail at `lg` and above
 * (ui-ux-pro-max §1, "Process / how it works"). NOT four identical cards that
 * happen to say Step 1–4 — that anti-pattern is named in the same table.
 *
 * THE ONE IDEA: the accent is a single continuous gradient hairline running
 * through every stage, and nothing else in the section is accented. That is
 * the Stripe move from CLAUDE.md reference 1 — accent confined to an edge or
 * thin band, never a whole surface — so the pipeline reads as one connected
 * run rather than five separate tiles. The previous version of this section
 * gave each of five steps its own gradient-filled circle: five gradient
 * surfaces in a viewport where the budget is one.
 *
 * ⚠ CONNECTOR GEOMETRY IS DERIVED, NOT EYEBALLED. The icon disc is 44px
 * (`h-11 w-11`) and the desktop grid gap is 20px (`lg:gap-5`). So the next
 * disc's left edge sits 20px past this column's right edge:
 *   - horizontal rail: `lg:left-11` (44px, the disc's right edge) to
 *     `lg:-right-5` (20px, the gap)
 *   - vertical rail: `left-[21px]` is the disc's horizontal centre (22px) less
 *     half the 2px rail width
 * If `lg:gap-5` or `h-11` ever changes, both offsets must change with them.
 *
 * The rail is rendered per stage and skipped on the last one, so it ends
 * exactly where the pipeline does rather than drawing a sixth stage that
 * doesn't exist.
 */
export default function Pipeline() {
  return (
    <Section id="pipeline" tone="tint" labelledBy="pipeline-heading">
      <Container>
        <SectionHeading
          id="pipeline-heading"
          eyebrow="How it works"
          title="What happens between a lead arriving and an email landing"
          description="Five stages, no handoffs. Once it is wired up, nobody on your team touches any of it."
        />

        <ol className="mt-16 grid grid-cols-1 gap-0 md:mt-20 lg:grid-cols-5 lg:gap-5">
          {pipelineStages.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.title}
              /* 60ms stagger across 5 items — at the kylezantos-design §1
                 ceiling for both duration and count. Do not extend this list
                 past 6 stages without dropping the stagger. */
              delay={i * 0.06}
              className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0"
            >
              {i < pipelineStages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="bg-brand-gradient absolute top-11 bottom-0 left-[21px] w-0.5 rounded-full opacity-30 lg:top-[21px] lg:-right-5 lg:bottom-auto lg:left-11 lg:h-0.5 lg:w-auto"
                />
              ) : null}

              <span
                aria-hidden="true"
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-n-200 bg-n-0 text-brand-secondary shadow-[var(--shadow-sm)]"
              >
                <Icon name={stage.icon} className="h-5 w-5" />
              </span>

              <div className="min-w-0 lg:mt-7">
                <span className="flex items-center gap-2.5 font-mono text-micro tracking-[0.14em] text-brand-secondary uppercase">
                  {/* The numeral is the ordering device the icons only
                      decorate — keep it even though the icons differ. */}
                  {/* n-600, not n-400: n-400 on the n-50 tint measures
                      2.63:1 against a 4.5:1 bar for 11.5px text. */}
                  <span className="tabular-nums text-n-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {stage.kicker}
                </span>
                <h3 className="mt-2.5 font-display text-body-lg leading-snug font-semibold text-n-900 text-balance">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-[34ch] text-caption leading-normal text-n-600">
                  {stage.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Closing statement, separated by a generous gap and a fading rule.
            The uneven spacing is what makes the five stages read as one group
            and this as the conclusion drawn from them (ui-ux-pro-max §4). */}
        <Reveal className="mt-16 md:mt-20">
          <div className="rule-fade" aria-hidden="true" />
          <p className="mt-8 max-w-3xl font-display text-[clamp(20px,2.4vw,26px)] leading-snug font-semibold text-n-900 text-balance">
            The whole run finishes before anyone on your team has opened their
            inbox.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
