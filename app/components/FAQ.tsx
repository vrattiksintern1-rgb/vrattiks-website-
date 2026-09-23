import Container from "./ui/Container";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

const faqs = [
  {
    question: "What does Vrattiks actually do?",
    answer:
      "We build AI voice agents, chatbots, workflow automation, websites, WhatsApp automation, and CRM systems for growing businesses — so more of the day-to-day runs on its own.",
  },
  {
    question: "Do I need technical knowledge to use this?",
    answer:
      "No. Our team handles the setup and implementation — you use the result through the tools and channels you already work with.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "It depends on the scope of automation you need. We outline a clear timeline during the Discover step of our process, before any work begins.",
  },
  {
    question: "Will automation replace my team?",
    answer:
      "No. It takes the repetitive, manual work off their plate so they can spend more time on customers and higher-value tasks.",
  },
  {
    question: "Can it work with the tools we already use?",
    answer:
      "Yes. Workflow automation is built to connect with the tools and platforms your business already runs on, rather than replacing them.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free consultation. We'll walk through your current process and identify where automation makes the most difference.",
  },
];

export default function FAQ() {
  return (
    <Section id="faq" tone="paper" labelledBy="faq-heading">
      <Container>
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Common questions"
          description="If your question isn't here, ask it on the consultation call."
        />

        <div className="mt-14 flex max-w-3xl flex-col gap-3 md:mt-16">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.04}>
              <details className="group rounded-md border border-n-200 bg-n-0 transition-[border-color,box-shadow] duration-200 hover:border-brand-primary open:border-brand-primary open:shadow-[var(--shadow-soft)]">
                <summary className="focus-glow flex cursor-pointer list-none items-center justify-between gap-4 rounded-md px-5 py-4 text-body font-semibold text-n-900 transition-colors duration-200 hover:text-brand-secondary marker:content-none md:px-6 md:py-5">
                  {faq.question}
                  <Icon
                    name="chevronDown"
                    className="h-5 w-5 shrink-0 text-n-500 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="px-5 pb-5 text-ui leading-normal text-n-600 md:px-6 md:pb-6">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
