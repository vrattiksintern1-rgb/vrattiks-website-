import Container from "./ui/Container";
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
    <section className="py-14 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          align="center"
        />

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 md:mt-12">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.04}>
              <details className="group rounded-lg border border-n-100 bg-n-0 open:shadow-[var(--shadow-sm)]">
                <summary className="focus-glow flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-5 py-4 text-[15px] font-semibold text-n-900 marker:content-none">
                  {faq.question}
                  <Icon
                    name="chevronDown"
                    className="h-4.5 w-4.5 shrink-0 text-n-400 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="px-5 pb-5 text-[14px] leading-[1.65] text-n-500">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
