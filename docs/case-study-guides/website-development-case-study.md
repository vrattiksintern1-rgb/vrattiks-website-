# Website Development — Case Study Detail Page Guide

Route: `/case-studies/[slug]` where the entry has `category: "website"`.
Listing it belongs to: the **Website Projects** section of `/case-studies`.
Status: guide v1, 2026-10-10. Written before any detail page exists.

Related guides: [iot-projects-case-study.md](iot-projects-case-study.md),
[custom-development-case-study.md](custom-development-case-study.md).

---

## 1. Purpose and audience

**Who reads it.** An Indian SME owner or marketing lead who already suspects
they need a new website, usually because the current one does not bring in
enquiries. They arrive from the `/case-studies` listing, from the Website
Development service page, or from a link we send them after a first call.
They are not developers. A smaller second audience is the person they forward
the page to (a partner, an in-house IT person) who checks the technical side.

**The decision it helps them make.** "Has Vrattiks built a site like the one
I need, for a business like mine, and did they think about the people who
will actually use it?" The page has to answer three things, in this order:

1. What the business needed the site to *do* (goals, audiences).
2. What we built to do it (pages, features, the lead path).
3. How well it works, shown with real evidence (screens, a live link,
   measured checks), or honestly marked as illustrative when not.

**What it is not.** Not a portfolio gallery (no wall of screenshots without
explanation) and not a tech spec. Research showed that agency pages fail most
often by listing a stack and adjectives ("premium", "stunning") with nothing
a reader can check (Zartek/Tekton, Techpedia; see §11).

---

## 2. Recommended page structure (in order)

Rough total: **600–1,000 words** of body copy. Skimmable: every section has
a short heading, and the first sentence of each section carries its point.

| # | Section | Required? | Rough length |
|---|---|---|---|
| 1 | Hero: project name, client, one-line summary, fact strip | Required | 1 line H1 + 1–2 sentences + 4–6 facts |
| 2 | Hero visual (real screen or illustrative recreation) | Required | 1 visual |
| 3 | The brief: who the site is for and what it had to do | Required | 60–120 words + audience list |
| 4 | Design approach | Required | 60–120 words, 2–4 decisions |
| 5 | Key pages and features (annotated screen) | Required | 3–6 annotated items |
| 6 | The lead path (how an enquiry travels) | Required when the site captures leads | 3–5 steps |
| 7 | Quality checks: responsive, performance, SEO, accessibility | Optional — only measured values | 2–4 rows |
| 8 | Before and after | Optional — only when a real "before" exists | 1 pair |
| 9 | Outcomes | Optional — only verified; qualitative allowed | 1–3 items |
| 10 | Client quote | Optional — only approved verbatim | 1 quote |
| 11 | Built with + related links | Required | stack list + service/industry links |
| 12 | Closing CTA (FinalCTA) + back to listing | Required | standard component |

### 2.1 Hero — required

- **Include:** H1 = project name (not a slogan). Under it, one plain sentence
  saying what the site is for, in business terms. A fact strip as a `<dl>`:
  Client, Industry, Project type, Built with (2–3 headline tools), Status
  (Live / In progress), Live site link when one exists.
- **Avoid:** fading the H1 in (kylezantos-design §1b); a headline claim
  ("Doubled leads") unless it is a verified metric with its period; repeating
  the listing page's 72px display-H1 treatment (already used by
  `CaseStudiesIntro`).
- The client name comes from the single `clientName` field — never typed in
  JSX (see §6).

### 2.2 Hero visual — required

- Mode A (§4): the real homepage screenshot, desktop frame plus a phone frame
  overlapping it, so responsiveness is shown rather than claimed.
- Mode B: a code-built, anonymised recreation with an **"Illustrative"** label
  on the visual itself.
- **Avoid:** reusing the listing's `BrowserFrame` + dot-wireframe placeholder
  as-is — the detail page must look different from its own listing card.

### 2.3 The brief — required

- **Include:** the business goal in one or two sentences; the audiences as a
  short list (e.g. two buyer types if the site serves two); constraints the
  client set (deadline, existing brand, must hand over to their team).
- **Avoid:** inventing a "pain" the client never stated; generic goals
  ("increase online presence").

### 2.4 Design approach — required

- **Include:** 2–4 concrete decisions and *why* each one serves the goal
  (e.g. "separate landing pages per audience, so each sees only the reasons
  that matter to them"). Plain language; one sentence per decision.
- **Avoid:** design-process theatre (mood boards, "we iterated") unless a real
  artefact is shown; adjectives instead of decisions.

### 2.5 Key pages and features — required

- **Include:** an annotated screen: numbered markers on the visual, matched to
  a numbered list beside or below it (the list is the accessible version; the
  markers are decoration). 3–6 items. Each item = page or feature name + what
  it does for the visitor or the client.
- **Avoid:** feature lists with no visual anchor; more than six callouts.

### 2.6 The lead path — required when the site captures enquiries

Most SME sites exist to produce enquiries, so show the path end to end:
visitor action → form and validation → what the visitor receives (e.g. a
brochure download) → what the client receives (e.g. a notification email).
3–5 steps, horizontal on desktop, vertical on mobile.

- **Avoid:** showing a real lead's name, phone or email in any visual. Sample
  data must be obviously sample ("Sample Name", "+91 00000 00000").

### 2.7 Quality checks — optional, measured values only

Rows for Responsive, Performance, SEO, Accessibility. Each row shows **what
was measured, with which tool, on which page, on what date**, e.g.
"Lighthouse mobile, homepage, 2026-10-01: Performance 92". Omit a row rather
than fill it with a claim.

- Prefer field data (Search Console / CrUX Core Web Vitals) when the site has
  enough traffic; a lab score (Lighthouse) is fine when labelled as lab.
- Never write "WCAG compliant" or "fully accessible" unless an audit was done;
  "checked with {tool} on {date}" is the honest form.
- Never imply a score is permanent — scores change with every release.

### 2.8 Before and after — optional

Only when we have a real screenshot of the previous site *and* the client
allows showing it. Two static images side by side (stacked on mobile), each
with a caption and date. **Avoid** drag sliders — they are hard to operate by
keyboard and add JS for little gain.

### 2.9 Outcomes — optional

Verified metrics only (rules in §5). If none exist, either omit the section
or state qualitative, client-confirmed outcomes ("The client's team now
updates project pages themselves"). Never leave an empty "Results: —" block.

### 2.10 Client quote — optional

Verbatim and approved in writing, attributed to a named person and role (or
role only if they asked). Max one per page. Never write a quote for the
client to sign off as their own words on this site.

### 2.11 Built with + related links — required

Stack as a plain list, each tool with a few words on its job ("Next.js — the
site framework"). Links: the Website Development service page, the industry
page when it exists, the `/case-studies` listing (vrattiks-architecture §5).

### 2.12 Closing CTA — required

Reuse `FinalCTA` with a page-specific title (it resolves to `/contact`). This
is the page's one primary/gradient button (CLAUDE.md, one primary per
section; "at most one gradient surface per viewport").

---

## 3. Website-specific must-haves

Decided after research. Items marked ★ were missing on most competitor pages
we read and are where Vrattiks can stand out.

1. **Goals and audiences** in the client's terms.
2. **Design approach** as decisions with reasons.
3. **Key pages and features**, anchored to a visual.
4. ★ **The lead path end to end**, including what the client's team receives.
   Real-estate competitor pages mention forms but never show the journey.
5. ★ **Responsive proof**: a phone view, not the word "responsive".
6. ★ **Measured quality checks** with tool + date (performance, SEO basics,
   accessibility). Every competitor page we read claimed "fast" or
   "SEO-ready" without a number.
7. **Live link** when the site is public and the client agrees (Ramotion,
   Zartek and Techpedia all link out; it is the cheapest proof there is).
8. **Before and after** only where real.
9. **Stack with plain-language roles** — technical readers want it, business
   readers need the role explained (docs/index.html §5 "clear over technical").
10. **Status** (live / in progress) — honest dating of the work.

---

## 4. Showcase modes

Set per entry with `showcaseMode`, and per visual with `illustrative`.

### Mode A — real screenshots (client allows)

- Hero: real homepage screenshot in a desktop frame + phone frame.
- Annotated screen (§2.5) uses real screenshots of the key pages.
- Before/after allowed if a real "before" exists.
- Live link shown as a secondary button in the hero fact strip and again in
  "Built with".
- Captions say what the screen is and when it was captured.

### Mode B — confidential or no screenshots yet

Use when the client has not approved screenshots, the site is not public, or
we simply do not have the images yet.

- Visuals are **code-built recreations** (layout blocks, real headings
  rewritten generically, sample form fields) or **wireframes**. No client
  logo, photos, brand colours or real copy.
- Each visual carries a visible **"Illustrative"** chip on the visual itself
  (visuals get screenshotted and shared on their own, so a single page-level
  note is not enough), plus one honest line once on the page, e.g.:
  *"The screens on this page are illustrative recreations, not screenshots
  of the client's site."* Keep it one sentence.
- No before/after, no live link if the site must not be identified.
- **Layout shift:** visuals stop being the proof, so they shrink (supporting
  column instead of full-width hero), and the brief, design decisions and lead
  path move up and get more room.
- Sample data must look like sample data. No realistic fake leads, prices,
  or analytics numbers inside a recreation.

### Mixed

Common in practice: real screenshots for public pages, illustrative for an
admin screen or email. Each visual's `illustrative` flag drives its own chip.

---

## 5. Proof and metrics rules

From vrattiks-standards §3 and CLAUDE.md Design Taste (ref 1: "numbers always
arrive with what they measure and over what period").

- **Only real, verified numbers.** Each metric needs: value, what it measures,
  period, baseline (if it is a change), source/tool, and the date the client
  approved publishing it.
- **No metric? Use qualitative outcomes** the client confirmed, or omit the
  section. A vaguer true statement beats a precise invented one.
- **Never invent** client names, metrics, testimonials, logos, or screenshots.
  Empty fields do not render.
- Client facts (years in business, number of projects) are **not** project
  outcomes — do not put them in the outcomes block (a common competitor
  pattern, e.g. Ramotion/Clearbit, Zartek/Tekton).
- Do not imply causation we cannot show (e.g. a client's later funding round
  presented as a result of the redesign).
- Lab scores are labelled as lab scores, with date and device.

### Checklist — collect from the project owner before writing

- [ ] Client name and written OK to name them (or the anonymised descriptor
      they accept)
- [ ] Industry and location as they want it shown
- [ ] Project type, start/launch month, current status (live / in progress)
- [ ] The goal in the client's words; the audiences the site serves
- [ ] Constraints (deadline, existing brand, handover needs)
- [ ] List of key pages and the job of each
- [ ] Features, especially forms, downloads, notifications, integrations
- [ ] Tech stack actually used (framework, hosting, forms/email service, CMS)
- [ ] Permission for screenshots (yes / no / only some pages)
- [ ] Desktop + mobile screenshots of the key pages (PNG, ≥1600px wide desktop,
      ≥780px wide phone), with capture date
- [ ] Previous-site screenshot + permission, if a before/after is wanted
- [ ] Live URL and OK to link
- [ ] Any measured numbers (leads, conversion, Core Web Vitals, Lighthouse)
      with period, baseline, tool and source
- [ ] Approved client quote (verbatim, name, role) — or a clear "none"
- [ ] Anything that must NOT be shown (prices, unreleased projects, staff names)

---

## 6. Content fields (typed)

Lives in the single case-study content file (today `app/lib/case-studies.ts`;
see open question in memory.md about `app/content/caseStudies.ts`). Fields
shared by all three categories are marked *base*.

| Field | Type | Req. | Notes |
|---|---|---|---|
| `slug` | `string` | ✔ *base* | kebab-case; also the listing anchor |
| `category` | `"website"` | ✔ *base* | |
| `status` | `"published" \| "draft"` | ✔ *base* | `draft` → not linked, `noindex`, "Template preview" label |
| `title` | `string` | ✔ *base* | project name; the H1 |
| `clientName` | `string` | ✔ *base* | **single source** for heading, breadcrumb, metadata, alt text. `"[Client Name]"` + `// TODO` when unknown |
| `industry` | `{ name: string; slug?: string }` | – *base* | `slug` only when `/industries/{slug}` exists |
| `kind` | `string` | ✔ *base* | small label, e.g. "Website" |
| `summary` | `string` | ✔ *base* | one sentence, facts only |
| `projectState` | `"live" \| "in-progress" \| "completed"` | ✔ *base* | shown honestly in the fact strip |
| `showcaseMode` | `"real" \| "illustrative"` | ✔ *base* | drives layout (§4) |
| `builtWith` | `{ name: string; role: string }[]` | ✔ *base* | role in plain words |
| `services` | `string[]` | – *base* | service slugs from content.ts |
| `goals` | `string[]` | ✔ | client's goals |
| `audiences` | `{ name: string; need: string }[]` | – | e.g. separate buyer types |
| `designApproach` | `{ decision: string; why: string }[]` | – | 2–4 |
| `keyPages` | `{ name: string; purpose: string }[]` | ✔ | 3–6 |
| `features` | `{ name: string; detail: string }[]` | – | |
| `leadPath` | `{ step: string; detail: string }[]` | – | required when the site captures leads |
| `qualityChecks` | `{ area: "responsive" \| "performance" \| "seo" \| "accessibility"; result: string; tool: string; page: string; measuredOn: string }[]` | – | measured only |
| `media` | `{ src: string; width: number; height: number; alt: string; caption?: string; device: "desktop" \| "mobile"; illustrative: boolean }[]` | – *base* | files in `public/images/case-studies/{slug}/` |
| `beforeAfter` | `{ before: Media; after: Media }` | – | real only |
| `liveUrl` | `string` | – | only with client OK |
| `outcomes` | `({ type: "metric"; value: string; label: string; period: string; source: string } \| { type: "qualitative"; text: string })[]` | – *base* | verified only |
| `testimonial` | `{ quote: string; name: string; role: string; approvedOn: string }` | – *base* | verbatim, approved |
| `seo` | `{ title?: string; description?: string }` | – *base* | overrides; defaults derive from title/summary |
| `updatedOn` | `string` (ISO date) | – *base* | only when real; feeds `dateModified` |

---

## 7. SEO and structured data (vrattiks-seo)

- **Title:** `{title} case study` → rendered through the root template as
  `Auroma Holiday Villas case study | Vrattiks Intelligence`. Keep the part
  before the template ≤ 35 characters.
- **Description:** one sentence, ≤ 155 characters: what was built, for whom
  (from `clientName`), and what it does. No claims or numbers unless verified.
- **Canonical:** `/case-studies/{slug}`. Open Graph `url` the same; reuse
  `/opengraph-image.png` (shallow metadata merge — pass `images` explicitly,
  see memory.md 2026-10-08) unless a real approved screenshot exists.
- **Headings:** one H1 (project name); H2 per section in §2 order; H3 for
  items inside a section.
- **Internal links:** service page, industry page (when it exists), listing,
  contact (vrattiks-architecture §5).
- **Structured data:** `BreadcrumbList` (Home → Case Studies → project) and,
  optionally, `Article` with `headline`, `author`/`publisher` = Vrattiks
  Intelligence, and `dateModified` only when `updatedOn` is real. Everything
  in the markup must be visible on the page (Google structured-data policies).
  **Never** `Review`, `AggregateRating` or a client testimonial as markup —
  Google treats reviews hosted by the reviewed business as self-serving.
- **Drafts:** `robots: { index: false, follow: false }`, no JSON-LD, not in
  the listing's `ItemList` JSON-LD, not linked anywhere.
- **Placeholder client name:** an entry whose `clientName` is still
  `"[Client Name]"` should not be indexed or linked — a bracketed placeholder
  in a title tag or search snippet is a public error (see open questions in
  memory.md, 2026-10-10).

---

## 8. Accessibility and performance for the visuals

vrattiks-accessibility, vrattiks-performance:

- `next/image` for every screenshot, with `width`/`height` or `fill` in a
  sized frame (no layout shift). `priority` only on the hero screenshot (the
  LCP element), nothing else. Correct `sizes` per the grid.
- Alt text describes what the screen shows and names the client from
  `clientName` (e.g. "Homepage of the {clientName} website on a phone").
  Illustrative recreations built from divs are `aria-hidden` *with* a visible
  caption that says what they represent, or are a `<figure>` whose
  `<figcaption>` carries the meaning.
- Annotated screens: the numbered list is the real content; the numbered
  markers are `aria-hidden`.
- Before/after: two images, two captions; no drag slider.
- Phone frame overlap must not cause horizontal overflow at 320px; drop the
  overlap below 601px.
- Export screenshots as WebP/AVIF via `next/image`; source PNG ≤ ~600 KB.
- Motion: one scroll-triggered reveal type for this page (e.g. screens rise
  and settle), `once: true`, nothing loops, respects reduced motion
  (`ui/Reveal`). No fade on the H1.
- Contrast: chip text on screens ≥ 4.5:1; never put text on the gradient's
  light end at small size (memory.md 2026-09-21).

---

## 9. Layout patterns already used on the site (don't repeat)

Audited 2026-10-10. The detail page must not reuse these as its structure:

| Pattern | Where |
|---|---|
| Centred hero + code window | Home `Hero` |
| Split hero, content left / image right, particles | `ServiceHero`, `IndustryHero` |
| Display-scale H1 alone, no image | `CaseStudiesIntro` |
| Sticky chapter bar | `CaseStudiesNav` |
| Oversized `01/02` numerals, alternating editorial rows | `CustomProjects` |
| Graphite spec sheet with crop marks | `IotProjects` |
| Browser-frame gallery, second column dropped | `WebsiteProjects` |
| Stacking sticky cards | `WhyBusinessesNeedAI` |
| Sticky heading + ruled numbered list | `WhyVrattiks`, `ServiceProblems`, `FAQ` |
| Graphite numbered steps with accent hairline | `ServiceSteps` |
| Dark Problem/Solution/Benefit matrix | `UseCases` |
| Display-scale benefit ledger | `ServiceBenefits` |
| Two-column ruled lists | `ServiceFeatures`, `ServiceFit`, `ContactBusinessInfo` |
| Scroll-linked rail timeline | `IndustryTimeline` |
| Pinned scroll stepper | `Process` |
| Auto-advancing slider | `ServicesSlider` |
| Monogram team cards | `Founders`, `Employees` |

**New patterns this page type can own** (suggestions, final call in the build):
desktop + phone frame pair in the hero; an annotated screen with numbered
markers; a horizontal lead-path flow; a measured-checks table (a real
`<table>`, which no page uses yet).

---

## 10. Voice

Business owner first (docs/index.html §5). Tech words appear only in "Built
with", each with its plain-language role. Outcomes in plain words ("visitors
choose the page meant for them" — not "audience-segmented conversion
funnels"). No hype words ("stunning", "premium", "seamless").

---

## 11. Competitor and reference table

Summarised in our own words; no text, images or branding copied.

| Company (region) | Page studied | Structure | How outcomes are shown | Strong | Weak |
|---|---|---|---|---|---|
| Zartek (India, Kochi) | Tekton Realty site | Meta (client, services, stack) → about client → challenge list → solution subsections → tech highlights → key sections → FAQ | Qualitative only; client's own credentials used as numbers | Clear problem→solution; live link; real-estate lead features named | No measured results; repetition; promotional adjectives |
| Techpedia | Real-estate builder site (Next.js) | Overview → problem → solution → stack → results bullets → CTA | Generic bullets | Short, clear, live link, stack | No screenshots at all; no numbers |
| Ramotion (US) | Clearbit website | Hero visual → facts + stack + live link → client → challenge with old-site screenshot → solution → outcome → testimonial | Narrative + client-business stats | Before screenshot; named testimonial; metadata block | Client stats shown as if outcomes; implied causation |
| Netguru (PL/global) | Cardano Foundation redesign | Tags → 3 headline metrics → client → numbered challenges → what we did → testimonial → stack | Three % metrics up top | Scannable; numbered challenge↔approach | No baseline or period on any metric |
| Clay (US) | Work listing | Card: image, one line, discipline/industry tags | None on cards | Strong visual lead, filter tags | Cards say nothing about results |
| Codewave (India) | Portfolio listing (Tally, govt platforms) | Outcome-led headlines on cards | Numbers in headlines | Leads with outcome | Some placeholders; numbers without context |
| ColorWhistle (India) | Own-site redesign | Before/after PageSpeed scores | Lab scores before vs after | Concrete speed numbers | Own site, not a client; lab only |
| Salt.agency (UK) | CWV improvement study | Method (Lighthouse API per URL) → template fix → % improvement | Single % headline | States measurement method | Full before/after not shown up front |
| KD Web (UK) | Company Rescue rebuild | Goal (pass CWV) → rebuild → result | "About 2× faster", passes CWV | Clear goal-result pairing | No scores published |
| Lollypop (India, Bengaluru) | Clutch reviews only | Third-party reviews instead of own studies | Reviewer ratings | Independent voice | No first-party case study to evaluate |

**Takeaways used in this guide:** lead path + responsive proof + measured
checks are the gaps nobody fills; metadata strip and live link are table
stakes; never present client credentials as outcomes.

---

## Sources

Competitor and reference pages:
- https://www.zartek.in/our-work/tekton/
- https://www.techpedia.it.com/work/premium-real-estate-website
- https://www.ramotion.com/work/
- https://www.ramotion.com/clearbit-website-transformation/
- https://www.netguru.com/clients
- https://www.netguru.com/clients/rapid-website-redesign-with-design-to-code-tools
- https://clay.global/work
- https://codewave.com/case-studies/
- https://colorwhistle.com/casestudy/colorwhistle-website-redesign/ (via search summary)
- https://salt.agency/?p=4067373 (via search summary)
- https://www.casestudies.com/company/kd-web/case-study/company-rescue-launches-a-website-twice-as-fast-with-kd-web (via search summary)
- https://www.clutch.co/profile/lollypop-design-studio-terralogic-company?page=2 (via search summary)

Best practice, confidentiality, standards:
- https://webflow.com/blog/write-the-perfect-case-study (via search summary; direct fetch failed)
- https://unicornplatform.com/blog/best-agency-websites/
- https://www.centricdxb.com/insights/websites/how-to-write-compelling-case-studies-for-your-website
- https://resources.averi.ai/guides/how-to-write-a-case-study
- https://hawkemedia.com/insights/case-studies-b2b/
- https://www.fueler.io/blog/how-to-write-case-study-client-work-under-nda
- https://ecreativeworks.com/blog/can-we-write-a-case-study-when-our-customer-has-an-nda
- https://www.equinetmedia.com/blog/how-to-write-a-case-study-anonymous-client
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://webmasters.googleblog.com/2019/09/making-review-rich-results-more-helpful.html
- https://www.w3.org/WAI/tutorials/images/complex

Project sources: `docs/index.html` (§3 colour, §4 type, §5 voice, §6
components), `CLAUDE.md` (Design Taste), `memory.md`, `app/case-studies/`,
`app/components/{CaseStudiesIntro,CaseStudiesNav,CustomProjects,IotProjects,WebsiteProjects}.tsx`,
`app/lib/case-studies.ts`, `.claude/skills/vrattiks-*`.
