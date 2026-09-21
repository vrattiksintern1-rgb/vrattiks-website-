"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
  useReducedMotion,
} from "framer-motion";

/**
 * Counts a numeral up once it scrolls into view. Falls back to the final value
 * immediately for `prefers-reduced-motion` and for non-numeric displays.
 */
export default function CountUp({
  value,
  display,
  className = "",
}: {
  /** null for values that aren't a single number (e.g. "24/7") */
  value: number | null;
  /** what is rendered — also the static fallback */
  display: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);

  const shouldAnimate = value !== null && value > 0 && !reduceMotion;
  const text = useTransform(count, (latest) =>
    display.replace(String(value), String(Math.round(latest))),
  );

  useEffect(() => {
    if (!inView || !shouldAnimate) return;
    const controls = animate(count, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, shouldAnimate, count, value]);

  if (!shouldAnimate) {
    return (
      <span ref={ref} className={className}>
        {display}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
