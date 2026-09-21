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

/* Two rhythms only. `lg` is for the page's anchor moments (the dark results
   band, the closing CTA); `md` is the default cadence for everything else.
   `md` matches the section-padding band in docs/index.html §6.4 exactly —
   56px mobile / 64px tablet / 96px desktop (ui-ux-pro-max §4). */
const sizes = {
  md: "py-14 sm:py-16 md:py-24",
  lg: "py-20 sm:py-24 md:py-32",
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
