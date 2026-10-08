/* Privacy Policy text. Version 2.0 extends the client's v1.0 (which covered
   WhatsApp and Meta Lead Ads only) to the full service range sold on this
   site: AI Voice Agent, AI Chatbot, Workflow Automation, Website Development,
   WhatsApp Automation and CRM, plus the website's own contact form. Contact
   details, the Grievance Officer, the Meta sections and the v1.0 retention
   periods are carried over unchanged. It is a legal document — have the
   client sign off any change before it ships (vrattiks-standards §3). Emails
   and URLs inside strings are turned into links when rendered. */

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  /* Bold lead term followed by its explanation, e.g. "Consent — Where you…" */
  | { type: "terms"; sep: "—" | ":"; items: { term: string; text: string }[] }
  /* Label/value pairs; a value with several lines is an array */
  | { type: "fields"; items: { label: string; value: string | string[] }[] }
  | { type: "note"; label: string; text: string };

export type PolicySection = {
  id: string;
  title: string;
  blocks: PolicyBlock[];
};

export const privacyPolicyMeta = {
  effectiveDate: "October 7, 2026",
  lastUpdated: "October 7, 2026",
  version: "2.0",
  entity: "Vrattiks Intelligence LLP",
  copyright: "© 2026 Vrattiks Intelligence LLP. All rights reserved.",
  tagline: "Adaptive Intelligence. Built with Purpose.",
};

export const privacyPolicy: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        type: "p",
        text: 'Vrattiks Intelligence LLP ("Vrattiks", "we", "our", or "us") is an Adaptive Intelligence and AI Automation company registered in India. We build and run AI-powered systems for businesses, including AI voice agents, AI chatbots, WhatsApp automation, workflow automation, CRM systems, and business websites, along with our SaaS products such as Vrattiks S1. Our clients are businesses across sectors such as real estate, healthcare, finance, education, hospitality, retail, manufacturing, and automobile.',
      },
      {
        type: "p",
        text: "This Privacy Policy describes how we collect, use, store, share, and protect personal information when you:",
      },
      {
        type: "list",
        items: [
          "Visit our website, www.vrattiks.io, or fill in an enquiry form on it",
          "Use any of our products or services as a client or partner",
          "Communicate with us by phone, WhatsApp, email, or any other channel",
          "Speak to an AI voice agent, chat with an AI chatbot, or exchange WhatsApp messages with a business that uses Vrattiks",
          "Are a lead or customer whose details are held in a CRM or automated workflow that we run for one of our clients",
        ],
      },
      {
        type: "p",
        text: "We process your data only with your consent, as required to fulfil our contract with you, or as required by applicable law — as described in this Policy. If you do not agree with these practices, please discontinue use of our services and contact us to request deletion of any data we hold about you.",
      },
    ],
  },
  {
    id: "company-information",
    title: "Company Information",
    blocks: [
      {
        type: "fields",
        items: [
          { label: "Legal Entity Name", value: "Vrattiks Intelligence LLP" },
          { label: "Type of Entity", value: "Limited Liability Partnership (LLP), registered in India" },
          {
            label: "Primary Business",
            value: "AI Voice Agents, AI Chatbots, WhatsApp Automation, Workflow Automation, CRM, Website Development, and SaaS Products",
          },
          {
            label: "Contact for Privacy Matters",
            value: ["Email: vrattiks@gmail.com", "Website: www.vrattiks.io"],
          },
        ],
      },
      {
        type: "p",
        text: "For any privacy-related queries, data requests, or consent withdrawal, please contact us at vrattiks@gmail.com. We will respond within 30 business days.",
      },
    ],
  },
  {
    id: "our-role",
    title: "Our Role: Who Is Responsible for Your Data",
    blocks: [
      {
        type: "p",
        text: "Our responsibility for your data depends on how you come into contact with us:",
      },
      {
        type: "terms",
        sep: "—",
        items: [
          {
            term: "When Vrattiks decides how data is used",
            text: "For visitors to our website, people who send us an enquiry, and our own clients and partners, Vrattiks is the Data Fiduciary under India's Digital Personal Data Protection Act, 2023 (DPDPA). We decide why and how this data is processed, and this Policy applies in full.",
          },
          {
            term: "When we act for a business client",
            text: "When we run a voice agent, chatbot, WhatsApp channel, CRM, or automated workflow for a business, that business is the Data Fiduciary for its customers' data and Vrattiks is its Data Processor. We process that data only on the client's instructions and only to deliver the service they have contracted.",
          },
        ],
      },
      {
        type: "p",
        text: "If you are a customer of a business that uses Vrattiks, that business's own privacy policy also applies to you, and it is usually the best first contact for requests about your data. We will help the business respond, and you can also contact us directly at vrattiks@gmail.com.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect information necessary to provide our services, ensure legal compliance, and improve your experience. The types of data we collect include:",
      },
      { type: "h3", text: "4.1 Website Enquiries" },
      {
        type: "p",
        text: "When you send us an enquiry through the contact form on our website, we collect:",
      },
      {
        type: "list",
        items: [
          "Your name and work email address",
          "Your phone number and company name, if you choose to give them",
          "The service you are interested in, and the message you write to us",
        ],
      },
      {
        type: "p",
        text: "Your enquiry is delivered to our team by email so that we can reply to you. We use it only to respond to your enquiry and to discuss the services you asked about.",
      },
      { type: "h3", text: "4.2 Client and Onboarding Information" },
      {
        type: "list",
        items: [
          "Name, business name, email address, and phone number of the client's contact persons",
          "Business category, industry type, and location",
          "Information about your business that you share for setting up our services, such as FAQs, product and price lists, call scripts, and support processes",
          "Login access or connection details for the tools you ask us to connect, such as your CRM, calendar, forms, or accounting software",
          "Billing and payment information (processed securely via third-party payment gateways)",
          "Any content, data, or files you share with us during onboarding or support",
        ],
      },
      { type: "h3", text: "4.3 Data We Process on Behalf of Our Clients" },
      {
        type: "p",
        text: "When we run a service for a business, we process the following data about that business's customers and leads, depending on the services the business has chosen:",
      },
      {
        type: "terms",
        sep: "—",
        items: [
          {
            term: "AI Voice Agent",
            text: "Caller phone numbers, call date, time and duration, call recordings, call transcripts, and the details a caller gives during the call, such as their name, requirement, or preferred appointment time.",
          },
          {
            term: "AI Chatbot",
            text: "Chat conversations on the client's website or app, and the contact details a visitor chooses to share in the chat.",
          },
          {
            term: "WhatsApp Automation",
            text: "WhatsApp phone numbers, message content and metadata (timestamps, delivery status, read receipts), and opt-in and opt-out consent records. See Section 8 for details.",
          },
          {
            term: "CRM",
            text: "Lead and customer records, including name, contact details, enquiry source, interaction history, notes, follow-up tasks, and deal or booking status.",
          },
          {
            term: "Workflow Automation",
            text: "The data that passes between the client's connected tools to complete a task, such as form submissions, orders, invoices, payment reminders, and appointment details.",
          },
          {
            term: "Website Development",
            text: "Enquiries and form submissions made on websites we build or manage for clients, which are passed to the client's CRM, email, or WhatsApp.",
          },
        ],
      },
      {
        type: "note",
        label: "Note",
        text: "Vrattiks operates as a technology service provider. Conversation content, call recordings, and customer records are processed solely to deliver the service contracted by our business clients. We do not monetise them or use them for any purpose beyond service delivery. Our team accesses them only where needed to set up, support, or fix the service.",
      },
      { type: "h3", text: "4.4 Automatically Collected Data (Website)" },
      {
        type: "list",
        items: [
          "IP address, browser type, device information, and operating system, as recorded in standard server logs",
          "Pages visited, time of visit, and referring website",
          "Your light or dark display preference, stored in your own browser (see Section 12)",
        ],
      },
      { type: "h3", text: "4.5 Third-Party Sources" },
      {
        type: "list",
        items: [
          "Business contact information from public directories or LinkedIn for limited business-to-business partnership research, never for WhatsApp promotional messaging or automated calls unless explicit consent has been collected",
          "Data received from Meta/WhatsApp as part of the WhatsApp Business API and Lead Ads integrations",
          "Data received from the tools a client connects to our services, such as their CRM, forms, ad platforms, or calendar",
        ],
      },
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing Personal Data",
    blocks: [
      {
        type: "p",
        text: "Vrattiks processes personal data under the following legal bases, in compliance with India's Digital Personal Data Protection Act, 2023 (DPDPA) and applicable international frameworks:",
      },
      {
        type: "terms",
        sep: "—",
        items: [
          {
            term: "Consent",
            text: "Where you or your customers have provided explicit consent, such as opting in to receive WhatsApp messages, agreeing to be called back, or submitting an enquiry form.",
          },
          {
            term: "Contractual Necessity",
            text: "Where data processing is required to fulfil our agreement with you as a client or partner.",
          },
          {
            term: "Legitimate Uses",
            text: "Where processing is needed to operate, secure, and support our services, or to respond to an enquiry you have sent us, provided it does not override your rights.",
          },
          {
            term: "Legal Obligation",
            text: "Where processing is necessary to comply with applicable Indian law, Meta's WhatsApp Business policies, telecom regulations, or other regulatory requirements.",
          },
        ],
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    blocks: [
      { type: "p", text: "We use the information we collect for the following purposes:" },
      { type: "h3", text: "6.1 Service Delivery" },
      {
        type: "list",
        items: [
          "Answering and making calls through AI voice agents, and passing calls to the client's team when a person is needed",
          "Replying to website and app visitors through AI chatbots, and handing conversations to the client's team where needed",
          "Setting up and managing WhatsApp Business Platform workflows for consented customer communication",
          "Logging leads, customers, and their conversations in the client's CRM, and reminding the client's team of follow-ups",
          "Moving information between the client's connected tools so that routine tasks run without manual work",
          "Building and maintaining client websites and connecting their enquiry forms to the client's systems",
          "Providing call, chat, and campaign reports and analytics to the client",
        ],
      },
      { type: "h3", text: "6.2 Platform Operations" },
      {
        type: "list",
        items: [
          "Maintaining and improving our products and services (including Vrattiks S1)",
          "Reviewing call and chat quality, on behalf of the client, to fix errors and improve answers for that client's own service",
          "Ensuring system security, preventing fraud, and monitoring for abuse",
          "Processing payments and managing billing",
        ],
      },
      { type: "h3", text: "6.3 Communication" },
      {
        type: "list",
        items: [
          "Replying to enquiries sent through our website, by email, or by phone",
          "Responding to your support queries and service requests",
          "Sending product updates, service announcements, or critical notices",
          "Sending marketing communications, only where you have explicitly opted in",
        ],
      },
      { type: "h3", text: "6.4 Compliance & Legal" },
      {
        type: "list",
        items: [
          "Maintaining consent records as required by Meta's WhatsApp Business Policy and applicable telecom rules",
          "Complying with applicable Indian laws, including the DPDPA, 2023",
          "Responding to lawful requests from regulatory authorities",
        ],
      },
    ],
  },
  {
    id: "ai-and-automation",
    title: "AI Processing & Automated Conversations",
    blocks: [
      {
        type: "p",
        text: "Our voice agents, chatbots, and WhatsApp automation use artificial intelligence to understand what a person says or writes and to reply. To do this, conversation audio and text are processed by speech-to-text, text-to-speech, and AI language model services, some of which are provided by trusted third-party providers acting on our instructions.",
      },
      { type: "h3", text: "7.1 How We Use AI Responsibly" },
      {
        type: "list",
        items: [
          "AI replies are based on the information each client provides about its own business, such as its services, prices, timings, and policies",
          "We do not use one client's customer data to train AI models or to serve another client",
          "We do not use conversation data to make decisions that have legal or similarly significant effects on a person, such as approving or rejecting a loan or a medical treatment; such decisions remain with the client's team",
          "Every automated conversation must offer a way to reach a person at the business, such as a call transfer, a callback, email, or a support form",
        ],
      },
      { type: "h3", text: "7.2 Call Recording and Disclosure" },
      {
        type: "p",
        text: "Calls handled by an AI voice agent may be recorded and transcribed so that the business can review the conversation, follow up on your request, and improve its service. Clients must inform callers that they are speaking with an automated assistant and that the call may be recorded, and must make outbound calls only to people who have asked to be contacted or have otherwise consented to such calls, in line with applicable telecom regulations.",
      },
      { type: "h3", text: "7.3 Sensitive Information" },
      {
        type: "p",
        text: "Some of our clients work in healthcare, finance, and education. Our services are designed to collect only the information a business needs to respond to an enquiry, book an appointment, or follow up. Clients must not configure our services to ask for passwords, full card numbers, bank PINs, OTPs, or detailed medical records. Where a client's sector has additional data rules, the client remains responsible for following them, and we process such data only on the client's instructions with restricted access.",
      },
    ],
  },
  {
    id: "whatsapp-and-meta",
    title: "WhatsApp Data & Meta Platform Compliance",
    blocks: [
      {
        type: "p",
        text: "Vrattiks uses the Meta WhatsApp Cloud API to power WhatsApp-based communication for our clients and their customers. Our practices with respect to WhatsApp data are governed by both this Privacy Policy and the Meta WhatsApp Business Terms of Service.",
      },
      { type: "h3", text: "8.1 Data We Process on Meta's Platform" },
      {
        type: "list",
        items: [
          "Phone numbers and profile information of end-users who interact with WhatsApp Business accounts managed by Vrattiks on behalf of our clients",
          "WhatsApp message templates submitted for Meta approval",
          "Delivery, read, and engagement metadata returned by the WhatsApp Cloud API",
        ],
      },
      { type: "h3", text: "8.2 Consent for WhatsApp Communication" },
      {
        type: "p",
        text: "Vrattiks and its clients must collect user consent before initiating WhatsApp communications. Our systems and onboarding process require the following:",
      },
      {
        type: "list",
        items: [
          "Businesses must clearly identify themselves when collecting opt-in consent",
          "Customers must be informed that they will receive WhatsApp messages from the specific business",
          "Opt-in must cover the message categories that will be sent, such as support, service updates, or offers",
          "Separate consent is required before initiating WhatsApp calls or unrelated promotional conversations",
          "Consent records must show the source, timestamp, consent language, and phone number where available",
          "Opt-out requests are honoured immediately and recorded in the system",
          "We maintain verifiable records of all opt-in consents collected",
        ],
      },
      { type: "h3", text: "8.3 What Meta Receives" },
      {
        type: "p",
        text: "When using the WhatsApp Cloud API, certain metadata (such as phone numbers and message delivery status) may be processed by Meta's systems according to WhatsApp's own business terms and privacy practices. For more information, please review Meta's Privacy Policy at www.whatsapp.com/legal/privacy-policy.",
      },
      { type: "h3", text: "8.4 Prohibited Uses" },
      {
        type: "list",
        items: [
          "We do not use WhatsApp data to profile users beyond the purpose of the contracted service",
          "We do not sell or rent WhatsApp contact data to any third party",
          "We do not send unsolicited, scraped-list, purchased-list, or spam messages through any WhatsApp account we manage",
          "We do not use public directory, LinkedIn, or cold outreach data for WhatsApp campaigns without explicit opt-in consent",
          "We do not operate or support unauthorized messaging at scale or messaging that surprises, deceives, or pressures users",
          "We do not knowingly support WhatsApp messaging for prohibited, illegal, misleading, or restricted goods and services",
        ],
      },
      { type: "h3", text: "8.5 Business Profile, Support & Escalation" },
      {
        type: "p",
        text: "Businesses using WhatsApp through Vrattiks must keep their WhatsApp Business profile accurate and provide customer support contact information. Automated replies must include a clear path for users to reach a human or official support channel where needed.",
      },
      {
        type: "list",
        items: [
          "Supported escalation paths may include human agent handoff, email, phone, web support, or support forms",
          "Business profile details, website, email, and phone information must remain accurate and up to date",
          "Clients are responsible for proving that their WhatsApp use complies with applicable law and Meta/WhatsApp policies",
        ],
      },
      { type: "h3", text: "8.6 Facebook & Instagram Lead Ads Data" },
      {
        type: "p",
        text: "When a business client connects Vrattiks to Meta's Lead Ads API (Facebook or Instagram lead forms), we access and store lead information submitted by users through those forms. This may include:",
      },
      {
        type: "list",
        items: [
          "Full name, phone number, and email address",
          "Responses to custom questions included in the lead form",
          "Lead submission timestamp and form/campaign identifiers",
        ],
      },
      {
        type: "note",
        label: "How we use Lead Ads data",
        text: "Lead data accessed via the Meta Lead Ads API is used solely to fulfil the contracted CRM or automation service for the business client who owns the lead form. This data is never sold, shared with advertisers, or used for any purpose outside the contracted service. Lead data is retained in accordance with Section 11 of this Policy and deleted upon client request or contract termination.",
      },
      { type: "h3", text: "8.7 Meta API Permissions We Use" },
      {
        type: "p",
        text: "When a client connects their Facebook or Instagram account to Vrattiks, we request the following Meta platform permissions. Each is used only for the specific purpose described:",
      },
      {
        type: "terms",
        sep: "—",
        items: [
          {
            term: "leads_retrieval",
            text: "To fetch lead form submissions from Facebook and Instagram Lead Ads on behalf of the connected client. This is the core permission enabling CRM lead capture.",
          },
          {
            term: "pages_manage_metadata",
            text: "To access page metadata (name, ID, category) required to connect and manage the client's Facebook Page within Vrattiks.",
          },
          {
            term: "pages_read_engagement",
            text: "To read page engagement data for analytics and reporting features within the CRM dashboard.",
          },
          {
            term: "pages_show_list",
            text: "To display the list of Facebook Pages managed by the user, so they can select which Page to connect during onboarding.",
          },
        ],
      },
      {
        type: "note",
        label: "Scope of use",
        text: "All Meta API permissions are used exclusively for the CRM functionality described in this Policy. Data obtained via these permissions is never transferred to other platforms, sold to third parties, or used for advertising purposes. Access is maintained only while the client's integration is active and is revoked upon disconnection or account termination. We comply with all Meta Platform Terms and Meta Platform Policies.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    blocks: [
      {
        type: "p",
        text: "Vrattiks does not sell, rent, or trade personal data. We share data only in the following limited circumstances:",
      },
      {
        type: "terms",
        sep: "—",
        items: [
          {
            term: "Meta Platforms Inc.",
            text: "As required to operate the WhatsApp Business API and Lead Ads integrations and comply with Meta's terms of service.",
          },
          {
            term: "Service Providers",
            text: "Trusted third-party vendors who help us deliver our services, such as cloud hosting, telephony and calling providers, speech and AI model providers, email delivery, and payment processing. They may use the data only to provide their service to us and are bound by confidentiality and data processing terms.",
          },
          {
            term: "Our Clients",
            text: "Data collected through a voice agent, chatbot, WhatsApp channel, website, or CRM that we run for a business is shared with that business, as it is their customer data.",
          },
          {
            term: "Tools Connected by Our Clients",
            text: "Where a client asks us to connect their own software, such as a CRM, calendar, spreadsheet, or accounting tool, data moves into that software as the client has instructed.",
          },
          {
            term: "Legal Authorities",
            text: "Where required by law, court order, or regulatory authority in India or applicable jurisdictions.",
          },
          {
            term: "Business Transfers",
            text: "In the event of a merger, acquisition, or restructuring, personal data may be transferred as part of that transaction, with appropriate notice to affected users.",
          },
        ],
      },
      {
        type: "p",
        text: "We never share your personal data with advertisers, data brokers, or marketing networks without your explicit consent.",
      },
      {
        type: "note",
        label: "For Business Clients",
        text: "Clients who require a Data Processing Agreement (DPA) for compliance or enterprise procurement purposes may request one at vrattiks@gmail.com. A current list of sub-processors used in delivering our services is also available upon request at the same address.",
      },
    ],
  },
  {
    id: "data-storage-and-security",
    title: "Data Storage & Security",
    blocks: [
      {
        type: "p",
        text: "We are committed to protecting your personal data using industry-standard security practices:",
      },
      {
        type: "list",
        items: [
          "Data is stored on secure cloud infrastructure with access controls and encryption at rest",
          "All data transmitted between our systems and third-party services (including Meta and our calling and AI providers) is encrypted using HTTPS/TLS",
          "Each client's data is kept separate from other clients' data",
          "Access to personal data, including call recordings and conversation history, is restricted to authorised personnel on a need-to-know basis",
          "Login details for tools that clients connect to our services are stored securely and used only for the connection the client approved",
          "We conduct periodic security reviews and monitor our systems for vulnerabilities",
          "In the event of a data breach that poses a risk to your rights, we will notify affected users and the relevant authorities within the timeframes required by applicable law",
        ],
      },
      {
        type: "p",
        text: "Primary data storage is in India. Where data is processed outside India (e.g., via Meta's WhatsApp Cloud API infrastructure or our AI and speech providers), we ensure appropriate safeguards are in place consistent with applicable data protection laws.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain personal data only for as long as necessary to fulfil the purposes outlined in this Policy, or as required by law:",
      },
      {
        type: "terms",
        sep: ":",
        items: [
          {
            term: "Website enquiries",
            text: "Retained for as long as needed to respond and follow up, and for up to 2 years if no business relationship follows.",
          },
          {
            term: "Lead data from Facebook / Instagram Lead Ads",
            text: "Retained for up to 2 years from the date of collection, or until deletion is requested by the client or end-user.",
          },
          {
            term: "WhatsApp messages, chatbot conversations, call recordings, and transcripts",
            text: "Retained for up to 1 year from the date of collection, unless a shorter period is requested by the client or required by law.",
          },
          {
            term: "CRM and workflow data held for a client",
            text: "Retained while the client's service is active. On contract termination, it is returned to the client on request and then deleted.",
          },
          {
            term: "Client account data",
            text: "Retained for the duration of the client relationship and up to 3 years after termination, for legal and audit purposes.",
          },
          {
            term: "Consent records (opt-in/opt-out)",
            text: "Retained for a minimum of 5 years to comply with regulatory requirements.",
          },
          {
            term: "Website server logs",
            text: "Retained for up to 1 year, and used in aggregated form only.",
          },
        ],
      },
      {
        type: "p",
        text: "Upon the expiry of retention periods, data is securely deleted or anonymised so that it can no longer be attributed to an individual.",
      },
      { type: "h3", text: "11.1 Data Deletion Requests" },
      {
        type: "p",
        text: "You may request deletion of your personal data at any time by contacting us at vrattiks@gmail.com or our Grievance Officer at hitesh@vrattiks.io. We will process deletion requests within 30 days of receipt. Where the data belongs to one of our business clients, we will pass your request to that business and act on its instructions.",
      },
      {
        type: "note",
        label: "Meta Data Deletion Callback",
        text: "If you submitted data through a Facebook or Instagram Lead Ad form managed by one of our clients, you may submit an automated deletion request via our Meta-compliant Data Deletion Callback endpoint: https://vrattiks-s1.onrender.com/meta/data-deletion. You can also trigger this by removing Vrattiks from your connected apps in Facebook's App Settings.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Website Tracking",
    blocks: [
      {
        type: "p",
        text: "Our website, www.vrattiks.io, does not use advertising or marketing cookies. It stores the following in your browser:",
      },
      {
        type: "terms",
        sep: "—",
        items: [
          {
            term: "Display Preference",
            text: "If you switch between light and dark mode, your choice is saved in your browser's local storage so the site remembers it on your next visit. It stays on your device and is not sent to us.",
          },
          {
            term: "Essential Technical Data",
            text: "Our hosting provider may use strictly necessary technical data to deliver pages securely and protect the site against abuse.",
          },
        ],
      },
      {
        type: "p",
        text: "If we add analytics or marketing cookies in the future, we will update this Policy and ask for your consent before setting any non-essential cookies. You can clear stored data or block cookies through your browser settings at any time.",
      },
      {
        type: "p",
        text: "Websites and chatbots that we build for our clients may use their own cookies. These are governed by the client's own cookie and privacy policy.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    blocks: [
      {
        type: "p",
        text: "Under India's Digital Personal Data Protection Act, 2023 (DPDPA) and applicable international frameworks, you have the following rights regarding your personal data:",
      },
      {
        type: "terms",
        sep: "—",
        items: [
          {
            term: "Right to Access",
            text: "You may request a summary of the personal data we hold about you, including call recordings or conversation records, and how it is used.",
          },
          {
            term: "Right to Correction",
            text: "You may request that inaccurate or incomplete data be corrected.",
          },
          {
            term: "Right to Erasure",
            text: "You may request deletion of your personal data, subject to legal retention obligations.",
          },
          {
            term: "Right to Withdraw Consent",
            text: "Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.",
          },
          {
            term: "Right to Speak to a Person",
            text: "You may ask, at any point in an automated call or chat, to be connected with a member of the business's team.",
          },
          {
            term: "Right to Grievance Redressal",
            text: "You may raise a complaint with us and expect a response within 30 business days.",
          },
          {
            term: "Right to Nominate",
            text: "Under the DPDPA, you may nominate another person to exercise your rights in the event of your death or incapacity.",
          },
        ],
      },
      {
        type: "p",
        text: "To exercise any of these rights, please contact us at vrattiks@gmail.com. We may request identity verification before processing your request. If your data is held for one of our business clients, we will work with that business to respond.",
      },
    ],
  },
  {
    id: "opting-out",
    title: "Opting Out of Automated Calls & Messages",
    blocks: [
      {
        type: "p",
        text: "If you receive calls or messages from a business powered by Vrattiks, you can stop them at any time:",
      },
      {
        type: "list",
        items: [
          'WhatsApp: reply "STOP" or "Unsubscribe" to any message you receive',
          "Calls: tell the voice agent during the call that you do not want to be called again",
          "Email: use the unsubscribe link in any marketing email",
          "Contact the business directly and request removal from their contact list",
          "Contact us at vrattiks@gmail.com if you believe your opt-out has not been honoured",
        ],
      },
      {
        type: "p",
        text: "All opt-out requests are honoured within 24 hours. You will not receive further promotional or campaign calls or messages after opting out. Transactional messages directly related to your active relationship with the business, such as appointment confirmations or order updates, may still be sent where legally permitted.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. Where a client, such as a school, coaching institute, or college, uses our services to communicate about students under 18, the client must obtain verifiable consent from a parent or guardian as required by the DPDPA, and communication should be directed to the parent or guardian. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at vrattiks@gmail.com and we will take steps to delete the information.",
      },
    ],
  },
  {
    id: "international-users",
    title: "International Users",
    blocks: [
      {
        type: "p",
        text: "Vrattiks is incorporated in India and primarily serves Indian businesses. If you are accessing our services from outside India, please be aware that your data may be transferred to, stored, and processed in India, where data protection laws may differ from those in your jurisdiction.",
      },
      {
        type: "p",
        text: "For users in the European Economic Area (EEA) or United Kingdom, we process data in accordance with applicable GDPR principles, including data minimisation, purpose limitation, and lawful processing bases. For users in other jurisdictions, we comply with the relevant local privacy laws to the extent they apply.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or best practices. When we make material changes, we will:",
      },
      {
        type: "list",
        items: [
          "Update the Effective Date at the top of this document",
          "Post a prominent notice on our website",
          "Notify registered clients via email and seek fresh consent where required by law",
        ],
      },
      {
        type: "p",
        text: "For non-material changes (e.g., formatting, clarifications), the updated Policy will take effect on the date shown. We encourage you to review this page periodically to stay informed of any updates.",
      },
    ],
  },
  {
    id: "grievance-officer",
    title: "Grievance Officer",
    blocks: [
      {
        type: "p",
        text: "In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, the name and contact details of the Grievance Officer are as follows:",
      },
      {
        type: "fields",
        items: [
          { label: "Grievance Officer", value: ["Hitesh Dave, Founder & CTO", "Vrattiks Intelligence LLP"] },
          { label: "Email", value: "hitesh@vrattiks.io" },
          { label: "Website", value: "www.vrattiks.io" },
          { label: "Response Time", value: "Within 30 business days of receipt of complaint" },
        ],
      },
      {
        type: "p",
        text: "If you are not satisfied with our response, you may file a complaint with the Data Protection Board of India under the DPDPA.",
      },
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    blocks: [
      {
        type: "p",
        text: "If you have any questions, concerns, or requests related to this Privacy Policy or how we handle your personal data, please reach out to us:",
      },
      {
        type: "fields",
        items: [
          { label: "Company", value: "Vrattiks Intelligence LLP" },
          { label: "Email", value: "hitesh@vrattiks.io · arpit@vrattiks.io · vrattiks@gmail.com" },
          { label: "Website", value: "www.vrattiks.io" },
          {
            label: "Address",
            value: "912, International Finance Centre, VIP Road, Vesu Surat, Gujarat, India – 395007",
          },
        ],
      },
    ],
  },
];
