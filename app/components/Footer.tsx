import Link from "next/link";
import Image from "next/image";
import Container from "./ui/Container";
import { contactDetails, services } from "@/app/lib/content";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    color: "url(#footer-instagram-gradient)",
    href: "https://www.instagram.com/vrattiksofficial?stkn=MXIxZ3hsNW1iNWc1YQ==",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.12A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
  {
    label: "Facebook",
    color: "#1877F2",
    href: "https://www.facebook.com/profile.php?id=61580752307650",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z",
  },
  {
    label: "LinkedIn",
    color: "#0A66C2",
    href: "https://www.linkedin.com/company/vrattiks/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-n-100 bg-n-0">
      <Container className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 md:py-16 lg:grid-cols-[1.4fr_1fr_0.8fr_1.1fr] lg:gap-x-8">
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
            AI automation and workflow tools built for growing businesses. We set up
            systems that fit how your team already works, so enquiries get answered,
            customers get supported and follow-up doesn&apos;t depend on someone
            remembering.
          </p>
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
          <h3 className="mt-8 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-n-500">Contact</h3>
          {(contactDetails.email || contactDetails.phone) && (
            <ul className="mt-4 flex flex-col gap-3 text-[14.5px]">
              {contactDetails.email && (
                <li>
                  <span className="text-n-500">Email: </span>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="focus-glow rounded-sm break-words text-n-700 hover:text-brand-secondary"
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
                    className="focus-glow rounded-sm break-words text-n-700 hover:text-brand-secondary"
                  >
                    {contactDetails.phone}
                  </a>
                </li>
              )}
            </ul>
          )}
          <ul className="-ml-2.5 mt-3 flex items-center gap-1">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Vrattiks on ${social.label} (opens in a new tab)`}
                  className="focus-glow flex h-10 w-10 items-center justify-center rounded-md transition-opacity duration-150 hover:opacity-80"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    {social.label === "Instagram" && (
                      <defs>
                        <radialGradient id="footer-instagram-gradient" cx="0.3" cy="1.07" r="1.5">
                          <stop offset="0" stopColor="#FDF497" />
                          <stop offset="0.05" stopColor="#FDF497" />
                          <stop offset="0.45" stopColor="#FD5949" />
                          <stop offset="0.6" stopColor="#D6249F" />
                          <stop offset="0.9" stopColor="#285AEB" />
                        </radialGradient>
                      </defs>
                    )}
                    <path d={social.path} fill={social.color} />
                  </svg>
                </a>
              </li>
            ))}
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
