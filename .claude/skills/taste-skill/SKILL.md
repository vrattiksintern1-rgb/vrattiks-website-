---
name: taste-skill
description: Design-taste and self-critique standard for the Vrattiks website — how to detect and remove "AI slop" (generic gradients, centered-everything layouts, repetitive icon-in-square cards, flat/safe colour use, stock-phrase copy), how to analyse a reference site for the reasoning behind its choices rather than just its tokens, and a slop audit to run against any page or section before calling it done. Use after building or restyling any section, when output "feels generic/templated/AI-made", when asked to make something look premium or more designed, or when extracting direction from reference sites.
---

# Vrattiks Taste & Self-Critique

Most AI-built pages fail the same way: every rule is followed and the result
still looks like a template. This skill is the check against that. It is a
**critique pass**, not a licence to redesign — fixes here still obey
`vrattiks-standards` §1–2 (inspect first, smallest change), and every colour,
font, and radius still comes from `vrattiks-design-system`.

Taste in this project means **restraint plus one decision**: a section should
have one deliberate idea (an asymmetry, a scale jump, a single dark band, one
real image) and be quiet everywhere else. A section with five ideas and a
section with none read the same to a visitor — as filler.

## 1. The seven slop patterns

Each of these is what a model reaches for by default. Check every section
against all seven.

1. **Gradient-as-decoration.** Gradient used because it was available, not to
   mark importance. Vrattiks has exactly one gradient (`--brand-gradient`) and
   it means *"this is the primary action / the one promoted moment"*
   (`vrattiks-design-system` §1–3). Two gradient surfaces visible at once
   cancel each other out. Blurred gradient "orbs" floating behind content are
   slop unless they are doing real figure/ground work.
2. **Centred everything.** Centred eyebrow, centred h2, centred paragraph,
   centred 3-card grid — repeated eight times down the page. Centring is for
   short, high-emphasis moments (hero, final CTA). Body-length copy and list
   content read better left-aligned, and alternating alignment is what gives a
   page rhythm.
3. **Icon-in-a-rounded-square, ×N.** A 3- or 4-up grid of identical cards,
   each with a 40px tinted square, a bold line, and two lines of grey text —
   then the next section is the same grid again. If two consecutive sections
   share a card shape, at least one must change structure (list, split layout,
   numbered/stepped flow, table, one-large-plus-two-small).
4. **Safe flat colour.** Everything on `n-0` white with `n-500` text and an
   `n-200` hairline border. No value contrast anywhere, so nothing has
   hierarchy. A premium page needs at least one deliberate dark or tinted band
   to break the white run — `bg-brand-graphite` is the tool for this.
5. **Uniform type scale.** Every heading roughly the same size, so the eye has
   nowhere to land. Real hierarchy needs a visible jump: hero display vs.
   section h2 vs. card title should be obviously different, not one step apart
   each time.
6. **Even spacing everywhere.** The same vertical gap between every element.
   Grouping comes from *uneven* spacing — tight inside a group, generous
   between groups. If padding is identical top to bottom, nothing reads as
   belonging together.
7. **Stock-phrase copy.** "Empower your business", "seamlessly integrate",
   "unlock the power of AI", "in today's fast-paced world", "transform your
   workflow", "cutting-edge solutions". Also: three feature blurbs with
   identical sentence shape and length. This violates
   `vrattiks-design-system` §5 — rewrite to a concrete outcome an owner would
   recognise ("Answers enquiries at 11pm without you doing it").

## 2. Reading a reference site (reasoning, not tokens)

Reference sites live in `docs/reference-sites.md`. Read that file first. **If
it does not exist, say so and ask the user for the list** — do not substitute
sites from memory. Use the technique library in `awesome-design` as the
maintained fallback in the meantime.

Copying a reference's hex values and fonts produces a worse version of that
site. Extract the *decision* behind each choice, then apply the decision using
Vrattiks tokens. For each reference, answer these six questions in writing
before styling anything:

1. **Where does the eye land first, and what makes it land there?** Usually
   scale contrast or isolation — rarely colour.
2. **What is the ratio of empty space to content?** Where is the space
   *uneven*, and what is that unevenness separating?
3. **How many colours actually carry meaning?** Count surfaces, not swatches.
   Most premium sites run 2 neutrals + 1 accent, and spend the accent rarely.
4. **What did they refuse to do?** No shadows? No icons? No stock photography?
   One button style only? The restraint is usually why it looks expensive.
5. **How does section-to-section rhythm change?** Note where structure breaks
   pattern (full-bleed, dark band, single-column interruption) and why it
   happens *there* — normally after a dense run, or right before a CTA.
6. **What is the copy doing?** Noun- and number-led, or adjective-led? How
   long is the longest sentence above the fold?

Then translate. The output of this step is a sentence of the form: *"They run
a full-bleed dark band before the pricing CTA to reset the eye after four
white sections — we do the same before the Final CTA using
`bg-brand-graphite`, with our own copy."* If you cannot write that sentence,
you have copied an appearance instead of learning a technique.

**Never** carry across their copy, claims, metrics, testimonials, logos, or
proprietary illustration style (`vrattiks-standards` §3).

## 3. Self-critique process

Run this after building or restyling any section — before reporting done.

1. **Look at the actual rendered result**, not your intent. Run `npm run dev`
   and view it, or re-read the composed JSX top to bottom as a visitor would.
2. **Zoom out.** Scan the whole page for structure only and write down the
   shape of each section in one word (grid, split, list, band, stat-row). If
   the same word repeats three times running, that is the defect to fix.
3. **Name the one idea** of the section you just built. If you can't, it has
   none — add one, or consciously accept that it should stay quiet because a
   neighbouring section is the loud one.
4. **Run the slop audit** (§4) honestly. Finding nothing means you audited
   badly, not that the page is perfect.
5. **Fix the highest-impact item only.** One structural change (break a
   repeated grid, add the dark band, fix the scale jump) beats ten tweaks.
   Smallest change per `vrattiks-standards` §2 — never restructure a working
   component to satisfy a taste note.
6. **Re-check the consequences**: `vrattiks-responsive` (a new asymmetric
   layout must still reflow at 375–1440), `vrattiks-accessibility` (contrast
   on any new dark band, focus states on any new surface),
   `vrattiks-performance` (a new background treatment must not animate layout
   properties).
7. **Report the critique, not just the change** — say what you judged generic
   and what you did about it, so the user can disagree with your taste.

## 4. Slop audit checklist

- [ ] No two consecutive sections share the same layout structure
- [ ] The page is not centre-aligned end to end — at least one asymmetric or left-aligned section carries the rhythm
- [ ] At most one gradient surface visible per viewport; gradient marks importance, not decoration
- [ ] At least one non-white band breaks the white run, and its text contrast passes `vrattiks-accessibility`
- [ ] Heading sizes show a visible jump between levels, not a uniform ramp
- [ ] Spacing is uneven by intent — tight within groups, generous between them (still on the 4px scale)
- [ ] No more than one 3-up "icon + title + two lines" card grid on the page
- [ ] Every icon earns its place — removing it would lose meaning; no decorative icon-per-card by default
- [ ] Copy contains zero stock phrases from §1.7; blurbs vary in length and sentence shape
- [ ] Headlines lead with a concrete outcome, not an adjective (`vrattiks-design-system` §5)
- [ ] Colour count on screen is 2 neutrals + brand accent; no new colour invented (`vrattiks-design-system` §1)
- [ ] One primary button per section, and it is the loudest element in that section
- [ ] Any reference-derived choice can be stated as a reasoning sentence per §2, not "it looks like theirs"
- [ ] No invented stats/testimonials/logos added to make a section look fuller (`vrattiks-standards` §3)
- [ ] Section still passes `vrattiks-responsive` and `vrattiks-accessibility` after the taste edits

## Used by / uses

Uses: `vrattiks-design-system` (every token, colour, and type decision),
`vrattiks-standards` (§1 inspect-first, §2 smallest change, §3 content
integrity), `vrattiks-responsive`, `vrattiks-accessibility`,
`awesome-design` (technique library and reference fallback), and
`docs/reference-sites.md` (reference list, read at §2).

Used by: `vrattiks-page-builder` (run §3 before reporting a new section done)
and `vrattiks-page-review` (run §4 as the design-quality half of an audit).
Pairs with `ui-ux-pro-max`: consult that one *before* building, run this one
*after*.
