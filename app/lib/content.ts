import type { IconName } from "@/app/components/ui/Icon";

export type Service = {
  name: string;
  slug: string;
  icon: IconName;
  description: string;
};

export const services: Service[] = [
  {
    name: "AI Voice Agent",
    slug: "ai-voice-agent",
    icon: "mic",
    description: "Answers and makes calls around the clock, so no customer inquiry waits for a free line.",
  },
  {
    name: "AI Chatbot",
    slug: "ai-chatbot",
    icon: "chat",
    description: "Handles website and app conversations instantly, and hands off to your team when needed.",
  },
  {
    name: "Workflow Automation",
    slug: "workflow-automation",
    icon: "workflow",
    description: "Connects the tools you already use so information moves between them without manual work.",
  },
  {
    name: "Website Development",
    slug: "website-development",
    icon: "globe",
    description: "A fast, conversion-ready website built to work with your automation from day one.",
  },
  {
    name: "WhatsApp Automation",
    slug: "whatsapp-automation",
    icon: "whatsapp",
    description: "Automated replies, updates, and follow-ups on the channel your customers already use.",
  },
  {
    name: "CRM",
    slug: "crm",
    icon: "crm",
    description: "One place to track every lead and customer, kept up to date automatically.",
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
  application: string;
};

export const industries: Industry[] = [
  {
    name: "Real Estate",
    slug: "real-estate",
    icon: "home",
    application: "Qualify site-visit inquiries and follow up on listings automatically.",
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    icon: "pulse",
    application: "Automate appointment reminders and patient follow-up communication.",
  },
  {
    name: "Finance & Insurance",
    slug: "finance",
    icon: "finance",
    application: "Route client inquiries and send policy renewal and servicing reminders on time.",
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    icon: "factory",
    application: "Connect order, inventory, and dispatch updates across your systems.",
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    icon: "hospitality",
    application: "Automate booking confirmations, guest queries, and review follow-ups.",
  },
  {
    name: "EdTech & Coaching",
    slug: "edtech-coaching",
    icon: "book",
    application: "Follow up on course inquiries and send batch, fee, and class reminders automatically.",
  },
  {
    name: "Higher Education",
    slug: "higher-education",
    icon: "graduationCap",
    application: "Answer admission queries and guide applicants through each step of enrolment.",
  },
  {
    name: "Restaurants & Food",
    slug: "restaurants-food",
    icon: "utensils",
    application: "Take table bookings and orders on WhatsApp, then ask for a review after each visit.",
  },
  {
    name: "Salons, Spas & Wellness",
    slug: "salons-spas-wellness",
    icon: "scissors",
    application: "Fill appointment slots, cut no-shows with reminders, and bring regulars back.",
  },
  {
    name: "Automobile Sales & Service",
    slug: "automobile",
    icon: "car",
    application: "Follow up on test-drive leads and remind customers when their service is due.",
  },
  {
    name: "Construction & Infrastructure",
    slug: "construction",
    icon: "hardHat",
    application: "Keep project inquiries, vendor follow-ups, and site updates moving without chasing.",
  },
];
