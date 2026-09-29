---
name: awesome-design
description: Library of specific, named design techniques borrowed from premium product websites (Stripe, Linear, Vercel, Notion, Figma, Superhuman tier) — what each technique actually is, why it works, and how to rebuild it with Vrattiks tokens. Use when a section feels generic and needs a stronger structural or interaction idea, when asked to make something look like a top-tier product site, or when you need a concrete reference pattern for a hero, pricing table, dark band, logo wall, feature grid, or scroll sequence. Structure and interaction only — never copy copy, claims, logos, or illustration.
---

# Awesome Design — Technique Library

A named library of moves to draw on when a section is correct but flat. Each
entry is **the technique and its reason**, so it can be rebuilt in Vrattiks
tokens rather than imitated.

**Hard rule:** take structure, hierarchy, and interaction. Never take copy,
claims, metrics, testimonials, logos, illustration style, or a full-page
lookalike. Vrattiks copy comes from `vrattiks-design-system` §5 and
`vrattiks-standards` §3.

## 1. When to reach for this skill

Use it when one of these is true, not as a default step:

- A section passes every checklist and still reads as a template.
- `taste-skill` §3 found "no single idea" in a section.
- A brief asks for "premium", "like Stripe/Linear", or "not another agency site".
- You need a structural alternative to a card grid and `ui-ux-pro-max` §1 gave
  you the shape but not the treatment.

Do **not** use it to justify adding complexity to a section that already works.

## 2. How to apply a technique (4 steps)

1. **Name the problem first** — "the services section has no focal point",
   not "it needs to look better". A technique chosen without a named problem
   becomes decoration.
2. **Pick one entry from §3** whose *reason* matches that problem.
3. **Translate to Vrattiks tokens** — the dark is `brand-graphite`, the accent
   is the brand gradient, the faces are Urbanist/IBM Plex, the radii are
   `rounded-sm…xl`, easing is `--ease-premium`. If a technique depends on a
   colour or face we don't have, drop the technique; don't add the colour.
4. **Re-run the gates** — `taste-skill` §4, `vrattiks-responsive`,
   `vrattiks-accessibility`, `vrattiks-performance`. A borrowed technique that
   breaks at 375px or fails contrast is not an improvement.

State in your report which technique you applied and what problem it solved.

## 3. Technique library

### Layout & structure

- **Stripe's pricing/plan table pattern** — one horizontal axis of comparison,
  a single emphasised column (one device only: border *or* fill), and a row of
  feature labels that stays legible when it collapses to stacked cards on
  mobile. *Why it works:* comparison is the job, so the layout is a table, not
  three marketing cards. *Vrattiks use:* packages/engagement models; emphasise
  with a `brand-primary` border, keep the fill neutral.
- **Linear's dark-section contrast approach** — a full-bleed near-black band
  dropped between light sections, with text on a muted ramp (not pure white)
  and hairline borders at low white alpha. *Why it works:* it resets the eye
  after a run of white sections and makes the next light section feel new.
  *Vrattiks use:* the band before Final CTA, or behind Process;
  `bg-brand-graphite`, text `n-100/n-200`, borders `white/10`.
- **Vercel's mono-label eyebrow** — a small uppercase label above
  each section heading, doing navigational work. *Why it works:* it gives the
  page a consistent spine and lets headings stay short. *Vrattiks use:* the
  existing `Eyebrow` component in `app/components/ui/` — set in `font-body`
  uppercase with positive tracking, never a mono face (brand allows two faces only).
- **Notion's one-large-plus-grid** — a featured item at double size, with the
  rest in a smaller uniform grid. *Why it works:* creates a focal point in
  content that is otherwise a flat list. *Vrattiks use:* Case Studies and Use
  Cases, so the strongest story isn't equal-weighted with the rest.
- **Figma's alternating split rows** — feature rows that alternate copy-left /
  visual-left down the page, each with one idea. *Why it works:* rhythm from
  alternation instead of decoration; each row gets room to be specific.
  *Vrattiks use:* "Why Vrattiks" or a service detail page's capability list.
- **Stripe's sectioned full-bleed gradient edge** — accent confined to a thin
  band or edge rather than a whole surface. *Why it works:* accent presence
  without accent dominance, keeping the 60/30/10 budget in `ui-ux-pro-max` §2.
- **Superhuman's single-column narrative** — a long, tightly-written
  single-column stretch with generous leading between beats, no cards at all.
  *Why it works:* a break from grids; suits problem-framing and story
  sections. *Vrattiks use:* "Why businesses need AI", brand story on Company.

### Type & hierarchy

- **Linear's display-scale jump** — hero display type dramatically larger than
  anything else, subhead small and quiet. *Why it works:* one unambiguous
  entry point; the eye never hunts.
- **Stripe's short-headline / specific-subhead pair** — 3–6 word headline, one
  concrete sentence under it. *Why it works:* scannable plus substantive.
  *Vrattiks use:* every section heading; pairs with `vrattiks-design-system` §5.
- **Tracked microcopy for units and labels** — stat units, timeline steps, table
  headers set small, uppercase, with positive tracking (in `font-body`; Vercel
  uses mono, we don't). *Why it works:*
  signals precision and separates data from prose without adding colour.

### Proof & trust

- **Grayscale logo wall at low opacity** — client/integration logos
  desaturated and evenly sized on a quiet band. *Why it works:* proof without
  a circus of brand colours. *Vrattiks use:* only for integrations we actually
  support — never placeholder client logos (`vrattiks-standards` §3).
- **Stripe's metric-in-context tile** — a number with a one-line explanation of
  what it measures and over what period. *Why it works:* context is what makes
  a number believable. *Vrattiks use:* KPI/Results, but only with real,
  sourced figures; otherwise use the honest-placeholder route.
- **Single large testimonial** — one quote at generous scale with a real name,
  role, and company, replacing a 3-up quote grid. *Why it works:* one credible
  voice beats three anonymous ones.

### Interaction (see `kylezantos-design` before implementing any of these)

- **Linear's fast hover state** — 100–150ms, transform/opacity only, subtle
  lift or border brighten. *Why it works:* feels responsive, not animated.
- **Vercel's border-and-glow focus treatment** — hover/focus expressed as a
  border colour shift plus a soft glow rather than a scale-up. *Vrattiks use:*
  `--shadow-glow` is already the hover/focus token for gradient elements.
- **Stripe's sticky in-page section nav** — a persistent side or top index on
  long documentation-style pages. *Why it works:* orientation on long pages.
  *Vrattiks use:* long service/industry detail pages only; must be keyboard
  operable and must collapse cleanly on mobile.
- **Scroll-linked reveal, once** — content fades/rises 12–20px as it enters,
  once, never on scroll-back. *Why it works:* directs attention without
  hijacking scroll. *Vrattiks use:* the existing `Reveal` component in
  `app/components/ui/` already implements this correctly, including
  `useReducedMotion` — reuse it rather than writing new motion
  (`vrattiks-standards` §1–2).
- **Restraint as a technique** — the highest-taste sites animate almost
  nothing outside hover and page transitions. Choosing *not* to animate a
  section is a valid application of this library.

## 4. Anti-imitation rules

- Never reproduce another company's copy, tagline, claim, metric, or
  testimonial, even as a placeholder to "fill the shape".
- Never use another company's logo, wordmark, product screenshot, or
  illustration set.
- Never clone a full page layout end-to-end — take at most one or two
  techniques per section, and never the same site's techniques for the whole
  page.
- Never import a colour or typeface from a reference (`vrattiks-design-system`
  §1, §6). If the technique dies without their palette, it wasn't the
  technique that was working.
- Never claim in a report that a section "matches Stripe/Linear" — describe
  the technique and the problem it solved.
- If a borrowed pattern needs a new dependency, check `package.json` first and
  prefer the existing stack (Framer Motion, Tailwind v4) per
  `vrattiks-performance`.

## 5. Checklist

- [ ] A specific problem was named before a technique was chosen
- [ ] At most 1–2 techniques applied to this section, from different entries
- [ ] Technique rebuilt in Vrattiks tokens — no imported colour, font, radius, or shadow
- [ ] No copy, claim, metric, logo, screenshot, or illustration taken from any reference
- [ ] Existing components reused where they already implement the technique (`Reveal`, `Eyebrow`, `Section`, `Button`)
- [ ] Result still passes `taste-skill` §4 (didn't add a second gradient or a third identical grid)
- [ ] Still passes `vrattiks-responsive` at 1440/1280/1024/768/430/390/375
- [ ] Still passes `vrattiks-accessibility` (contrast on new dark surfaces, focus states, keyboard operation of any sticky nav or disclosure)
- [ ] Any new motion cleared against `kylezantos-design`
- [ ] Report names the technique and the problem it solved

## Used by / uses

Uses: `vrattiks-design-system` (tokens the techniques are rebuilt in),
`vrattiks-standards` (§1 reuse existing components, §3 content integrity),
`vrattiks-accessibility`, `vrattiks-responsive`, `vrattiks-performance`,
`kylezantos-design` (any interaction entry in §3).

Used by: `taste-skill` (fallback source of direction when
`docs/reference-sites.md` is missing, and the place to go when §3 of that
skill finds a section with no idea), `ui-ux-pro-max` (worked examples of its
layout patterns), `vrattiks-page-builder` (when a brief calls for premium
treatment).
