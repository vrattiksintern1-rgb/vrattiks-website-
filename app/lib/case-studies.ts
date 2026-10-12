import { services } from "./content";

/* Every project on /case-studies and /case-studies/[slug] comes from this
   file — edit here, not in the components. Section order on the detail
   pages follows the user brief of 2026-10-12 and the guides in
   docs/case-study-guides/.

   CONTENT INTEGRITY (vrattiks-standards §3). Three projects, USER-PROVIDED
   2026-10-12. Text that restates the user's verified facts is written with
   `fact()` (or a plain item). Anything that elaborates beyond those facts is
   PLACEHOLDER: written with `draft()`, or an item carrying `...DRAFT`. The
   user asked for realistic placeholder copy so the pages can be reviewed;
   it must be replaced with the real details later.

   Placeholder copy never contains numbers, metrics, results, dates,
   locations, quantities, quotes or biography, and never calls a project
   live, launched or deployed (user brief 2026-10-12).

   SAFEGUARDS ARE COMPUTED, NOT TYPED: a page that renders any placeholder
   block is noindex/nofollow and carries no JSON-LD (visible Draft chip removed at the user's request, 2026-10-12). Turn the
   last `draft()` on a page into `fact()` (or drop its `...DRAFT`) and both
   lift by themselves. */

export type CaseStudyCategory = "custom" | "iot" | "website";

/* ── Placeholder marking ─────────────────────────────────────────────── */

/* `placeholder: true` marks ONE block as not yet verified. */
export type Draftable = { placeholder?: true };
export type Copy = { text: string } & Draftable;

export const fact = (text: string): Copy => ({ text });
export const draft = (text: string): Copy => ({ text, placeholder: true });
/* Spread into an item to mark it placeholder: `{ title, text, ...DRAFT }` */
const DRAFT = { placeholder: true } as const;

/* Title + sentence: approach decisions, key features */
export type Point = { title: string; text: string; layer?: string } & Draftable;
/* A numbered solution step. `note` is extra detail shown only on the detail
   page, marked on its own — so a verified step can carry a placeholder note
   without the overview card (which shows titles only) becoming a draft. */
export type Step = { title: string; text: string; tool?: string; note?: Copy } & Draftable;
/* `group` = the heading the tool is listed under on the detail page
   (IoT: the diagram layer id it belongs to) */
export type Tool = { name: string; role: string; group?: string } & Draftable;
export type KeyFact = { label: string; value: string } & Draftable;

/* A real screenshot or photo, in /public/case-studies/{slug}/. Shown with
   next/image. Only add images the client has approved. */
export type CaseStudyMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  device?: "desktop" | "mobile";
};

/* The pill on every card and hero. Never "live" or "launched"
   (vrattiks-standards §3). */
export type StatusLabel = "Client project" | "Internal project";

/* Where a lead-path step sits on the website layout's annotated screen */
export type LeadAnchor = "page" | "form" | "validation" | "download" | "email";

type CaseStudyBase = {
  /* Anchor on the listing (/case-studies#{slug}) and the detail route */
  slug: string;
  title: string;
  /* Small tracked label above the title */
  kind: string;
  /* The ONE place the client's name lives: cards, hero, breadcrumb,
     metadata and alt text all read it. */
  clientName: string;
  clientRole: "Client";
  statusLabel: StatusLabel;
  /* Must agree with the blocks below — checked when this module loads
     (see the bottom of the file), so it can never drift. */
  contentStatus: "verified" | "placeholder";
  /* 1–2 lines: overview cards and the detail hero */
  summary: Copy;
  /* Chips on the overview card */
  tags: Copy[];
  /* Opener fact strip; the layouts add Client, Category and Status */
  keyFacts: KeyFact[];
  /* Detail "Overview": the project at a glance */
  overview: Copy;
  /* Detail "The full story": 4–5 paragraphs */
  description: Copy[];
  brief: Copy[];
  problem: Copy;
  objectives: Copy[];
  approach: Point[];
  solution: Step[];
  features: Point[];
  stack: Tool[];
  /* REAL outcomes only — plain strings on purpose, so a placeholder can't
     be typed in. Empty = the Outcomes section is not rendered. */
  outcomes: string[];
  visuals: { media: CaseStudyMedia[] };
  aboutClient: Copy[];
  /* `slug` links to /industries/{slug} — only when that page exists */
  industry?: { name: string; slug?: string };
  /* Service slugs from content.ts → "Related services" links */
  services: string[];
  cta: { title: string; description: string };
  /* Verified facts only, so metadata never carries placeholder claims */
  seo: { title: string; description: string };
};

/* CLIENT-PROVIDED material, taken from the client's own marketing brochure
   (vrattiks-standards §3, bucket 2 — supplied by the user with the brochure,
   2026-10-12). It describes the CLIENT'S project in the client's terms and is
   never our work or our result: every block that renders it carries a
   visible source note, and the architect items each carry `attribution`.
   Summaries are reworded, never brochure sentences copied. Deliberately
   excluded (user brief 2026-10-12): testimonials and quotes, price and
   payment plan, market statistics, awards beyond `architect.items`, home
   counts, contact details, photos of people and of third-party landmarks. */
export type ClientBrochure = {
  /* Visible source note, shown in every client-provided block */
  note: string;
  /* The client's three reasons to buy, as short labels */
  positioning: string[];
  /* Extra opener rows, shown under their own "client's brochure" label */
  keyFacts: { label: string; value: string }[];
  specs: { value: string; label: string }[];
  amenities: string[];
  areas: { label: string; value: string; detail?: string; total?: true }[];
  wellness: { title: string; text: string }[];
  distances: { time: string; place: string }[];
  architect: { name: string; role: string; attribution: string; items: string[] };
  /* Renders, floor plans and the map, /public/case-studies/auroma/ */
  gallery: { renders: CaseStudyMedia[]; plans: CaseStudyMedia[] };
};

export type WebsiteStudy = CaseStudyBase & {
  category: "website";
  location: string;
  /* `page` names the landing page made for that audience */
  audiences: { page: string; name: string; need: Copy }[];
  leadPath: (Step & { on: LeadAnchor })[];
  landingPages: { label: string; audience: string }[];
  formFields: { name: string; required: boolean; rule?: string }[];
  client?: ClientBrochure;
};

export type CustomStudy = CaseStudyBase & {
  category: "custom";
  /* Which code-built, labelled illustration the Visuals section draws
     until real screens exist (CustomCaseStudy.tsx). */
  illustration?: "generated-page";
  /* Always illustrative — never a real config, prompt or credential */
  sample: { caption: string; code: string };
};

export type IotStudy = CaseStudyBase & {
  category: "iot";
  /* The signal-path diagram: layers top to bottom, `via` = the link from a
     layer to the next one. Drawn as an "Illustrative" diagram. */
  architecture: {
    layers: ({ id: string; label: string; role: string } & Draftable)[];
    links: ({ from: string; via: string } & Draftable)[];
    description: Copy;
  };
};

export type CaseStudy = WebsiteStudy | CustomStudy | IotStudy;

/* The three overview sections. `id` is each section's anchor. Generated
   copy (vrattiks-standards §3 bucket 4): no figures, clients or results. */
export const caseStudySections: {
  category: CaseStudyCategory;
  id: string;
  label: string;
  shortLabel: string;
  title: string;
  description: string;
}[] = [
  {
    category: "custom",
    id: "custom-projects",
    label: "Custom Projects",
    shortLabel: "Custom",
    title: "Agents and automations, built to order",
    description: "AI agents and workflow automations, each made for one specific job.",
  },
  {
    category: "iot",
    id: "iot-projects",
    label: "IoT Projects",
    shortLabel: "IoT",
    title: "Devices that report back",
    description: "Connected hardware, from the sensor on site to the screen your team reads.",
  },
  {
    category: "website",
    id: "website-projects",
    label: "Website Projects",
    shortLabel: "Websites",
    title: "Websites and web apps",
    description: "Business websites and apps that run in the browser.",
  },
];

export const caseStudies: CaseStudy[] = [
  // ── Website ─────────────────────────────────────────────────────────────
  /* VERIFIED (user, 2026-10-12): villa project near Auroville, Pondicherry;
     Next.js; LP-A second-home buyers, LP-B rental investors; lead form with
     name, WhatsApp number, city, investment range required + optional
     message; WhatsApp exactly 10 digits; "Download Brochure" downloads the
     brochure PDF after a valid submit; lead emails to the client via
     Resend. The client's email address must never be printed.
     CLIENT-PROVIDED (the client's brochure, supplied by the user
     2026-10-12): the project name (Auroma Phase V, Wellness Villas), the
     three-way positioning, the villa spec and areas, the wellness features,
     the travel times, the architect profile items and the earlier phases —
     all in `client` below, plus the overview, brief and about-client text
     that restate them. */
  {
    slug: "auroma-holiday-villas",
    category: "website",
    title: "Auroma Holiday Villas",
    kind: "Website",
    clientName: "Trupti Doshi",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "placeholder",
    location: "Near Auroville, Pondicherry",
    industry: { name: "Real Estate", slug: "real-estate" },
    summary: fact(
      "A Next.js website for Auroma Phase V, a set of wellness villas near Auroville, Pondicherry, with one landing page for second-home buyers and one for rental investors.",
    ),
    tags: [
      fact("Wellness villas near Auroville"),
      fact("Next.js"),
      fact("Two landing pages"),
      fact("10-digit WhatsApp check"),
      fact("Brochure download"),
      fact("Lead emails via Resend"),
    ],
    keyFacts: [
      { label: "Project type", value: "Real estate website" },
      { label: "Location", value: "Near Auroville, Pondicherry" },
      { label: "Landing pages", value: "LP-A and LP-B" },
      { label: "Built with", value: "Next.js, Resend" },
    ],
    /* Client-provided (brochure): the detail page shows it with the
       brochure note and the villa spec tiles. Our work is in `summary`
       and `description`. */
    overview: fact(
      "Auroma Phase V is a set of wellness villas near Auroville, Pondicherry, designed by Ar. Trupti Doshi. Each villa has three ensuite bedrooms, four washrooms and room for eight guests, with a private plunge pool, a games room and a roof terrace.",
    ),
    description: [
      fact(
        "Auroma Holiday Villas is a real estate villa project near Auroville, Pondicherry. Vrattiks built its website with Next.js, around two landing page variants: LP-A for second-home buyers and LP-B for rental investors.",
      ),
      draft(
        "The two audiences are looking for different things. Someone looking for a second home wants to picture how they would spend time there and what life near Auroville would be like. Someone buying to rent out wants to understand how the villa would work as an investment. A single page that tried to speak to both would stay vague for each, so each audience gets a page that leads with the reasons that matter to them.",
      ),
      fact(
        "Both pages lead to the same lead form. It asks for a name, a WhatsApp number, the visitor's city and their investment range, all required, plus an optional message. The WhatsApp number must be exactly 10 digits, and the form checks this before it can be submitted. After a valid submit, a Download Brochure button downloads the brochure PDF.",
      ),
      fact(
        "When a lead comes in, a lead notification email goes to the client through Resend, so new enquiries reach the client directly.",
      ),
      draft(
        "Asking for these details before sharing the brochure means each download arrives with context. The city and investment range help the client see which enquiries fit the project, and the WhatsApp number gives a direct way to follow up. The pages are laid out for phones first, because visitors often open a landing page from a shared link or an ad on their phone, and each landing page carries its own title and description so it can be found and shared on its own.",
      ),
    ],
    brief: [
      /* client-provided (brochure) */
      fact(
        "The project is Auroma Phase V, a set of wellness villas near Auroville, Pondicherry. The client's brochure gives three reasons to own one: for your health, for your holidays, and for Airbnb returns.",
      ),
      fact("The site serves two audiences, each with a landing page of its own."),
      /* Our reading of how the positioning maps onto the two pages — an
         elaboration of our process, not confirmed: placeholder. */
      draft(
        "Those three reasons describe two different buyers. Health and holidays speak to someone choosing a second home, while Airbnb returns speak to someone buying to rent out. One page carrying all three would stay vague for both, so the messaging is split: LP-A leads with health and holidays, LP-B with the villa as a holiday rental.",
      ),
    ],
    audiences: [
      {
        page: "LP-A",
        name: "Second-home buyers",
        need: draft(
          "For people looking for a second home near Auroville. The page leads with the client's health and holiday reasons: what living in and holidaying at the villa would be like.",
        ),
      },
      {
        page: "LP-B",
        name: "Rental investors",
        need: draft(
          "For people buying a villa to rent out. The page leads with the client's Airbnb reason: how the villa could work as a holiday rental.",
        ),
      },
    ],
    problem: draft(
      "With one general page, buyers with different goals all see the same message. Visitors can read about the project and leave without getting in touch, and enquiries that do come in may lack the details needed for a useful follow-up. A brochure shared openly also gives the client no way of knowing who is interested.",
    ),
    objectives: [
      fact("Give second-home buyers and rental investors each a landing page of their own."),
      fact("Collect a name, WhatsApp number, city and investment range with every enquiry."),
      fact("Accept only a WhatsApp number of exactly 10 digits."),
      fact("Download the brochure PDF after a valid form submission."),
      fact("Email the client about each new lead."),
    ],
    approach: [
      {
        title: "One page per audience",
        text: "Second-home buyers and rental investors read different reasons to buy, so each gets a landing page written for them instead of one page that tries to cover both.",
        ...DRAFT,
      },
      {
        title: "The brochure is the reason to enquire",
        text: "The brochure download comes after the form, so visitors who want it share their details first and the client knows who is reading it.",
        ...DRAFT,
      },
      {
        title: "Ask only what helps the follow-up",
        text: "The form keeps to the details a sales conversation starts with, and leaves the message optional so the form stays short.",
        ...DRAFT,
      },
      {
        title: "Check the number before it is sent",
        text: "Requiring a complete WhatsApp number catches typing mistakes while the visitor is still on the page, so the client is not left with a number that cannot be reached.",
        ...DRAFT,
      },
    ],
    solution: [
      {
        title: "Plan the two audiences",
        text: "Agree who each landing page is for, what each audience needs to read, and what the form should ask.",
        ...DRAFT,
      },
      {
        title: "Lay out the pages",
        text: "Sketch both landing pages for phone and desktop, with the form placed where a visitor decides to act.",
        ...DRAFT,
      },
      { title: "Build in Next.js", text: "Build the site and both landing page variants, LP-A and LP-B, with Next.js." },
      {
        title: "Add the lead form",
        text: "Build the form both pages share: required name, WhatsApp number, city and investment range, an optional message, and the 10-digit WhatsApp check.",
      },
      {
        title: "Connect the brochure and notifications",
        text: "Download the brochure PDF after a valid submit, and send lead notification emails to the client through Resend.",
      },
      {
        title: "Check phones and search basics",
        text: "Review both pages across screen sizes, and give each its own page title and description before handover.",
        ...DRAFT,
      },
    ],
    leadPath: [
      { title: "The visitor opens LP-A or LP-B", text: "Second-home buyers and rental investors each land on their own page.", on: "page" },
      { title: "They fill in the lead form", text: "Name, WhatsApp number, city and investment range are required; a message is optional.", on: "form" },
      { title: "The form checks the number", text: "The WhatsApp number must be exactly 10 digits.", on: "validation" },
      { title: "The brochure downloads", text: "After a valid submit, the Download Brochure button downloads the brochure PDF.", on: "download" },
      { title: "The client is notified", text: "A lead notification email goes to the client through Resend.", on: "email" },
    ],
    features: [
      { title: "Two landing page variants", text: "LP-A speaks to second-home buyers, LP-B to rental investors." },
      { title: "One lead form", text: "Name, WhatsApp number, city and investment range are required; the message is optional." },
      { title: "WhatsApp number check", text: "The number must be exactly 10 digits before the form goes through." },
      { title: "Brochure download", text: "A Download Brochure button downloads the brochure PDF after a valid submit." },
      { title: "Lead notification emails", text: "The client is emailed about new leads through Resend." },
      {
        title: "Built for phones and search",
        text: "Layouts adapt from phone to desktop, and each page has its own title and description.",
        ...DRAFT,
      },
    ],
    stack: [
      { name: "Next.js", role: "The framework the site and both landing pages are built on" },
      { name: "Resend", role: "Sends the lead notification emails to the client" },
    ],
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
    outcomes: [],
    /* Screens of OUR website only (none approved yet). The villa renders
       are the client's and live in `client.gallery`, never here — the hero
       would otherwise show a render as if it were our screen. */
    visuals: { media: [] },
    /* client-provided (brochure) */
    aboutClient: [
      fact(
        "Ar. Trupti Doshi is the Founder and Principal Architect of Auroma Architecture, and designed the Auroma Phase V wellness villas.",
      ),
      fact(
        "Phase V is the latest phase of Auroma Homes, which follows four earlier phases near Auroville: Phase I, Phase II, Phase III and Phase IV.",
      ),
    ],
    client: {
      note: "Details supplied by the client's brochure.",
      positioning: ["For your health", "For your holidays", "For Airbnb returns"],
      keyFacts: [
        { label: "Project", value: "Auroma Phase V, Wellness Villas" },
        { label: "Villa", value: "3 bedrooms, 4 washrooms, sleeps 8" },
        { label: "Total area", value: "3,105 sq ft" },
        { label: "Architect", value: "Ar. Trupti Doshi" },
      ],
      specs: [
        { value: "3", label: "Bedrooms, each ensuite" },
        { value: "4", label: "Washrooms" },
        { value: "8", label: "Guests it sleeps" },
      ],
      amenities: ["Private plunge pool", "Games room", "Roof terrace"],
      areas: [
        { label: "Plot area", value: "1,775 sq ft" },
        { label: "Built-up area", value: "2,290 sq ft" },
        { label: "Semi-open area", value: "815 sq ft", detail: "Plunge pool, parking, games room and covered balcony" },
        { label: "Total villa area", value: "3,105 sq ft", total: true },
      ],
      /* One line each, in our words (user brief: no brochure sentences).
         Environmental figures (air quality, indoor temperature) are left
         out on purpose — they are the client's claims, not ours. */
      wellness: [
        { title: "Light", text: "Bright rooms, and morning light in every bedroom." },
        { title: "Air", text: "Rooms laid out for cross-breezes around an open courtyard." },
        { title: "Cool", text: "Eco-friendly brick walls, chosen to keep rooms cool with less air conditioning." },
        { title: "Sleep", text: "Three ensuite bedrooms, each with a planted balcony." },
        { title: "Water", text: "Solar hot water, a drinking-water system and a freestanding soaking tub." },
        { title: "Nature", text: "A landscaped indoor garden at the centre, and greenery on every side." },
        { title: "Nourish", text: "A kitchen herb garden next to a kitchen made for cooking fresh." },
        { title: "Move", text: "A plunge pool for laps, a terrace for yoga, and cycling trails nearby." },
        { title: "Calm", text: "Vaastu-aligned rooms finished in natural stone, earth and lime." },
        { title: "Connect", text: "Open living, kitchen and dining, plus a private games room." },
      ],
      distances: [
        { time: "5 min", place: "Pondicherry University" },
        { time: "10 min", place: "Matrimandir, Auroville" },
        { time: "10 min", place: "PIMS hospital" },
        { time: "15 min", place: "Pondicherry" },
      ],
      architect: {
        name: "Ar. Trupti Doshi",
        role: "Founder and Principal Architect, Auroma Architecture",
        attribution: "As stated by the client",
        items: [
          "25+ years of architectural practice",
          "Recognised among India's top 10 eco-architects",
          "Technical advisor on the Government of India's Green Building Policy",
          "Two-time TEDx speaker",
          "Work featured in 40+ publications",
        ],
      },
      /* Extracted from the brochure PDF (2026-10-12), WebP, each < 200 KB.
         Renders and plans only: no people, no third-party landmarks. */
      gallery: {
        renders: [
          { src: "/case-studies/auroma/exterior.webp", width: 1400, height: 968, alt: "Render of the three-storey Auroma Phase V villa from the street: a cream facade with a painted leaf mural, a tiled roof with solar panels, planted balconies and a timber pergola over the roof terrace.", caption: "The villa from the street" },
          { src: "/case-studies/auroma/living.webp", width: 970, height: 546, alt: "Render of the living room: a large cream sectional sofa, two dark armchairs and tall curtained windows looking onto greenery.", caption: "Living room" },
          { src: "/case-studies/auroma/kitchen.webp", width: 598, height: 337, alt: "Render of the open kitchen: wood and cream cabinets, an island counter and a window over the sink.", caption: "Open kitchen" },
          { src: "/case-studies/auroma/bedroom.webp", width: 909, height: 551, alt: "Render of a bedroom with a double bed, a bench and glass doors opening onto a planted balcony.", caption: "Bedroom with balcony" },
          { src: "/case-studies/auroma/bathroom.webp", width: 857, height: 686, alt: "Render of a bathroom with a freestanding soaking tub, brass fittings, a green vanity and a window onto trees.", caption: "Bathroom with soaking tub" },
          { src: "/case-studies/auroma/plunge-pool.webp", width: 914, height: 555, alt: "Render of the private plunge pool on a timber deck, with a stone water-wall and an arched opening onto bamboo.", caption: "Private plunge pool" },
          { src: "/case-studies/auroma/games-room.webp", width: 1077, height: 604, alt: "Render of the games room under a timber pergola, with a pool table, a carrom table and a chess table looking out over treetops.", caption: "Games room on the terrace" },
        ],
        plans: [
          { src: "/case-studies/auroma/plan-ground-floor.webp", width: 475, height: 879, alt: "Ground floor plan: parking and a swimming pool at the front, then a powder room, the stairs with a kitchen garden, the living room, dining area and kitchen.", caption: "Ground floor plan" },
          { src: "/case-studies/auroma/plan-first-floor.webp", width: 475, height: 879, alt: "First floor plan: three bedrooms, each with its own bathroom, around the stairs and an open courtyard, with a balcony at each end.", caption: "First floor plan" },
          { src: "/case-studies/auroma/location-map.webp", width: 846, height: 570, alt: "Illustrated map placing the villa between Auroville and the coast, with Pondicherry to the south and the university and hospital to the north.", caption: "Location map" },
        ],
      },
    },
    services: ["website-development"],
    cta: {
      title: "Planning a website that brings in enquiries?",
      description: "Tell us who it's for and what it needs to do. We'll show you how we'd build it.",
    },
    seo: {
      title: "Auroma Holiday Villas case study",
      description:
        "How Vrattiks built a Next.js website for Auroma Holiday Villas near Auroville, Pondicherry: two landing pages, a validated lead form and a brochure download.",
    },
  },

  // ── Custom Projects ─────────────────────────────────────────────────────
  /* VERIFIED (user, 2026-10-12): internal Vrattiks tool; n8n pipeline;
     leads from a CSV → personalised landing page per lead with AI (Groq,
     llama-3.3-70b) → deployed to Netlify → cold outreach emails via Gmail;
     Supabase and Pexels used in the workflow; category-specific 3D hero
     videos made with Blender in a Docker container; pages use Three.js,
     GSAP scroll animations and category-based colour and geometry styles.
     What Supabase and Pexels do exactly was NOT given — any role beyond
     "used in the workflow" is placeholder. */
  {
    slug: "ai-lead-to-landing-page-generator",
    category: "custom",
    title: "AI Lead-to-Landing-Page Generator",
    kind: "Custom development",
    clientName: "Vrattiks (internal project)",
    clientRole: "Client",
    statusLabel: "Internal project",
    contentStatus: "placeholder",
    summary: fact(
      "An n8n pipeline that turns a CSV of business leads into a personalised landing page for each lead, deploys the pages to Netlify and sends a cold outreach email.",
    ),
    tags: [
      fact("n8n"),
      fact("Groq · llama-3.3-70b"),
      fact("Netlify"),
      fact("Gmail outreach"),
      fact("Three.js + GSAP"),
      fact("Blender in Docker"),
    ],
    keyFacts: [
      { label: "Project type", value: "Lead generation pipeline" },
      { label: "Input", value: "Business leads from a CSV" },
      { label: "AI model", value: "Groq, llama-3.3-70b" },
      { label: "Pages hosted on", value: "Netlify" },
      { label: "Outreach", value: "Gmail" },
    ],
    overview: fact(
      "The AI Lead-to-Landing-Page Generator is an internal Vrattiks tool built in n8n. It reads business leads from a CSV, writes a personalised landing page for each one with AI (Groq, llama-3.3-70b), deploys the pages to Netlify and sends each lead a cold outreach email through Gmail.",
    ),
    description: [
      fact(
        "The AI Lead-to-Landing-Page Generator is an internal tool we built at Vrattiks. It is an n8n pipeline that starts from a CSV of business leads and ends with a personalised landing page for each lead, deployed to Netlify, and a cold outreach email sent through Gmail.",
      ),
      draft(
        "Cold outreach is easy to ignore when the message reads as if it went to everyone. A personalised page changes the first impression. Instead of a generic link, the lead receives a page written about their kind of business, which gives them a reason to read on and a clearer picture of what working with us could look like.",
      ),
      fact(
        "The AI step uses Groq running llama-3.3-70b to write the content of each page. Supabase and Pexels are part of the workflow. Each page is styled by the lead's business category, with category-based colours and geometry, Three.js visuals and GSAP scroll animations.",
      ),
      fact(
        "Each business category also has its own 3D hero video. These videos are generated with Blender running in a Docker container, so each page opens with a visual made for its category.",
      ),
      draft(
        "Because every stage runs inside one n8n workflow, the team can follow each lead from the CSV to a finished page and a sent email, and rerun a single step when something needs fixing. The parts that need judgement, such as choosing which leads to load and reviewing the category styles, stay with our team, while the repetitive work of writing, building and sending is automated.",
      ),
    ],
    brief: [
      draft(
        "This project started as a brief to ourselves. We wanted a way to reach new businesses with outreach that feels prepared for them, without writing and building every page by hand.",
      ),
      draft(
        "The tool had to work from lead lists kept as plain CSV files and fit into the n8n setup we already use for automation work.",
      ),
    ],
    problem: draft(
      "Writing a tailored page for each lead takes time that a small team rarely has. Without it, outreach falls back on one template sent to every lead, which is easy to ignore. Building pages by hand also spreads design, copy, hosting and email across separate tools, so a lead list can sit unused while the work piles up.",
    ),
    objectives: [
      fact("Read business leads from a CSV file."),
      fact("Write a personalised landing page for each lead with AI."),
      fact("Style each page by the lead's business category."),
      fact("Deploy each page to Netlify."),
      fact("Send each lead a cold outreach email through Gmail."),
    ],
    approach: [
      {
        title: "One workflow from start to finish",
        text: "Every stage, from reading the CSV to sending the email, runs in a single n8n workflow, so there is one place to watch, pause or rerun a step.",
        ...DRAFT,
      },
      {
        title: "AI writes, category styles keep the look",
        text: "The model writes the words for each lead, while colours, geometry and motion come from the lead's category, so every page stays consistent.",
        ...DRAFT,
      },
      {
        title: "A fast model for long lead lists",
        text: "Groq serving llama-3.3-70b keeps the writing step quick, so a long list of leads does not hold up the rest of the pipeline.",
        ...DRAFT,
      },
      {
        title: "Visuals made per category, not per lead",
        text: "Hero videos are rendered once for each business category, so every page gets a matching visual without rendering a new video each time.",
        ...DRAFT,
      },
    ],
    solution: [
      {
        title: "Load the leads",
        tool: "CSV · n8n",
        text: "The workflow reads the business leads from a CSV file.",
        note: draft("The CSV carries the basics for each lead, such as the business name, its category and a contact email."),
      },
      {
        title: "Write the page content",
        tool: "Groq · llama-3.3-70b",
        text: "AI writes personalised landing page content for each lead.",
        note: draft("The prompt gives the model the lead's details and category, and asks for plain, specific copy rather than generic sales lines."),
      },
      {
        title: "Add the category visuals",
        tool: "Blender · Docker",
        text: "Each page uses the 3D hero video generated for the lead's business category.",
        note: draft("Images from Pexels can fill the remaining sections of the page."),
      },
      {
        title: "Build the page",
        tool: "Three.js · GSAP",
        text: "The page is assembled with Three.js visuals, GSAP scroll animations and the colour and geometry style for its category.",
      },
      {
        title: "Deploy to Netlify",
        tool: "Netlify",
        text: "Each landing page is deployed to Netlify.",
        note: draft("Lead details and progress are kept in Supabase, so the team can see which leads already have a page."),
      },
      {
        title: "Send the outreach email",
        tool: "Gmail",
        text: "A cold outreach email goes to the lead through Gmail.",
        note: draft("The email points the lead to the page made for them."),
      },
    ],
    features: [
      { title: "CSV in, pages out", text: "Works from a plain CSV of business leads." },
      { title: "Personalised copy per lead", text: "Groq with llama-3.3-70b writes each landing page for the lead it is meant for." },
      { title: "Category styles", text: "Colours and geometry change with the lead's business category." },
      { title: "3D hero videos", text: "Category-specific hero videos generated with Blender in a Docker container." },
      { title: "Scroll animations", text: "Three.js visuals and GSAP scroll animations on the landing pages." },
      { title: "Deploy and outreach", text: "Each page is deployed to Netlify and each lead gets an outreach email through Gmail." },
      {
        title: "Step-by-step visibility",
        text: "Each lead's progress can be followed inside the n8n workflow, so a failed step is easy to spot and rerun.",
        ...DRAFT,
      },
    ],
    stack: [
      { name: "n8n", role: "Runs the whole pipeline, step by step", group: "Pipeline" },
      { name: "Supabase", role: "Database platform used in the workflow", group: "Pipeline" },
      { name: "Groq · llama-3.3-70b", role: "Writes the personalised page content", group: "AI and media" },
      { name: "Pexels", role: "Image library used in the workflow", group: "AI and media" },
      { name: "Blender in Docker", role: "Generates the category-specific 3D hero videos", group: "AI and media" },
      { name: "Three.js", role: "3D visuals on the landing pages", group: "Landing pages" },
      { name: "GSAP", role: "Scroll animations on the landing pages", group: "Landing pages" },
      { name: "Netlify", role: "Hosts the deployed landing pages", group: "Delivery" },
      { name: "Gmail", role: "Sends the cold outreach emails", group: "Delivery" },
    ],
    illustration: "generated-page",
    sample: {
      caption: "Sample code: the pipeline's stages written as a short script",
      code: `// Illustrative sample, not the production workflow
const lead = { business: "Sample Business", category: "sample" };

const page = await writeLandingPage(lead, {
  provider: "Groq",
  model: "llama-3.3-70b",
});

await deploy(page, { host: "Netlify" });
await sendOutreach(lead, { via: "Gmail" });`,
    },
    outcomes: [],
    visuals: { media: [] },
    aboutClient: [
      fact("Vrattiks built this tool for its own use."),
      draft("It supports our outreach to new businesses, and it is a working example of the kind of automation we build for clients."),
    ],
    // Service mapping is ours, not user-stated — confirm.
    services: ["workflow-automation", "website-development"],
    cta: {
      title: "Have a manual job you'd like automated?",
      description: "Tell us how it's done today. We'll show you what we'd automate first.",
    },
    seo: {
      title: "AI Lead-to-Landing-Page Generator",
      description:
        "An internal Vrattiks n8n pipeline that turns CSV leads into personalised AI landing pages on Netlify and sends cold outreach emails through Gmail.",
    },
  },

  // ── IoT Projects ────────────────────────────────────────────────────────
  /* VERIFIED (user, 2026-10-12): the project name, the category (IoT) and
     the client name, Ajay Gupta. NOTHING ELSE. The whole entry below is
     placeholder, written to show the page complete; every block is
     draft() / ...DRAFT and must be replaced with the confirmed details. */
  {
    slug: "pizza-vending-machine",
    category: "iot",
    title: "Pizza Vending Machine",
    kind: "IoT project",
    clientName: "Ajay Gupta",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "placeholder",
    // Industry mapping is ours (placeholder) — confirm.
    industry: { name: "Restaurants & Food", slug: "restaurants-food" },
    summary: draft(
      "A connected pizza vending machine with touchscreen ordering, digital payment and a remote dashboard that shows how the machine is doing.",
    ),
    tags: [
      draft("Touchscreen ordering"),
      draft("Digital payment"),
      draft("Dispensing control"),
      draft("Machine health monitoring"),
      draft("Remote dashboard"),
      draft("Alerts"),
    ],
    keyFacts: [
      { label: "Project type", value: "Connected vending machine", ...DRAFT },
      { label: "Industry", value: "Food service", ...DRAFT },
      { label: "Connectivity", value: "Wi-Fi or cellular, MQTT", ...DRAFT },
    ],
    overview: draft(
      "The Pizza Vending Machine project connects a self-service pizza machine to the internet. Customers order and pay on a touchscreen, the machine controls preparation and dispensing, and a web dashboard lets the operator see the machine's status and get alerts when something needs attention.",
    ),
    description: [
      draft(
        "The Pizza Vending Machine is an IoT project for Ajay Gupta. The idea is a self-service machine that serves a hot pizza without a counter or staff on hand, while the operator keeps an eye on it from anywhere through a web dashboard.",
      ),
      draft(
        "For the customer, the experience is meant to be simple. A touchscreen on the front of the machine shows the menu, takes the order and walks the customer through a digital payment. Once the payment is confirmed, the machine starts the order and shows its progress on the screen until the pizza is ready to collect.",
      ),
      draft(
        "Inside, a microcontroller coordinates the machine's parts. It reads the sensors, runs the heating and dispensing steps in the right order, and stops safely if a reading is out of range or a service door is open. Keeping this control on the machine itself means a dropped internet connection does not interrupt an order that has already started.",
      ),
      draft(
        "The machine reports its state to a cloud backend over MQTT, a lightweight messaging protocol made for devices like this. Temperatures, stock levels, door status, completed orders and errors are sent as small messages, stored, and shown on a web dashboard. When something needs attention, such as stock running low or a fault, the dashboard raises an alert so the operator can act before customers are turned away.",
      ),
      draft(
        "The project is planned in stages: agreeing the machine's behaviour and order flow, choosing and testing the electronics, writing the firmware, building the backend and dashboard, and testing the complete machine before it is placed on site.",
      ),
    ],
    brief: [
      draft(
        "Ajay Gupta wanted a pizza vending machine that customers can use on their own and that the operator can manage without standing next to it.",
      ),
      draft(
        "The brief covers the full path: ordering and payment on the machine, dependable control of preparation and dispensing, and a remote view of the machine's health, stock and orders.",
      ),
    ],
    problem: draft(
      "A vending machine that cannot report back has to be checked in person. The operator only finds out about an empty ingredient store, a heating fault or a payment problem when someone visits or a customer complains, and while the machine sits unusable, sales are lost. Cash handling adds the work of collecting and counting money.",
    ),
    objectives: [
      draft("Let customers order and pay on the machine without help."),
      draft("Accept digital payments and start an order only after the payment is confirmed."),
      draft("Control heating and dispensing safely, and stop if a sensor reports a problem."),
      draft("Report temperatures, stock, door status and errors to a cloud backend."),
      draft("Alert the operator when the machine needs attention."),
    ],
    approach: [
      {
        title: "Control stays on the machine",
        text: "The microcontroller runs each order from start to finish, so an order in progress does not depend on the internet connection.",
        ...DRAFT,
      },
      {
        title: "MQTT for machine messages",
        text: "MQTT sends small status messages efficiently and copes well with unsteady connections, which suits a machine placed in a public spot.",
        ...DRAFT,
      },
      {
        title: "Payment confirmed before preparation",
        text: "The machine starts an order only after the payment is confirmed, which keeps orders and payments matched.",
        ...DRAFT,
      },
      {
        title: "A dashboard built for the operator",
        text: "The dashboard shows what an operator needs to decide what to do next: whether the machine is working, what is running low, and what has gone wrong.",
        ...DRAFT,
      },
    ],
    solution: [
      {
        title: "Define the machine's behaviour",
        text: "Agree the menu, the order flow on the touchscreen and what the machine should do in each fault case.",
        ...DRAFT,
      },
      {
        title: "Choose and test the electronics",
        text: "Select the microcontroller, sensors, payment module and display, and test them together on the bench.",
        ...DRAFT,
      },
      {
        title: "Write the firmware",
        text: "Program the order sequence, the safety checks and the messages the machine sends and receives.",
        ...DRAFT,
      },
      {
        title: "Build the cloud backend",
        text: "Receive the machine's MQTT messages, store them and turn them into machine status, stock and order records.",
        ...DRAFT,
      },
      {
        title: "Build the dashboard and alerts",
        text: "Show the machine's health, stock and orders, and send an alert when a reading needs attention.",
        ...DRAFT,
      },
      {
        title: "Test the complete machine",
        text: "Run full orders end to end, including payment failures, network drops and low stock, before the machine is placed on site.",
        ...DRAFT,
      },
    ],
    features: [
      { title: "Touchscreen ordering", text: "Customers browse the menu and order on a touchscreen on the machine.", layer: "device", ...DRAFT },
      { title: "Digital payment", text: "Customers pay by card or UPI before the order starts.", layer: "device", ...DRAFT },
      { title: "Dispensing control", text: "Heating and dispensing run in order, and stop safely if a check fails.", layer: "sensors", ...DRAFT },
      { title: "Machine health monitoring", text: "Temperatures, door status and errors are reported to the cloud backend.", layer: "cloud", ...DRAFT },
      { title: "Remote dashboard", text: "The operator sees the machine's status, stock and orders from a browser.", layer: "dashboard", ...DRAFT },
      { title: "Alerts", text: "The operator is alerted when stock runs low or a fault needs attention.", layer: "dashboard", ...DRAFT },
    ],
    stack: [
      { name: "Temperature sensors", role: "Watch oven and storage temperatures", group: "sensors", ...DRAFT },
      { name: "Stock and door sensors", role: "Detect low stock and an open service door", group: "sensors", ...DRAFT },
      { name: "Microcontroller board", role: "Runs the firmware: order sequence, safety checks and messaging", group: "device", ...DRAFT },
      { name: "Touchscreen display", role: "Menu, ordering and order progress for the customer", group: "device", ...DRAFT },
      { name: "Payment module", role: "Takes digital payments at the machine", group: "device", ...DRAFT },
      { name: "MQTT", role: "Lightweight messaging between the machine and the cloud", group: "network", ...DRAFT },
      { name: "Cloud backend", role: "Message broker, database and alert rules", group: "cloud", ...DRAFT },
      { name: "Web dashboard", role: "Status, stock, orders and alerts for the operator", group: "dashboard", ...DRAFT },
    ],
    architecture: {
      layers: [
        { id: "sensors", label: "Sensors and actuators", role: "Read oven temperature, stock and door status; run the heating and dispensing parts", ...DRAFT },
        { id: "device", label: "Machine controller", role: "A microcontroller that runs each order, the touchscreen and the payment module", ...DRAFT },
        { id: "network", label: "Connectivity", role: "The machine's internet link", ...DRAFT },
        { id: "cloud", label: "Cloud backend", role: "Receives and stores machine messages and checks them against alert rules", ...DRAFT },
        { id: "dashboard", label: "Dashboard and alerts", role: "Shows machine health, stock and orders; alerts the operator", ...DRAFT },
      ],
      links: [
        { from: "sensors", via: "Wired to the controller", ...DRAFT },
        { from: "device", via: "Wi-Fi or cellular", ...DRAFT },
        { from: "network", via: "MQTT over an encrypted connection", ...DRAFT },
        { from: "cloud", via: "Secure web connection", ...DRAFT },
      ],
      description: draft(
        "The sensors and actuators inside the machine are wired to a microcontroller. The microcontroller runs each order, drives the touchscreen and payment module, and sends status messages over the machine's internet link using MQTT. A cloud backend receives the messages, stores them and checks them against alert rules. The web dashboard shows the operator the machine's health, stock and orders, and sends an alert when something needs attention.",
      ),
    },
    outcomes: [],
    visuals: { media: [] },
    aboutClient: [
      draft(
        "Ajay Gupta is the client for the Pizza Vending Machine project. The client wanted a self-service machine that customers can use on their own and that can be managed remotely.",
      ),
    ],
    // No IoT service page exists yet, so no service links (confirm).
    services: [],
    cta: {
      title: "Have equipment you need to keep an eye on?",
      description: "Tell us what you want to monitor. We'll explain how we'd connect it.",
    },
    seo: {
      title: "Pizza Vending Machine case study",
      description: "Pizza Vending Machine: an IoT project by Vrattiks for Ajay Gupta.",
    },
  },
];

/* ── Placeholder detection ───────────────────────────────────────────── */

/* Counts blocks marked `placeholder: true` anywhere inside a value. */
function countDrafts(value: unknown): number {
  if (Array.isArray(value)) return value.reduce((n: number, v) => n + countDrafts(v), 0);
  if (value && typeof value === "object") {
    const self = (value as Draftable).placeholder === true ? 1 : 0;
    return self + Object.values(value).reduce((n: number, v) => n + countDrafts(v), 0);
  }
  return 0;
}

/* Ordered labels an overview card draws (custom: the pipeline steps; IoT:
   the diagram layers). Each keeps its block's own placeholder flag. */
export function cardSteps(study: CaseStudy): ({ label: string } & Draftable)[] {
  if (study.category === "custom") return study.solution.map((s) => ({ label: s.title, placeholder: s.placeholder }));
  if (study.category === "iot") return study.architecture.layers.map((l) => ({ label: l.label, placeholder: l.placeholder }));
  return [];
}

/* Fact rows an overview card shows: the website card is the large opener
   tile with the key-fact rows; the custom and IoT cards show none. */
export function cardFacts(study: CaseStudy): KeyFact[] {
  return study.category === "website" ? study.keyFacts : [];
}

/* Placeholder blocks an overview CARD renders: summary, tag chips, fact
   rows and the drawn steps. Detail-only notes don't count here. */
export function cardDrafts(study: CaseStudy) {
  return countDrafts([study.summary, study.tags, cardFacts(study), cardSteps(study)]);
}

/* Placeholder blocks the DETAIL page renders: every content field except
   the card-only tag chips (each detail layout renders all of the others). */
export function pageDrafts(study: CaseStudy) {
  const { tags, ...rendered } = study;
  void tags;
  return countDrafts(rendered);
}

/* ── Lists and lookups ───────────────────────────────────────────────── */

/* Order of the category sections on the /case-studies overview. */
export const overviewOrder: CaseStudyCategory[] = ["website", "custom", "iot"];

export function caseStudiesIn(category: CaseStudyCategory) {
  return caseStudies.filter((s) => s.category === category);
}

/* True while ANY card on /case-studies shows placeholder content →
   noindex for the overview. */
export const overviewHasDrafts = caseStudies.some((s) => cardDrafts(s) > 0);

/* Fully verified entries only — the only ones allowed in JSON-LD. */
export const verifiedCaseStudies = caseStudies.filter((s) => s.contentStatus === "verified");

/* Case study URLs that may be indexed. THERE IS NO SITEMAP in this repo yet
   (no metadataBase either); when one is added it must list case studies
   from here, so placeholder pages stay out of it automatically. */
export function indexableCaseStudyPaths() {
  return [
    ...(overviewHasDrafts ? [] : ["/case-studies"]),
    ...caseStudies.filter((s) => pageDrafts(s) === 0).map((s) => `/case-studies/${s.slug}`),
  ];
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((s) => s.slug === slug);
}

export function clientNameOf(study: CaseStudy) {
  return study.clientName;
}

/* Industry + service links for one project (vrattiks-architecture §5).
   Names come from content.ts, so a renamed service updates here too. */
export function relatedLinks(study: CaseStudy) {
  const links: { label: string; name: string; href: string }[] = [];
  if (study.industry?.slug) {
    links.push({ label: "Industry", name: study.industry.name, href: `/industries/${study.industry.slug}` });
  }
  for (const slug of study.services) {
    const service = services.find((s) => s.slug === slug);
    if (service) links.push({ label: "Service", name: service.name, href: `/services/${slug}` });
  }
  return links;
}

/* Breadcrumb middle step: the overview section this category belongs to. */
export function sectionFor(category: CaseStudyCategory) {
  return caseStudySections.find((s) => s.category === category)!;
}

/* ── Integrity check ─────────────────────────────────────────────────── */

/* `contentStatus` must match the blocks: "placeholder" exactly when some
   block is still a draft. A mismatch stops `next build` here, so a page can
   never be published (indexed, given JSON-LD) while it shows placeholder
   copy, or stay marked placeholder once the last draft is gone. */
for (const s of caseStudies) {
  const drafts = pageDrafts(s) + cardDrafts(s);
  if ((drafts > 0) !== (s.contentStatus === "placeholder")) {
    throw new Error(
      `case-studies.ts: "${s.slug}" has contentStatus "${s.contentStatus}" but ${drafts} placeholder block(s). Update contentStatus.`,
    );
  }
}
