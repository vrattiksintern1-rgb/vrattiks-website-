# IoT Projects — Case Study Detail Page Guide

Route: `/case-studies/[slug]` where the entry has `category: "iot"`.
Listing it belongs to: the **IoT Projects** section of `/case-studies`.
Status: guide v1, 2026-10-10. **Vrattiks has no confirmed IoT project yet**
(memory.md 2026-10-08). Until one exists, the only IoT entry allowed is a
`status: "draft"` template preview (§4.3).

Related guides: [website-development-case-study.md](website-development-case-study.md),
[custom-development-case-study.md](custom-development-case-study.md).

---

## 1. Purpose and audience

**Who reads it.** Two people, usually from the same company:

1. **The owner or operations head** (factory, cold storage, farm, building,
   fleet) who has a physical problem: something breaks, spoils, leaks or runs
   empty and nobody knows in time. They decide whether to call us.
2. **The technical checker** they forward it to (plant engineer, IT person,
   consultant) who wants to see the hardware, the network and the failure
   handling before trusting a vendor with equipment on site.

**The decision it helps them make.** "Can Vrattiks put working devices on my
site, get the data to a screen my team will read, and keep it running?" IoT
buyers are more risk-averse than website buyers: hardware is physical, sites
are remote, and a failed install costs downtime. So this page must prove
**reliability and supportability**, not just a nice dashboard.

**Tone tension.** docs/index.html §5 says write for business owners, not
developers — but the technical checker needs specifics. Resolution: the
**story sections** (problem, outcome) stay plain; the **system sections**
(hardware, connectivity, firmware, cloud) are where specifics live, and every
technical item gets a plain-language "what it does" line beside it.

---

## 2. Recommended page structure (in order)

Rough total: **800–1,300 words**. Longer than a website study because the
system has more parts; keep each part short.

| # | Section | Required? | Rough length |
|---|---|---|---|
| 1 | Hero: project name, client, one-line summary, fact strip | Required | H1 + 1–2 sentences + 4–6 facts |
| 2 | The problem on site | Required | 80–150 words |
| 3 | What the system had to do (objectives) | Required | 3–5 bullets |
| 4 | System architecture diagram | Required | 1 diagram + text description |
| 5 | Hardware and sensors | Required | table, 3–8 rows |
| 6 | Connectivity and protocols | Required | table or short list + 1–2 sentences |
| 7 | Firmware and edge behaviour | Required | 60–120 words |
| 8 | Cloud and dashboard | Required | 60–120 words + 1 visual |
| 9 | Deployment and installation | Required | 3–6 steps + scale facts |
| 10 | Reliability and maintenance | Required (qualitative allowed) | 2–5 items |
| 11 | Security | Required | 3–6 items |
| 12 | Results | Optional — verified only | 1–3 items |
| 13 | Client quote | Optional — approved verbatim | 1 |
| 14 | Built with + related links | Required | list + links |
| 15 | Closing CTA (FinalCTA) + back to listing | Required | standard |

### 2.1 Hero — required
- **Include:** H1 = project name. One plain sentence: what is monitored or
  controlled, where, for whom. Fact strip (`<dl>`): Client (from
  `clientName`), Industry, Site type, Scale (e.g. number of devices, only if
  confirmed), Connectivity (one word), Status.
- **Avoid:** H1 fade (kylezantos-design §1b); a stock photo of "IoT"; the
  listing's graphite spec-sheet look (already `IotProjects`).

### 2.2 The problem on site — required
- **Include:** what was happening before, in physical terms (who checked
  what, how often, what went wrong when they missed it). Quantify only with
  client-confirmed figures.
- **Avoid:** market statistics about the industry (a common padding pattern,
  e.g. Very/PowerX opens with energy-cost stats) — they say nothing about this
  project.

### 2.3 Objectives — required
3–5 bullets, each testable ("alert the supervisor when a reading goes out of
range", "keep recording when the internet drops"). Very's Saunders study did
this well with numbered goals.

### 2.4 System architecture diagram — required
The centrepiece. Layers left→right (top→bottom on mobile):
**Sensors → Device/Controller → Gateway → Network → Cloud → Dashboard/Alerts**.
- Built as inline SVG or HTML (crisp, themeable, light and dark), never a
  raster export with baked-in text.
- Each node labelled with its role in plain words; protocol names on the
  links between nodes.
- A text description directly under it (W3C complex-images pattern; §8).
- **Avoid:** an unreadable vendor diagram (Datoms/Mowal's had no legible
  text), or a decorative "isometric stack" that explains nothing.

### 2.5 Hardware and sensors — required
A real `<table>`: Component · What it does · Model/spec (optional) · Qty
(optional, only if confirmed). Include power (battery / mains / solar) and
enclosure rating if relevant (e.g. IP rating for outdoor or wash-down areas).
- **Avoid:** listing models we cannot confirm; part numbers the client wants
  private.

### 2.6 Connectivity and protocols — required
How data leaves the device and reaches the cloud: radio/network (e.g. Wi-Fi,
LoRaWAN, cellular, Ethernet, RS-485), protocol (e.g. MQTT, Modbus, HTTP),
gateway, and why that choice fits the site (range, walls, power, cost).
One sentence of "why" per choice.

### 2.7 Firmware and edge behaviour — required
What runs on the device: sampling interval, local thresholds, what happens
when the network drops (store and forward), how updates reach devices
(over-the-air, with integrity check and rollback if used). Embitel's FOTA
study and Very's Saunders edge buffering are the best examples of this.

### 2.8 Cloud and dashboard — required
Where data lands, how long it is kept, who sees what, alerts (channel:
SMS/WhatsApp/email; who receives them), reports. One dashboard visual
(real or illustrative, §4).

### 2.9 Deployment and installation — required
Site survey, installation steps, commissioning/calibration, training,
handover. Scale facts only when confirmed: number of sites, devices,
installation time. Research: signal surveys before mounting gateways make
the biggest difference to delivery rates (LoRIS deployment paper).

### 2.10 Reliability and maintenance — required (qualitative allowed)
Measured where possible, each with period: message delivery rate, device
uptime, battery life observed, mean time to repair. If not measured yet,
describe the mechanisms honestly ("devices keep readings locally for up to
X hours" only if X is the configured value) and say measurement is ongoing.
Who maintains it and how faults are noticed.

### 2.11 Security — required
Every IoT competitor page we read skipped or barely touched this; technical
checkers look for it first. Cover, only as far as true: device identity /
authentication, encryption in transit (e.g. TLS), signed or checked firmware
updates, dashboard access control (roles), data location/ownership, network
isolation on site.
- **Avoid:** claiming certifications or standards compliance that were not
  formally obtained.

### 2.12 Results — optional
Verified only (§5). Typical honest metrics: alerts acted on, spoilage or
downtime incidents before vs after (with period), manual rounds removed,
energy/fuel used. Qualitative outcomes the client confirmed are fine.

### 2.13 Client quote — optional
Verbatim, approved, attributed. Max one.

### 2.14 Built with + related links — required
Hardware, firmware, cloud and dashboard tools, each with a plain role.
Links: related service page(s), industry page (when it exists), listing,
contact.

### 2.15 Closing CTA — required
`FinalCTA`, page-specific title. The page's one gradient surface.

---

## 3. IoT-specific must-haves

Decided after research. ★ = missing or thin on most competitor pages.

1. **Problem in physical terms** and testable objectives.
2. **Architecture diagram with a text description.**
3. **Hardware and sensor table**, including power.
4. **Connectivity and protocols**, with the reason for each choice.
5. ★ **Edge behaviour when the network drops** (store and forward).
6. **Firmware update path** (OTA, integrity check, rollback) where used.
7. **Cloud, dashboard and alert routing** (who gets told, how).
8. **Deployment steps and scale** (sites, devices, timeline — confirmed only).
9. ★ **Reliability evidence** with a measurement period (delivery rate,
   uptime, battery life) — academic deployments report these; vendor pages
   almost never do.
10. ★ **Security section** — absent from Very, Embitel (only an image check),
    Codewave, Datoms.
11. **Maintenance and support** after handover.
12. **Status** (pilot / live / completed) — Very's Saunders study honestly
    said "active beta"; do the same.

---

## 4. Showcase modes

### 4.1 Mode A — real media (client allows)
- Photos of installed devices on site (no faces, no client signage unless
  approved), real dashboard screenshots, real alert examples with personal
  data removed.
- Layout: the hero carries one real install photo or dashboard screenshot;
  the architecture diagram follows. Each system section can pair with a real
  photo of that layer (the gateway, the sensor on the asset).

### 4.2 Mode B — confidential or no media
- The **architecture diagram becomes the hero visual** (it is always ours to
  draw and reveals nothing proprietary if kept generic).
- Dashboard shown as a **code-built recreation** with sample series labelled
  as sample; no real readings, site names or asset IDs.
- Hardware shown as generic line icons or a table only — no supplier photos
  passed off as the install.
- Every recreated visual carries a visible **"Illustrative"** chip, plus one
  sentence once on the page: *"Diagrams and screens on this page are
  illustrative; site photos and live data are not shown."*
- **Layout shift:** with no site photos, give the diagram full width and let
  hardware/connectivity/firmware read as a sequence beneath it (each section
  labelled with the diagram layer it belongs to), rather than photo-text
  pairs.

### 4.3 Template preview (no confirmed project) — current state
Required until a real IoT project is supplied:
- `status: "draft"`, not linked from `/case-studies` or anywhere else, not in
  the listing's JSON-LD, `noindex, nofollow`, no structured data.
- A visible **"Template preview"** banner at the top stating that this page
  shows the layout for a future IoT case study and describes no real project.
- Every content field shows a bracketed placeholder naming what goes there
  (e.g. "[Sensors used]"), never plausible-sounding invented content.
  This is a deliberate, scoped exception to vrattiks-standards §3's "no
  bracketed text on the live page" — acceptable only because the page is
  noindex, unlinked, and labelled.

---

## 5. Proof and metrics rules

- **Only real, verified numbers**, each with: value, what it measures, period,
  baseline (for a change), how it was measured, client approval date.
- Device counts, site counts and timelines are facts too — confirm them.
- **No metrics? Qualitative outcomes** the client confirmed, or omit Results.
  Never an empty "Results: —".
- **Never invent** client names, sites, devices, metrics, quotes or photos.
- A configured value (sampling every 5 min, buffer for 24 h) is a design
  fact, not a result — label it as configuration.
- Do not borrow vendor or industry benchmark figures as if they were ours
  (e.g. a LoRaWAN study's delivery rate).
- Pilot results are labelled as pilot results with scale and duration.

### Checklist — collect from the project owner before writing
- [ ] Client name + permission to name (or accepted anonymised descriptor)
- [ ] Industry, site type, city/region as they want it shown
- [ ] Project status (pilot / live / completed) and dates
- [ ] The problem before: what went wrong, how often, who noticed, how
- [ ] Objectives agreed with the client
- [ ] Sensors: what each measures; models (if shareable); quantities
- [ ] Controller/device board, gateway, power source, enclosure rating
- [ ] Connectivity: radio/network, protocol(s), gateway placement, why chosen
- [ ] Firmware: sampling interval, local logic, offline buffering, OTA method
- [ ] Cloud platform, data retention, dashboard features, alert channels and
      recipients
- [ ] Architecture sketch from the engineer (we redraw it)
- [ ] Deployment: survey, install steps, number of sites/devices, install time
- [ ] Reliability data with period (delivery rate, uptime, battery), or "not
      yet measured"
- [ ] Security measures actually implemented
- [ ] Maintenance/support arrangement after handover
- [ ] Photos (site, devices, dashboard) + permission; anything to blur
- [ ] Any measured results with baseline and period
- [ ] Approved client quote, or "none"
- [ ] What must not be shown (locations, asset IDs, supplier names)

---

## 6. Content fields (typed)

*base* fields are shared with the other two guides (see
website-development-case-study.md §6 for their full notes).

| Field | Type | Req. | Notes |
|---|---|---|---|
| `slug`, `category: "iot"`, `status`, `title`, `clientName`, `industry`, `kind`, `summary`, `projectState`, `showcaseMode`, `builtWith`, `services`, `media`, `outcomes`, `testimonial`, `seo`, `updatedOn` | see website guide | *base* | `clientName` is the single source for name everywhere; `"[Client Name]"` + `// TODO` when unknown. `projectState` adds `"pilot"` for IoT |
| `siteContext` | `string` | ✔ | site type and environment |
| `problem` | `string` | ✔ | physical terms |
| `objectives` | `string[]` | ✔ | testable |
| `architecture` | `{ layers: { id: string; label: string; role: string }[]; links: { from: string; to: string; via: string }[]; description: string }` | ✔ | drives the SVG + its text description |
| `hardware` | `{ component: string; role: string; spec?: string; quantity?: number }[]` | ✔ | include power |
| `sensors` | `{ measures: string; role: string; model?: string }[]` | ✔ | |
| `connectivity` | `{ link: string; protocol: string; why: string }[]` | ✔ | per hop |
| `firmware` | `{ summary: string; offlineBehaviour?: string; updates?: string }` | ✔ | |
| `cloud` | `{ platform: string; dataRetention?: string; dashboard: string[]; alerts?: { channel: string; recipient: string }[] }` | ✔ | |
| `deployment` | `{ steps: string[]; sites?: number; devices?: number; duration?: string }` | ✔ | numbers only if confirmed |
| `reliability` | `({ type: "metric"; value: string; label: string; period: string } \| { type: "mechanism"; text: string })[]` | ✔ | mechanism allowed when unmeasured |
| `security` | `string[]` | ✔ | implemented measures only |
| `maintenance` | `string` | – | |

---

## 7. SEO and structured data (vrattiks-seo)

- **Title:** `{title} case study` → `… | Vrattiks Intelligence` via the root
  template; ≤ 35 characters before the template.
- **Description:** ≤ 155 characters — what is monitored, where, for whom
  (from `clientName`). No unverified numbers.
- **Canonical:** `/case-studies/{slug}`; OG `images` passed explicitly
  (memory.md 2026-10-08 shallow-merge note).
- **Headings:** one H1; H2 per §2 section; H3 for rows/items.
- **Structured data (published only):** `BreadcrumbList`; optional `Article`
  with visible facts only. No `Review`/`AggregateRating`, no `Product` markup
  for client hardware.
- **Drafts / template preview:** `robots: { index: false, follow: false }`,
  no JSON-LD, excluded from the listing's `ItemList`, not linked.
- **Placeholder client name:** while `clientName` is `"[Client Name]"`, the
  entry stays noindex and unlinked even after real project facts arrive.

---

## 8. Accessibility and performance for the visuals

- **Architecture diagram** (W3C complex images): inline SVG with
  `role="img"` and a short `aria-label`/`<title>` ("System diagram: sensors
  to dashboard"), wrapped in a `<figure>` whose visible text description (or
  an ordered list of the layers and links) is the long description. Text in
  the SVG uses design tokens and ≥ 4.5:1 contrast in both themes.
- Diagram must reflow: horizontal ≥ 901px, vertical below. Never scale an
  SVG down until its labels are unreadable — switch layout instead. Zero
  horizontal overflow at 320px.
- Hardware/connectivity as real `<table>` with `<th scope>`; on phones,
  stack rows (each cell labelled) rather than horizontal scroll.
- Photos via `next/image`, sized frames, `priority` only on the hero image
  if it is the LCP element. Alt text names what is shown and where, using
  `clientName` when the site is named.
- Recreated dashboards are decorative (`aria-hidden`) with a visible caption
  saying what they represent.
- Motion: one reveal idea for this page (e.g. diagram links draw once
  left→right, sections fade in), `once: true`, nothing loops — no "data
  flowing" animation on a loop (kylezantos-design §1b). Reduced motion shows
  the finished diagram.

---

## 9. Layout patterns already used on the site (don't repeat)

Same audit as website-development-case-study.md §9. Especially avoid the
listing's **graphite spec sheet with crop marks** (`IotProjects`), the
**graphite numbered steps** (`ServiceSteps`) and the **pinned scroll
stepper** (`Process`) — an IoT page is tempted toward all three.

**New patterns this page type can own:** a full-width layered architecture
diagram as the hero visual; system sections tagged with the diagram layer
they belong to; a hardware/connectivity data table.

---

## 10. Voice

Plain story, precise system. "Supervisors get a WhatsApp alert when a
freezer warms up" in the story; "MQTT over cellular, TLS" lives in the
connectivity table with its plain role. No hype ("smart", "revolutionary",
"Industry 4.0" as decoration).

---

## 11. Competitor and reference table

Summarised in our own words; nothing copied.

| Company (region) | Page studied | Structure | How outcomes are shown | Strong | Weak |
|---|---|---|---|---|---|
| Very (US) | Saunders remote monitoring | Client card (services, 12-week timeline, stack) → challenge → numbered goals → solution → architecture → hardware/software/cloud lists → deployment steps → impact | Qualitative | Concrete edge→cloud architecture; offline buffering; honest "beta" status | No numbers, no security, diagram missing in capture |
| Very (US) | PowerX smart home | Client card → market intro → client + products → challenge → 3-phase plan → results → testimonial | Mostly qualitative | Phased narrative; full stack covered | Market stats as padding; no security; unquantified |
| Embitel (India) | FOTA for battery monitoring | Customer (anonymised OEM) → challenge → solution → FOTA workflow + safeguards → impact → tools | Qualitative bullets | Excellent update-safety detail (CRC, rollback, retries); anonymised well | Diagram unexplained; security thin; no metrics |
| Datoms (India) | Mowal fuel monitoring | Client → problems → platforms → deployment scale → results | Headline % and scale numbers | Real scale (customers, assets, onboarding time) | Hardware/connectivity missing; title vs body mismatch |
| Codewave (India) | Siemens EXPO sensing | Outcomes table → challenge → solution → stack table → personas → disclaimer | KPI table, labelled "representative" | Tables scan well; honest disclaimer | No baselines; no diagram; sensors only by type |
| Softeq (US/global) | Smart bassinet and wearables | Client → full-stack scope (firmware, app, back end) | Awards cited | Shows firmware + app + cloud ownership | Outcomes are awards, not operational results |
| Intellias (UA/global) | Industrial IoT accelerator | Platform components → OTA with rollback → access control | Team size and period | Names device agent, registry, OTA, RBAC | Platform story more than a client result |
| eInfochips (India) | Smart-home edge gateway | Hardware + firmware + cloud enablement | — (listing blocked) | End-to-end scope | Could not verify structure (403) |
| Stellapps, TagBox (India) | Press profiles | Founder story, rural deployment challenges | Narrative | Honest about field deployment and support pain | Press, not first-party case studies |
| Southampton / LoRIS (academic) | LoRaWAN deployments | Method → site survey → delivery rate, latency, SF use | Measured, with period | Shows what reliability evidence looks like | Not marketing pages; reference only |

**Takeaways used in this guide:** security, offline behaviour and measured
reliability are the gaps; a diagram is only proof when its text is readable
and described; label pilot/beta status honestly.

---

## Sources

Competitor and reference pages:
- https://www.verytechnology.com/case-studies
- https://www.verytechnology.com/case-studies/saunders
- https://www.verytechnology.com/case-studies/how-powerx-transformed-their-smart-home-product-line-for-scalability
- https://embitel.com/iot-casestudies/integration-of-fota-update-with-industrial-battery-monitoring-system
- https://datoms.io/case-studies
- https://datoms.io/case-studies/mowal-iot-operational-solutions-for-fuel-monitoring/
- https://codewave.com/portfolio/siemens-dubai-expo-smart-sensing-tech/
- https://www.casestudies.com/company/softeq (via search summary)
- https://intellias.com/industrial-iot-accelerator-to-speed-up-the-deployment-of-connected-solutions/ (via search summary)
- https://www.einfochips.com/services_category/design-to-manufacturing/page/2/ (via search summary)
- https://yourstory.com/2017/08/stellapps-indias-white-revolution-cloud (via search summary)
- https://yourstory.com/2017/08/tagbox-turning-up-heat-in-cold-chain-space/ (via search summary)
- https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7038353/ (via search summary)
- https://arxiv.org/pdf/2608.17467 (via search summary)

Best practice, confidentiality, standards:
- https://www.fueler.io/blog/how-to-write-case-study-client-work-under-nda
- https://ecreativeworks.com/blog/can-we-write-a-case-study-when-our-customer-has-an-nda
- https://resources.averi.ai/guides/how-to-write-a-case-study
- https://hawkemedia.com/insights/case-studies-b2b/
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://webmasters.googleblog.com/2019/09/making-review-rich-results-more-helpful.html
- https://www.w3.org/WAI/tutorials/images/complex

Project sources: `docs/index.html`, `CLAUDE.md`, `memory.md`,
`app/components/IotProjects.tsx`, `app/lib/case-studies.ts`,
`.claude/skills/vrattiks-*`.
