import Icon from "./ui/Icon";
import type { WebsiteStudy } from "@/app/lib/case-studies";

/* Code-built, STATIC illustrations for the /case-studies overview cards
   (LeadFormVisual is also drawn in the Auroma detail page's Visuals) —
   no screenshots exist yet (website/custom/iot guides §4, Mode B). Each is
   drawn from the entry's own facts (field names, steps, tools), never from
   invented content, and every caller adds a visible "Illustrative" label.
   Nothing here moves (kylezantos-design §1b). The outer element carries
   role="img" + an aria-label; the drawn parts are aria-hidden. All sizes are
   relative so they shrink to 320px without overflow (vrattiks-responsive). */

/* Auroma: the lead form, built from `formFields` and `landingPages`. */
export function LeadFormVisual({
  pages,
  fields,
  label,
}: {
  pages: WebsiteStudy["landingPages"];
  fields: WebsiteStudy["formFields"];
  label: string;
}) {
  return (
    <div role="img" aria-label={label} className="w-full max-w-[360px] rounded-lg border border-n-200 bg-n-0 p-4 shadow-[var(--shadow-lg)] sm:p-5">
      <div aria-hidden="true">
        {pages.length ? (
          <div className="flex gap-1.5 rounded-full bg-n-50 p-1">
            {pages.map((p, i) => (
              <span
                key={p.label}
                className={`flex-1 rounded-full px-3 py-1.5 text-center text-[12.5px] font-semibold ${
                  i === 0 ? "bg-n-0 text-n-900 shadow-[var(--shadow-sm)]" : "text-n-600"
                }`}
              >
                {p.label}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-4 flex flex-col gap-2.5">
          {fields.map((f) => (
            <div key={f.name}>
              <p className="flex items-baseline justify-between gap-2 text-[12.5px] text-n-700">
                <span className="font-medium">
                  {f.name}
                  {f.required ? <span className="text-brand-secondary"> *</span> : <span className="text-n-600"> (optional)</span>}
                </span>
                {f.rule ? <span className="text-[11.5px] text-n-600">{f.rule}</span> : null}
              </p>
              <span className={`mt-1 block rounded-sm border border-n-200 bg-n-25 ${f.required ? "h-8" : "h-12"}`} />
            </div>
          ))}
        </div>
        <span className="mt-4 block h-9 rounded-full bg-brand-secondary/80" />
        <span className="mt-2.5 flex h-9 items-center justify-center gap-2 rounded-full border border-n-200 text-[13px] font-semibold text-n-800">
          <span className="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-brand-secondary" />
          Download Brochure
        </span>
      </div>
    </div>
  );
}

/* Ordered steps as a connected chain — the lead-to-landing-page pipeline. Unlike the others this is REAL text (an
   ordered list), because the order is a stated fact. */
export function StepChain({
  steps,
  tone = "light",
  label,
}: {
  steps: string[];
  tone?: "light" | "dark";
  label: string;
}) {
  const dark = tone === "dark";
  return (
    <ol aria-label={label} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {steps.map((s, i) => (
        <li
          key={s}
          className={`flex items-center gap-3 rounded-md border px-3 py-2.5 text-[14px] ${
            dark ? "border-n-0/15 bg-n-0/5 text-n-100" : "border-n-200 bg-n-0 text-n-800"
          }`}
        >
          <span
            aria-hidden="true"
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold tabular-nums ${
              dark ? "bg-brand-primary text-brand-graphite" : "bg-n-100 text-brand-secondary"
            }`}
          >
            {i + 1}
          </span>
          <span className="min-w-0">{s}</span>
        </li>
      ))}
    </ol>
  );
}

/* Generic line icons for the IoT strip, in step order. */
const flowIcons = ["pulse", "sliders", "zap", "database", "layout", "mail"] as const;

/* IoT: the system's layers as an architecture strip, machine to screen.
   Arrows are drawn, labels come from the entry's diagram layers. */
export function IotFlowVisual({ steps, label }: { steps: string[]; label: string }) {
  return (
    <div role="img" aria-label={label} className="w-full rounded-lg border border-n-200 bg-n-0 p-4">
      <div aria-hidden="true" className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <span key={s} className="relative flex flex-col items-center gap-2 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-n-200 bg-n-50 text-brand-secondary">
              <Icon name={flowIcons[i % flowIcons.length]} className="h-5 w-5" />
            </span>
            <span className="text-[12.5px] font-medium text-n-800">{s}</span>
            {/* no arrow at the end of a 3-up row or after the last step */}
            {i < steps.length - 1 && i % 3 !== 2 ? (
              <span className="absolute top-5 -right-5 hidden text-n-400 sm:block">
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
