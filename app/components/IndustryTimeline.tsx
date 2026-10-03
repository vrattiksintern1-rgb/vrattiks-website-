"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Icon from "./ui/Icon";
import type { Industry } from "@/app/lib/content";

/* Home's Industries shortlist as a vertical timeline. A centre rail (left
   rail on phones) fills as you scroll; each industry lights up when the fill
   reaches its dot, and the one the fill is currently on gets the border +
   glow card (CLAUDE.md Design Taste, Vercel read: emphasis is a border shift
   plus --shadow-glow, never a scale-up).

   Scroll-linked, not autonomous: nothing moves unless the user scrolls, so
   kylezantos §1b's no-loop rule holds and reduced-motion users get the same
   state changes without the 300ms easing. */

/* Where in the viewport the rail's tip sits — an industry is "reached" once
   its dot scrolls above this line. */
const TIP = 0.55;

export default function IndustryTimeline({ industries }: { industries: Industry[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  // Rail runs from the first dot's centre to the last dot's centre. 29px is
  // the dot's centre in a row (mt-[23px] + half of 12px) — the SSR default
  // until the list is measured.
  const [rail, setRail] = useState({ top: 29, bottom: 0 });

  // Progress is measured on the rail itself, so the fill's tip sits on the
  // same viewport line the "reached" check below uses.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: [`start ${TIP * 100}%`, `end ${TIP * 100}%`],
  });
  const tipTop = useTransform(scrollYProgress, (p) => `${p * 100}%`);

  // Compared against the viewport line, not the clamped progress — at
  // progress 0 the tip sits exactly on the first dot and would count it.
  const update = () => {
    const tip = window.innerHeight * TIP;
    let reached = -1;
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const r = dot.getBoundingClientRect();
      if (r.top + r.height / 2 <= tip) reached = i;
    });
    setActive(reached);
  };

  useMotionValueEvent(scrollYProgress, "change", update);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const dots = dotRefs.current.filter((d): d is HTMLSpanElement => !!d);
      if (!dots.length) return;
      const box = list.getBoundingClientRect();
      const centre = (d: HTMLSpanElement) => {
        const r = d.getBoundingClientRect();
        return r.top + r.height / 2 - box.top;
      };
      setRail({ top: centre(dots[0]), bottom: box.height - centre(dots[dots.length - 1]) });
      // Also covers a page that loads already scrolled (back/forward, anchor
      // links), where no scroll "change" event fires.
      update();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={listRef} className="relative mt-12 md:mt-16">
      {/* Rail: hairline track + gradient fill confined to a 2px band (the
          section's only gradient), with a soft glowing tip. */}
      <div
        ref={railRef}
        aria-hidden="true"
        className="absolute left-[12px] w-0.5 -translate-x-1/2 md:left-1/2"
        style={{ top: rail.top, bottom: rail.bottom }}
      >
        <span className="absolute inset-0 bg-n-200" />
        <motion.span
          className="absolute inset-0 origin-top"
          style={{
            scaleY: scrollYProgress,
            background: "linear-gradient(180deg, var(--color-brand-primary), var(--color-brand-secondary))",
          }}
        />
        <motion.span
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary"
          style={{
            top: tipTop,
            boxShadow:
              "0 0 0 4px color-mix(in srgb, var(--color-brand-primary) 25%, transparent), 0 0 16px 4px color-mix(in srgb, var(--color-brand-secondary) 35%, transparent)",
          }}
        />
      </div>

      {industries.map((industry, i) => {
        const left = i % 2 === 0;
        const state = i === active ? "current" : i < active ? "reached" : "upcoming";

        return (
          <li
            key={industry.slug}
            aria-current={state === "current" ? "step" : undefined}
            className={`relative grid grid-cols-[24px_1fr] gap-x-3 md:grid-cols-[1fr_64px_1fr] md:gap-x-0 ${
              i > 0 ? "mt-3 md:-mt-10" : ""
            }`}
          >
            <span
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              aria-hidden="true"
              className={`relative z-10 col-start-1 row-start-1 mt-[23px] h-3 w-3 justify-self-center rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:duration-0 md:col-start-2 ${
                state === "upcoming"
                  ? "border-n-300 bg-n-25"
                  : "border-brand-secondary bg-brand-secondary"
              } ${state === "current" ? "ring-4 ring-brand-primary/30" : ""}`}
            />

            <Link
              href={`/industries/${industry.slug}`}
              className={`focus-glow group col-start-2 row-start-1 block rounded-md border p-5 transition-[border-color,background-color,box-shadow] duration-300 motion-reduce:duration-0 md:max-w-[400px] ${
                left ? "md:col-start-1 md:justify-self-end md:text-right" : "md:col-start-3 md:justify-self-start"
              } ${
                state === "current"
                  ? "border-brand-primary/60 bg-n-0"
                  : "border-transparent hover:border-n-200"
              }`}
              style={state === "current" ? { boxShadow: "var(--shadow-glow)" } : undefined}
            >
              <span className="block font-body text-label font-semibold text-brand-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-1 text-[18px] leading-[1.3] font-display font-semibold transition-colors duration-300 motion-reduce:duration-0 ${
                  state === "upcoming" ? "text-n-500" : "text-n-900"
                }`}
              >
                {industry.name}
              </h3>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-n-600">{industry.application}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-secondary">
                See use cases
                <Icon
                  name="arrowUpRight"
                  className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
