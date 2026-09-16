---
name: vrattiks-page-builder
description: Orchestrator for creating or substantially building out a Vrattiks page or section (e.g. "create the AI Voice Agent page", "build the Industries overview", "add the Healthcare industry page"). Pulls page structure from vrattiks-architecture, styling from vrattiks-design-system, and applies vrattiks-responsive/vrattiks-accessibility/vrattiks-seo/vrattiks-performance plus the safety rules in vrattiks-standards. Use for build/create requests — not for open-ended review (use vrattiks-page-review for that).
---

# Vrattiks Page Builder

Building a page is a composition of the other Vrattiks skills, not a
separate rulebook. This skill sequences them — it doesn't redefine what
they say.

## Workflow

1. **Identify the page** in `vrattiks-architecture` §1 — confirm its route and which category it belongs to (main page / service detail / industry detail / use-case detail / blog article / case study). If the request names a page not in that list, stop and flag it rather than inventing a new page.
2. **Pull required sections** from `vrattiks-architecture` §2 (or the relevant detail-page template) — this is the section list to build, in order.
3. **Inspect before writing anything** — follow `vrattiks-standards` §1: read `app/components/` for reusable sections/pieces (Hero, CTA block, Card grid, etc.) before creating new components. A new service/industry/use-case detail page should reuse the same section components as its siblings, parameterized by content — not a fresh one-off component per page.
4. **Style with `vrattiks-design-system`** — tokens, button hierarchy (one Primary per section), card variants, voice & tone for any copy.
5. **Wire content honestly** — apply `vrattiks-standards` §3: use confirmed/user-provided content where it exists, generated marketing copy where appropriate, explicit placeholders for anything else (stats, testimonials, results).
6. **Link it in** — apply `vrattiks-architecture` §3 (nav) and §5 (internal linking) so the page isn't an orphan.
7. **Add metadata** — apply `vrattiks-seo` (title, description, canonical, OG, headings, structured data if grounded).
8. **Check accessibility** — apply `vrattiks-accessibility` as you build, not as an afterthought (semantic tags, alt text, labels, focus states from the start).
9. **Check performance** — apply `vrattiks-performance` (image/video handling, minimal `"use client"` boundary, animation choices).
10. **Verify responsive** — apply `vrattiks-responsive`'s full width matrix before considering the page done.
11. **Run verification** — `npm run build` and `npm run lint` per `vrattiks-standards` §4.
12. **Validate** against `../vrattiks-page-review/references/checklist.md` and fix anything failing before reporting done.
13. **Report** what was built/changed — page, route, sections, components reused vs. created, and anything left as a placeholder pending real content.

## Common request → what to prioritize

- **"Create the [Service] page"** → steps 1–13 in full, using the service-detail template in `vrattiks-architecture` §2.
- **"Create the [Industry] page"** → same, using the industry-detail template.
- **"Add the [Use Case] page"** → same, using the use-case-detail template (Problem → Solution → Benefit is required).
- **"Build the Home/Services/Industries/Use Cases/Case Studies/Products/Blog/Contact page"** → use the exact required-section list for that page in `vrattiks-architecture` §2, not a detail template.
- A request to build a *section within* an existing page (e.g. "add the Testimonials section to Home") only needs steps 3–11 for that section — don't rebuild the whole page.

## Used by / uses

Uses: `vrattiks-architecture`, `vrattiks-design-system`, `vrattiks-standards`,
`vrattiks-responsive`, `vrattiks-accessibility`, `vrattiks-seo`,
`vrattiks-performance`. Peer skill: `vrattiks-page-review` (use that instead
when the request is to inspect/audit rather than build).
