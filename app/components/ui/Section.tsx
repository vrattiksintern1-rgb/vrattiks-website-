/**
 * Section shell. Owns the page's vertical rhythm and background tone so each
 * Home section can differ visually without re-deriving padding every time.
 * `relative` + `isolate` are always on: the texture utilities in globals.css
 * (.bg-noise / .bg-grid-fine) paint through a ::before that needs both.
 *
 * Clipping is `overflow-x-clip`, deliberately NOT `overflow-hidden`: hidden
 * makes the section a scroll container, which silently breaks the `md:sticky`
 * columns in WhyVrattiks and Industries. `clip` contains the decorative washes
 * horizontally without creating one.
 *
 * Every Home section renders through this — do not hand-roll a `<section>`
 * with its own padding, or the page's rhythm drifts (vrattiks-architecture §2).
 *
 * ACCESSIBILITY (vrattiks-accessibility, "Semantic HTML" + "ARIA only when
 * needed"): this renders a real `<section>` landmark, and `labelledBy` wires
 * `aria-labelledby` to the id of that section's own heading so each landmark is
 * named by visible text rather than a duplicated `aria-label`. Every caller on
 * Home passes it. If you add a section, pass `labelledBy` and give its
 * SectionHeading the matching `id` — an unnamed landmark is worse than none.
 */
const tones = {
  /* Page default — faintest neutral */
  paper: "bg-n-25 text-n-800",
  /* Pure white, for sections that should read as a raised plane */
  white: "bg-n-0 text-n-800",
  /* Tinted lilac wash */
  tint: "bg-n-50 text-n-800",
  /* Inverted graphite band */
  dark: "bg-brand-graphite text-n-200",
} as const;

/* Two rhythms only. `lg` is for the page's anchor moments (currently unused);
   `md` is the default cadence for everything else.

   History: the 2026-09-21 elevated-visual pass loosened `md` to 64/80/112
   (above docs/index.html §6.4's 56/64/96). The 2026-10-09 site-wide spacing
   pass tightened it, at the user's request, to 56/64/80: mobile and tablet
   now match §6.4 exactly; desktop sits one step under the doc's 96 (−29% vs
   112). Home's own sections hand-roll a tighter `py-8 md:py-12` (32/48); the
   two rhythms are deliberately unequal. Old/new values are logged in
   memory.md. `lg` was left at 96/112/144 because nothing renders it. */
const sizes = {
  md: "py-14 sm:py-16 md:py-20",
  lg: "py-24 sm:py-28 md:py-36",
} as const;

export default function Section({
  tone = "paper",
  size = "md",
  id,
  className = "",
  children,
  as: Tag = "section",
  labelledBy,
}: {
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  id?: string;
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate overflow-x-clip ${sizes[size]} ${tones[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}
