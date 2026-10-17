"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/* Tabs: a row of labels over a stack of panels. Reusable for any section:
   the parent stays a server component and passes each panel's content
   already rendered, so only this switching logic ships to the client
   (vrattiks-performance, "Minimise client components"; no library).

   Every panel is in the HTML. Inactive panels carry the `hidden` attribute,
   so screen readers skip them and search engines still read them; the first
   tab is active in the server render. From 901px the panels share one grid
   cell and hidden ones keep their box (globals.css, .tab-stack), so the
   stack is always as tall as the tallest panel and whatever follows the
   tabs never moves when they switch.

   Accessibility (vrattiks-accessibility; WAI-ARIA tabs pattern, manual
   activation): role="tablist" with a name, roving tabindex (only the active
   tab is in the Tab order), Left/Right move focus and wrap, Home/End jump
   to the first and last tab, Enter or Space (native <button>) activates.
   The focus ring is drawn inside the tab, because the scrolling row would
   clip a ring drawn outside it.

   Deep links: `#{id}` opens that tab on load or on a hash change, and the
   section is brought into view; choosing a tab rewrites the hash with
   replaceState, which never scrolls the page.

   Motion (kylezantos-design §1): switching is instant apart from a 150ms
   opacity fade-in, on user action only, never on load. Nothing loops or
   advances by itself; reduced motion drops the fade (globals.css).

   Narrow screens: the row scrolls inside its own track, never the page,
   with snap points and the shared .scroll-row-track edge fades; the active
   or focused tab is scrolled into the visible part of the track. */

export type TabItem = {
  /** Hash and id fragment, e.g. "approach" → #approach */
  id: string;
  label: string;
  content: ReactNode;
};

/* Inactive → hover → active climbs the ramp; the ring colour is the brand
   tone that clears 3:1 on that background. */
const tones = {
  dark: {
    idle: "font-medium text-n-400 hover:text-n-200",
    selected: "font-bold text-n-0",
    divider: "border-n-0/15",
    tabRing: "focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-primary)]",
    panelRing: "focus-visible:outline-brand-primary",
  },
  light: {
    idle: "font-medium text-n-600 hover:text-n-800",
    selected: "font-bold text-n-900",
    divider: "border-n-200",
    tabRing: "focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-secondary)]",
    panelRing: "focus-visible:outline-brand-secondary",
  },
} as const;

export default function Tabs({
  label,
  items,
  idPrefix = "tabs",
  tone = "light",
  className = "",
}: {
  /** Accessible name of the tab list */
  label: string;
  items: TabItem[];
  /** Keeps the tab and panel ids unique when a page has two tab sets */
  idPrefix?: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  /* Set by user action only, so the first paint never fades. */
  const [fade, setFade] = useState(false);
  const [edges, setEdges] = useState({ start: false, end: false });
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = tones[tone];

  const tabId = (id: string) => `${idPrefix}-tab-${id}`;
  const panelId = (id: string) => `${idPrefix}-panel-${id}`;

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft > 1, end: el.scrollLeft < max - 1 });
  }, []);

  /* Horizontal only: scrollIntoView could also move the page vertically.
     `pad` matches the track's scroll-padding (scroll-px-10), so a tab never
     comes to rest under the 32/48px edge fades. offsetLeft is measured
     from the track, which is the tabs' positioned ancestor. */
  const revealTab = useCallback((i: number) => {
    const track = trackRef.current;
    const tab = tabRefs.current[i];
    if (!track || !tab) return;
    const pad = 40;
    const start = tab.offsetLeft - pad;
    const end = tab.offsetLeft + tab.offsetWidth + pad - track.clientWidth;
    /* Out of view → go to the tab's own snap point (its start, less the
       scroll padding); any other position would be snapped back. */
    if (track.scrollLeft > start || track.scrollLeft < end) track.scrollLeft = start;
  }, []);

  /* Open the tab named by the hash; on load and on later hash changes. */
  useEffect(() => {
    const fromHash = () => {
      const i = items.findIndex((item) => `#${item.id}` === window.location.hash);
      if (i < 0) return;
      setActive(i);
      revealTab(i);
      (rootRef.current?.closest("section") ?? rootRef.current)?.scrollIntoView({ block: "start" });
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items, revealTab]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, [measure]);

  const activate = (i: number) => {
    setFade(i !== active);
    setActive(i);
    revealTab(i);
    window.history.replaceState(window.history.state, "", `#${items[i].id}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = tabRefs.current.findIndex((tab) => tab === document.activeElement);
    if (current < 0) return;
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight" ? (current === last ? 0 : current + 1)
      : e.key === "ArrowLeft" ? (current === 0 ? last : current - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : -1;
    if (next < 0) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
  };

  return (
    <div ref={rootRef} className={className}>
      <div
        ref={trackRef}
        onScroll={measure}
        data-fade-start={edges.start ? "" : undefined}
        data-fade-end={edges.end ? "" : undefined}
        className="scroll-row-track relative snap-x snap-proximity scroll-px-10 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className={`flex w-max min-w-full gap-x-7 border-b md:gap-x-9 ${t.divider}`}
        >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(item.id)}
                aria-selected={selected}
                aria-controls={panelId(item.id)}
                tabIndex={selected ? 0 : -1}
                onClick={() => activate(i)}
                /* Keyboard focus only: scrolling the row under a pointer
                   between mousedown and mouseup would swallow the click. */
                onFocus={(e) => e.currentTarget.matches(":focus-visible") && revealTab(i)}
                className={`relative flex min-h-12 shrink-0 snap-start items-center rounded-t-sm font-display text-[17px] leading-tight whitespace-nowrap transition-colors duration-150 outline-none md:text-[18px] ${t.tabRing} ${
                  selected ? t.selected : t.idle
                }`}
              >
                <span className="tab-label" data-label={item.label}>
                  {item.label}
                </span>
                {selected ? (
                  <span aria-hidden="true" className="bg-brand-gradient absolute inset-x-0 -bottom-px h-[3px] rounded-full" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tab-stack mt-8 grid md:mt-10">
        {items.map((item, i) => (
          <div
            key={item.id}
            role="tabpanel"
            id={panelId(item.id)}
            aria-labelledby={tabId(item.id)}
            hidden={i !== active}
            tabIndex={0}
            data-enter={fade && i === active ? "" : undefined}
            className={`min-w-0 rounded-sm outline-none [grid-area:1/1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solid ${t.panelRing}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
