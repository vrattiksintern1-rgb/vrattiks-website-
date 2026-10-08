"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Entry directions (kylezantos-design §1: hierarchy, once, 8–20px travel,
   transform/opacity only). `below` is the site-wide default; the others exist
   so a page can vary its reveals per section without new motion components
   (vrattiks-standards §5) — /case-studies uses one per section:
   - `start` / `end`: a 16px slide in from the left / right
   - `fade`: opacity only, no travel
   - `rule`: scaleX 0 → 1, for hairlines that draw in (pair with `origin-left`)
   - `settle`: a 12px rise plus a 0.98 → 1 scale */
const hidden = {
  below: { opacity: 0, y: 16 },
  start: { opacity: 0, x: -16 },
  end: { opacity: 0, x: 16 },
  fade: { opacity: 0 },
  rule: { opacity: 0, scaleX: 0 },
  settle: { opacity: 0, y: 12, scale: 0.98 },
} as const;

const shown = { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1 };

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  from = "below",
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
  from?: keyof typeof hidden;
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  /* `initial` / `whileInView` must be identical on server and client. The
     server can't know the user's motion preference, so it always renders the
     hidden `initial` state; switching the props to `undefined` on the client
     (the previous approach) left reduced-motion users with every revealed
     element stuck at opacity 0, plus a hydration mismatch. Reduced motion
     now sets the duration to 0 instead — content snaps in with no travel. */
  return (
    <Component
      className={className}
      initial={hidden[from]}
      whileInView={shown}
      /* `rule` starts at zero width against its left edge, so a horizontal
         inset would keep it outside the viewport on phones and it would never
         draw in — inset it vertically only. */
      viewport={{ once: true, margin: from === "rule" ? "-80px 0px" : "-80px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
