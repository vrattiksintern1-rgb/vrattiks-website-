---
name: ui-ux-pro-max
description: Lookup reference of premium UI patterns for the Vrattiks website — layout structures by section type, colour-pairing and value-contrast principles, font-pairing rules, spacing/rhythm systems, and industry anti-patterns for AI/automation/SaaS agencies selling to Indian mid-market and enterprise buyers. Consult BEFORE building any new section or component so the output doesn't default to a generic template. Use when choosing a layout for a section, deciding how to pair colours or type, setting spacing rhythm, or asking "what pattern fits this content".
---

# UI/UX Pro Max — Pattern Lookup

A **pre-build lookup**, not a workflow. Before writing a new section, find its
content shape here and take the recommended structure. All tokens referenced
are the real ones in `app/globals.css` — see `vrattiks-design-system` for the
canonical list; never invent a value to satisfy a pattern here.

**How to use:** identify the content shape → read §1 for the layout → check §2
and §3 for colour/type → apply §4 rhythm → confirm nothing in §5 applies →
build → run `taste-skill` §3 after.

## 1. Layout structures by content shape

Pick by what the content *is*, not by what looks full.

| Content shape | Use this structure | Avoid |
|---|---|---|
| Hero / positioning | Left-aligned copy column (max ~60ch) + asymmetric visual; one primary CTA + one text link | Centred stack with two equal buttons |
| Proof / KPI row | 3–4 stat cards in a single band, numbers at display scale, labels small caps/mono | Burying numbers inside paragraph cards |
| Problem framing | Two-column: problem list left, consequence/outcome right — or a single-column narrative with generous leading | 3-up icon card grid (the problem is not three parallel items) |
| Differentiators ("why us") | 2-up or alternating split rows with one supporting visual each | 6-up icon grid where every item gets equal weight |
| Service/product catalogue | Card grid, 3-up desktop → 2-up tablet → 2-up mobile, each card a real link | Accordion list for browsable items |
| Use cases / industries | Dense list or 2-column link index, one line of context each | Full card with icon for every item (30+ items, cards become noise) |
| Process / how it works | Numbered horizontal stepper (desktop) → vertical timeline (mobile) | Four identical cards that happen to say "Step 1…4" |
| Case studies | One featured large + smaller secondary tiles; result metric visible on the tile | Uniform grid where the strongest story is hidden |
| Testimonials | 1–2 quotes at generous scale with attribution, or a slim marquee of logos | 3-up quote card grid with placeholder avatars |
| FAQ | Single-column accordion, max ~70ch, native `<details>` or an accessible disclosure | Two-column FAQ (eye-path breaks) |
| Final CTA | Full-bleed contrasting band, short line, one primary button | Repeating the hero verbatim |
| Pricing / packages | 3 columns, middle emphasised by one device only (border or fill — not both) | Every tier styled differently |

**Section rhythm rule:** across a page, alternate *container width* (contained
→ full-bleed) and *alignment* (left → centred) at least twice. Three
consecutive contained centred grids is the single most common way a page turns
generic.

## 2. Colour pairing principles

Vrattiks has one accent family (`brand-primary` #b79af3, `brand-secondary`
#6942f1, gradient between them), one dark (`brand-graphite` #16161d), and the
`n-0…n-900` neutral scale. Everything below works within that.

- **60 / 30 / 10.** ~60% dominant neutral surface, ~30% secondary surface
  (tinted or dark band, borders, muted text), ~10% accent. Accent over 10% and
  the accent stops meaning anything.
- **Value contrast before hue contrast.** Hierarchy comes from light/dark
  difference, not from adding a colour. If a section is flat, change the
  surface value (white → graphite) before reaching for the gradient.
- **One gradient per viewport.** The gradient is the "most important thing
  here" signal. Two competing gradients = neither wins.
- **Accent on text is a last resort.** Purple body text at small sizes fails
  contrast and looks cheap; keep accent on fills, borders, and icons, and keep
  text on the neutral scale.
- **Dark bands need their own text ramp.** On `brand-graphite`, body text goes
  to `n-100`/`n-200`, not pure white for everything — pure white on near-black
  at body size is harsh. Borders become white at 8–12% alpha, not `n-200`.
- **Tint, don't invent.** Need a soft accent surface? Use
  `--brand-gradient-soft` or the accent at low alpha over a neutral — never a
  new hex value (`vrattiks-standards` §2).
- **Semantic colours stay semantic.** `sem-success/warning/error/info` are for
  state feedback only; never as decorative variety in a card grid.
- **Every foreground/background pair gets a contrast check** against
  `vrattiks-accessibility` before it ships, including hover and disabled
  states.

## 3. Font pairing principles

The three faces are fixed: Urbanist (`font-display`), IBM Plex Sans
(`font-body`), IBM Plex Mono (`font-mono`). Pairing work is about *roles and
scale*, not picking typefaces.

- **One face per role.** Display → headings only. Body → all prose, buttons,
  nav, form labels. Mono → eyebrows, small caps labels, code, stat units.
  Never body text in the display face.
- **Contrast by size and weight, not by adding a face.** A clear ramp beats
  variety: display heading much larger and tighter-tracked, section heading
  clearly smaller, card title only slightly above body.
- **Tighten tracking as size grows**, loosen it as size shrinks. Large
  Urbanist headings want slightly negative letter-spacing; mono eyebrows at
  11–12px want positive tracking and uppercase.
- **Line length 60–75ch for prose**, ~45–60ch for hero subheads. Full-width
  paragraphs at 1440px are unreadable regardless of font.
- **Line height scales inversely with size** — roughly 1.05–1.15 for display,
  1.3 for subheads, 1.5–1.65 for body.
- **Two weights per face, max, per screen.** Usually 600/700 for display and
  400/500 for body. A third weight rarely reads as anything but inconsistency.
- **Numbers in stats use the display face at large scale**, with the unit or
  label in mono at small scale — that pairing is what makes a KPI row read as
  designed rather than as text.

## 4. Spacing and rhythm systems

- **4px scale only.** Every spacing value is a multiple of 4
  (`vrattiks-standards` §2). No 13px, no 30px.
- **Section vertical padding by band** (from `vrattiks-design-system` §4):
  96px desktop, 64px tablet, 56px mobile. Side padding 32 / 24 / 18.
- **Proximity carries grouping.** Inside a group, gaps are ~1/3 of the gap
  between groups. Eyebrow→heading is tight; heading→body is medium;
  body→next group is large.
- **Vertical rhythm beats horizontal fiddling.** Fix a bad-looking section by
  adjusting the gaps between its blocks before adjusting widths.
- **Cards: padding ≥ internal gap.** Card padding should exceed the largest
  gap between elements inside it, or content looks like it is escaping.
- **Optical alignment over mathematical.** Icons and quote marks usually need
  a few px of nudge to *look* aligned; trust the eye, keep the nudge on scale.
- **Grid gutters stay constant within a band** — varying gutters between
  adjacent grids makes a page feel unbuilt.
- **Whitespace is the premium signal.** When a section looks cheap, the fix is
  usually more space and less content, not more decoration.

## 5. Industry anti-patterns — AI/automation agency, Indian mid-market & enterprise

The buyer is an owner, COO, or head of ops at a 50–5000 person Indian company.
They are evaluating whether you are credible and whether this will actually
work in their operation. Design accordingly.

**Avoid:**

- **Sci-fi AI visual clichés** — glowing brains, circuit boards, humanoid
  robots, neural-network particle fields, "matrix" green. Signals novelty, not
  reliability.
- **Dashboard screenshots with fake data** — invented charts and numbers read
  as fake to an operations buyer and violate `vrattiks-standards` §3. Use a
  real product surface or an honest abstract visual.
- **Unverifiable metric walls** — "10,000+ hours saved", "99.9% accuracy"
  without a source. One honest, specific claim beats four impressive ones.
- **Logo walls of clients you don't have.** If there are no client logos,
  use a different proof device (process transparency, named integrations you
  actually support) rather than a placeholder wall.
- **Undifferentiated service grids** — nine services in nine identical cards
  says "we'll do anything", which reads as an agency without a point of view.
- **Western-only trust signals.** For this buyer, signals that land: GST/legal
  entity clarity, India-based support hours, WhatsApp as a first-class channel,
  INR pricing or explicit "custom pricing", named local integrations (Tally,
  Zoho, WhatsApp Business API, Razorpay, IndiaMART). Absence of these is a
  credibility gap no amount of gradient fixes.
- **Hiding contact behind a form-only flow.** Mid-market Indian buyers expect
  a phone/WhatsApp path. A form as the only route loses leads.
- **Jargon-first headlines** — "agentic RAG orchestration". The buyer is
  buying an outcome, not an architecture (`vrattiks-design-system` §5).
- **Dark-mode-by-default developer aesthetics.** This buyer is not the
  developer audience Linear/Vercel design for; use dark as a deliberate band,
  not as the whole site.
- **Chatbot bubble on load.** Interrupting before value is stated is the most
  common conversion leak on agency sites.
- **Carousels for primary content.** Anything past slide 1 is effectively
  unseen — and it is a keyboard/a11y liability.

**Prefer:** plain-language outcome headlines, one clear next step per page,
visible process/timeline (what the first 30 days look like), honest
"what we don't do", and pricing posture stated even when the number is
"custom".

## 6. Pre-build checklist

- [ ] Content shape matched to a structure in §1 (and it isn't the same structure as the section above it)
- [ ] Container width / alignment alternates versus the neighbouring sections
- [ ] Colour budget respects 60/30/10; hierarchy comes from value, not hue
- [ ] At most one gradient surface in this viewport
- [ ] Dark surfaces use the dark text ramp and alpha borders, not `n-200`
- [ ] Type roles correct (display=headings, body=prose/UI, mono=labels); ≤2 weights per face
- [ ] Prose line length 60–75ch; line height scaled inversely to size
- [ ] All spacing on the 4px scale; section padding matches the band
- [ ] Grouping done by proximity — inner gaps clearly tighter than outer gaps
- [ ] No anti-pattern from §5 present (especially fake data, unverifiable metrics, AI clichés)
- [ ] India-market trust signals considered where the section is conversion-facing
- [ ] Any claim, metric, or logo is real per `vrattiks-standards` §3

## Used by / uses

Uses: `vrattiks-design-system` (canonical tokens, buttons, cards, bands,
voice), `vrattiks-standards` (§2 no invented values, §3 content integrity),
`vrattiks-accessibility` (contrast checks on every pair chosen here),
`vrattiks-architecture` (which sections a page actually needs).

Used by: `vrattiks-page-builder` (consult §1–§4 before writing a new section).
Pairs with `taste-skill` (post-build critique), `awesome-design` (concrete
worked examples of these patterns), and `kylezantos-design` (how the chosen
pattern moves and how it holds up across breakpoints).
