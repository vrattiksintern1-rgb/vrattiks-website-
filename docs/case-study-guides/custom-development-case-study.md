# Custom Development — Case Study Detail Page Guide

Route: `/case-studies/[slug]` where the entry has `category: "custom"`.
Listing it belongs to: the **Custom Projects** section of `/case-studies`.
Covers AI agents, workflow automations and bespoke software built for one
client's process.
Status: guide v1, 2026-10-10.

Related guides: [website-development-case-study.md](website-development-case-study.md),
[iot-projects-case-study.md](iot-projects-case-study.md).

---

## 1. Purpose and audience

**Who reads it.** An SME owner or sales/operations head with a specific
manual job that eats hours: replying to enquiries, qualifying leads, moving
data between sheets and tools, following up. Many are new to AI and a little
wary of it (docs/index.html §5 "approachable, not intimidating"). A second
reader is whoever handles their tools (an admin, a CRM owner) who wants to
know what it connects to and what happens when it gets something wrong.

**The decision it helps them make.** "Could Vrattiks automate *my* version of
this job, safely, with the tools I already use?" The page answers:

1. What the manual job was and what the client wanted instead.
2. How the automation works, step by step, in plain words.
3. What it connects to, what the AI does and does not decide, and where a
   person stays in charge.
4. Where it stands today (prototype / in progress / live) and what changed,
   only as far as verified.

**Why status matters most here.** AI projects are often shown as finished
when they are pilots. Netguru's claims-agent study labels itself a PoC
throughout — good — yet its headline still reads like a production result.
We state status plainly in the hero and never let a headline outrun it.

---

## 2. Recommended page structure (in order)

Rough total: **600–1,100 words**.

| # | Section | Required? | Rough length |
|---|---|---|---|
| 1 | Hero: project name, client, one-line summary, fact strip incl. status | Required | H1 + 1–2 sentences + 4–6 facts |
| 2 | Problem statement | Required | 60–120 words |
| 3 | Objective | Required | 1–3 sentences or 2–4 bullets |
| 4 | Approach and strategy | Required | 2–4 decisions with reasons |
| 5 | How it works: the workflow, step by step | Required | 4–8 steps + 1 visual |
| 6 | What the AI does — and where a person steps in | Required when AI is involved | 3–6 items |
| 7 | Connected tools and tech stack | Required | list with roles |
| 8 | Sample interaction or code (illustrative) | Optional | 1 visual or snippet |
| 9 | Current status and next steps | Required | 1–3 sentences |
| 10 | Outcomes | Optional — verified only | 1–3 items |
| 11 | Client quote | Optional — approved verbatim | 1 |
| 12 | Related links | Required | service, industry, listing |
| 13 | Closing CTA (FinalCTA) + back to listing | Required | standard |

### 2.1 Hero — required
- **Include:** H1 = project name. One sentence on what it does, for whom.
  Fact strip (`<dl>`): Client (from `clientName`), Industry, Project type,
  Channel (e.g. WhatsApp), **Status** (e.g. "Final setup in progress"),
  Built with (2–3 headline tools).
- **Avoid:** H1 fade (kylezantos-design §1b); a result in the headline unless
  verified with period; the words "live", "launched" or "deployed" unless
  true; repeating the listing's oversized-numeral editorial row
  (`CustomProjects`).

### 2.2 Problem statement — required
The manual job in concrete terms: who did it, how, how often, what slipped.
Use the client's facts; quantify only with confirmed figures.
- **Avoid:** generic AI-adoption framing ("businesses are drowning in data").

### 2.3 Objective — required
What "done" looks like for the client, testable where possible ("every new
enquiry gets a reply on WhatsApp and lands in the sheet").

### 2.4 Approach and strategy — required
2–4 decisions with the reason for each: why this channel, why these tools
(e.g. "built on the spreadsheet the team already uses, so nothing new to
learn"), why a person approves certain steps.

### 2.5 How it works — required
The core of the page. A numbered step sequence:
**Trigger → steps (read, decide, act) → output → who is notified.**
- Visual: a code-built workflow trace (nodes and connectors drawn in
  HTML/SVG with our tokens), not a screenshot of the client's n8n canvas
  unless permitted and scrubbed of credentials, URLs and data.
- Each step: plain-language name + the tool doing it.
- **Avoid:** an unlabelled screenshot of a tool canvas; showing API keys,
  webhook URLs, phone numbers or sheet IDs anywhere.

### 2.6 What the AI does, and where a person steps in — required for AI work
- What the model reads, what it produces, what it is *not* allowed to do,
  what happens when it is unsure (handoff to a person), who reviews.
- This is the trust section; competitor pages that skipped it (Simform's
  KeyStory study did cover guardrails — a strength) read as risky.
- **Avoid:** naming model internals the reader does not need; promising
  accuracy we have not measured.

### 2.7 Connected tools and tech stack — required
Each tool with its job: "Google Sheets — where leads and replies are kept".
Group as *Connected to your tools* (things the client already uses) and
*Under the hood* (orchestration, model, voice/real-time layer).

### 2.8 Sample interaction or code — optional, illustrative
A recreated chat thread, a sample message template, or a short sample code /
config snippet that shows the *shape* of the logic. Always labelled
"Illustrative", always sample data, never the client's real prompt, data or
credentials (§4).

### 2.9 Current status and next steps — required
One to three sentences, honest: prototype, pilot, final setup in progress,
live since {month}. What remains, if the client is fine with saying so.

### 2.10 Outcomes — optional
Verified only (§5). For in-progress work: omit. Do not show "expected"
results.

### 2.11 Client quote — optional
Verbatim, approved, attributed.

### 2.12 Related links — required
Matching service page(s), industry page when it exists, listing
(vrattiks-architecture §5).

### 2.13 Closing CTA — required
`FinalCTA`, page-specific title, the page's one gradient surface.

---

## 3. Custom-development must-haves

Decided after research. ★ = missing or thin on most competitor pages.

1. **Project name and client type** (name, or anonymised descriptor).
2. **Problem statement** in the client's terms.
3. **Objective** that can be checked.
4. **Approach and strategy** — decisions with reasons.
5. **Solution and process followed** — workflow steps with the tool at each.
6. ★ **Human-in-the-loop and failure handling** — what happens when the AI is
   unsure or wrong.
7. ★ **Data handling** — what data it touches, where it is stored, who can see
   it (in plain words; only what is true).
8. **Tech stack with roles**, split into client-facing tools and internals.
9. ★ **Honest status** in the hero, not buried.
10. **Outcomes** — verified only; omitted for in-progress work.
11. **Illustrative recreation** when the real system cannot be shown (most
    custom work is internal by nature — this is the default, not the
    exception).

---

## 4. Showcase modes

### 4.1 Mode A — real screens (client allows)
- Scrubbed screenshots of the client-facing surface (e.g. a WhatsApp thread
  with names and numbers removed), the sheet it writes to (sample rows only),
  or the dashboard. Each screenshot reviewed element by element (names, URLs,
  phone numbers, IDs); cropping alone is not enough.
- Layout: real conversation or output screenshot in the hero; workflow trace
  follows as the explanation.

### 4.2 Mode B — confidential or not yet shareable (expected default)
- **Workflow trace** (code-built node diagram) as the hero visual.
- **Conversation recreation**: a chat UI built in HTML with sample messages
  that show the *kind* of exchange (greeting, a qualifying question, a
  handoff), with neutral sample names — never real messages.
- **Sample code/config snippet**: a short, generic fragment (e.g. a sample
  JSON object for a lead row, or pseudo-steps), labelled illustrative and
  sample. Never the client's real prompt, workflow export or keys.
- Every recreated visual carries a visible **"Illustrative"** chip, plus one
  sentence once on the page: *"Screens and code on this page are illustrative
  recreations; the client's data and setup are not shown."*
- **Layout shift:** proof comes from clarity of process, not screenshots, so
  the step sequence and the human-in-the-loop section get the most space; the
  conversation recreation is a supporting visual, not the hero.

---

## 5. Proof and metrics rules

- **Only real, verified numbers**, each with value, what it measures, period,
  baseline, method, and client approval date.
- **In-progress or pilot work shows no results.** Not "expected", not
  "projected", not "up to".
- **No metric? Qualitative outcomes** confirmed by the client, or omit.
- **Never invent** client names, metrics, testimonials, conversations,
  screenshots or claims of being live (vrattiks-standards §3).
- Test-environment numbers (if ever used) are labelled as such with sample
  size (Netguru's 83% figure never said whether it was test or live — avoid).
- Tool vendors' own benchmarks (model speed, accuracy) are not our results.

### Checklist — collect from the project owner before writing
- [ ] Client name + permission to name (or accepted anonymised descriptor)
- [ ] Industry and business type
- [ ] Status today (prototype / pilot / in progress / live) and since when
- [ ] The manual job before: who, how, how often, what went wrong
- [ ] The objective as agreed with the client
- [ ] Trigger, each workflow step, the tool at each step, the output
- [ ] Which steps use AI, what the model reads/produces, guardrails
- [ ] Handoff: when a person takes over, who, how they are notified
- [ ] Data: what personal data is touched, where it is stored, retention,
      who has access
- [ ] Full tool list actually used (and what each one does)
- [ ] Permission for screenshots; scrubbed screenshots if yes
- [ ] Any measured outcomes with period, baseline and method — or "none yet"
- [ ] Approved client quote, or "none"
- [ ] What must not be shown (prompts, pricing logic, client's customers)

---

## 6. Content fields (typed)

*base* fields are shared with the other two guides (full notes in
website-development-case-study.md §6).

| Field | Type | Req. | Notes |
|---|---|---|---|
| `slug`, `category: "custom"`, `status`, `title`, `clientName`, `industry`, `kind`, `summary`, `projectState`, `showcaseMode`, `builtWith`, `services`, `media`, `outcomes`, `testimonial`, `seo`, `updatedOn` | see website guide | *base* | `clientName` single source; `"[Client Name]"` + `// TODO` when unknown. `projectState` adds `"prototype" \| "pilot"` |
| `statusNote` | `string` | ✔ | human sentence shown in hero, e.g. "Final setup in progress" |
| `channel` | `string` | – | where users meet it (WhatsApp, web, phone) |
| `problem` | `string` | – | empty → section hidden |
| `objective` | `string \| string[]` | – | |
| `approach` | `{ decision: string; why: string }[]` | – | |
| `workflow` | `{ step: string; tool?: string; detail?: string }[]` | ✔ | trigger → output |
| `aiRole` | `{ does: string[]; doesNot?: string[]; handoff?: string }` | – | required when AI used and known |
| `dataHandling` | `string[]` | – | true statements only |
| `stack` | `{ name: string; role: string; group: "connected" \| "internal" }[]` | ✔ | role may be blank → name only |
| `sample` | `{ kind: "chat" \| "code"; caption: string; content: unknown }` | – | always illustrative |
| `nextSteps` | `string` | – | only if client agrees |

Rule for the build: **a field the user has not confirmed stays empty, and an
empty field hides its section** — the page shrinks rather than guesses.

---

## 7. SEO and structured data (vrattiks-seo)

- **Title:** `{title} case study` → `… | Vrattiks Intelligence`; ≤ 35
  characters before the template (shorten the project name in `seo.title`
  if needed).
- **Description:** ≤ 155 characters: what it does, on which channel, for
  whom (from `clientName`). No outcome claims for in-progress work.
- **Canonical:** `/case-studies/{slug}`; OG `images` explicit.
- **Headings:** one H1; H2 per §2 section; H3 for steps.
- **Structured data (published only):** `BreadcrumbList`; optional `Article`
  with visible facts only. No `SoftwareApplication` with ratings, no
  `Review`/`AggregateRating`.
- **If the entry still shows `"[Client Name]"`:** do not publish; treat as
  draft (noindex) until the name is supplied — a placeholder in a title tag
  or search snippet is a public error.

---

## 8. Accessibility and performance for the visuals

- **Workflow trace:** an ordered list (`<ol>`) is the real content; the
  connectors and node boxes are styling. Never encode order only in arrows.
  Reflows to vertical below 901px; zero overflow at 320px.
- **Conversation recreation:** a `<figure>` with `<figcaption>`
  ("Illustrative example of a conversation"); messages as a list; sender
  conveyed in text (sr-only "Customer:" / "Assistant:"), not by bubble side
  or colour alone. No live typing animation on a loop; at most one reveal.
- **Code snippet:** `<pre><code>` with a visible label; horizontal scroll is
  allowed *inside* the block (`overflow-x-auto`, focusable with
  `tabIndex={0}` and an `aria-label`) but must never widen the page. Body
  font only (design system allows no third/mono typeface — use IBM Plex Sans
  with tabular figures, per CLAUDE.md).
- Screenshots: `next/image`, sized, `priority` only for a hero LCP image; alt
  names the surface and the client from `clientName`.
- Motion: one reveal idea for the page (e.g. workflow steps appear in order
  once as the trace scrolls in), `once: true`, nothing loops, reduced motion
  shows the final state. No fade on H1.
- `"use client"` only on a small leaf if any interaction is needed; the page
  and all content stay server-rendered.

---

## 9. Layout patterns already used on the site (don't repeat)

Same audit as website-development-case-study.md §9. Especially avoid the
listing's **oversized numerals + alternating rows** (`CustomProjects`), the
**pinned scroll stepper** (`Process`) and the **graphite numbered steps**
(`ServiceSteps`) — a workflow page is tempted toward all three. The typing
code window on Home (`HeroVisual`) is also taken; a code snippet here must be
static.

**New patterns this page type can own:** a "case file" fact strip; a
code-built workflow trace with tool tags on each node; a chat recreation; a
does / does-not / hands-off split for the AI's role.

---

## 10. Voice

Explain the job, not the technology. "When a buyer messages on WhatsApp, the
assistant asks what they're looking for and saves their answers to the team's
sheet" — not "LLM-driven conversational lead-qualification pipeline". Tool
names live in the stack list with their plain roles. No "AI-powered" as
decoration, no "revolutionary", no "seamless".

---

## 11. Competitor and reference table

Summarised in our own words; nothing copied.

| Company (region) | Page studied | Structure | How outcomes are shown | Strong | Weak |
|---|---|---|---|---|---|
| Netguru (PL/global) | ARC Europe claims AI agent (PoC) | Tags → 3 headline metrics → client → 3 challenges → what we did (intake/analysis/recommendation) → testimonial → stack | Headline metrics | Labels PoC; human makes final call; staged process | 83% figure has no method or test/live label |
| Netguru | Listing (dental chatbot etc.) | Outcome-in-headline cards | % in titles | Scannable | Metrics without context |
| Simform (India/US) | Real-estate content automation | Hero → 3 metrics → client facts → 3 challenges → solution + architecture (guardrails, tenant separation, fallbacks) → impact → unrelated testimonials | Metrics + narrative | Guardrails and fallbacks explained; named client | Mislabelled diagram; testimonials from other clients; scale numbers disagree |
| Simform | Listing | Metric in title, industry + service tags | % in titles | Clear tagging | Card summaries vary in rigour |
| thoughtbot (US) | Confidential healthcare AI tool | Summary block → product screenshots → narrative → testimonial → challenge → results → CTA | Qualitative | Shows NDA work can still carry real screens | Client label inconsistent; no confidentiality note; stock photos |
| thoughtbot | Listing | Tag, headline, one-line summary | Figures where real | Mixes metric and non-metric honestly | Some headlines say nothing about outcome |
| Codewave (India) | Listing | Outcome-led headlines | Numbers in titles | Outcome first | Context missing; placeholders |
| Growwstacks | WhatsApp support agent (n8n + GHL) | Flow description → metrics | % figures, no client | Shows the actual message flow | Unnamed client, unverified numbers |
| n8n community (freelancer) | Real-estate WhatsApp lead qualifier | Qualify → route to CRM → escalate to a person | Response-time before/after | Handoff and tool swap reasoning explained | Self-reported |
| Openxcell, MindInventory (India) | Service pages / Clutch | Company-level claims, third-party reviews | Company totals | Independent reviews (Clutch) | No project-level proof on the pages found |

**Takeaways used in this guide:** status must be stated in the hero;
human-in-the-loop and data handling build trust and are usually missing;
recreated visuals are the normal case for internal automations and must be
labelled; never let a headline outrun the evidence.

---

## Sources

Competitor and reference pages:
- https://www.netguru.com/clients
- https://www.netguru.com/clients/ai-agent-poc-to-reduce-claims-processing-time-by-83
- https://www.simform.com/case-studies/
- https://www.simform.com/case-studies/real-estate-automation-claude/
- https://thoughtbot.com/case-studies
- https://thoughtbot.com/case-studies/generative-ai
- https://codewave.com/case-studies/
- https://growwstacks.com/case-studies/apps/automate-whatsapp-customer-support-ai-agent-ghl (via search summary)
- https://community.n8n.io/t/available-ai-automation-engineer-n8n-llm-whatsapp-shipped-production/306274 (via search summary)
- https://www.openxcell.com/?p=813 (via search summary)
- https://clutch.co/go-to-review/mindinventory/103146 (via search summary)

Best practice, confidentiality, standards:
- https://www.fueler.io/blog/how-to-write-case-study-client-work-under-nda
- https://ecreativeworks.com/blog/can-we-write-a-case-study-when-our-customer-has-an-nda
- https://www.equinetmedia.com/blog/how-to-write-a-case-study-anonymous-client
- https://resources.averi.ai/guides/how-to-write-a-case-study
- https://hawkemedia.com/insights/case-studies-b2b/
- https://www.scalevp.com/resources/building-a-great-b2b-case-study
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://webmasters.googleblog.com/2019/09/making-review-rich-results-more-helpful.html
- https://www.w3.org/WAI/tutorials/images/complex

Project sources: `docs/index.html`, `CLAUDE.md`, `memory.md`,
`app/components/CustomProjects.tsx`, `app/lib/case-studies.ts`,
`.claude/skills/vrattiks-*`.
