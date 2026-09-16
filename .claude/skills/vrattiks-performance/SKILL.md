---
name: vrattiks-performance
description: Performance standard for the Vrattiks website — image/video optimization, minimizing client components, animation performance, font loading, and Core Web Vitals, without sacrificing visual quality. Use whenever building or reviewing a page, or when the request mentions performance, load time, bundle size, or Core Web Vitals.
---

# Vrattiks Performance Standard

## Checklist

- **Images**: always use `next/image`, never a bare `<img>`. Set explicit `width`/`height` (or `fill` with a sized parent) to avoid layout shift. Use `sizes` correctly for responsive images per the grids in `vrattiks-responsive`.
- **Lazy loading**: below-the-fold images/sections load lazily (`next/image` does this by default — don't set `priority` on anything except the hero's LCP image).
- **Video**: don't autoplay large video without `muted`+`playsInline`; prefer lazy-loading offscreen video players; avoid embedding heavy third-party video iframes above the fold.
- **Client components**: default to server components per `CLAUDE.md`. Add `"use client"` only where state/effects/Framer Motion actually require it — never at a page level just because one child needs interactivity; push the `"use client"` boundary as deep (small) as possible.
- **Avoid excessive JS**: don't add a new dependency for something a few lines of Tailwind/CSS or an existing dependency (Framer Motion) already solves.
- **Animation performance**: animate `transform`/`opacity` only where possible (GPU-accelerated); avoid animating `width`/`height`/`top`/`left` or other layout-triggering properties in scroll/hover animations.
- **Avoid unnecessary re-renders**: don't lift state higher than needed; don't wrap large server-rendered trees in a client component just to add one interactive element.
- **No duplicate dependencies**: check `package.json` before adding a library — this project already has Framer Motion for animation and Next's built-in `Image`/`font` systems; don't add a second animation, image, or font library.
- **Font loading**: fonts are already loaded via `next/font/google` in `app/layout.tsx` (self-hosted, no render-blocking external request) — never add a Google Fonts `<link>` tag.
- **Large assets**: check file size of anything added to `public/`; prefer already-optimized/appropriately-sized assets over shipping originals.

## Don't optimize blindly

Preserve visual quality and the brand's animation choices (`vrattiks-design-system`,
`vrattiks-standards` §2 "preserve existing working animations"). A
performance pass should never strip an intentional gradient, shadow, or
motion effect to save a few KB — reach for compression/format/lazy-loading
fixes first.

## Used by

`vrattiks-page-builder` (build-time), `vrattiks-page-review` (audit check).
