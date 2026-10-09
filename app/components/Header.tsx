"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./ui/Container";
import Button from "./ui/Button";
import Icon, { type IconName } from "./ui/Icon";
import ThemeToggle from "./ThemeToggle";
import { industries, services } from "../lib/content";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

type MenuItem = { name: string; href: string; icon: IconName };
type Menu = { id: string; allLabel: string; items: MenuItem[] };

const menus: Record<string, Menu> = {
  "/services": {
    id: "services",
    allLabel: "All services",
    items: services.map((s) => ({ name: s.name, href: `/services/${s.slug}`, icon: s.icon })),
  },
  "/industries": {
    id: "industries",
    allLabel: "All industries",
    items: industries.map((i) => ({ name: i.name, href: `/industries/${i.slug}`, icon: i.icon })),
  },
};

const CLOSE_DELAY_MS = 150;

function NavDropdown({ label, href, menu }: { label: string; href: string; menu: Menu }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = `${menu.id}-menu`;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative flex h-full items-center"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className="focus-glow rounded-sm text-[13.5px] font-medium whitespace-nowrap text-n-700 transition-colors hover:text-brand-secondary"
      >
        {label}
      </Link>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${open ? "Hide" : "Show"} ${label.toLowerCase()}`}
        onClick={() => setOpen((v) => !v)}
        className="focus-glow -ml-0.5 rounded-sm p-1 text-n-500 transition-colors hover:text-brand-secondary"
      >
        <Icon
          name="chevronDown"
          className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={panelId}
        className={`absolute top-full left-1/2 w-72 -translate-x-1/2 pt-2 transition-[opacity,translate,visibility] duration-150 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="nav-dropdown max-h-[calc(100svh-7rem)] overflow-y-auto rounded-lg border border-n-100 bg-n-0 p-3 shadow-[var(--shadow-lg)] dark:border-n-0/10 dark:bg-brand-graphite">
          <li>
            <Link
              href={href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between rounded-sm px-4 py-3 font-display text-[16px] font-semibold text-n-900 transition-colors duration-150 hover:bg-n-50 focus-visible:bg-n-50 focus-visible:outline-2 focus-visible:outline-brand-secondary dark:text-n-0 dark:hover:bg-n-0/[0.06] dark:focus-visible:bg-n-0/[0.06] dark:focus-visible:outline-brand-primary"
            >
              {menu.allLabel}
              <Icon
                name="arrowRight"
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </Link>
          </li>
          {menu.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-sm px-4 py-2.5 text-[15px] text-n-600 transition-colors duration-150 hover:bg-n-50 hover:text-n-900 focus-visible:bg-n-50 focus-visible:text-n-900 focus-visible:outline-2 focus-visible:outline-brand-secondary dark:text-n-300 dark:hover:bg-n-0/[0.06] dark:hover:text-n-0 dark:focus-visible:bg-n-0/[0.06] dark:focus-visible:text-n-0 dark:focus-visible:outline-brand-primary"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const closeMobile = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-n-100 bg-n-0/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="focus-glow shrink-0 rounded-sm" aria-label="Vrattiks home">
          <Image
            src="/brand/vrattiks-logo-wordmark.png"
            alt="Vrattiks"
            width={418}
            height={134}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>

        {/* Full flat nav needs more room than the 6 flat labels would suggest — deferred to
            Tailwind's default lg (1024px) breakpoint so it never overflows at the 1024px
            desktop test width (vrattiks-responsive §1); tablet/901-1023px keeps the compact menu. */}
        <nav aria-label="Primary" className="hidden items-center gap-4 self-stretch lg:flex">
          {navLinks.map((link) =>
            menus[link.href] ? (
              <NavDropdown key={link.href} label={link.label} href={link.href} menu={menus[link.href]} />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="focus-glow rounded-sm text-[13.5px] font-medium whitespace-nowrap text-n-700 transition-colors hover:text-brand-secondary"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Theme toggle sits in the bar at every width (beside the CTA on
            desktop, beside the hamburger below lg) so it's one tap away
            without opening the menu. */}
        <div className="flex items-center gap-2 lg:gap-4">
          <ThemeToggle />

          <div className="hidden lg:block">
            <Button href="/contact" variant="outline" size="sm">
              Book a Consultation
            </Button>
          </div>

          <button
            type="button"
            className="focus-glow -mr-1 rounded-sm p-2 text-n-800 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => (open ? closeMobile() : setOpen(true))}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </Container>

      {open ? (
        <nav id="mobile-nav" aria-label="Primary" className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-n-100 bg-n-0 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const menu = menus[link.href];
              if (!menu) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className="focus-glow rounded-sm px-1 py-3 text-[15px] font-medium text-n-700 hover:text-brand-secondary"
                  >
                    {link.label}
                  </Link>
                );
              }
              const isOpen = expanded === menu.id;
              const listId = `mobile-${menu.id}`;
              return (
                <div key={link.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="focus-glow flex-1 rounded-sm px-1 py-3 text-[15px] font-medium text-n-700 hover:text-brand-secondary"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={listId}
                      aria-label={`${isOpen ? "Hide" : "Show"} ${link.label.toLowerCase()}`}
                      onClick={() => setExpanded(isOpen ? null : menu.id)}
                      className="focus-glow -mr-2 rounded-sm p-3 text-n-500 hover:text-brand-secondary"
                    >
                      <Icon
                        name="chevronDown"
                        className={`h-4 w-4 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  <ul id={listId} hidden={!isOpen} className="mb-2 rounded-md bg-n-25 p-1">
                    {menu.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className="focus-glow flex items-center gap-3 rounded-sm px-3 py-3 text-[14.5px] font-medium text-n-700 hover:bg-n-50 hover:text-brand-secondary"
                        >
                          <Icon name={item.icon} className="h-5 w-5 shrink-0 text-brand-secondary" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={link.href}
                        onClick={closeMobile}
                        className="focus-glow flex items-center gap-2 rounded-sm px-3 py-3 text-[14.5px] font-medium text-brand-secondary hover:bg-n-50"
                      >
                        View {menu.allLabel.toLowerCase()}
                        <Icon name="arrowRight" className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
            <Button href="/contact" variant="primary" className="mt-2 w-full">
              Book a Consultation
            </Button>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
