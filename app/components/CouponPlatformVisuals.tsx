import Icon from "./ui/Icon";
import type { CustomStudy } from "@/app/lib/case-studies";

/* Code-built, STATIC illustrations for the coupon-platform case study
   (custom-development guide §4.2, Mode B: no screenshots exist). Each is
   drawn from the entry's own data — its steps, its four parts and its
   sample message — and the caller puts a visible "Illustrative" chip on
   each one (guide §4; vrattiks-standards §3). Nothing moves
   (kylezantos-design §1b). Sizes are relative, so all three shrink to
   320px without overflow (vrattiks-responsive §2). */

/* The 8-step flow as a workflow trace (guide §8: the ordered list IS the
   content; the arrows are styling and stay aria-hidden). 4-up from lg, so
   the flow reads as two rows of four; 2-up, then 1-up below that. */
export function FlowTrace({ steps, label }: { steps: CustomStudy["solution"]; label: string }) {
  return (
    <ol aria-label={label} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex min-w-0 flex-col gap-3 rounded-md border border-n-200 bg-n-0 p-4">
          <span className="flex items-center justify-between gap-3">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-n-100 text-[13px] font-semibold text-brand-secondary tabular-nums"
            >
              {i + 1}
            </span>
            {s.tool ? <span className="truncate text-[12.5px] font-medium text-n-600">{s.tool}</span> : null}
          </span>
          <span className="text-[15px] leading-[1.35] font-semibold text-n-900">{s.title}</span>
          {/* connector to the next node, inside the 16px gap; none at a
              row's end (every 4th) or after the last step */}
          {i < steps.length - 1 && i % 4 !== 3 ? (
            <span aria-hidden="true" className="absolute top-[22px] -right-4 hidden w-4 justify-center text-n-400 lg:flex">
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* Which wireframe each of the four parts gets, in the order of `features`. */
const panelKinds = ["table", "search", "coupons", "chat"] as const;

function Wireframe({ kind }: { kind: (typeof panelKinds)[number] }) {
  if (kind === "table") {
    return (
      <span className="flex flex-col gap-1.5">
        <span className="flex gap-1.5">
          <span className="h-5 flex-1 rounded-xs bg-n-100" />
          <span className="h-5 w-10 rounded-xs bg-brand-secondary/70" />
        </span>
        {[0, 1, 2].map((r) => (
          <span key={r} className="flex gap-1.5">
            <span className="h-2 w-[38%] rounded-full bg-n-200" />
            <span className="h-2 w-[24%] rounded-full bg-n-200" />
            <span className="h-2 flex-1 rounded-full bg-n-100" />
          </span>
        ))}
      </span>
    );
  }
  if (kind === "search") {
    return (
      <span className="flex flex-col gap-1.5">
        <span className="flex h-6 items-center gap-1.5 rounded-sm border border-n-200 px-2 text-n-400">
          <Icon name="search" className="h-3 w-3" />
          <span className="h-1.5 w-[40%] rounded-full bg-n-200" />
        </span>
        {[0, 1].map((r) => (
          <span key={r} className="flex items-center gap-1.5 rounded-sm bg-n-50 px-2 py-1.5">
            <span className="h-2 flex-1 rounded-full bg-n-200" />
            <span className="h-4 w-12 rounded-full bg-brand-secondary/70" />
          </span>
        ))}
      </span>
    );
  }
  if (kind === "coupons") {
    return (
      <span className="mx-auto flex w-[64%] flex-col gap-1.5 rounded-md border border-n-200 p-1.5">
        {[0, 1].map((r) => (
          <span key={r} className="flex items-center gap-1.5 rounded-sm border border-dashed border-n-300 px-2 py-1.5">
            <span className="h-3 w-3 shrink-0 rounded-full bg-brand-primary" />
            <span className="h-1.5 flex-1 rounded-full bg-n-200" />
          </span>
        ))}
      </span>
    );
  }
  return (
    <span className="flex flex-col gap-1.5">
      <span className="h-5 w-[72%] rounded-md rounded-tl-xs bg-n-100" />
      <span className="h-5 w-[56%] rounded-md rounded-tl-xs bg-n-100" />
      <span className="h-5 w-[44%] self-end rounded-md rounded-tr-xs bg-brand-primary/60" />
    </span>
  );
}

/* The four parts side by side, each as a small outlined screen with its
   real name as text and a wireframe that hints at its job. */
export function PanelsOverview({ parts, label }: { parts: string[]; label: string }) {
  return (
    <ul aria-label={label} className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
      {parts.map((name, i) => (
        <li key={name} className="flex min-w-0 flex-col overflow-hidden rounded-md border border-n-200 bg-n-0">
          <span className="flex items-center gap-1.5 border-b border-n-200 bg-n-50 px-3 py-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-n-300" />
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-n-300" />
            <span className="ml-1 truncate text-[12.5px] font-semibold text-n-800">{name}</span>
          </span>
          <span aria-hidden="true" className="block p-3">
            <Wireframe kind={panelKinds[i % panelKinds.length]} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/* A phone-style chat with ONE incoming message carrying a coupon. Sample
   text only; the sender is named in text for screen readers, not by bubble
   side or colour alone (guide §8). Neutral tokens — no messaging brand's
   colours or logo. */
export function MessageMock({ message }: { message: NonNullable<CustomStudy["sampleMessage"]> }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-xl border border-n-200 bg-n-0 p-2.5 shadow-[var(--shadow-lg)]">
      <div className="overflow-hidden rounded-lg bg-n-50">
        <div className="flex items-center gap-2.5 border-b border-n-200 bg-n-0 px-4 py-3">
          <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-brand-graphite">
            <Icon name="bag" className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold text-n-900">{message.sender}</span>
            <span className="block text-[12px] text-n-600">Sample message</span>
          </span>
        </div>
        <ul className="flex flex-col gap-2 px-3 pt-4 pb-5">
          <li className="mr-6 rounded-lg rounded-tl-xs border border-n-200 bg-n-0 p-3 text-[13.5px] leading-[1.5] text-n-800">
            <span className="sr-only">{message.sender}: </span>
            {message.lines.map((l) => (
              <span key={l} className="block [&+&]:mt-1.5">
                {l}
              </span>
            ))}
            <span className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-sm border border-dashed border-brand-secondary/60 px-3 py-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-n-600 uppercase">Coupon</span>
              <span className="text-[13px] font-semibold break-all text-brand-secondary">{message.code}</span>
            </span>
            {/* Drawn as a link, not a real one: nothing to open. */}
            <span className="mt-2.5 flex items-center justify-center gap-1.5 border-t border-n-200 pt-2.5 text-[13px] font-semibold text-brand-secondary">
              {message.link}
              <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
