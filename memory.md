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

## Elevated visual pass — phase 1 (2026-09-21)

Reference was **onbbits.io**, studied by rendering it in headless Chrome over
CDP and reading computed styles (the site is client-rendered; a plain fetch
returns only the `<title>`). Structure and interaction only — no copy, colour,
type or asset was taken. What the probe actually showed, and what was adopted:

- **H1 64px vs H2 36px — a 1.78x display-scale jump.** Ours was 48 vs 46
  (1.04x), which is the single biggest reason the page read as flat. This
  closes the "Open questions" item below: it was resolved by *raising the H1*
  (to 68px) AND bringing `KpiResults` down to the standard 40px step, so every
  section H2 on the page is now exactly 40px. Measured ratio is now 1.62-1.69
  at >=768px.
- **Hero is now centred**, not a 50/50 split. The split was *why* the H1 had to
  be small — at 1024px it sat in a ~470px column. Centred across the container
  it gets a ~30ch measure and runs to 68px in 3 lines. Centring is used on the
  hero ONLY; every other section stays asymmetric.
- Hero H1 weight is **600, not the base 700** — 700 at 68px reads as shouting.
- **One radius**, tightened: HeroVisual went `xl` (32px) -> `lg` (22px), cards
  are `md` (14px). The reference reuses a single tight radius everywhere.
- New wide/low-alpha elevation tokens `--shadow-soft` / `--shadow-float` /
  `--shadow-brand`, plus a `.card-lift` hover (translate + border shift + glow,
  never a scale-up) and a `.marquee-track` ticker for the hero capability strip.
- `Section` padding was increased (md 64/80/112, lg 96/112/144). **This is a
  deliberate deviation from docs/index.html §6.4** (56/64/96) — recorded in
  Section.tsx. The whole page is now tuned to it; don't re-tighten piecemeal.
- **`WhyBusinessesNeedAI` became a card grid with one promoted graphite card.**
  It had been a two-column hairline ledger sitting directly below `KpiResults`,
  which is *also* a two-column hairline ledger — the page ran the same shape
  twice in a row, breaking CLAUDE.md's "no two consecutive sections share a
  layout structure" rule. The single inverted card is the reference's strongest
  device and costs no gradient budget.
- `WhyVrattiks` kept its asymmetric sticky split; its six per-row gradient bars
  became **one continuous gradient spine** for the whole list.

### Contrast: the brand gradient fails WCAG at its light end

Measured with a scripted audit over the rendered page (12 failures found and
fixed; script pattern worth reusing):

- `#b79af3` (the gradient's light end) on `--color-n-25` is **2.26:1**, so the
  first word of any gradient headline failed even the 3:1 large-text bar.
  Fixed by adding **`--brand-gradient-ink`** (light end stopped at 55% primary
  via `color-mix`, = `#9472f2`, **3.40:1**) and pointing `.text-brand-gradient`
  at it. `--brand-gradient` itself is unchanged and still used for decorative
  surfaces carrying no text. **Small gradient text still fails** (4.5:1 bar) —
  use solid `brand-secondary` (5.54:1) below ~24px; the footer credit does.
- Several `text-n-400` micro labels were 2.78:1 and `text-n-300` numerals
  1.81:1 — all moved to `n-500`.

**ACCEPTED EXCEPTION — the primary button.** White text on `--brand-gradient`
is **2.35:1** at the light end (needs 4.5:1). Passing would require stopping
the light end at ~22% primary (`#7d58f2`), which makes the gradient nearly flat
violet — a real change to the brand's signature CTA, specified in
docs/index.html §6 as `.btn-primary { background: var(--brand-gradient) }`.
**The user was shown the measurement and the two passing alternatives on
2026-09-21 and chose to keep the gradient unchanged.** Do not "fix" this in a
later pass without asking again — it is a known, accepted exception, not an
oversight. Pre-existing, not introduced by the redesign.

Also still failing, pre-existing and untouched: the `Process` section intro
(`n-500` on `n-50`, 4.32:1 vs 4.5). `FinalCTA`'s H2 is 42px while every other
section H2 is 40px — normalise in phase 2.

Verified: build clean, `tsc --noEmit` clean, **zero horizontal overflow at
1440/1280/1024/901/768/601/430/375/320**.

Phase 2 (not started): ServicesOverview, UseCases, Industries, CaseStudies,
Process, Testimonials, FAQ, FinalCTA.

## Elevated visual pass — phase 2 (2026-09-21)

User reviewed phase 1 and approved continuing. Remaining active sections
brought onto the same system: ServicesOverview, UseCases, Industries, Process,
FAQ, FinalCTA. `CaseStudies` and `Testimonials` stay commented out of
`app/page.tsx` — still no verified content, unchanged from the earlier decision.

- **`FinalCTA`'s H2 was 42px while every other section H2 was 40px.** Normalised.
  The page now has exactly two type ranks: the 68px Hero H1 and a 40px section
  H2 — verified across all ten H2s. FinalCTA also gained the chip eyebrow and
  the same lit top hairline as `KpiResults`, so the two dark bands read as one
  material.
- **`SectionHeading`'s description went `n-500` -> `n-600`.** `n-500` on the
  `tint` tone measured 4.32:1 (needs 4.5) in `Process`. `n-600` passes on every
  tone in use. Same move applied to body copy in Services/Industries/FAQ.
- Cards standardised on `rounded-md` (14px) + `--shadow-soft` + the shared
  `.card-lift` hover, replacing three different per-section hover recipes.
- **`ServicesOverview`'s featured card had ~200px of dead space** — it used
  `justify-between` inside a cell spanning two grid rows, which pinned the icon
  to the top and the copy to the bottom. Copy is now one block below the icon
  with the "Learn more" affordance pinned via `mt-auto`.

### Bug found and fixed: Icon.tsx had no type safety

`paths` was annotated `Record<string, React.ReactNode>`, which widens
`keyof typeof paths` to `string` — so **every** `<Icon name="..." />` typechecked
regardless of whether the glyph existed. Two names in use did not exist:

- `chevronDown` (FAQ) — accordions rendered with no chevron.
- `menu` (Header) — **the mobile hamburger button was an empty `<svg>`, i.e.
  invisible to sighted users on every page.** It had a correct `aria-label`, so
  screen readers were fine and nothing failed loudly.

Both glyphs added; the annotation replaced with `satisfies Record<...>` so the
key union stays exact and a typo is now a compile error. **Do not re-add the
`Record<string, …>` annotation.** Verified by asserting zero empty `<svg>` on
the rendered page (35 total).

### Verification tooling

There is no Puppeteer/Playwright in this repo, but Node 24 has a global
`WebSocket`, so headless Chrome can be driven over CDP directly. That is how
both the reference site and this page were measured. Two traps worth knowing:

1. **`next start` serves stale chunk hashes after a rebuild.** Restarting the
   server is mandatory after `npm run build`, or the page loads with *no CSS*
   and every audit silently returns garbage (a contrast run "passed" with zero
   failures purely because the stylesheet 404'd).
2. Escaping: a `<<'EOF'` heredoc still ate backslashes here, which silently
   broke a regex (`/[\d.]+/` became `/[d.]+/`) and made the same audit report
   zero failures. Patch code files with Python or the Write tool, not heredocs.

Final state: build clean, `tsc --noEmit` clean, `npm run lint` clean, zero
empty icons, **zero horizontal overflow at 1440/1280/1024/901/768/601/430/375/320**,
and two contrast findings — the gradient headline at 3.40:1 (passes the 3:1
large-text bar) and the accepted primary-button exception.

## kylezantos-design §1b motion fixes + skill-citation pass (2026-09-22)

Triggered by an audit question: "which of the 13 skills were *actually* applied
to Home?" The answer was 8 provable by in-code citation, 3 by implemented
prescription, 2 unprovable. That audit surfaced two live §1b violations, both
now fixed, and the uncited skills now cite themselves.

- **The hero `<h1>` was wrapped in `<Reveal delay={0.06}>`.** kylezantos-design
  §1b's first bullet forbids exactly this: "the hero headline should be readable
  the instant it paints; don't fade in the value proposition." The page's single
  most important line was held at opacity 0 for ~560ms on every load. Wrapper
  removed; a comment at the element says why, so it doesn't get re-wrapped to
  "match" the eyebrow and subhead around it.
- **The hero capability strip was a 46s infinite marquee.** §1b: "Things that
  repeat on a loop… nothing on this site should be moving when the user isn't
  acting." **Removed, not slowed** — a slower loop is the same violation at a
  lower frequency. It is now a static wrapped `<ul>` of the six service names,
  built from Tailwind utilities only. `@keyframes marquee-x`, `.marquee-track`
  and `.marquee-mask` are all deleted from globals.css.
  - The old reduced-motion fallback for the marquee was *already* wrap+centre,
    so this layout has been shipping to reduced-motion users all along.
  - The strip also stopped being decorative: `aria-hidden` and the `sr-only`
    paragraph that duplicated the names for screen readers are both gone. One
    copy of the content, announced as a real list.
- **There is now ZERO looping motion on Home** — verified by computed style, not
  by grep: no element reports `animation-iteration-count: infinite` at any of
  the ten test widths. A note in globals.css says any future `infinite` needs an
  explicit §1b justification at the point of use.

**Open, deliberately not changed:** the hero subhead and eyebrow still use
`<Reveal>` (delays 0.14 / 0). A strict §1b reading ("anything above the fold
that delays first read") arguably catches those too. The instruction was
specific to the `<h1>`; flagging rather than widening the change unasked.

## vrattiks-page-review — full audit of Home (2026-09-22)

Run explicitly as a review pass (workflow steps 1–8) against
`references/checklist.md` and all 12 other skills, so it is distinguishable in
this log from ordinary debugging. Findings first, then fixes.

**Findings — clean (verified, not assumed):**

| Checklist area | Result | How verified |
|---|---|---|
| Architecture §1 route | Pass | Home at `/` |
| Architecture §2 sections | Pass w/ known deviation | 10 of 12 render; CaseStudies + Testimonials stay commented out per standards §3 |
| Design tokens | Pass | zero hex literals in `app/components/` (only match is inside a comment) |
| Button hierarchy | Pass | one primary per section; Header/Hero/FinalCTA checked individually |
| Responsive | Pass | CDP run at 1440/1280/1024/901/768/601/430/390/375/320 — **0px overflow at every width** |
| A11y — one h1 | Pass | exactly 1 `<h1>` at all ten widths |
| A11y — reduced motion | Pass | `useReducedMotion` in all 3 motion components + CSS block |
| A11y — icons | Pass | 0 empty `<svg>` |
| SEO | Pass | title/description/canonical/OG/Twitter + grounded Organization JSON-LD |
| Performance | Pass | `next/image` only, no bare `<img>`; `"use client"` on 4 leaf components, page stays server |
| Content integrity | Pass | no invented stats/testimonials/clients |
| Code quality | Pass | `npm run build`, `npm run lint`, `tsc --noEmit` all clean |

**Finding 1 — `/use-cases` overview was unreachable from its own section.**
`vrattiks-architecture` §5 requires Home to link out to the Services,
Industries, Use Cases and Case Studies overviews. `UseCases.tsx` linked only to
the three *detail* pages (`/use-cases/{slug}`); it was the one catalogue section
of three with no overview affordance (ServicesOverview → `/services` and
Industries → `/industries` both have one). Site-level the link did exist in
Header and Footer, so this was a section-level inconsistency rather than an
orphan. **Fixed:** added an "All use cases" `Button` with `variant="onDark"` —
`onDark` and not `outline` because brand-secondary fails contrast on graphite.

**Finding 2 — contrast sweep: 1 failure, and it is the known accepted one.**
Scripted sweep over every text-bearing element at 1440px (resolves effective
background through ancestors, applies the correct 3:1 / 4.5:1 bar by size and
weight). Single hit: white on the primary button. This is the **accepted
exception the user signed off on 2026-09-21** — do not "fix" it without asking
again. Note the script *under-reports* it (1.04:1) because it resolves
background-*color* and the button's fill is a gradient background-image; the
real figure is 2.35:1 at the gradient's light end. Everything else on the page
passes, including the reworked capability strip (`n-500` on `n-25`).

No other findings. Scripts for both sweeps are in the session scratchpad; the
CDP technique and its two traps are documented in the phase-2 entry above.

## vrattiks-page-builder — 13-step workflow re-run against Home (2026-09-22)

Re-run explicitly so the orchestrator's use is verifiable rather than merely
"consistent with the outcome". Each step now points at where its output lives.

| # | Step | Where the output is, and what cites it |
|---|---|---|
| 1 | Identify page | Home = `/`, main page, `vrattiks-architecture` §1 row 01 |
| 2 | Pull required sections | §2 Home list, composed in `app/page.tsx`; the two omissions are commented inline with their reason |
| 3 | Inspect before writing | no new components this pass; every section reuses `ui/` primitives (`Section`, `Container`, `SectionHeading`, `Eyebrow`, `Button`, `Icon`, `Reveal`) |
| 4 | Style with design-system | cited at `globals.css` (§1 tokens) and `FinalCTA.tsx` (§3 one gradient surface) |
| 5 | Wire content honestly | cited at `page.tsx`, `KpiResults.tsx`, `HeroVisual.tsx`, `CaseStudies.tsx`, `Testimonials.tsx` — all `vrattiks-standards` §3 |
| 6 | Link it in | §3 nav = `Header.tsx` nav array; §5 = the gap found and fixed in `UseCases.tsx` this pass |
| 7 | Metadata | **now cited** in the comment above the `metadata` block in `app/page.tsx` |
| 8 | Accessibility | **now cited** in `ui/Section.tsx` (landmark + `aria-labelledby`) and `ui/Reveal.tsx` (reduced motion) |
| 9 | Performance | **now cited** at the `next/image` call in `Header.tsx`, incl. why `priority` sits there and nowhere else |
| 10 | Verify responsive | CDP sweep, ten widths, 0 overflow |
| 11 | Run verification | `npm run build` / `npm run lint` / `tsc --noEmit` — all clean |
| 12 | Validate checklist | table in the review entry above |
| 13 | Report | this entry + the review entry |

Steps 1–6 were satisfied by work already in the tree and are recorded here with
their existing citations; steps 7–9 previously had **no** citation and now do.

## App icons — replaced the create-next-app default (2026-09-22)

**The site was still shipping Vercel's Next.js logo as its browser-tab icon.**
`app/favicon.ico` had only ever been touched by commit `9823d5c "Initial commit
from Create Next App"` — it was the untouched CNA default, 25,931 bytes.
Meanwhile `public/brand/vrattiks-icon.png` (the lilac pinwheel mark, 126x126
RGBA) existed in the repo and was referenced by nothing.

Built the icon set per the **Next 16 `app/` file convention**, confirmed against
`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md`
(per AGENTS.md — do not write these from memory of older Next versions):

| File | What | Why |
|---|---|---|
| `app/favicon.ico` | 16/32/48, PNG-compressed entries | replaces the CNA default; multi-size so Windows/legacy surfaces don't downscale one big bitmap |
| `app/icon.png` | 126x126, transparent, native size | browser tab; edge-to-edge because at 16px every pixel counts, transparent so it works on light *and* dark browser chrome |
| `app/apple-icon.png` | 180x180, opaque `--color-brand-graphite` | iOS home screen |

Two non-obvious constraints that drove the apple-icon:

- **iOS renders alpha as black**, so that one is flattened onto a solid
  background. Graphite `#16161d` was chosen because the mark is lilac
  `#b79af3` — on white it washes out. **`docs/index.html` gives no app-icon
  rule**, so this is a judgement call, not a documented brand decision; revisit
  if the brand doc ever specifies one.
- **iOS masks the icon to a rounded rect**, which would clip an edge-to-edge
  mark's corners. The source mark has zero built-in padding (verified: its
  trimmed content box is the full 126x126), so it sits at native 126px on a
  180px canvas — 70% content, inside Apple's safe area, and with **no upscaling
  blur**, since the source is only 126px to begin with.

Generated with **sharp**, which is already present as a transitive dependency of
`next` — used as a one-off build tool and deliberately **not** added to
`package.json` (`vrattiks-performance`: "no duplicate dependencies"). The
generator script is in the session scratchpad, not the repo; re-run it from
`public/brand/vrattiks-icon.png` if the mark ever changes. sharp cannot write
ICO, so the container is hand-packed (header + 16-byte directory entries + PNG
payloads) — validated by parsing it back: type 1, 3 entries, all PNG signatures
intact, declared byte ranges ending exactly at file size.

Verified on the built site: Next emits all three `<link>` tags and all three
assets serve 200 with correct content types.

**Left alone deliberately:** `public/` still contains `next.svg`, `vercel.svg`,
`file.svg`, `globe.svg`, `window.svg` — unused create-next-app boilerplate, and
the first two are Vercel/Next *branding* sitting in a client marketing site.
Out of scope for an icon fix; delete them in a cleanup pass.

## Social / OG card (2026-09-22)

Closes the gap flagged in `page.tsx` and in Pending below: the OG image was the
413x126 logo, so every link preview letterboxed it, and the Twitter card was
stuck on `summary` for want of a 1200x630 asset.

**`app/opengraph-image.png`** — 1200x630, built from brand assets only:

- Ground is `--color-brand-graphite`; the **white wordmark sits at its NATIVE
  413x126**, not upscaled. That is 34% of the card width and renders ~172px in a
  typical feed — readable, and crisp, which a 1.5x upscale would not be.
- A soft brand-mark wash bleeds off the right edge, and a `--brand-gradient` bar
  runs along the bottom edge only (CLAUDE.md Design Taste, Stripe read: accent
  confined to an edge, never a whole surface).
- **No text is baked into the card.** `og:title` / `og:description` already
  supply the words, so baking them in would duplicate them in the preview — and
  the brand faces exist locally only as hashed `.woff2` in the Next build cache,
  which neither satori nor librsvg can consume. Do not "fix" this by fetching a
  TTF at build time; the card does not need text.

**Two traps found while wiring it, both verified rather than assumed:**

1. **Blur cannot fall off past its own layer boundary.** The first build blurred
   an edge-to-edge 620px mark, which left a hard vertical seam where the layer
   met the background. The mark is now resized to 460px and padded 80px with
   transparency *before* blurring, so the fade reaches nothing on the three
   edges that sit inside the card.
2. **`app/opengraph-image.alt.txt` is silently ignored when the page also
   exports its own `openGraph` object.** Verified on **Next 16.3.4 with a clean
   `.next`**: og:image, :type, :width and :height were all emitted, og:image:alt
   never was. The docs say it should work, so this is version-specific
   behaviour. The alt is therefore declared explicitly in `page.tsx` — which
   emits exactly **one** og:image tag (no duplicate with the file convention)
   and carries the alt. The `.alt.txt` file was deleted as dead weight.

**Trade-off accepted:** declaring `images` explicitly loses the convention's
content-hash query string, so `/opengraph-image.png` is a stable URL. **If the
card art changes, social platforms must be asked to re-scrape or the filename
bumped**, or they will keep serving the cached old card.

`twitter.card` is now `summary_large_image`, and `twitter.images` was removed —
X falls back to og:image, so the card and its alt are shared rather than
duplicated as a second file. This resolves the documented `vrattiks-seo`
deviation ("summary_large_image where an OG image exists").

Generator script is in the session scratchpad, not the repo. Re-run from
`public/brand/vrattiks-logo-white.png` + `vrattiks-icon.png` if the brand
changes.

**Still true: there is no photography or product imagery anywhere in this repo.**
Every image asset is a logo variant or the brand mark, and the hero "visual" is
a coded sketch (`HeroVisual.tsx`), deliberately so. Any request to put a real
photo or product screenshot on a page needs the asset supplied first —
`vrattiks-standards` §3 rules out inventing one.

## WhatsApp glyph redrawn (2026-09-22)

The `whatsapp` entry in `ui/Icon.tsx` drew its handset as a single bare curve
(`M8.5 10.5c0 3 2 5 5 5`). Rendered, that reads as a meaningless hook rather
than a receiver — so the glyph was effectively "a speech bubble", visually
interchangeable with the `chat` icon sitting near it in the same service grid.

Redrawn as the real receiver abstraction: two rounded pads joined by an L-bend,
which is the part that survives at small sizes. Bubble radius is **8.7, chosen
to sit with `globe` (r=9)** rather than introducing a third circle size into a
24-box set that otherwise reuses two.

**Method worth reusing:** candidates were rasterised through the *project's own*
Icon settings (24 viewBox, `stroke-width` 1.75, round caps/joins) at display
size and compared side by side, rather than judged from path data. Four bubble
/ handset pairings were rendered, then four tail-weight variants of the winner.
The script is in the session scratchpad.

**Sizes actually in use are smaller than assumed** — the glyph renders at 20px
(ServicesOverview card), 16px (HeroVisual event row) and **14px** (HeroVisual
channel list). All three were screenshotted in context on the running page and
verified legible; 14px is the real constraint, so **do not add detail to this
glyph** — anything finer than the current two paths will fill in.

## E-commerce removed from Industries (2026-09-22)

Removed from `industries` in `app/lib/content.ts` at the user's request. Home's
Industries section now lists five: Real Estate, Healthcare, Finance,
Manufacturing, Hospitality.

**⚠ This contradicts `vrattiks-architecture`, which was NOT changed.** §1 lists
E-commerce as industry 04.2 (`/industries/e-commerce`) and §2 requires six
industry cards; that file is the SSOT sourced from the client's "Task 3 | Final
Pages List" PDF. Note the irony recorded earlier in this log: E-commerce was
*added* in the first place precisely because §1 required six and only five
existed. **Open question for the user: should the architecture skill be updated
to drop 04.2, or is this a Home-page-only trim?** Until that is answered the
code and the SSOT disagree — a comment at the removal site in `content.ts` says
so, so it can't be mistaken for an oversight.

No layout risk: the section is a `flex flex-col` index list, not a grid, so an
odd count leaves no orphaned cell. The `bag` glyph in `ui/Icon.tsx` is now
unreferenced — deliberately kept, since Icon is a library and the glyph is
correct; it costs nothing and is what E-commerce would use if restored.

Verified: build/lint/tsc clean, zero "e-commerce" in the rendered HTML, five
`/industries/*` links, page audit still passes at all ten widths.

## UI/UX defect pass on Home (2026-09-22)

A `vrattiks-page-review` inspect-first pass. Everything here was a **defect**,
not a taste change — no section was restructured and no copy was touched.

1. **Anchor targets sat under the sticky header.** `[id] { scroll-margin-top }`
   added in `globals.css` `@layer base` — 88px mobile, 104px from `md` (header
   height plus a gap; flush against the bar reads as clipped). This affected
   the skip link's `#main` and every `#services` / `#faq` / `#get-started`
   style link. Set on `[id]` deliberately so a new anchor can't forget it.
2. **Header had no active state.** `usePathname` + `aria-current="page"`;
   desktop gets an underline, mobile a leading dash. The underline is SOLID
   `brand-secondary`, not `--brand-gradient` — the hero viewport already spends
   its one gradient budget on the H1 span and the primary button.
3. **`aria-controls="mobile-nav"` pointed at nothing while closed** — i.e.
   exactly when a screen reader reads it. The mobile nav is now always rendered
   and toggled with `hidden`; `display:none` keeps it out of the tab order, so
   unmounting bought nothing. Escape now closes it and returns focus to the
   toggle. Its landmark was also renamed "Menu" so two navs can't both be
   "Primary".
4. **Industries arrows were `opacity-0` until hover** — on touch they never
   appeared, so eight real links read as static text. Now rest at `n-400` and
   brighten on hover; the movement is the reward, not the appearance.
5. **Invalid nesting** — `<span>` wrapping `<h3>` in ServicesOverview and
   UseCases. `<span>` takes phrasing content only; browsers were silently
   re-parenting it, which is why it looked fine.
6. **Process rail ran past the last dot.** It was one `md:w-full` span on the
   `<ol>`, leaving ~185px of gradient trailing after step 5 — a sixth step that
   doesn't exist. Now one connector per step, rendered for all but the last.
   ⚠ The desktop `md:-right-11` (44px) is derived from the 24px dot plus the
   32px `md:gap-8`. **Change it if that gap ever changes.**
7. **Arrow icons at `text-n-300`** = 1.81:1 on white, under the 3:1 non-text
   bar. Moved to `n-400`.
8. **Footer link tap targets were ~23px.** `gap-3` on the list swapped for
   `gap-1` + `py-1.5` on the links: same visual rhythm, ~35px of hit area.

`npm run lint` and `npm run build` both clean. Verified against the built HTML
rather than by eye — note the static HTML duplicates all markup x2 for the RSC
flight payload, so counts there must be halved (5 process dots read as 10).

**Not fixed, deliberately:** the UseCases row link now carries an `aria-label`
of just the use-case name. The three-sentence row text stays in the a11y tree
and is still read in browse mode; only the link's NAME is shortened. If that
turns out to be the wrong call, remove the `aria-label` rather than rewriting
the row.

## Problem grid de-promoted — client request (2026-09-22)

Card 03 ("Leads that never get followed up") in `WhyBusinessesNeedAI` was the
section's single inverted `bg-brand-graphite` card. The client asked for it to
be white like the other five, so the `PROMOTED` constant and all four
conditional class branches are gone — the grid is now uniform.

**Concern was raised before making the change and the request was repeated, so
it stands.** Recorded here and in the component's doc comment so a later design
pass does not silently "fix" it back: the grid is now CLAUDE.md slop tell #4
(everything on white, n-500 text, n-200 border, no value contrast, nowhere for
the eye to land). If the section is ever asked to feel stronger again,
restoring one promoted card is the cheapest fix — not a gradient (budget
claimed by Services) and not an icon set (same).

Verified in the built HTML: zero graphite cards in the grid, six white ones.
`npm run lint` and `npm run build` clean.

## Pending / not started

- No content/copy finalized beyond the design doc's placeholder examples.
- ~~Logo image assets don't exist in the repo; Header/Footer use a text wordmark.~~ **RESOLVED** — `public/brand/` now holds `vrattiks-logo.png`, `vrattiks-logo-white.png` and `vrattiks-icon.png`, and Header/Footer both render the real asset through `next/image`. The six `Vrattiks - Logo*.png` files still sitting at the **repo root** are the unprocessed originals; `public/brand/` is what the app uses.
- All brand art is small — the wordmark is 413x126 and the mark 126x126. Anything needing a larger rendition (a big hero lockup, print) needs a new export from the source file, not an upscale. `Vrattiks Logo - Final.pdf` at the repo root is the likely source.
- `public/` still contains `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` — unused create-next-app boilerplate, and the first two are Vercel/Next *branding* in a client marketing site. Delete in a cleanup pass.
- KPI/Results, Case Studies, and Testimonials sections on Home use honest non-numeric/pending placeholders (no verified stats, case studies, or testimonials exist yet per `vrattiks-standards` §3) — replace with real content once available.
- Only Home exists as a route — all other pages in `vrattiks-architecture` §1 (Company, Services + 6 detail pages, Industries + 6, Use Cases + 3, Case Studies, Products, Blog, Contact) are linked to from Home/nav/footer but not yet built, so those links currently 404.
- Header nav is a flat link list (no dropdown submenus for Services/Industries/Use Cases yet) and only shows the full desktop nav at Tailwind's default `lg` (1024px) breakpoint — cramming all 9 top-level items + logo + CTA overflowed right at the 1024px test width when tried at the custom 901px `md` breakpoint, so it was deferred to 1024px where there's enough room. Revisit if nav items are ever trimmed.
- Added `--breakpoint-sm: 601px` / `--breakpoint-md: 901px` to `app/globals.css` `@theme` to match the design system's tablet/desktop bands (previously undefined in Tailwind config, only present in `docs/index.html`'s own stylesheet) — applies project-wide now, not just Home.

## Open questions

- **The Hero H1 (48px) is now only 1.04x the largest section H2** — `KpiResults` uses `clamp(30px,4.4vw,46px)`. The two are never on screen together and the H1 still beats its own subtext 2.8:1, but at page scale the "display-scale jump" that CLAUDE.md's Design Taste section calls for is effectively gone. Fix is to bring `KpiResults` down (e.g. to the standard `clamp(28px,3.4vw,40px)` the other sections use) rather than to re-inflate the H1 — awaiting user call.
