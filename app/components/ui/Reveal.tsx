"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The page's only scroll-reveal primitive.
 *
 * vrattiks-accessibility, "Reduced motion": `useReducedMotion` drops `initial`
 * and `whileInView` entirely rather than shortening the duration, so the
 * content renders at its final position with no transform applied — a 0.01s
 * animation is still an animation.
 *
 * kylezantos-design §1b, "On scroll-back": `viewport.once` is true, so a reveal
 * fires a single time and never re-triggers when the user scrolls back up.
 *
 * Also per §1b, this must NOT wrap the hero <h1> — see the comment at that
 * element in Hero.tsx.
 *
 * vrattiks-performance, "Animation performance": opacity + transform only,
 * both GPU-composited; never animate width/height/top/left here.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
