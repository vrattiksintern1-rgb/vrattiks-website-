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
- Added four design-quality skills (2026-09-18), hand-written to match the existing `vrattiks-*` format (nothing installed via npx/marketplace): `ui-ux-pro-max` (pre-build pattern lookup — layouts per content shape, colour/type pairing, spacing rhythm, Indian mid-market/enterprise anti-patterns), `taste-skill` (post-build critique — seven AI-slop patterns, reference-site *reasoning* extraction, slop audit), `awesome-design` (named technique library from Stripe/Linear/Vercel-tier sites, structure and interaction only), `kylezantos-design` (purposeful motion + when NOT to animate, plus a 375/768/1024/1440 responsive audit method in three modes). `README.md` index and routing table updated to thirteen skills.
- `docs/reference-sites.md` — referenced by `taste-skill` §2 as the reference-site list, but **does not exist yet**. The 2026-09-18 design pass therefore derived CLAUDE.md's "Design Taste" section from `awesome-design`'s technique library (the documented fallback) and marked its provenance in the file. `docs/copywriting` does not exist either — that pass reused the in-repo copy rather than inventing new claims. The skill tells the agent to say so and ask rather than invent sites, falling back to `awesome-design`'s technique library. Create it when reference sites are chosen.
- Routes/slugs in `vrattiks-architecture` are a proposed convention (not yet confirmed by the client) — update that file first if a different URL structure is decided.
- Brand story quote and co-founder names (Hitesh Dave, Arpit Patel) the user gave in that session are recorded in `vrattiks-standards` §3 as user-provided draft content for the Company/About page — not yet independently confirmed, don't embellish further.

## Home page design pass (2026-09-18)

Ran all thirteen skills over `/` in sequence. Structural outcomes worth keeping:

- **Every section now renders through `ui/Section`** (two rhythms: `md` = 56/64/96px matching the design-doc band, `lg` for anchor moments). Do not hand-roll a `<section>` with its own padding.
- `ui/Section` clips with **`overflow-x-clip`, not `overflow-hidden`** — hidden makes it a scroll container and silently kills the `md:sticky` columns in `WhyVrattiks`/`Industries`. The two dark bands re-add `overflow-hidden` locally because their washes bleed vertically and neither uses sticky.
- **A real type scale lives in `@theme`** (`--text-micro`…`--text-h1`, `--leading-*`), ported from `docs/index.html` §4. 13 ad-hoc `text-[Npx]` values were consolidated into it — use `text-caption`/`text-ui`/`text-body`, not arbitrary px.
- **Zero hex literals remain in `app/components/`** — the five inline radial gradients became `.wash-primary` / `.wash-secondary` in globals.css.
- **Section structures are deliberately all different** (ledger / split / card-grid / dark matrix / index / stepper / accordion / band) and tones alternate `paper→dark→paper→white→paper→dark→white→tint→paper→dark`. There is exactly **one** icon-card grid (Services) and **one** gradient surface budgeted per viewport. Re-read the "Design Taste" section in CLAUDE.md before restyling any of it.
- **Base element styles in `globals.css` must stay inside `@layer base`.** They were unlayered, which beats Tailwind v4's `@layer utilities` — so `h1,h2,h3,h4 { color: var(--color-n-900) }` overrode `text-n-0` and rendered the headings in `KpiResults`, `FinalCTA` and `UseCases` as #16161d on #16161d (invisible). Any new element selector goes in that layer.
- `.focus-glow` now draws a real 2px `outline` (brand-secondary on light, brand-primary inside `.bg-brand-graphite`) because `--shadow-glow`'s 25%-alpha ring was invisible on the dark bands.
- `metadataBase` reads **`NEXT_PUBLIC_SITE_URL`**, falling back to `localhost:3000`. **Must be set before the first production deploy.**

Decisions made in that pass that are content, not code:

- **Case Studies and Testimonials are commented out of `app/page.tsx`** at the user's request — empty placeholders hurt credibility. The components still exist; re-enable when real content lands. This is a deliberate deviation from the required Home section list in `vrattiks-architecture` §2.
- **The KPI figures (60% / 3x / 0 / 24-7) were removed.** They were never measured, and rendering invented numbers at 76px is a stronger false claim than a grey placeholder. The section now states outcomes in words. Restore instructions and the original numbers are in the header comment of `KpiResults.tsx`; `ui/CountUp.tsx` is parked unused for that restore.
- Added **E-commerce** to `app/lib/content.ts` — `vrattiks-architecture` §1 requires 6 industries and only 5 existed.

## Hero H1 resize + font-variable scope fix (2026-09-18)

- **Hero H1 dropped from `clamp(40px,7.2vw,72px)` to `clamp(32px,4.7vw,48px)`.** At the old cap the 72px type sat in a 470px grid column at 1024px and wrapped to **6 lines / 454px tall**; it is now 4 lines / 202px. Weight (700), `leading-display` (1.05), `tracking-[-0.03em]` and the `.text-brand-gradient` span were deliberately left alone — size only. The `4.7vw` middle term is chosen so the cap is reached exactly at 1024px, and the 32px floor keeps the H1 above the 28px mobile H2 floor.
- **`--font-display` / `--font-body` / `--font-mono` were silently broken site-wide.** `@theme` declares them on `:root` (`<html>`) as `var(--font-urbanist), sans-serif`, but `next/font`'s `.variable` classes were on `<body>` — so at `:root` the `var()` was undefined, the custom property became guaranteed-invalid, and **every heading rendered in the system stack, never Urbanist**. Fixed by moving the three font `.variable` classes from `<body>` to `<html>` in `app/layout.tsx`. Verified via CDP that `h1` now computes `font-family: Urbanist`.
- Verified with headless Chrome over CDP at 1440/1280/1024/900/768/600/430/390/375 — zero horizontal overflow at every width, `lhRatio` 1.05 and weight 700 unchanged throughout, gradient clip intact.

## Pending / not started

- No content/copy finalized beyond the design doc's placeholder examples.
- Logo image assets referenced in `docs/index.html` (e.g. `Vrattiks - Logo - Gradient.png`) don't actually exist as files anywhere in the repo — Header/Footer use a text/gradient "Vrattiks" wordmark instead. Swap in the real logo asset once it's added to `public/`.
- KPI/Results, Case Studies, and Testimonials sections on Home use honest non-numeric/pending placeholders (no verified stats, case studies, or testimonials exist yet per `vrattiks-standards` §3) — replace with real content once available.
- Only Home exists as a route — all other pages in `vrattiks-architecture` §1 (Company, Services + 6 detail pages, Industries + 6, Use Cases + 3, Case Studies, Products, Blog, Contact) are linked to from Home/nav/footer but not yet built, so those links currently 404.
- Header nav is a flat link list (no dropdown submenus for Services/Industries/Use Cases yet) and only shows the full desktop nav at Tailwind's default `lg` (1024px) breakpoint — cramming all 9 top-level items + logo + CTA overflowed right at the 1024px test width when tried at the custom 901px `md` breakpoint, so it was deferred to 1024px where there's enough room. Revisit if nav items are ever trimmed.
- Added `--breakpoint-sm: 601px` / `--breakpoint-md: 901px` to `app/globals.css` `@theme` to match the design system's tablet/desktop bands (previously undefined in Tailwind config, only present in `docs/index.html`'s own stylesheet) — applies project-wide now, not just Home.

## Open questions

- **The Hero H1 (48px) is now only 1.04x the largest section H2** — `KpiResults` uses `clamp(30px,4.4vw,46px)`. The two are never on screen together and the H1 still beats its own subtext 2.8:1, but at page scale the "display-scale jump" that CLAUDE.md's Design Taste section calls for is effectively gone. Fix is to bring `KpiResults` down (e.g. to the standard `clamp(28px,3.4vw,40px)` the other sections use) rather than to re-inflate the H1 — awaiting user call.
