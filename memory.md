# Vrattiks Website — Project Memory

Running log of decisions, progress, and open questions for the vrattiks.io redesign. Update this as work happens; see [CLAUDE.md](CLAUDE.md) for stack/conventions.

## Status: Home page built

Home page (`/`) is implemented end-to-end: Header/Footer (new, minimal — flat
nav, no dropdown submenus yet since only Home exists) plus all 12 required
sections (Hero → KPI/Results → Why Businesses Need AI → Why Vrattiks →
Services → Use Cases → Industries → Case Studies → Process → Testimonials →
FAQ → Final CTA) in `app/components/`, composed in `app/page.tsx`. Shared
data lives in `app/lib/content.ts` (services/industries/use-cases) for reuse
by future detail pages.

## Setup done

- Next.js 15 + TypeScript + Tailwind v4 + Framer Motion installed.
- Design tokens (colors, radii) ported from `docs/index.html` into Tailwind's `@theme` in `app/globals.css`.
- Brand fonts (Urbanist, IBM Plex Sans, IBM Plex Mono) wired via `next/font/google` in `app/layout.tsx`.
- `docs/index.html` brand & design system doc in place (v1.0) — colors, type scale, voice/tone, component reference.

## Decisions

- Tagline in `docs/index.html` cover is still a placeholder ("AI automation, built for how Indian SMEs actually work.") — needs final copy approval before use anywhere else.
- Page sections live as individual components in `app/components/`, composed in `app/page.tsx` (see CLAUDE.md folder structure).

## Claude Code Skills system

- Built `.claude/skills/` from scratch (2026-09-12) — none existed before this session despite earlier phrasing implying otherwise. Nine skills: `vrattiks-architecture` (SSOT for page list/routes/sections/nav/CTA/linking, sourced from the "VRATTIKS — Task 3 | Final Pages List" PDF), `vrattiks-standards` (safety/content-integrity/verification/anti-overengineering, referenced by all others), `vrattiks-design-system`, `vrattiks-responsive`, `vrattiks-accessibility`, `vrattiks-seo`, `vrattiks-performance` (each a focused checklist), and two orchestrators `vrattiks-page-builder` / `vrattiks-page-review`. Shared validation checklist lives in `vrattiks-page-review/references/checklist.md`. Index/routing overview in `.claude/skills/README.md`.
- Routes/slugs in `vrattiks-architecture` are a proposed convention (not yet confirmed by the client) — update that file first if a different URL structure is decided.
- Brand story quote and co-founder names (Hitesh Dave, Arpit Patel) the user gave in that session are recorded in `vrattiks-standards` §3 as user-provided draft content for the Company/About page — not yet independently confirmed, don't embellish further.

## Pending / not started

- No content/copy finalized beyond the design doc's placeholder examples.
- Logo image assets referenced in `docs/index.html` (e.g. `Vrattiks - Logo - Gradient.png`) don't actually exist as files anywhere in the repo — Header/Footer use a text/gradient "Vrattiks" wordmark instead. Swap in the real logo asset once it's added to `public/`.
- KPI/Results, Case Studies, and Testimonials sections on Home use honest non-numeric/pending placeholders (no verified stats, case studies, or testimonials exist yet per `vrattiks-standards` §3) — replace with real content once available.
- Only Home exists as a route — all other pages in `vrattiks-architecture` §1 (Company, Services + 6 detail pages, Industries + 6, Use Cases + 3, Case Studies, Products, Blog, Contact) are linked to from Home/nav/footer but not yet built, so those links currently 404.
- Header nav is a flat link list (no dropdown submenus for Services/Industries/Use Cases yet) and only shows the full desktop nav at Tailwind's default `lg` (1024px) breakpoint — cramming all 9 top-level items + logo + CTA overflowed right at the 1024px test width when tried at the custom 901px `md` breakpoint, so it was deferred to 1024px where there's enough room. Revisit if nav items are ever trimmed.
- Added `--breakpoint-sm: 601px` / `--breakpoint-md: 901px` to `app/globals.css` `@theme` to match the design system's tablet/desktop bands (previously undefined in Tailwind config, only present in `docs/index.html`'s own stylesheet) — applies project-wide now, not just Home.

## Open questions

- None yet — add here as they come up.
