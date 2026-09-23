"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Container from "./ui/Container";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* "/" matches only itself — every other route matches its own subtree, so
   /services/ai-voice-agent still marks Services as current. */
function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* vrattiks-accessibility, "Keyboard navigation": a disclosure that can only
     be dismissed by pointing at its own trigger is a keyboard trap in spirit.
     Escape closes it AND returns focus to the toggle, so the tab position
     isn't lost at the bottom of a 9-item list. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-n-100 bg-n-0/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="focus-glow shrink-0 rounded-sm"
          aria-label="Vrattiks home"
        >
          {/* vrattiks-performance, "Images": `next/image` with explicit
              width/height (the asset's true 413x126) so the sticky header
              reserves space and can't shift layout on load. There are no bare
              <img> tags on this page — this and the Footer logo are the only
              two images, and both go through next/image.

              `priority` is set here because the header is the only above-the-
              fold image on Home and would otherwise lazy-load into the very
              first paint. The skill's "only the hero's LCP image" wording
              assumes a hero photo; this page's LCP is the H1 text, so nothing
              else on the page should ever carry `priority`. */}
          <Image
            src="/brand/vrattiks-logo.png"
            alt="Vrattiks"
            width={413}
            height={126}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>

        {/* Full flat nav needs more room than the 6 flat labels would suggest — deferred to
            Tailwind's default lg (1024px) breakpoint so it never overflows at the 1024px
            desktop test width (vrattiks-responsive §1); tablet/901-1023px keeps the compact menu. */}
        <nav aria-label="Primary" className="hidden items-center gap-3 lg:flex xl:gap-4">
          {navLinks.map((link) => {
            const current = isCurrent(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`focus-glow relative rounded-sm text-caption font-medium whitespace-nowrap transition-colors ${
                  current
                    ? "text-brand-secondary"
                    : "text-n-700 hover:text-brand-secondary"
                }`}
              >
                {link.label}
                {/* Solid brand-secondary, NOT --brand-gradient. The hero
                    viewport already spends its gradient budget on the H1 span
                    and the primary button (CLAUDE.md: one gradient surface per
                    viewport) — a third mark up here turns the accent into a
                    texture. */}
                {current ? (
                  <span
                    aria-hidden="true"
                    className="bg-brand-secondary absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="secondary" size="sm">
            Book a Consultation
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="focus-glow -mr-1 rounded-sm p-2 text-n-800 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </Container>

      {/* Rendered unconditionally and toggled with `hidden`, NOT mounted on
          `open`. The toggle button's `aria-controls="mobile-nav"` pointed at
          an element that did not exist while the menu was closed — which is
          exactly when a screen reader reads that attribute — so the
          relationship it advertises resolved to nothing. `display: none` also
          keeps the links out of the tab order, so nothing is gained by
          unmounting them. */}
      <nav
        id="mobile-nav"
        aria-label="Menu"
        className={`border-t border-n-100 bg-n-0 lg:hidden ${open ? "" : "hidden"}`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => {
            const current = isCurrent(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`focus-glow flex items-center gap-3 rounded-sm px-1 py-3 text-body font-medium ${
                  current
                    ? "text-brand-secondary"
                    : "text-n-700 hover:text-brand-secondary"
                }`}
              >
                {/* The desktop underline has no room to sit beneath a stacked
                    row, so the current item is marked by a leading dash —
                    the same mark the section eyebrows use. */}
                {current ? (
                  <span
                    aria-hidden="true"
                    className="bg-brand-secondary h-0.5 w-3 shrink-0 rounded-full"
                  />
                ) : null}
                {link.label}
              </Link>
            );
          })}
          <Button href="/contact" variant="primary" className="mt-2 w-full">
            Book a Consultation
          </Button>
        </Container>
      </nav>
    </header>
  );
}
