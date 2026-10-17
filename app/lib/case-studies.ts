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

/* Title + sentence: approach decisions, key features. `items` = what a
   feature covers, listed; when a custom entry's features carry them, the
   detail page shows the features as a bento of tiles. */
export type Point = { title: string; text: string; layer?: string; items?: string[] } & Draftable;
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
  /* The live site, linked from the detail hero (opens in a new tab) */
  website?: { url: string; label: string };
  /* "Website layout": real crops of the live homepage, in page order.
     `section` names the part of the page each crop shows. */
  layout?: { section: string; media: CaseStudyMedia }[];
  client?: ClientBrochure;
};

export type CustomStudy = CaseStudyBase & {
  category: "custom";
  /* Which code-built, labelled illustration the Visuals section draws
     until real screens exist (CustomCaseStudy.tsx). */
  illustration?: "generated-page" | "coupon-platform" | "lead-flow";
  /* Always illustrative — never a real config, prompt or credential.
     Optional: no code sample → none is drawn. */
  sample?: { caption: string; code: string };
  /* Always illustrative sample text for a phone-style message mock — never
     a real customer's name, number or message. */
  sampleMessage?: { sender: string; lines: string[]; code: string; link: string; caption: string };
  /* Security and testing, high level, as written in our own project
     documentation. `source` is shown on the tile so it never reads as an
     audit or certification. */
  assurance?: { source: string; security: Copy[]; testing: Copy[] };
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
    /* Screens of OUR website only. The villa renders are the client's and
       live in `client.gallery`, never here — the hero would otherwise show
       a render as if it were our screen. Live URL supplied by the user,
       2026-10-12; screenshots captured from it at the user's request, at
       1440 and 390 wide with Playwright. The layout crops leave out the pricing,
       payment plan, testimonial and contact sections. */
    visuals: {
      media: [
        { src: "/case-studies/auroma/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Auroma Holiday Villas homepage on a desktop: a render of the villa behind the headline “Own a villa near Auroville. Host it when you're away.”, the villa's key details and a Download Brochure button.", caption: "The live Auroma Holiday Villas homepage." },
        { src: "/case-studies/auroma/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline, the villa's key details and the Download Brochure button stacked in one column." },
      ],
    },
    website: { url: "https://www.auromaholidayvillas.com/", label: "auromaholidayvillas.com" },
    layout: [
      { section: "Designed for hosting", media: { src: "/case-studies/auroma/site-designed-for-hosting.webp", width: 1440, height: 820, alt: "Screenshot of the “Designed for hosting” section: a dark band with a bedroom render beside the line “Sleeps eight, in three ensuite bedrooms.”" } },
      { section: "Wellness design features", media: { src: "/case-studies/auroma/site-wellness-design-features.webp", width: 1440, height: 820, alt: "Screenshot of the wellness design features section: a headline over a row of three captioned renders of the living room, a bedroom and the plunge pool." } },
      { section: "The villa", media: { src: "/case-studies/auroma/site-gallery.webp", width: 1440, height: 820, alt: "Screenshot of the villa section: a short description of the villa, a row of five amenity cards and the start of a render gallery." } },
      { section: "Location", media: { src: "/case-studies/auroma/site-location.webp", width: 1440, height: 820, alt: "Screenshot of the location section: a dark band with the headline “Ten minutes from the Matrimandir. Fifteen from Pondicherry.”, an illustrated map and lists of nearby places." } },
      { section: "The brochure form", media: { src: "/case-studies/auroma/site-form.webp", width: 1440, height: 820, alt: "Screenshot of the “Get the brochure” section: the lead form with full name, WhatsApp number, city, investment range and an optional message, and a Send me the brochure button." } },
      { section: "Plans and areas", media: { src: "/case-studies/auroma/site-plans.webp", width: 1440, height: 820, alt: "Screenshot of the plans section: tabs for the ground, first and second floors and the terrace, above the ground floor plan." } },
    ],
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

  /* VERIFIED (user, 2026-10-13): a website project, live at
     https://www.drapeshoppe.co.in/. Everything else below is read off the
     live site (2026-10-13): a home furnishing showroom in Surat since 1990,
     run by Hiten Vakawala since 2012; showrooms at Bhagatalav and Bhatar;
     no forms — enquiries go through prefilled WhatsApp links, call links
     and Google Maps directions; a trade section for designers, architects,
     builders and hotels. NOT confirmed: what Vrattiks did on the site (its
     footer credits "Two Rabbits Marketing LLP"), the tech stack, and any
     result — so our role is the one draft() block, which keeps the page
     noindex until the user confirms it. Left out on purpose: the reviews,
     the owner's video, prices and sale offers, phone, address and GSTN. */
  {
    slug: "drape-shoppe",
    category: "website",
    title: "Drape Shoppe",
    kind: "Website",
    clientName: "Drape Shoppe",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "placeholder",
    location: "Surat",
    industry: { name: "Retail" },
    summary: fact(
      "A showroom website for Drape Shoppe, a home furnishing store in Surat, where every product category leads to a WhatsApp enquiry, a call or directions to the showroom.",
    ),
    tags: [
      fact("Home furnishing showroom"),
      fact("Surat"),
      fact("WhatsApp enquiry on every category"),
      fact("Call and directions buttons"),
      fact("Trade enquiries for designers"),
    ],
    keyFacts: [
      { label: "Project type", value: "Retail showroom website" },
      { label: "Location", value: "Surat" },
      { label: "Enquiries by", value: "WhatsApp, phone, directions" },
    ],
    overview: fact(
      "Drape Shoppe sells curtains, blinds, sofa and upholstery fabrics, custom furniture, mattresses, bed linen and décor from its showrooms in Surat.",
    ),
    description: [
      fact(
        "The website introduces Drape Shoppe's collections, its story, its showroom and its made-to-order furniture, then walks a visitor through visiting, choosing with an expert and taking the order home.",
      ),
      fact(
        "There is no form to fill in. Each product category opens a WhatsApp chat with a message already written, and the page also offers a call button and directions to the showroom.",
      ),
      fact("A separate section invites interior designers, architects, builders and hotels to ask about trade pricing."),
      draft("Vrattiks designed and built the website for Drape Shoppe."),
    ],
    brief: [],
    audiences: [],
    problem: fact("Fabric and furniture are bought in person, so the website's job is to get people talking to the store or walking into it."),
    objectives: [
      fact("Show every product category, each with its own WhatsApp enquiry."),
      fact("Make calling the store and finding the showroom one tap away."),
      fact("Give interior designers and other trade buyers their own way to enquire."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "WhatsApp on every category", text: "Each product card opens a WhatsApp chat with a message already written." },
      { title: "Call and directions", text: "Call and directions buttons sit in the opening screen." },
      { title: "Showroom gallery", text: "Photos of the showroom and its products, before a visitor walks in." },
      { title: "Made to order", text: "A section for custom furniture, with its own WhatsApp enquiry." },
      { title: "Trade enquiries", text: "A section for designers, architects, builders and hotels." },
    ],
    stack: [],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-13), at 1440 and 390 wide with Playwright, fixed overlays
       hidden on the crops and the phone screen. */
    visuals: {
      media: [
        { src: "/case-studies/drape-shoppe/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Drape Shoppe homepage on a desktop: a showroom photo behind the headline “Where you think, we create.”, Call Us and Get Directions buttons, and a sale banner along the bottom.", caption: "The live Drape Shoppe homepage." },
        { src: "/case-studies/drape-shoppe/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline, full-width Call Us and Get Directions buttons and the sale banner stacked in one column." },
      ],
    },
    website: { url: "https://www.drapeshoppe.co.in/", label: "drapeshoppe.co.in" },
    layout: [
      { section: "Collections", media: { src: "/case-studies/drape-shoppe/site-collections.webp", width: 1440, height: 760, alt: "Screenshot of the “Everything your home needs” section: product cards with photos for curtains and drapes, blinds, sofa and upholstery fabrics, and custom furniture." } },
      { section: "The showroom", media: { src: "/case-studies/drape-shoppe/site-showroom.webp", width: 1440, height: 760, alt: "Screenshot of the “Come see it in person” section: a short invitation to visit, above three large photos of the showroom floor." } },
      { section: "A closer look", media: { src: "/case-studies/drape-shoppe/site-gallery.webp", width: 1440, height: 760, alt: "Screenshot of the “A closer look” gallery: a grid of product photos including chairs, cushions, sheer curtains and blinds." } },
      { section: "Made to order", media: { src: "/case-studies/drape-shoppe/site-custom-furniture.webp", width: 1440, height: 760, alt: "Screenshot of the “Built to your size, in your fabric” section: text about custom furniture and a Send us your requirement button beside a photo of a chair." } },
      { section: "How it works", media: { src: "/case-studies/drape-shoppe/site-process.webp", width: 1440, height: 760, alt: "Screenshot of the “Simple from start to finish” section: three numbered steps, visit the showroom, choose with an expert and take it home, beside a photo of fabric swatches." } },
    ],
    aboutClient: [
      fact(
        "Drape Shoppe is a home furnishing store in Surat. It opened in Bhagatalav in 1990, and since 2012 Hiten Vakawala has run it, with a showroom at Bhatar Char Rasta that brings fabric, furniture and décor together.",
      ),
      fact("It also supplies interior designers, architects, builders and hotels on full projects."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want a website that gets people into your store?",
      description: "Tell us what you sell and how customers reach you. We'll show you how we'd build it.",
    },
    seo: {
      title: "Drape Shoppe case study",
      description:
        "A showroom website for Drape Shoppe, a home furnishing store in Surat, built around WhatsApp enquiries, calls and directions.",
    },
  },

  /* VERIFIED (user, 2026-10-13): a website project, live at
     https://www.peturn.in/. The rest is read off the live site
     (2026-10-13), whose footer says "Designed and Developed by Vrattiks":
     Peturn is a business intelligence and analytics consulting company for
     retail and manufacturing businesses; the site has Home, About Us,
     Services, Why Us and Contact pages, an interactive demo dashboard with
     eight dashboard types (labelled demo data on the site), and enquiries
     through a consultation button, WhatsApp, phone and email — no form on
     the homepage. NOT stated: the tech stack and any result. Left out on
     purpose: the site's research statistics (third-party claims), the demo
     figures as numbers, and all contact details. */
  {
    slug: "peturn",
    category: "website",
    title: "Peturn",
    kind: "Website",
    clientName: "Peturn",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "India",
    industry: { name: "Consulting" },
    summary: fact(
      "A website for Peturn, a business intelligence consultancy, with a working demo dashboard that lets visitors see the kind of reports Peturn builds before they book a consultation.",
    ),
    tags: [
      fact("Business intelligence consultancy"),
      fact("Interactive demo dashboard"),
      fact("Eight dashboard types"),
      fact("Retail and manufacturing"),
      fact("Five pages"),
    ],
    keyFacts: [
      { label: "Project type", value: "Consulting firm website" },
      { label: "Pages", value: "Home, About, Services, Why Us, Contact" },
      { label: "Enquiries by", value: "Consultation, WhatsApp, phone, email" },
    ],
    overview: fact(
      "Peturn turns sales, inventory, procurement and profitability data into dashboards for retail and manufacturing businesses.",
    ),
    description: [
      fact("Vrattiks designed and developed the Peturn website."),
      fact(
        "The homepage opens with the problem Peturn solves, then a demo dashboard a visitor can click through, with eight dashboard types and tabs for KPIs, sales, inventory and profitability. The demo is clearly labelled as sample data.",
      ),
      fact(
        "Further down, the page covers the industries Peturn serves, what a client receives, a six-step process, the data sources Peturn works with, a before-and-after example and how client data is kept confidential.",
      ),
      fact("Visitors can book a free consultation, or reach Peturn on WhatsApp, by phone or by email, in India and the US."),
    ],
    brief: [],
    audiences: [],
    problem: fact("BI consulting is hard to picture from a description alone, so the site needs to show what a finished dashboard looks like."),
    objectives: [
      fact("Show a working example of a Peturn dashboard on the homepage."),
      fact("Explain the industries Peturn serves, what clients receive and how a project runs."),
      fact("Lead visitors to book a free consultation."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Interactive demo dashboard", text: "Eight dashboard types with tabs, filled with clearly labelled sample data." },
      { title: "Industry sections", text: "Separate panels for retail businesses and manufacturing companies." },
      { title: "Six-step process", text: "From business discovery to delivery and support." },
      { title: "Before and after", text: "An illustrative example of scattered reports becoming one view." },
      { title: "Several ways to enquire", text: "A consultation button, WhatsApp, phone and email." },
    ],
    stack: [],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-13), at 1440 and 390 wide with Playwright, fixed overlays
       (WhatsApp button, sticky nav on crops) hidden. */
    visuals: {
      media: [
        { src: "/case-studies/peturn/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Peturn homepage on a desktop: a dark navy hero with the headline “Turn business data into decisions leaders can act on.”, Book a Free Consultation and Explore Demo Dashboard buttons, and an illustration of glowing dashboards.", caption: "The live Peturn homepage." },
        { src: "/case-studies/peturn/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline, the introduction and both buttons stacked in one column." },
      ],
    },
    website: { url: "https://www.peturn.in/", label: "peturn.in" },
    layout: [
      { section: "The problem", media: { src: "/case-studies/peturn/site-problems.webp", width: 1440, height: 760, alt: "Screenshot of the section “Your Business Has Data. The Challenge Is Turning It into Direction.”: four cards for scattered spreadsheets, manual reporting, disconnected systems and slow decision-making." } },
      { section: "Demo dashboard", media: { src: "/case-studies/peturn/site-demo-dashboard.webp", width: 1440, height: 760, alt: "Screenshot of the “See Your Business More Clearly” section: buttons for eight dashboard types above a demo Executive KPI dashboard with tabs and sample metric cards." } },
      { section: "Industries", media: { src: "/case-studies/peturn/site-industries.webp", width: 1440, height: 760, alt: "Screenshot of the “Analytics Designed for Your Industry” section: two cards, one for retail businesses and one for manufacturing companies, each with a photo and a list of business types." } },
      { section: "What clients receive", media: { src: "/case-studies/peturn/site-deliverables.webp", width: 1440, height: 760, alt: "Screenshot of the “What You Receive” section: eight numbered cards, from a customised business dashboard to data source integration setup." } },
      { section: "How it works", media: { src: "/case-studies/peturn/site-process.webp", width: 1440, height: 760, alt: "Screenshot of the process section: a numbered timeline starting with business discovery, data collection and data preparation." } },
      { section: "Before and after", media: { src: "/case-studies/peturn/site-before-after.webp", width: 1440, height: 760, alt: "Screenshot of the “From Scattered Reports to One Clear View” section: a Before card and an After card side by side, labelled as an illustrative example." } },
    ],
    aboutClient: [
      fact(
        "Peturn is a business intelligence and analytics consulting company. It builds dashboards that help retail and manufacturing businesses see their sales, inventory, procurement and profitability in one place.",
      ),
      fact("The industries it serves range from supermarkets and fashion retail to FMCG, packaging and textile manufacturing."),
    ],
    services: ["website-development"],
    cta: {
      title: "Need a website that shows your work, not just describes it?",
      description: "Tell us what you offer and who you sell to. We'll show you how we'd build it.",
    },
    seo: {
      title: "Peturn case study",
      description:
        "How Vrattiks designed and developed the Peturn website: a business intelligence consultancy site with an interactive demo dashboard.",
    },
  },

  /* VERIFIED (user, 2026-10-13): a website project, live at
     https://www.chandanomlet.com/. The rest is read off the live site
     (2026-10-13), whose footer says "Website by Vrattiks": Chandan Omlet
     Center is an egg restaurant in Bharthana, Surat; the site has Home,
     Our Menu, Franchises, About and Contacts pages; the homepage carries
     the menu (starters and omelets, rice and roti), the special items,
     fry/regular/new item lists, a "Visit now" directions link and the
     opening hours. Next.js was read from the page source (`__NEXT_DATA__`),
     not stated by the user. Left out on purpose: the restaurant's own
     superlatives and dish counts as our claims, the customer reviews, and
     the address and phone number. No outcomes stated. */
  {
    slug: "chandan-omlet",
    category: "website",
    title: "Chandan Omlet",
    kind: "Website",
    clientName: "Chandan Omlet Center",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Surat",
    industry: { name: "Restaurants & Food", slug: "restaurants-food" },
    summary: fact(
      "A Next.js website for Chandan Omlet Center, an egg restaurant in Surat, that puts the full menu, the house specials and directions to the restaurant on one page.",
    ),
    tags: [
      fact("Egg restaurant"),
      fact("Surat"),
      fact("Next.js"),
      fact("Full menu online"),
      fact("Directions in one tap"),
    ],
    keyFacts: [
      { label: "Project type", value: "Restaurant website" },
      { label: "Location", value: "Surat" },
      { label: "Pages", value: "Home, Menu, Franchises, About, Contacts" },
      { label: "Built with", value: "Next.js" },
    ],
    overview: fact(
      "Chandan Omlet Center is an egg restaurant in Surat, serving omelets, egg curries in red, green and white gravies, rice dishes and fry items.",
    ),
    description: [
      fact("Vrattiks built the Chandan Omlet website with Next.js."),
      fact(
        "The homepage opens with a full-width food photo, then introduces the restaurant and three signature dishes. The menu follows, with each dish named and described, grouped into starters and omelets, and rice and roti.",
      ),
      fact(
        "A “Visit now” band links straight to directions in Google Maps. Below it come the house specials with photos, then the fry, regular and new items, and the opening hours and contact details.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("People choosing where to eat want to see the menu and know how to get there before they set out."),
    objectives: [
      fact("Put the full menu online, with a short description of every dish."),
      fact("Show the restaurant's special dishes with photos."),
      fact("Make directions to the restaurant one tap away."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Full menu online", text: "Every dish named and described, grouped by section." },
      { title: "House specials", text: "Signature dishes shown with photos." },
      { title: "Directions in one tap", text: "A “Visit now” link opens directions in Google Maps." },
      { title: "Opening hours and contact", text: "Opening hours, phone and social links at the foot of the homepage." },
    ],
    /* Read from the live page source (2026-10-13) */
    stack: [{ name: "Next.js", role: "The framework the site is built on" }],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-13), at 1440 and 390 wide with Playwright, the sticky nav
       hidden on the crops. */
    visuals: {
      media: [
        { src: "/case-studies/chandan-omlet/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Chandan Omlet homepage on a desktop: a close-up photo of a cheese omelet behind the headline “Surat's best egg restaurant”, with the navigation along the top.", caption: "The live Chandan Omlet homepage." },
        { src: "/case-studies/chandan-omlet/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the logo and menu button above the omelet photo and the headline." },
      ],
    },
    website: { url: "https://www.chandanomlet.com/", label: "chandanomlet.com" },
    layout: [
      { section: "About the restaurant", media: { src: "/case-studies/chandan-omlet/site-about.webp", width: 1440, height: 760, alt: "Screenshot of the about section: a photo of an egg curry in a green dish beside a short introduction and three signature dish names." } },
      { section: "The menu", media: { src: "/case-studies/chandan-omlet/site-menu.webp", width: 1440, height: 760, alt: "Screenshot of the “Starters & Omelet” menu: two columns of dish names, each with a one-line description." } },
      { section: "Visit now", media: { src: "/case-studies/chandan-omlet/site-visit.webp", width: 1440, height: 760, alt: "Screenshot of the “Hungry already?” band: a large food photo with a Visit now button." } },
      { section: "House specials", media: { src: "/case-studies/chandan-omlet/site-specials.webp", width: 1440, height: 760, alt: "Screenshot of the “Chandan special items” section: three dishes, red tadka, green tadka and Surati taka tak, each with a photo and a short description." } },
      { section: "Fry items", media: { src: "/case-studies/chandan-omlet/site-fry-items.webp", width: 1440, height: 760, alt: "Screenshot of the fry items section: a photo of fried eggs in a pan beside a list of fry dishes." } },
    ],
    aboutClient: [
      fact(
        "Chandan Omlet Center is an egg restaurant in Bharthana, Surat. Its menu runs from omelets and starters to egg curries in red, green and white gravies, rice dishes and fry items.",
      ),
      fact("It is open every day from 11:30 AM to 11:30 PM."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want a website that brings diners to your door?",
      description: "Tell us about your restaurant and your menu. We'll show you how we'd build it.",
    },
    seo: {
      title: "Chandan Omlet case study",
      description:
        "How Vrattiks built a Next.js website for Chandan Omlet Center, an egg restaurant in Surat, with its full menu, house specials and directions.",
    },
  },

  /* User request (2026-10-15): add https://www.tokicha.in/ to Website
     Projects. Everything is read off the live site (2026-10-15), whose
     footer says "Website by vrattiks.io": Tokicha is a tea café brand that
     started in Surat; the site has Home, Our Menu, Franchise, Our Stores,
     About Us and Contact pages; the homepage shows menu highlights, the
     brand's story and a franchise section. React was read from the page
     (a React root on #root), not stated by the user. Left out on purpose:
     the site's counts (teas, beverages, stores, customers), the franchise
     investment and ROI figures, the address, phone and email. */
  {
    slug: "tokicha",
    category: "website",
    title: "Tokicha",
    kind: "Website",
    clientName: "Tokicha",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Surat",
    industry: { name: "Restaurants & Food", slug: "restaurants-food" },
    summary: fact(
      "A website for Tokicha, a tea café brand from Surat, that shows customers the menu and the stores, and gives would-be franchise partners their own path to enquire.",
    ),
    tags: [
      fact("Tea café brand"),
      fact("Surat"),
      fact("React"),
      fact("Menu highlights"),
      fact("Franchise enquiries"),
    ],
    keyFacts: [
      { label: "Project type", value: "Café brand website" },
      { label: "Location", value: "Surat" },
      { label: "Pages", value: "Home, Menu, Franchise, Stores, About, Contact" },
      { label: "Built with", value: "React" },
    ],
    overview: fact(
      "Tokicha is a tea café brand that started in Surat, serving tea, coffee, mocktails and food such as pizza, nachos and noodles.",
    ),
    description: [
      fact("Vrattiks built the Tokicha website with React."),
      fact(
        "The homepage opens with two choices, Explore Menu and Franchise With Us, then shows six menu highlights, each with a photo, its category and a one-line description.",
      ),
      fact(
        "Below the menu comes the brand's story, then a franchise section that sets out the support a partner gets and links to the franchise models.",
      ),
      fact("Separate pages cover the full menu, the franchise, the stores, the brand and contact details."),
    ],
    brief: [],
    audiences: [],
    problem: fact("A café brand that is growing through franchising speaks to two audiences at once: customers looking for a cup of tea, and business owners looking for a café to run."),
    objectives: [
      fact("Show the menu with photos, so customers know what to order."),
      fact("Point customers to the nearest store."),
      fact("Give would-be franchise partners their own page and a clear way to get in touch."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Menu highlights", text: "Six dishes and drinks on the homepage, each with a photo and a short description." },
      { title: "Two paths from the first screen", text: "Explore Menu for customers, Franchise With Us for partners." },
      { title: "Franchise section", text: "The support a partner gets, with a link to the franchise models." },
      { title: "Store and menu pages", text: "The full menu and the store list each have a page of their own." },
    ],
    /* Read from the live page (2026-10-15) */
    stack: [{ name: "React", role: "The library the site is built with" }],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-15), at 1440 and 390 wide with Playwright, the sticky nav
       hidden on the crops. */
    visuals: {
      media: [
        { src: "/case-studies/tokicha/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Tokicha homepage on a desktop: the headline “Tokicha – Brewing Happiness in Every Sip” beside a large Tokicha sign, with Explore Menu and Franchise With Us buttons.", caption: "The live Tokicha homepage." },
        { src: "/case-studies/tokicha/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline and both buttons stacked in one column." },
      ],
    },
    website: { url: "https://www.tokicha.in/", label: "tokicha.in" },
    layout: [
      { section: "Menu highlights", media: { src: "/case-studies/tokicha/site-menu.webp", width: 1440, height: 760, alt: "Screenshot of the “Popular Menu Highlights” section: six cards with photos of ginger pudina tea, a cappuccino, an orange mojito, a veggie pizza, nachos and noodles." } },
      { section: "Our story", media: { src: "/case-studies/tokicha/site-story.webp", width: 1440, height: 760, alt: "Screenshot of the “Our Story Began with a Dream” section beside four figure cards, above the start of the brown franchise band." } },
    ],
    aboutClient: [
      fact(
        "Tokicha is a tea café brand that started in Surat. Its cafés serve tea, coffee and mocktails alongside pizzas, sandwiches, pasta and desserts.",
      ),
      fact("It is growing through franchising, with stores in more than one location."),
    ],
    services: ["website-development"],
    cta: {
      title: "Selling to customers and franchise partners at once?",
      description: "Tell us who you need to reach. We'll show you how we'd build the site.",
    },
    seo: {
      title: "Tokicha case study",
      description:
        "How Vrattiks built a React website for Tokicha, a tea café brand from Surat, with its menu, stores and franchise enquiries.",
    },
  },

  /* User request (2026-10-15): add https://www.cafebeats.in/ to Website
     Projects. Everything is read off the live site (2026-10-15), whose
     footer says "Made by Vrattiks": CafeBeats is a café brand (CafeBeats
     Ind Pvt Ltd, Surat) with outlets in Sarthana and Mota Varachha in Surat
     and in Vapi; the site has Home, About Us, Our Menu, Franchise, Our
     Stores and Contact Us pages, a three-slide hero, a WhatsApp button and a
     Start Franchise tab. React was read from the page, not stated by the
     user. Left out on purpose: the awards photos and reels (people), the
     address, phone and email. */
  {
    slug: "cafebeats",
    category: "website",
    title: "CafeBeats",
    kind: "Website",
    clientName: "CafeBeats",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Surat",
    industry: { name: "Restaurants & Food", slug: "restaurants-food" },
    summary: fact(
      "A website for CafeBeats, a café brand with outlets in Surat and Vapi, that leads visitors to the menu and the nearest outlet, with WhatsApp and franchise enquiries a tap away on every screen.",
    ),
    tags: [
      fact("Café brand"),
      fact("Surat and Vapi"),
      fact("React"),
      fact("WhatsApp button"),
      fact("Franchise enquiries"),
    ],
    keyFacts: [
      { label: "Project type", value: "Café brand website" },
      { label: "Outlets", value: "Sarthana and Mota Varachha in Surat, Vapi" },
      { label: "Pages", value: "Home, About, Menu, Franchise, Stores, Contact" },
      { label: "Built with", value: "React" },
    ],
    overview: fact(
      "CafeBeats is a café brand serving coffee, tea, shakes and food, with outlets in Surat and Vapi.",
    ),
    description: [
      fact("Vrattiks built the CafeBeats website with React."),
      fact(
        "The homepage opens with a three-slide hero, every slide with buttons to the menu and the store list. Below it come the brand's awards, its latest reels, the products customers can take home and a card for each outlet.",
      ),
      fact(
        "A WhatsApp button and a Start Franchise tab stay on screen as visitors scroll, so either enquiry is one tap away.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("Visitors to a café website want the menu and the nearest outlet quickly, while franchise enquiries need a route that never gets in their way."),
    objectives: [
      fact("Lead visitors to the menu and the outlet nearest to them."),
      fact("Keep WhatsApp and franchise enquiries one tap away on every screen."),
      fact("Show the brand's awards, reels and products in one place."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Three-slide hero", text: "Every slide has buttons to the menu and the store list." },
      { title: "Outlet cards", text: "One card per outlet, with a photo and its location." },
      { title: "Always-on enquiries", text: "A WhatsApp button and a Start Franchise tab stay on screen." },
      { title: "Reels and products", text: "The brand's latest reels and its take-home products on the homepage." },
    ],
    /* Read from the live page (2026-10-15) */
    stack: [{ name: "React", role: "The library the site is built with" }],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-15), at 1440 and 390 wide with Playwright, on the hero's
       first slide; the WhatsApp button and franchise tab hidden. */
    visuals: {
      media: [
        { src: "/case-studies/cafebeats/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the CafeBeats homepage on a desktop: a dark photo of a coffee cup and beans behind the headline “Where Coffee Meets Rhythm”, with Explore Menu and Find Our Stores buttons.", caption: "The live CafeBeats homepage." },
        { src: "/case-studies/cafebeats/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline and both buttons stacked over the dark coffee photo." },
      ],
    },
    website: { url: "https://www.cafebeats.in/", label: "cafebeats.in" },
    layout: [
      { section: "Take-home products", media: { src: "/case-studies/cafebeats/site-products.webp", width: 1440, height: 760, alt: "Screenshot of the “Our Delicious Products” section: four photos of a takeaway coffee cup, two mocktails and a plated dish." } },
      { section: "Outlets", media: { src: "/case-studies/cafebeats/site-outlets.webp", width: 1440, height: 760, alt: "Screenshot of the “CafeBeats Outlets” section: three cards with interior photos for Sarthana and Mota Varachha in Surat, and Vapi." } },
    ],
    aboutClient: [
      fact(
        "CafeBeats is a café brand run by CafeBeats Ind Pvt Ltd in Surat. It serves coffee, tea, shakes and food, and has outlets in Sarthana and Mota Varachha in Surat, and in Vapi.",
      ),
      fact("It also offers franchises."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want a café website that sends people to your door?",
      description: "Tell us about your outlets and your menu. We'll show you how we'd build it.",
    },
    seo: {
      title: "CafeBeats case study",
      description:
        "How Vrattiks built a React website for CafeBeats, a café brand in Surat and Vapi, with its menu, outlets and WhatsApp and franchise enquiries.",
    },
  },

  /* User request (2026-10-15): add https://www.tbsoni.com/ to Website
     Projects. Everything is read off the live site (2026-10-15), whose
     footer says "Made by Vrattiks": Thakarshibhai B. Soni Jewellers (TBS
     Jewellers) is a jewellery store in Mota Bazar, Navsari, established in
     1951; the site has Home, About Us, Products, Custom Design and Contact
     pages and a Call Now button in the header. React was read from the
     page, not stated by the user. Left out on purpose: the store's own
     figures (years, generations, families, hallmarking percentage) and
     trust claims as ours, the street address and phone. */
  {
    slug: "tbs-jewellers",
    category: "website",
    title: "TBS Jewellers",
    kind: "Website",
    clientName: "Thakarshibhai B. Soni Jewellers",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Navsari",
    industry: { name: "Jewellery" },
    summary: fact(
      "A website for Thakarshibhai B. Soni Jewellers, a jewellery store in Navsari, that shows its collections, takes custom design requests and puts a call to the store one tap away.",
    ),
    tags: [
      fact("Jewellery store"),
      fact("Navsari"),
      fact("React"),
      fact("Custom design requests"),
      fact("Call Now in the header"),
    ],
    keyFacts: [
      { label: "Project type", value: "Jewellery store website" },
      { label: "Location", value: "Navsari" },
      { label: "Pages", value: "Home, About, Products, Custom Design, Contact" },
      { label: "Built with", value: "React" },
    ],
    overview: fact(
      "Thakarshibhai B. Soni Jewellers sells gold, diamond, silver and platinum jewellery from its store in Navsari, and makes pieces to order.",
    ),
    description: [
      fact("Vrattiks built the TBS Jewellers website with React."),
      fact(
        "The homepage opens on a photo of bridal necklaces with three choices: explore the jewellery, start a custom design or visit the store. It then introduces the store, gives six reasons to choose it and shows the four collections.",
      ),
      fact(
        "A custom design band invites visitors to share a reference image or an idea, and a Call Now button stays in the header on every page.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("Jewellery is bought in person and on trust, so the website's job is to show the collections and get people calling or visiting the store."),
    objectives: [
      fact("Show the four collections: gold, diamond, silver and platinum."),
      fact("Give customers a way to ask for a piece made to their own design."),
      fact("Make calling and visiting the store one tap away."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Collections", text: "Gold, diamond, silver and platinum, each with its own photo." },
      { title: "Custom design", text: "A page and a homepage band for pieces made to a customer's own design." },
      { title: "Call Now", text: "A call button in the header on every page." },
      { title: "Six reasons to choose the store", text: "A short grid near the top of the homepage." },
    ],
    /* Read from the live page (2026-10-15) */
    stack: [{ name: "React", role: "The library the site is built with" }],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-15), at 1440 and 390 wide with Playwright, the fixed nav
       hidden on the crops. */
    visuals: {
      media: [
        { src: "/case-studies/tbs-jewellers/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the TBS Jewellers homepage on a desktop: gold necklaces on dark red stands behind the headline “Timeless Jewellery, Crafted with Trust”, with Explore Jewellery, Custom Design and Visit Store buttons.", caption: "The live TBS Jewellers homepage." },
        { src: "/case-studies/tbs-jewellers/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline and the three buttons stacked over the necklace photo." },
      ],
    },
    website: { url: "https://www.tbsoni.com/", label: "tbsoni.com" },
    layout: [
      { section: "Why choose the store", media: { src: "/case-studies/tbs-jewellers/site-why-us.webp", width: 1440, height: 760, alt: "Screenshot of the “Why Choose TBS Jewellers” section: six small cards in two rows, each with an icon, a title and one line of text." } },
      { section: "Collections", media: { src: "/case-studies/tbs-jewellers/site-collections.webp", width: 1440, height: 760, alt: "Screenshot of the “Our Jewellery Collections” section: four photo cards for gold, diamond, silver and platinum jewellery." } },
      { section: "Custom design", media: { src: "/case-studies/tbs-jewellers/site-custom-design.webp", width: 1440, height: 760, alt: "Screenshot of the “Your Design. Our Craftsmanship.” band: a short invitation to share a design idea and a Start Custom Design button." } },
    ],
    aboutClient: [
      fact(
        "Thakarshibhai B. Soni Jewellers, also known as TBS Jewellers, is a jewellery store in Mota Bazar, Navsari, established in 1951.",
      ),
      fact("It sells gold, diamond, silver and platinum jewellery, from everyday pieces to bridal sets, and makes jewellery to order."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want a website that brings customers to your counter?",
      description: "Tell us what you sell and how customers reach you. We'll show you how we'd build it.",
    },
    seo: {
      title: "TBS Jewellers case study",
      description:
        "How Vrattiks built a React website for Thakarshibhai B. Soni Jewellers in Navsari, with its collections, custom design requests and a call button.",
    },
  },

  /* User request (2026-10-15): add https://www.recorehardware.in/ to
     Website Projects. Everything is read off the live site (2026-10-15),
     whose footer says "Designed & Developed by Vrattiks": REcore Hardware
     supplies interior and furniture hardware wholesale from Bhatar, Surat,
     since 2008; the site is one page (Home, Products, Featured, About,
     Gallery, Contact) with twenty product categories, eight featured
     products, a catalogue PDF download, a WhatsApp link and an enquiry form
     (fields below, as marked on the site). NOT stated: the tech stack (not
     identifiable from the page) and any result. Left out on purpose: the
     address, phone numbers and email, and the photo of people in About. */
  {
    slug: "recore-hardware",
    category: "website",
    title: "REcore Hardware",
    kind: "Website",
    clientName: "REcore Hardware",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Surat",
    industry: { name: "Wholesale hardware" },
    summary: fact(
      "A one-page website for REcore Hardware, a furniture hardware wholesaler in Surat, that lays out twenty product lines, hands over the catalogue as a download and collects trade enquiries through a form.",
    ),
    tags: [
      fact("Hardware wholesaler"),
      fact("Surat"),
      fact("Catalogue download"),
      fact("Trade enquiry form"),
      fact("Twenty product lines"),
    ],
    keyFacts: [
      { label: "Project type", value: "Wholesale supplier website" },
      { label: "Location", value: "Surat" },
      { label: "Enquiries by", value: "Enquiry form, WhatsApp, catalogue download" },
    ],
    overview: fact(
      "REcore Hardware supplies interior and furniture hardware, from drawer systems and hinges to handles, locks and aluminium profiles, to retailers, showrooms and contractors.",
    ),
    description: [
      fact("Vrattiks designed and developed the REcore Hardware website."),
      fact(
        "It is a single page. It opens with two buttons, one to download the catalogue as a PDF and one to browse the products, then sets out twenty product categories and eight featured products, each with its key sizes and finishes and an Enquire button.",
      ),
      fact(
        "Further down come the company's background, why trade buyers choose it, a gallery of the hardware fitted in real interiors, and the enquiry form.",
      ),
      fact(
        "The form asks for name, phone, firm or shop name, city and monthly hardware requirement, with email, product interest and a message optional, so every enquiry arrives ready to price.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("Trade buyers want to see the full range and get a price for their quantities, without a sales call first."),
    objectives: [
      fact("Show every product line on one page."),
      fact("Let buyers download the catalogue without asking for it."),
      fact("Collect enquiries with the details needed to quote."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Twenty product categories", text: "Every line in the range, each with its main variants." },
      { title: "Featured products", text: "Eight products with sizes and finishes, each with an Enquire button." },
      { title: "Catalogue download", text: "The catalogue downloads as a PDF straight from the page." },
      { title: "Trade enquiry form", text: "Asks for the firm, the city and the monthly requirement, so a quote can follow." },
      { title: "Installed gallery", text: "Photos of the hardware fitted in kitchens, wardrobes, bedrooms and entrances." },
    ],
    stack: [],
    landingPages: [],
    formFields: [
      { name: "Name", required: true },
      { name: "Phone", required: true },
      { name: "Email", required: false },
      { name: "Firm or shop name", required: true },
      { name: "City", required: true },
      { name: "Monthly hardware requirement", required: true },
      { name: "Product interest", required: false },
      { name: "Message", required: false },
    ],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-15), at 1440 and 390 wide with Playwright, the WhatsApp
       button and fixed nav hidden on the crops. */
    visuals: {
      media: [
        { src: "/case-studies/recore-hardware/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the REcore Hardware homepage on a desktop: a dark kitchen photo behind the headline “REcore Hardware, The One Stop Interior Solution”, with Download Catalogue and Browse Products buttons.", caption: "The live REcore Hardware homepage." },
        { src: "/case-studies/recore-hardware/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the logo, headline, introduction and both buttons stacked over the kitchen photo." },
      ],
    },
    website: { url: "https://www.recorehardware.in/", label: "recorehardware.in" },
    layout: [
      { section: "Product categories", media: { src: "/case-studies/recore-hardware/site-categories.webp", width: 1440, height: 760, alt: "Screenshot of the “Product Categories” section: a grid of small cards, each with an icon, a product line such as telescopic slide or auto hinges, and its variants." } },
      { section: "Featured products", media: { src: "/case-studies/recore-hardware/site-featured.webp", width: 1440, height: 760, alt: "Screenshot of the “Featured Products” section: product photos of a drawer box, a telescopic slide, a hinge and a kitchen corner unit, each with sizes and an Enquire link." } },
      { section: "Why REcore", media: { src: "/case-studies/recore-hardware/site-why-recore.webp", width: 1440, height: 760, alt: "Screenshot of the dark “Built to be specified with confidence” band: four columns on tested quality, replacement support, dealers across Gujarat and bulk pricing." } },
      { section: "Gallery", media: { src: "/case-studies/recore-hardware/site-gallery.webp", width: 1440, height: 760, alt: "Screenshot of the gallery: photos of wardrobes, door handles, kitchen cabinets and a hydraulic bed frame fitted in real interiors." } },
    ],
    aboutClient: [
      fact(
        "REcore Hardware is a furniture and interior hardware supplier in Bhatar, Surat, trading since 2008. It sells wholesale to hardware retailers, interior showrooms and contractors across Gujarat.",
      ),
      fact("Its range covers twenty product lines, from soft-close drawer systems and hinges to mortise handles, brass locks and aluminium profiles."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want trade enquiries that arrive ready to price?",
      description: "Tell us what you sell and who buys it. We'll show you how we'd build it.",
    },
    seo: {
      title: "REcore Hardware case study",
      description:
        "How Vrattiks designed and developed a one-page website for REcore Hardware, a Surat hardware wholesaler, with a catalogue download and a trade enquiry form.",
    },
  },

  /* User request (2026-10-15): add https://amiras.in/ to Website Projects.
     The rest is read off the live site (2026-10-15): an online store on
     Shopify (read from the page's scripts) for Amiras papad, khakhra,
     instant mixes, masala, mukhwas and pickle, from MPS Masala & Mukhwas
     in Navsari, which the site says started in 1990. Unlike the other
     sites, its footer credits no one ("Copyright © 2026 by Amiras Foods"),
     so our role is the one draft() block, which keeps the page noindex
     until the user confirms what Vrattiks did. Left out on purpose:
     prices and discounts, the customer testimonials, the address and
     email. The live site has no meta description. */
  {
    slug: "amiras",
    category: "website",
    title: "Amiras",
    kind: "Website",
    clientName: "Amiras Foods",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "placeholder",
    location: "Navsari",
    industry: { name: "Packaged food" },
    summary: fact(
      "An online store for Amiras, a papad and mukhwas maker from Navsari, where customers browse by product category and buy straight from the site.",
    ),
    tags: [
      fact("Online store"),
      fact("Navsari"),
      fact("Shopify"),
      fact("Shop by category"),
      fact("Gujarati banners"),
    ],
    keyFacts: [
      { label: "Project type", value: "Online food store" },
      { label: "Location", value: "Navsari" },
      { label: "Sells", value: "Papad, khakhra, instant mixes, masala, mukhwas, pickle" },
      { label: "Built with", value: "Shopify" },
    ],
    overview: fact(
      "Amiras sells papad, khichiya papad, khakhra, instant flour mixes, masala, mukhwas and pickle online.",
    ),
    description: [
      draft("Vrattiks built the Amiras online store on Shopify."),
      fact(
        "The homepage opens with Gujarati-language banners, then shortcuts to five product categories, each with a Buy Now button. Trending products follow, then a short note on the brand.",
      ),
      fact(
        "The menu groups the full range by type: papad, instant mixes, masala, mukhwas and pickle. Search, an account area and a cart sit in the header, and on phones a bar along the bottom keeps Home, Shop, Search and Account in reach.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("A food brand with a wide range needs customers to find the product they want and pay for it without calling the shop."),
    objectives: [
      fact("Sell the full range online, grouped by product type."),
      fact("Let customers jump straight to a category from the homepage."),
      fact("Make shopping easy on a phone."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Shop by category", text: "Five category shortcuts on the homepage, each with a Buy Now button." },
      { title: "Grouped menu", text: "Papad, instant mixes, masala, mukhwas and pickle, each with its sub-ranges." },
      { title: "Gujarati banners", text: "Homepage banners written in Gujarati for local customers." },
      { title: "Phone shopping bar", text: "Home, Shop, Search and Account stay along the bottom on phones." },
    ],
    /* Read from the live page's scripts (2026-10-15) */
    stack: [{ name: "Shopify", role: "The platform the store runs on" }],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-15), at 1440 and 390 wide with Playwright, with the banner
       slider at rest. */
    visuals: {
      media: [
        { src: "/case-studies/amiras/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Amiras homepage on a desktop: the store header with the category menu, search and cart above a Gujarati banner showing jars of mukhwas.", caption: "The live Amiras homepage." },
        { src: "/case-studies/amiras/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the logo and cart above the banner, and Home, Shop, Search and Account along the bottom." },
      ],
    },
    website: { url: "https://amiras.in/", label: "amiras.in" },
    layout: [
      { section: "Product categories", media: { src: "/case-studies/amiras/site-categories.webp", width: 1440, height: 760, alt: "Screenshot of the product category row: round photos of papad, khichiya papad, khakhra, an instant mix and mukhwas, each with a Buy Now button." } },
      { section: "Trending products", media: { src: "/case-studies/amiras/site-banner.webp", width: 1440, height: 760, alt: "Screenshot of a Gujarati banner for Amiras khichiya papad, above the “Trending Products” heading and the top of the product cards." } },
    ],
    aboutClient: [
      fact(
        "Amiras is the papad and mukhwas brand of MPS Masala & Mukhwas in Navsari, Gujarat. The business started in 1990 as a local papad maker.",
      ),
      fact("Its range now runs from papad, khichiya papad and khakhra to instant flour mixes, masala, mukhwas and pickle."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want customers to order straight from your website?",
      description: "Tell us what you sell and how you deliver. We'll show you how we'd build your store.",
    },
    seo: {
      title: "Amiras case study",
      description:
        "An online store for Amiras, a papad and mukhwas brand from Navsari, with shop-by-category browsing and phone-friendly shopping.",
    },
  },

  /* User request (2026-10-17): add https://www.gurujitutorials.com/ to
     Website Projects. Everything is read off the live site (2026-10-17),
     whose footer says "Created by vrattiks.io": Guruji Tutorials is a NEET
     coaching institute in Bhavnagar teaching Physics, Chemistry and Biology
     in English and Gujarati medium, with a hostel; the site is one main
     page (About, Subjects, Facilities, Contact) whose enquiry form opens
     WhatsApp with the message pre-filled (fields below, as marked on the
     site). React was read from the page, not stated by the user. Left out
     on purpose: the site's own figures (batch year, subject and medium
     counts), the address and phone. */
  {
    slug: "guruji-tutorials",
    category: "website",
    title: "Guruji Tutorials",
    kind: "Website",
    clientName: "Guruji Tutorials",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Bhavnagar",
    industry: { name: "EdTech & Coaching", slug: "edtech-coaching" },
    summary: fact(
      "A website for Guruji Tutorials, a NEET coaching institute in Bhavnagar, that sets out its subjects, teaching approach and hostel, and turns every enquiry into a call or a WhatsApp chat.",
    ),
    tags: [
      fact("Coaching institute"),
      fact("Bhavnagar"),
      fact("React"),
      fact("WhatsApp enquiry form"),
      fact("English and Gujarati medium"),
    ],
    keyFacts: [
      { label: "Project type", value: "Coaching institute website" },
      { label: "Location", value: "Bhavnagar" },
      { label: "Enquiries by", value: "Call, WhatsApp, enquiry form" },
      { label: "Built with", value: "React" },
    ],
    overview: fact(
      "Guruji Tutorials is a coaching institute in Bhavnagar that prepares students for NEET, teaching Physics, Chemistry and Biology in English and Gujarati medium, with a hostel for students from outside the city.",
    ),
    description: [
      fact("Vrattiks built the Guruji Tutorials website with React."),
      fact(
        "The first screen leads with the goal of becoming a doctor and puts two buttons, Call and WhatsApp, right under the headline.",
      ),
      fact(
        "Below come the three NEET subjects, the institute's four-step teaching approach, six reasons to choose it and a section on the hostel.",
      ),
      fact(
        "The enquiry form asks for name, phone, medium and a message, then opens WhatsApp with the message already written, so every enquiry lands in a chat the institute already uses.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("Parents and students compare coaching institutes carefully, and most want to talk to someone before they enrol."),
    objectives: [
      fact("Explain the subjects, the teaching approach and the hostel in one place."),
      fact("Make it clear that classes run in both English and Gujarati medium."),
      fact("Turn every enquiry into a call or a WhatsApp chat."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Call and WhatsApp up front", text: "Both buttons sit under the headline on the first screen." },
      { title: "WhatsApp enquiry form", text: "Name, phone, medium and message, sent as a ready-written WhatsApp message." },
      { title: "Teaching approach", text: "Four steps, from the NCERT base to mentorship outside class hours." },
      { title: "Hostel section", text: "Rooms, meals and study hours for outstation students, with a button to ask about availability." },
    ],
    /* Read from the live page (2026-10-17) */
    stack: [{ name: "React", role: "The library the site is built with" }],
    landingPages: [],
    formFields: [
      { name: "Name", required: true },
      { name: "Phone", required: true },
      { name: "Medium", required: false },
      { name: "Message", required: false },
    ],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-17), at 1440 and 390 wide with Playwright, the floating
       buttons hidden on the crops. */
    visuals: {
      media: [
        { src: "/case-studies/guruji-tutorials/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Guruji Tutorials homepage on a desktop: the headline “Realise your dream to become a Doctor with Guruji Tutorials” beside a photo of a smiling doctor, with Call and WhatsApp Us buttons below.", caption: "The live Guruji Tutorials homepage." },
        { src: "/case-studies/guruji-tutorials/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline, the NEET coaching badge and both buttons stacked in one column." },
      ],
    },
    website: { url: "https://www.gurujitutorials.com/", label: "gurujitutorials.com" },
    layout: [
      { section: "Subjects", media: { src: "/case-studies/guruji-tutorials/site-subjects.webp", width: 1440, height: 760, alt: "Screenshot of the “NEET Subjects We Cover” section: three cards for Physics, Chemistry and Biology, above the start of the About section." } },
      { section: "Why choose the institute", media: { src: "/case-studies/guruji-tutorials/site-features.webp", width: 1440, height: 760, alt: "Screenshot of six cards on the batch, the two mediums, the faculty, tests, batch size and doubt-solving sessions, above a dark blue hostel banner." } },
      { section: "Hostel", media: { src: "/case-studies/guruji-tutorials/site-hostel.webp", width: 1440, height: 760, alt: "Screenshot of the “Hostel Facilities Available” section: a short description and three points beside a photo of a hostel room, with an Ask about hostel availability button." } },
    ],
    aboutClient: [
      fact("Guruji Tutorials is a coaching institute in Bhavnagar, Gujarat, focused entirely on NEET preparation."),
      fact("It teaches Physics, Chemistry and Biology in English and Gujarati medium, and offers hostel rooms for students from outside the city."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want enquiries from parents to land on WhatsApp?",
      description: "Tell us how families reach you today. We'll show you how we'd build it.",
    },
    seo: {
      title: "Guruji Tutorials case study",
      description:
        "How Vrattiks built a React website for Guruji Tutorials, a NEET coaching institute in Bhavnagar, with call, WhatsApp and enquiry form routes.",
    },
  },

  /* User request (2026-10-17): add https://www.kalpatarucollection.com/ to
     Website Projects. Everything is read off the live site (2026-10-17),
     whose footer says "Created by Vrattiks.io": Kalpataru Collection is a
     fashion boutique from Surat with stores in Bardoli and Kadodara; the
     site is one page (Home, Collection, Reels, Stores, About, Contact) with
     a WhatsApp link and a Get Directions button per store. React was read
     from the page, not stated by the user. Left out on purpose: the site's
     own figures (designs, customers, years) and the stores' Google ratings,
     the reels crop, the address, phone and email. */
  {
    slug: "kalpataru-collection",
    category: "website",
    title: "Kalpataru Collection",
    kind: "Website",
    clientName: "Kalpataru Collection",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Surat",
    industry: { name: "Fashion retail" },
    summary: fact(
      "A website for Kalpataru Collection, a fashion boutique from Surat, that shows the collection and the brand's reels, and points shoppers to its two stores.",
    ),
    tags: [
      fact("Fashion boutique"),
      fact("Surat"),
      fact("React"),
      fact("Collection gallery"),
      fact("Store directions"),
    ],
    keyFacts: [
      { label: "Project type", value: "Fashion boutique website" },
      { label: "Stores", value: "Bardoli and Kadodara" },
      { label: "Sections", value: "Collection, Reels, Stores, About, Contact" },
      { label: "Built with", value: "React" },
    ],
    overview: fact(
      "Kalpataru Collection is a fashion boutique from Surat with stores in Bardoli and Kadodara, selling festive and everyday wear.",
    ),
    description: [
      fact("Vrattiks built the Kalpataru Collection website with React."),
      fact(
        "The homepage opens on the brand name with two buttons, Explore Collection and Watch Reels. Below come a gallery of the collection, the brand's reels, its story and four reasons to shop there.",
      ),
      fact(
        "Each store has its own card with a Get Directions button, and shoppers can message the boutique on WhatsApp.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("Clothes sell on how they look, so a boutique's website has to show the pieces well and then get shoppers into a store."),
    objectives: [
      fact("Show the collection in large photos."),
      fact("Bring the brand's reels onto the website."),
      fact("Point shoppers to the nearer of the two stores."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Collection gallery", text: "Large photo cards for the looks in the collection." },
      { title: "Reels", text: "The brand's reels have their own section on the homepage." },
      { title: "Store cards", text: "One card per store, each with a Get Directions button." },
      { title: "Four reasons to shop", text: "Quality, design, delivery across India and personal styling, in four short cards." },
    ],
    /* Read from the live page (2026-10-17) */
    stack: [{ name: "React", role: "The library the site is built with" }],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-17), at 1440 and 390 wide with Playwright, the fixed nav
       hidden on the crops. */
    visuals: {
      media: [
        { src: "/case-studies/kalpataru-collection/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Kalpataru Collection homepage on a desktop: the brand name in large serif type on a deep maroon background beside a photo of a black embroidered shirt, with Explore Collection and Watch Reels buttons.", caption: "The live Kalpataru Collection homepage." },
        { src: "/case-studies/kalpataru-collection/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the brand name and both buttons centred on the maroon background." },
      ],
    },
    website: { url: "https://www.kalpatarucollection.com/", label: "kalpatarucollection.com" },
    layout: [
      { section: "Collection", media: { src: "/case-studies/kalpataru-collection/site-collection.webp", width: 1440, height: 760, alt: "Screenshot of the “Our Collection” section: three tall photo cards showing a pink tie-dye shirt, a blue floral shirt and a black embroidered shirt." } },
      { section: "Why choose Kalpataru", media: { src: "/case-studies/kalpataru-collection/site-why-us.webp", width: 1440, height: 760, alt: "Screenshot of the “Why Choose Kalpataru” section: four white cards for premium quality, unique designs, pan-India delivery and personal styling, above the Our Stores heading." } },
    ],
    aboutClient: [
      fact("Kalpataru Collection is a fashion boutique from Surat, Gujarat, with stores in Bardoli and Kadodara."),
      fact("It sells festive and everyday wear and delivers across India."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want a website that shows your collection the way your store does?",
      description: "Tell us what you sell and where your stores are. We'll show you how we'd build it.",
    },
    seo: {
      title: "Kalpataru Collection case study",
      description:
        "How Vrattiks built a React website for Kalpataru Collection, a Surat fashion boutique, with its collection, reels and directions to both stores.",
    },
  },

  /* User request (2026-10-17): add https://www.shukanvilla.com/ to
     Website Projects. Everything is read off the live site (2026-10-17),
     whose footer says "Designed & Developed by Vrattiks": Shukan Villa is a
     gated community of 3BHK villas near Mandvi, Surat district, by SAI
     Developers (architect CXN Design); the site is one page (About,
     Amenities, Club House, Villas, Master Plan, Location, Contact) with
     English and Gujarati headings, a brochure PDF and a Book a Site Visit
     form sent via WhatsApp (fields below, as marked on the site). React was
     read from the page, not stated by the user. Left out on purpose: plot
     counts and room dimensions as claims, the street address, phones and
     email, and the master plan crop (a render only, no plan). */
  {
    slug: "shukan-villa",
    category: "website",
    title: "Shukan Villa",
    kind: "Website",
    clientName: "SAI Developers",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Mandvi, Surat",
    industry: { name: "Real Estate", slug: "real-estate" },
    summary: fact(
      "A website for Shukan Villa, a gated community of 3BHK villas near Mandvi, Surat, that walks buyers through the amenities, club house and plot sizes, and ends in a site visit booking sent on WhatsApp.",
    ),
    tags: [
      fact("Villa project"),
      fact("Mandvi, Surat"),
      fact("React"),
      fact("Site visit booking"),
      fact("Brochure download"),
    ],
    keyFacts: [
      { label: "Project type", value: "Real estate project website" },
      { label: "Location", value: "Mandvi, Surat" },
      { label: "Developer", value: "SAI Developers" },
      { label: "Built with", value: "React" },
    ],
    overview: fact(
      "Shukan Villa is a gated community of Mediterranean-style 3BHK villas near Mandvi in Surat district, developed by SAI Developers.",
    ),
    description: [
      fact("Vrattiks designed and developed the Shukan Villa website with React."),
      fact(
        "It is a single page, with its headings in both English and Gujarati. The first screen shows the entrance gate with two buttons, Book a Site Visit and View Brochure.",
      ),
      fact(
        "It then walks a buyer through the community: why families choose it, the amenities, the club house, the six plot configurations with a featured floor plan, the specifications, sports and recreation, the master plan and the location.",
      ),
      fact(
        "The site visit form asks for name and phone, with email, preferred villa size and a message optional, and sends the request on WhatsApp.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("Villa buyers want to understand the plot sizes, the plans and the amenities before they make the trip to see the site."),
    objectives: [
      fact("Set out every plot size, with a floor plan."),
      fact("Show the amenities and the club house."),
      fact("Turn interest into a booked site visit."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Plot configurations", text: "Six plot sizes, with a featured 3BHK floor plan set out room by room." },
      { title: "Amenities grid", text: "Everything inside the gates, from security to sports courts, in one grid." },
      { title: "Brochure download", text: "The brochure opens as a PDF from the first screen." },
      { title: "Site visit booking", text: "Name, phone and preferred villa size, sent as a WhatsApp message." },
      { title: "English and Gujarati", text: "Every section heading appears in both languages." },
    ],
    /* Read from the live page (2026-10-17) */
    stack: [{ name: "React", role: "The library the site is built with" }],
    landingPages: [],
    formFields: [
      { name: "Name", required: true },
      { name: "Phone", required: true },
      { name: "Email", required: false },
      { name: "Preferred villa size", required: false },
      { name: "Message", required: false },
    ],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-17), at 1440 and 390 wide with Playwright, the fixed nav
       hidden on the crops. */
    visuals: {
      media: [
        { src: "/case-studies/shukan-villa/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Shukan Villa homepage on a desktop: a render of the arched entrance gate and villas behind the name “Shukan Villa” in English and Gujarati, with Book a Site Visit and View Brochure buttons.", caption: "The live Shukan Villa homepage." },
        { src: "/case-studies/shukan-villa/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the name, tagline and both buttons stacked over the entrance render." },
      ],
    },
    website: { url: "https://www.shukanvilla.com/", label: "shukanvilla.com" },
    layout: [
      { section: "Amenities", media: { src: "/case-studies/shukan-villa/site-amenities.webp", width: 1440, height: 760, alt: "Screenshot of the “Everything you need, within the gates” section: a grid of small white cards, each with an icon and an amenity such as security cabin, swimming pool, temple or box cricket." } },
      { section: "Club house", media: { src: "/case-studies/shukan-villa/site-club-house.webp", width: 1440, height: 760, alt: "Screenshot of the “The Heart of the Community” section: a render of the arched club house among palm trees at dusk, beside a second render of its façade." } },
      { section: "Villa configurations", media: { src: "/case-studies/shukan-villa/site-villas.webp", width: 1440, height: 760, alt: "Screenshot of the “Choose Your Home” section: floor plans for the 22 × 55, 24 × 55 and 30 × 50 plots, with floor labels in Gujarati." } },
    ],
    aboutClient: [
      fact("Shukan Villa is a villa project by SAI Developers near Mandvi in Surat district, Gujarat, designed by CXN Design."),
      fact("It is a gated community of 3BHK villas with a club house, swimming pool, temple and sports courts."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want site visits booked straight from your project website?",
      description: "Tell us about your project and your buyers. We'll show you how we'd build it.",
    },
    seo: {
      title: "Shukan Villa case study",
      description:
        "How Vrattiks designed and developed a React website for Shukan Villa, a gated villa community near Mandvi, Surat, with plot plans and site visit booking.",
    },
  },

  /* User request (2026-10-17): add https://www.bobacoffee.in/ to Website
     Projects. Everything is read off the live site (2026-10-17), whose
     footer says "Website by vrattiks.io": Boba & Coffee is a boba tea and
     coffee café in Jamalpore, Navsari; the site has Home, Menu, About Us,
     Franchise and Contact pages and a Get Franchise Info button that stays
     on screen. React was read from the page (a React root on #root), not
     stated by the user. Left out on purpose: the customer testimonials,
     happy-hour discounts, the address, phone and email. */
  {
    slug: "boba-coffee",
    category: "website",
    title: "Boba & Coffee",
    kind: "Website",
    clientName: "Boba & Coffee",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    location: "Navsari",
    industry: { name: "Restaurants & Food", slug: "restaurants-food" },
    summary: fact(
      "A website for Boba & Coffee, a boba tea café in Navsari, that shows off its must-try drinks, sends visitors to the store and keeps franchise enquiries one tap away.",
    ),
    tags: [
      fact("Boba and coffee café"),
      fact("Navsari"),
      fact("React"),
      fact("Menu favourites"),
      fact("Franchise enquiries"),
    ],
    keyFacts: [
      { label: "Project type", value: "Café website" },
      { label: "Location", value: "Navsari" },
      { label: "Pages", value: "Home, Menu, About, Franchise, Contact" },
      { label: "Built with", value: "React" },
    ],
    overview: fact(
      "Boba & Coffee is a café in Navsari serving boba teas, coffees and mocktails, with snacks such as ramen and churros.",
    ),
    description: [
      fact("Vrattiks built the Boba & Coffee website with React."),
      fact(
        "The homepage opens with two buttons, Explore Menu and Visit Our Store. Below come four reasons to visit, a behind-the-scenes section on how the drinks are made and six must-try favourites, each with a photo and its category.",
      ),
      fact(
        "A Get Franchise Info button stays on screen as visitors scroll, and the franchise has a page of its own.",
      ),
    ],
    brief: [],
    audiences: [],
    problem: fact("A café website has to make people want a drink today, while giving would-be franchise partners a route of their own."),
    objectives: [
      fact("Show the drinks in photos, so visitors know what to order."),
      fact("Send visitors to the store."),
      fact("Keep franchise enquiries one tap away."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "Must-try favourites", text: "Six drinks and snacks, each with a photo, a category and a one-line description." },
      { title: "Two paths from the first screen", text: "Explore Menu and Visit Our Store." },
      { title: "Always-on franchise button", text: "Get Franchise Info stays on screen on every scroll." },
      { title: "Behind the scenes", text: "A section on how each drink is made." },
    ],
    /* Read from the live page (2026-10-17) */
    stack: [{ name: "React", role: "The library the site is built with" }],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-17), at 1440 and 390 wide with Playwright, the franchise
       button hidden. */
    visuals: {
      media: [
        { src: "/case-studies/boba-coffee/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Boba & Coffee homepage on a desktop: two branded cans of boba tea on a café table beside the headline “Sip, Chill & Repeat”, with Explore Menu and Visit Our Store buttons.", caption: "The live Boba & Coffee homepage." },
        { src: "/case-studies/boba-coffee/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline and both buttons stacked over the café photo." },
      ],
    },
    website: { url: "https://www.bobacoffee.in/", label: "bobacoffee.in" },
    layout: [
      { section: "Why visit", media: { src: "/case-studies/boba-coffee/site-why-us.webp", width: 1440, height: 760, alt: "Screenshot of the “Why Choose Boba & Coffee?” section: four cards for fresh and handcrafted drinks, global flavours, a hangout space and drinks made to taste." } },
      { section: "Must-try favourites", media: { src: "/case-studies/boba-coffee/site-favorites.webp", width: 1440, height: 760, alt: "Screenshot of the “Our Must-Try Favorites” section: photos of three branded drink cans, Kick and Punch, Blueberry Mojito and Nutty Taro, each with its category." } },
    ],
    aboutClient: [
      fact("Boba & Coffee is a café in Jamalpore, Navsari, serving boba teas, coffees, mocktails and snacks."),
      fact("It also offers franchises."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want a café website that makes people want a drink today?",
      description: "Tell us about your menu and your store. We'll show you how we'd build it.",
    },
    seo: {
      title: "Boba & Coffee case study",
      description:
        "How Vrattiks built a React website for Boba & Coffee, a boba tea café in Navsari, with its favourites, store visits and franchise enquiries.",
    },
  },

  /* User request (2026-10-17): add https://www.trinontechnology.com/ to
     Website Projects. The rest is read off the live site (2026-10-17):
     Trinon Technology makes auto faceting machines for diamond polishing,
     built around StealthChop motor control; the site is one page (Home,
     Products, Our Clients, About, Contact) with Book Demo, Contact Us and
     Get Quote buttons. Unlike the other sites, its footer credits no one
     ("© 2026 Trinon Technology. All rights reserved."), so our role is the
     one draft() block, which keeps the page noindex until the user
     confirms what Vrattiks did. NOT stated: the tech stack (plain HTML and
     JavaScript, no framework identifiable) and the location (the site
     names only Gujarat). Left out on purpose: the site's own figures
     (years, products delivered, countries, clients), the client quote,
     the email and phone. */
  {
    slug: "trinon-technology",
    category: "website",
    title: "Trinon Technology",
    kind: "Website",
    clientName: "Trinon Technology",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "placeholder",
    location: "Gujarat",
    industry: { name: "Manufacturing", slug: "manufacturing" },
    summary: fact(
      "A website for Trinon Technology, a maker of diamond polishing machines, that explains the technology behind its machines, shows the product and invites workshops to book a demo.",
    ),
    tags: [
      fact("Machinery maker"),
      fact("Diamond polishing"),
      fact("Product showcase"),
      fact("Book a demo"),
      fact("Get a quote"),
    ],
    keyFacts: [
      { label: "Project type", value: "Machinery manufacturer website" },
      { label: "Sells", value: "Auto faceting machines for diamond polishing" },
      { label: "Enquiries by", value: "Book Demo, Get Quote, Contact Us" },
    ],
    overview: fact(
      "Trinon Technology makes auto faceting machines for diamond polishing workshops, built around StealthChop motor control.",
    ),
    description: [
      draft("Vrattiks designed and developed the Trinon Technology website."),
      fact(
        "The homepage opens on a close-up of a polishing machine with a Book Demo button under the headline.",
      ),
      fact(
        "It then introduces the company, explains the StealthChop motor control its machines use, gives four reasons workshops choose them, shows the machine in action and presents the Trinon Auto Faceting Machine.",
      ),
      fact("The page closes with Contact Us and Get Quote buttons."),
    ],
    brief: [],
    audiences: [],
    problem: fact("Workshop owners buy polishing machines on how they perform, so they want to understand the technology and see the machine before they talk price."),
    objectives: [
      fact("Explain the motor technology behind the machines in plain terms."),
      fact("Show the product and the machine at work."),
      fact("Lead workshops to book a demo or ask for a quote."),
    ],
    approach: [],
    solution: [],
    leadPath: [],
    features: [
      { title: "StealthChop section", text: "What the motor control does for polishing, in five short points." },
      { title: "Product showcase", text: "The Trinon Auto Faceting Machine, with a photo and a View More link." },
      { title: "See it in action", text: "A section showing the machine at work." },
      { title: "Demo and quote", text: "Book Demo on the first screen, Contact Us and Get Quote at the end of the page." },
    ],
    stack: [],
    landingPages: [],
    formFields: [],
    outcomes: [],
    /* Screens captured from the live site at the user's request
       (2026-10-17), at 1440 and 390 wide with Playwright, the fixed nav
       hidden on the crops. */
    visuals: {
      media: [
        { src: "/case-studies/trinon-technology/site-desktop.webp", width: 1440, height: 900, device: "desktop", alt: "Screenshot of the Trinon Technology homepage on a desktop: a dark, blurred close-up of a polishing machine behind the headline “Precision-Driven Diamond Polishing Solutions”, with a blue Book Demo button.", caption: "The live Trinon Technology homepage." },
        { src: "/case-studies/trinon-technology/site-mobile.webp", width: 520, height: 1125, device: "mobile", alt: "Screenshot of the same homepage on a phone, with the headline, tagline and Book Demo button centred over the machine photo." },
      ],
    },
    website: { url: "https://www.trinontechnology.com/", label: "trinontechnology.com" },
    layout: [
      { section: "StealthChop technology", media: { src: "/case-studies/trinon-technology/site-stealthchop.webp", width: 1440, height: 760, alt: "Screenshot of the “Power Behind the Polish – StealthChop Technology” section: a photo of a grey polishing machine on a cabinet beside a short explanation and five ticked points." } },
      { section: "Products", media: { src: "/case-studies/trinon-technology/site-products.webp", width: 1440, height: 760, alt: "Screenshot of the “Our Products” section: a photo of the black Trinon Auto Faceting Machine with a blue control panel beside its name, a tagline and a View More button." } },
    ],
    aboutClient: [
      fact("Trinon Technology makes auto faceting machines that polish diamonds on both the pavilion and the crown."),
      fact("Its machines are used by diamond workshops and polishing units in Gujarat."),
    ],
    services: ["website-development"],
    cta: {
      title: "Want a website that sells your machine before the demo?",
      description: "Tell us what you make and who buys it. We'll show you how we'd build it.",
    },
    seo: {
      title: "Trinon Technology case study",
      description:
        "A website for Trinon Technology, a maker of diamond polishing machines, with its StealthChop technology, product showcase and demo bookings.",
    },
  },

  // ── Custom Projects ─────────────────────────────────────────────────────
  /* VERIFIED (user, 2026-10-13): our own SOP, "Anjali Mobile — Standard
     Operating Procedure (SOP)" v1.0, attached by the user. Every block below
     restates that document in our own words; nothing goes beyond it, so the
     entry has no placeholder blocks. Used: the overview and description, the
     three objectives (the "100% accuracy" objective is written as a plain
     design goal, never as a claim), the four components, the 8-step workflow
     (+ "Resend coupon" from §6.2 and the live-connection rule), message-log
     delivery status (§6.4), the tech stack, security (§8) and testing (§9).
     EXCLUDED on purpose (user brief 2026-10-13): login/access procedure,
     credentials, the troubleshooting table, deployment/release, maintenance
     and monitoring, the FAQ (except the live-connection rule), version
     history, the roles/access-level table, any customer data, the messaging
     vendor's name, the SOP's date and the number of mock redemptions.
     Status is "Client project" only — the SOP does not confirm go-live.
     Service mapping (WhatsApp Automation, CRM) is ours — confirm. */
  {
    slug: "anjali-mobile-qr-coupon-platform",
    category: "custom",
    title: "Anjali Mobile QR Coupon & Customer Platform",
    kind: "Custom development",
    clientName: "Anjali Mobile",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    summary: fact(
      "A platform for Anjali Mobile, an electronics retailer, that captures a customer's mobile number with a QR scan, issues a digital coupon and follows up on WhatsApp to bring them back to the store.",
    ),
    tags: [
      fact("QR contact capture"),
      fact("Digital coupons"),
      fact("WhatsApp delivery"),
      fact("Counter redemption"),
      fact("Multi-company ready"),
      fact("React.js · FastAPI · PostgreSQL"),
    ],
    keyFacts: [
      { label: "Project type", value: "QR coupon and customer platform" },
      { label: "Business", value: "Electronics retailer, single branch" },
      { label: "Channel", value: "WhatsApp" },
      { label: "Parts", value: "Admin console, counter staff panel, customer page" },
      { label: "Built with", value: "React.js, FastAPI, PostgreSQL" },
    ],
    overview: fact(
      "A retail platform that links a visit to the store with follow-up afterwards. A customer scans a QR code, gives their mobile number and receives a digital coupon, and the store keeps in touch on WhatsApp to bring them back. It is set up for a single-branch electronics retailer, on an architecture built to serve more than one company.",
    ),
    description: [
      fact(
        "Anjali Mobile is an electronics retailer with one branch. We built this platform so that a visit to the store can lead to the next one: a QR code in the store lets a customer claim a digital coupon with nothing more than their mobile number.",
      ),
      fact(
        "Once the number has been checked, the platform creates a coupon from the campaign that is running and sends it on WhatsApp, with a link to a page where the customer can see their coupons. If the number is already registered, the customer is offered a \"Resend coupon\" option instead.",
      ),
      fact(
        "At the counter, staff find the customer by phone number, see their active coupons and redeem one. A coupon can only be redeemed with a live connection, so it cannot be used twice, and each redemption is saved to the customer's profile.",
      ),
      fact(
        "Behind this is an admin console. There the owner creates coupons for each company, makes QR codes linked to a coupon, keeps the product list and customer records up to date, and checks whether each WhatsApp message was sent, delivered and read.",
      ),
      fact(
        "The platform runs for one branch today, but it is built for more than one company, so further retail brands can be managed from the same console.",
      ),
    ],
    brief: [
      fact(
        "The brief was a platform that connects in-store visits with follow-up afterwards, asking as little of the customer as possible: scan a code, enter a mobile number, claim the coupon.",
      ),
      fact(
        "It had to serve three groups of people: the owner who sets up coupons and campaigns, the staff at the counter, and the customers, who receive their coupons on WhatsApp.",
      ),
    ],
    problem: fact(
      "Store visitors were anonymous. A customer could come in, look around and leave, and the store had no record of the visit and no way to reach that person again.",
    ),
    objectives: [
      fact("Capture a visitor's mobile number in the store with as little effort as possible."),
      fact("Keep a dependable record of every coupon, from the moment it is issued to the moment it is redeemed."),
      fact("Give counter staff one standard way to look up and redeem coupons."),
    ],
    approach: [
      {
        title: "A panel for each role",
        text: "The owner, the counter staff and the customer each have their own panel, and access is role-based, so each person sees only the data their job needs.",
      },
      {
        title: "One fixed path for every coupon",
        text: "Every coupon goes through the same steps in the same order, from the scan to the redemption, which keeps the records consistent.",
      },
      {
        title: "Redeem only when online",
        text: "Redemption needs a live connection, so a coupon cannot be redeemed twice.",
      },
      {
        title: "Built for one store, ready for more",
        text: "The platform runs for a single branch, and its architecture is ready for several companies, so more retail brands can be managed from the same admin console.",
      },
    ],
    solution: [
      { title: "Scan the QR code", tool: "Customer's phone", text: "The customer scans the store's QR code at the entrance or the counter." },
      {
        title: "Enter a mobile number",
        tool: "Customer's phone",
        text: "The customer enters their mobile number, and the platform checks it before going any further.",
        note: fact("If the number is already registered, the customer is offered a \"Resend coupon\" option."),
      },
      { title: "Issue a coupon", tool: "Platform", text: "A unique coupon is created from the campaign that is currently running." },
      { title: "Send it on WhatsApp", tool: "WhatsApp", text: "The coupon arrives on WhatsApp, with a link to the customer's self-service page." },
      { title: "Visit the store", text: "The customer comes back to the store to make a purchase." },
      { title: "Look up the customer", tool: "Counter staff panel", text: "Counter staff search for the customer by mobile number." },
      {
        title: "Redeem the coupon",
        tool: "Counter staff panel",
        text: "Staff check the coupon and mark it as redeemed. Its status changes to used, with a timestamp.",
        note: fact("Redemption needs a live connection, so a coupon cannot be redeemed twice."),
      },
      { title: "Update the profile", tool: "Platform", text: "The visit is recorded on the customer's profile, ready for later analysis." },
    ],
    /* The four parts of the platform. `items` → the detail page shows them
       as a bento of tiles. */
    features: [
      {
        title: "Admin console",
        text: "Where the owner sets everything up.",
        items: [
          "Create coupons for each company",
          "Make QR codes linked to a coupon",
          "Manage products and customer records",
          "Check the WhatsApp message logs",
          "Manage more than one company",
        ],
      },
      {
        title: "Counter staff panel",
        text: "What staff use at the counter.",
        items: [
          "Search for a customer by phone number",
          "Check and update a customer's name and number",
          "See a customer's active coupons",
          "Redeem a coupon",
          "Give a customer a coupon the admin has created",
        ],
      },
      {
        title: "Customer self-service page",
        text: "A page made for phones, where customers keep track of their coupons.",
        items: ["See their coupons", "Manage their coupons", "Opens from the link in the WhatsApp message"],
      },
      {
        title: "WhatsApp integration",
        text: "Coupons and updates go out on their own, through the WhatsApp Business API.",
        items: [
          "Sends the coupon when a customer registers",
          "Includes the link to the self-service page",
          "Sends notifications to customers",
          "Shows whether each message was sent, delivered and read",
        ],
      },
    ],
    stack: [
      { name: "React.js", role: "The admin console, counter staff panel and customer page", group: "Panels" },
      { name: "Python (FastAPI)", role: "Runs the platform behind the panels", group: "Under the hood" },
      { name: "PostgreSQL", role: "Stores customers, coupons and redemptions", group: "Under the hood" },
      { name: "WhatsApp Business API", role: "Delivers coupons and notifications to customers", group: "Messaging" },
    ],
    assurance: {
      source: "As described in the project documentation",
      security: [
        fact("Role-based access, so each person sees only the data their role needs."),
        fact("All traffic is sent over HTTPS/TLS."),
        fact("Customer phone numbers are encrypted at rest."),
        fact("An audit log records every redemption."),
        fact("API keys are kept in environment variables, not in the code."),
      ],
      testing: [
        fact("Functional testing that every QR scan creates a record."),
        fact("API testing of the WhatsApp delivery updates."),
        fact("UI testing of the customer page on phone screens."),
        fact("User acceptance testing, in which staff complete mock redemptions before the platform goes live."),
      ],
    },
    illustration: "coupon-platform",
    /* Sample text only: no real store message, customer name or number. */
    sampleMessage: {
      sender: "Sample store",
      lines: ["Thanks for visiting us today.", "Here is your coupon. Show it at the counter on your next visit."],
      code: "SAMPLE-COUPON",
      link: "View your coupons",
      caption: "A coupon message on WhatsApp, with sample text.",
    },
    outcomes: [],
    visuals: { media: [] },
    aboutClient: [fact("Anjali Mobile is an electronics retailer with a single branch.")],
    // Service mapping is ours, not user-stated — confirm.
    services: ["whatsapp-automation", "crm"],
    cta: {
      title: "Want a way to bring store visitors back?",
      description: "Tell us how customers find you today. We'll show you what we'd set up first.",
    },
    seo: {
      title: "Anjali Mobile QR coupon case study",
      description:
        "A QR coupon platform for Anjali Mobile, an electronics retailer: QR contact capture, digital coupons, WhatsApp delivery and counter redemption.",
    },
  },

  /* VERIFIED (user, 2026-10-17): our own case study PDF, "Two Rabbits Lead
     Generation", attached by the user. Every block restates that document
     in our own words; nothing goes beyond it, so the entry has no
     placeholder blocks. Used: the overview and full story, the six brief
     items, the problem and objectives, the six approach principles, the
     lead flow (solution, as the steps the platform runs), the 15 features,
     the tech stack, and the scope and deployment facts. The 8 delivery
     phases are folded into the story, features and stack. The PDF's counts
     (5+ sources, 15 features) are facts about the build, not results, so
     `outcomes` stays empty. Service mapping (Lead Management, CRM) is
     ours — confirm. */
  {
    slug: "two-rabbits-lead-generation",
    category: "custom",
    title: "Two Rabbits Lead Generation",
    kind: "Custom development",
    clientName: "Two Rabbits",
    clientRole: "Client",
    statusLabel: "Client project",
    contentStatus: "verified",
    summary: fact(
      "A B2B prospecting platform that turns a description of the ideal customer into a checked, ready-to-contact lead list, and helps write and send the outreach, all in one workspace.",
    ),
    tags: [
      fact("Lead discovery"),
      fact("Contact enrichment"),
      fact("Email verification"),
      fact("Audiences & CRM"),
      fact("AI outreach on Gmail"),
      fact("React · FastAPI · PostgreSQL"),
    ],
    keyFacts: [
      { label: "Project type", value: "B2B prospecting and outreach platform" },
      { label: "Scope", value: "Design, development and deployment" },
      { label: "Data sources", value: "5+ combined for each lead" },
      { label: "Deployment", value: "Production on AWS Lightsail" },
      { label: "Built with", value: "React, FastAPI, PostgreSQL" },
    ],
    overview: fact(
      "One workspace from \"who should we sell to?\" to \"message sent.\" Users describe their ideal customer and pick a location. The platform finds matching businesses, fills in their contact and decision-maker details, sorts them into audiences, and helps write and send personalised outreach.",
    ),
    description: [
      fact(
        "Most sales teams still prospect by hand. They search Google Maps and directories, open company websites one by one, look up owners on LinkedIn, copy emails into spreadsheets, and then write cold emails from scratch. The data goes stale fast, the same business shows up several times, and nobody can see what the data providers actually cost.",
      ),
      fact(
        "Two Rabbits came to us wanting to turn that scattered process into one guided, traceable workflow. We started with requirements workshops, user personas and journey mapping, then designed and built the platform around each step of a real sales journey: define, discover, enrich, organise, reach out and follow up.",
      ),
      fact(
        "A search pulls businesses from several sources at once, removes duplicates, and ranks the real company website above marketplaces and directories. Each lead is then filled in with emails, phones, owners and social profiles, and every email is labelled with how far it can be trusted.",
      ),
      fact(
        "Leads are grouped into reusable audiences, with notes, tasks, reminders and activity history for each contact. From there, AI drafts personalised emails that go out from Gmail, with replies, opens, unsubscribes and follow-up sequences tracked.",
      ),
      fact(
        "The platform connects to Vrattiks Super Admin for account setup, credits and API keys, and runs in production on AWS. The heavy scraping and enrichment run in the background, so users keep working without waiting.",
      ),
    ],
    brief: [
      fact(
        "Two Rabbits asked for a platform that finds business leads by category, keyword, area and radius, fills them in with reliable emails, phones, owners, websites and social profiles, and lets the team review, filter and group them into reusable audiences.",
      ),
      fact(
        "It also had to write personalised outreach and track follow-ups, serve many customer accounts with their own data and credit-based usage, and keep the cost of every outside data provider under control and on record.",
      ),
    ],
    problem: fact(
      "Prospecting lived in too many places: map searches, directories, company websites, LinkedIn, spreadsheets, AI tools and email. Research was slow and repetitive. The same business showed up more than once across sources. Contact details were often wrong or belonged to someone else. Messages were generic. Nobody could see what the data providers cost.",
    ),
    objectives: [
      fact("Cut the time from a search to a usable prospect list."),
      fact("Make leads more complete and more accurate."),
      fact("Give one measurable, compliant workspace for outreach and follow-up."),
      fact("Keep the user in control of which leads are saved, enriched and contacted."),
      fact("Make usage and credits manageable for each customer account."),
    ],
    approach: [
      {
        title: "Built around the sales journey",
        text: "We mapped the real sales journey, from defining the customer to following up, and built each screen around one step of it.",
      },
      {
        title: "More than one source for every lead",
        text: "Google Maps, ready-made scrapers, website crawling, AI web search and email verification are combined, so no single source limits how good a lead is.",
      },
      {
        title: "Quality over quantity",
        text: "Candidate websites and emails are ranked, marketplaces and directories are never treated as the official site, and every email carries a confidence label.",
      },
      {
        title: "Pay for data once",
        text: "Searches are normalised and saved, and enrichment is versioned, so a repeat query reuses earlier data instead of paying for new provider calls.",
      },
      {
        title: "Heavy work in the background",
        text: "Scraping and enrichment run as background jobs with live progress updates, so the screen the user works in stays fast.",
      },
      {
        title: "Ready for many customers",
        text: "Each customer account's data is kept separate, and credits and API keys are managed centrally through Vrattiks Super Admin.",
      },
    ],
    solution: [
      {
        title: "Describe the ideal customer",
        tool: "Search",
        text: "The user picks a niche or keyword, an area, a search radius and how many results they want.",
      },
      {
        title: "Check earlier searches",
        tool: "Cache",
        text: "The search is matched against earlier ones, so the user can reuse saved results or run it fresh.",
      },
      {
        title: "Discover businesses",
        tool: "Maps, web, directories",
        text: "Matching businesses are gathered from several sources, and duplicates are removed.",
      },
      {
        title: "Enrich each lead",
        tool: "AI + Hunter.io",
        text: "Background jobs fill in emails, phones, owners, websites and social profiles, and each row updates live as it finishes.",
        note: fact("Every email is labelled Verified, Unverified, Source mismatch or Fallback source."),
      },
      {
        title: "Build an audience",
        tool: "Audiences",
        text: "The user filters the leads and saves the ones they want as a reusable audience.",
      },
      {
        title: "Reach out and follow up",
        tool: "Gmail",
        text: "AI drafts a personalised email for approval, and it goes out from Gmail with replies, opens and follow-ups tracked.",
      },
    ],
    features: [
      { title: "Smart lead discovery", text: "Search by niche, location, radius and number of results, with duplicates removed automatically." },
      { title: "Lead enrichment", text: "Emails, phones, owners, websites and social profiles, gathered from several sources." },
      { title: "Email confidence labels", text: "Emails that match the company's domain come first, checked with Hunter.io and clearly labelled." },
      { title: "Official website detection", text: "Real company websites are ranked above marketplaces and directories." },
      { title: "Live progress", text: "Each lead updates on screen the moment it finishes enriching." },
      { title: "Original and enriched data side by side", text: "The data as it came from the source is always kept next to the enriched version." },
      { title: "Audiences and contacts", text: "Group leads, add notes, tasks and reminders, and see each contact's activity history." },
      { title: "AI outreach assistant", text: "Personalised emails, AI reply drafts and an approval step before anything is sent." },
      { title: "Gmail integration", text: "Send, sync replies, track opens, run follow-ups and handle unsubscribes." },
      { title: "Smart caching", text: "Earlier searches and enrichment are reused to cut cost and waiting time." },
      { title: "Credits and usage", text: "Each customer account runs on credits, enforced through Vrattiks Super Admin." },
      { title: "Super Admin controls", text: "Account setup, credit allocation, product access, quotas and API logs." },
      { title: "Dashboards and export", text: "Visual summaries, and export to a spreadsheet." },
      { title: "Personal settings", text: "Business profile, preferred AI tone, and a light or dark theme for each user." },
      { title: "Works on any screen", text: "Desktop, tablet and mobile." },
    ],
    stack: [
      { name: "React 19, React Router 7, Vite 7", role: "The single-page app users work in", group: "Web app" },
      { name: "Tailwind CSS 4, Framer Motion", role: "Styling, light and dark themes, and motion", group: "Web app" },
      { name: "Recharts", role: "Dashboard charts", group: "Web app" },
      { name: "Quill", role: "Rich-text editing", group: "Web app" },
      { name: "Python 3.11, FastAPI", role: "The backend behind the app, served by Uvicorn", group: "Backend" },
      { name: "Pydantic, SQLAlchemy, Alembic", role: "Data validation, database access and migrations", group: "Backend" },
      { name: "PostgreSQL 15", role: "Stores leads, audiences and contacts", group: "Data and background jobs" },
      { name: "Redis 7", role: "Cache and job queue", group: "Data and background jobs" },
      { name: "Celery, Celery Beat, APScheduler", role: "Run scraping and enrichment in the background and on a schedule", group: "Data and background jobs" },
      { name: "SerpAPI (Google Maps)", role: "Finds businesses by category and location", group: "Finding and enriching leads" },
      { name: "Apify, Playwright, Crawlee, lxml", role: "Scrape directories and crawl company websites", group: "Finding and enriching leads" },
      { name: "OpenRouter (GPT-4o-mini)", role: "AI enrichment and personalised outreach", group: "Finding and enriching leads" },
      { name: "Hunter.io", role: "Verifies email addresses", group: "Finding and enriching leads" },
      { name: "Gmail API, Google Calendar API", role: "Sending, reply sync, open tracking and calendar", group: "Integrations" },
      { name: "WebSockets", role: "Live progress as each lead finishes", group: "Integrations" },
      { name: "Vrattiks Super Admin", role: "Account setup, credits and API keys", group: "Integrations" },
      { name: "Docker, Docker Compose", role: "Package and run each service", group: "Hosting and monitoring" },
      { name: "Nginx, Supervisor", role: "Serve the app and keep workers running", group: "Hosting and monitoring" },
      { name: "Sentry", role: "Error monitoring", group: "Hosting and monitoring" },
      { name: "AWS Lightsail", role: "Production hosting", group: "Hosting and monitoring" },
    ],
    illustration: "lead-flow",
    outcomes: [],
    visuals: { media: [] },
    aboutClient: [
      fact(
        "Two Rabbits asked us to turn a fragmented prospecting routine into a single, measurable pipeline that ends with leads ready for outreach.",
      ),
    ],
    // Service mapping is ours, not user-stated — confirm.
    services: ["lead-management", "crm"],
    cta: {
      title: "Have a workflow that needs this kind of intelligence?",
      description: "Tell us how your team finds and contacts customers today. We'll show you how we'd build it.",
    },
    seo: {
      title: "Two Rabbits case study",
      description:
        "A B2B lead generation platform for Two Rabbits: lead discovery, contact enrichment, email verification, audiences and AI outreach on Gmail.",
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

/* Placeholder blocks the DETAIL page renders: every content field. The tag
   chips count only for websites, the one detail layout that shows them
   (since 2026-10-13); custom and IoT keep them card-only. */
export function pageDrafts(study: CaseStudy) {
  if (study.category === "website") return countDrafts(study);
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
