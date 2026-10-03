"use client";

import { useEffect, useRef } from "react";

/* Hero background: a perspective dot "terrain" rolling along the bottom of the
   hero, plus a light field of drifting, twinkling particles.

   ⚠ LOOPING MOTION — deliberate exception to kylezantos-design §1b ("nothing
   on this site should be moving when the user isn't acting"), added at the
   user's explicit request (2026-10-03). Kept tolerable by:
   - low alpha and slow speed, so it reads as texture, not as content;
   - pausing whenever the hero is off screen (IntersectionObserver) or the
     tab is hidden (rAF stops on its own);
   - prefers-reduced-motion: one static frame is drawn, nothing moves.

   One <canvas>, 2D context, DPR capped at 2. Colours come from the brand
   tokens on :root, so there are no hex literals here.

   Used behind the first section of every page (Home hero and each page
   intro), so the whole site opens on the same backdrop. The parent must be
   `relative isolate` (Section already is). `className` overrides the default
   full-bleed placement, e.g. to confine it to the top of a long section. */

type RGB = [number, number, number];

function tokenRGB(name: string): RGB {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, "$&$&") : hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r},${g},${b},${a})`;

type Particle = { x: number; y: number; r: number; vx: number; vy: number; phase: number; speed: number; tone: 0 | 1 };

export default function HeroParticles({
  className = "absolute inset-0 h-full w-full",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let primary = tokenRGB("--color-brand-primary");
    let secondary = tokenRGB("--color-brand-secondary");

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with width so phones don't draw a desktop's worth of dots.
      const small = w < 768;
      cols = small ? 52 : 110;
      rows = small ? 20 : 30;
      const count = Math.round((w * h) / (small ? 9000 : 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.3,
        vx: 0.04 + Math.random() * 0.1,
        vy: -(0.02 + Math.random() * 0.08),
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.2,
        tone: Math.random() < 0.6 ? 1 : 0,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Drifting particles — wrap around the edges.
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x > w + 4) p.x = -4;
          if (p.y < -4) p.y = h + 4;
        }
        const twinkle = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase);
        ctx.fillStyle = rgba(p.tone ? secondary : primary, 0.08 + 0.3 * twinkle);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dot terrain: rows run from the horizon (far, faint, tight) down to the
      // bottom edge (near, larger, wider), each displaced by two crossing waves.
      const horizon = h * 0.6;
      const depth = h - horizon;
      for (let r = 0; r < rows; r++) {
        const z = r / (rows - 1); // 0 = far, 1 = near
        const near = z * z;
        const baseY = horizon + depth * (0.04 + 0.96 * near);
        const spread = w * (0.9 + 0.8 * z);
        const amp = 4 + 22 * z;
        const radius = 0.5 + 1.2 * z;
        const alpha = 0.05 + 0.4 * z;
        const tone = z > 0.5 ? secondary : primary;
        ctx.fillStyle = rgba(tone, alpha);

        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1) - 0.5;
          const x = w / 2 + u * spread;
          if (x < -10 || x > w + 10) continue;
          const y =
            baseY +
            amp * Math.sin(c * 0.32 + t * 0.9) * Math.cos(r * 0.42 - t * 0.6) +
            amp * 0.4 * Math.sin((c + r) * 0.18 + t * 0.5);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(canvas);

    // The dark theme redefines --color-brand-secondary; re-read on toggle.
    const themeObserver = new MutationObserver(() => {
      primary = tokenRGB("--color-brand-primary");
      secondary = tokenRGB("--color-brand-secondary");
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (reduceMotion) {
      draw(0);
      return () => {
        ro.disconnect();
        themeObserver.disconnect();
      };
    }

    let frame = 0;
    let running = false;
    const loop = (ms: number) => {
      draw(ms / 1000);
      frame = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none -z-10 ${className}`}
    />
  );
}
