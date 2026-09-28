"use client";

import { motion, useReducedMotion } from "framer-motion";

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

  /* `initial` / `whileInView` must be identical on server and client. The
     server can't know the user's motion preference, so it always renders the
     hidden `initial` state; switching the props to `undefined` on the client
     (the previous approach) left reduced-motion users with every revealed
     element stuck at opacity 0, plus a hydration mismatch. Reduced motion
     now sets the duration to 0 instead — content snaps in with no travel. */
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
