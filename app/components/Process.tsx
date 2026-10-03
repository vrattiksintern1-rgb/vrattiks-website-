"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Icon, { type IconName } from "./ui/Icon";

const steps: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "search",
    title: "Discover",
    description: "We map how your business runs today — where time goes and where leads drop off.",
  },
  {
    icon: "layout",
    title: "Design",
    description: "We design the AI and automation workflows around your actual process.",
  },
  {
    icon: "workflow",
    title: "Build & Automate",
    description: "We build and connect the voice agents, chatbots, and workflows.",
  },
  {
    icon: "rocket",
    title: "Launch",
    description: "We roll it out, test it against real conversations, and refine it.",
  },
  {
    icon: "lifeBuoy",
    title: "Support",
    description: "We monitor and improve the system as your business grows.",
  },
];

/* Scroll distance each step gets while the stepper is pinned, in svh. */
const STEP_SCROLL = 60;

export default function Process({ headingId }: { headingId?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  /* Scroll-driven, one step at a time: the track is taller than the viewport
     and the stepper inside it is sticky, so scrolling through the track walks
     Discover → Support in order. Native scroll only — nothing is hijacked;
     the scroll position just picks which step is shown. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length))));
  });

  /* Clicking a node scrolls to the middle of that step's scroll band, so the
     page position and the shown step never disagree. */
  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const distance = track.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (distance * (i + 0.5)) / steps.length,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const step = steps[active];

  return (
    <section aria-labelledby={headingId} className="py-10 md:py-16">
      {/* No overflow on any ancestor — `overflow-hidden` would kill sticky.
          The heading pins with the stepper so the two read as one unit; the
          whole panel is sized to fit a 548px-tall phone viewport (iPhone SE
          svh) under the 64px header. */}
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${steps.length * STEP_SCROLL + 50}svh` }}
      >
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center md:top-20 md:h-[calc(100svh-5rem)]">
          <Container className="w-full">
            <SectionHeading
              id={headingId}
              eyebrow="Process"
              title="How we work"
              description="A clear path from where you are today to a business that runs on automation."
            />

            {/* Rail: one gradient fill (the section's only gradient, confined
                to a 2px band) grows node by node over a hairline track. */}
            <div className="relative mt-8 md:mt-12">
              <span
                aria-hidden="true"
                className="absolute top-[17px] right-[10%] left-[10%] h-0.5 bg-n-200"
              />
              <span
                aria-hidden="true"
                className="bg-brand-gradient absolute top-[17px] right-[10%] left-[10%] h-0.5 origin-left transition-transform duration-300 ease-out"
                style={{ transform: `scaleX(${active / (steps.length - 1)})` }}
              />
              <ol className="relative grid grid-cols-5">
                {steps.map((s, i) => {
                  const state = i < active ? "done" : i === active ? "active" : "next";
                  return (
                    <li
                      key={s.title}
                      aria-current={state === "active" ? "step" : undefined}
                      className="flex flex-col items-center text-center"
                    >
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Show step ${i + 1}: ${s.title}`}
                        className={`focus-glow relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 font-body text-[12px] font-semibold transition-colors duration-150 ${
                          state === "active"
                            ? "border-brand-secondary bg-brand-secondary text-n-0"
                            : state === "done"
                              ? "border-brand-secondary bg-n-25 text-brand-secondary"
                              : "border-n-300 bg-n-25 text-n-500 hover:border-brand-secondary"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </button>
                      <h3
                        className={`sr-only mt-3 px-1 text-[15px] leading-[1.3] font-display font-semibold transition-colors duration-150 md:not-sr-only ${
                          state === "next" ? "text-n-500" : "text-n-900"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p className="sr-only">{s.description}</p>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Visual detail for the current step only. The same text is in
                the list above for assistive tech, so this is aria-hidden. */}
            <div
              aria-hidden="true"
              className="mx-auto mt-6 grid min-h-[172px] max-w-3xl overflow-hidden rounded-md border border-n-200 bg-n-0 md:mt-10 md:min-h-[200px]"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
                  className="flex items-start gap-10 p-5 md:p-10"
                >
                  {/* Big numeral md+ only — on phones the filled rail node
                      and the "Step N of 5" label already carry it. */}
                  <span className="hidden font-display text-[64px] leading-none font-bold tracking-[-0.03em] text-brand-secondary md:block">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="block font-body text-label font-semibold text-n-500 uppercase">
                      Step {active + 1} of {steps.length}
                    </span>
                    <p className="mt-2 flex items-center gap-2 font-display text-[22px] leading-[1.25] font-semibold text-n-900 md:text-[26px]">
                      <Icon name={step.icon} className="h-5 w-5 shrink-0 text-n-500" />
                      {step.title}
                    </p>
                    <p className="mt-3 max-w-[460px] text-body text-n-600">{step.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
