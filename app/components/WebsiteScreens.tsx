import Icon from "./ui/Icon";
import type { LeadAnchor } from "@/app/lib/case-studies";

/* Code-built, ANONYMISED screen recreations for website case studies
   (website-development-case-study.md §4, Mode B). No client copy, logo,
   photo or colour: every block is a neutral-ramp shape, so nothing here can
   be mistaken for a screenshot. Callers wrap them in a <figure> with
   role="img" + an aria-label naming the client, an IllustrativeTag and a
   caption — the shapes themselves are aria-hidden.

   Deliberately unlike the listing's BrowserFrame (traffic-light dots +
   centred address bar) so the detail page doesn't repeat its own card:
   here the desktop frame is a bare bezel with a left-aligned address pill,
   and the phone is a separate device. Sizes are all relative, so the
   recreations scale down to 320px without overflow. */

function Bar({ className = "" }: { className?: string }) {
  return <span className={`block rounded-full ${className}`} />;
}

/* A landing page at desktop width: nav, headline block, image, form strip. */
export function DesktopScreen() {
  return (
    <span aria-hidden="true" className="block overflow-hidden rounded-lg border border-n-200 bg-n-0 shadow-[var(--shadow-lg)]">
      <span className="flex h-8 items-center gap-3 border-b border-n-100 bg-n-50 px-3 sm:h-9">
        <span className="h-4 w-[38%] max-w-[220px] rounded-full border border-n-200 bg-n-0" />
      </span>
      <span className="block aspect-[16/10] p-[5%]">
        <span className="flex items-center justify-between">
          <Bar className="h-2 w-[16%] bg-n-300" />
          <span className="flex w-[36%] gap-[8%]">
            <Bar className="h-1.5 flex-1 bg-n-100" />
            <Bar className="h-1.5 flex-1 bg-n-100" />
            <Bar className="h-1.5 flex-1 bg-n-100" />
          </span>
        </span>
        <span className="mt-[6%] grid h-[62%] grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-[5%]">
          <span className="flex flex-col justify-center gap-[9%]">
            <Bar className="h-2.5 w-[90%] bg-n-300 sm:h-3" />
            <Bar className="h-2.5 w-[64%] bg-n-300 sm:h-3" />
            <Bar className="h-1.5 w-[80%] bg-n-100" />
            <Bar className="h-1.5 w-[70%] bg-n-100" />
            <span className="mt-[4%] block h-4 w-[42%] rounded-full bg-brand-secondary/70 sm:h-5" />
          </span>
          <span className="bg-grid-fade relative block overflow-hidden rounded-md bg-n-50">
            <span className="absolute inset-x-[12%] bottom-0 h-[46%] rounded-t-md bg-n-100" />
            <span className="absolute bottom-[46%] left-[22%] h-0 w-0 border-x-[40px] border-b-[28px] border-x-transparent border-b-n-200 max-sm:border-x-[24px] max-sm:border-b-[16px]" />
          </span>
        </span>
        <span className="mt-[5%] flex h-[10%] items-center gap-[3%] rounded-md border border-n-100 px-[3%]">
          <Bar className="h-1.5 flex-1 bg-n-100" />
          <Bar className="h-1.5 flex-1 bg-n-100" />
          <span className="block h-[60%] w-[18%] rounded-full bg-n-200" />
        </span>
      </span>
    </span>
  );
}

/* A landing page at phone width. `variant` swaps the order of the hero so
   two audience pages read as two pages, not one picture twice. */
export function PhoneScreen({ variant = "a", className = "" }: { variant?: "a" | "b"; className?: string }) {
  const image = (
    <span className="bg-grid-fade relative block aspect-[4/3] overflow-hidden rounded-md bg-n-50">
      <span className="absolute inset-x-[14%] bottom-0 h-[44%] rounded-t-sm bg-n-100" />
    </span>
  );
  const copy = (
    <span className="flex flex-col gap-2">
      <Bar className="h-2 w-[88%] bg-n-300" />
      <Bar className="h-2 w-[60%] bg-n-300" />
      <Bar className="h-1.5 w-[80%] bg-n-100" />
    </span>
  );

  return (
    <span
      aria-hidden="true"
      className={`block rounded-xl border border-n-200 bg-n-0 p-1.5 shadow-[var(--shadow-lg)] ${className}`}
    >
      <span className="flex aspect-[9/17] flex-col gap-3 overflow-hidden rounded-lg bg-n-0 p-3">
        <span className="mx-auto mb-1 block h-1 w-[30%] rounded-full bg-n-200" />
        {variant === "a" ? (
          <>
            {image}
            {copy}
          </>
        ) : (
          <>
            {copy}
            <span className="grid grid-cols-3 gap-1.5">
              <span className="aspect-square rounded-sm bg-n-50" />
              <span className="aspect-square rounded-sm bg-n-50" />
              <span className="aspect-square rounded-sm bg-n-50" />
            </span>
          </>
        )}
        <span className="mt-auto flex flex-col gap-1.5">
          <span className="h-5 rounded-sm border border-n-200" />
          <span className="h-5 rounded-sm border border-n-200" />
          <span className="h-6 rounded-full bg-brand-secondary/70" />
        </span>
      </span>
    </span>
  );
}

/* Numbered marker drawn on the screen. Decorative: the ordered list next to
   the screen carries the same numbers and the real text. */
function Marker({ n }: { n?: number }) {
  if (!n) return null;
  return (
    <span className="absolute -top-3 -left-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-n-0 bg-brand-secondary font-body text-[12.5px] font-semibold text-n-0 shadow-[var(--shadow-md)] tabular-nums">
      {n}
    </span>
  );
}

/* A landing page with its enquiry form — the canvas for the lead path.
   `markers` maps each anchor to the step number that points at it; anchors
   with no step get no marker. */
export function AnnotatedLanding({ markers }: { markers: Partial<Record<LeadAnchor, number>> }) {
  return (
    <span aria-hidden="true" className="relative block pb-[14%]">
      <span className="block overflow-hidden rounded-lg border border-n-200 bg-n-0 shadow-[var(--shadow-lg)]">
        <span className="flex h-8 items-center border-b border-n-100 bg-n-50 px-3">
          <span className="h-4 w-[38%] max-w-[200px] rounded-full border border-n-200 bg-n-0" />
        </span>
        <span className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:p-6">
          {/* Landing page hero */}
          <span className="relative flex flex-col gap-3">
            <Marker n={markers.page} />
            <span className="bg-grid-fade relative block aspect-[16/9] overflow-hidden rounded-md bg-n-50">
              <span className="absolute inset-x-[14%] bottom-0 h-[42%] rounded-t-sm bg-n-100" />
            </span>
            <Bar className="h-2.5 w-[86%] bg-n-300" />
            <Bar className="h-2.5 w-[58%] bg-n-300" />
            <Bar className="h-1.5 w-[76%] bg-n-100" />
          </span>

          {/* Brochure form */}
          <span className="relative flex flex-col gap-2.5 rounded-md border border-n-200 bg-n-25 p-4">
            <Marker n={markers.form} />
            <Bar className="mb-1 h-2 w-[54%] bg-n-300" />
            <span className="h-8 rounded-sm border border-n-200 bg-n-0" />
            {/* A field in its error state — validation, in the error colour
                for its assigned meaning (docs/index.html §3). */}
            <span className="relative flex flex-col gap-1">
              <Marker n={markers.validation} />
              <span className="h-8 rounded-sm border-[1.5px] border-sem-error bg-n-0" />
              <Bar className="h-1.5 w-[48%] bg-sem-error/70" />
            </span>
            <span className="h-8 rounded-sm border border-n-200 bg-n-0" />
            <span className="mt-1 h-9 rounded-full bg-brand-secondary/80" />
            <span className="relative mt-1 flex items-center gap-2 rounded-sm border border-dashed border-n-300 px-3 py-2">
              <Marker n={markers.download} />
              <span className="flex h-6 w-5 shrink-0 items-end justify-center rounded-xs border border-n-300 bg-n-0 pb-0.5">
                <span className="h-0 w-0 border-x-[4px] border-t-[4px] border-x-transparent border-t-brand-secondary" />
              </span>
              <Bar className="h-1.5 flex-1 bg-n-200" />
            </span>
          </span>
        </span>
      </span>

      {/* The notification email the client receives — overlaps the page so
          it reads as "what happens next", off the visitor's screen. */}
      <span className="absolute bottom-0 left-[6%] w-[62%] max-w-[300px] rounded-md border border-n-200 bg-n-0 p-3 shadow-[var(--shadow-lg)] sm:p-4">
        <Marker n={markers.email} />
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-n-50 text-brand-secondary">
            <Icon name="mail" className="h-4 w-4" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Bar className="h-2 w-[70%] bg-n-300" />
            <Bar className="h-1.5 w-[90%] bg-n-100" />
          </span>
        </span>
      </span>
    </span>
  );
}
