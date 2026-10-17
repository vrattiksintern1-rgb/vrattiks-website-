"use client";

import { Children, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

/* A horizontal row of equal cards that scrolls natively, plus the only bits
   that need the client: Previous/Next buttons, their disabled state and a
   progress hairline. Reusable for any section: the parent stays a server
   component and passes its heading as `header` and its cards as children.

   Motion (kylezantos-design §1b): nothing moves on its own. No autoplay, no
   looping, no auto-scroll, and the vertical wheel is never intercepted:
   trackpad, touch, shift + wheel and the arrow keys (once the region has
   focus) all scroll the row natively. The buttons scroll by one card,
   smoothly unless prefers-reduced-motion is set, then instantly.

   Accessibility (vrattiks-accessibility, "Keyboard navigation" + "ARIA only
   when needed"): the scroller is a named region with tabIndex 0, so keyboard
   users can focus it and scroll it with the arrow keys. Its focus ring is
   drawn on the unmasked wrapper (.scroll-row in globals.css), because the
   edge fade mask would clip a ring drawn on the scroller itself. The buttons
   are real <button>s and use aria-disabled (not `disabled`), so focus isn't
   lost when the row reaches an end. The progress bar is decorative.

   Performance (vrattiks-performance, "Minimise client components"): no
   library; scroll updates are batched to one per animation frame. */

const cardWidth = "w-[85%] sm:w-[46%] lg:w-[31%]";

const arrowButton =
  "focus-glow flex h-11 w-11 items-center justify-center rounded-full border border-n-200 bg-n-0 text-n-900 transition-[border-color,box-shadow,opacity] duration-150 ease-out";

export default function ScrollRow({
  label,
  itemLabel,
  header,
  children,
  className = "",
}: {
  /** Accessible name of the scroll region, e.g. "Website projects" */
  label: string;
  /** Singular noun for the button names: "Previous project" / "Next project" */
  itemLabel: string;
  /** Heading block, rendered in the header row next to the buttons */
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  /* Before hydration the row is assumed to overflow and to sit at its start,
     which is how it loads with four or more cards on any screen. */
  const [state, setState] = useState({ fits: false, atStart: true, atEnd: false, thumb: 1, offset: 0 });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const fits = max <= 1;
    const progress = fits ? 0 : Math.min(1, Math.max(0, el.scrollLeft / max));
    const thumb = fits ? 1 : el.clientWidth / el.scrollWidth;
    setState({
      fits,
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft >= max - 1,
      thumb,
      offset: progress * (1 - thumb),
    });
  }, []);

  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(measure);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    /* Re-measure when the scroller or its content changes size (resize,
       font swap, images decoding). */
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  /* One card plus the gap, read from the layout so it follows the
     breakpoint widths above. */
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const list = el?.firstElementChild;
    const first = list?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const second = list?.children[1] as HTMLElement | undefined;
    const by = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * by, behavior: reduce ? "auto" : "smooth" });
  };

  const buttons = [
    { dir: -1 as const, disabled: state.atStart, name: `Previous ${itemLabel}`, icon: "arrowLeft" as const },
    { dir: 1 as const, disabled: state.atEnd, name: `Next ${itemLabel}`, icon: "arrowRight" as const },
  ];

  return (
    <div className={className}>
      {/* Header row: heading on the left, buttons on the right. On narrow
          screens the buttons wrap under the heading rather than squeezing it. */}
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <div className="min-w-0 flex-[1_1_20rem]">{header}</div>
        {state.fits ? null : (
          <div className="flex shrink-0 gap-2">
            {buttons.map((b) => (
              <button
                key={b.dir}
                type="button"
                aria-label={b.name}
                aria-disabled={b.disabled}
                onClick={() => !b.disabled && step(b.dir)}
                className={`${arrowButton} ${
                  b.disabled ? "cursor-not-allowed opacity-40" : "hover:border-brand-primary hover:shadow-[var(--shadow-glow)]"
                }`}
              >
                <Icon name={b.icon} className="h-4.5 w-4.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="scroll-row mt-10 rounded-xl md:mt-12">
        {/* Snap and overscroll containment (kylezantos-design §1b: native
            scrolling, nothing hijacked). The 4px inline padding, cancelled by
            the negative margin, keeps the first and last card borders off the
            clip edge; scroll-padding matches it so a snapped card lines up
            with the section's content edge, never clipped at the start. The
            native scrollbar is hidden because the progress bar and buttons
            replace it; every native input still scrolls. */}
        <div
          ref={trackRef}
          role="region"
          aria-label={label}
          tabIndex={0}
          onScroll={onScroll}
          data-fade-start={state.atStart ? undefined : ""}
          data-fade-end={state.atEnd ? undefined : ""}
          className="scroll-row-track -mx-1 snap-x snap-mandatory scroll-px-1 overflow-x-auto overscroll-x-contain px-1 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex gap-4 md:gap-5">
            {Children.toArray(children).map((child, i) => (
              <li key={isValidElement(child) && child.key !== null ? child.key : i} className={`flex shrink-0 snap-start ${cardWidth}`}>
                {child}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progress: a hairline track with a thumb sized to the visible part.
          Static styling, no transition; decorative only. */}
      {state.fits ? null : (
        <div aria-hidden="true" className="mt-6 h-0.5 w-full max-w-60 overflow-hidden rounded-full bg-n-200">
          <div
            className="h-full rounded-full bg-brand-secondary"
            style={{ width: `${state.thumb * 100}%`, transform: `translateX(${(state.offset / state.thumb) * 100}%)` }}
          />
        </div>
      )}
    </div>
  );
}
