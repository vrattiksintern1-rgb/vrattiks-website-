"use client";

import { motion, useReducedMotion } from "framer-motion";
import Icon, { type IconName } from "./ui/Icon";

/* An illustrative sample of what an automated lead flow looks like in practice —
   not live data. Kept generic so it reads as a product sketch, not a claim.

   ⚠ Nothing in here may become a number. vrattiks-standards §3 forbids
   inventing stats, and a figure rendered inside a product mock reads as
   measured even when the caption says otherwise. Capability statements
   ("Runs around the clock") are fine; "80% faster" is not. */
const events: { icon: IconName; label: string; meta: string }[] = [
  { icon: "whatsapp", label: "New enquiry received", meta: "WhatsApp" },
  { icon: "chat", label: "Answered and qualified", meta: "AI Chatbot" },
  { icon: "crm", label: "Logged to CRM", meta: "Auto-synced" },
];

const channels: { icon: IconName; label: string }[] = [
  { icon: "whatsapp", label: "WhatsApp" },
  { icon: "chat", label: "Website chat" },
  { icon: "mic", label: "Phone line" },
];

/**
 * Was a narrow 520px card in the hero's right column. Now that the hero is
 * centred this is the full-width surface beneath the headline, so it carries
 * two columns: the flow itself, and what feeds it.
 *
 * Radius dropped from `xl` (32px) to `lg` (22px). The reference site reuses a
 * single tight radius on every surface, and the 32px corner was what made this
 * panel read as a soft widget rather than as a product.
 *
 * Motion was audited down from nine competing animations to two
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
    <div className="relative mx-auto w-full max-w-[980px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10"
      >
        <div className="wash-secondary absolute top-0 right-10 h-72 w-72 rounded-full opacity-40 blur-[100px]" />
        <div className="wash-primary absolute bottom-0 left-6 h-64 w-64 rounded-full opacity-35 blur-[90px]" />
      </div>

      <div className="relative rounded-lg border border-n-100 bg-n-0/85 p-4 shadow-[var(--shadow-float)] backdrop-blur-xl sm:p-6 md:p-7">
        {/* Card chrome */}
        <div className="flex items-center justify-between border-b border-n-50 pb-4">
          <span className="flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full bg-brand-secondary"
              aria-hidden="true"
            />
            <span className="font-mono text-micro tracking-[0.08em] text-n-500 uppercase">
              Lead workflow
            </span>
          </span>
          <span className="font-mono text-micro text-n-500">Automated</span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1.35fr_1fr] md:gap-7">
          {/* Event rail — connector line draws down as the steps land */}
          <ol className="relative flex flex-col gap-3">
            <motion.span
              aria-hidden="true"
              className="bg-brand-gradient absolute top-6 bottom-6 left-[21px] w-px origin-top"
              initial={reduceMotion ? undefined : { scaleY: 0 }}
              whileInView={reduceMotion ? undefined : { scaleY: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
            {events.map((event, i) => (
              <motion.li
                key={event.label}
                className="relative flex items-center gap-4 rounded-md bg-n-25/80 px-3 py-3.5"
                initial={reduceMotion ? undefined : { opacity: 0, x: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-n-100 bg-n-0 text-brand-secondary shadow-[var(--shadow-sm)]">
                  <Icon name={event.icon} className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-caption font-semibold text-n-900">
                    {event.label}
                  </span>
                  <span className="block font-mono text-micro text-n-500">
                    {event.meta}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>

          {/* Right column: what feeds the flow, closed by the one promoted
              graphite tile. That single inverted surface inside a light panel
              is the reference site's strongest card device. */}
          <motion.div
            className="flex flex-col gap-3"
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-md border border-n-100 bg-n-25/60 p-4">
              <p className="font-mono text-micro tracking-[0.12em] text-n-500 uppercase">
                Channels connected
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {channels.map((channel) => (
                  <li
                    key={channel.label}
                    className="flex items-center gap-2.5 text-caption font-medium text-n-700"
                  >
                    <Icon
                      name={channel.icon}
                      className="h-3.5 w-3.5 shrink-0 text-brand-secondary"
                    />
                    {channel.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 rounded-md bg-brand-graphite p-4">
              <span className="font-mono text-micro tracking-[0.12em] text-brand-primary uppercase">
                Always on
              </span>
              <p className="font-display text-body-lg leading-snug font-semibold text-n-0 text-balance">
                Runs nights, weekends, and holidays.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Depth chip — breaks the card edge so the composition isn't a flat rectangle */}
      <motion.div
        className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-full border border-n-100 bg-n-0 py-2 pr-5 pl-3 shadow-[var(--shadow-lg)] sm:-bottom-6 sm:-left-5"
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
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
