
@AGENTS.md

# Vrattiks Website

Marketing website for Vrattiks Intelligence LLP (AI automation for Indian SMEs) — a redesign of vrattiks.io.

## Stack

- **Next.js 16** (App Router, Turbopack by default) — note the `@AGENTS.md` import above: this repo's Next.js install may have breaking changes vs. training data. Check `node_modules/next/dist/docs/` before writing Next-specific code (routing, data fetching, config).
- **TypeScript**
- **Tailwind CSS v4** — config lives inline in [app/globals.css](app/globals.css) via `@theme`, not a `tailwind.config.js`.
- **Framer Motion** — for section/scroll animations.

## Design system

[docs/index.html](docs/index.html) is the source of truth for brand and UI: logo usage, color tokens, type scale, voice & tone, and reference components (buttons, cards, spacing, grid). Open it in a browser before styling anything new. Key facts already wired into the codebase:

- Color tokens and radii are mapped into Tailwind's `@theme` in [app/globals.css](app/globals.css) (`--color-brand-primary`, `--color-n-0`…`--color-n-900`, `--color-sem-*`, `--radius-sm/md/lg/xl`). Use these Tailwind classes (e.g. `bg-brand-primary`, `text-n-500`, `rounded-lg`) rather than hardcoding hex values.
- Brand gradient (`linear-gradient(60deg, #b79af3, #6942f1)`) and shadow tokens (`--shadow-sm/md/lg/glow`) are plain CSS custom properties on `:root` in globals.css — reference them directly in inline styles or a small utility class since Tailwind v4 doesn't generate classes for them automatically.
- Fonts are loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx): Urbanist (`--font-display`, headings), IBM Plex Sans (`--font-body`, body/UI/labels). The design system allows exactly these two faces — "never mix in a third typeface" — so there is no mono font; eyebrows and small labels are IBM Plex Sans, uppercase, tracked. Use the Tailwind font classes wired to these variables — don't add new `<link>` font tags.
- Voice & tone: write for business owners, not developers. Lead with outcomes, avoid AI hype language and technical jargon in customer-facing copy (see docs/index.html §5 for do/don't examples).
- One primary (gradient) button per screen/section; use secondary/outline/ghost for everything else.

## Design Taste

Taste here means **restraint plus one decision**: each section carries one
deliberate idea and stays quiet everywhere else. A section with five ideas and
a section with none both read as filler.

**Provenance:** `docs/reference-sites.md` does not exist, so the client has not
approved a reference list. The three references below were read through
`awesome-design`'s technique library (the fallback `taste-skill` §2 prescribes),
not from live sites. Replace this section once real reference sites are chosen.

### Reference 1 — Stripe: *comparison is a layout decision, not a styling one*

- **Eye lands** on a single emphasised element, marked by **one** device only —
  border *or* fill, never both.
- **Accent is confined to an edge or thin band**, never a whole surface, so the
  accent has presence without dominance.
- **Refused:** stacking emphasis devices; letting a comparison become three
  marketing cards.
- **Copy** is a 3–6 word headline plus *one* concrete sentence. Numbers always
  arrive with what they measure and over what period.

> **Translation:** they make a comparison a table because comparison is the job —
> we give Use Cases a real Problem/Solution/Benefit matrix rather than three
> equal cards, and we spend `--brand-gradient` on one element per viewport.

### Reference 2 — Linear: *value contrast is what makes the next section feel new*

- **Eye lands** via a **display-scale jump** — the hero type is dramatically
  larger than anything else, so the eye never hunts. Subhead stays small and quiet.
- **A full-bleed near-black band** is dropped between light sections. Text on it
  sits on a **muted ramp, not pure white**; borders are hairlines at low white alpha.
- **Refused:** pure white on black, heavy borders, slow motion (hover is
  100–150ms, transform/opacity only).

> **Translation:** they run a dark band to reset the eye after a run of white
> sections — we do the same with `bg-brand-graphite`, text on `n-200/n-300`
> (never `n-0` for body), borders at `n-0/10`, placed where the page is densest.

### Reference 3 — Vercel: *a constant spine lets structure vary underneath*

- **A small uppercase eyebrow** (theirs is mono; ours is IBM Plex Sans, tracked) above each section heading does navigational
  work, which lets the headings themselves stay short.
- **Hover and focus are a border shift plus a soft glow**, never a scale-up.
- **Refused:** long headings; colour change as the only focus affordance.

> **Translation:** the eyebrow is the one thing that repeats down the page, so
> every *other* section is free to change shape — we keep `ui/Eyebrow` constant
> and vary layout beneath it, and `--shadow-glow` stays the single hover/focus token.

### The seven slop tells to check before calling anything done

1. Gradient used as decoration rather than to mark the one promoted moment.
2. Centred eyebrow + centred h2 + centred grid, repeated down the page.
3. Icon-in-a-rounded-square card grid appearing more than once.
4. Everything on white with `n-500` text and an `n-200` border — no value contrast.
5. Uniform type scale, so the eye has nowhere to land.
6. Identical vertical gaps everywhere — grouping comes from *uneven* spacing.
7. Stock-phrase copy ("unlock the power of", "seamlessly", "transform your workflow").

### Standing rules that fall out of the above

- **No two consecutive sections share a layout structure.** Max **one** 3-up
  "icon + title + two lines" grid on the whole page.
- **At most one gradient surface visible per viewport.**
- **At least one non-white band** breaks the white run, and its contrast passes
  `vrattiks-accessibility`.
- **Never** import a reference's colour, typeface, copy, claim, metric, logo, or
  illustration — take the structural decision only.

## Folder structure

- `app/` — Next.js App Router pages and layouts.
- `app/components/` — reusable page sections (hero, features, testimonials, footer, etc.). One component per file, PascalCase filenames (e.g. `app/components/Hero.tsx`). Compose these into `app/page.tsx` and other route files rather than writing long inline JSX in the page itself.
- `docs/` — design system reference (`index.html`) and any supporting brand assets.

## Conventions

- Prefer server components by default; only add `"use client"` where interactivity (state, effects, Framer Motion) requires it.
- Keep animation choices consistent with the brand's confident-but-not-flashy tone — subtle fades/slides, not gimmicky effects.
- Reuse the design tokens above instead of introducing new colors, shadows, or spacing values outside the 4px scale.
- See [memory.md](memory.md) for current project state — completed sections, pending work, and decisions made along the way. Check it at the start of a session and update it as work progresses.
