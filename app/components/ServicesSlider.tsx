"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import Icon from "./ui/Icon";
import { services } from "@/app/lib/content";

const AUTOPLAY_MS = 3500;
const n = services.length;

/* The list is rendered three times so the track can loop forever: we always
   rest inside the middle copy, and when a scroll settles in the first or last
   copy we jump silently by one copy's width (the cards there are identical,
   so the jump is invisible). The outer copies are `inert` + aria-hidden, so
   keyboard and screen-reader users only ever meet each service once. */
const slides = [0, 1, 2].flatMap((copy) =>
  services.map((service, i) => ({ service, i, copy, key: `${copy}-${service.slug}` }))
);

/* Home-page variant of the services list: a native scroll-snap track (touch
   swipe, trackpad and keyboard focus all scroll it for free) that centres one
   card at a time and advances on its own. The centred card is scaled up
   slightly — a client request; it's an active-slide state, not a hover
   effect, so the "no scale on hover" rule still holds for the cards. */
export default function ServicesSlider() {
  const trackRef = useRef<HTMLUListElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(n);
  /* null until the user presses play/pause; until then reduced-motion users
     start paused and everyone else starts playing. */
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const playing = userPlaying ?? !reduceMotion;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const slideAt = (index: number) =>
    trackRef.current?.children[index] as HTMLElement | undefined;

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      const track = trackRef.current;
      const slide = track?.children[index] as HTMLElement | undefined;
      if (!track || !slide) return;
      track.scrollTo({
        left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
        behavior: smooth && !reduceMotion ? "smooth" : "auto",
      });
    },
    [reduceMotion]
  );

  /* The slide whose centre is nearest the track's centre is the active one.
     Uses offsetLeft, which ignores the scale transform, so zooming the
     active card never feeds back into which card is active. */
  const nearestIndex = () => {
    const track = trackRef.current;
    if (!track) return n;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  };

  // Start centred on the first card of the middle copy.
  useEffect(() => {
    scrollToIndex(n, false);
  }, [scrollToIndex]);

  // Keep the active card centred when the viewport is resized.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => scrollToIndex(nearestIndex(), false));
    observer.observe(track);
    return () => observer.disconnect();
  }, [scrollToIndex]);

  const onScroll = () => {
    const index = nearestIndex();
    setActive(index);
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const track = trackRef.current;
      const first = slideAt(0);
      const second = slideAt(n);
      if (!track || !first || !second) return;
      const copyWidth = second.offsetLeft - first.offsetLeft;
      const settled = nearestIndex();
      if (settled < n) track.scrollLeft += copyWidth;
      else if (settled >= 2 * n) track.scrollLeft -= copyWidth;
    }, 140);
  };

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  // Only autoplay while the slider is on screen and the tab is visible.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(track);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  /* One timeout per active slide rather than a fixed interval: any manual
     swipe or click changes `active` and so restarts the countdown, which
     keeps autoplay from yanking the track straight after user input. */
  const autoplay = playing && !hovered && !focused && inView && pageVisible;
  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => scrollToIndex(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, active, scrollToIndex]);

  const current = active % n;
  const goTo = (i: number) => scrollToIndex(active - current + i);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Services"
      className="mt-10 md:mt-12"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      /* Pause for keyboard focus only — a mouse click on an arrow also
         focuses it, and that shouldn't stop autoplay for good. */
      onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      {/* Vertical padding (cancelled by negative margin) leaves room for the
          zoomed card and the hover glow inside the track's overflow clip. */}
      <ul
        ref={trackRef}
        onScroll={onScroll}
        className="relative -mx-2 -my-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 py-6 [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map(({ service, i, copy, key }, index) => {
          const isClone = copy !== 1;
          return (
            <li
              key={key}
              inert={isClone}
              aria-hidden={isClone || undefined}
              aria-roledescription={isClone ? undefined : "slide"}
              aria-label={isClone ? undefined : `${i + 1} of ${n}`}
              className={`w-[80%] shrink-0 snap-center transition-transform duration-300 ease-out motion-reduce:transition-none sm:w-[50%] md:w-[calc((100%-2.5rem)/3)] ${
                index === active ? "scale-105" : "scale-100"
              }`}
            >
              <ServiceCard service={service} />
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex items-center gap-6">
        {/* One segment per service; the active one takes the brand accent —
            the section's single accent, confined to a hairline. */}
        <div className="flex flex-1 gap-2">
          {services.map((service, i) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${service.name}`}
              aria-current={i === current ? "true" : undefined}
              className="focus-glow group flex-1 rounded-sm py-3"
            >
              <span
                className={`block h-0.5 rounded-full transition-colors duration-150 ${
                  i === current ? "bg-brand-primary" : "bg-n-200 group-hover:bg-n-400"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            aria-label="Previous service"
            className="focus-glow flex h-11 w-11 items-center justify-center rounded-full border border-n-200 bg-n-0 text-n-900 transition-[border-color,box-shadow] duration-150 ease-out hover:border-brand-primary hover:shadow-[var(--shadow-glow)]"
          >
            <Icon name="arrowLeft" className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={() => setUserPlaying(!playing)}
            aria-label={playing ? "Pause automatic sliding" : "Start automatic sliding"}
            className="focus-glow flex h-11 w-11 items-center justify-center rounded-full border border-n-200 bg-n-0 text-n-900 transition-[border-color,box-shadow] duration-150 ease-out hover:border-brand-primary hover:shadow-[var(--shadow-glow)]"
          >
            <Icon name={playing ? "pause" : "play"} className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            aria-label="Next service"
            className="focus-glow flex h-11 w-11 items-center justify-center rounded-full border border-n-200 bg-n-0 text-n-900 transition-[border-color,box-shadow] duration-150 ease-out hover:border-brand-primary hover:shadow-[var(--shadow-glow)]"
          >
            <Icon name="arrowRight" className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
