---
name: vrattiks-design-system
description: Vrattiks brand tokens, components (buttons, cards), typography, spacing, and voice & tone — mapped to the actual Tailwind v4 @theme in app/globals.css and the reference doc docs/index.html. Use whenever writing or styling any Vrattiks UI (new section, component, or copy) to stay visually and tonally consistent instead of inventing colors, spacing, or wording.
---

# Vrattiks Design System

`docs/index.html` is the full source of truth (open it in a browser for
anything not covered here — logo usage, full type scale, do/don't examples).
This skill is the actionable subset already wired into the codebase.

## 1. Tokens (use these Tailwind classes, never hardcode hex values)

From `app/globals.css` `@theme`:

- Brand: `bg-brand-primary` (#b79af3), `bg-brand-secondary` (#6942f1), `bg-brand-graphite` (#16161d)
- Neutrals: `text-n-0` … `text-n-900` (white → near-black), body copy defaults to `n-800`, headings to `n-900`
- Semantic: `sem-success`, `sem-warning`, `sem-error`, `sem-info`
- Radius: `rounded-sm` (8px), `rounded-md` (14px), `rounded-lg` (22px), `rounded-xl` (32px)
- Fonts: `font-display` (Urbanist, headings), `font-body` (IBM Plex Sans, default), `font-mono` (IBM Plex Mono, code/labels)

Plain CSS custom properties on `:root` (Tailwind v4 doesn't generate classes
for these — reference directly via `style={{ background: 'var(--brand-gradient)' }}` or a small utility class):

- `--brand-gradient`: `linear-gradient(60deg, #b79af3, #6942f1)` — the one gradient fill for Primary buttons/feature cards
- `--brand-gradient-soft` — subtle tinted backgrounds
- `--shadow-sm/md/lg/glow` — `--shadow-glow` is the hover/focus state for gradient elements

## 2. Buttons (docs/index.html §6.1)

Four variants, use for the stated purpose only:

- **Primary** (`btn btn-primary`, gradient fill + glow shadow on hover) — the single most important action per screen/section. Never more than one visible at a time. See `vrattiks-architecture` §4 for where it should link.
- **Secondary** (`btn btn-secondary`, graphite fill) — a strong action that isn't the primary one (e.g. alongside Primary in a dialog).
- **Outline** (`btn btn-outline`) — lower-emphasis action on light backgrounds (cancel, back, secondary link in a card).
- **Ghost** (`btn btn-ghost`) — quietest action (dismissive/optional, dense toolbars, inline actions).

Sizes: `sm` (13px) / default (14.5px) / `lg` (16px). Always keep full tap-target size on mobile — never shrink a button below tap-target to fit a layout.

## 3. Cards (docs/index.html §6.2)

- **Standard card**: white fill, 1px border, soft shadow — default container for list items, feature blurbs, dashboard tiles.
- **Stat card**: label + large number + delta — for KPI/Results sections (Home hero stats, case study results).
- **Feature card**: gradient fill — one promoted moment per page max (onboarding, a hero CTA card). Don't use it for ordinary grid items.

## 4. Layout & responsive behavior (docs/index.html §6.3–6.4)

CSS breakpoint bands baked into components:
- Desktop `>900px`: full 12-column grid, 3-up card grids, 32px side padding, 96px vertical section padding.
- Tablet `601–900px`: 6-column grid, cards/logos drop to 2-up, padding tightens to 64px/24px.
- Mobile `≤600px`: 4-column grid, multi-column grids stack to 1-up (cards stay 2-up), 56px/18px padding, buttons wrap at full tap-target size.

These bands are the implementation target; `vrattiks-responsive` defines the
specific pixel widths to test against them (1440/1280/1024 desktop, 768
tablet, 430/390/375 mobile) and the failure modes to check for.

## 5. Voice & tone (docs/index.html §5)

Write for business owners, not developers:
- Clear over technical — no AI/ML jargon in customer-facing copy.
- Confident, not hyped — state outcomes plainly, skip superlatives ("revolutionary", "game-changing").
- Approachable, not intimidating — short sentences, plain verbs, lead with the business outcome before the mechanism.

Any copy you write (headlines, feature blurbs, CTAs) must follow this tone —
see `vrattiks-standards` §3 for what's allowed to be invented vs. must stay a
placeholder.

## 6. Fonts

Loaded via `next/font/google` in `app/layout.tsx` (Urbanist, IBM Plex Sans,
IBM Plex Mono) and exposed as CSS variables consumed by the `font-display` /
`font-body` / `font-mono` Tailwind classes. Never add a new `<link>` font tag
or a different typeface — use these three via their Tailwind classes.

## Used by

`vrattiks-page-builder` (styling every new section), `vrattiks-page-review`
(design-consistency checks), `vrattiks-accessibility` (contrast pairs come
from the neutral scale above).
