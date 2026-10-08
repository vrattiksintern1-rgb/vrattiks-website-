import { services } from "./content";

/* Every project on /case-studies comes from this file — edit here, not in the
   components.

   CONTENT INTEGRITY (vrattiks-standards §3). The four entries below are
   USER-PROVIDED (2026-10-08) and hold ONLY what the user stated: project name,
   category, the client name where one was given, the stack, and the kind of
   build. Each `summary` restates those facts in a sentence and adds nothing
   new. Every other field is deliberately empty — no challenge, solution,
   client quote or result has been confirmed. Never fill a field by guessing;
   empty fields simply don't render.

   `results` stays empty until the client has measured an outcome. Never lift
   anything here into JSON-LD beyond the project name. */

export type CaseStudyCategory = "custom" | "iot" | "website";

export type CaseStudy = {
  /* Also the anchor id on the page: /case-studies#{slug} */
  slug: string;
  /* SAMPLE entry — illustrative, not a real client project. Renders with a
     visible "Sample" badge and is left out of JSON-LD. See the SAMPLE block
     at the end of `caseStudies`. */
  sample?: boolean;
  category: CaseStudyCategory;
  title: string;
  /* Small tracked label above the title, e.g. "Website" or "Client project" */
  kind: string;
  /* One sentence on what it is. Facts only, no outcome claims. */
  summary: string;
  client?: string;
  /* `slug` links to /industries/{slug} — only set it when that page exists */
  industry?: { name: string; slug?: string };
  challenge?: string;
  solution?: string;
  /* Tools and platforms used (the "Implementation" field in
     vrattiks-architecture §2) */
  builtWith?: string[];
  /* Spec-sheet rows. Used by IoT entries, e.g. Hardware, Connectivity. */
  specs?: { label: string; value: string }[];
  /* Service slugs from content.ts — become "Related service" links */
  services?: string[];
  /* Measured outcomes only, each with what it measures (CLAUDE.md, ref 1) */
  results?: { value: string; label: string }[];
  /* Live address, for website projects. Shown in the browser frame. */
  url?: string;
  /* Screenshot in /public/images/case-studies/. Without one, the section's
     designed placeholder is shown instead. */
  image?: { src: string; width: number; height: number; alt: string };
};

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
    builtWith: ["n8n", "Groq", "LiveKit"],
    // Mapping to a service is ours, not user-stated — confirm.
    services: ["whatsapp-automation"],
  },
  {
    slug: "ai-lead-to-landing-page-generator",
    category: "custom",
    title: "AI Lead-to-Landing-Page Generator",
    kind: "Custom automation",
    summary: "An automated n8n pipeline that goes from a lead to a landing page.",
    builtWith: ["n8n"],
    // Mapping to a service is ours, not user-stated — confirm.
    services: ["workflow-automation"],
  },

  // ── IoT Projects ──────────────────────────────────────────────────────
  // None yet. The section renders its "in development" sheet until an entry
  // with `category: "iot"` is added here. Fill `specs` for the spec sheet.

  // ── Website Projects ──────────────────────────────────────────────────
  {
    slug: "auroma-holiday-villas",
    category: "website",
    title: "Auroma Holiday Villas",
    kind: "Website",
    summary: "A real estate website for Auroma Holiday Villas.",
    client: "Auroma Holiday Villas",
    industry: { name: "Real Estate", slug: "real-estate" },
    services: ["website-development"],
  },
  {
    slug: "jewellery-virtual-try-on",
    category: "website",
    title: "Jewellery Virtual Try-On",
    kind: "Client project · Web app",
    summary: "A web app for trying on jewellery virtually.",
    // Client name not provided — left empty rather than guessed.
    industry: { name: "Jewellery" },
    // Mapping to a service is ours, not user-stated — confirm.
    services: ["website-development"],
  },

  // ── SAMPLE PROJECTS ───────────────────────────────────────────────────
  // Added 2026-10-08 at the user's request ("add random projects and
  // websites") to fill the page out. These are ILLUSTRATIVE, not client work
  // (vrattiks-standards §3): generic names, no client names, no results or
  // figures, no live URLs. Each renders a visible "Sample" badge and is kept
  // out of JSON-LD. Never remove `sample: true` while an entry is fictional;
  // delete the entry when real projects replace it.
  {
    slug: "sample-clinic-appointment-reminders",
    sample: true,
    category: "custom",
    title: "Clinic Appointment Reminders",
    kind: "Custom automation",
    summary:
      "Sends appointment reminders on WhatsApp and lets patients confirm or reschedule by replying.",
    industry: { name: "Healthcare", slug: "healthcare" },
    challenge: "Front-desk staff spent each morning calling patients to confirm the day's appointments.",
    solution: "Reminders go out automatically the day before, and replies update the appointment list.",
    builtWith: ["n8n", "WhatsApp Business API", "Google Sheets"],
    services: ["whatsapp-automation"],
  },
  {
    slug: "sample-invoice-follow-up",
    sample: true,
    category: "custom",
    title: "Invoice Follow-Up Workflow",
    kind: "Custom automation",
    summary:
      "Chases unpaid invoices on a schedule and flags overdue accounts to the accounts team.",
    industry: { name: "Manufacturing", slug: "manufacturing" },
    challenge: "Payment reminders depended on someone remembering to send them.",
    solution: "A scheduled workflow sends polite reminders and escalates accounts that stay unpaid.",
    builtWith: ["n8n", "Email", "Google Sheets"],
    services: ["workflow-automation"],
  },
  {
    slug: "sample-cold-storage-monitor",
    sample: true,
    category: "iot",
    title: "Cold Storage Temperature Monitor",
    kind: "Sample",
    summary: "Watches chamber temperatures around the clock and alerts staff before stock is at risk.",
    industry: { name: "Restaurants & Food", slug: "restaurants-food" },
    challenge: "Temperature checks were written in a register by hand, a few times a day.",
    specs: [
      { label: "Hardware & sensors", value: "Temperature and humidity sensors in each chamber" },
      { label: "Connectivity", value: "Wi-Fi to a cloud dashboard" },
      { label: "Software & dashboard", value: "Live readings, with a WhatsApp alert when a limit is crossed" },
    ],
    builtWith: ["ESP32", "MQTT", "n8n"],
  },
  {
    slug: "sample-machine-run-time-tracker",
    sample: true,
    category: "iot",
    title: "Machine Run-Time Tracker",
    kind: "Sample",
    summary: "Records when each machine on the floor is running, idle or stopped.",
    industry: { name: "Manufacturing", slug: "manufacturing" },
    challenge: "Downtime was only noticed at the end of a shift, from the production count.",
    specs: [
      { label: "Hardware & sensors", value: "Current sensors on each machine's power line" },
      { label: "Connectivity", value: "Local gateway forwarding readings to the cloud" },
      { label: "Software & dashboard", value: "Shift-wise run and idle time for every machine" },
    ],
    builtWith: ["ESP32", "MQTT", "Grafana"],
  },
  {
    slug: "sample-coaching-institute-website",
    sample: true,
    category: "website",
    title: "Coaching Institute Website",
    kind: "Website",
    summary: "Course pages, batch timings and an enquiry form that sends each lead to WhatsApp.",
    industry: { name: "EdTech & Coaching", slug: "edtech-coaching" },
    services: ["website-development"],
  },
  {
    slug: "sample-restaurant-ordering-site",
    sample: true,
    category: "website",
    title: "Restaurant Ordering Site",
    kind: "Website",
    summary: "Menu, table booking and order enquiries in one site built for phones first.",
    industry: { name: "Restaurants & Food", slug: "restaurants-food" },
    services: ["website-development"],
  },
];

export function caseStudiesIn(category: CaseStudyCategory) {
  return caseStudies.filter((study) => study.category === category);
}

/* Industry + service links for one project (vrattiks-architecture §5: a case
   study links to the service and industry involved). Names come from
   content.ts, so a renamed service updates here too. */
export function relatedLinks(study: CaseStudy) {
  const links: { label: string; name: string; href: string }[] = [];
  if (study.industry?.slug) {
    links.push({
      label: "Industry",
      name: study.industry.name,
      href: `/industries/${study.industry.slug}`,
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
