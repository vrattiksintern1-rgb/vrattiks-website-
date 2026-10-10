/* The "Illustrative" chip every recreated visual carries on itself — visuals
   get screenshotted and shared on their own, so one page-level note isn't
   enough (docs/case-study-guides, §4 of each guide; vrattiks-standards §3).
   Visible text, not aria-hidden: screen-reader users hear it too.
   n-700 on n-0 passes 4.5:1 in both themes. */
export default function IllustrativeTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-n-200 bg-n-0 px-2.5 py-1 font-body text-label font-semibold tracking-[0.12em] text-n-700 uppercase shadow-[var(--shadow-sm)] ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-secondary" />
      Illustrative
    </span>
  );
}
