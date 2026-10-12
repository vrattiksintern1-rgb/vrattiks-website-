/* FAQ band background: a faint tiled pattern of small chat bubbles, question
   marks and typing dots — the same conversation motif as FaqBackdrop, spread
   across the whole band as texture. Inline SVG <pattern> (not a data-URI
   background) so the stroke uses the n-* tokens and flips with the theme.
   The mask fades it out at the top and bottom so the band blends into its
   neighbours. Decorative: aria-hidden, static, behind everything (-z-10).
   The questions sit on an opaque white panel, so none of it reaches body text. */
export default function FaqPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]"
    >
      <defs>
        <pattern id="faq-pattern" width="168" height="132" patternUnits="userSpaceOnUse">
          <g fill="none" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="stroke-n-300">
            {/* Question bubble with "?" — tail bottom-left */}
            <path d="M20 14h28a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H28l-7 6v-6h-1a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" />
            <path d="M31.5 23.5a3 3 0 1 1 4.2 2.7c-.8.4-1.2 1-1.2 1.8v.5" />
            <circle cx="34.5" cy="31.5" r=".6" className="fill-n-300" />

            {/* Answer bubble with a check — tail bottom-right */}
            <path d="M106 76h34a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-1v6l-7-6h-26a6 6 0 0 1-6-6V82a6 6 0 0 1 6-6Z" />
            <path d="m116 88 3.5 3.5 6.5-7" />
            <path d="M131 86h8M131 92h5" />

            {/* Typing dots */}
            <circle cx="110" cy="26" r="1.6" className="fill-n-300" />
            <circle cx="118" cy="26" r="1.6" className="fill-n-300" />
            <circle cx="126" cy="26" r="1.6" className="fill-n-300" />

            {/* Lone question mark */}
            <path d="M34 92a4 4 0 1 1 5.6 3.6c-1 .5-1.6 1.3-1.6 2.4v.8" />
            <circle cx="38" cy="103" r=".7" className="fill-n-300" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#faq-pattern)" className="opacity-45" />
    </svg>
  );
}
