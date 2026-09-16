---
name: vrattiks-seo
description: SEO standard for the Vrattiks website — page titles, meta descriptions, canonical URLs, Open Graph/Twitter metadata, heading structure, internal linking, descriptive URLs, alt text, and structured data using this repo's actual routes from vrattiks-architecture. Use whenever building or reviewing a page, or when the request mentions SEO, metadata, or search visibility.
---

# Vrattiks SEO Standard

## Checklist per page

- **Unique title**: every route gets its own `<title>` (Next.js Metadata API — check `node_modules/next/dist/docs/` first per `AGENTS.md`, this repo's Next version may differ from training data). No two pages share a title.
- **Meta description**: one unique, accurate sentence per page describing what it offers — follow the voice/tone rules in `vrattiks-design-system` §5, no keyword stuffing.
- **Canonical URL**: set to the page's route from `vrattiks-architecture` §1 — never a guessed or duplicate path.
- **Open Graph**: `og:title`, `og:description`, `og:url`, `og:image` (reuse an existing brand asset from `public/`/`docs/` — don't invent a new one without checking what exists).
- **Twitter/X card**: `summary_large_image` where an OG image exists.
- **Semantic headings**: one `<h1>` matching the page's hero per `vrattiks-accessibility`; section headings follow the required-sections order in `vrattiks-architecture` §2 — this also gives search engines the page's real structure.
- **Internal linking**: follow the linking rules in `vrattiks-architecture` §5 exactly — this is both an SEO and a UX requirement, don't invent a different linking pattern.
- **Descriptive URLs**: use the slugs already defined in `vrattiks-architecture` §1 (kebab-case, matches the service/industry/use-case name) — don't introduce a different slug for the same page.
- **Image alt text**: same requirement as `vrattiks-accessibility` — SEO and a11y share this one, don't duplicate the rule, just satisfy both.
- **Structured data**: add JSON-LD only where it's factually grounded — e.g. `Organization` schema on Home using only confirmed company info (`vrattiks-standards` §3), `Service` schema on service-detail pages, `Article` schema on blog posts using the post's real metadata. Never add `AggregateRating`, review counts, or numeric claims that aren't backed by real data.

## Hard rule

Never fabricate a business fact, statistic, or review to make metadata or
structured data look more complete — leave a field out or use a neutral
description rather than inventing one. See `vrattiks-standards` §3.

## Used by

`vrattiks-page-builder` (every new route needs this), `vrattiks-page-review`
(audit check). Route/slug source of truth: `vrattiks-architecture`.
