/* Long-form copy for the /industries/{slug} detail pages, keyed by the slugs in
   content.ts. Drafted descriptive copy, pending client approval: it says what
   each industry struggles with and what we set up, with no figures, client
   names or promised results (vrattiks-standards §3). Each industry's
   solutions mention only services whose service-details.ts entry lists that
   industry, so the two sets of pages agree.

   `useCases` holds slugs from content.ts. Relevant services are not stored
   here: the detail page derives them from service-details.ts. */

export type IndustryDetail = {
  /* One-line outcome under the H1 */
  headline: string;
  /* Hero paragraph */
  intro: string;
  challenges: { title: string; text: string }[];
  solutions: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  useCases: string[];
};

export const industryDetails: Record<string, IndustryDetail> = {
  "real-estate": {
    headline: "Every property enquiry followed up while the buyer is still looking.",
    intro:
      "Enquiries arrive from listing portals, ads, WhatsApp and calls, often at night and on weekends. We set up a voice agent, chatbot, WhatsApp and CRM so each one is answered, qualified and booked for a site visit, with your sales team seeing everything in one place.",
    challenges: [
      {
        title: "Portal leads go cold",
        text: "Buyers enquire about several projects at once. Whoever calls back first usually gets the site visit.",
      },
      {
        title: "Weekend and late-night calls are missed",
        text: "Many enquiries come in when the sales team is off or already out on a site visit.",
      },
      {
        title: "Leads are spread across sheets and phones",
        text: "Each salesperson keeps their own list, so follow-ups get missed and nobody sees the full pipeline.",
      },
    ],
    solutions: [
      {
        title: "A reply to every enquiry",
        text: "Portal, website and ad leads get a call or WhatsApp message as soon as they enquire.",
      },
      {
        title: "Qualified before your team calls",
        text: "Buyers are asked about budget, location and timeline, so your team knows who is ready to visit.",
      },
      {
        title: "Site visits booked and reminded",
        text: "Visits go into your team's calendar, and the buyer gets a reminder before they set out.",
      },
      {
        title: "One pipeline for every lead",
        text: "Every call, chat and message is logged in the CRM against the right buyer.",
      },
    ],
    benefits: [
      { title: "Fewer buyers lost to delay", text: "Quick follow-up means buyers hear from you before they move on to another project." },
      { title: "A sales team that sells", text: "Less time chasing and qualifying, more time with serious buyers." },
      { title: "A clear view of your pipeline", text: "See every lead, its stage and who owns it without asking around." },
    ],
    useCases: ["lead-management", "customer-support"],
  },

  healthcare: {
    headline: "Appointments booked and patients reminded, without tying up your front desk.",
    intro:
      "Clinics and hospitals spend hours on the same calls every day: timings, doctor availability, fees and rescheduling. We answer those calls and chats, book appointments and send reminders, so your staff can focus on the patients in front of them.",
    challenges: [
      {
        title: "The front desk phone never stops",
        text: "Staff juggle calls about timings, availability and fees while patients wait at the counter.",
      },
      {
        title: "Missed appointments leave gaps",
        text: "Patients forget, or can't get through to reschedule, and the slot goes empty.",
      },
      {
        title: "Follow-ups depend on memory",
        text: "Reminders for check-ups, reports and repeat visits go out only when someone remembers.",
      },
    ],
    solutions: [
      {
        title: "Calls and chats answered at any hour",
        text: "Questions about timings, doctors and fees are answered from your clinic's own information.",
      },
      {
        title: "Booking without the back-and-forth",
        text: "Patients pick a slot by phone or on your website, and it goes straight into your schedule.",
      },
      {
        title: "A reminder before every visit",
        text: "Patients get a reminder call ahead of their appointment, with an easy way to reschedule.",
      },
      {
        title: "A website patients can use",
        text: "Clear doctor, service and timing information, with booking built in.",
      },
    ],
    benefits: [
      { title: "A calmer front desk", text: "Routine calls stop interrupting the patients standing in front of your staff." },
      { title: "Fewer empty slots", text: "Reminders and easy rescheduling mean patients either turn up or free the slot in time." },
      { title: "Faster answers for patients", text: "Nobody waits on hold to ask a simple question." },
    ],
    useCases: ["customer-support", "lead-management"],
  },

  finance: {
    headline: "Client questions answered and renewals sent on time.",
    intro:
      "Advisers, brokers and insurance agents lose hours to routine questions, document chasing and renewal reminders. We automate those steps and keep each client's history in one place, so nothing that's due gets missed.",
    challenges: [
      {
        title: "Renewals slip through",
        text: "Policy and payment due dates live in spreadsheets, and reminders go out late or not at all.",
      },
      {
        title: "Chasing documents takes days",
        text: "Collecting ID proofs and supporting papers means repeated calls and messages.",
      },
      {
        title: "The same questions, over and over",
        text: "Clients ask about status, premiums and paperwork, and every answer takes someone's time.",
      },
    ],
    solutions: [
      {
        title: "Instant answers on your website",
        text: "The chatbot handles common client questions and collects details from new enquiries.",
      },
      {
        title: "Renewal and due-date reminders",
        text: "Reminders go out on schedule, with a follow-up if the client doesn't respond.",
      },
      {
        title: "Document requests that follow up on their own",
        text: "Clients get a clear list of what's needed and a nudge until it's in.",
      },
      {
        title: "Every client in one record",
        text: "Policies, conversations and next steps are tracked in the CRM, visible to your whole team.",
      },
    ],
    benefits: [
      { title: "Fewer missed renewals", text: "Due dates trigger reminders on their own instead of depending on someone checking a sheet." },
      { title: "Faster onboarding", text: "Paperwork comes in sooner when clients are reminded automatically." },
      { title: "Time back for advice", text: "Your team spends its hours with clients, not on admin." },
    ],
    useCases: ["customer-support", "lead-management"],
  },

  manufacturing: {
    headline: "Orders, stock and dispatch kept in step without the phone calls.",
    intro:
      "An order usually passes through sales, production, stores and dispatch by phone, email and spreadsheet. We connect those steps so updates move on their own, and everyone, including your customer, knows where an order stands.",
    challenges: [
      {
        title: "Order status lives in people's heads",
        text: "Customers call to ask where their order is, and someone has to go and find out.",
      },
      {
        title: "The same data typed in twice",
        text: "Orders are entered in one system, then copied into another for production and billing.",
      },
      {
        title: "Dealer enquiries go untracked",
        text: "Enquiries from dealers and buyers arrive by phone and email with no single place to follow them up.",
      },
    ],
    solutions: [
      {
        title: "Orders that move through on their own",
        text: "A confirmed order sets off the next steps in production, stores and billing automatically.",
      },
      {
        title: "Status updates for customers",
        text: "Customers are told when their order is confirmed, ready and dispatched.",
      },
      {
        title: "Stock and dispatch alerts",
        text: "Your team is alerted when stock runs low or a dispatch is running late.",
      },
      {
        title: "A CRM for dealers and buyers",
        text: "Every enquiry, quote and order is tracked against the right account.",
      },
    ],
    benefits: [
      { title: "Fewer \"where's my order\" calls", text: "Customers get updates before they need to ask." },
      { title: "Less copy-paste, fewer errors", text: "Data is entered once and reaches every system that needs it." },
      { title: "One view of every account", text: "Sales can see an account's orders and conversations in one place." },
    ],
    useCases: ["business-intelligence", "lead-management"],
  },

  hospitality: {
    headline: "Guests answered and bookings confirmed, at any hour.",
    intro:
      "Hotels, resorts and homestays get booking questions around the clock by phone, website and WhatsApp. We answer those questions, confirm bookings, send check-in details and ask for a review after the stay, so your team can look after the guests already with you.",
    challenges: [
      {
        title: "Booking enquiries after hours",
        text: "Guests ask late at night, and the ones who don't hear back book somewhere else.",
      },
      {
        title: "The same questions all day",
        text: "Check-in times, parking, meals and directions take up the front desk's time.",
      },
      {
        title: "Reviews are left to chance",
        text: "Happy guests rarely leave a review unless someone asks at the right moment.",
      },
    ],
    solutions: [
      {
        title: "Calls and chats answered straight away",
        text: "The voice agent and website chatbot answer room, rate and facility questions from your own information.",
      },
      {
        title: "Confirmations on WhatsApp",
        text: "Guests get their booking confirmation, directions and check-in details on the app they already use.",
      },
      {
        title: "A website built to take enquiries",
        text: "Rooms and facilities shown clearly, with every enquiry passed straight to your team.",
      },
      {
        title: "Review requests after checkout",
        text: "A friendly WhatsApp message asks guests for a review once they've left.",
      },
    ],
    benefits: [
      { title: "Fewer lost bookings", text: "Late-night enquiries get an answer while the guest is still deciding." },
      { title: "A lighter front desk", text: "Routine questions are handled before they reach your staff." },
      { title: "More guests asked for reviews", text: "Every guest is asked at the right time, not just the ones your staff remember." },
    ],
    useCases: ["customer-support", "lead-management"],
  },

  "edtech-coaching": {
    headline: "Course enquiries followed up and students reminded, without a calling team.",
    intro:
      "Coaching institutes and online course providers get enquiries from ads, websites and WhatsApp, then spend hours on follow-up calls, fee reminders and class updates. We automate that communication so your team can focus on teaching and counselling.",
    challenges: [
      {
        title: "Enquiries pile up at admission time",
        text: "Ad campaigns bring in more leads than the counselling team can call back.",
      },
      {
        title: "Fee and class reminders sent by hand",
        text: "Staff send batch timings, fee due dates and schedule changes one message at a time.",
      },
      {
        title: "Parents and students ask the same things",
        text: "Course details, fees and batch timings are asked about again and again.",
      },
    ],
    solutions: [
      {
        title: "A reply to every enquiry",
        text: "The chatbot and WhatsApp answer course questions and collect details the moment someone enquires.",
      },
      {
        title: "Follow-ups that run on their own",
        text: "New leads get helpful messages until they book a demo class or counselling session.",
      },
      {
        title: "Fee and class reminders, sent automatically",
        text: "Due dates and schedule changes reach the right batch on time.",
      },
      {
        title: "A website that turns visitors into enquiries",
        text: "Clear course pages, with enquiry forms that feed straight into your follow-up.",
      },
    ],
    benefits: [
      { title: "Counsellors talk to interested students", text: "Routine questions are answered before a counsellor picks up the phone." },
      { title: "Fewer missed fee dates", text: "Reminders go out on time without anyone tracking a spreadsheet." },
      { title: "Parents stay informed", text: "Updates reach students and parents on WhatsApp, where they'll see them." },
    ],
    useCases: ["lead-management", "customer-support"],
  },

  "higher-education": {
    headline: "Every applicant guided from first question to enrolment.",
    intro:
      "Colleges and universities get a rush of admission questions every intake, by phone and online. We answer those questions, track each applicant's progress and remind them of the next step, so your admissions team can focus on the applicants who need a real conversation.",
    challenges: [
      {
        title: "Admission season swamps the office",
        text: "Phone lines and inboxes fill up with the same questions about courses, eligibility and deadlines.",
      },
      {
        title: "Applicants drop off between steps",
        text: "Students start an application, then stall at documents or fees with nobody following up.",
      },
      {
        title: "No single view of each applicant",
        text: "Enquiries, calls and forms sit in different places, so counsellors don't see the full picture.",
      },
    ],
    solutions: [
      {
        title: "Admission questions answered at any hour",
        text: "The voice agent and chatbot answer course, eligibility and deadline questions from your own prospectus.",
      },
      {
        title: "A nudge at every step",
        text: "Applicants are reminded about pending documents, fees and deadlines.",
      },
      {
        title: "Every applicant tracked in one place",
        text: "The CRM shows where each applicant stands and who should contact them next.",
      },
      {
        title: "Handover to your counsellors",
        text: "Applicants who need a conversation are passed to your team along with their details.",
      },
    ],
    benefits: [
      { title: "A calmer admissions season", text: "Routine questions no longer bury the admissions office." },
      { title: "Fewer applicants lost midway", text: "Timely reminders keep applications moving to completion." },
      { title: "Counsellors with context", text: "Every conversation starts with the applicant's full history." },
    ],
    useCases: ["lead-management", "customer-support"],
  },

  "restaurants-food": {
    headline: "Bookings and orders on WhatsApp, and a review request after every visit.",
    intro:
      "Restaurants, cafés and cloud kitchens take bookings and orders over calls and messages during their busiest hours. We move bookings and orders onto WhatsApp and your website, bring them into one place, and ask diners for a review afterwards.",
    challenges: [
      {
        title: "The phone rings during service",
        text: "Staff stop serving tables to take bookings and answer calls.",
      },
      {
        title: "Orders get lost between channels",
        text: "Phone, WhatsApp and website orders are noted down in different places.",
      },
      {
        title: "Regulars aren't brought back",
        text: "There's no simple way to tell past diners about new dishes or offers.",
      },
    ],
    solutions: [
      {
        title: "Table bookings on WhatsApp",
        text: "Diners book on WhatsApp and get a confirmation and reminder automatically.",
      },
      {
        title: "Orders in one place",
        text: "WhatsApp and website orders land in one list your kitchen can work from.",
      },
      {
        title: "A review request after each visit",
        text: "A short message after the meal asks happy diners for a review.",
      },
      {
        title: "Updates for your regulars",
        text: "Share new menus and offers with diners who have chosen to hear from you.",
      },
    ],
    benefits: [
      { title: "Staff stay on the floor", text: "Bookings are handled without anyone leaving a table." },
      { title: "Fewer mixed-up orders", text: "Every order is written down once, in one place." },
      { title: "Diners hear from you again", text: "Past guests get your news on the app they already check." },
    ],
    useCases: ["lead-management", "customer-support"],
  },

  "salons-spas-wellness": {
    headline: "Appointment slots filled and no-shows cut, without staff on the phone.",
    intro:
      "Salons, spas and wellness centres take most bookings by phone and WhatsApp, often while staff are with a client. We answer those calls and messages, book appointments, send reminders and invite regulars back when they're due.",
    challenges: [
      {
        title: "Calls come in mid-appointment",
        text: "Staff can't pick up while they're with a client, so callers book somewhere else.",
      },
      {
        title: "No-shows leave empty chairs",
        text: "Clients forget their appointment, and the slot can't be filled at short notice.",
      },
      {
        title: "Regulars drift away",
        text: "Nothing reminds a client when they're due for their next visit.",
      },
    ],
    solutions: [
      {
        title: "Every call answered",
        text: "The voice agent takes bookings and answers questions about services and prices.",
      },
      {
        title: "Booking and reminders on WhatsApp",
        text: "Clients book, then get a confirmation and a reminder before they arrive.",
      },
      {
        title: "Easy rescheduling",
        text: "Clients who can't make it can move their slot, freeing it for someone else.",
      },
      {
        title: "Come-back reminders",
        text: "Clients get a friendly message when they're due for their next visit.",
      },
    ],
    benefits: [
      { title: "Fewer empty slots", text: "Reminders and easy rescheduling keep your calendar full." },
      { title: "Staff stay with clients", text: "No more stepping away mid-service to answer the phone." },
      { title: "Regulars reminded on time", text: "Clients hear from you when they're due, not only when they remember." },
    ],
    useCases: ["lead-management", "customer-support"],
  },

  automobile: {
    headline: "Test-drive leads followed up and service reminders sent on time.",
    intro:
      "Dealerships and service centres get leads from ads, walk-ins and calls, and repeat business from timely servicing. We follow up every lead, book test drives and send service reminders, with each customer's history kept in one place.",
    challenges: [
      {
        title: "Test-drive leads cool off",
        text: "Buyers compare dealers, and slow follow-up hands the sale to someone else.",
      },
      {
        title: "Service reminders are missed",
        text: "Due dates sit in the system, but calling every customer takes more time than the team has.",
      },
      {
        title: "Customer history is scattered",
        text: "Sales, service and follow-up records live in different places.",
      },
    ],
    solutions: [
      {
        title: "Every lead called back quickly",
        text: "The voice agent calls new leads, answers model and price questions and books test drives.",
      },
      {
        title: "Service reminders by call and WhatsApp",
        text: "Customers are reminded when a service is due and can book a slot straight away.",
      },
      {
        title: "Updates on WhatsApp",
        text: "Booking confirmations, service status and pickup alerts go out automatically.",
      },
      {
        title: "One record per customer",
        text: "The CRM keeps each customer's vehicle, visits and conversations together.",
      },
    ],
    benefits: [
      { title: "Leads reached while they're comparing", text: "Buyers hear from you before they settle on another dealer." },
      { title: "Steadier service bookings", text: "Customers are reminded on time, every time." },
      { title: "Every customer's history in one place", text: "Sales and service see the same record." },
    ],
    useCases: ["lead-management", "customer-support"],
  },

  construction: {
    headline: "Project enquiries, vendor follow-ups and site updates kept moving.",
    intro:
      "Builders and infrastructure firms juggle client enquiries, vendor quotes and site progress across calls, emails and spreadsheets. We connect those steps, track every enquiry and contact in one CRM, and build a website that brings in the right enquiries.",
    challenges: [
      {
        title: "Enquiries get lost in inboxes",
        text: "Project leads arrive by email, phone and website with no single place to track them.",
      },
      {
        title: "Chasing vendors and approvals",
        text: "Quotes, material orders and approvals need constant follow-up calls.",
      },
      {
        title: "Site updates arrive late",
        text: "Clients ask for progress, and someone has to collect it from the site.",
      },
    ],
    solutions: [
      {
        title: "Every enquiry tracked",
        text: "Leads from your website and calls go into one CRM, each with a clear next step.",
      },
      {
        title: "Vendor follow-ups on schedule",
        text: "Vendors are reminded automatically when quotes or deliveries are due.",
      },
      {
        title: "Site updates that reach the office",
        text: "Updates logged on site reach the office and the client without extra calls.",
      },
      {
        title: "A website that shows your work",
        text: "Projects and capabilities presented clearly, with enquiry forms that feed your CRM.",
      },
    ],
    benefits: [
      { title: "No lost project leads", text: "Every enquiry has an owner and a next step." },
      { title: "Less time chasing", text: "Follow-ups run on schedule instead of on memory." },
      { title: "Clients who feel informed", text: "Progress reaches clients before they have to ask." },
    ],
    useCases: ["lead-management", "business-intelligence"],
  },
};
