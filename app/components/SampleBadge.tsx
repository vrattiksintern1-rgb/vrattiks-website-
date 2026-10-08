/* Visible marker for illustrative case-study entries (`sample: true` in
   case-studies.ts). It is the guardrail that keeps sample projects from
   reading as real client work (vrattiks-standards §3) — never hide it while a
   sample entry is on the page. The dashed border reads as "provisional"
   without adding a colour. */
export default function SampleBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-n-300 px-2 py-1 font-body text-[11.5px] leading-none font-semibold tracking-[0.08em] text-n-600 uppercase">
      Sample
    </span>
  );
}
