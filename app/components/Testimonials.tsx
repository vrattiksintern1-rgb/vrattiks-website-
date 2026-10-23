import Image from "next/image";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

type Testimonial = {
  quote: string;
  /** Display only: the opening words of `quote`, copied exactly, which are
      set larger as the quote's lead. Never shown on its own; if it stops
      matching the start of `quote`, the quote renders plain. */
  lead?: string;
  name: string;
  /** The person's role, exactly as the user supplied it. Unset until the
      user gives one — never guessed. Shown between name and company. */
  designation?: string;
  company: string;
  /** Optional real photo of the person, supplied by the client. Unset, the
      card shows an initials monogram. `alt` describes the person in it. */
  photo?: { src: string; alt: string };
};

/* USER-PROVIDED (2026-10-17): every quote is the user's exact headline
   (`lead`) followed by their exact body text, written in the third person
   on purpose. Do not reword, convert to first person, fix spelling, add
   numbers, or link these elsewhere. Home page only. Numeric claims ("20x",
   "24x7") stay in the body, at body size, until the client has approved them. */
const testimonials: Testimonial[] = [
  {
    quote:
      "More footfall and more repeat customers. The coupon and reward system gives people a reason to come back to the store. Customers scan a QR code in the store, enter their mobile number and get a digital coupon on WhatsApp straight away. At the counter, the team can look the customer up and redeem the coupon on the spot.",
    lead: "More footfall and more repeat customers.",
    name: "Yogesh Shah",
    designation: "Owner of",
    company: "Anjali Mobile",
  },
  {
    quote:
      "A franchise ordering system that cuts manual work. Franchise orders are now handled through an ordering system. The result is less manual handling and fewer errors, a saving in labour cost, and better control over the system.",
    lead: "A franchise ordering system that cuts manual work.",
    name: "Snehal Modi",
    designation: "Owner of",
    company: "Grenee",
  },
  {
    quote:
      "A professional website that builds authority and attracts prospects. The website presents Peturn professionally in the market and draws in prospects. Visitors can click through a demo dashboard to see the kind of reports Peturn builds before they book a consultation.",
    lead: "A professional website that builds authority and attracts prospects.",
    name: "Shaishan Patel",
    designation: "Owner of",
    company: "Peturn Website",
  },
  {
    quote:
      "Helped build trading discipline. The automation runs 24x7, so trades follow the set rules and are placed on time, even overnight. Furqan reports saving 20x the time and improving execution on time.",
    lead: "Helped build trading discipline.",
    name: "Furqan Ansari",
    designation: "Independent Trader",
    company: "BTC/USD Trading Automation",
  },
];

const headingId = "testimonials-heading";

/* Every testimonial uses the one avatar-overlap card (user's choice,
   2026-10-16). From 1280px they sit in one row — as many columns as there
   are cards, up to four, so 3 cards make three columns rather than leaving
   a gap; more than four wrap into rows of four. Two equal columns from
   901px, one below. Rows stretch, so cards in a row share a height. */
const xlCols = ["xl:grid-cols-1", "xl:grid-cols-2", "xl:grid-cols-3", "xl:grid-cols-4"];

/* White on the n-100 stage in light mode, one ramp step lighter than the
   graphite stage in dark mode, with a hairline border and the single
   --shadow-md level. */
const CARD =
  "rounded-lg border border-n-200 bg-n-0 shadow-[var(--shadow-md)] dark:border-n-300 dark:bg-n-200";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* The person's photo when the data has one, otherwise their initials on
   lavender (graphite text, 7.6:1 light / 6.9:1 dark). The monogram is
   decorative — the name is printed in the caption; a photo carries its own
   descriptive alt. */
function Avatar({ t, className = "" }: { t: Testimonial; className?: string }) {
  if (t.photo) {
    return (
      <Image
        src={t.photo.src}
        alt={t.photo.alt}
        width={80}
        height={80}
        className={`h-20 w-20 shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-primary font-display text-[24px] font-bold tracking-[0.02em] text-brand-graphite ${className}`}
    >
      {initials(t.name)}
    </span>
  );
}

/* Cards show a verbatim excerpt, not the whole quote (user request,
   2026-10-16: "only 4 to 5 lines"). The bold first line is the data's own
   `lead` (when it is the exact start of the quote). Under it come the
   quote's next whole sentences, word for word, for as long as they fit in
   BODY_BUDGET characters (about 4-5 lines in a four-up card). The first
   sentence is always kept, and the cut always falls at a sentence end, so
   no ellipsis and no rewording. The full quote stays in the data above;
   raise BODY_BUDGET (or set it to Infinity) to show more. */
const BODY_BUDGET = 160;

function excerptOf(t: Testimonial) {
  const lead =
    t.lead && t.quote.startsWith(t.lead) && t.lead.length < t.quote.length ? t.lead : "";
  const rest = t.quote.slice(lead.length);
  const sentences = rest.match(/[^.!?]+[.!?]+(?:\s+|$)/g) ?? [rest];
  let body = "";
  for (const sentence of sentences) {
    if (body && (body + sentence).trim().length > BODY_BUDGET) break;
    body += sentence;
  }
  return { lead, body: body.trim() };
}

function QuoteText({ t }: { t: Testimonial }) {
  const { lead, body } = excerptOf(t);
  return (
    <blockquote className="max-w-[60ch]">
      {lead ? (
        <p className="mb-2.5 font-display text-[19px] leading-[1.35] font-semibold tracking-[-0.015em] text-balance text-n-900">
          {lead}
        </p>
      ) : null}
      {body ? <p className="text-body leading-[1.7] text-pretty text-n-700">{body}</p> : null}
    </blockquote>
  );
}

/* Monogram in a thick card-coloured ring, sitting half over the top edge;
   everything below it centred. `mt-10` is the half that overhangs.
   Caption: name, then designation (only when set), then company. Where
   cards share a row (md+) it always reserves three lines — 24px padding +
   21 + 19.6 + 18.2px line boxes ≈ 84px — and stacks from the top, so names
   line up across cards whether or not a designation is shown. */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure
      className={`${CARD} relative mt-10 flex flex-1 flex-col items-center px-6 pt-14 pb-7 text-center sm:px-8 xl:px-6`}
    >
      <Avatar
        t={t}
        className="absolute -top-10 left-1/2 -translate-x-1/2 shadow-[var(--shadow-sm)] ring-[6px] ring-n-0 dark:ring-n-200"
      />
      <QuoteText t={t} />
      <figcaption className="mt-auto flex flex-col items-center justify-start pt-6 md:min-h-[84px]">
        <span className="text-[15px] leading-[1.4] font-semibold text-n-900">{t.name}</span>
        {t.designation ? (
          <span className="text-[14px] leading-[1.4] text-n-600">{t.designation}</span>
        ) : null}
        <span className="text-[13px] leading-[1.4] text-n-600">{t.company}</span>
      </figcaption>
    </figure>
  );
}

/* Testimonials on a stage band — n-100 in light mode, graphite in dark — so
   the section reads apart from the paper sections above and below it.
   Server component; the only client code is the site's shared Reveal leaf
   (once, short stagger, instant under reduced motion). */
export default function Testimonials() {
  return (
    <Section tone="stage" labelledBy={headingId} className="scroll-mt-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-3 block font-body text-label font-semibold text-brand-secondary uppercase">
            Testimonials
          </span>
          <h2
            id={headingId}
            className="font-display text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-n-900 md:text-h2"
          >
            What our <span className="text-brand-gradient">clients</span> say
          </h2>
        </Reveal>

        <ul
          role="list"
          className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-5 md:mt-8 md:grid-cols-2 xl:gap-x-5 ${
            xlCols[Math.min(testimonials.length, 4) - 1]
          }`}
        >
          {testimonials.map((t, i) => (
            <Reveal
              as="li"
              key={t.name}
              delay={Math.min(i, 5) * 0.06}
              className="flex flex-col"
            >
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
