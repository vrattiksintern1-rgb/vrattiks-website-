"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MotionConfig, motion, useInView } from "framer-motion";
import Icon, { type IconName } from "./ui/Icon";

/* Hero visual: a code console that walks a visitor through Vrattiks in four
   steps: welcome → services → possibilities → "the new world of Vrattiks AI".

   The snippets are display copy, not a real SDK. Lines are kept <= 40 chars so
   nothing wraps from 375px up (below that, lines wrap instead of scrolling).

   Motion
   - One timeline: `frames` is precomputed (every keystroke, result hold and
     transition is a frame with its own delay), and the component only steps an
     index through it. Render is a pure function of that frame.
   - It LOOPS, at the user's request (2026-10-10). This is a deliberate exception
     to kylezantos-design §1b, like HeroParticles. Mitigations: it only runs while
     on screen and reduced-motion users get the finished last step, static.
     The pause button was replaced by a "Writing…" label at the user's request
     (2026-10-10), so WCAG 2.2.2 (pause for motion over 5s) is knowingly unmet.
   - SSR, no-JS and reduced motion all render the final frame.

   Size: every step is also rendered invisibly in the same grid cell, so the
   pane is always as tall as its tallest step and never shifts while typing.

   Colour: one extra hue, a cyan for function names, is scoped to this card as
   --code-cyan. Syntax highlighting needs more hues than the brand ramp has, and
   the code already uses the system monospace stack as its one exception (see
   memory.md, 2026-10-03). */

type Tone =
  | "plain" | "keyword" | "fn" | "brand" | "prop"
  | "string" | "message" | "action" | "punct" | "comment";
type Token = [Tone, string];

const toneClass: Record<Tone, string> = {
  plain: "text-n-100",
  keyword: "text-brand-primary",
  fn: "text-(--code-cyan)",
  brand: "font-semibold text-n-0",
  prop: "text-n-300",
  string: "text-sem-success",
  message: "font-semibold text-sem-success",
  action: "text-sem-warning",
  punct: "text-n-400",
  comment: "italic text-n-400",
};

/* Service names match app/lib/content.ts. */
const steps: { label: string; lines: Token[][] }[] = [
  {
    label: "Welcome",
    lines: [
      [["comment", "// Initializing something extraordinary…"]],
      [["keyword", "const "], ["plain", "experience "], ["punct", "="]],
      [["keyword", "  await "], ["brand", "Vrattiks"], ["punct", "."], ["fn", "initialize"], ["punct", "();"]],
      [],
      [["plain", "experience"], ["punct", "."], ["fn", "welcome"], ["punct", "({"]],
      [["prop", "  message"], ["punct", ": "], ["message", '"Hi, welcome to Vrattiks!"'], ["punct", ","]],
      [["prop", "  mission"], ["punct", ": "], ["string", "`We turn complex workflows"]],
      [["string", "    into intelligent automation.`"]],
      [["punct", "});"]],
    ],
  },
  {
    label: "Services",
    lines: [
      [["comment", "// What AI can do for your business"]],
      [["keyword", "await "], ["plain", "experience"], ["punct", "."], ["fn", "nextStep"], ["punct", "({"]],
      [["prop", "  action"], ["punct", ": "], ["action", '"explore_services"'], ["punct", ","]],
      [["prop", "  services"], ["punct", ": ["]],
      [["message", '    "AI Voice Agent"'], ["punct", ","]],
      [["message", '    "AI Chatbot"'], ["punct", ","]],
      [["message", '    "Workflow Automation"'], ["punct", ","]],
      [["message", '    "WhatsApp Automation"'], ["punct", ","]],
      [["punct", "  ],"]],
      [["punct", "});"]],
    ],
  },
  {
    label: "Discover",
    lines: [
      [["comment", "// Turning possibilities into solutions"]],
      [["keyword", "await "], ["plain", "experience"], ["punct", "."], ["fn", "nextStep"], ["punct", "({"]],
      [["prop", "  action"], ["punct", ": "], ["action", '"discover_possibilities"'], ["punct", ","]],
      [["prop", "  outcome"], ["punct", ": "], ["message", "`Less manual work."]],
      [["message", "    More intelligent growth.`"], ["punct", ","]],
      [["punct", "});"]],
    ],
  },
  {
    label: "Future",
    lines: [
      [["comment", "// A new era of business begins here"]],
      [["plain", "experience"], ["punct", "."], ["fn", "complete"], ["punct", "({"]],
      [["prop", "  message"], ["punct", ": "], ["message", "`Welcome to the new world"]],
      [["message", "    of Vrattiks AI.`"], ["punct", ","]],
      [["prop", "  future"], ["punct", ": "], ["string", "`Smarter systems."]],
      [["string", "    Seamless workflows."]],
      [["string", "    Limitless possibilities.`"], ["punct", ","]],
      [["punct", "});"]],
    ],
  },
];

const outcomes: { icon: IconName; text: string; tone: string }[] = [
  { icon: "clock", text: "Save time", tone: "text-brand-primary" },
  { icon: "repeat", text: "Automate repetitive tasks", tone: "text-(--code-cyan)" },
  { icon: "chat", text: "Reply to customers faster", tone: "text-sem-success" },
  { icon: "rocket", text: "Scale efficiently", tone: "text-sem-warning" },
];

/* ---- Typing geometry, per step -------------------------------------------
   Each line ends in one extra "character" (the newline) so the caret pauses
   there. Token start offsets are precomputed so render can slice by `typed`. */
const blocks = steps.map(({ lines }) => {
  const lengths = lines.map((line) => line.reduce((n, [, t]) => n + t.length, 0) + 1);
  const lineEnds = lengths.map((_, i) => lengths.slice(0, i + 1).reduce((a, b) => a + b, 0));
  const lineStarts = lineEnds.map((end, i) => end - lengths[i]);
  const tokenStarts = lines.map((line, li) =>
    line.map((_, ti) => lineStarts[li] + line.slice(0, ti).reduce((n, [, t]) => n + t.length, 0)),
  );
  const indents = lines.map((line) => {
    const text = line.map(([, t]) => t).join("");
    return text.length - text.trimStart().length;
  });
  return { lines, lineEnds, lineStarts, tokenStarts, indents, total: lineEnds[lineEnds.length - 1] };
});

/* ---- Timeline ------------------------------------------------------------ */
type Phase = "typing" | "result" | "leaving" | "reset";
type Frame = { step: number; typed: number; phase: Phase; ms: number };

const START_DELAY_MS = 700;
const CHAR_MS = 15; // average; ±6ms of deterministic jitter so it reads as typed
const LINE_PAUSE_MS = 120;
const SETTLE_MS = 380; // last keystroke → result appears
const HOLD_MS = [1600, 1900, 2600, 5200]; // result on screen, per step
const LEAVE_MS = 320; // step fades out
const NEXT_STEP_MS = 260; // empty pane → next step starts typing
const RESET_MS = 600; // whole pane fades before the loop restarts

const last = steps.length - 1;
const frames: Frame[] = [];
blocks.forEach((b, step) => {
  frames.push({ step, typed: 0, phase: "typing", ms: step === 0 ? START_DELAY_MS : NEXT_STEP_MS });
  let pos = 0;
  while (pos < b.total) {
    // Leading spaces are typed instantly, like an editor's auto-indent.
    const lineIndex = b.lineStarts.indexOf(pos);
    pos += 1 + (lineIndex === -1 ? 0 : b.indents[lineIndex]);
    const ms =
      pos >= b.total ? SETTLE_MS
      : b.lineEnds.includes(pos + 1) ? LINE_PAUSE_MS
      : CHAR_MS - 6 + ((pos * 7) % 5) * 3;
    frames.push({ step, typed: pos, phase: "typing", ms });
  }
  frames.push({ step, typed: b.total, phase: "result", ms: HOLD_MS[step] });
  frames.push(
    step === last
      ? { step, typed: b.total, phase: "reset", ms: RESET_MS }
      : { step, typed: b.total, phase: "leaving", ms: LEAVE_MS },
  );
});
const FINAL = frames.findIndex((f) => f.step === last && f.phase === "result");

/* ---- Reduced motion, read without a hydration mismatch ------------------- */
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduce = () => window.matchMedia(REDUCE_QUERY).matches;
const getServerReduce = () => true; // server renders the static final frame

const status = {
  init: { label: "Initializing", text: "text-sem-warning", dot: "bg-sem-warning" },
  processing: { label: "Processing", text: "text-(--code-cyan)", dot: "bg-(--code-cyan)" },
  complete: { label: "Complete", text: "text-sem-success", dot: "bg-sem-success" },
};

const mono = "[font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

export default function HeroVisual() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useSyncExternalStore(subscribeReduce, getReduce, getServerReduce);

  const running = !reduceMotion && inView;

  // Start on the finished last step so SSR, no-JS and reduced motion see it.
  const [index, setIndex] = useState(FINAL);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (!started) {
      // Clear the server-rendered frame on the next frame (the hero's Reveal is
      // still fading in then) and start from the top.
      const raf = requestAnimationFrame(() => {
        setStarted(true);
        setIndex(0);
      });
      return () => cancelAnimationFrame(raf);
    }
    const timer = setTimeout(() => setIndex((i) => (i + 1) % frames.length), frames[index].ms);
    return () => clearTimeout(timer);
  }, [running, started, index]);

  const frame = frames[index];
  const stepDone = frame.phase !== "typing";
  const state =
    frame.step === 0 && !stepDone ? status.init
    : frame.step === last && stepDone ? status.complete
    : status.processing;

  return (
    <MotionConfig reducedMotion="user">
      <figure
        ref={ref}
        className="relative w-full overflow-hidden rounded-lg bg-brand-graphite shadow-[var(--shadow-lg)] ring-1 ring-n-0/10 [--code-cyan:#7fd6f2]"
      >
        {/* Ambient glow + hairline grid. Decorative, static. */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-secondary/25 blur-3xl" />
        <div aria-hidden="true" className="bg-grid-fade-dark pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative flex items-center gap-4 border-b border-n-0/10 bg-n-0/[0.03] px-5 py-3 max-[359px]:gap-3 max-[359px]:px-4 sm:px-6">
          <span aria-hidden="true" className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-sem-error" />
            <span className="h-3 w-3 rounded-full bg-sem-warning" />
            <span className="h-3 w-3 rounded-full bg-sem-success" />
          </span>
          <span aria-hidden="true" className="whitespace-nowrap font-body text-[14px] text-n-300 max-[359px]:text-[13px]">
            Vrattiks AI World.js
          </span>
          {/* h-7 keeps the header the height it had with the old pause button. */}
          <span aria-hidden="true" className="ml-auto flex h-7 items-center gap-1.5 font-body text-[13px] text-n-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_var(--color-brand-primary)]" />
            Writing…
          </span>
        </div>

        <div
          role="img"
          aria-label="An animated console welcomes you to Vrattiks, lists our services (AI Voice Agent, AI Chatbot, Workflow Automation and WhatsApp Automation), shows what automation makes possible: save time, automate repetitive tasks, reply to customers faster and scale efficiently. It ends with: Welcome to the new world of Vrattiks AI."
          className="relative"
        >
          <div aria-hidden="true">
            <StepRail step={frame.step} stepDone={stepDone} animate={running} />

            {/* All steps stack in one grid cell: the invisible copies set the
                height, the live layer draws on top. */}
            <div className={`grid px-5 py-5 text-[12px] leading-[1.7] max-[359px]:px-4 max-[359px]:text-[10.5px] sm:px-7 sm:py-6 sm:text-[13px] xl:text-[14px] ${mono}`}>
              {steps.map((_, s) => (
                <div key={s} className="invisible col-start-1 row-start-1">
                  <StepBody step={s} typed={blocks[s].total} showResult animate={false} />
                </div>
              ))}
              <motion.div
                className="col-start-1 row-start-1"
                initial={false}
                animate={{ opacity: frame.phase === "reset" ? 0 : 1 }}
                transition={{ duration: RESET_MS / 1000 - 0.1, ease: "easeOut" }}
              >
                <motion.div
                  key={frame.step}
                  initial={false}
                  animate={frame.phase === "leaving" ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
                  transition={{ duration: LEAVE_MS / 1000, ease: "easeOut" }}
                >
                  <StepBody
                    step={frame.step}
                    typed={frame.typed}
                    showResult={stepDone}
                    animate={started}
                    caret={started ? (stepDone ? (running ? "blink" : "solid") : "solid") : undefined}
                  />
                </motion.div>
              </motion.div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-n-0/10 bg-n-0/[0.03] px-5 py-2.5 font-body sm:px-6">
              <span className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${state.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor] ${state.dot}`} />
                {state.label}
              </span>
              <span className="text-[11px] text-n-400">
                Step {frame.step + 1} of {steps.length}
              </span>
            </div>
          </div>
        </div>
      </figure>
    </MotionConfig>
  );
}

/* Four connected markers: done = mint, current = purple with a soft pulse,
   upcoming = hollow. The purple track fills up to the current step. */
function StepRail({ step, stepDone, animate }: { step: number; stepDone: boolean; animate: boolean }) {
  return (
    <ol className="relative grid grid-cols-4 border-b border-n-0/10 px-3 pb-3 pt-4 font-body sm:px-5">
      {/* Runs dot-centre to dot-centre: a column centre sits at 12.5% of the
          box plus 3/4 of the side padding (12px → 9px, 20px → 15px). */}
      <li aria-hidden="true" className="absolute left-[calc(12.5%+9px)] right-[calc(12.5%+9px)] top-[21px] h-px bg-n-0/10 sm:left-[calc(12.5%+15px)] sm:right-[calc(12.5%+15px)]">
        <motion.span
          className="absolute inset-0 origin-left bg-brand-primary"
          initial={false}
          animate={{ scaleX: step / last }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </li>
      {steps.map(({ label }, k) => {
        const done = k < step || (k === step && stepDone);
        const current = k === step && !stepDone;
        return (
          <li key={label} className="relative flex flex-col items-center gap-2">
            <span
              className={`relative h-[11px] w-[11px] rounded-full border transition-colors duration-300 ${
                done
                  ? "border-sem-success bg-sem-success shadow-[0_0_10px_var(--color-sem-success)]"
                  : current
                    ? "border-brand-primary bg-brand-primary"
                    : "border-n-0/25 bg-brand-graphite"
              }`}
            >
              {current && animate && (
                <motion.span
                  className="absolute -inset-px rounded-full border border-brand-primary"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </span>
            <span
              className={`text-[11.5px] leading-none transition-colors duration-300 sm:text-[12px] ${
                current ? "text-n-0" : done ? "text-n-300" : "text-n-400"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StepBody({
  step,
  typed,
  showResult,
  animate,
  caret,
}: {
  step: number;
  typed: number;
  showResult: boolean;
  animate: boolean;
  caret?: "solid" | "blink";
}) {
  const { lines, lineStarts, lineEnds, tokenStarts, total } = blocks[step];
  // The caret sits before the next character; once typed, at the last line's end.
  const caretAt = caret ? Math.min(typed, total - 1) : -1;
  const caretEl = caret && <Caret blink={caret === "blink"} />;

  return (
    <>
      {lines.map((line, li) =>
        lineStarts[li] > typed ? null : (
          <div key={li} className="min-h-[1.7em] whitespace-pre-wrap">
            {line.map(([tone, text], ti) => {
              const from = tokenStarts[li][ti];
              const vis = Math.max(0, Math.min(typed - from, text.length));
              return (
                <span key={ti} className={toneClass[tone]}>
                  {text.slice(0, vis)}
                  {caretAt >= from && caretAt < from + text.length && vis < text.length && caretEl}
                </span>
              );
            })}
            {caretAt === lineEnds[li] - 1 && caretEl}
          </div>
        ),
      )}
      {showResult && <StepResult step={step} animate={animate} />}
    </>
  );
}

function Caret({ blink }: { blink: boolean }) {
  return (
    <span className="relative inline-block h-[1.2em] w-0 align-text-bottom">
      <motion.span
        className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-brand-primary shadow-[0_0_8px_var(--color-brand-primary)]"
        animate={blink ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
        transition={blink ? { duration: 1.1, times: [0, 0.5, 0.5, 1], repeat: Infinity } : { duration: 0 }}
      />
    </span>
  );
}

const enter = { opacity: 0, y: 8 };
const entered = { opacity: 1, y: 0 };

function StepResult({ step, animate }: { step: number; animate: boolean }) {
  const ease = { duration: 0.4, ease: "easeOut" } as const;

  if (step === 0 || step === 1) {
    const cyan = step === 1;
    return (
      <motion.div
        initial={animate ? enter : false}
        animate={entered}
        transition={ease}
        className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-body text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.1em] ${
          cyan
            ? "border-(--code-cyan)/30 bg-(--code-cyan)/10 text-(--code-cyan)"
            : "border-sem-success/30 bg-sem-success/10 text-sem-success"
        }`}
      >
        <Icon name="check" className="h-3.5 w-3.5" />
        {cyan ? "4 services ready" : "System initialized"}
      </motion.div>
    );
  }

  if (step === 2) {
    return (
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 font-body text-[12.5px] leading-[1.35] text-n-200 sm:text-[13px]">
        {outcomes.map(({ icon, text, tone }, k) => (
          <motion.li
            key={text}
            initial={animate ? enter : false}
            animate={entered}
            transition={{ ...ease, delay: 0.08 * k }}
            className="flex items-start gap-2"
          >
            <Icon name={icon} className={`mt-px h-4 w-4 shrink-0 ${tone}`} />
            {text}
          </motion.li>
        ))}
      </ul>
    );
  }

  // The finale: a lit panel with the message set in the display face.
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10, scale: 0.98 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative mt-4 overflow-hidden rounded-md border border-brand-primary/35 bg-brand-primary/[0.07] px-4 py-3.5 font-body shadow-[0_0_32px_-6px_color-mix(in_srgb,var(--color-brand-primary)_45%,transparent)] sm:px-5 sm:py-4"
    >
      {animate && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-transparent via-n-0/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 1.2, delay: 0.35, ease: "easeInOut" }}
        />
      )}
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-brand-primary">
        <Icon name="sparkle" className="h-3.5 w-3.5" />
        AI experience activated
      </span>
      <p className="mt-2.5 font-display text-[17px] font-semibold leading-snug text-n-0 sm:text-[19px]">
        Welcome to the new world of Vrattiks AI.
      </p>
      {/* Each phrase wraps as a unit, so no line ever starts on a separator. */}
      <ul className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-[12px] leading-snug text-n-300 sm:text-[12.5px]">
        {["Smarter systems", "Seamless workflows", "Limitless possibilities"].map((phrase) => (
          <li key={phrase} className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="h-1 w-1 rounded-full bg-sem-success" />
            {phrase}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
