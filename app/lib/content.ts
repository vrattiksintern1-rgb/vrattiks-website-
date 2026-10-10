import type { IconName } from "@/app/components/ui/Icon";

export type Service = {
  name: string;
  slug: string;
  icon: IconName;
  description: string;
  /* Intro paragraph on the /services/{slug} detail page (the rest of that
     page's copy lives in service-details.ts). Describes what the service
     does, not results — no figures until real data exists
     (vrattiks-standards §3). */
  details: string;
  /* Optional illustration. Shown in full in the detail-page hero; on the
     service card it's cropped to a shared 3:2 frame so cards in a row line
     up. `position` (CSS object-position) picks what that crop keeps —
     defaults to the centre. */
  image?: { src: string; width: number; height: number; position?: string };
};

export const services: Service[] = [
  {
    name: "AI Voice Agent",
    slug: "ai-voice-agent",
    icon: "mic",
    image: { src: "/images/services/ai-voice-agent-assistant.png", width: 1553, height: 1013 },
    description: "Answers and makes calls around the clock, so no customer inquiry waits for a free line.",
    details:
      "The voice agent picks up every call at any hour, answers common questions, takes down the caller's details and passes the call to your team when a person is needed. It can also call new leads back while they're still interested.",
  },
  {
    name: "AI Chatbot",
    slug: "ai-chatbot",
    icon: "chat",
    image: { src: "/images/services/ai-chatbot.png", width: 1309, height: 1201, position: "50% 20%" },
    description: "Handles website and app conversations instantly, and hands off to your team when needed.",
    details:
      "The chatbot sits on your website or app and replies the moment a visitor asks something. It answers from your own business information, collects contact details, and brings in your team for anything it shouldn't handle alone.",
  },
  {
    name: "Workflow Automation",
    slug: "workflow-automation",
    icon: "workflow",
    image: { src: "/images/services/workflow-automation.png", width: 1672, height: 941 },
    description: "Connects the tools you already use so information moves between them without manual work.",
    details:
      "Takes the copy-paste out of your day. When something happens in one tool, like a form being filled, an order coming in or a payment falling due, the next steps run on their own in the others.",
  },
  {
    name: "Website Development",
    slug: "website-development",
    icon: "globe",
    image: { src: "/images/services/website-development.png", width: 1536, height: 1024 },
    description: "A fast, conversion-ready website built to work with your automation from day one.",
    details:
      "A fast website that tells visitors what you do and makes it easy to get in touch. Enquiry forms connect straight to your CRM, chatbot and WhatsApp, so no lead gets lost between your website and your team.",
  },
  {
    name: "WhatsApp Automation",
    slug: "whatsapp-automation",
    icon: "whatsapp",
    image: { src: "/images/services/whatsapp-automation.png", width: 1216, height: 1294, position: "50% 35%" },
    description: "Automated replies, updates, and follow-ups on the channel your customers already use.",
    details:
      "Reply to customers on WhatsApp as soon as they message, send order and appointment updates, and follow up with new leads. Nobody has to watch the phone all day.",
  },
  {
    name: "CRM",
    slug: "crm",
    icon: "crm",
    image: { src: "/images/services/crm.png", width: 1920, height: 1280 },
    description: "One place to track every lead and customer, kept up to date automatically.",
    details:
      "Every lead and customer in one place, with each call, chat and message logged against them. Your team can see who needs a reply next, and records update themselves as conversations happen.",
  },
];

export type UseCase = {
  name: string;
  slug: string;
  icon: IconName;
  problem: string;
  solution: string;
  benefit: string;
};

export const useCases: UseCase[] = [
  {
    name: "Lead Management",
    slug: "lead-management",
    icon: "target",
    problem: "Leads come in from many channels and follow-up happens too late, or not at all.",
    solution: "Every lead is captured, qualified, and routed automatically the moment it arrives.",
    benefit: "Faster follow-up and fewer leads slipping through the cracks.",
  },
  {
    name: "Customer Support",
    slug: "customer-support",
    icon: "headset",
    problem: "Support requests pile up outside business hours and repetitive questions eat up your team's time.",
    solution: "AI chat and voice agents handle common questions instantly and escalate the rest to your team.",
    benefit: "Quicker responses for customers, less repetitive load on your staff.",
  },
  {
    name: "Business Intelligence",
    slug: "business-intelligence",
    icon: "chartUp",
    problem: "Decisions get made on gut feel because data is scattered across spreadsheets and tools.",
    solution: "Your key numbers are pulled into one clear, always-current view.",
    benefit: "Decisions backed by real visibility into how the business is performing.",
  },
];

export type Industry = {
  name: string;
  slug: string;
  icon: IconName;
  /* Unsplash License stock photo — illustrative, not a client. */
  image: string;
  application: string;
};

export const industries: Industry[] = [
  {
    name: "Real Estate",
    slug: "real-estate",
    image: "/images/industries/real-estate.jpg",
    icon: "home",
    application: "Qualify site-visit inquiries and follow up on listings automatically.",
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    image: "/images/industries/healthcare.jpg",
    icon: "pulse",
    application: "Automate appointment reminders and patient follow-up communication.",
  },
  {
    name: "Finance & Insurance",
    slug: "finance",
    image: "/images/industries/finance.jpg",
    icon: "finance",
    application: "Route client inquiries and send policy renewal and servicing reminders on time.",
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    image: "/images/industries/manufacturing.jpg",
    icon: "factory",
    application: "Connect order, inventory, and dispatch updates across your systems.",
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    image: "/images/industries/hospitality.jpg",
    icon: "hospitality",
    application: "Automate booking confirmations, guest queries, and review follow-ups.",
  },
  {
    name: "EdTech & Coaching",
    slug: "edtech-coaching",
    image: "/images/industries/edtech-coaching.jpg",
    icon: "book",
    application: "Follow up on course inquiries and send batch, fee, and class reminders automatically.",
  },
  {
    name: "Higher Education",
    slug: "higher-education",
    image: "/images/industries/higher-education.jpg",
    icon: "graduationCap",
    application: "Answer admission queries and guide applicants through each step of enrolment.",
  },
  {
    name: "Restaurants & Food",
    slug: "restaurants-food",
    image: "/images/industries/restaurants-food.jpg",
    icon: "utensils",
    application: "Take table bookings and orders on WhatsApp, then ask for a review after each visit.",
  },
  {
    name: "Salons, Spas & Wellness",
    slug: "salons-spas-wellness",
    image: "/images/industries/salons-spas-wellness.jpg",
    icon: "scissors",
    application: "Fill appointment slots, cut no-shows with reminders, and bring regulars back.",
  },
  {
    name: "Automobile Sales & Service",
    slug: "automobile",
    image: "/images/industries/automobile.jpg",
    icon: "car",
    application: "Follow up on test-drive leads and remind customers when their service is due.",
  },
  {
    name: "Construction & Infrastructure",
    slug: "construction",
    image: "/images/industries/construction.jpg",
    icon: "hardHat",
    application: "Keep project inquiries, vendor follow-ups, and site updates moving without chasing.",
  },
];

/* Contact details, used by the Contact page and the footer. Email and phone
   are confirmed; anything still `null` is unconfirmed (vrattiks-standards §3)
   and renders as "Pending confirmation" without a link. Write `phone` and
   `whatsapp` as they should be shown, with the country code; the links are
   derived from the digits. Values left null are also kept out of the JSON-LD. */
export const contactDetails: {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  location: string | null;
  hours: string | null;
} = {
  email: "vrattiks@gmail.com",
  phone: "+91 9106836019",
  whatsapp: null,
  location: null,
  hours: null,
};

/* ───────────────────────────────────────────────────────────────────────────
   The automation pipeline shown in Pipeline.tsx.
   User-provided capability list: AI-generated content, visual deployment,
   image sourcing, data logging, email delivery — sequenced here into the order
   the workflow actually runs.
   ─────────────────────────────────────────────────────────────────────────── */
export type PipelineStage = {
  icon: IconName;
  /** Uppercase label above the title — the stage's job in one or two words. */
  kicker: string;
  title: string;
  description: string;
};

export const pipelineStages: PipelineStage[] = [
  {
    icon: "target",
    kicker: "Trigger",
    title: "A lead arrives",
    description:
      "From a form, an ad, or a list you upload — the workflow starts on arrival.",
  },
  {
    icon: "sparkle",
    kicker: "Generate",
    title: "The email gets written",
    description:
      "AI drafts copy for that specific lead, not a mail-merge template.",
  },
  {
    icon: "image",
    kicker: "Assemble",
    title: "Creative is sourced and built",
    description:
      "A matching image is pulled in and placed into your template.",
  },
  {
    icon: "database",
    kicker: "Record",
    title: "Everything is logged",
    description:
      "Lead, copy, and asset are written to your sheet or CRM as it happens.",
  },
  {
    icon: "mail",
    kicker: "Deliver",
    title: "The email sends itself",
    description:
      "Delivered from your domain, ready for the follow-up sequence.",
  },
];
