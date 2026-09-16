# Vrattiks Page Validation Checklist

Run through this before calling any page-related task complete. Shared by
`vrattiks-page-builder` and `vrattiks-page-review` — don't copy it inline,
reference this file.

### Architecture (`vrattiks-architecture`)
- [ ] Page exists at the correct route from §1
- [ ] All required sections from §2 are present, in order
- [ ] Nav placement matches §3 (top-level vs. reached via overview page)
- [ ] CTA follows §4 (one primary button, correct target)
- [ ] Internal links follow §5 (links to the right related Services/Industries/Use Cases)

### Design (`vrattiks-design-system`)
- [ ] Uses token classes (`bg-brand-*`, `text-n-*`, `rounded-*`) — no hardcoded hex/px values outside the 4px scale
- [ ] Button variants used per their stated purpose (one Primary max per section)
- [ ] Cards use the correct variant (standard/stat/feature) for their content
- [ ] Voice & tone matches §5 (plain, outcome-led, no AI hype language)

### Responsive (`vrattiks-responsive`)
- [ ] Checked at 1440 / 1280 / 1024 / 768 / 430 / 390 / 375
- [ ] No horizontal overflow or clipped content at any width
- [ ] Cards/grids reflow per band (3-up → 2-up → 1-up, cards stay 2-up on mobile)
- [ ] Buttons keep full tap-target size on mobile
- [ ] Forms/nav/footer usable at all widths

### Accessibility (`vrattiks-accessibility`)
- [ ] Semantic HTML (real buttons/links/landmarks, no div-as-button)
- [ ] One `<h1>`, correct heading order
- [ ] Keyboard reachable, visible focus states
- [ ] Alt text on all content images
- [ ] Form inputs have real labels
- [ ] Motion respects `prefers-reduced-motion`

### SEO (`vrattiks-seo`)
- [ ] Unique title + meta description
- [ ] Canonical URL set to the correct route
- [ ] OG/Twitter metadata present
- [ ] Structured data (if any) is factually grounded, not fabricated

### Performance (`vrattiks-performance`)
- [ ] Images via `next/image`, no bare `<img>`
- [ ] Only necessary components are `"use client"`
- [ ] Animations use transform/opacity, not layout-triggering properties
- [ ] No new/duplicate dependency added without checking `package.json`

### Content integrity (`vrattiks-standards` §3)
- [ ] No invented statistics, testimonials, client names, or case-study results
- [ ] Placeholder content clearly marked in code comments, not shown as literal bracketed text
- [ ] Founder/company facts match the confirmed content in `vrattiks-standards`, nothing embellished

### Code quality (`vrattiks-standards`)
- [ ] No duplicate components
- [ ] No unused imports
- [ ] `npm run build` and `npm run lint` clean (or explained why not run)
- [ ] No unrelated files touched
- [ ] Existing functionality/animations preserved
