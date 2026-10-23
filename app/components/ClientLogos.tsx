import Image from "next/image";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

/* USER-PROVIDED (2026-10-22): client logos, shown straight on the section
   with no tile behind them (user request). Files in public/images/clients/
   are trimmed, with any solid black or white ground cut away. Because there
   is no tile, a logo whose lettering is black or white would vanish on one
   theme, so those have a second file in which only that neutral lettering is
   swapped (white on the dark theme, graphite on the light one). Brand
   colours are never changed. `src` is the light-theme file; `darkSrc`, when
   set, replaces it under the dark theme. `w` x `h` is the file's pixel size
   (a `darkSrc` file is always the same size as its `src`). */
const clients: { name: string; src: string; w: number; h: number; darkSrc?: string }[] = [
  { name: "Peturn", src: "/images/clients/peturn.png", w: 720, h: 220, darkSrc: "/images/clients/peturn-on-dark.png" },
  { name: "Café Beats", src: "/images/clients/cafe-beats-on-light.png", w: 566, h: 240, darkSrc: "/images/clients/cafe-beats.png" },
  { name: "Chandan", src: "/images/clients/chandan.png", w: 392, h: 240, darkSrc: "/images/clients/chandan-on-dark.png" },
  { name: "Grenee", src: "/images/clients/grenee.png", w: 671, h: 142 },
  { name: "Kevin's Kalpataru Collection", src: "/images/clients/kevins-kalpataru.png", w: 423, h: 240 },
  { name: "Tokicha", src: "/images/clients/tokicha-on-light.png", w: 263, h: 107, darkSrc: "/images/clients/tokicha.png" },
  { name: "Shukran Villa", src: "/images/clients/shukran-villa.png", w: 417, h: 160, darkSrc: "/images/clients/shukran-villa-on-dark.png" },
  { name: "Bhatt Tech Innovations", src: "/images/clients/bhatt-tech.png", w: 720, h: 122, darkSrc: "/images/clients/bhatt-tech-on-dark.png" },
  /* Supplied in white on its own navy; on the light theme the white
     lettering takes that navy rather than graphite. */
  { name: "Drape Shoppe", src: "/images/clients/drape-shoppe-on-light.png", w: 540, h: 240, darkSrc: "/images/clients/drape-shoppe.png" },
  { name: "Exonic Salon", src: "/images/clients/exonic-salon.png", w: 458, h: 140, darkSrc: "/images/clients/exonic-salon-on-dark.png" },
  { name: "Auroma Holiday Villas", src: "/images/clients/auroma-on-light.png", w: 720, h: 163, darkSrc: "/images/clients/auroma.png" },
  { name: "Anjali Mobile & Electronics", src: "/images/clients/anjali-mobile.png", w: 720, h: 227, darkSrc: "/images/clients/anjali-mobile-on-dark.png" },
  /* Supplied without a business name (2026-10-22). `name` is only a plain
     description for the alt text; replace it with the business name once
     the user gives one. Never guess a name here. */
  { name: "Rising sun logo", src: "/images/clients/sun-logo.png", w: 368, h: 240 },
  { name: "Amiras Papad", src: "/images/clients/amiras-papad.png", w: 333, h: 240 },
  /* Supplied on a black disc; only the disc is removed. Its own white
     sticker outline keeps the dark lettering readable on both themes. */
  { name: "Boba & Coffee", src: "/images/clients/boba-coffee.png", w: 352, h: 240 },
  { name: "Trinon Technology", src: "/images/clients/trinon.png", w: 353, h: 101, darkSrc: "/images/clients/trinon-on-dark.png" },
];

const headingId = "client-logos-heading";

/* Every logo is exactly this tall (h-10 below md, h-12 from md); its width
   follows from its own aspect ratio. `width`/`height` on <Image> are the
   file's pixel size and `sizes` gives the rendered width, so the srcset
   still serves 2x-sharp files at the small display size. */
const logoHeight = { base: 40, md: 48 };

/* Logo wall directly under Testimonials, with no visible copy (user request,
   2026-10-22): one full-bleed row scrolling right to left. The list renders
   twice and the track moves by -50%, i.e. exactly one copy, so the loop has
   no seam. `pr-*` on each copy equals its `gap-x-*`, which keeps the spacing
   across the join identical to the spacing inside a copy. The second copy is
   aria-hidden so each name is announced once. Images are eager (low
   priority): the marquee clips them horizontally, so lazy loading would
   leave logos blank until they scrolled in. Animation, hover pause, edge
   fade and the reduced-motion static grid live in `.marquee` (globals.css).
   The h2 is sr-only: it keeps the page outline and names the landmark. */
function LogoList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      role="list"
      aria-hidden={duplicate || undefined}
      className="marquee-list flex shrink-0 items-center gap-x-12 pr-12 md:gap-x-16 md:pr-16"
    >
      {clients.map((c) => {
        const ratio = c.w / c.h;
        const sizes = `(min-width: 768px) ${Math.ceil(logoHeight.md * ratio)}px, ${Math.ceil(logoHeight.base * ratio)}px`;
        return (
          <li key={c.name} className="flex shrink-0 items-center">
            <Image
              src={c.src}
              alt={duplicate ? "" : c.name}
              width={c.w}
              height={c.h}
              sizes={sizes}
              loading="eager"
              fetchPriority="low"
              className={`h-10 w-auto md:h-12 ${c.darkSrc ? "dark:hidden" : ""}`}
            />
            {c.darkSrc ? (
              <Image
                src={c.darkSrc}
                alt={duplicate ? "" : c.name}
                width={c.w}
                height={c.h}
                sizes={sizes}
                loading="eager"
                fetchPriority="low"
                className="hidden h-10 w-auto md:h-12 dark:block"
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default function ClientLogos() {
  return (
    <Section labelledBy={headingId}>
      <h2 id={headingId} className="sr-only">
        Our clients
      </h2>
      <Reveal from="fade">
        <div className="marquee">
          <div className="marquee-track flex w-max">
            <LogoList />
            <LogoList duplicate />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
