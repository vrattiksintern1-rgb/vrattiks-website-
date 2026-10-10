import { services } from "./content";

/* Every project on /case-studies and /case-studies/[slug] comes from this
   file — edit here, not in the components. Field lists follow the guides in
   docs/case-study-guides/ (§6 of each).

   CONTENT INTEGRITY (vrattiks-standards §3). Entries hold ONLY what the user
   stated: USER-PROVIDED 2026-10-08 (the four listing entries) and 2026-10-10
   (the detail facts for Auroma Holiday Villas and the AI Sales Assistant).
   Each `summary` / `lede` restates those facts in a sentence and adds nothing
   new. Every other field is deliberately empty — no challenge, solution,
   client quote, screenshot or result has been confirmed. Never fill a field
   by guessing; empty fields simply don't render, and an empty field hides
   its whole section on the detail page.

   `results` stays empty until the client has measured an outcome. Never lift
   anything here into JSON-LD beyond the project name and client. */

export type CaseStudyCategory = "custom" | "iot" | "website";

/* The literal placeholder for a client name we haven't been given. While an
   entry's `clientName` equals this, its detail page is noindex and is NOT
   linked from /case-studies (decision 2026-10-10, see memory.md), and the
   listing hides the Client row rather than show brackets. */
export const CLIENT_NAME_PLACEHOLDER = "[Client Name]";

/* A measured result. `period` and `source` are required so a number can
   never arrive without what it measures, over when, and who measured it
   (CLAUDE.md Design Taste, ref 1; guides §5). */
export type Metric = { value: string; label: string; period: string; source: string };

export type CaseStudyImage = { src: string; width: number; height: number; alt: string };

/* A real screenshot or photo for a detail page, in
   /public/images/case-studies/{slug}/. `illustrative: false` only for real
   media the client approved. */
export type CaseStudyMedia = CaseStudyImage & {
  caption?: string;
  device?: "desktop" | "mobile";
  illustrative: boolean;
};

export type Tool = {
  name: string;
  /* What it does, in plain words (docs/index.html §5 "clear over technical") */
  role?: string;
  /* Custom projects: tools the client already uses vs. what runs underneath */
  group?: "connected" | "internal";
};

export type Testimonial = { quote: string; name: string; role: string; approvedOn: string };

/* Shared by all three detail layouts. Strings in `lede` and
   `seo.description` may contain `{client}`, which is replaced with
   `clientName` at render time — so the name lives in exactly one field. */
type DetailBase = {
  /* drives the layout: "illustrative" = code-built recreations with labels */
  showcaseMode: "real" | "illustrative";
  lede?: string;
  projectState?: "live" | "in-progress" | "pilot" | "prototype" | "completed";
  /* the human sentence shown in the hero, e.g. "Final setup in progress" */
  statusNote?: string;
  location?: string;
  /* Detail-page industry. Kept separate from the listing's `industry` when
     adding it there would change an existing listing card. */
  industry?: { name: string; slug?: string };
  stack?: Tool[];
  /* client-confirmed qualitative outcomes; measured ones go in `results` */
  outcomes?: string[];
  testimonial?: Testimonial;
  media?: CaseStudyMedia[];
  seo?: { title?: string; description?: string };
  /* ISO date; only when real — feeds Article dateModified */
  updatedOn?: string;
};

/* Where a lead-path step sits on the website layout's annotated screen */
export type LeadAnchor = "page" | "form" | "validation" | "download" | "email";

export type WebsiteDetail = DetailBase & {
  projectType?: string;
  goals?: string[];
  /* `page` names the page made for that audience, e.g. "Landing page A" */
  audiences?: { name: string; need: string; page?: string }[];
  designApproach?: { decision: string; why: string }[];
  keyPages?: { name: string; purpose: string }[];
  features?: { name: string; detail: string }[];
  leadPath?: { step: string; detail?: string; on?: LeadAnchor }[];
  qualityChecks?: {
    area: "responsive" | "performance" | "seo" | "accessibility";
    result: string;
    tool: string;
    page: string;
    measuredOn: string;
  }[];
  beforeAfter?: { before: CaseStudyMedia; after: CaseStudyMedia };
};

export type CustomDetail = DetailBase & {
  channel?: string;
  problem?: string;
  objective?: string[];
  approach?: { decision: string; why: string }[];
  /* trigger → steps → output. Empty until the real flow is confirmed. */
  workflow?: { step: string; tool?: string; detail?: string }[];
  aiRole?: { does: string[]; doesNot?: string[]; handoff?: string };
  dataHandling?: string[];
  /* always illustrative, never the client's real prompt or config */
  sample?: { caption: string; code: string };
  nextSteps?: string;
};

export type IotDetail = DetailBase & {
  siteContext?: string;
  problem?: string;
  objectives?: string[];
  architecture?: {
    layers: { id: string; label: string; role: string }[];
    /* `via` is the protocol/link between layer `from` and the next one */
    links: { from: string; via: string }[];
    description: string;
  };
  hardware?: { component: string; role: string; spec?: string; quantity?: string }[];
  sensors?: { measures: string; role: string; model?: string }[];
  connectivity?: { link: string; protocol: string; why: string }[];
  firmware?: { summary: string; offlineBehaviour?: string; updates?: string };
  cloud?: {
    platform: string;
    dataRetention?: string;
    dashboard: string[];
    alerts?: { channel: string; recipient: string }[];
  };
  deployment?: { steps: string[]; scale?: string; duration?: string };
  reliability?: ({ type: "metric"; value: string; label: string; period: string } | { type: "mechanism"; text: string })[];
  security?: string[];
  maintenance?: string;
};

/* The pill shown on every overview card. Never "live" or "launched"
   (vrattiks-standards §3) — those need the client's confirmation. */
export type StatusPill = "Client project" | "Internal tool" | "Final setup in progress" | "Sample (illustrative)";

/* Copy for the /case-studies overview cards (added 2026-10-10). Written ONLY
   from user-provided facts. The ordered lists (`steps`, `landingPages`,
   `formFields`) are facts too — overview stat tiles COUNT them, so every
   number on the page comes from the data, never from a typed figure. */
export type OverviewCopy = {
  summary: string;
  features: string[];
  tech: string[];
  steps?: string[];
  landingPages?: { label: string; audience: string }[];
  formFields?: { name: string; required: boolean; rule?: string }[];
  /* Which code-built, labelled illustration the card shows until real
     screenshots exist (components in CaseStudyVisuals.tsx). */
  visual?: "lead-form" | "try-on" | "tool-hub" | "pipeline" | "iot-flow";
};

type CaseStudyBase = {
  /* Also the anchor id on the listing (/case-studies#{slug}) and the detail
     route (/case-studies/{slug}) */
  slug: string;
  /* "draft" = never on the listing, noindex, "Template preview" label */
  status?: "published" | "draft";
  title: string;
  /* Small tracked label above the title, e.g. "Website" or "Client project" */
  kind: string;
  /* One sentence on what it is. Facts only, no outcome claims. */
  summary: string;
  /* The ONE place the client's name lives: listing, detail H1 area,
     breadcrumb, metadata and alt text all read it. */
  clientName?: string;
  /* Generic label for the overview when no confirmed client name exists
     ("Real estate client", "Internal"). Kept apart from `clientName` on
     purpose: `clientName` gates the detail pages (isPublishable) and shows
     "[Client Name]" there until the real name arrives — putting a generic
     label in it would silently publish those pages. */
  clientLabel?: string;
  /* A SAMPLE entry — never a real project. Rendered only outside production
     (see `showSamples`), never counted, never in JSON-LD, no detail page. */
  isSample?: boolean;
  statusPill?: StatusPill;
  overview?: OverviewCopy;
  /* `slug` links to /industries/{slug} — only set it when that page exists */
  industry?: { name: string; slug?: string };
  challenge?: string;
  solution?: string;
  /* Tools and platforms used (the "Implementation" field in
     vrattiks-architecture §2). Shown on the listing; detail pages use
     `detail.stack`, which adds each tool's role. */
  builtWith?: string[];
  /* Spec-sheet rows. Used by IoT entries, e.g. Hardware, Connectivity. */
  specs?: { label: string; value: string }[];
  /* Service slugs from content.ts — become "Related service" links */
  services?: string[];
  /* Measured outcomes only (see Metric) */
  results?: Metric[];
  /* Live address. Shown in the browser frame and as a link — only with the
     client's OK. */
  url?: string;
  /* Screenshot in /public/images/case-studies/. Without one, the section's
     designed placeholder is shown instead. */
  image?: CaseStudyImage;
};

/* Category decides which detail layout renders; `detail` decides whether a
   detail page exists at all. */
export type CaseStudy =
  | (CaseStudyBase & { category: "website"; detail?: WebsiteDetail })
  | (CaseStudyBase & { category: "custom"; detail?: CustomDetail })
  | (CaseStudyBase & { category: "iot"; detail?: IotDetail });

/* The three sections, in page order. `id` is the section's anchor and the
   sticky chapter bar's target. Headings and descriptions are generated copy
   (vrattiks-standards §3 bucket 4): no figures, clients or results. */
export const caseStudySections: {
  category: CaseStudyCategory;
  id: string;
  index: string;
  label: string;
  shortLabel: string;
  title: string;
  description: string;
}[] = [
  {
    category: "custom",
    id: "custom-projects",
    index: "01",
    label: "Custom Projects",
    shortLabel: "Custom",
    title: "Agents and automations, built to order",
    description:
      "AI agents and workflow automations, each made for one specific job.",
  },
  {
    category: "iot",
    id: "iot-projects",
    index: "02",
    label: "IoT Projects",
    shortLabel: "IoT",
    title: "Devices that report back",
    description:
      "Connected hardware, from the sensor on site to the screen your team reads.",
  },
  {
    category: "website",
    id: "website-projects",
    index: "03",
    label: "Website Projects",
    shortLabel: "Websites",
    title: "Websites and web apps",
    description: "Business websites and apps that run in the browser.",
  },
];

export const caseStudies: CaseStudy[] = [
  // ── Custom Projects ───────────────────────────────────────────────────
  {
    slug: "ai-sales-assistant-whatsapp",
    category: "custom",
    title: "AI Sales Assistant on WhatsApp",
    kind: "Custom automation",
    summary: "An AI sales assistant that works inside WhatsApp.",
    // TODO(client name): not provided yet — replace this ONE value and the
    // whole detail page updates. While it is the placeholder, the page stays
    // noindex and unlinked.
    clientName: CLIENT_NAME_PLACEHOLDER,
    clientLabel: "Real estate client",
    statusPill: "Final setup in progress",
    /* No results claims — the setup isn't final (user, 2026-10-10). */
    overview: {
      summary: "An AI sales assistant that works inside WhatsApp, built as an n8n workflow for a real estate client.",
      features: ["Works inside WhatsApp", "Built as an n8n workflow", "Connected to Google Sheets", "Uses a Groq language model"],
      tech: ["n8n", "Google Sheets", "Groq LLM", "LiveKit"],
      visual: "tool-hub",
    },
    builtWith: ["n8n", "Groq", "LiveKit"],
    // Mapping to a service is ours, not user-stated — confirm.
    services: ["whatsapp-automation"],
    /* USER-PROVIDED 2026-10-10: n8n workflow for a real estate client, using
       Google Sheets, a Groq LLM and LiveKit; final setup still in progress.
       NOT live, no results — do not add either until confirmed. The step-by-
       step flow, problem, objective and the AI's exact role were not given,
       so `workflow`, `problem`, `objective`, `aiRole` stay empty. */
    detail: {
      showcaseMode: "illustrative",
      lede: "An AI sales assistant on WhatsApp for {client}, a real estate business, built as an n8n workflow.",
      projectState: "in-progress",
      statusNote: "Final setup in progress",
      channel: "WhatsApp",
      // Detail-only so the existing listing card doesn't gain a new link.
      industry: { name: "Real Estate", slug: "real-estate" },
      /* Roles describe what each tool IS, not a flow we haven't been told. */
      stack: [
        { name: "WhatsApp", role: "The channel the assistant works in", group: "connected" },
        { name: "Google Sheets", role: "Spreadsheet the workflow uses", group: "connected" },
        { name: "n8n", role: "Workflow automation tool the assistant is built in", group: "internal" },
        { name: "Groq", role: "Hosted large language model (LLM) service", group: "internal" },
        { name: "LiveKit", role: "Real-time voice and video platform", group: "internal" },
      ],
      sample: {
        caption: "Sample code: the project's parts written out as a config object",
        code: `// Illustrative sample, not the client's configuration
const salesAssistant = {
  channel: "WhatsApp",
  workflow: "n8n",
  languageModel: "Groq",
  records: "Google Sheets",
  realtime: "LiveKit",
  status: "Final setup in progress",
};`,
      },
      seo: {
        title: "AI Sales Assistant case study",
        description:
          "An AI sales assistant on WhatsApp for {client}, built as an n8n workflow with Google Sheets, a Groq LLM and LiveKit. Final setup in progress.",
      },
    },
  },
  {
    slug: "ai-lead-to-landing-page-generator",
    category: "custom",
    title: "AI Lead-to-Landing-Page Generator",
    kind: "Custom automation",
    summary: "An automated n8n pipeline that goes from a lead to a landing page.",
    clientLabel: "Internal",
    statusPill: "Internal tool",
    /* USER-PROVIDED 2026-10-10: internal tool; leads from a CSV → AI-written
       personalised landing pages → deployed to Netlify → cold outreach
       emails; Groq LLM. */
    overview: {
      summary: "Our own n8n pipeline: it reads business leads from a CSV, writes a personalised landing page for each one with AI, puts it online and emails the lead.",
      features: ["Reads leads from a CSV", "A personalised page per lead", "Deploys to Netlify", "Sends cold outreach emails"],
      tech: ["n8n", "Groq LLM", "Netlify"],
      visual: "pipeline",
      steps: [
        "Read the business leads from a CSV",
        "Write a personalised landing page with AI",
        "Deploy the page to Netlify",
        "Send a cold outreach email",
      ],
    },
    builtWith: ["n8n"],
    // Mapping to a service is ours, not user-stated — confirm.
    services: ["workflow-automation"],
  },

  // ── IoT Projects ──────────────────────────────────────────────────────
  // No confirmed IoT project exists. The ONE entry below is a DRAFT layout
  // preview: `status: "draft"` keeps it off the listing (the IoT section still
  // shows its "in development" sheet), out of JSON-LD, noindex, and labelled
  // "Template preview" on the page. Every value is a bracketed field label,
  // not content — replace them all from the checklist in
  // docs/case-study-guides/iot-projects-case-study.md §5, then set
  // `status: "published"`.
  {
    slug: "iot-case-study-template",
    status: "draft",
    category: "iot",
    title: "[IoT project name]",
    kind: "IoT project",
    summary: "[One sentence: what is monitored or controlled, where, and for whom.]",
    // TODO(client name): no IoT client exists yet.
    clientName: CLIENT_NAME_PLACEHOLDER,
    detail: {
      showcaseMode: "illustrative",
      lede: "[One sentence: what the system monitors or controls, on which site, for {client}.]",
      statusNote: "[Pilot / Live / Completed]",
      location: "[City or region]",
      industry: { name: "[Industry]" },
      siteContext: "[Site type and environment: indoor, outdoor, cold room, moving vehicle…]",
      problem:
        "[What went wrong before, in physical terms: who checked what, how often, and what happened when it was missed.]",
      objectives: [
        "[Testable objective, e.g. alert a named role when a reading goes out of range]",
        "[Testable objective, e.g. keep recording when the internet drops]",
        "[Testable objective]",
      ],
      architecture: {
        layers: [
          { id: "sensors", label: "Sensors", role: "[What is measured]" },
          { id: "device", label: "Device", role: "[Controller board]" },
          { id: "gateway", label: "Gateway", role: "[How devices reach the network]" },
          { id: "cloud", label: "Cloud", role: "[Where data is stored]" },
          { id: "dashboard", label: "Dashboard & alerts", role: "[Who sees what]" },
        ],
        links: [
          { from: "sensors", via: "[wired / analog / I²C…]" },
          { from: "device", via: "[radio: Wi-Fi / LoRaWAN / BLE…]" },
          { from: "gateway", via: "[network + protocol: cellular, MQTT…]" },
          { from: "cloud", via: "[web / SMS / WhatsApp]" },
        ],
        description:
          "[Text description of the diagram: each layer, what it does, and how data moves from one to the next.]",
      },
      hardware: [
        { component: "[Controller / device board]", role: "[What it does]", spec: "[Model, if shareable]", quantity: "[Qty]" },
        { component: "[Gateway]", role: "[What it does]", spec: "[Model]", quantity: "[Qty]" },
        { component: "[Power source]", role: "[Battery / mains / solar]" },
        { component: "[Enclosure]", role: "[Rating, e.g. for outdoor use]" },
      ],
      sensors: [
        { measures: "[Quantity measured]", role: "[Why it matters on this site]", model: "[Model]" },
        { measures: "[Quantity measured]", role: "[Why it matters]" },
      ],
      connectivity: [
        { link: "[Device → gateway]", protocol: "[Protocol]", why: "[Why this fits the site]" },
        { link: "[Gateway → cloud]", protocol: "[Protocol]", why: "[Why]" },
      ],
      firmware: {
        summary: "[What runs on the device: sampling interval, local thresholds.]",
        offlineBehaviour: "[What happens when the network drops.]",
        updates: "[How updates reach devices, and how a failed update is handled.]",
      },
      cloud: {
        platform: "[Cloud platform]",
        dataRetention: "[How long data is kept]",
        dashboard: ["[Dashboard view]", "[Report]"],
        alerts: [{ channel: "[SMS / WhatsApp / email]", recipient: "[Role that receives it]" }],
      },
      deployment: {
        steps: ["[Site survey]", "[Installation]", "[Commissioning and calibration]", "[Training and handover]"],
        scale: "[Sites and devices — only if confirmed]",
        duration: "[Install time — only if confirmed]",
      },
      reliability: [
        { type: "mechanism", text: "[How faults are noticed and handled]" },
        { type: "metric", value: "[Value]", label: "[What it measures, e.g. message delivery rate]", period: "[Over what period]" },
      ],
      security: [
        "[Device identity / authentication]",
        "[Encryption in transit]",
        "[How firmware updates are checked]",
        "[Dashboard access control]",
      ],
      maintenance: "[Who maintains the system after handover, and how.]",
      seo: { title: "IoT case study template", description: "Template preview for a future IoT case study." },
    },
  },

  /* SAMPLE — NOT A REAL PROJECT (user request 2026-10-10, so the IoT
     section can be reviewed with a card in it). Generic building blocks
     only: no client, place, product names, numbers, dates or results.
     `isSample` keeps it out of production builds, counts and JSON-LD.
     Delete this entry once a real IoT project exists. */
  {
    slug: "sample-smart-factory-monitoring",
    category: "iot",
    isSample: true,
    title: "Smart Factory Monitoring System",
    kind: "IoT project",
    summary: "Sample entry showing how an IoT project will appear.",
    clientLabel: "Sample (not a real client)",
    statusPill: "Sample (illustrative)",
    overview: {
      summary: "A sample of how an IoT project will appear: sensors on the machines send readings through a microcontroller to a cloud dashboard that raises alerts.",
      features: ["Sensors on each machine", "A microcontroller reads them", "Readings sent to the cloud", "Dashboard with alerts"],
      tech: ["Sensors", "Microcontroller", "Wireless connectivity", "Cloud backend", "Web dashboard"],
      steps: ["Sensors", "Microcontroller", "Connectivity", "Cloud backend", "Dashboard", "Alerts"],
      visual: "iot-flow",
    },
  },

  // ── Website Projects ──────────────────────────────────────────────────
  {
    slug: "auroma-holiday-villas",
    category: "website",
    title: "Auroma Holiday Villas",
    kind: "Website",
    summary: "A real estate website for Auroma Holiday Villas.",
    clientName: "Auroma Holiday Villas",
    statusPill: "Client project",
    /* USER-PROVIDED 2026-10-10 (overview only — the detail page below is
       unchanged): LP-A second-home buyers, LP-B rental investors; the form
       fields below, WhatsApp exactly 10 digits; "Download Brochure" after a
       valid submit; lead emails to the client via Resend. */
    overview: {
      summary: "A Next.js website for a villa project near Auroville, Pondicherry, with one landing page for second-home buyers and one for rental investors.",
      features: ["Two landing page variants", "Lead form with a 10-digit WhatsApp check", "Brochure download after a valid form", "Lead emails to the client"],
      tech: ["Next.js", "Resend"],
      visual: "lead-form",
      landingPages: [
        { label: "LP-A", audience: "Second-home buyers" },
        { label: "LP-B", audience: "Rental investors" },
      ],
      formFields: [
        { name: "Name", required: true },
        { name: "WhatsApp number", required: true, rule: "Exactly 10 digits" },
        { name: "City", required: true },
        { name: "Investment range", required: true },
        { name: "Message", required: false },
      ],
    },
    industry: { name: "Real Estate", slug: "real-estate" },
    services: ["website-development"],
    /* USER-PROVIDED 2026-10-10: villa project near Auroville, Pondicherry;
       Next.js; two landing-page variants (second-home buyers, rental
       investors); brochure lead form with validation and a downloadable
       brochure; lead notification emails to the client. No live URL, link
       permission, screenshots or measured numbers yet — so `url`, `media`,
       `qualityChecks` and `results` stay empty and the visuals are labelled
       recreations. */
    detail: {
      showcaseMode: "illustrative",
      lede: "A Next.js website for {client}, a villa project near Auroville, Pondicherry, with a separate landing page for each kind of buyer.",
      location: "Near Auroville, Pondicherry",
      projectType: "Website with two landing pages",
      audiences: [
        { name: "Second-home buyers", page: "Landing page A", need: "Written for people looking for a second home near Auroville." },
        { name: "Rental investors", page: "Landing page B", need: "Written for people buying a villa to rent out." },
      ],
      leadPath: [
        { step: "The visitor asks for the brochure", detail: "Each landing page has a brochure request form.", on: "form" },
        { step: "The form checks the details", detail: "Fields are validated before the form can be sent.", on: "validation" },
        { step: "The brochure downloads", detail: "The visitor gets the brochure as a file to keep.", on: "download" },
        { step: "The client is told", detail: "A lead notification email goes to the client.", on: "email" },
      ],
      stack: [{ name: "Next.js", role: "The framework the website is built on" }],
      seo: {
        title: "Auroma Holiday Villas case study",
        description:
          "How Vrattiks built the {client} website: two landing pages, for second-home buyers and rental investors, with a brochure lead form.",
      },
    },
  },
  {
    slug: "jewellery-virtual-try-on",
    category: "website",
    title: "Jewellery Virtual Try-On",
    kind: "Client project · Web app",
    summary: "A web app for trying on jewellery virtually.",
    // Client name not provided — left empty rather than guessed.
    clientLabel: "Jewellery client",
    statusPill: "Client project",
    /* USER-PROVIDED 2026-10-10: home page, product page, try-on flow (upload
       a photo, select a colour). No tech stack was given — `tech` is empty. */
    overview: {
      summary: "A virtual try-on web app: visitors upload a photo and pick a colour to try the jewellery on.",
      features: ["Home page", "Product page", "Photo upload for try-on", "Colour selection"],
      tech: [],
      steps: ["Upload a photo", "Select a colour"],
      visual: "try-on",
    },
    industry: { name: "Jewellery" },
    // Mapping to a service is ours, not user-stated — confirm.
    services: ["website-development"],
  },
];

/* Sample entries render only in development, or when a build opts in with
   NEXT_PUBLIC_SHOW_SAMPLES=true. A normal production build never shows them. */
export const showSamples =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_SAMPLES === "true";

/* REAL projects on the listing: no drafts, no samples. Every count, index
   row and JSON-LD item comes from this list. */
export const listedCaseStudies = caseStudies.filter((s) => s.status !== "draft" && !s.isSample);

/* Samples to render for a category — always empty in production. */
export function samplesIn(category: CaseStudyCategory) {
  return showSamples ? caseStudies.filter((s) => s.isSample && s.category === category) : [];
}

/* The client line on an overview card: the real name when confirmed,
   otherwise the generic label. Never "[Client Name]". */
export function clientLabelOf(study: CaseStudy) {
  return hasConfirmedClient(study) ? study.clientName! : (study.clientLabel ?? "");
}

export function caseStudiesIn(category: CaseStudyCategory) {
  return listedCaseStudies.filter((study) => study.category === category);
}

/* Entries that have a detail page (published or not). */
export const detailCaseStudies = caseStudies.filter((s) => s.detail);

export function getCaseStudy(slug: string) {
  return detailCaseStudies.find((s) => s.slug === slug);
}

export function hasConfirmedClient(study: CaseStudy) {
  return Boolean(study.clientName) && study.clientName !== CLIENT_NAME_PLACEHOLDER;
}

/* Linked from the listing and indexed only when ALL hold: not a draft, has
   a detail page, and the client name is real (decision 2026-10-10). */
export function isPublishable(study: CaseStudy) {
  return study.status !== "draft" && Boolean(study.detail) && hasConfirmedClient(study);
}

/* The display name. Falls back to the placeholder so a missing name is
   visible in review rather than silently blank. */
export function clientNameOf(study: CaseStudy) {
  return study.clientName ?? CLIENT_NAME_PLACEHOLDER;
}

/* Fills `{client}` in detail strings from the one clientName field. */
export function withClient(text: string, study: CaseStudy) {
  return text.replaceAll("{client}", clientNameOf(study));
}

/* Industry + service links for one project (vrattiks-architecture §5: a case
   study links to the service and industry involved). Names come from
   content.ts, so a renamed service updates here too. `industry` lets the
   detail page pass its detail-only industry. */
export function relatedLinks(study: CaseStudy, industry = study.industry) {
  const links: { label: string; name: string; href: string }[] = [];
  if (industry?.slug) {
    links.push({
      label: "Industry",
      name: industry.name,
      href: `/industries/${industry.slug}`,
    });
  }
  for (const slug of study.services ?? []) {
    const service = services.find((s) => s.slug === slug);
    if (service) {
      links.push({ label: "Service", name: service.name, href: `/services/${slug}` });
    }
  }
  return links;
}

/* "2 projects" / "1 project" / "In development" — the chapter bar's meta line */
export function countLabel(category: CaseStudyCategory) {
  const n = caseStudiesIn(category).length;
  if (n === 0) return "In development";
  return `${n} ${n === 1 ? "project" : "projects"}`;
}

/* One study narrowed to its category — each detail layout takes its own. */
export type WebsiteStudy = Extract<CaseStudy, { category: "website" }>;
export type CustomStudy = Extract<CaseStudy, { category: "custom" }>;
export type IotStudy = Extract<CaseStudy, { category: "iot" }>;

/* Breadcrumb middle step: the listing section this category belongs to. */
export function sectionFor(category: CaseStudyCategory) {
  return caseStudySections.find((s) => s.category === category)!;
}

/* Order of the category sections on the /case-studies overview (website
   first — it holds the featured project). Index numbers follow this order. */
export const overviewOrder: CaseStudyCategory[] = ["website", "custom", "iot"];

/* Countable facts for the overview stat tiles — derived, never typed. */
export function countByStatus(pill: StatusPill) {
  return listedCaseStudies.filter((s) => s.statusPill === pill).length;
}
