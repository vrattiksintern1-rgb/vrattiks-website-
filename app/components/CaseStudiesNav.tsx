"use client";

import { useEffect, useState } from "react";
import Container from "./ui/Container";

type Item = {
  id: string;
  index: string;
  label: string;
  shortLabel: string;
  meta: string;
};

/* Sticky chapter bar for /case-studies. A horizontal second tier under the
   site header — not the vertical contents rail of /privacy-policy or the jump
   list of /industries — so the reader always knows which of the three
   sections they're in (awesome-design §3, sticky in-page section nav).

   The only client code on the page: an IntersectionObserver marks the section
   crossing a line ~45% down the viewport. The links are plain anchors and
   work without it. Active state is one brand-primary edge under the segment
   (CLAUDE.md Design Taste, ref 1: accent confined to an edge), drawn with a
   150ms scaleX — a state change, transform only (kylezantos-design §1). The
   global reduced-motion block in globals.css removes that transition.

   It must stay a sibling of the three sections inside one wrapper: sticky is
   bounded by its parent, and no ancestor may clip overflow. */
export default function CaseStudiesNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          setActive((prev) => (entry.isIntersecting ? id : prev === id ? null : prev));
        }
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-16 z-40 border-y border-n-100 bg-n-0/90 backdrop-blur md:top-20"
    >
      <Container>
        <ul className="grid grid-cols-3">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="border-l border-n-100 first:border-l-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className="focus-glow group relative flex min-h-12 flex-col justify-center gap-1 rounded-sm px-3 py-3 sm:flex-row sm:items-baseline sm:justify-start sm:gap-3 sm:px-5 md:py-4"
                >
                  <span className="font-body text-label font-semibold tracking-[0.14em] text-n-500">
                    {item.index}
                  </span>
                  <span
                    className={`text-[14px] leading-tight font-semibold transition-colors duration-150 group-hover:text-n-900 md:text-[15px] ${
                      isActive ? "text-n-900" : "text-n-700"
                    }`}
                  >
                    <span className="sm:hidden">{item.shortLabel}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                  <span className="hidden text-[13px] text-n-600 lg:ml-auto lg:inline">
                    {item.meta}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brand-primary transition-transform duration-150 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
