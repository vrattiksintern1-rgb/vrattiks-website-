import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import IllustrativeTag from "./IllustrativeTag";
import { CornerAccent } from "./CaseStudyChips";

/* The page's honest note about visuals (user brief 2026-10-10;
   vrattiks-standards §3): one small tile, said once, so the "Illustrative"
   labels on every visual have an explanation. Outlined, quiet — it must not
   compete with the project tiles. */
export default function VisualsNote() {
  return (
    <Section tone="paper" labelledBy="visuals-note-heading" className="py-8 sm:py-10 md:py-12">
      <Container>
        <Reveal>
          <aside
            aria-labelledby="visuals-note-heading"
            className="relative flex flex-col gap-4 rounded-lg border border-n-200 bg-n-0 p-6 sm:flex-row sm:items-start sm:gap-6 md:p-7"
          >
            <CornerAccent className="top-5 right-5" />
            <IllustrativeTag className="shrink-0 self-start" />
            <div className="max-w-2xl pr-6">
              <h2 id="visuals-note-heading" className="text-[18px] leading-[1.3] font-semibold text-n-900">
                About the visuals on this page
              </h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-n-700">
                Where a client&apos;s product can&apos;t be shown yet, we draw an illustrative version
                instead and label it, so nothing here passes for a screenshot. Real screens replace
                them once the client approves.
              </p>
            </div>
          </aside>
        </Reveal>
      </Container>
    </Section>
  );
}
