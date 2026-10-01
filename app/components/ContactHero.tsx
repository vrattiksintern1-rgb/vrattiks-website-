import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Icon, { type IconName } from "./ui/Icon";
import Section from "./ui/Section";
import InquiryForm from "./InquiryForm";
import { contactDetails } from "@/app/lib/content";

const digits = (value: string) => value.replace(/[^\d+]/g, "");

/* Direct channels. Every value is a placeholder until contactDetails in
   content.ts is filled in; a null value renders as "Pending confirmation"
   with no link rather than a made-up address or number
   (vrattiks-standards §3). */
const channels: { icon: IconName; label: string; value: string | null; href: (v: string) => string }[] = [
  { icon: "mail", label: "Email", value: contactDetails.email, href: (v) => `mailto:${v}` },
  { icon: "phone", label: "Phone", value: contactDetails.phone, href: (v) => `tel:${digits(v)}` },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: contactDetails.whatsapp,
    href: (v) => `https://wa.me/${digits(v).replace("+", "")}`,
  },
];

/* Contact hero. The one idea: the form is above the fold, on the page's one
   raised white panel, with the H1 and direct channels beside it — a visitor
   who came here to get in touch never has to scroll to start. The submit
   button is the page's only gradient. */
export default function ContactHero() {
  return (
    <Section tone="paper" labelledBy="contact-heading">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16">
        <div className="md:pt-4">
          <Eyebrow className="mb-5">Contact</Eyebrow>
          {/* Not wrapped in Reveal: the H1 should be readable the instant it
              paints (kylezantos-design §1b). */}
          <h1
            id="contact-heading"
            className="max-w-[14ch] text-[36px] leading-[1.08] tracking-[-0.02em] font-display font-bold text-n-900 md:text-[52px]"
          >
            Tell us where your team loses time.
          </h1>
          <p className="mt-6 max-w-md text-body-lg text-n-600">
            Missed calls, slow replies, follow-ups that never happen — tell us what&apos;s
            getting in the way and we&apos;ll show you what can run on its own.
          </p>

          <h2 className="mt-12 font-body text-label font-semibold uppercase tracking-[0.06em] text-n-600">
            Reach us directly
          </h2>
          <ul className="mt-4 border-t border-n-200">
            {channels.map((channel) => (
              <li key={channel.label} className="flex items-center gap-4 border-b border-n-200 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-n-200 bg-n-0 text-brand-secondary">
                  <Icon name={channel.icon} className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-n-600">{channel.label}</p>
                  {channel.value ? (
                    <a
                      href={channel.href(channel.value)}
                      className="focus-glow rounded-sm text-[16px] font-semibold break-words text-n-900 transition-colors duration-150 hover:text-brand-secondary"
                      {...(channel.label === "WhatsApp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p className="text-[16px] font-semibold text-n-600">Pending confirmation</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          id="inquiry"
          className="scroll-mt-28 rounded-lg border border-n-200 bg-n-0 p-6 shadow-[var(--shadow-md)] sm:p-8 md:p-10"
        >
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.01em] font-display font-bold text-n-900 md:text-[28px]">
            Book a free consultation
          </h2>
          <p className="mt-2 mb-8 text-[15px] leading-[1.6] text-n-600">
            Fill this in and we&apos;ll get back to you to set up a time to talk.
          </p>
          <InquiryForm />
        </div>
      </Container>
    </Section>
  );
}
