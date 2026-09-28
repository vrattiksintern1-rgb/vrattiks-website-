# Vrattiks Skills System

Nine project skills for building/reviewing the Vrattiks website. Reference
data and rules live in one place each — no skill duplicates another's rules.

## Reference skills (data/rules, no workflow of their own)

- **vrattiks-architecture** — page list, routes, required sections, nav, CTA, internal-linking rules. The only place page structure is defined.
- **vrattiks-design-system** — brand tokens, buttons, cards, spacing, voice & tone (mirrors `docs/index.html` + `app/globals.css`).
- **vrattiks-standards** — safety rules, inspect-before-modify, content-integrity rules, real verification commands, anti-overengineering, final self-check. Every other skill points here instead of restating these.
- **vrattiks-responsive** — test viewport matrix and failure modes.
- **vrattiks-accessibility** — a11y checklist.
- **vrattiks-seo** — metadata/structured-data checklist.
- **vrattiks-performance** — image/JS/animation performance checklist.

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

## Ground rules that apply everywhere

Never invent business facts, testimonials, stats, or client names
(`vrattiks-standards` §3). Never build a page outside the list in
`vrattiks-architecture` §1. Always inspect existing code before writing new
code (`vrattiks-standards` §1). Do not modify the live website except when
explicitly asked to build/fix a page — these skills define *how* to do that
work, they don't authorize doing it unprompted.
