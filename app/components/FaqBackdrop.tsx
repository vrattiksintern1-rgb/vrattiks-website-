/* FAQ background art: a faint line-drawn chat exchange — a question, a
   typing indicator, an answer with a check. It ties the section to what
   Vrattiks actually builds (chatbots, voice and WhatsApp agents answering
   customer questions) instead of a generic texture.

   It sits INSIDE the sticky heading column, under the heading, so it travels
   with the heading on scroll. Earlier FAQ backgrounds were spread across the
   band and ended up behind the heading as it slid down its column (see
   memory.md, 2026-10-10). Purely decorative: aria-hidden, static (no loop —
   kylezantos-design §1b), colours from the n-* ramp so it flips with the
   theme. Hidden below md, where the heading stacks above the questions. */
export default function FaqBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-10 hidden w-full max-w-[380px] md:block">
      <div className="wash-brand absolute -inset-x-10 -inset-y-6 -z-10 opacity-40" />
      <svg viewBox="0 0 380 260" fill="none" className="w-full">
        {/* Question bubble — tail bottom-left */}
        <path
          d="M18 8h196a14 14 0 0 1 14 14v40a14 14 0 0 1-14 14H40l-16 14v-14h-6A14 14 0 0 1 4 62V22A14 14 0 0 1 18 8Z"
          className="fill-n-0 stroke-n-200"
          strokeWidth="1.5"
        />
        <circle cx="38" cy="42" r="14" className="fill-n-100" />
        <path
          d="M33.5 38a4.5 4.5 0 1 1 6.5 4c-1.2.6-2 1.5-2 2.8V46"
          className="stroke-brand-secondary"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="38" cy="50.5" r="1.4" className="fill-brand-secondary" />
        <rect x="64" y="32" width="128" height="7" rx="3.5" className="fill-n-200" />
        <rect x="64" y="46" width="88" height="7" rx="3.5" className="fill-n-100" />

        {/* Typing indicator — static, no loop */}
        <rect x="290" y="104" width="76" height="34" rx="17" className="fill-n-0 stroke-n-200" strokeWidth="1.5" />
        <circle cx="312" cy="121" r="4" className="fill-brand-primary/50" />
        <circle cx="328" cy="121" r="4" className="fill-brand-primary/75" />
        <circle cx="344" cy="121" r="4" className="fill-brand-primary" />

        {/* Answer bubble — tail bottom-right, brand-tinted edge */}
        <path
          d="M104 156h248a14 14 0 0 1 14 14v56a14 14 0 0 1-14 14h-6v14l-16-14H104a14 14 0 0 1-14-14v-56a14 14 0 0 1 14-14Z"
          className="fill-n-0 stroke-brand-primary/60"
          strokeWidth="1.5"
        />
        <circle cx="124" cy="182" r="12" className="fill-brand-secondary/10" />
        <path
          d="m118.5 182 4 4 7-8"
          className="stroke-brand-secondary"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="146" y="176" width="180" height="7" rx="3.5" className="fill-n-200" />
        <rect x="146" y="190" width="150" height="7" rx="3.5" className="fill-n-100" />
        <rect x="146" y="204" width="104" height="7" rx="3.5" className="fill-n-100" />
      </svg>
    </div>
  );
}
