import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import ServiceCard from "./ServiceCard";
import ServicesSlider from "./ServicesSlider";
import { services } from "@/app/lib/content";

/* Shared by Home and /services. On /services, pass `showAllLink={false}` —
   the "View all services" button would link the page to itself — and a
   `headingId` so the section landmark is named by its h2. Home passes
   `layout="slider"`; /services keeps the full grid. */
export default function ServicesOverview({
  showAllLink = true,
  headingId,
  layout = "grid",
}: {
  showAllLink?: boolean;
  headingId?: string;
  layout?: "grid" | "slider";
}) {
  return (
    <section aria-labelledby={headingId} className="py-8 md:py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id={headingId}
            eyebrow="Services"
            title="Six core services, plus custom automation for the rest"
            description="Use one on its own or connect them into one system. If a repetitive task doesn't fit these six — payment reminders, appointment booking, daily reports, stock alerts — we can automate that too."
            className="max-w-xl"
          />
          {showAllLink ? (
            <Button href="/services" variant="outline" className="shrink-0">
              View all services
            </Button>
          ) : null}
        </div>

        {layout === "slider" ? (
          <Reveal>
            <ServicesSlider />
          </Reveal>
        ) : (
          /* The page's one icon + title + text grid. */
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-5">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
