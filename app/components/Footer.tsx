import Link from "next/link";
import Image from "next/image";
import Container from "./ui/Container";
import { services } from "@/app/lib/content";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Industries", href: "/industries" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-n-100 bg-n-0">
      <Container className="grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:py-16">
        <div>
          <Link
            href="/"
            className="focus-glow rounded-sm"
            aria-label="Vrattiks home"
          >
            <Image
              src="/brand/vrattiks-logo.png"
              alt="Vrattiks"
              width={413}
              height={126}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-ui leading-normal text-n-500">
            AI automation and workflow tools built for growing businesses.
          </p>
        </div>

        <div>
          <h3 className="text-label font-semibold uppercase tracking-[0.06em] text-n-500">
            Services
          </h3>
          {/* `gap-1` + `py-1.5` on the links, not `gap-3` on bare inline text:
              same visual rhythm, but each row is a ~35px touch target instead
              of a ~23px one (vrattiks-responsive, tap targets). */}
          <ul className="mt-4 flex flex-col gap-1">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="focus-glow -mx-1 inline-block rounded-sm px-1 py-1.5 text-ui text-n-700 hover:text-brand-secondary"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-label font-semibold uppercase tracking-[0.06em] text-n-500">
            Explore
          </h3>
          <ul className="mt-4 flex flex-col gap-1">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-glow -mx-1 inline-block rounded-sm px-1 py-1.5 text-ui text-n-700 hover:text-brand-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-n-100">
        <Container className="flex flex-col gap-3 py-6 text-label text-n-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} Vrattiks Intelligence LLP. All rights reserved.</p>

          {/* Standard client-deliverable credit line. ⚠ Note this IS the
              Vrattiks site, so the credit points at its own author — kept
              because it was explicitly requested, but it is the one place on
              the page where the studio credits itself twice. */}
          <p className="flex items-center gap-2">
            <span>Designed &amp; built by</span>
            <span className="font-display font-bold text-brand-secondary">
              Vrattiks
            </span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
