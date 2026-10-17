"use client";

import { Children, isValidElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ScrollRow from "./ScrollRow";

/* Horizontal pixels the cards move per vertical pixel scrolled.
   Raise to make the section shorter, lower to make it slower. */
const SCROLL_SPEED = 1.4;

/* A horizontal row of equal cards that, on desktop, pins directly under the
   site header while the page scrolls DOWN and slides its cards right to
   left until the last one is fully in view, then releases. Reusable: the
   parent stays a server component and passes its heading as `header` and
   its cards as children, exactly as with ScrollRow.

   Modes, decided by measuring (never by guessing):
   - "pinned": desktop (≥1024px), fine pointer with hover, no
     prefers-reduced-motion, the cards overflow the content width, and the
     whole block (heading, cards, progress bar) can be SIZED to fit the
     viewport under the header (see `measure`).
   - otherwise "native": the existing ScrollRow (snap, arrow buttons,
     peek-in), which is also what the server renders, so the row works
     before JavaScript loads. If every card fits, ScrollRow shows a static
     row with no buttons.

   Fitting (user brief, 2026-10-17): the pinned block is sized, never
   cropped. 1) natural size; 2) if too tall, only the cards' media shrinks,
   by the same amount on every card so titles stay aligned (children mark
   it `data-pin-media` and size it with var(--pin-media-h)); 3) if the
   media would lose more than KEEP_MEDIA of its height, the root gets
   `data-clamp` so children can clamp long text (WebsiteBento
   clamps the description to 3 lines; the full text stays in the HTML and
   on the detail page); 4) only if the media would still fall under
   MIN_MEDIA does the row stay native. The block is content height, capped
   at 100svh minus the header, so tall screens get no empty band after it.

   Motion (kylezantos-design §1b): the skill's "no pinned sections" default
   is overridden by the user's brief; everything else in §1b holds. Nothing
   moves on its own. The track moves only with the visitor's scroll,
   through a passive listener and one translate3d per animation frame, with
   no easing, so it never lags behind. No preventDefault, no wheel or touch
   handling, no page lock; scrolling up reverses the movement. will-change
   is set only while the pin is active.

   Accessibility (vrattiks-accessibility, "Keyboard navigation" + "Visible
   focus states"): every card stays in the DOM in data order and in the tab
   order, inside a region named by `label`. When a card takes focus outside
   the visible part of the track, the PAGE scrolls to the position that
   shows it. The same mapping serves /case-studies#{slug} anchors. The
   progress bar and counter are decorative (aria-hidden). */

/* Desktop with a mouse/trackpad and no reduced-motion request. */
const QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
/* Clamp text once the media would keep less than this share of its height. */
const KEEP_MEDIA = 0.6;
/* Below this media height (px) the pinned card is too cramped: stay native. */
const MIN_MEDIA = 96;

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, max: number) => Math.min(max, Math.max(0, v));

export default function PinnedRow({
  label,
  itemLabel,
  header,
  children,
}: {
  /** Accessible name of the track, e.g. "Website projects" */
  label: string;
  /** Singular noun for the fallback's button names: "Previous project" */
  itemLabel: string;
  /** Heading block. Rendered inside an element with `data-pinned` while
      pinned, so it can adapt its own layout (Tailwind `in-data-pinned:`). */
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  /* "probe" renders the pinned markup once, before paint, to measure it. */
  const [mode, setMode] = useState<"native" | "probe" | "pinned">("native");
  const [shown, setShown] = useState(1);

  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const hashDone = useRef(false);
  /* Pin geometry, read on every scroll frame without re-rendering. */
  const geo = useRef({ top: 0, travel: 0, visible: 0, thumb: 1, rights: [] as number[] });

  const items = Children.toArray(children);
  const count = items.length;

  /* Scroll position → track position. `d` is how far the page has scrolled
     past the pin start; the track moves d × SCROLL_SPEED. */
  const update = useCallback(() => {
    const root = rootRef.current;
    const list = listRef.current;
    if (!root || !list) return;
    const g = geo.current;
    const d = g.top - root.getBoundingClientRect().top;
    /* Snapped to device pixels so card text stays crisp mid-travel. */
    const dpr = window.devicePixelRatio || 1;
    const t = Math.round(clamp(d * SCROLL_SPEED, g.travel) * dpr) / dpr;
    const p = g.travel ? t / g.travel : 0;

    list.style.transform = `translate3d(${-t}px, 0, 0)`;
    list.style.willChange = d > 0 && t < g.travel ? "transform" : "";
    if (thumbRef.current) {
      thumbRef.current.style.transform = `translate3d(${((p * (1 - g.thumb)) / g.thumb) * 100}%, 0, 0)`;
    }
    /* Counter = cards fully seen so far: "03 / 14" at the start, "14 / 14"
       exactly when the last card is fully in view. */
    setShown(Math.max(1, g.rights.filter((r) => r <= t + g.visible + 1).length));
  }, []);

  const measure = useCallback(() => {
    const root = rootRef.current;
    const box = frameRef.current;
    const list = listRef.current;
    if (!root || !box || !list) return;
    if (!window.matchMedia(QUERY).matches) return setMode("native");

    /* The real header height (64px mobile, 80px + border from md up). */
    const headerH = document.querySelector("header")?.offsetHeight ?? 0;
    const room = window.innerHeight - headerH;
    const visible = list.clientWidth;
    const lis = Array.from(list.children) as HTMLElement[];
    const last = lis[lis.length - 1];
    /* Last card's right edge lands on the right content edge. */
    const travel = last ? Math.max(0, Math.round(last.offsetLeft + last.offsetWidth - visible)) : 0;
    if (travel <= 1) return setMode("native");

    /* Fit to `room` by sizing (user brief, problem 1). `over` = how much
       taller than the room the block is at natural card height. */
    const media = list.querySelector<HTMLElement>("[data-pin-media]");
    const fit = (clampText: boolean) => {
      root.toggleAttribute("data-clamp", clampText);
      root.style.removeProperty("--pin-media-h");
      const over = Math.ceil(box.getBoundingClientRect().height - room);
      return { over, natural: media?.offsetHeight ?? 0 };
    };
    let f = fit(false);
    if (f.over > 0 && f.natural - f.over < f.natural * KEEP_MEDIA) f = fit(true);
    if (f.over > 0) {
      if (f.natural - f.over < MIN_MEDIA) return setMode("native");
      root.style.setProperty("--pin-media-h", `${f.natural - f.over}px`);
    }
    const frameH = Math.ceil(box.getBoundingClientRect().height);
    if (frameH > room) return setMode("native");

    /* Wrapper height = pinned block + travel / SCROLL_SPEED, so the pin
       releases exactly when the last card is fully in view. */
    const thumb = visible / (visible + travel);
    geo.current = { top: headerH, travel, visible, thumb, rights: lis.map((li) => li.offsetLeft + li.offsetWidth) };
    root.style.height = `${Math.ceil(frameH + travel / SCROLL_SPEED)}px`;
    box.style.top = `${headerH}px`;
    if (thumbRef.current) thumbRef.current.style.width = `${thumb * 100}%`;
    setMode("pinned");
    update();
  }, [update]);

  /* Scroll the page so the track shows `li`, always to a position inside
     the pin, so the whole card is in view vertically too (the browser's
     own focus scroll only brings the link itself into view, which can
     leave the card's top under the header). `force` also scrolls when the
     row is already pinned on that card (anchor links). */
  const reveal = useCallback((li: HTMLElement, force = false) => {
    const root = rootRef.current;
    if (!root) return;
    const g = geo.current;
    const d = g.top - root.getBoundingClientRect().top;
    const t = clamp(d * SCROLL_SPEED, g.travel);
    const x = li.offsetLeft;
    const w = li.offsetWidth;
    let next = t;
    if (x < t) next = x;
    else if (x + w > t + g.visible) next = x + w - g.visible;
    next = clamp(next, g.travel);
    const outside = d < 0 || d > g.travel / SCROLL_SPEED;
    if (Math.abs(next - t) > 0.5 || outside || force) {
      /* The page scrolls in whole pixels and each one moves the track
         SCROLL_SPEED px, so round toward the side that keeps the card in. */
      const y = window.scrollY + next / SCROLL_SPEED - d;
      window.scrollTo({ top: next < t ? Math.floor(y) : Math.ceil(y) });
    }
  }, []);

  /* Switch modes as the media query or viewport changes. A row that was
     native because it fitted (or was too cramped) is re-probed after
     resizing settles; a pinned row re-measures itself (below). */
  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useLayoutEffect(() => {
    const mq = window.matchMedia(QUERY);
    const probe = () => {
      if (mq.matches && modeRef.current === "native") setMode("probe");
    };
    const onChange = () => setMode(mq.matches ? "probe" : "native");
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(probe, 150);
    };
    probe();
    mq.addEventListener("change", onChange);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(probe);
    return () => {
      clearTimeout(timer);
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Measuring the probe and committing the result before paint is exactly
     what a layout effect is for: the visitor never sees the probe frame. */
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- DOM measurement before paint
    if (mode === "probe") measure();
  }, [mode, measure]);

  useEffect(() => {
    if (mode !== "pinned") return;
    const schedule = (fn: () => void) => () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(fn);
    };
    const onScroll = schedule(update);
    const onResize = schedule(measure);
    /* Widths and heights change on resize, font swap and image decode. */
    const observer = new ResizeObserver(onResize);
    [frameRef.current, listRef.current, document.querySelector("header")].forEach((el) => el && observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    document.fonts?.ready.then(measure);

    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      const li = target && listRef.current?.contains(target) ? target.closest("li") : null;
      if (li) reveal(li, true);
    };
    /* Honour a card hash once, on the first pin after load. */
    if (!hashDone.current) {
      hashDone.current = true;
      onHash();
    }
    window.addEventListener("hashchange", onHash);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      window.removeEventListener("hashchange", onHash);
    };
  }, [mode, update, measure, reveal]);

  if (mode === "native") {
    return (
      <ScrollRow label={label} itemLabel={itemLabel} header={header}>
        {children}
      </ScrollRow>
    );
  }

  return (
    /* Tall wrapper (height set in `measure`) with a sticky frame pinned at
       the real header height (user brief, problem 2). pt-6/pb-6 are the
       frame's own gaps; WebsiteBento trims its Section padding to match. */
    <div ref={rootRef} data-pinned="" className="relative">
      <div ref={frameRef} className="sticky pt-6 pb-6">
        {header}
        {/* No overflow here: the track runs full-bleed and the Section's
            overflow-x-clip trims it at the viewport edge, so the page never
            scrolls sideways and nothing is a hidden scroller that focus
            could shift. Focus is handled one frame later, after the
            browser's own scroll-into-view. */}
        <div
          role="region"
          aria-label={label}
          className="mt-6"
          onFocus={(e) => {
            const li = (e.target as HTMLElement).closest("li");
            if (li) requestAnimationFrame(() => reveal(li));
          }}
        >
          {/* `relative` makes the list the cards' offsetParent, so
              offsetLeft is measured in track coordinates. */}
          <ul ref={listRef} className="relative flex gap-5">
            {items.map((child, i) => (
              <li key={isValidElement(child) && child.key !== null ? child.key : i} className="flex w-[31%] shrink-0">
                {child}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true" className="mt-4 flex items-center gap-4">
          <div className="h-0.5 w-full max-w-60 overflow-hidden rounded-full bg-n-200">
            <div ref={thumbRef} className="h-full rounded-full bg-brand-secondary" />
          </div>
          <span className="font-body text-[13px] font-semibold text-n-600 tabular-nums">
            {pad(shown)} / {pad(count)}
          </span>
        </div>
      </div>
    </div>
  );
}
