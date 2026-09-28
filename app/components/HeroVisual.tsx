"use client";

import { motion, useReducedMotion } from "framer-motion";
import Icon from "./ui/Icon";

const chips = [
  { icon: "target" as const, label: "Lead captured", sub: "WhatsApp · just now" },
  { icon: "chat" as const, label: "Auto-replied", sub: "AI Chatbot" },
  { icon: "check" as const, label: "Meeting booked", sub: "CRM synced" },
];

export default function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative aspect-[4/3] w-full max-w-[520px] md:aspect-square">
      <div
        aria-hidden="true"
        className="bg-brand-gradient-soft absolute inset-0 rounded-xl"
      />
      <motion.div
        aria-hidden="true"
        className="bg-brand-gradient absolute -top-6 -right-6 h-28 w-28 rounded-full opacity-60 blur-2xl"
        animate={reduceMotion ? undefined : { y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="bg-brand-gradient absolute bottom-4 left-4 h-20 w-20 rounded-full opacity-40 blur-2xl"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 flex flex-col items-stretch justify-center gap-4 p-8">
        {chips.map((chip, i) => (
          <motion.div
            key={chip.label}
            className="flex items-center gap-3 self-end rounded-lg border border-n-100 bg-n-0 px-4 py-3 shadow-[var(--shadow-md)]"
            style={{ marginRight: i === 1 ? "36px" : 0 }}
            initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-gradient text-n-0">
              <Icon name={chip.icon} className="h-4.5 w-4.5" />
            </span>
            <span>
              <span className="block text-[13.5px] font-semibold text-n-900">{chip.label}</span>
              <span className="block font-mono text-[11.5px] text-n-500">{chip.sub}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
