/* Long-form copy for the /services/{slug} detail pages, keyed by the slugs in
   content.ts. Drafted descriptive copy, pending client approval: it says what
   each service does and how we deliver it, with no figures, client names or
   promised results (vrattiks-standards §3). Tool names are kept generic
   because the integrations list is still unconfirmed (see memory.md).

   `industries`, `useCases` and `related` hold slugs from content.ts — the
   detail page resolves them, so a renamed slug drops out rather than
   rendering a broken link. */

export type ServiceDetail = {
  /* One-line outcome under the H1 */
  headline: string;
  problems: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  features: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  industries: string[];
  useCases: string[];
  related: string[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "ai-voice-agent": {
    headline: "Every call answered, even when your team can't pick up.",
    problems: [
      {
        title: "Calls go unanswered",
        text: "When everyone is busy, on leave or it's after hours, the phone just rings. Most callers don't try again. They call the next business.",
      },
      {
        title: "Your team repeats the same answers",
        text: "Timings, prices, location, availability. Hours go into questions that have the same answer every time.",
      },
      {
        title: "Leads go cold before anyone calls back",
        text: "By the time someone returns a missed call, the customer has often moved on.",
      },
    ],
    steps: [
      {
        title: "We learn how your calls go",
        text: "We look at how your team handles calls today: the common questions, the details you need, and when a person should step in.",
      },
      {
        title: "We set up the agent",
        text: "The agent gets your business information, your answers and a clear script for booking, qualifying or passing calls on.",
      },
      {
        title: "It takes the calls",
        text: "Calls are answered straight away. Caller details and a short summary of each call are saved to your records.",
      },
      {
        title: "Your team steps in where it matters",
        text: "Calls that need a person are transferred or flagged, so your team spends its time on customers who are ready to buy.",
      },
    ],
    features: [
      { title: "Incoming call answering", text: "Answers every call at any hour, including weekends and holidays." },
      { title: "Follow-up calls", text: "Calls new leads back and reminds customers about appointments." },
      { title: "Answers from your information", text: "Replies with your own prices, timings and policies, not generic answers." },
      { title: "Call summaries", text: "Each call is logged with the caller's details and what they asked for." },
      { title: "Handover to your team", text: "Transfers or flags the call when a person should take over." },
      { title: "Connects to your CRM", text: "Caller details land in your records without anyone typing them in." },
    ],
    benefits: [
      { title: "No missed enquiries", text: "Every caller gets an answer, whether it's 10 AM or 10 PM." },
      { title: "Time back for your team", text: "Routine questions stop interrupting the work only your people can do." },
      { title: "Faster follow-up", text: "New leads hear back while they're still interested." },
    ],
    industries: ["real-estate", "healthcare", "hospitality", "automobile", "salons-spas-wellness", "higher-education"],
    useCases: ["lead-management", "customer-support"],
    related: ["ai-chatbot", "whatsapp-automation", "crm"],
  },

  "ai-chatbot": {
    headline: "Instant answers for every website visitor, day or night.",
    problems: [
      {
        title: "Visitors leave without asking",
        text: "If the answer isn't easy to find, most people close the tab instead of filling in a form.",
      },
      {
        title: "Enquiries wait in an inbox",
        text: "Messages sent after hours sit unanswered until someone gets to them the next day.",
      },
      {
        title: "Your team answers the same questions",
        text: "The same handful of questions takes up time every single day.",
      },
    ],
    steps: [
      {
        title: "We gather your answers",
        text: "We collect your services, prices, policies and the questions customers ask most often.",
      },
      {
        title: "We build the chatbot",
        text: "It's set up on your website or app in your brand's tone, with clear rules for when to hand over.",
      },
      {
        title: "It talks to your visitors",
        text: "Visitors get answers straight away, and the chatbot takes their name and number when they're interested.",
      },
      {
        title: "Your team takes over when needed",
        text: "Conversations that need a person are passed to your team with the full chat history.",
      },
    ],
    features: [
      { title: "Website and app chat", text: "Replies the moment someone asks, on your website or inside your app." },
      { title: "Answers from your information", text: "Uses your own business details, so answers are specific to you." },
      { title: "Lead capture", text: "Collects contact details from interested visitors inside the conversation." },
      { title: "Booking and enquiry flows", text: "Guides visitors through booking, asking for a quote or raising a request." },
      { title: "Human handover", text: "Passes the chat to your team along with everything said so far." },
      { title: "Saves to your CRM", text: "Every conversation and lead is recorded where your team can see it." },
    ],
    benefits: [
      { title: "Fewer visitors lost", text: "People who would have left get an answer and a reason to stay." },
      { title: "Replies at any hour", text: "A question asked at midnight is answered at midnight." },
      { title: "Less repetitive work", text: "Your team handles the conversations that genuinely need them." },
    ],
    industries: ["edtech-coaching", "higher-education", "healthcare", "real-estate", "finance", "hospitality"],
    useCases: ["customer-support", "lead-management"],
    related: ["ai-voice-agent", "whatsapp-automation", "website-development"],
  },

  "workflow-automation": {
    headline: "Let your tools handle the follow-up, so your team doesn't have to.",
    problems: [
      {
        title: "Hours lost to copy-paste",
        text: "Details get typed from forms into sheets, from sheets into the CRM, and from the CRM into messages.",
      },
      {
        title: "Things slip when someone is busy",
        text: "Reminders, follow-ups and updates depend on someone remembering to send them.",
      },
      {
        title: "Your tools don't share information",
        text: "Each tool holds part of the picture, so nobody sees the whole thing.",
      },
    ],
    steps: [
      {
        title: "We map your process",
        text: "We walk through the task step by step and note every place something is done by hand.",
      },
      {
        title: "We design the workflow",
        text: "We decide what starts each step, what should happen next, and who needs to know.",
      },
      {
        title: "We connect your tools",
        text: "We link the tools you already use so information moves between them on its own.",
      },
      {
        title: "We test and hand over",
        text: "We run it on real work, fix what needs fixing, and show your team how it runs.",
      },
    ],
    features: [
      { title: "Works with your existing tools", text: "Connects the forms, sheets, email and messaging tools you already use." },
      { title: "Scheduled reminders", text: "Payment, appointment and renewal reminders go out on time." },
      { title: "Automatic updates", text: "Customers and your team are told when something changes." },
      { title: "Daily and weekly reports", text: "Your key numbers are pulled together and sent to you on schedule." },
      { title: "Alerts", text: "Get told when stock runs low, a payment is overdue or a lead goes quiet." },
      { title: "Custom tasks", text: "If a repetitive task doesn't fit our other services, we can automate it here." },
    ],
    benefits: [
      { title: "Fewer manual errors", text: "Information is passed along by the system, not retyped by hand." },
      { title: "Nothing depends on memory", text: "Follow-ups and reminders run whether or not anyone remembers them." },
      { title: "Time for real work", text: "Your team spends its day on customers, not admin." },
    ],
    industries: ["manufacturing", "finance", "construction", "restaurants-food", "real-estate", "edtech-coaching"],
    useCases: ["business-intelligence", "lead-management"],
    related: ["crm", "whatsapp-automation", "ai-chatbot"],
  },

  "website-development": {
    headline: "A website that turns visitors into enquiries.",
    problems: [
      {
        title: "Slow or outdated websites",
        text: "Pages that load slowly on a phone lose visitors before they see what you offer.",
      },
      {
        title: "No clear next step",
        text: "Visitors can't quickly tell what you do or how to get in touch, so they leave.",
      },
      {
        title: "Enquiries that go nowhere",
        text: "Form submissions land in an inbox and wait, instead of reaching your team straight away.",
      },
    ],
    steps: [
      {
        title: "We understand your business",
        text: "We learn who your customers are and what you want them to do on your site.",
      },
      {
        title: "We plan and design",
        text: "We plan the pages and design them around your brand and your customers' questions.",
      },
      {
        title: "We build and connect",
        text: "We build a fast site and connect its forms to your CRM, chatbot and WhatsApp.",
      },
      {
        title: "We launch and support",
        text: "We put it live, check it on every screen size and keep it up to date.",
      },
    ],
    features: [
      { title: "Designed for mobile first", text: "Built for the phones most of your visitors are using." },
      { title: "Fast loading", text: "Pages are kept light so they open quickly on any connection." },
      { title: "Clear calls to action", text: "Every page tells visitors what to do next." },
      { title: "Connected enquiry forms", text: "Form entries go straight to your CRM and follow-up automation." },
      { title: "Chatbot and WhatsApp ready", text: "Add a chatbot or WhatsApp button without rebuilding anything." },
      { title: "Search-friendly structure", text: "Clean titles, descriptions and page structure that search engines can read." },
    ],
    benefits: [
      { title: "A stronger first impression", text: "Your website looks as professional as the work you do." },
      { title: "Enquiries reach your team", text: "Every form entry is captured and followed up, not left in an inbox." },
      { title: "Built to grow", text: "Add pages, services or automation later without starting again." },
    ],
    industries: ["real-estate", "hospitality", "restaurants-food", "healthcare", "edtech-coaching", "construction"],
    useCases: ["lead-management"],
    related: ["ai-chatbot", "crm", "workflow-automation"],
  },

  "whatsapp-automation": {
    headline: "Reply, update and follow up on WhatsApp without watching the phone.",
    problems: [
      {
        title: "Messages pile up",
        text: "Customers message at all hours, and replies wait until someone is free.",
      },
      {
        title: "Updates are sent by hand",
        text: "Order, booking and payment updates are typed out one by one, or forgotten.",
      },
      {
        title: "Leads go quiet",
        text: "Without a follow-up, a customer who asked a question once often doesn't come back.",
      },
    ],
    steps: [
      {
        title: "We plan your conversations",
        text: "We list the messages you send most and the questions your customers ask.",
      },
      {
        title: "We set up the flows",
        text: "We build replies, updates and follow-up sequences around how your business works.",
      },
      {
        title: "We connect your systems",
        text: "Orders, bookings and CRM records trigger the right message at the right time.",
      },
      {
        title: "Your team steps in when needed",
        text: "Chats that need a person are passed to your team to pick up.",
      },
    ],
    features: [
      { title: "Instant replies", text: "Answers common questions as soon as a customer messages." },
      { title: "Order and booking updates", text: "Confirmations and status updates go out automatically." },
      { title: "Payment reminders", text: "Polite reminders go out before and after due dates." },
      { title: "Lead follow-up", text: "New leads get a timed series of follow-up messages." },
      { title: "Updates to opted-in customers", text: "Share offers and announcements with customers who've agreed to hear from you." },
      { title: "Handover to your team", text: "Anyone on your team can take over a conversation when a person is needed." },
    ],
    benefits: [
      { title: "Faster replies", text: "Customers hear back as soon as they message." },
      { title: "Reminders that always go out", text: "Updates and reminders are sent every time, not only when someone remembers." },
      { title: "Every lead followed up", text: "Each enquiry gets a follow-up, not just the ones someone had time for." },
    ],
    industries: ["restaurants-food", "salons-spas-wellness", "real-estate", "automobile", "edtech-coaching", "hospitality"],
    useCases: ["lead-management", "customer-support"],
    related: ["ai-chatbot", "crm", "workflow-automation"],
  },

  crm: {
    headline: "Every lead and customer in one place, always up to date.",
    problems: [
      {
        title: "Leads are scattered",
        text: "Enquiries sit across phones, WhatsApp, email and spreadsheets, so some are never followed up.",
      },
      {
        title: "Nobody knows the next step",
        text: "Without a shared record, your team can't see who spoke to whom or what was promised.",
      },
      {
        title: "Records go out of date",
        text: "Updating a spreadsheet by hand is the first thing that stops when the team gets busy.",
      },
    ],
    steps: [
      {
        title: "We map your sales process",
        text: "We list the stages a lead goes through, from first enquiry to paying customer.",
      },
      {
        title: "We set up your CRM",
        text: "We set up stages, fields and views around how your team actually works.",
      },
      {
        title: "We connect your channels",
        text: "Calls, chats, WhatsApp and website forms feed straight into the CRM.",
      },
      {
        title: "We train your team",
        text: "We show your team how to use it day to day, and adjust it as you grow.",
      },
    ],
    features: [
      { title: "One record per customer", text: "Every call, chat and message is logged against the right person." },
      { title: "Automatic lead capture", text: "New enquiries from every channel are added without typing." },
      { title: "Sales pipeline view", text: "See where every lead stands and what needs doing next." },
      { title: "Tasks and reminders", text: "Your team is reminded when a follow-up is due." },
      { title: "Simple reports", text: "See how many leads came in and where they came from." },
      { title: "Works with our other services", text: "Connects to your voice agent, chatbot, WhatsApp and website." },
    ],
    benefits: [
      { title: "No lead forgotten", text: "Every enquiry is recorded and has a clear next step." },
      { title: "A clear view of the business", text: "Know where your leads come from and where they stall." },
      { title: "Less admin", text: "Records update themselves as conversations happen." },
    ],
    industries: ["real-estate", "finance", "automobile", "higher-education", "construction", "manufacturing"],
    useCases: ["lead-management", "business-intelligence"],
    related: ["workflow-automation", "whatsapp-automation", "ai-voice-agent"],
  },
};
