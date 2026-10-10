"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView } from "framer-motion";

/* Hero visual: one code editor that types out a single short script that
   carries three ideas, in order: "Hi, welcome to Vrattiks." → explore our
   services → welcome to the new world of Vrattiks AI. The script is display
   copy, not a real SDK. Service names match app/lib/content.ts.

   Size: the whole script (11 lines, <= 40 chars each so nothing wraps from
   320px up; below 360px the code drops to 10.5px to make that true) fits the
   editor's original 14-line window, so there is no scrolling, the last line is
   always in view and the card height never changes while typing.

   Motion: it types the whole script in one pass, holds, fades and starts
   again. Looping is the user's call (2026-10-10), a deliberate exception to
   kylezantos-design §1b like HeroParticles: it only runs while on screen and
   reduced motion gets the finished script, static. The pause/play button was
   removed at the user's request (2026-10-10), so WCAG 2.2.2 (pause for motion
   over 5s) is knowingly not met here. SSR and no-JS render the static frame.

   Colour: brand purple marks Vrattiks itself (the class and the instance);
   mint strings, cyan function names (--code-cyan, scoped to this card since
   highlighting needs more hues than the brand ramp has) and a softened amber
   for keywords. The welcome gets weight and a mint glow; the closing line is
   the one brightest thing in the card, near-white with a purple glow. */

type Tone =
  | "keyword" | "fn" | "brand" | "ident"
  | "string" | "welcome" | "finale" | "punct" | "comment";
type Token = [Tone, string];

const toneClass: Record<Tone, string> = {
  keyword: "text-sem-warning/85",
  fn: "text-(--code-cyan)",
  brand: "font-semibold text-brand-primary",
  ident: "text-brand-primary",
  string: "text-sem-success",
  welcome: "font-semibold text-sem-success [text-shadow:0_0_14px_rgb(79_209_165/0.35)]",
  finale: "font-semibold text-n-50 [text-shadow:0_0_18px_rgb(183_154_243/0.6)]",
  punct: "text-n-400",
  comment: "italic text-n-400",
};

const code: Token[][] = [
  [["keyword", "const "], ["ident", "world"], ["punct", " = "], ["brand", "Vrattiks"], ["punct", "."], ["fn", "open"], ["punct", "();"]],
  [["ident", "world"], ["punct", "."], ["fn", "say"], ["punct", "("], ["welcome", '"Hi, welcome to Vrattiks."'], ["punct", ");"]],
  [],
  [["ident", "world"], ["punct", "."], ["fn", "explore"], ["punct", "(["]],
  [["string", '  "AI Voice Agent"'], ["punct", ",      "], ["comment", "// takes calls"]],
  [["string", '  "AI Chatbot"'], ["punct", ",          "], ["comment", "// chats back"]],
  [["string", '  "Workflow Automation"'], ["punct", ", "], ["comment", "// runs itself"]],
  [["punct", "]);"]],
  [],
  [["ident", "world"], ["punct", "."], ["fn", "launch"], ["punct", "("], ["finale", "`Welcome to the new world"]],
  [["finale", "              of Vrattiks AI.`"], ["punct", ");"]],
];

// Each line ends in one extra "character" (the newline) so the caret pauses there.
const lineLengths = code.map((line) => line.reduce((n, [, t]) => n + t.length, 0) + 1);
const lineEnds = lineLengths.map((_, i) => lineLengths.slice(0, i + 1).reduce((a, b) => a + b, 0));
const lineStarts = lineEnds.map((end, i) => end - lineLengths[i]);
const total = lineEnds[lineEnds.length - 1];

// Absolute start offset of every token, so render is a pure function of `typed`.
const tokenStarts = code.map((line, li) =>
  line.map((_, ti) => lineStarts[li] + line.slice(0, ti).reduce((n, [, t]) => n + t.length, 0)),
);

// Leading spaces are typed instantly, like an editor's auto-indent.
const indents = code.map((line) => {
  const text = line.map(([, t]) => t).join("");
  return text.length - text.trimStart().length;
});

/* ---- Window -------------------------------------------------------------- */
// The original card's 14 lines at 1.75em. Lines are now 1.9em (set in the
// markup), a touch airier since the script is short; the height stays put.
const WINDOW_EM = 14 * 1.75;

/* ---- Timeline -------------------------------------------------------------
   One pass through the script: every keystroke is a frame with its own delay,
   then a hold on the finished script and a fade before the loop restarts. */
type Frame = { typed: number; fade: boolean; ms: number };

const START_DELAY_MS = 700;
const CHAR_MS = 26; // average; ±6ms of deterministic jitter so it reads as typed
const LINE_PAUSE_MS = 110;
const HOLD_MS = 3200;
const FADE_MS = 500;

const frames: Frame[] = [{ typed: 0, fade: false, ms: START_DELAY_MS }];
for (let pos = 0; pos < total; ) {
  const lineIndex = lineStarts.indexOf(pos);
  pos += 1 + (lineIndex === -1 ? 0 : indents[lineIndex]);
  const ms =
    pos >= total ? HOLD_MS
    : lineEnds.includes(pos + 1) ? LINE_PAUSE_MS
    : CHAR_MS - 6 + ((pos * 7) % 5) * 3;
  frames.push({ typed: pos, fade: false, ms });
}
frames.push({ typed: total, fade: true, ms: FADE_MS });

/* ---- Reduced motion, read without a hydration mismatch ------------------- */
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduce = () => window.matchMedia(REDUCE_QUERY).matches;
const getServerReduce = () => true; // server renders the static frame

export default function HeroVisual() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useSyncExternalStore(subscribeReduce, getReduce, getServerReduce);

  const running = !reduceMotion && inView;

  // `null` = not started: the static frame (the whole script, fully typed).
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!running) return;
    if (index === null) {
      // Clear the static frame on the next frame (the hero's Reveal is still
      // fading in then) and start typing from the top.
      const raf = requestAnimationFrame(() => setIndex(0));
      return () => cancelAnimationFrame(raf);
    }
    const timer = setTimeout(() => setIndex((i) => ((i ?? 0) + 1) % frames.length), frames[index].ms);
    return () => clearTimeout(timer);
  }, [running, index]);

  const started = index !== null;
  const { typed, fade } = started ? frames[index] : { typed: total, fade: false };
  const done = typed >= total;

  // The caret sits before the next character; once done, at the last line's end.
  const caretAt = done ? total - 1 : typed;
  const caret = started && (
    <span className="relative inline-block h-[1.2em] w-0 align-text-bottom">
      <motion.span
        className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-brand-primary shadow-[0_0_8px_var(--color-brand-primary)]"
        animate={done && running ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
        transition={done && running ? { duration: 1.1, times: [0, 0.5, 0.5, 1], repeat: Infinity } : { duration: 0 }}
      />
    </span>
  );

  const status =
    started && !done ? { label: "Writing…", dot: "bg-brand-primary" }
    : { label: "AI system active", dot: "bg-sem-success" };

  return (
    <figure
      ref={ref}
      className="relative w-full overflow-hidden rounded-lg bg-brand-graphite shadow-[var(--shadow-lg)] ring-1 ring-n-0/10 [--code-cyan:#7fd6f2]"
    >
      {/* Ambient glow + hairline grid. Decorative, static. */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-secondary/25 blur-3xl" />
      <div aria-hidden="true" className="bg-grid-fade-dark pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative flex items-center gap-4 border-b border-n-0/10 bg-n-0/[0.03] px-5 py-3.5 max-[359px]:gap-3 max-[359px]:px-4 sm:px-6 sm:py-4">
        <span aria-hidden="true" className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-sem-error" />
          <span className="h-3 w-3 rounded-full bg-sem-warning" />
          <span className="h-3 w-3 rounded-full bg-sem-success" />
        </span>
        <span aria-hidden="true" className="whitespace-nowrap font-body text-[14px] text-n-300 max-[359px]:text-[13px]">
          Vrattiks AI World.js
        </span>
        {/* The label only fits beside the filename from sm up; below that the dot
            carries it. h-6 keeps the header the height it had with the old
            pause button. */}
        <span aria-hidden="true" className="ml-auto flex h-6 items-center gap-1.5 font-body text-[13px] text-n-300">
          <span className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor] ${status.dot}`} />
          <span className="hidden sm:inline">{status.label}</span>
        </span>
      </div>

      <div
        role="img"
        aria-label="A code editor types: Hi, welcome to Vrattiks. It explores our services: an AI Voice Agent that takes calls, an AI Chatbot that chats back, and Workflow Automation that runs itself. It ends with: Welcome to the new world of Vrattiks AI."
        className="relative px-5 py-5 text-[12px] leading-[1.9] [font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] max-[359px]:px-4 max-[359px]:text-[10.5px] sm:px-7 sm:py-6 sm:text-[14px] xl:text-[15px]"
      >
        {/* Fixed window at the original card height; the script fits inside it. */}
        <div aria-hidden="true" className="overflow-hidden" style={{ height: `${WINDOW_EM}em` }}>
          <div
            className={`transition-opacity ease-out ${fade ? "opacity-0 duration-500" : "opacity-100 duration-300"}`}
          >
            {code.map((line, li) =>
              started && lineStarts[li] > typed ? null : (
                <div key={li} className="min-h-[1.9em] whitespace-pre">
                  {line.map(([tone, text], ti) => {
                    const from = tokenStarts[li][ti];
                    const vis = Math.max(0, Math.min(typed - from, text.length));
                    return (
                      <span key={ti} className={toneClass[tone]}>
                        {text.slice(0, vis)}
                        {caretAt >= from && caretAt < from + text.length && caret}
                      </span>
                    );
                  })}
                  {caretAt === lineEnds[li] - 1 && caret}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}
