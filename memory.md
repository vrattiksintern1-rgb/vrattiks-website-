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

**Superseded 2026-09-29 — see "Stock photography added to Home" below.** ~~Still true: there is no photography or product imagery anywhere in this repo.~~
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

## Home redesign — "premium product" pass (2026-09-23)

User brief: the page felt generic/templated; rebuild it to read as a premium
agency/product homepage. All eleven listed skills were loaded and applied in
the order given. Three conflicts were surfaced BEFORE any code was written and
the user chose the resolution for each:

1. **Section count** — `vrattiks-architecture` §2 mandates 12 Home sections;
   the brief listed 7. Chosen: build the 7 as the spine and FOLD the remaining
   required topics in as compressed treatments, so nothing required is dropped.
2. **Positioning** — the brief described Vrattiks as n8n / lead-generation &
   outreach automation; the repo's confirmed content is 6 broader services.
   Chosen: the lead-gen pipeline is now Home's hero story, and the 6 services
   remain the catalogue. No repo content was deleted or rewritten.
3. **Stat numbers** — the brief asked for editable placeholder figures;
   `vrattiks-standards` §3 bans invented stats and a previous pass had removed
   exactly these. Chosen: visibly-marked placeholders in ONE block plus a
   written honest qualifier rendered on the page.

### New page composition (`app/page.tsx`)

Nine sections, down from eleven, with no two consecutive sections sharing a
structure and surface value alternating down the page:

| Section | Surface | Structure |
|---|---|---|
| Hero | n-25 | centred anchor + product visual |
| TrustStrip | n-0 | thin band, deliberately breaks the vertical rhythm |
| WhatWeDo | n-25 | icon card grid — the page's ONLY one |
| Pipeline | n-50 | horizontal rail (lg+) / vertical timeline |
| KpiResults | graphite | stat tiles |
| WhyVrattiks | n-0 | single-column narrative, no cards |
| CatalogueIndex | n-25 | typographic link index |
| FAQ | n-0 | accordion |
| FinalCTA | graphite | centred band, bookends the Hero |

### Files

- **New**: `TrustStrip.tsx`, `WhatWeDo.tsx`, `Pipeline.tsx`, `CatalogueIndex.tsx`.
- **Rewritten**: `Hero.tsx` (new headline/copy, capability strip moved out),
  `HeroVisual.tsx` (retargeted to the outreach run), `KpiResults.tsx` (stat
  numerals + qualifier), `WhyVrattiks.tsx` (now the merged narrative),
  `page.tsx` (composition + metadata).
- **Edited**: `FAQ.tsx` (2 answers + surface tone), `FinalCTA.tsx` (copy, CTA
  label case), `ui/Icon.tsx` (+4 glyphs: sparkle, image, database, mail),
  `lib/content.ts` (+PLACEHOLDER_STATS, statsQualifier, pipelineStages,
  capabilities, integrations).
- **Off Home but INTACT on disk** — do not delete, they are the right
  components for their own routes: `ServicesOverview` (/services),
  `UseCases` (/use-cases), `Industries` (/industries), `WhyBusinessesNeedAI`
  (/company), `Process` (/services — the Discover→Support engagement steps,
  which is a different thing from the new product Pipeline).

### ⚠ Carry-forward warnings

- **PLACEHOLDER_STATS in `app/lib/content.ts` are invented figures.** They
  ship with two guardrails that must not be removed while the numbers are
  fake: one edit location, and `statsQualifier` rendered on the page. Never
  lift these into JSON-LD.
- **`integrations` in content.ts is unconfirmed.** n8n / email / data logging
  are user-stated; WhatsApp and CRM are grounded in the services list;
  "Google Sheets" and "Web forms" are INFERRED and need confirmation.
- **n-400 is NOT 4.1:1 on white.** It measures 2.88:1 and fails the 3:1
  non-text bar. An older comment in `Industries.tsx` claims 4.1:1 and is
  wrong — `Industries.tsx` still uses n-400 for its row arrows and should be
  fixed to n-500 when that component is next touched. All new Home components
  use n-500/n-600.
- **Contrast must be checked on HOVER surfaces, not just resting ones.** The
  CatalogueIndex context line is n-600 rather than n-500 purely because the
  row tints to n-100 on hover, where n-500 drops to 3.95:1.
- **Deviation from `vrattiks-architecture` §2 is recorded in `page.tsx`'s top
  comment**, approved by the user on 2026-09-23. Reconcile there if the
  client's Task 3 pages list is re-issued.

### Verified / not verified

- Verified: `npm run lint` and `npm run build` clean; heading structure from
  the prerendered HTML (exactly one h1, h2 per section, no skipped levels, no
  invalid `<dl>`); every `lg:` utility Pipeline depends on is emitted and
  `lg` = 1024px; 24 foreground/background pairs contrast-checked by script.
- **NOT verified: rendered layout at any viewport width.** No browser
  automation was available in that session, so the responsive pass was
  class-level reasoning only. `vrattiks-responsive`'s 1440/1280/1024/768/430/
  390/375 matrix still needs a real visual check — Pipeline at 1024 (5 columns
  at ~176px each) and the WhatWeDo featured card at 901–1024 are the two most
  likely places to find a problem.

## Home services → slider (2026-10-01)

- Client asked for the Home services section as a slide. `ServicesOverview` now takes `layout?: "grid" | "slider"` (default `grid`); only `app/page.tsx` passes `layout="slider"`. `/services` still renders the full grid.
- Card markup extracted to `app/components/ServiceCard.tsx` (shared by both layouts). Slider is `app/components/ServicesSlider.tsx` (client): native CSS scroll-snap track (swipe/trackpad/keyboard focus work natively), prev/next round buttons, and a hairline progress bar whose brand-primary thumb is the section's one accent. 3 cards visible ≥md, 2 at sm, 85% width on mobile so the next card peeks.
- Added `arrowLeft` / `arrowRight` to `ui/Icon.tsx`. Smooth scroll is disabled under reduced motion.
- Verified: tsc, lint, `npm run build` pass.
- **Follow-up (same day): autoplay + centre zoom.** Client asked for the slider to auto-advance and for the centred card to be zoomed. Now: `snap-center`, the active (centred) card gets `scale-105` (an active-slide state, deliberately *not* a hover scale — the no-hover-scale rule still holds). Autoplay every 3.5s via one timeout per active slide (any manual swipe/click restarts the countdown). Infinite loop: the list renders 3× and silently jumps by one copy width when a scroll settles in an outer copy; outer copies are `inert` + `aria-hidden`. Pauses on mouse hover, keyboard focus (`:focus-visible` only — mouse clicks on arrows must not pause it), off-screen, hidden tab; reduced-motion users start paused. Controls: 6 segment buttons (active = brand-primary), prev / pause-play / next. Added `pause`/`play` icons.
- Verified headless (CDP, `next start`) at 1440/768/375: autoplay advances one card per tick, active card exactly centred (0px off), scale 1.05 not clipped, zero page overflow-x, and next-past-last loops back to service #1 in the middle copy.

## Pending / not started

- No content/copy finalized beyond the design doc's placeholder examples.
- ~~Logo image assets don't exist in the repo; Header/Footer use a text wordmark.~~ **RESOLVED** — `public/brand/` now holds `vrattiks-logo.png`, `vrattiks-logo-white.png` and `vrattiks-icon.png`, and Header/Footer both render the real asset through `next/image`. The six `Vrattiks - Logo*.png` files still sitting at the **repo root** are the unprocessed originals; `public/brand/` is what the app uses.
- All brand art is small — the wordmark is 413x126 and the mark 126x126. Anything needing a larger rendition (a big hero lockup, print) needs a new export from the source file, not an upscale. `Vrattiks Logo - Final.pdf` at the repo root is the likely source.
- `public/` still contains `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` — unused create-next-app boilerplate, and the first two are Vercel/Next *branding* in a client marketing site. Delete in a cleanup pass.
- KPI/Results, Case Studies, and Testimonials sections on Home use honest non-numeric/pending placeholders (no verified stats, case studies, or testimonials exist yet per `vrattiks-standards` §3) — replace with real content once available.
- ~~Only Home exists as a route~~ (outdated: Company, Services + details, Industries, Use Cases overview and Contact now exist) — all other pages in `vrattiks-architecture` §1 (Company, Services + 6 detail pages, Industries + 6, Use Cases + 3, Case Studies, Products, Blog, Contact) are linked to from Home/nav/footer but not yet built, so those links currently 404.
- Header nav is a flat link list (~~no dropdown submenus~~ Services and Industries now have dropdowns, see the 2026-10-03 entries) and only shows the full desktop nav at Tailwind's default `lg` (1024px) breakpoint — cramming all 9 top-level items + logo + CTA overflowed right at the 1024px test width when tried at the custom 901px `md` breakpoint, so it was deferred to 1024px where there's enough room. Revisit if nav items are ever trimmed.
- Added `--breakpoint-sm: 601px` / `--breakpoint-md: 901px` to `app/globals.css` `@theme` to match the design system's tablet/desktop bands (previously undefined in Tailwind config, only present in `docs/index.html`'s own stylesheet) — applies project-wide now, not just Home.

## Open questions

- **The Hero H1 (48px) is now only 1.04x the largest section H2** — `KpiResults` uses `clamp(30px,4.4vw,46px)`. The two are never on screen together and the H1 still beats its own subtext 2.8:1, but at page scale the "display-scale jump" that CLAUDE.md's Design Taste section calls for is effectively gone. Fix is to bring `KpiResults` down (e.g. to the standard `clamp(28px,3.4vw,40px)` the other sections use) rather than to re-inflate the H1 — awaiting user call.

## Headings switched to monospace — client request (2026-09-28)

- Client asked for "headings in mono". `--font-display` in `app/globals.css` now points at IBM Plex Mono (was Urbanist), so every `font-display` heading changed in one place; body stays IBM Plex Sans. This **departs from docs/index.html §4** (Urbanist headings) — a client decision, not a brand-doc update.
- Urbanist no longer loaded; Plex Mono now loads 400/500/600/700 (headings use 600/700). Logo is an image, so unaffected.
- Hero H1 mobile size 36px → 32px (mono is wider; keeps line count reasonable at 375px).
- Added type-scale tokens to `@theme` (`text-h1/h2/h3/body/body-lg/label`) — `text-label` and `text-body-lg` were used by components but previously undefined.
- **Regression re-fixed:** font `.variable` classes had drifted back onto `<body>`; moved to `<html>` again (see 2026-09-18 entry).
- To revert to Urbanist: restore `Urbanist` import in `layout.tsx` and set `--font-display: var(--font-urbanist), sans-serif`.

## KpiResults copy rewritten with numbers — client request (2026-09-28)

- "What automation changes for your business" got a section description and sharper card copy that uses numbers.
- The numbers are **illustrative scenarios** (an 11 PM enquiry, day 1/3/7 follow-ups, 24 hours a day, 7 days a week, 10 vs 500 leads). They are not measured results, so they stay within vrattiks-standards §3. Swap in real metrics only once case-study data exists.
- **Redesigned as a dark band (2026-10-01, user request):** a bento layout (one large graphite tile plus mixed white tiles) was tried first and the user rejected it the same day as unbalanced. Now the whole section is a `bg-brand-graphite` band: left-aligned `SectionHeading tone="dark"` with eyebrow "The difference", then four EQUAL tiles (`n-0/[0.04]` fill, `n-0/10` hairline). Each tile has an icon ring, a 56px numeral, the metric line (`sm:min-h-[4.2em]` so the dividers line up across the row), a divider, then the label and description on n-300. 4 columns at lg, 2 at sm, stacked on phones. Copy unchanged. Don't bring the bento back. Verified at 1440/1024/768/375: no overflow; lint and tsc are clean.
- **KPI numerals added (2026-10-01, user request):** each column now leads with a display-scale value (`<60s` / `3` / `24/7` / `100%`) plus an uppercase metric line saying what it measures. Every value restates a *capability* already in that card's copy (reply in seconds, 3 follow-ups, always-on, every lead tracked). None is an outcome claim like "60% more leads". Replace with measured figures once case-study data exists.

## Industries expanded to eleven (2026-09-28)

At the user's request, `industries` in `app/lib/content.ts` now also lists EdTech
& Coaching, Higher Education, Restaurants & Food, Salons, Spas & Wellness,
Automobile Sales & Service, and Construction & Infrastructure. "Finance" was
renamed "Finance & Insurance" and kept slug `finance`, so it still matches
`vrattiks-architecture` 04.4. New glyphs added to `ui/Icon.tsx`: `book`,
`graduationCap`, `utensils`, `scissors`, `car`, `hardHat`.

**⚠ `vrattiks-architecture` §1 was NOT updated.** It is sourced from the client's
PDF and still lists six industries. The new slugs (`edtech-coaching`,
`higher-education`, `restaurants-food`, `salons-spas-wellness`, `automobile`,
`construction`) are not in the SSOT yet, and no `/industries/*` routes exist.

Verification was blocked. `tsc` and `next build` fail on the untracked
`CatalogueIndex`, `Pipeline`, `TrustStrip`, and `WhatWeDo` components, which
import `pipelineStages`/`integrations`/`capabilities` (not in `content.ts`) and
pass `id` to `SectionHeading`. The changed files themselves have no type errors.

## Per-section card redesign — tried and REVERTED (2026-09-28)

A pass gave every Home section its own card treatment (stat ledger, dark
Use Cases matrix, Industries mosaic, timeline Process, etc.). **The user asked
for it to be removed**, so all ten section components, the `plus` glyph and the
`.bg-hatch` utility were restored to their prior state. Don't redo it unasked.

Kept from that pass: the **`ui/Reveal.tsx` reduced-motion fix**. Under OS
reduced motion every Reveal stayed at opacity 0 forever (SSR rendered the
hidden `initial`; the client then set `initial`/`whileInView` to undefined, so
nothing animated) — a blank page plus a hydration mismatch. Props are now the
same on server and client, and reduced motion uses `duration: 0`.
`HeroVisual.tsx` still has the same bug (the three hero chips).

`ui/Container.tsx` (2026-10-03, user asked for small, consistent side gaps,
never full-width): `mx-auto max-w-[1440px]` centred, padding 16px mobile /
20px sm / 24px tablet (md) / 40px desktop (lg) / 48px xl — lg/xl bumped from
32px on 2026-10-03 for "slightly more" side space. Section backgrounds stay
full-bleed; only content is capped. History of user feedback: `max-w-[1180px]`
(too narrow) → no max-width, 16/20px (too close to edges) → current. A wider
pass (20/24/32/48/64px) was tried and the user asked to revert it — keep the
current values unless asked.

## Per-section card redesign — done at user request (2026-09-28)

The user explicitly asked again for every Home card section to get its own
treatment, with **no copy changes**. This supersedes the "don't redo it
unasked" note above. Pre-change copies of all ten components +
`ui/SectionHeading.tsx` were saved to the session scratchpad
(`backup-before-cards/`) — if the user asks to revert again, `git diff` is not
enough (the working tree was already uncommitted), restore from there or ask.

| Section | Treatment |
|---|---|
| KpiResults | open stat ledger — hairline column rules, label at display scale, no boxes/hover (gradient icon squares removed) |
| WhyBusinessesNeedAI | one joined panel, cells share 1px dividers, text bottom-pinned |
| WhyVrattiks | n-50 tray of white pill rows with graphite icon discs (gradient panel removed) |
| ServicesOverview | outlined-circle icon, ruled footer + arrow disc; hover = border shift + glow |
| UseCases | **full-bleed graphite band**, Problem/Solution/Benefit matrix, Benefit = primary left edge; stretched row link |
| Industries | ruled directory — top hairline per entry, no box; icon square fills on hover |
| CaseStudies | editorial split card, hatched cover panel |
| Process | numbered ringed nodes on one 2px gradient rail (md+), vertical timeline below md; heading now left-aligned |
| Testimonials | speech-bubble card with tail + placeholder avatar/bars (plain divs, not blockquote — it's a notice) |
| FAQ | sticky-heading split + divider accordion with CSS +/− toggle (Icon import dropped) |

`SectionHeading` gained optional `tone="dark"`. Verified with Playwright
(playwright-core in scratchpad, cached chromium-1234) at 1440/1024/768/375:
no horizontal overflow, layouts checked visually. Lint clean; tsc adds no new
errors (the 13 remaining are the four known untracked off-page files).

## Mono removed, back to the design-system fonts (2026-09-29)

- User asked for the design-system font everywhere. This **reverses the 2026-09-28 "headings in mono" client request.** `vrattiks-design-system.pdf` §4 allows exactly two faces, Urbanist (H1–H3, 600/700) and IBM Plex Sans (body, buttons, forms, labels, 400/500/600), and says "never mix in a third typeface".
- `layout.tsx` loads Urbanist + IBM Plex Sans. IBM Plex Mono is no longer loaded, and `--font-mono` is gone from `@theme`. All 8 `font-mono` usages (eyebrow-style labels, table headers, the Process step numbers, HeroVisual chip subtext) are now `font-body`. They keep their uppercase and tracking.
- Hero H1 mobile size is back to 36px. The 32px size was only there because mono runs wider.
- CLAUDE.md and the `vrattiks-design-system`, `ui-ux-pro-max`, and `awesome-design` skills used to recommend mono for labels and eyebrows. They now say Plex Sans, uppercase and tracked, so mono doesn't come back through later work.
- Verified on the running dev server: `<html>` carries both font variables, the served CSS has `--font-display: var(--font-urbanist)`, and there are zero Plex Mono or `.font-mono` references. `tsc` still reports the same 13 pre-existing errors in the unused `Pipeline`/`TrustStrip`/`WhatWeDo`/`CatalogueIndex` components, with or without this change.

## Stock photography added to Home (2026-09-29)

User asked to "add images in home page according to content". No client-supplied
photos exist, so these are **Unsplash License stock photos** (free for commercial
use, no attribution required). They show generic industry scenes only: no photo
stands in for a client, a team member, a founder or a result. Posed office
portraits were deliberately rejected because they would read as "the Vrattiks
team". **Replace any of them with client-supplied or approved photography when
available.** Files live in `public/images/`; each is ~80–200 KB, and `next/image`
serves resized WebP.

- **Hero**: a stock photo (shop owner on a call) was added, then **removed at the
  user's request the same day**. `HeroVisual.tsx` is back to the coded gradient
  panel + status chips. Don't re-add a hero photo without asking.
- **Industries** (`Industries.tsx`): each of the 11 entries leads with a photo.
  Phones show a 96px thumbnail beside the text; `sm` and up show a full-width photo
  above it (3:2, then 16:9 from `md`). The icon square was dropped from this
  section, but the `icon` field stays in `content.ts`. The photos are decorative
  (`alt=""`) because the link text names the industry. The path is on the new
  `Industry.image` field in `content.ts`.

Sources (Unsplash photo ID → photographer):
real-estate hmlP-v0vJ5o (Elite Prop) ·
healthcare-consultation BUNNEclz-yQ (Vitaly Gariev) · finance hdfPDesgEw8 (NinthGrid) ·
manufacturing HNLlzPGbTBM (MGR P) · hospitality kfnWOD1Tbp8 (Neon Wang) ·
edtech-coaching 6MePtA9EVDA (Thomas Park) · higher-education LCwo5opgr9M (Sanket Mishra) ·
restaurants-food ZEfHrVDF3NM (Mustafa Fatemi) · salons-spas-wellness FkAZqQJTbXM (Adam Winger) ·
automobile bC5NNbwuoB0 (Crosby Hinze) · construction 2wqCQc9WpIw (Saumya Jain).
Rejected: a hard-hat crew photo whose vests carry a real company's logo.

Verified: lint clean; no type errors in changed files; rendered in headless Chrome
at 1440/1024/768/390 with no horizontal overflow, and the chips clear the subject
at every width (hero check now moot). `npm run build` still fails, but only on the four pre-existing
untracked-component errors noted above.

## Company page built — `/company` (2026-09-29)

Built via `vrattiks-page-builder`, sections in `vrattiks-architecture` §2 order:
`CompanyIntro` (H1 + story image; facts `<dl>` removed 2026-10-03) → `OurStory` (sticky split) →
`MissionVision` (graphite band, the page's one dark reset) → `CompanyValues`
(five-element ruled strip, 5 columns at lg, rows below) → `Founders` (two
monogram cards) → `WhyVrattiks` (reused) → `FinalCTA` (reused, the page's only
gradient surface).

- **Content status:** brand story and co-founder names (Hitesh Dave, Arpit
  Patel) are the user-provided copy from 2026-09-12, used verbatim — still
  pending client sign-off. **Mission & Vision are drafted placeholder copy**
  (commented in `MissionVision.tsx`) — replace with approved wording. Founders
  show names + user-provided titles (2026-10-03: Arpit Patel "Co-Founder & CEO",
  Hitesh Dave "Co-Founder & CTO"), with initials monograms instead of photos; no
  bios invented. Founder names and titles also appear in the page's AboutPage
  JSON-LD (`jobTitle`) — keep the two in step.
- `WhyVrattiks` gained an optional `cta` prop (defaults to the Home link to
  `/company`); the Company page passes `/services` so it doesn't self-link.
- `ui/SectionHeading` gained an optional `id` (on the h2) for `Section`'s
  `labelledBy`. This also cleared 3 of the 13 pre-existing tsc errors
  (Pipeline/WhatWeDo passed `id`); 10 remain, all in the unused
  Pipeline/TrustStrip/WhatWeDo files, so `npm run build` still fails on those.
- Verified on the running dev server over CDP at 1440/1024/768/375: zero
  horizontal overflow, one h1, h2 per section, title "Company | Vrattiks
  Intelligence", canonical `/company`. Lint clean on all touched files.

## Services page built — `/services` (2026-09-29)

Built via `vrattiks-page-builder`, sections in `vrattiks-architecture` §2 order:
`ServicesIntro` (new: H1 + a graphite "How they fit together" panel grouping
the six services into three jobs: answer / keep track / follow through) →
`ServicesOverview` (reused, the 6 cards) → `Process` (reused) → `FinalCTA`
(reused, the page's only gradient surface).

- `ServicesOverview` gained optional `showAllLink` (default true; /services
  passes false so it doesn't link to itself) and `headingId`. `Process` gained
  `headingId`. Home passes neither, so Home is unchanged.
- The three-job grouping in `ServicesIntro` is our framing, not client copy.
  Its service names come from `content.ts`.
- JSON-LD is an `ItemList` of `Service` built from `content.ts` only. It has
  no pricing, ratings or results.
- The six `/services/*` detail routes still don't exist, so every card link 404s
  (same as Home).
- Verified in headless Chrome against the running dev server at
  1440/1280/1024/768/430/390/375: zero horizontal overflow, one h1, h2 per
  section, no self-link, title "Services | Vrattiks Intelligence", canonical
  `/services`. Lint is clean. tsc shows only the 10 known errors in the unused
  Pipeline/TrustStrip/WhatWeDo files, so `npm run build` still fails on those.
- **Update (same day):** "Learn more" briefly expanded cards in place
  (`ServiceCard.tsx`). The user then asked for a real page per service, so that
  card and the `expandable` prop were removed. See the next entry.

## Service detail pages built — `/services/[slug]` (2026-09-29)

One dynamic route, `app/services/[slug]/page.tsx`, prerenders all six via
`generateStaticParams`. `dynamicParams = false`, so an unknown slug returns 404
(verified). `params` is a Promise in Next 16 and is awaited in both the page
and `generateMetadata`. The section order follows the `vrattiks-architecture`
§2 service-detail template:

`ServiceHero` (breadcrumb back to /services, 60px name, headline, primary CTA
+ ghost "See how it works" → `#how-it-works`) → `ServiceProblems` (sticky
split, numbered ruled list) → `ServiceSteps` (graphite band, 4 steps) →
`ServiceFeatures` (2-col ruled checklist, deliberately not a 3-up card grid)
→ `ServiceBenefits` (display-scale `<dl>` ledger) → `ServiceFit` (industry +
use-case link lists) → `RelatedServices` (3 link cards, no icon) → `FinalCTA`.

- **Copy lives in `app/lib/service-details.ts`**, keyed by slug. It is drafted
  descriptive copy with no figures, client names or promised results. It is
  pending client approval. Tool names are kept generic because the integrations
  list is unconfirmed. `content.ts` `Service.details` is the hero paragraph.
  The earlier `points` field was removed.
- `FinalCTA` gained optional `title` / `description` / `buttonLabel`. The
  defaults are the old copy, so Home, Company and /services are unchanged.
  Detail pages use "Talk to us about {name}".
- JSON-LD per page: `Service` + `BreadcrumbList`, from the page's own copy only.
- Industry and use-case links still 404 (those routes aren't built). The
  industry slugs include the seven added 2026-09-28 that aren't in the
  architecture SSOT yet.
- Verified over CDP: all 6 pages at 1440 and 375, plus two pages at
  1024/768/430/390. Zero overflow, one h1, 7 h2s, no empty icons. Clicking a
  card on /services lands on the right page. Lint is clean. tsc shows only the
  10 known errors.

## Industries overview page built — `/industries` (2026-09-29)

Built via `vrattiks-page-builder`. Order: `IndustriesIntro` (new: H1 + a
desktop-only "Jump to your industry" nav linking to `#{slug}` anchors in the
directory) → `Industries` (reused, 11 photo entries) → `UseCases` (reused,
retitled "The same three problems, in every industry") → `FinalCTA` ("Don't see
your industry here?" / "Talk to us about your industry").

- **UseCases is an addition to §2's Industries list** (overview → cards → CTA),
  kept because it's the page's only non-white band and its links into
  `/use-cases`. Reason is commented at the top of `app/industries/page.tsx`.
- **Lists 11 industries from content.ts, not the 6 in `vrattiks-architecture`
  §1.** The SSOT is still not updated. Same open question as the 09-22/09-28 entries.
- `Industries` gained optional `eyebrow`/`title`/`description`/`headingId`; each
  entry's `<Link>` now carries `id={slug}` (the jump target, on Home too; harmless).
  `UseCases` gained optional `title`/`description`/`headingId`. Home passes none,
  so Home is unchanged.
- JSON-LD: `ItemList` of industry names + URLs from content.ts only.
- All `/industries/*` detail routes still 404. Build them next with an
  `industry-details.ts` + `[slug]` route, mirroring `/services/[slug]`.
- Verified with playwright-core + local Chrome against the dev server at
  1440/1280/1024/768/430/390/375: zero overflow, one h1, 3 h2s, 0 empty svgs,
  all 11 jump anchors resolve. Lint clean. tsc shows only the 10 known errors.

## Production build fixed — unused components removed (2026-09-29)

Vercel deploys were failing at `npm run build` (TypeScript step) because the
unused `Pipeline.tsx`, `TrustStrip.tsx` and `WhatWeDo.tsx` imported
`pipelineStages` / `integrations` / `capabilities`, which were never committed
to `content.ts`. At the user's request the three files were deleted (they
belonged to a dropped Home layout; recoverable from git history). The earlier
notes above saying "`npm run build` still fails on those" are now resolved:
`npm run build` passes locally and prerenders all 16 routes.

## Industries photos — graded, four replaced (2026-09-29)

The 11 stock photos didn't read as one set (heavy amber, saturated blue, blown
whites), and four of them didn't look like India at all.

- **Every file in `public/images/industries/` carries one grade**, applied with
  sharp: 40% of the way to gray-world white balance, luminance pulled halfway
  toward a common mean (128), saturation x0.85, mozjpeg. The script
  (`grade.cjs` / `prep.cjs`) is in the session scratchpad. **Re-apply the same
  grade to any photo added later** so the set stays uniform. Originals are in git.
- **Four photos replaced with India-context Unsplash License photos, approved by
  the user from a before/after preview:** EdTech `rwmYLRgkjsE` (Faisal Qureshi,
  coaching classroom, Mumbai) · Healthcare `etw3NOpgKDI` (drtondons dentalclinic,
  dentist with child, Lucknow; cropped from portrait, now `healthcare.jpg`, the old
  `healthcare-consultation.jpg` was deleted) · Finance `JhevWHCbVyw` (Towfiqu
  barbhuiya, hands on calculator) · Salons/Spas `g2u8gq5XcwE` (Tile Merchant
  Ireland, empty modern salon interior, Dublin; no readable branding). New ones are
  1200x800 (3:2), crops baked into the file.
  The first salon pick, `kvf5kfVMqng` (shirodhara, bare-shouldered client), was
  **rejected by the user the same day** and replaced by the interior. For this
  industry, prefer the business space over a close-up of a client's body.
- **Automobile replaced** with `XP8o9_Arwqg` (Dextar Studio, mechanic at a car
  in a bright service bay, Erbil, Iraq). User chose it over a garlanded Indian
  new-car delivery whose Mahindra logo was prominent. At full size it has a small
  "AMG Performance Center" sign and a Mercedes wheel-hub star; neither is legible
  at card size. Car photos almost always carry a maker's badge, so judge
  legibility at card size (~440px desktop, 96px mobile), not full size.
- **EdTech and Higher Education replaced (user's picks from a shortlist):**
  EdTech `6RTM8EsD1T8` (Kyle Gregory Devaras, young woman studying at a bright
  table) replaces the coaching-classroom photo above. Higher Education
  `ZsVCAQCXDFM` (Abhishek Choudhary, two students with backpacks on campus, Navi
  Mumbai), cropped from portrait with the window at y=450 so the 16:9 card crop
  keeps both heads. Rejected for this pair: a domed building that looks like a
  real IIT (implies an affiliation), a laptop shot with a prominent Apple logo, and
  a "MITTAL SCHOOL" building sign.
- **Higher Education replaced again the same day** — the user rejected the
  two-students photo. Now `k-fBdU_TdSo` (Muhammad Shakir, four students in college
  blazers walking on a campus path), cropped from portrait with the window at
  y=850 of 2700. Blazer/tie crests are unreadable; background flags are generic.
  Note: Unsplash IDs can contain hyphens, so take the ID from the full slug, not
  `split('-').pop()`.
  Known and accepted: the students' shirts carry a tiny institute badge that can't
  be read; the dental photo came from a real clinic's account but shows no branding.
- Still the old photos: real estate, hospitality, restaurants, manufacturing,
  construction. Replace the same way if asked.
- `Industries.tsx` adds an inset `ring-n-900/10` hairline over each photo so the
  bright ones keep an edge on the n-25 page.
- **Finding photos:** Unsplash blocks plain curl/API requests without a key.
  playwright-core driving local Chrome over `unsplash.com/s/photos/<q>?license=free`
  works; filter to `images.unsplash.com` srcs (plus.unsplash.com = paid Unsplash+).
  Bank searches return real bank logos, and office searches return posed portraits
  that read as "the team". Skip both.
- **Trap:** after replacing an image file, the dev server keeps serving the old
  optimised copy. Delete `.next/dev/cache/images` (and `.next/cache/images`).
- Verified in Chrome at 1440 and 390; eslint and `tsc --noEmit` are clean.

## Home Industries trimmed to six (2026-10-01)

At the user's request, Home now shows only the first 6 of the 11 industries
(Real Estate, Healthcare, Finance, Manufacturing, Hospitality, EdTech & Coaching)
via a new `limit` prop on `Industries.tsx` (`<Industries showImages={false} limit={6} />`).
When `limit` is set, an outline "View all industries" button links to
`/industries`, using the same pattern as ServicesOverview. `/industries` passes no
limit and still lists all 11. The data in `content.ts` is unchanged.

## Home background design (2026-10-01)

Added a background layer to the page. It is decorative and kept quiet, so it
doesn't add a second gradient surface to the screen.

- New utilities in `globals.css`: `.bg-grid-fade` (48px hairline grid in
  `n-300` at 35%, masked to fade out from the top centre), `.bg-grid-fade-dark`
  (the same grid at 6% white for graphite) and `.wash-brand` (a blurred radial
  glow built from the brand tokens with `color-mix`, so there are no hex
  literals).
- **Hero:** grid plus one glow behind the headline column. On mobile the glow is
  smaller and at 50% opacity, so it doesn't sit behind the `n-500` subhead.
- **UseCases dark band:** the same grid motif plus a faint glow at 30%. The
  component is also used on `/industries`, which therefore gets it too.
- Every layer is `aria-hidden`, `pointer-events-none` and `-z-10` inside a
  `relative isolate overflow-hidden` section.
- **FAQ:** uses a *different* motif from the grid: a "plexus" network (nodes
  joined by hairlines, glowing hubs, blurred bokeh) in brand violet, in
  `ui/NetworkBackdrop.tsx` as a static server-rendered SVG from a **fixed seed**
  (deterministic, no hydration issues, nothing animates). To change the picture,
  change the seed or node counts there.

### FAQ background reworked (2026-10-01, later the same day)

The first version spread the network across the whole band, which cropped it
hard at the viewport edge, left a visible blurred "halo" rectangle behind the
heading, and on mobile ran lines through the question text. User asked for a
"proper background design". Now:

- Band is `bg-n-50` plus `.bg-dot-fade` (24px dot texture in `n-300`, masked to
  fade out from the top-left).
- The network is a **bounded square cluster** (600x600 viewBox, polar scatter)
  under the sticky heading, max 400px, faded out on every side with
  `.mask-fade-radial`, with a `.wash-brand` glow behind it. **Hidden below md**
  (901px). The halo div and `.mask-fade-left` are gone.
- The questions sit on **one white panel** (`rounded-lg`, `border-n-200`,
  `--shadow-md`) for value contrast against the band. The dividers are on the
  `Reveal` wrappers (`last:border-b-0`), not the `<details>`, because each
  `<details>` is an only child.
- The section still uses `overflow-clip` so the sticky column works.
- Verified in headless Chrome at 1440/768/375, closed and open: zero overflow.
  eslint and `tsc --noEmit` are clean.
- **Pre-existing, not fixed:** `ServicesSlider` has a hydration mismatch under
  reduced motion (the server renders "Pause" and the client renders "Start", and
  the slide styles differ too). The Next dev overlay shows it as "1 Issue".

### FAQ background removed (2026-10-01, later again)

At the user's request the FAQ's decorative layers are gone: the dot texture,
the network cluster and its glow. `ui/NetworkBackdrop.tsx` was deleted (it had
no other users; recoverable from git) along with `.bg-dot-fade` and
`.mask-fade-radial` in globals.css. `.wash-brand` stays because Hero and
UseCases use it. The section is now a plain `bg-n-50` band. The heading is
sticky on the left and the questions sit in the white panel. **Don't add a
background motif back unless asked.** That makes the bullets above about the
FAQ network historical. Verified at 1440/768/375 with zero overflow; eslint and
tsc are clean.

## Use Cases overview page — built, then removed (2026-10-01)

A `/use-cases` overview (UseCasesIntro + reused UseCases matrix +
UseCaseSolutions + FinalCTA) was built and then **removed at the user's request
the same day**. The three files were never committed. Rebuilt differently on
2026-10-02 at the user's request (see "Use Cases overview page — rebuilt" below).

## Contact page built — `/contact` (2026-10-01)

Built via `vrattiks-page-builder` against `vrattiks-architecture` §2 (Contact
details → inquiry form → consultation CTA → email/phone → business info):

- `ContactHero` (paper): H1, direct channels (email / phone / WhatsApp) and the
  inquiry form on a raised white panel (`#inquiry`), all above the fold.
- `ContactConsultation` (graphite band): 3 numbered steps for what happens after
  someone gets in touch, plus an `inverse` button back to `#inquiry`.
- `ContactBusinessInfo` (white): ruled `<dl>` with registered name, location,
  hours, audience, service links and an industries link.
- **No FinalCTA.** It would link the page to itself. The form's submit is the
  page's one gradient/primary CTA. The reason is commented in `app/contact/page.tsx`.

**Contact details are partly confirmed (2026-10-02).** `contactDetails` in
`app/lib/content.ts` now has email `vrattiks@gmail.com` and phone
`+91 9106836019`. They show on the Contact page, in its JSON-LD, and in the
footer's first column. WhatsApp, location and hours are still `null`. They
render as "Pending confirmation" on the Contact page and are left out of the
JSON-LD. Fill them in there before launch.

**Form delivery is a Server Action + Resend (user's choice).** The action is
`app/contact/actions.ts` and posts to Resend's REST API with `fetch`, so no SDK
is added. It needs these env vars on Vercel:
- `RESEND_API_KEY` (required)
- `CONTACT_TO_EMAIL` (required, comma-separated list allowed)
- `CONTACT_FROM_EMAIL` (optional; defaults to `onboarding@resend.dev`, which
  only delivers to the Resend account owner's own address. Verify a domain in
  Resend and set this for real use.)
Without the required vars the visitor sees "We couldn't send your message
just now", the server logs `[contact] … not set`, and nothing is silently
dropped. The form has server-side validation, a honeypot field (`website`),
inline errors, focus moved to the first invalid field or to the success
heading, and `inquiryTopics` (content.ts) for the select. There is no rate
limiting yet; add it if spam shows up.
- The form submits via `onSubmit` + `startTransition`, deliberately. React's
  automatic reset after an action wiped the `<select>` on a failed submit, even
  when it was a controlled select.
- `ui/Icon.tsx` gained `mail`, `phone` and `mapPin`.
- Verified with `next start` + headless Chrome at 1440/1280/1024/768/430/390/375:
  zero overflow, one h1, all fields labelled. Empty submit → 3 errors and focus
  on `#name`. Bad email → focus on `#email`, values kept. A valid submit without
  env vars → error banner, values kept (select too). Honeypot → success state
  with the heading focused. The dark-band CTA lands at `#inquiry`. Lint, tsc and
  `npm run build` are clean. The only console errors are 404 prefetches for the
  unbuilt `/use-cases`, `/case-studies`, `/products` and `/blog` routes, which
  every page shows.
- **Not verified:** an actual email delivery through Resend (no key available).

## CRM service image added (2026-10-01)

The user supplied an illustration: a CRM dashboard on a laptop, with "Track
leads / Manage contacts / Close deals / Get insights" around it. It was resized
from 3840x2560 to 1920x1280 (3:2, 337 KB) as
`public/images/services/crm.png` and set as `Service.image` for `crm` in
content.ts. It now shows in the `/services/crm` hero and on the CRM card
(/services grid + Home slider).
- The dashboard's figures (1,245 contacts, 342 deals, $86,420, +18.4%) and
  names (Kavya Iyer, etc.) are **mock UI inside an illustration**, not Vrattiks
  results. Never quote them as stats.
- Two things worth raising with the client: it uses **$**, not ₹, and a **blue**
  palette rather than the brand violet.
- Verified at 1440 and 375 with `next start`: the image loads, there's no
  overflow, and the 3:2 card crop shows the whole picture. Lint and build are clean.

## WhatsApp Automation service image added (2026-10-01)

The user supplied an illustration: a WhatsApp chat on a phone, with an
automation flow, "Campaign Performance" and "Engagement" cards. The 1216x1294
source was palette-quantised with sharp (1.5 MB → 579 KB, no visible banding)
to `public/images/services/whatsapp-automation.png`, with
`position: "50% 35%"` so the 3:2 card crop keeps the flow, the chat and the
campaign card. **All six services now have an image.**
- As with CRM, the figures (152,320 sent, 98.5% / 45.3% / 32.7%) are mock UI in
  an illustration. Never quote them. It also shows the real WhatsApp logo
  and a "secure service from Meta" notice. That's nominative use for a WhatsApp
  service, but it's the client's call if Meta brand rules matter to them.
- **Open:** `ServiceHero` bottom-aligns its columns (`md:items-end`), so
  near-square images push the H1 down. At 1440x900 the H1 top is at 893px for
  WhatsApp and 869px for AI Chatbot (it was already like this), against
  603–724px for the 3:2 images. Fix if asked: cap the hero image height or
  top-align the grid.
- Verified with `next start` at 1440 and 375: the image loads, there's no
  overflow, and the card crop looks right. Lint and build are clean.

## Process → scroll-driven stepper (2026-10-02)

- User asked for Process to advance one step at a time as you scroll. `Process.tsx` is now a client component: a tall track (`5 × 60 + 50` svh) holds a sticky panel (heading + 5-node rail + one detail card). `useScroll` progress over the track picks the active step (`floor(p × 5)`); the gradient rail fill grows node by node; the card swaps with a short fade (duration 0 under reduced motion). Nodes are buttons that scroll to their step's band. Used on Home and `/services`.
- A11y: every step's title + description lives in the `<ol>` (`aria-current="step"` on the active one); the visual card is `aria-hidden`.
- Panel sized to fit a 548px-tall phone viewport under the 64px header. **Never put `overflow-hidden` on an ancestor** — it kills the sticky.
- Verified 2026-10-02 in headless Chrome (see the Problem entry below). tsc and eslint are clean.

## Home "The Problem" → stacking cards (2026-10-02)

- User asked for scroll-sequenced problem cards. A horizontal pinned row was tried first, and **the user rejected it the same day**: they didn't want squarish cards. It is now **long full-width rectangular cards that stack**. Each `<li>` is `position: sticky` at `--stack-top + i × 14px` (`--stack-top` 5rem mobile / 7rem md, i.e. header + room), with `gap-[18svh]` between cards. Each new card slides up over the last and docks 14px lower, so the six pile into a stack, then release together at the end of the list. Desktop row = number | title | description; phones stack them.
- Pure CSS, so `WhyBusinessesNeedAI.tsx` is a **server component** again with no scroll JS and nothing to disable for reduced motion. It needs opaque card fills and **no `overflow-hidden` on any ancestor**.
- Verified in headless Chrome over CDP at 1440×900 and 375×667: the cards dock at 112/126/140/154/168/182 (desktop) and 80→150 (mobile); no horizontal overflow. The Process stepper was verified in the same run: steps advance 1→5 in order, and the pinned panel fits (card bottom 718/900, 569/667). tsc and eslint are clean.


## FAQ background — tried twice and REVERTED (2026-10-02)

At the user's request, a background was tried twice: first a violet gradient with outlined diamonds, then a blue one that matched their reference image. **Then the user asked to remove both.** `FAQ.tsx`, `ui/SectionHeading.tsx` and `globals.css` are back to their committed state. The FAQ is the plain `bg-n-50` band, with the sticky heading and the white question panel. **Don't add an FAQ background again unless asked.**

## Privacy Policy page (2026-10-02)

- Added `/privacy-policy` (`app/privacy-policy/page.tsx` → `app/components/PrivacyPolicy.tsx`), linked from its own "Legal" column in the footer, beside Explore. Not in the `vrattiks-architecture` page list.
- The policy text in `app/lib/privacyPolicy.ts` is **client-supplied and verbatim** (v1.0, effective April 23, 2026, last updated May 7, 2026). Don't reword it. When the client re-issues it, replace the data and bump the dates/version in `privacyPolicyMeta`.
- Open items in the supplied text, left as given: data-deletion requests go to `hitesh@vrattiks.io` (§9.1) while every other privacy contact is `vrattiks@gmail.com`; §10 promises a cookie consent banner, which the site doesn't have yet.

## Use Cases overview page — rebuilt (2026-10-02)

Built via `vrattiks-page-builder` at the user's request. It does **not** reuse the
graphite `UseCases` matrix from Home, which the removed 10-01 version did. Order:
- `UseCasesIntro` (paper). H1 "Start with the problem, not the technology", a
  "Browse by industry" link, and the 3 use-case cards. Each card leads with
  the owner's symptom in quotes and jumps to `#{slug}` below.
- `UseCaseBreakdown` (white). One ruled `<article id={slug}>` per use case:
  Problem list → "What we automate" 4 steps → "What changes" benefits. Benefit
  carries the one accent, a brand-primary left edge. Each article has
  "Services that do this" chips that link to the live `/services/*` pages.
  The chips are derived from `service-details.ts` `useCases`, not stored twice.
- `UseCaseJourney` (graphite, the page's only dark band). An illustrative week:
  one customer across all three use cases, on a timeline. It's not a client story.
- `FinalCTA` "Not sure which one to start with?".

- **Copy is in `app/lib/use-case-details.ts`**, keyed by slug (symptom, problems,
  steps, benefits). It's drafted and pending client approval. There are no
  figures or results in it. Detail pages should reuse it.
- Cards link to in-page anchors because `/use-cases/{slug}` isn't built yet.
  Home's `UseCases`, `CatalogueIndex` and `ServiceFit` still link to those
  detail routes, which 404.
- JSON-LD is an `ItemList` of names, solutions and `#slug` URLs.
- Verified with `next start` and headless Chrome over CDP at
  1440/1280/1024/768/430/390/375. Zero overflow, one h1, 0 empty svgs, all 3
  anchors resolve, and the card jump lands 96px down (below the 81px header).
  eslint and tsc are clean.
- **Build note:** `npm run build` (Turbopack) failed locally on 2026-10-02 inside
  next/font/google ("queries have exactly one entry"). The error is in the
  font loader, not in page code. `npx next build --webpack` passes, with all 19
  routes. Check whether Vercel hits the same error.

## Hero visual → typing code window (2026-10-03)

User asked for the hero visual to look like a dark code-editor window (a
screenshot of a generic `api-example.js` window) with live typing. `HeroVisual.tsx`
was rewritten in place; the status-chip panel is gone.

- The snippet is an **illustrative lead-follow-up flow** (reply → qualify → book
  → sync), not a real SDK, and none of the reference's code/names were copied.
  Lines are kept <= 40 chars so it never scrolls at 375px.
- **Types once, then stops** (kylezantos §1b). The caret blinks 4 times when done,
  then rests. The header status goes "Writing…" → "Live". SSR, no-JS and
  reduced-motion all get the finished code. Untyped text is rendered `invisible`,
  so the window never changes size, which means zero layout shift.
- **Deliberate typeface exception:** the code uses the *system* monospace stack
  (`ui-monospace, …`), nothing downloaded, and only inside this window. Code in a
  proportional face doesn't read as code. This is the one place a third face appears.
- Hero now goes side-by-side at `lg` instead of `md`. At 768px the old split left
  the visual too narrow for the code.
- Verified over CDP at 1440/1024/768/375: 0px page overflow, 0px code-pane scroll,
  typing mid-state and done-state screenshotted.

## Home Industries → scroll-linked timeline (2026-10-03)

User asked for the Industries section on Home to copy a vertical-timeline
screenshot: alternating entries, a line that fills as you scroll, and the
current industry glowing.

- New `IndustryTimeline.tsx` (client), rendered by `Industries` when
  `layout="timeline"`. Home passes it; `/industries` keeps the default
  `"grid"` photo directory, which is unchanged (verified: 11 images, no timeline).
- Rail runs from the first dot's centre to the last dot's centre. It's measured with
  a ResizeObserver, and `useScroll` targets the rail itself, so the fill tip and
  the dots stay on the same line. The tip sits at **55% of the viewport**
  (`TIP`). An industry counts as "reached" when its dot passes that line. The
  last one reached is "current": white card, `brand-primary/60` border,
  `--shadow-glow`. Upcoming entries have a hollow dot and an `n-500` title.
- **"Reached" is checked against the viewport line, not `scrollYProgress`.**
  Progress clamps to 0 before the section, which puts the tip exactly on dot 1
  and wrongly counts it as reached.
- The light background was kept on purpose, although the reference is dark.
  `UseCases` (graphite) sits directly above, and a second dark band would merge
  with it.
- **Taste flag, not yet resolved:** `Process` follows right after Industries
  and also uses a progress rail (horizontal, pinned). That puts two
  rail-progress devices back to back, against CLAUDE.md's "no two consecutive
  sections share a layout structure" rule.
- Verified over CDP at 1440 and 375 at four scroll positions: 0px overflow, and
  the right entry is current at each position.

## Hero animated particle background (2026-10-03)

User asked for the hero to get an animated background like a reference
screenshot (dark navy, glowing particle field plus a perspective dot "terrain").

- New `HeroParticles.tsx`: one `<canvas>` behind the hero content. It draws
  drifting, twinkling particles plus a perspective dot grid across the lower
  40%, displaced by two crossing sine waves. Colours come from
  `--color-brand-primary/secondary` at runtime, so there are no hex literals.
  Density scales down below 768px. DPR is capped at 2.
- It replaced the hero's static `.bg-grid-fade` hairline grid, because the grid
  lines and the dot terrain clashed. `.wash-brand` stays. The `.bg-grid-fade` CSS is
  still in globals.css.
- **This reverses the "ZERO looping motion on Home" state** recorded on
  2026-09-22 (kylezantos §1b), at the user's explicit request. Mitigations, as
  documented in the file header: low alpha and slow speed, a paused rAF loop when the hero is
  off screen (IntersectionObserver), and one static frame for
  `prefers-reduced-motion`.
- Kept on the **light** hero, adapted from the reference's dark navy. A dark
  hero would merge with the graphite `KpiResults` band directly below it.
- Verified at 1440/375: 0px overflow, canvas sized to the hero, and consecutive
  screenshots differ, so it is animating.

## Particle background on every page (2026-10-03)

User asked to "add effect in all pages". Read as: extend the Home hero's
`HeroParticles` backdrop to the first section of every route, because every
section already used `Reveal` for its fades.

- Added as the first child of `ServicesIntro`, `IndustriesIntro`, `CompanyIntro`,
  `ContactHero`, `UseCasesIntro`, `ServiceHero` (all six `/services/[slug]`
  pages) and `PrivacyPolicy`. `Section` is already `relative isolate`, so the
  `-z-10` canvas sits above the section tone and below the content.
- `HeroParticles` now takes an optional `className` (default
  `absolute inset-0 h-full w-full`). `PrivacyPolicy` is a single long section,
  so there the canvas is limited to the top 360/440px and fades out with a
  bottom mask before the policy text begins.
- The same looping-motion mitigations apply on every page: pause when off
  screen, one static frame for reduced motion.
- Verified on a `next build --webpack` + `next start` server over CDP at
  1440/375 on all 8 route types: 0px overflow, one canvas per page sized to its
  section, and every page animating.
- **Partly reverted the same day:** the user asked to remove the animation from
  the Services, Industries, Company, Use Cases and Contact pages, so
  `HeroParticles` is gone from those five intros. It is still on Home (`Hero`),
  the six service detail pages (`ServiceHero`) and `/privacy-policy`, because
  those weren't named.

## Use Cases: Problem/Solution/Benefit removed (2026-10-03)

User asked to remove the Problem / Solution / Benefits section from `/use-cases`.
`UseCaseBreakdown` is no longer rendered. The page is now Intro → Journey
(graphite) → FinalCTA.

- **Deviation from vrattiks-architecture §2**, which requires Problem → Solution
  → Benefit on this page. It's noted in the page's header comment.
- The intro cards' `#slug` anchors used to target the breakdown articles. They
  now target the `h3` of each entry in `UseCaseJourney` (`id={slug}`,
  `scroll-mt-28`), so the cards and the JSON-LD `/use-cases#slug` URLs still
  resolve.
- Lost with it: the breakdown's links from each use case to its related
  `/services/{slug}` pages. The page no longer links to individual services.
- `UseCaseBreakdown.tsx` is kept, unused (it was never committed, so deleting it
  would be permanent).
- **Later the same day:** the user also asked to remove the "Use Cases" intro
  (`UseCasesIntro`) and the "How they connect" band (`UseCaseJourney`).
  `/use-cases` is now **only the FinalCTA**, plus an `sr-only` H1 ("Use Cases")
  so the page keeps exactly one H1. The ItemList JSON-LD was removed because it
  described content no longer on the page. The metadata description still
  describes the three use cases and should be revisited if the page stays this
  way. All three component files are kept, unused.

## Use Cases and Products pages removed (2026-10-03)

User asked to remove the Use Cases and Products pages.

- `app/use-cases/` deleted (it was never committed, so this is permanent).
  There was never a `/products` route — only nav links to it.
- "Use Cases" and "Products" removed from the Header nav and Footer "Explore"
  list (Header now has 7 top-level items).
- Links into `/use-cases/{slug}` removed: the `UseCases` matrix (Home,
  /industries) no longer has a stretched row link or "See how it works", and
  `ServiceFit`'s use-case list on service pages is plain text now.
- The `UseCases` **section** stays on Home and /industries (it's a section, not
  the page). `useCases` data in `content.ts` stays (used by that section and
  `ServiceFit`).
- Still on disk, unused and uncommitted: `UseCasesIntro`, `UseCaseBreakdown`,
  `UseCaseJourney`, `app/lib/use-case-details.ts`, and `CatalogueIndex` (which
  still links to `/use-cases`). Delete them if the page isn't coming back.
- **Deviation from vrattiks-architecture §1/§2**, which still lists Use Cases
  (+3 detail pages) and Products.

## Services mega-menu in the Header (2026-10-03)

Desktop (`lg`+): hovering "Services" opens a dark (`bg-brand-graphite`) rounded
dropdown, 288px wide (`w-72`) and centred under the Services label. It is a
single column: a bold "All services →" row (links to `/services`), then the six
service names from `content.ts` as plain muted text (`n-300`, `n-0` on hover).
This matches a reference screenshot the user supplied. Earlier versions (an
820px two-column grid with icons and descriptions) were rejected by the user;
don't bring icons or descriptions back. Each item
links to the existing `/services/[slug]` route. No new data or routes were
added. Implemented as `ServicesMenu` inside `Header.tsx`, using CSS transitions
only (no Framer).

- "Services" itself still links to `/services`. A chevron button next to it is
  the keyboard/touch control (`aria-expanded`, Escape closes and refocuses it).
  On touch at desktop width, tapping outside closes the panel.
- The nav is `self-stretch` so the Services item fills the full header height,
  and the panel has a `pt-2` hover bridge plus a 150ms close delay. Without
  these, the gap between the label and the panel closes the menu.
- The panel stays mounted and toggles `invisible`, so `aria-controls` always
  resolves and a click is never cut off by an unmount. It is positioned against
  the sticky `<header>` (its nearest positioned ancestor) and centred on the page.
- Mobile/tablet (<`lg`): a chevron toggles an inline service list inside the
  hamburger menu. The mobile nav got `max-h` + `overflow-y-auto` because the
  expanded list is taller than a 375px-wide phone screen.
- Verified with headless Chrome over CDP: 36/36 checks passed (hover open, move
  into the panel, leave to close, each of the 6 links lands on the right H1,
  View All, keyboard, no overflow at 1440/1280/1024, tap flow at 375/768/1000).
- **`npm run build` could not be verified this session: the C: drive had 0 bytes
  free.** That caused the Turbopack Google Fonts "Can't resolve" error and Node
  OOM crashes. `next build --webpack` compiled and typechecked, then OOM'd during
  static generation. Rerun the build once disk space is freed.

## Industries dropdown + industry detail pages (2026-10-03)

The user asked for Industries to "work the same way as Services".

- **Header:** `ServicesMenu` became a generic `NavDropdown`, driven by a `menus`
  map in `Header.tsx` keyed by nav href. Services and Industries both use it:
  an "All industries →" row, then the 11 names from `content.ts`. The panel has
  `max-h` + `overflow-y-auto` so 12 rows stay on screen at short heights. On
  mobile, either list can be expanded, one at a time.
- **New route `app/industries/[slug]/page.tsx`** builds all 11 pages from
  `content.ts` + the new `app/lib/industry-details.ts`, with
  `dynamicParams = false`. This fixes the `/industries/{slug}` links on
  /industries, Home and the service pages, which had all been 404s.
- Section order follows the vrattiks-architecture §2 industry template:
  `IndustryHero` (new, mirrors ServiceHero, breadcrumb back to /industries) →
  `ServiceProblems` (challenges) → `ServiceSteps` (graphite band, "How we help",
  items labelled "Solution 01…") → `RelatedServices` ("Services that fit") →
  `ServiceFit` (use cases only) → `ServiceBenefits` → `FinalCTA`.
- **Shared components gained optional props, with defaults equal to the old
  hardcoded text, so the service pages render unchanged:**
  - `ServiceProblems`: `description`
  - `ServiceSteps`: `eyebrow` / `title` / `itemLabel`
  - `RelatedServices` and `ServiceFit`: `eyebrow` / `title`
  - `ServiceFit` also skips its Industries column when the list is empty.
- **Relevant services are derived, not stored:** they are the services whose
  `service-details.ts` `industries` array includes the slug. Each industry's
  drafted solutions mention only those services.
- **The copy in `industry-details.ts` is drafted (vrattiks-standards §3 bucket
  4) and pending client approval:** no figures, client names or promised
  results. There is still no Results/case-study section, since no real results
  exist. `ServiceBenefits` states outcomes in words only.
- Still a deviation from the architecture SSOT, which lists 6 industries
  (incl. e-commerce). The site has 11.

## Light/Dark theme toggle (2026-10-03)

- Toggle (`app/components/ThemeToggle.tsx`) sits in the header bar at every
  width: beside "Book a Consultation" on desktop, beside the hamburger below
  `lg`. The CTA itself is unchanged. Icon follows the client's reference
  screenshots: a moon is shown in light mode and a sun in dark mode.
- **Mechanism: token flip, not per-component `dark:` classes.** `data-theme` on
  `<html>` redefines the `--color-n-*` ramp (plus brand-secondary, graphite,
  sem-* and shadows) in `app/globals.css`. Inside `.bg-brand-graphite` and
  `.bg-brand-gradient`, the LIGHT ramp is restored, so dark bands and the
  primary button render exactly as in light mode. **New dark surfaces must use
  one of those two classes**, or their `text-n-0` will turn dark.
- No-flash: the inline `<head>` script from `app/lib/theme.ts` follows Next 16's
  `preventing-flash-before-hydration.md`. Saved choice (`localStorage.theme`)
  wins, otherwise the OS setting; it keeps following the OS until the user picks.
- A `dark:` custom variant exists (`@custom-variant dark` in globals.css) and
  is used only for the toggle's icon swap.
- Not verified at the time: `tsc`/`npm run build` (the C: drive was full, 0 GB
  free, causing OOM/os error 1450), plus first-visit OS detection and reload
  persistence in a real browser. Verified: lint, all routes 200 on dev, and
  visuals at 1440/1024/768/375 in both themes.

## Detail-page hero: content beside the image (2026-10-03)

- **ServiceHero and IndustryHero** (the only heroes for all 6 `/services/[slug]`
  and 11 `/industries/[slug]` pages) had the description + CTAs in the *right*
  column under the image, leaving the left column short and bottom-aligned
  (`md:items-end`). Now: left = icon, H1, headline, description, CTAs; right =
  image only; columns top-aligned (`items-start`). Copy, buttons, image ratio
  and radius unchanged; the image lost its `mb-8`.
- **Two columns start at 768px (`min-[768px]:grid-cols-2`), not `sm` (601px).**
  At 601px each column is ~264px and the longest unbreakable H1 words
  ("Manufacturing", "Infrastructure", 40px) would overflow; at 768px a column is
  ~348px. From `md` (901px) the original 1.3fr/1fr split + 64px gap applies.
  Below 768px everything stacks, content first, then image.
- **`npm run build` (Turbopack) currently fails in this environment** on
  `next/font/google` / reading `node_modules/postcss/...` via a `\?\` path —
  unrelated to code. `npx next build --webpack` builds all 29 routes cleanly.

## Company page — story image (2026-10-03)

- User-supplied image (AI brain over a city-night desk scene, 1178×1335) saved
  as `public/images/company/ai-business-intelligence.png` and shown in
  `OurStory`'s sticky left column under the heading (`rounded-xl`, `n-200`
  border, `next/image` with `fill` + aspect ratio). Lazy-loaded since it's
  below the fold. Source PNG is ~2.3 MB; `next/image` serves optimised sizes.
- **Moved later the same day at the user's request**: removed from `OurStory`
  (back to heading-only sticky column) and placed in `CompanyIntro`'s right
  column, **replacing the confirmed-facts `<dl>`** (Company / What we build /
  Who we build for). Above the fold, so it uses `preload` (Next 16 replacement
  for `priority`) and isn't wrapped in `Reveal`.

## Company page — Employees section (2026-10-03)

- New `app/components/Employees.tsx`, placed right after `Founders` in
  `app/company/page.tsx`. User-provided names/roles only (vrattiks-standards
  §3): Bhadiyadra Jay — Full Stack AI Engineer, Kamya Patel — Full Stack
  Developer. Initials monograms, no photos/bios.
- Card markup is a deliberate copy of `Founders.tsx` (user asked that Founders
  not be modified) — keep the two in step if either card changes.
- Same `tint` tone as Founders with its top padding removed
  (`pt-0 sm:pt-0 md:pt-0`) so the two read as one team band instead of a
  doubled 112px gap. Eyebrow "Our Team", H2 "The people who build your systems".
- Employees are NOT in the AboutPage JSON-LD (`founder` is only for founders).
- Verified in Chrome at 1440/1024/768/375: zero overflow, 2-up from `sm`,
  stacked on phones; lint + tsc clean on touched files.
