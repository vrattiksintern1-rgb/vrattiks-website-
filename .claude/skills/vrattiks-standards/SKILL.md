---
name: vrattiks-standards
description: Central safety, content-integrity, verification, and anti-overengineering rules for all Vrattiks website work — inspect-before-modify workflow, what never to delete/invent/rewrite, which real npm scripts to run, and the final self-check before calling anything done. Every other Vrattiks skill (page-builder, page-review, responsive, accessibility, seo, performance, design-system) references this instead of restating these rules. Load this whenever you are about to edit, create, or delete any file in this project.
---

# Vrattiks Engineering Standards

Shared rules referenced by every other `vrattiks-*` skill. If a rule belongs
here, it should not be repeated elsewhere — link back to this file instead.

## 1. Inspect before modify (always, no exceptions)

1. Read the relevant file(s) fully before editing.
2. Check `app/components/` for an existing component that already does this before writing a new one.
3. Identify what imports/uses the file you're about to change (`grep`/search for the component name).
4. Check `docs/index.html` and `app/globals.css` for the design tokens/patterns already in use.
5. Check for existing assets in `public/` before asking for or generating new ones.
6. Decide the smallest change that satisfies the request.
7. Make the change.
8. Run the verification commands that actually exist (§4).
9. Report what changed and why — not a restatement of the request.

Never edit blindly off a guess about what a file contains.

## 2. Safety rules

- Never delete working functionality without a stated reason tied to the current task.
- Never rewrite a whole page/component when a targeted edit satisfies the request.
- Never replace an existing component if it can be reused or extended.
- Never create a duplicate component that does what an existing one already does.
- Never touch a page/file unrelated to the current task.
- Never change design tokens (`app/globals.css` `@theme` values, fonts, radii, shadows) without an explicit reason — see `vrattiks-design-system`.
- Never remove an asset from `public/` or `docs/` without checking nothing references it.
- Preserve existing working animations unless the task specifically asks to change them.
- Keep changes minimal and targeted — a bug fix doesn't need a refactor alongside it.

## 3. Content integrity — never invent company facts

Classify every piece of copy you write into one of four buckets, and never
present one as another:

1. **Confirmed company information** — only what's already in this repo (`docs/index.html`, `memory.md`, prior commits) or what the user states directly in this conversation.
2. **User-provided information** — given by the user this session; usable, but note in `memory.md` that it came from the user, not from independent verification.
3. **Placeholder content** — used when real content doesn't exist yet. Mark clearly in code with a comment (e.g. `{/* placeholder copy — replace with approved content */}`), never as bracketed text visible on the live page.
4. **Generated marketing copy** — original copy you write to fill a section (headlines, feature blurbs). This is fine for structural/voice purposes but must not state specific numbers, client names, or results as if real.

Hard rules:
- Never invent testimonials, statistics, client names, logos, or case-study results. If a section needs them and none exist, use an explicit placeholder (e.g. "Client name — pending", "Result metric — pending case study data") rather than a plausible-sounding fake one.
- Never state a founder name, company history detail, or business fact that hasn't been confirmed in this repo or by the user.

### Known user-provided content (as of 2026-09-12)

The user supplied this content directly in conversation for the About/Company
page. Treat it as **user-provided**, not yet independently confirmed —
usable as draft copy, but flag it as pending final sign-off if the task
touches the Company page:

- **Brand story** (for "Our story" / "Why Vrattiks" sections): "Vrattiks was born from the ancient Indian idea of 'Vritti' — the natural flow of thought, action, and evolution. We combine this timeless wisdom with the power of modern AI to create systems that are not just automated, but intelligent, adaptive, and deeply aligned with how businesses truly work. Inspired by the 5 Elements: Earth, Water, Fire, Air, and Space — everything we build is designed to bring structure, clarity, energy, connection, and limitless growth into your operations. This is not just tech. It's intelligence, with purpose."
- **Co-founders**: Hitesh Dave, Arpit Patel.

Do not expand on these names/story with invented biographical details (roles,
titles, years of experience, photos, quotes) — only use what's given above
until the user or repo confirms more.

## 4. Verification commands — only what actually exists

Checked in `package.json` (re-check it if it may have changed):

- `npm run build` — Next.js build; also type-checks the project. Closest thing to a full check.
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`).
- `npm run dev` — for manual/visual verification in a browser.

There is **no** `test` script and **no** dedicated `typecheck` script in this
project. Do not invent or assume one exists. If isolated type-checking is
needed, use `npx tsc --noEmit` (TypeScript is a devDependency) rather than
guessing at an npm script name.

This repo runs a non-standard Next.js version (see `AGENTS.md`) — before
writing routing, data-fetching, or config code, check
`node_modules/next/dist/docs/` rather than relying on training-data Next.js
conventions.

## 5. Avoid overengineering

- No new abstractions, frameworks, or libraries beyond what's already in `package.json` unless the task explicitly requires it.
- No duplicate utilities — search for an existing one first.
- Prefer simple, composable components consistent with the existing `app/components/` pattern (one component per file, PascalCase) over generic/config-driven systems.
- Don't add feature flags, backwards-compatibility shims, or speculative props "for later."

## 6. Final self-check before reporting a task done

Before saying a task is complete, verify:

- [ ] Followed the page/section structure in `vrattiks-architecture` (if the task touched a page)
- [ ] Preserved existing functionality and animations
- [ ] No duplicated components or logic introduced
- [ ] No unrelated files touched
- [ ] Responsive per `vrattiks-responsive` (if UI changed)
- [ ] Accessible per `vrattiks-accessibility` (if UI changed)
- [ ] SEO handled per `vrattiks-seo` (if a page/route changed)
- [ ] `npm run build` / `npm run lint` clean (or explain why not run)
- [ ] All copy is real, user-provided, clearly-marked placeholder, or non-factual generated marketing copy — never invented fact

Fix anything that fails this check before reporting completion.

## Used by

Every `vrattiks-*` skill. This is the only place these rules live —
don't copy them into another skill's SKILL.md.
