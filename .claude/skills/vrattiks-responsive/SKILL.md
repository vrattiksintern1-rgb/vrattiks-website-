---
name: vrattiks-responsive
description: Responsive QA standard for the Vrattiks website — the exact viewport widths to test and the failure modes to check for (overflow, clipping, wrapping, tap targets, nav, images, forms). Use whenever a page/section is built or when the request is about mobile/tablet layout, breakpoints, or "fix mobile" style issues.
---

# Vrattiks Responsive Standard

## 1. Test viewport widths

Test at all of these — they map onto the three CSS bands defined in
`vrattiks-design-system` §4 (desktop `>900px`, tablet `601–900px`, mobile `≤600px`):

- **Desktop**: 1440px, 1280px, 1024px
- **Tablet**: 768px
- **Mobile**: 430px, 390px, 375px

Use the dev server (`npm run dev`) plus browser responsive/devtools mode at
these exact widths (or an available browser-automation tool) rather than
only eyeballing one size.

## 2. What to check at every width

- Horizontal overflow (page or any element wider than the viewport)
- Clipped or cut-off content (text, cards, images bleeding off-screen)
- Text wrapping (no orphaned single words, no overflow from long words/URLs)
- Button/tap-target size (never shrunk below a comfortable tap target on mobile — see `vrattiks-design-system` §2)
- Navigation (does the nav collapse to mobile pattern correctly; are dropdowns usable on touch)
- Spacing (matches the padding steps in `vrattiks-design-system` §4 for that band, not arbitrary values)
- Images (no distortion, correct `next/image` `sizes`, no overflow)
- Video (doesn't force horizontal scroll, controls remain usable)
- Cards/grids (correct column count per band: 3-up desktop / 2-up tablet / 1-up mobile, except card grids which stay 2-up on mobile per the design doc)
- Animations (no janky reflow-triggering animation at small widths; motion still respects reduced-motion — see `vrattiks-accessibility`)
- Footer (columns stack correctly, no overlap)
- Forms (inputs full-width and usable on mobile, labels not clipped)
- Viewport meta / no user-scalable lock (Next.js default viewport is fine — don't override it to disable zoom)

## 3. Workflow

1. Inspect the component/page's existing Tailwind classes before changing anything (per `vrattiks-standards` §1) — most responsive bugs are a missing breakpoint variant, not a structural rewrite.
2. Reproduce the reported issue at the specific width first.
3. Make the smallest class-level fix (adjust a breakpoint variant, not the whole layout).
4. Re-check all widths in §1, not just the one that was broken — a fix at 375px can break 768px.
5. Report which widths were checked and what changed.

## Used by

`vrattiks-page-builder` (build-time check), `vrattiks-page-review` (audit
check). Design token/spacing source: `vrattiks-design-system`.
