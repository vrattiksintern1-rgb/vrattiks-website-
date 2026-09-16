---
name: vrattiks-accessibility
description: Accessibility standard for the Vrattiks website — semantic HTML, heading hierarchy, keyboard navigation, focus states, alt text, form labels, contrast, and reduced-motion handling for Framer Motion. Use whenever building or reviewing any page/component, or when the request mentions accessibility, a11y, keyboard nav, screen readers, or contrast.
---

# Vrattiks Accessibility Standard

## Checklist

- **Semantic HTML**: real `<button>` for actions, real `<a>`/Next.js `<Link>` for navigation — never a `<div onClick>`. Use `<nav>`, `<header>`, `<footer>`, `<main>`, `<section>` for structural regions.
- **Heading hierarchy**: exactly one `<h1>` per page (the hero title, per the required sections in `vrattiks-architecture`), `<h2>` for each major section, `<h3>` for sub-items within a section. Never skip a level to get a font size — use Tailwind classes for size, heading tags for structure.
- **Keyboard navigation**: every interactive element (buttons, links, nav dropdowns, form fields, FAQ accordions) must be reachable and operable via Tab/Enter/Space alone. Test dropdown/accordion components specifically — these are the most likely to break.
- **Visible focus states**: never remove a focus outline without replacing it with an equally visible custom one (use the `--shadow-glow` token from `vrattiks-design-system` for a brand-consistent focus ring, don't use `outline: none` alone).
- **Accessible buttons/links**: icon-only buttons need an `aria-label`; a link's visible text (or `aria-label`) must describe its destination — no bare "Click here" / "Learn more" without surrounding context that makes the destination clear to a screen reader.
- **Image alt text**: every `<Image>` needs meaningful `alt` text describing content/purpose; decorative images get `alt=""`. Never leave `alt` empty on a content-bearing image (logos, product screenshots, case-study photos).
- **Form labels**: every input has a associated `<label>` (or `aria-label` if a visible label breaks the design) — placeholder text alone is not a label.
- **Contrast**: use the neutral scale from `vrattiks-design-system` (`n-800`/`n-900` text on light backgrounds) which is already tuned for contrast — don't introduce a lighter gray for body text to "soften" it.
- **Reduced motion**: any Framer Motion animation should respect `prefers-reduced-motion` (wrap durations/variants with a check, or use Framer Motion's `useReducedMotion` hook) rather than forcing motion on everyone.
- **ARIA only when needed**: don't add `role`/`aria-*` attributes to elements that are already semantically correct (a real `<button>` doesn't need `role="button"`). Add ARIA only to fill an actual gap — custom dropdowns, tabs, accordions, live regions for form errors.

## Workflow

1. Check the existing component's markup before adding ARIA — the fix is often "use a real element" instead of "add a role."
2. Fix accessibility issues with the smallest markup/attribute change, not a component rewrite.
3. Verify keyboard reachability and focus visibility by tabbing through the affected section, not just by reading the JSX.

## Used by

`vrattiks-page-builder` (build-time), `vrattiks-page-review` (audit check).
