/* Long-form copy for the use cases, keyed by the slugs in content.ts. Used by
   the /use-cases overview now, and meant to feed the /use-cases/{slug} detail
   pages when they're built. Drafted descriptive copy, pending client
   approval: it says what changes and how, with no figures, client names or
   promised results (vrattiks-standards §3).

   Which services deliver each use case is NOT stored here — the page derives
   it from `useCases` in service-details.ts, so the two can't drift apart. */

export type UseCaseDetail = {
  /* The problem as an owner would say it — the "sounds like you?" line */
  symptom: string;
  problems: string[];
  steps: { title: string; text: string }[];
  benefits: string[];
};

export const useCaseDetails: Record<string, UseCaseDetail> = {
  "lead-management": {
    symptom: "Enquiries come in faster than anyone can call them back.",
    problems: [
      "Enquiries arrive by phone, WhatsApp, your website and ad forms, and each one lands somewhere different.",
      "Nobody clearly owns the follow-up, so the second and third reminder never happen.",
      "By the time someone calls back, the customer has already spoken to a competitor.",
    ],
    steps: [
      { title: "Capture", text: "Every enquiry, from any channel, is saved to one list the moment it arrives." },
      { title: "Reply", text: "The customer hears back within seconds, on the channel they used." },
      { title: "Qualify", text: "A few short questions separate ready buyers from people just browsing." },
      { title: "Follow up", text: "The right person is assigned, and reminders go out until the lead is closed or marked lost." },
    ],
    benefits: [
      "Every enquiry gets a reply, including at night and on Sundays.",
      "Your team spends its time on the leads most likely to buy.",
      "You can see where each lead stands without asking anyone.",
    ],
  },
  "customer-support": {
    symptom: "Your team answers the same few questions all day.",
    problems: [
      "Messages and calls keep coming after closing time, and wait until the next morning.",
      "Timings, prices and order status take up most of the day, because the answer is the same every time.",
      "Customers who wait too long for a reply leave a poor review or go elsewhere.",
    ],
    steps: [
      { title: "Answer", text: "A chatbot, voice agent or WhatsApp assistant replies at once, using your own business information." },
      { title: "Resolve", text: "Routine requests like bookings, rescheduling and order status are handled start to finish." },
      { title: "Hand over", text: "Anything unusual goes to the right person on your team, with the conversation so far attached." },
      { title: "Improve", text: "Questions it couldn't answer are flagged, so you add the answer once and it's covered from then on." },
    ],
    benefits: [
      "Customers get an answer at any hour, not the next working day.",
      "Your team handles the conversations that genuinely need a person.",
      "Every conversation is on record, so nothing promised gets forgotten.",
    ],
  },
  "business-intelligence": {
    symptom: "You only find out how the month went once it's over.",
    problems: [
      "Sales, bookings and payments sit in different tools and spreadsheets.",
      "Someone spends hours every week pulling a report together by hand.",
      "By the time the numbers are ready, it's too late to act on them.",
    ],
    steps: [
      { title: "Connect", text: "Your CRM, sales, accounts and booking tools are linked, so figures flow in on their own." },
      { title: "Tidy", text: "Records are matched and cleaned up, so the same customer isn't counted twice." },
      { title: "Show", text: "The numbers you care about sit on one dashboard that stays up to date." },
      { title: "Alert", text: "You get a message when something needs attention, like a drop in enquiries or a pile of overdue payments." },
    ],
    benefits: [
      "You see how the business is doing this week, not last month.",
      "No more building reports by hand.",
      "Decisions start from the numbers instead of a guess.",
    ],
  },
};
