"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-n-100 bg-n-0/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="focus-glow shrink-0 rounded-sm" aria-label="Vrattiks home">
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
        <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-glow rounded-sm text-[13.5px] font-medium whitespace-nowrap text-n-700 transition-colors hover:text-brand-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="secondary" size="sm">
            Book a Consultation
          </Button>
        </div>

        <button
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

      {open ? (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-n-100 bg-n-0 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-glow rounded-sm px-1 py-3 text-[15px] font-medium text-n-700 hover:text-brand-secondary"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" className="mt-2 w-full">
              Book a Consultation
            </Button>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
