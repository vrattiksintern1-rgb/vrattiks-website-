"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

/* Hero visual: a looping animation of the AI hub connecting the channels a
   business already runs on (website, CRM, WhatsApp, email, analytics, leads).

   PRESENTATION — not a boxed player: no border, no controls. It sits on a
   static brand glow (.wash-brand — brand-primary → brand-secondary via
   color-mix, vrattiks-design-system §1 Tokens) so it reads as a light source
   in the hero rather than a pasted-in rectangle. The frame itself
   (.media-blend in globals.css) depends on the theme:
   - dark: edges feathered to transparent with a radial mask, so the footage
     dissolves into the page. Centre ~75% stays fully opaque — every node and
     label in the animation is untouched; only the dark backdrop fades.
   - light: a dark frame can't dissolve into a light page (feathered, it reads
     as a hard oval), so it gets --radius-xl and --shadow-glow instead of a
     border (vrattiks-design-system §1 Tokens, "--shadow-sm/md/lg/glow").
   Neither glow pulses or moves (kylezantos-design §1b, "pulsing glows").

   ⚠ LOOPING MOTION — deliberate exception to kylezantos-design §1b ("things
   that repeat on a loop … nothing on this site should be moving when the user
   isn't acting"), added at the user's explicit request (2026-10-08). Kept
   tolerable the same way HeroParticles is:
   - prefers-reduced-motion: the <video> is never mounted, so nothing moves and
     nothing downloads — the poster frame IS the visual (vrattiks-accessibility,
     "Reduced motion"; kylezantos-design §1). Subscribed live, so switching the
     OS setting mid-visit stops it too.
   - paused whenever the frame is off screen (IntersectionObserver).

   ACCEPTED EXCEPTION — no pause control. WCAG 2.2.2 (Pause, Stop, Hide) asks
   for one on auto-playing motion longer than 5s beside other content. A pause
   button shipped first; the user removed it on 2026-10-08 after being told
   about 2.2.2, preferring no UI chrome on the visual. Reduced-motion users
   still get a still frame. Don't re-add it without asking.

   PERFORMANCE (vrattiks-performance, "Video" + "Lazy loading" + "Images"):
   - The poster is a next/image (`preload` — it's the hero's largest paint on
     desktop), rendered underneath the video. The video has no `poster`
     attribute: until its first frame decodes it paints nothing, so the image
     shows through — no blank flash, and the poster is fetched once, not twice.
   - The video is only mounted once the frame comes within 200px of the
     viewport (on mobile it stacks below the CTAs), never during SSR, and not
     at all when the browser asks to save data.
   - autoPlay + muted + playsInline is the combination mobile browsers require
     to autoplay without a tap. If autoplay is still refused (iOS Low Power
     Mode), the poster stays — the play() rejection is swallowed on purpose.
   - Source file: 1280×720, H.264, ~3.2 Mbps, 4.1 MB, and it carries an unused
     AAC audio track. Re-encode before launch (strip audio, ~1–1.5 Mbps). */

const VIDEO_SRC = "/video/hero-animation.mp4";
const POSTER_SRC = "/video/hero-animation-poster.jpg";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// The server can't know the preference, so it renders the still frame only.
const getReducedMotion = () => window.matchMedia(REDUCE_QUERY).matches;
const getServerReducedMotion = () => true;

export default function HeroVideo() {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inRange, setInRange] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setInRange(true);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

  const showVideo = inRange && !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (onScreen) video.play().catch(() => {});
    else video.pause();
  }, [showVideo, onScreen]);

  return (
    <div ref={frameRef} className="relative isolate w-full">
      {/* Ambient glow: wider than the frame so the light spills into the hero. */}
      <div
        aria-hidden="true"
        className="wash-brand pointer-events-none absolute -inset-x-[8%] -inset-y-[18%] -z-10 opacity-80"
      />
      <div
        role="img"
        aria-label="Animation: an AI hub linking your website, CRM, WhatsApp, email, APIs, analytics and lead generation into one connected system."
        className="media-blend relative aspect-video w-full"
      >
        <Image
          src={POSTER_SRC}
          alt=""
          fill
          preload
          sizes="(min-width: 600px) 560px, 100vw"
          className="object-cover"
        />
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
