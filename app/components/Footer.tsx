import Link from "next/link";
import Image from "next/image";
import Container from "./ui/Container";
import { contactDetails, services } from "@/app/lib/content";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-n-100 bg-n-0">
      <Container className="grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:py-16">
        <div>
          <Link href="/" className="focus-glow rounded-sm" aria-label="Vrattiks home">
            <Image
              src="/brand/vrattiks-logo-wordmark.png"
              alt="Vrattiks"
              width={418}
              height={134}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-[14.5px] leading-[1.65] text-n-500">
            AI automation and workflow tools built for growing businesses.
          </p>
          {(contactDetails.email || contactDetails.phone) && (
            <ul className="mt-6 flex flex-col gap-2 text-[14.5px]">
              {contactDetails.email && (
                <li>
                  <span className="text-n-500">Email: </span>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="focus-glow rounded-sm text-n-700 hover:text-brand-secondary"
                  >
                    {contactDetails.email}
                  </a>
                </li>
              )}
              {contactDetails.phone && (
                <li>
                  <span className="text-n-500">Phone: </span>
                  <a
                    href={`tel:${contactDetails.phone.replace(/[^\d+]/g, "")}`}
                    className="focus-glow rounded-sm text-n-700 hover:text-brand-secondary"
                  >
                    {contactDetails.phone}
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-n-500">Services</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="focus-glow rounded-sm text-[14.5px] text-n-700 hover:text-brand-secondary"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-n-500">Explore</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-glow rounded-sm text-[14.5px] text-n-700 hover:text-brand-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-n-500">Legal</h3>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <Link
                href="/privacy-policy"
                className="focus-glow rounded-sm text-[14.5px] text-n-700 hover:text-brand-secondary"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-n-100">
        <Container className="flex flex-col gap-2 py-6 text-[13px] text-n-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} Vrattiks Intelligence LLP. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
