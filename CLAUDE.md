
@AGENTS.md

# Vrattiks Website

Marketing website for Vrattiks Intelligence LLP (AI automation for Indian SMEs) — a redesign of vrattiks.io.

## Stack

- **Next.js 15** (App Router) — note the `@AGENTS.md` import above: this repo's Next.js install may have breaking changes vs. training data. Check `node_modules/next/dist/docs/` before writing Next-specific code (routing, data fetching, config).
- **TypeScript**
- **Tailwind CSS v4** — config lives inline in [app/globals.css](app/globals.css) via `@theme`, not a `tailwind.config.js`.
- **Framer Motion** — for section/scroll animations.

## Design system

[docs/index.html](docs/index.html) is the source of truth for brand and UI: logo usage, color tokens, type scale, voice & tone, and reference components (buttons, cards, spacing, grid). Open it in a browser before styling anything new. Key facts already wired into the codebase:

- Color tokens and radii are mapped into Tailwind's `@theme` in [app/globals.css](app/globals.css) (`--color-brand-primary`, `--color-n-0`…`--color-n-900`, `--color-sem-*`, `--radius-sm/md/lg/xl`). Use these Tailwind classes (e.g. `bg-brand-primary`, `text-n-500`, `rounded-lg`) rather than hardcoding hex values.
- Brand gradient (`linear-gradient(60deg, #b79af3, #6942f1)`) and shadow tokens (`--shadow-sm/md/lg/glow`) are plain CSS custom properties on `:root` in globals.css — reference them directly in inline styles or a small utility class since Tailwind v4 doesn't generate classes for them automatically.
- Fonts are loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx): Urbanist (`--font-display`, headings), IBM Plex Sans (`--font-body`, body/UI), IBM Plex Mono (`--font-mono`, code/labels). Use the Tailwind font classes wired to these variables — don't add new `<link>` font tags.
- Voice & tone: write for business owners, not developers. Lead with outcomes, avoid AI hype language and technical jargon in customer-facing copy (see docs/index.html §5 for do/don't examples).
- One primary (gradient) button per screen/section; use secondary/outline/ghost for everything else.

## Folder structure

- `app/` — Next.js App Router pages and layouts.
- `app/components/` — reusable page sections (hero, features, testimonials, footer, etc.). One component per file, PascalCase filenames (e.g. `app/components/Hero.tsx`). Compose these into `app/page.tsx` and other route files rather than writing long inline JSX in the page itself.
- `docs/` — design system reference (`index.html`) and any supporting brand assets.

## Conventions

- Prefer server components by default; only add `"use client"` where interactivity (state, effects, Framer Motion) requires it.
- Keep animation choices consistent with the brand's confident-but-not-flashy tone — subtle fades/slides, not gimmicky effects.
- Reuse the design tokens above instead of introducing new colors, shadows, or spacing values outside the 4px scale.
- See [memory.md](memory.md) for current project state — completed sections, pending work, and decisions made along the way. Check it at the start of a session and update it as work progresses.
