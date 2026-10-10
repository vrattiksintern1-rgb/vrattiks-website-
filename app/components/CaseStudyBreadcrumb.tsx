import Link from "next/link";
import {
  clientNameOf,
  sectionFor,
  type CaseStudy,
} from "@/app/lib/case-studies";

/* Breadcrumb for /case-studies/[slug]: Case Studies → the listing section →
   the client. The last step reads `clientName`, so replacing the
   "[Client Name]" placeholder in case-studies.ts updates it here too.
   It is also the page's link back to the listing (vrattiks-architecture §5).
   Same type scale as the Service/Industry hero breadcrumbs. */

/* min-h-6: a 24px target (WCAG 2.2 target size) without changing the type. */
const link =
  "focus-glow inline-flex min-h-6 items-center rounded-sm transition-colors duration-150 hover:text-brand-secondary";

export default function CaseStudyBreadcrumb({ study }: { study: CaseStudy }) {
  const section = sectionFor(study.category);

  return (
    <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
      <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-n-600">
        <li>
          <Link href="/case-studies" className={link}>
            Case Studies
          </Link>
        </li>
        <li aria-hidden="true" className="text-n-500">
          /
        </li>
        <li>
          <Link href={`/case-studies#${section.id}`} className={link}>
            {section.label}
          </Link>
        </li>
        <li aria-hidden="true" className="text-n-500">
          /
        </li>
        <li aria-current="page" className="font-medium text-n-800">
          {clientNameOf(study)}
        </li>
      </ol>
    </nav>
  );
}
