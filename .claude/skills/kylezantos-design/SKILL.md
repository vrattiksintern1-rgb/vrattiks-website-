---
name: kylezantos-design
description: Purposeful motion, interaction design, and responsive craft for the Vrattiks website — motion that communicates function (state change, hierarchy, feedback) rather than decoration, fast/subtle transition defaults, explicit rules for when NOT to animate, and a systematic multi-breakpoint audit at 375/768/1024/1440 for text overflow, broken grids, touch-target sizing, and spacing collapse. Three modes: build a new interactive component, audit existing animations, audit responsive. Use when adding or reviewing any animation/hover/transition, when something feels janky or over-animated, or when checking how a component holds up across breakpoints.
---

# Kyle Zantos Design — Motion, Interaction & Responsive Craft

Two disciplines that fail the same way: doing more than the content needs.
Motion should be **invisible when it works** — the user perceives a responsive
interface, not an animated one. Responsive layout should be **boring at every
width** — nothing clever, nothing broken.

Start by picking a mode:

- **Mode A — Build new component** (§2)
- **Mode B — Audit existing animations** (§3)
- **Mode C — Audit responsive** (§4)

If a request touches both motion and layout, run A or B first, then C — layout
truth is judged on the final markup.

## 1. Motion principles

**Motion must do a job.** Every animation answers one of four questions, or it
is removed:

1. **State change** — this thing is now open/closed/selected/loading.
2. **Hierarchy** — this arrived, look here (once, on entry).
3. **Feedback** — your input registered (hover, press, focus, submit).
4. **Continuity** — this element moved *there*; it is the same element.

Decoration is not a job. "It felt empty" is not a job.

**Defaults for this project:**

- **Duration**: hover/press feedback 100–150ms; state changes and disclosures
  150–250ms; entrance reveals 300–500ms (the existing `Reveal` uses 500ms with
  a 16px rise — match it rather than inventing a new value). Nothing above
  600ms without a stated reason.
- **Easing**: ease-out for things arriving, ease-in for things leaving. The
  project's expressive curve is `--ease-premium`
  (`cubic-bezier(0.16, 1, 0.3, 1)`) — confident settle, no bounce. No spring
  overshoot, no elastic, no bounce easing anywhere on this site.
- **Distance**: small. 8–20px of travel. Large translations read as gimmick
  and cost more layout stability.
- **Properties**: `transform` and `opacity` only. Never animate `width`,
  `height`, `top/left`, `margin`, or `box-shadow` on a large surface
  (`vrattiks-performance`). Height transitions on disclosures use a grid-rows
  or max-height technique, not animated layout in a loop.
- **Stagger**: ≤60ms per item, and only for lists of ≤6 items. A staggered
  12-item grid makes the page feel slow.
- **Reduced motion**: every animation must respect `prefers-reduced-motion`.
  The project handles this two ways already — the global `@media
  (prefers-reduced-motion: reduce)` block in `app/globals.css` and Framer
  Motion's `useReducedMotion` in `app/components/ui/Reveal.tsx`. Use
  `useReducedMotion` for any new Framer Motion work
  (`vrattiks-accessibility`).

## 1b. When NOT to animate

Default to no animation. Specifically, do not animate:

- **Anything above the fold that delays first read.** The hero headline should
  be readable the instant it paints; don't fade in the value proposition.
- **Text at body size.** Animating paragraphs hurts legibility and triggers
  layout work for no gain.
- **On scroll-back.** Reveals fire once (`viewport={{ once: true }}`), never
  re-trigger when scrolling up.
- **Scroll position itself.** No scroll hijacking, no parallax that fights the
  user's input, no pinned sections on a marketing page.
- **Every item in a long list.** Stagger dies past ~6 items.
- **Numbers that aren't a headline metric.** A count-up is a single-moment
  device (`app/components/ui/CountUp.tsx`); three count-ups per page is noise,
  and the final value must be in the DOM for reduced-motion and no-JS.
- **Things that repeat on a loop** — pulsing glows, floating orbs, infinite
  rotation. Nothing on this site should be moving when the user isn't acting.
- **Route/page transitions**, unless the user asks. They add perceived latency
  on a marketing site.
- **Focus rings.** Focus must be instant and obvious (`vrattiks-accessibility`).
- **When it would delay feedback.** If an animation makes a click feel slower,
  the animation is wrong; feedback should start within ~100ms.
- **To hide that a section is weak.** That's a `taste-skill` §3 problem —
  motion won't fix structure.

## 2. Mode A — Build new component

1. **Inspect first** (`vrattiks-standards` §1). Check `app/components/ui/` —
   `Reveal`, `Button`, `Section`, `Eyebrow`, `CountUp`, `Icon`, `Container`
   already exist. Reuse or extend before writing new motion.
2. **Consult `ui-ux-pro-max`** §1–4 for the structure, and
   `vrattiks-design-system` for tokens, before any interaction work.
3. **Write the component static first.** It must be complete and correct with
   zero animation. If it isn't good static, motion won't save it.
4. **List the states**: default, hover, focus-visible, active/pressed,
   disabled, loading, error, empty. Style each — most "missing polish" is a
   missing state, not a missing animation.
5. **Add motion only where §1 gives it a job**, at the §1 defaults. Add
   `useReducedMotion` handling in the same edit, not later.
6. **Keep `"use client"` at the leaf.** Only the interactive component is a
   client component — don't convert a whole section or page
   (`vrattiks-performance`, CLAUDE.md conventions).
7. **Check keyboard and touch**: focus-visible ring present, hover-only
   affordances have a non-hover equivalent, nothing depends on hover to be
   usable on touch.
8. **Run Mode C** (§4) on the finished component.
9. **Verify** — `npm run build` / `npm run lint` (`vrattiks-standards` §4) —
   and report which states and breakpoints you checked.

## 3. Mode B — Audit existing animations

Report findings before changing anything (same posture as
`vrattiks-page-review`).

1. **Inventory.** Grep the component/page for motion:
   `grep -rn "motion\.\|whileInView\|whileHover\|animate=\|transition\|duration-\|animate-" app/`.
   List every animation with its file, duration, property, and trigger.
2. **Assign each one a job** from §1 (state / hierarchy / feedback /
   continuity). Anything you can't assign is a removal candidate.
3. **Check against §1b** — is this one of the things that shouldn't animate?
4. **Check the numbers**: duration in range, easing on-system, distance
   ≤20px, transform/opacity only, stagger ≤60ms and ≤6 items.
5. **Check reduced-motion coverage** for each — Framer Motion animations need
   `useReducedMotion`; the global CSS block doesn't cover JS-driven values.
6. **Check cumulative load**: how many things move in one viewport? More than
   two independent motions competing at once is over-animated.
7. **Check performance**: layout-triggering properties, animations on large
   blurred/shadowed surfaces, anything running on a loop
   (`vrattiks-performance`).
8. **Report**: keep / tune / remove for each, with the reason. Then make only
   the agreed changes, smallest edit first (`vrattiks-standards` §2) — and
   never delete a working animation the task didn't ask you to touch.

## 4. Mode C — Audit responsive

Audit at **375, 768, 1024, 1440** as the primary matrix. When the change is
layout-structural, extend to the full project matrix in `vrattiks-responsive`
§1 (1440/1280/1024/768/430/390/375) — that skill owns the canonical list; this
mode owns the *method*.

These widths sit against the project's CSS bands (`vrattiks-design-system` §4;
`--breakpoint-sm: 601px`, `--breakpoint-md: 901px` in `app/globals.css`):
375 = deep mobile, 768 = tablet band, 1024 = just inside desktop (the tightest
desktop case — the Header nav is known to be tight here), 1440 = full desktop.

**At each width, check the four failure families:**

1. **Text overflow**
   - Headings overflowing or clipping; long words/URLs/emails breaking out
   - Orphaned single words on their own line in a headline
   - Prose exceeding ~75ch at 1440, or dropping below ~35ch at 375
   - Truncation with no full value available (title attr, wrap, or tooltip)
   - Button labels wrapping to two lines or being clipped

2. **Broken grids**
   - Column count wrong for the band (3-up desktop → 2-up tablet → 1-up
     mobile, cards stay 2-up on mobile per `vrattiks-design-system` §4)
   - A grid item stretching or collapsing because content length differs
   - Horizontal page scroll (the definitive failure — check the document
     width, not just visually)
   - Images/video/tables forcing overflow; tables need their own scroll
     container
   - Absolutely-positioned or asymmetric decorations escaping the viewport
   - Sticky/fixed elements overlapping content at short viewport heights

3. **Touch targets**
   - Interactive elements below a comfortable tap target on 375/768
     (`vrattiks-design-system` §2 — never shrink a button to fit a layout)
   - Adjacent targets with too little separation (mis-taps)
   - Hover-only affordances with no touch equivalent
   - Nav/menu/accordion triggers usable with a thumb; dropdowns operable on
     touch, not hover-only
   - Form inputs full-width, labels visible and not clipped

4. **Spacing collapse**
   - Section padding not stepping down per band (96/64/56 vertical,
     32/24/18 side)
   - Gaps collapsing to zero, or desktop gaps left unchanged on mobile so
     sections run together
   - Grouping lost — inner and outer gaps becoming equal at small widths
   - Cards losing internal padding and content touching the border
   - Footer columns overlapping or stacking without separation

**Process:**

1. Run `npm run dev` and inspect at each width in devtools responsive mode
   (or a browser-automation tool), rather than reasoning about classes alone.
2. Reproduce any reported issue at its specific width **first**.
3. Record findings per width before editing.
4. Fix with the smallest class-level change — usually a missing breakpoint
   variant, not a restructure (`vrattiks-responsive` §3).
5. **Re-check all four widths after every fix** — a 375 fix routinely breaks
   768 or 1024.
6. Report the widths checked, what failed, and what changed.

## 5. Checklist

**Motion**
- [ ] Every animation has one of the four jobs in §1; none is decorative
- [ ] Nothing in §1b is being animated
- [ ] Durations in range (100–150 feedback / 150–250 state / 300–500 entrance)
- [ ] Easing is ease-out/ease-in or `--ease-premium`; no bounce, spring overshoot, or elastic
- [ ] `transform`/`opacity` only; no layout-triggering property animated
- [ ] Travel distance ≤20px; stagger ≤60ms and ≤6 items
- [ ] Reveals fire once, never on scroll-back
- [ ] Nothing loops or moves while the user is idle
- [ ] `prefers-reduced-motion` handled (`useReducedMotion` for Framer Motion)
- [ ] ≤2 independent motions competing in one viewport
- [ ] `"use client"` scoped to the interactive leaf component

**Interaction states**
- [ ] Default, hover, focus-visible, active, disabled, loading, error, empty all styled
- [ ] Focus ring instant, visible, and never animated
- [ ] No behaviour depends on hover to be reachable on touch
- [ ] Feedback begins within ~100ms of input

**Responsive**
- [ ] Checked at 375 / 768 / 1024 / 1440 (plus the full `vrattiks-responsive` matrix if structural)
- [ ] No horizontal page scroll at any width
- [ ] No text overflow, clipping, or wrapped/clipped button labels
- [ ] Grids reflow to the correct column count per band
- [ ] Touch targets full size and adequately separated on 375/768
- [ ] Section/card spacing steps down per band; grouping survives at small widths
- [ ] Nav, footer, forms, images, video, and tables all usable at every width
- [ ] Re-checked every width after the last fix
- [ ] `npm run build` / `npm run lint` clean (`vrattiks-standards` §4)

## Used by / uses

Uses: `vrattiks-standards` (§1 inspect-first, §2 preserve existing animations,
§4 verification), `vrattiks-accessibility` (reduced motion, focus, keyboard),
`vrattiks-performance` (animation cost, client-component scope),
`vrattiks-responsive` (canonical viewport matrix — this skill supplies the
audit method, that one the widths), `vrattiks-design-system` (tokens, bands,
tap-target rule).

Used by: `vrattiks-page-builder` (Mode A for any interactive component),
`vrattiks-page-review` (Mode B/C for "feels janky" or "fix mobile" requests),
`awesome-design` (clearance for any interaction technique in its §3).
