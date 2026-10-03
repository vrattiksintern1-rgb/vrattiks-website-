"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* Hero visual: a code window that types out a lead-follow-up automation.

   The snippet is illustrative, not a real SDK — it reads as a plain-English
   sequence (reply → qualify → book → sync) so a business owner can follow it
   without knowing JavaScript. Lines are kept <= 40 chars so the window never
   needs to scroll at 375px.

   Typing runs ONCE and stops (kylezantos-design §1b: nothing loops while the
   user isn't acting). The caret blinks a few times when done, then rests.
   Reduced-motion users, and the server render, get the finished code. */

type Tone = "plain" | "keyword" | "string" | "fn" | "punct" | "comment";
type Token = [Tone, string];

const code: Token[][] = [
  [["comment", "// New enquiry → booked meeting"]],
  [["keyword", "const "], ["plain", "flow "], ["punct", "= "], ["fn", "automate"], ["punct", "({"]],
  [["plain", "  trigger"], ["punct", ": "], ["string", "'new_enquiry'"], ["punct", ","]],
  [["plain", "  channels"], ["punct", ": ["], ["string", "'WhatsApp'"], ["punct", ", "], ["string", "'Calls'"], ["punct", "],"]],
  [["punct", "});"]],
  [],
  [["plain", "flow."], ["fn", "step"], ["punct", "("], ["string", "'reply'"], ["punct", ", "], ["plain", "(lead) "], ["keyword", "=>"]],
  [["plain", "  whatsapp."], ["fn", "send"], ["punct", "("], ["plain", "lead.phone, greeting"], ["punct", ")"]],
  [["punct", ");"]],
  [["plain", "flow."], ["fn", "step"], ["punct", "("], ["string", "'qualify'"], ["punct", ", "], ["plain", "voiceAgent.call"], ["punct", ");"]],
  [["plain", "flow."], ["fn", "step"], ["punct", "("], ["string", "'book'"], ["punct", ", "], ["plain", "calendar.schedule"], ["punct", ");"]],
  [["plain", "flow."], ["fn", "step"], ["punct", "("], ["string", "'sync'"], ["punct", ", "], ["plain", "crm.save"], ["punct", ");"]],
  [],
  [["plain", "flow."], ["fn", "start"], ["punct", "(); "], ["comment", "// live, 24/7"]],
];

const toneClass: Record<Tone, string> = {
  plain: "text-n-200",
  keyword: "text-brand-primary",
  string: "text-sem-success",
  fn: "text-sem-warning",
  punct: "text-n-400",
  comment: "text-n-400 italic",
};

// Each line ends in one extra "character" (the newline) so the caret pauses there.
const lineLengths = code.map((line) => line.reduce((n, [, t]) => n + t.length, 0) + 1);
const lineEnds = lineLengths.map((_, i) => lineLengths.slice(0, i + 1).reduce((a, b) => a + b, 0));
const lineStarts = lineEnds.map((end, i) => end - lineLengths[i]);
const total = lineEnds[lineEnds.length - 1];

// Absolute start offset of every token, so render is a pure function of `typed`.
const tokenStarts = code.map((line, li) =>
  line.map((_, ti) => lineStarts[li] + line.slice(0, ti).reduce((n, [, t]) => n + t.length, 0)),
);

const CHAR_MS = 22;
const LINE_PAUSE_MS = 160;
const START_DELAY_MS = 600;

// Leading spaces are typed instantly, like an editor's auto-indent.
function indentAt(pos: number) {
  const i = pos === 0 ? 0 : lineEnds.indexOf(pos) + 1;
  if (pos !== 0 && i === 0) return 0;
  const text = (code[i] ?? []).map(([, t]) => t).join("");
  return text.length - text.trimStart().length;
}

export default function HeroVisual() {
  // Start finished so SSR, no-JS and reduced-motion all see the full code.
  const [typed, setTyped] = useState(total);
  const done = typed >= total;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pos = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      pos += 1 + indentAt(pos);
      setTyped(pos);
      if (pos >= total) return;
      const atLineEnd = lineEnds.includes(pos + 1);
      timer = setTimeout(tick, atLineEnd ? LINE_PAUSE_MS : CHAR_MS);
    };

    // Clear the server-rendered code on the next frame (the hero's Reveal is
    // still at opacity 0 then), pause, and start typing.
    const frame = requestAnimationFrame(() => {
      setTyped(0);
      timer = setTimeout(tick, START_DELAY_MS);
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  // Each token is split at the typed boundary. Untyped text stays in the
  // layout as `invisible`, so the window never changes size while typing.
  // The caret sits before the next character; once done, at the last line's end.
  const caretAt = done ? total - 1 : typed;

  const caret = (
    <span className="relative inline-block h-[1.2em] w-0 align-text-bottom">
      <motion.span
        className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-brand-primary"
        animate={done ? { opacity: [1, 0, 1] } : { opacity: 1 }}
        transition={done ? { duration: 1, repeat: 3, ease: "linear" } : { duration: 0 }}
      />
    </span>
  );

  return (
    <figure
      role="img"
      aria-label="Example automation: every new enquiry gets a WhatsApp reply, a qualifying call from a voice agent, a booked meeting and a CRM entry."
      className="w-full overflow-hidden rounded-lg bg-brand-graphite shadow-[var(--shadow-lg)]"
    >
      <div aria-hidden="true" className="flex items-center gap-4 border-b border-n-0/10 bg-n-0/[0.03] px-5 py-3.5 sm:px-6 sm:py-4">
        <span className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-sem-error" />
          <span className="h-3 w-3 rounded-full bg-sem-warning" />
          <span className="h-3 w-3 rounded-full bg-sem-success" />
        </span>
        <span className="font-body text-[14px] text-n-300">lead-follow-up.js</span>
        <span className="ml-auto flex items-center gap-1.5 font-body text-[13px] text-n-300">
          {done && <span className="h-1.5 w-1.5 rounded-full bg-sem-success" />}
          {done ? "Live" : "Writing…"}
        </span>
      </div>

      <pre
        aria-hidden="true"
        className="overflow-x-auto px-5 py-5 text-[12px] leading-[1.75] [font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] sm:px-7 sm:py-6 sm:text-[14px] xl:text-[15px]"
      >
        {code.map((line, li) => (
          <div key={li} className="min-h-[1.75em] whitespace-pre">
            {line.map(([tone, text], ti) => {
              const from = tokenStarts[li][ti];
              const vis = Math.max(0, Math.min(typed - from, text.length));
              return (
                <span key={ti} className={toneClass[tone]}>
                  {text.slice(0, vis)}
                  {caretAt >= from && caretAt < from + text.length && caret}
                  {vis < text.length && <span className="invisible">{text.slice(vis)}</span>}
                </span>
              );
            })}
            {caretAt === lineEnds[li] - 1 && caret}
          </div>
        ))}
      </pre>
    </figure>
  );
}
