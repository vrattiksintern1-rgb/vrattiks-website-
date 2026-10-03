/* Privacy Policy text, supplied verbatim by the client. Do not reword,
   summarise or "fix" anything here — it is a legal document, and any change
   needs the client's sign-off first (vrattiks-standards §3). Emails and URLs
   inside strings are turned into links when rendered. */

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
  effectiveDate: "April 23, 2026",
  lastUpdated: "May 7, 2026",
  version: "1.0",
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
        text: 'Vrattiks Intelligence LLP ("Vrattiks", "we", "our", or "us") is an Adaptive Intelligence and AI Automation company registered in India. We build AI-powered systems, SaaS products, and automation solutions for businesses, with a primary focus on consent-based WhatsApp customer communication, support workflows, and business automation.',
      },
      {
        type: "p",
        text: "This Privacy Policy describes how we collect, use, store, share, and protect personal information when you:",
      },
      {
        type: "list",
        items: [
          "Visit our website and digital properties",
          "Use any of our products or services (including Vrattiks S1)",
          "Communicate with us via WhatsApp, email, or other channels",
          "Are a client, partner, or end-customer interacting through platforms we power",
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
          { label: "Primary Business", value: "AI Automation, SaaS Products, and Customer Intelligence Systems" },
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
    id: "information-we-collect",
    title: "Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect information necessary to provide our services, ensure legal compliance, and improve your experience. The types of data we collect include:",
      },
      { type: "h3", text: "3.1 Information You Provide Directly" },
      {
        type: "list",
        items: [
          "Name, business name, email address, and phone number",
          "Business category, industry type, and location",
          "WhatsApp phone numbers (yours and your customers') provided for campaign setup",
          "Billing and payment information (processed securely via third-party payment gateways)",
          "Any content, data, or files you share with us during onboarding or support",
        ],
      },
      { type: "h3", text: "3.2 WhatsApp Conversation Data" },
      {
        type: "list",
        items: [
          "Phone numbers of end-users interacting via WhatsApp Business channels we manage on behalf of clients",
          "Message metadata (timestamps, delivery status, read receipts)",
          "Customer interaction data used for AI tagging, segmentation, and campaign analytics",
          "Opt-in and opt-out consent records for WhatsApp messaging",
        ],
      },
      {
        type: "note",
        label: "Note",
        text: "Vrattiks operates as a technology service provider. Message content is processed solely to deliver the service contracted by our business clients. We do not read, monetise, or use individual message content for any purpose beyond service delivery.",
      },
      { type: "h3", text: "3.3 Automatically Collected Data (Website)" },
      {
        type: "list",
        items: [
          "IP address, browser type, device information, and operating system",
          "Pages visited, time on site, referral sources, and clickstream data",
          "Cookies and similar tracking technologies (see Section 10)",
        ],
      },
      { type: "h3", text: "3.4 Third-Party Sources" },
      {
        type: "list",
        items: [
          "Business contact information from public directories or LinkedIn for limited business-to-business partnership research, never for WhatsApp promotional messaging unless explicit WhatsApp opt-in consent has been collected",
          "Data received from Meta/WhatsApp as part of the WhatsApp Business API integration",
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
            text: "Where you or your customers have provided explicit opt-in consent to receive WhatsApp messages or communications.",
          },
          {
            term: "Contractual Necessity",
            text: "Where data processing is required to fulfil our agreement with you as a client or partner.",
          },
          {
            term: "Legitimate Interests",
            text: "Where processing is in our legitimate interest to operate, improve, and secure our services, provided it does not override your rights.",
          },
          {
            term: "Legal Obligation",
            text: "Where processing is necessary to comply with applicable Indian law, Meta's WhatsApp Business policies, or regulatory requirements.",
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
      { type: "h3", text: "5.1 Service Delivery" },
      {
        type: "list",
        items: [
          "Setting up and managing WhatsApp Business Platform workflows for consented customer communication",
          "AI-based customer tagging, routing, support automation, and analytics for contracted business use cases",
          "Sending approved WhatsApp message templates only to recipients for whom valid opt-in consent exists",
          "Providing analytics, reporting, and campaign performance data",
        ],
      },
      { type: "h3", text: "5.2 Platform Operations" },
      {
        type: "list",
        items: [
          "Maintaining and improving our products (including Vrattiks S1)",
          "Ensuring system security, preventing fraud, and monitoring for abuse",
          "Processing payments and managing billing",
        ],
      },
      { type: "h3", text: "5.3 Communication" },
      {
        type: "list",
        items: [
          "Responding to your support queries and service requests",
          "Sending product updates, service announcements, or critical notices",
          "Sending marketing communications, only where you have explicitly opted in",
        ],
      },
      { type: "h3", text: "5.4 Compliance & Legal" },
      {
        type: "list",
        items: [
          "Maintaining consent records as required by Meta's WhatsApp Business Policy",
          "Complying with applicable Indian laws, including the DPDPA, 2023",
          "Responding to lawful requests from regulatory authorities",
        ],
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
      { type: "h3", text: "6.1 Data We Process on Meta's Platform" },
      {
        type: "list",
        items: [
          "Phone numbers and profile information of end-users who interact with WhatsApp Business accounts managed by Vrattiks on behalf of our clients",
          "WhatsApp message templates submitted for Meta approval",
          "Delivery, read, and engagement metadata returned by the WhatsApp Cloud API",
        ],
      },
      { type: "h3", text: "6.2 Consent for WhatsApp Communication" },
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
      { type: "h3", text: "6.3 What Meta Receives" },
      {
        type: "p",
        text: "When using the WhatsApp Cloud API, certain metadata (such as phone numbers and message delivery status) may be processed by Meta's systems according to WhatsApp's own business terms and privacy practices. For more information, please review Meta's Privacy Policy at www.whatsapp.com/legal/privacy-policy.",
      },
      { type: "h3", text: "6.4 Prohibited Uses" },
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
      { type: "h3", text: "6.5 Business Profile, Support & Escalation" },
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
      { type: "h3", text: "6.6 Facebook & Instagram Lead Ads Data" },
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
        text: "Lead data accessed via the Meta Lead Ads API is used solely to fulfil the contracted CRM or automation service for the business client who owns the lead form. This data is never sold, shared with advertisers, or used for any purpose outside the contracted service. Lead data is retained in accordance with Section 9 of this Policy and deleted upon client request or contract termination.",
      },
      { type: "h3", text: "6.7 Meta API Permissions We Use" },
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
            text: "As required to operate the WhatsApp Business API and comply with Meta's terms of service.",
          },
          {
            term: "Service Providers",
            text: "Trusted third-party vendors who assist us in delivering our services (e.g., cloud hosting, payment processing, analytics), all bound by data processing agreements.",
          },
          {
            term: "Our Clients",
            text: "Your data may be shared with the business client on whose behalf we operate a WhatsApp channel, where relevant to the contracted service.",
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
          "All data transmitted between our systems and third-party APIs (including Meta) is encrypted using HTTPS/TLS",
          "Access to personal data is restricted to authorised personnel on a need-to-know basis",
          "We conduct periodic security reviews and monitor our systems for vulnerabilities",
          "In the event of a data breach that poses a risk to your rights, we will notify affected users within the timeframes required by applicable law",
        ],
      },
      {
        type: "p",
        text: "Primary data storage is in India. Where data is processed outside India (e.g., via Meta's WhatsApp Cloud API infrastructure), we ensure appropriate safeguards are in place consistent with applicable data protection laws.",
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
            term: "Lead data from Facebook / Instagram Lead Ads",
            text: "Retained for up to 2 years from the date of collection, or until deletion is requested by the client or end-user.",
          },
          {
            term: "WhatsApp messages and conversation data",
            text: "Retained for up to 1 year from the date of collection, unless a shorter period is requested or required by law.",
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
            term: "Website analytics data",
            text: "Retained for up to 1 year in aggregated, anonymised form.",
          },
        ],
      },
      {
        type: "p",
        text: "Upon the expiry of retention periods, data is securely deleted or anonymised so that it can no longer be attributed to an individual.",
      },
      { type: "h3", text: "9.1 Data Deletion Requests" },
      {
        type: "p",
        text: "You may request deletion of your personal data at any time by contacting us at hitesh@vrattiks.io. We will process deletion requests within 30 days of receipt.",
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
        text: "Our website uses cookies and similar tracking technologies to improve functionality and understand user behaviour. The types of cookies we use include:",
      },
      {
        type: "terms",
        sep: "—",
        items: [
          {
            term: "Essential Cookies",
            text: "Required for the website to function correctly. These cannot be disabled.",
          },
          {
            term: "Analytics Cookies",
            text: "Help us understand how visitors interact with our website (e.g., Google Analytics). Data is aggregated and anonymised.",
          },
          {
            term: "Preference Cookies",
            text: "Remember your settings and preferences across sessions.",
          },
          {
            term: "Marketing Cookies",
            text: "Used only if you have consented, to show relevant content or ads.",
          },
        ],
      },
      {
        type: "p",
        text: "You can control or disable cookies through your browser settings at any time. Disabling cookies may affect the functionality of certain parts of our website. We will request your consent for non-essential cookies via a cookie consent banner on your first visit.",
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
            text: "You may request a copy of the personal data we hold about you.",
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
        text: "To exercise any of these rights, please contact us at vrattiks@gmail.com. We may request identity verification before processing your request.",
      },
    ],
  },
  {
    id: "whatsapp-opt-out",
    title: "Opting Out of WhatsApp Communications",
    blocks: [
      {
        type: "p",
        text: "If you are an end-customer receiving WhatsApp messages from a business powered by Vrattiks, you have the right to opt out at any time:",
      },
      {
        type: "list",
        items: [
          'Reply "STOP" or "Unsubscribe" to any WhatsApp message you receive',
          "Contact the business directly and request removal from their messaging list",
          "Contact us at vrattiks@gmail.com if you believe your opt-out has not been honoured",
        ],
      },
      {
        type: "p",
        text: "All opt-out requests are honoured within 24 hours. You will not receive further promotional or campaign messages after opting out. Transactional messages directly related to your active relationship with the business may still be sent where legally permitted.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at vrattiks@gmail.com and we will take steps to delete the information.",
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
