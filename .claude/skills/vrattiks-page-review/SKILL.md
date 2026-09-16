---
name: vrattiks-page-review
description: Orchestrator for reviewing/auditing an existing Vrattiks page or fixing a specific reported problem (e.g. "review this page", "fix mobile layout", "why does this look broken on tablet", "audit the Services page"). Inspects and reports against vrattiks-architecture, vrattiks-design-system, vrattiks-responsive, vrattiks-accessibility, vrattiks-seo, and vrattiks-performance BEFORE making any change. Use for review/audit/bugfix requests — not for building a new page from scratch (use vrattiks-page-builder for that).
---

# Vrattiks Page Review

**Review requests are inspect-first, not rewrite-first.** Never immediately
rewrite a page because it was flagged for review — a review that ends in a
full rewrite has skipped its own point.

## Workflow

1. **Inspect** the actual page/component files (per `vrattiks-standards` §1) — read them, don't assume from memory of a similar page.
2. **Identify problems** against the checklist in `references/checklist.md` (covers architecture, design, responsive, accessibility, SEO, performance, content integrity, code quality — each item traces back to the owning skill).
3. **Compare against requirements** in `vrattiks-architecture` (correct route, required sections present and in order, correct internal links) and the other skills as relevant to what was flagged.
4. **Explain findings** to the user as a report: what's correct, what's missing/wrong, and which skill's rule it violates. Do this before touching code.
5. **Make only the necessary fixes** — smallest change per `vrattiks-standards` §1–2. If the finding is a missing breakpoint variant, fix that variant; don't restructure the component.
6. **Re-verify** the specific thing that was fixed (e.g. re-check all widths in `vrattiks-responsive` if you touched responsive CSS, not just the one that was broken).
7. **Run verification** (`npm run build` / `npm run lint`) if code changed.
8. **Report** what was found, what was fixed, and what (if anything) is left as an open issue for the user to confirm content/direction on.

## Common request → what to prioritize

- **"Review this page"** → steps 1–4 only, then stop and present findings. Don't fix anything until the user confirms which findings to act on, unless they already said "review and fix."
- **"Fix mobile layout"** → prioritize `vrattiks-responsive` (reproduce at the specific mobile widths first) and inspection of the existing component's current breakpoint classes before writing new ones; re-check tablet/desktop after the fix per `vrattiks-responsive` §3.
- **"Fix accessibility on X"** → prioritize `vrattiks-accessibility`, smallest markup/attribute fix.
- **"This looks off-brand"** → prioritize `vrattiks-design-system` (token/component misuse) over a redesign.
- **"Audit the [page]"** → full checklist, structured report, no fixes unless asked.

## Used by / uses

Uses: `vrattiks-architecture`, `vrattiks-design-system`, `vrattiks-standards`,
`vrattiks-responsive`, `vrattiks-accessibility`, `vrattiks-seo`,
`vrattiks-performance`, and `references/checklist.md` in this skill. Peer
skill: `vrattiks-page-builder` (use that instead when the request is to
build something new rather than review/fix existing work).
