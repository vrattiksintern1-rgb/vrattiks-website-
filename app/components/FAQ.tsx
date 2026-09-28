import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

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
      {/* Split layout: heading sticks in the left column (below the 80px
          sticky header) while the questions scroll. No boxes — each item is a
          divider row, and the toggle is a +/− drawn from two bars, the
          vertical one rotating flat when open. */}
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
          />
        </div>

        <div className="border-t border-n-200">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.04}>
              <details className="group border-b border-n-200">
                <summary className="focus-glow flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm py-5 marker:content-none md:py-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-[16px] leading-[1.45] font-semibold text-n-900 transition-colors duration-150 group-open:text-brand-secondary md:text-[17px]">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative mt-px h-7 w-7 shrink-0 rounded-full border border-n-300 transition-colors duration-150 group-hover:border-brand-secondary group-open:border-brand-secondary group-open:bg-brand-secondary"
                  >
                    <span className="absolute top-1/2 left-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 bg-n-700 group-open:bg-n-0" />
                    <span className="absolute top-1/2 left-1/2 h-3 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-n-700 transition-transform duration-200 group-open:rotate-90 group-open:bg-n-0" />
                  </span>
                </summary>
                <p className="max-w-[60ch] pr-12 pb-6 text-[15px] leading-[1.65] text-n-600">
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
