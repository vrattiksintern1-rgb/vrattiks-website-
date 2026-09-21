"use client";

import { motion, useReducedMotion } from "framer-motion";
import Icon, { type IconName } from "./ui/Icon";

/* An illustrative sample of what an automated lead flow looks like in practice —
   not live data. Kept generic so it reads as a product sketch, not a claim. */
const events: { icon: IconName; label: string; meta: string }[] = [
  { icon: "whatsapp", label: "New enquiry received", meta: "WhatsApp" },
  { icon: "chat", label: "Answered and qualified", meta: "AI Chatbot" },
  { icon: "crm", label: "Logged to CRM", meta: "Auto-synced" },
];

/**
 * Motion here was audited down from nine competing animations to two
 * (kylezantos-design §1, §1b):
 *
 *  - Scroll-linked parallax on the glow and the card was REMOVED. §1b is
 *    explicit: no parallax that fights the user's input. It also meant this
 *    component re-rendered on every scroll frame for a purely decorative effect.
 *  - The rail draw was 900ms (over the 600ms ceiling) and the item stagger was
 *    140ms (over the 60ms ceiling). Both are now in range.
 *  - The chip's scale-in was dropped — it arrives on opacity and a small rise
 *    like everything else, so nothing on this page uses a scale entrance.
 *
 * What is left has a job: the rail draws downward to show the flow's direction
 * (continuity), and the three events arrive in order (hierarchy).
 */
export default function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8 -z-10">
        <div className="wash-secondary absolute top-4 right-0 h-64 w-64 rounded-full opacity-55 blur-[90px]" />
        <div className="wash-primary absolute bottom-0 left-2 h-56 w-56 rounded-full opacity-45 blur-[80px]" />
      </div>

      <div className="relative rounded-xl border border-n-100 bg-n-0/85 p-5 shadow-[var(--shadow-xl)] backdrop-blur-xl md:p-6">
        {/* Card chrome */}
        <div className="flex items-center justify-between border-b border-n-50 pb-4">
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand-secondary" aria-hidden="true" />
            <span className="font-mono text-micro tracking-[0.08em] text-n-500 uppercase">
              Lead workflow
            </span>
          </span>
          <span className="font-mono text-micro text-n-400">Automated</span>
        </div>

        {/* Event rail — connector line draws down as the steps land */}
        <ol className="relative mt-5 flex flex-col gap-4">
          <motion.span
            aria-hidden="true"
            className="bg-brand-gradient absolute top-5 bottom-5 left-[21px] w-px origin-top"
            initial={reduceMotion ? undefined : { scaleY: 0 }}
            whileInView={reduceMotion ? undefined : { scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
          {events.map((event, i) => (
            <motion.li
              key={event.label}
              className="relative flex items-center gap-4 rounded-md bg-n-25/80 px-3 py-3"
              initial={reduceMotion ? undefined : { opacity: 0, x: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-n-100 bg-n-0 text-brand-secondary shadow-[var(--shadow-sm)]">
                <Icon name={event.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-caption font-semibold text-n-900">
                  {event.label}
                </span>
                <span className="block font-mono text-micro text-n-400">{event.meta}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Depth chip — breaks the card edge so the composition isn't a flat rectangle */}
      <motion.div
        className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-full border border-n-100 bg-n-0 py-2 pr-5 pl-3 shadow-[var(--shadow-lg)] sm:-left-6"
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-sem-success flex h-7 w-7 items-center justify-center rounded-full bg-sem-success-bg">
          <Icon name="check" className="h-4 w-4" />
        </span>
        <span className="text-label font-semibold whitespace-nowrap text-n-900">
          Meeting booked
        </span>
      </motion.div>
    </div>
  );
}
