# Vrattiks Skills System

Thirteen project skills for building/reviewing the Vrattiks website. Reference
data and rules live in one place each — no skill duplicates another's rules.

## Reference skills (data/rules, no workflow of their own)

- **vrattiks-architecture** — page list, routes, required sections, nav, CTA, internal-linking rules. The only place page structure is defined.
- **vrattiks-design-system** — brand tokens, buttons, cards, spacing, voice & tone (mirrors `docs/index.html` + `app/globals.css`).
- **vrattiks-standards** — safety rules, inspect-before-modify, content-integrity rules, real verification commands, anti-overengineering, final self-check. Every other skill points here instead of restating these.
- **vrattiks-responsive** — test viewport matrix and failure modes.
- **vrattiks-accessibility** — a11y checklist.
- **vrattiks-seo** — metadata/structured-data checklist.
- **vrattiks-performance** — image/JS/animation performance checklist.

## Design-quality skills (taste, patterns, motion — consulted by the orchestrators)

- **ui-ux-pro-max** — pre-build lookup: layout structure per content shape, colour/type pairing, spacing rhythm, and anti-patterns for an AI-automation agency selling to Indian mid-market/enterprise. Consult *before* building a section.
- **taste-skill** — post-build critique: the seven "AI slop" patterns, how to extract design *reasoning* (not tokens) from `docs/reference-sites.md`, and a slop audit to run before calling a page done.
- **awesome-design** — named technique library from premium product sites (Stripe pricing table, Linear dark band, Vercel mono eyebrow…) with the reason each works and how to rebuild it in Vrattiks tokens. Structure/interaction only, never content.
- **kylezantos-design** — purposeful motion (four jobs, fast defaults, explicit when-*not*-to-animate) plus a 375/768/1024/1440 responsive audit method. Three modes: build component / audit animations / audit responsive.

## Orchestrator skills (workflow, compose the reference skills above)

- **vrattiks-page-builder** — for build/create requests. Sequence: architecture → inspect existing components → design-system → content-integrity → linking → seo → accessibility → performance → responsive → verify → checklist → report.
- **vrattiks-page-review** — for review/audit/bugfix requests. Sequence: inspect → identify problems against the checklist → compare to architecture → report findings → only then make minimal fixes → re-verify → report. Never rewrites on first pass.

Shared validation checklist: `vrattiks-page-review/references/checklist.md`
(used by both orchestrators).

## Routing examples

| Request | Skills engaged |
|---|---|
| "Create the AI Voice Agent page" | page-builder → architecture, design-system, standards, seo, accessibility, performance, responsive |
| "Fix mobile layout" | page-review → responsive (primary), then design-system/accessibility as needed |
| "Review this page" | page-review → inspect + report only, no rewrite unless asked |
| "Build the Industries overview" | page-builder → architecture (main-page section list, not detail template) |
| "This section looks generic / AI-made" | taste-skill (§3 critique, §4 audit) → awesome-design if it needs a stronger structural idea |
| "What layout should this section use?" | ui-ux-pro-max (§1), before any styling |
| "Make it look premium / like Stripe" | ui-ux-pro-max → awesome-design → taste-skill (structure only, never their content) |
| "Add a hover/animation" or "this feels janky" | kylezantos-design (Mode A build / Mode B audit) |
| "Check this across breakpoints" | kylezantos-design Mode C (method) + vrattiks-responsive (canonical widths) |

## Ground rules that apply everywhere

Never invent business facts, testimonials, stats, or client names
(`vrattiks-standards` §3). Never build a page outside the list in
`vrattiks-architecture` §1. Always inspect existing code before writing new
code (`vrattiks-standards` §1). Do not modify the live website except when
explicitly asked to build/fix a page — these skills define *how* to do that
work, they don't authorize doing it unprompted.
