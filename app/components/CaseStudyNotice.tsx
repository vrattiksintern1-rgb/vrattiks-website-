import Container from "./ui/Container";
import { hasConfirmedClient, type CaseStudy } from "@/app/lib/case-studies";

/* A visible label for detail pages that are reachable by URL but not
   published (decision 2026-10-10, memory.md):
   - `status: "draft"` → "Template preview": the page shows a layout, not a
     project (iot-projects-case-study.md §4.3).
   - client name still the placeholder → "Draft preview".
   Derived from the data, so it disappears by itself once the entry is
   published and the real client name is filled in. These pages are also
   noindex and unlinked (see app/case-studies/[slug]/page.tsx).

   Warning colours carry their assigned meaning here — "not final"
   (docs/index.html §3 semantic set); both themes pass 4.5:1. */
export default function CaseStudyNotice({ study }: { study: CaseStudy }) {
  const draft = study.status === "draft";
  if (!draft && hasConfirmedClient(study)) return null;

  return (
    <div role="note" className="border-b border-sem-warning/40 bg-sem-warning-bg text-sem-warning-text">
      <Container className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-3">
        <strong className="font-body text-label font-semibold tracking-[0.14em] uppercase">
          {draft ? "Template preview" : "Draft preview"}
        </strong>
        <span className="text-[14px] leading-[1.5]">
          {draft
            ? "This page shows the layout for a future case study. It describes no real project, and every bracketed field is still to be filled in."
            : "Not published yet: this page is not listed or indexed until the client name is confirmed."}
        </span>
      </Container>
    </div>
  );
}
