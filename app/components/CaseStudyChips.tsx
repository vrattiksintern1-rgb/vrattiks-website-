import Icon from "./ui/Icon";
import type { StatusPill as StatusPillValue } from "@/app/lib/case-studies";

/* Small shared pieces for the /case-studies overview bento cards.

   `surface` says what the chip sits on, so text keeps its contrast in both
   themes (vrattiks-accessibility, "Contrast"):
   - "light": page tones and outlined tiles (n-* ramp flips with the theme)
   - "dark": graphite tiles (the light ramp is restored inside them)
   - "lavender": brand-primary tiles — constant in both themes, so text is
     graphite, never n-900 (which turns light in dark mode)
   - "violet": brand-secondary tiles — n-0 text, which is white in light
     mode and near-black in dark mode, matching the lighter dark-mode violet */
export type Surface = "light" | "dark" | "lavender" | "violet";

const chipTone: Record<Surface, string> = {
  light: "border-n-200 text-n-700",
  dark: "border-n-0/15 text-n-200",
  lavender: "border-brand-graphite/25 text-brand-graphite",
  violet: "border-n-0/35 text-n-0",
};

export function Chips({
  items,
  surface = "light",
  label,
  className = "",
}: {
  items: string[];
  surface?: Surface;
  /* screen-reader name for the list, e.g. "Features" */
  label: string;
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className={`rounded-full border px-3 py-1 text-[13px] leading-[1.4] font-medium ${chipTone[surface]}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* Status pill. Semantic colours only for their assigned meaning
   (docs/index.html §3): info = in progress, warning = sample / not real. */
export function StatusPill({ value, surface = "light" }: { value: StatusPillValue; surface?: Surface }) {
  const tone =
    value === "Final setup in progress"
      ? "bg-sem-info-bg text-sem-info-text"
      : value === "Sample (illustrative)"
        ? "border border-sem-warning/50 bg-sem-warning-bg text-sem-warning-text"
        : surface === "dark"
          ? "border border-n-0/20 text-n-0"
          : surface === "lavender"
            ? "border border-brand-graphite/30 text-brand-graphite"
            : surface === "violet"
              ? "border border-n-0/40 text-n-0"
              : value === "Internal tool"
                ? "bg-n-100 text-n-800"
                : "border border-n-200 bg-n-0 text-n-800";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold whitespace-nowrap ${tone}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="sr-only">Status: </span>
      {value}
    </span>
  );
}

/* "Sample" — on every card, tile and visual of a sample entry, so it can't
   be mistaken for real work at a glance (user brief 2026-10-10;
   vrattiks-standards §3). Warning colours pass 4.5:1 in both themes. */
export function SampleTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-sem-warning/50 bg-sem-warning-bg px-2.5 py-1 font-body text-label font-semibold tracking-[0.12em] text-sem-warning-text uppercase ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sem-warning" />
      Sample
    </span>
  );
}

/* The circular arrow button from the reference's cards. Decorative: it sits
   inside a card that is itself the link, so the link text names the
   destination (vrattiks-accessibility, "Accessible buttons/links"). */
export function ArrowCircle({ surface = "light" }: { surface?: Surface }) {
  const tone =
    surface === "dark"
      ? "border-n-0/25 text-n-0"
      : surface === "lavender"
        ? "border-brand-graphite/30 text-brand-graphite"
        : surface === "violet"
          ? "border-n-0/40 text-n-0"
          : "border-n-200 text-brand-secondary";
  return (
    <span
      aria-hidden="true"
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${tone}`}
    >
      <Icon name="arrowUpRight" className="h-5 w-5" />
    </span>
  );
}

/* The reference's small corner accent square — one per tile at most,
   decorative. */
export function CornerAccent({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`absolute h-3 w-3 rounded-xs bg-brand-secondary ${className}`} />;
}
