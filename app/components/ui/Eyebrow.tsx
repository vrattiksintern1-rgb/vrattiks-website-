/**
 * Section eyebrow — mirrors the `.eyebrow` component in docs/index.html §6:
 * 13px, 600, 0.14em tracking, uppercase, preceded by a 22px gradient dash.
 *
 * The `dash` variant is the page's constant spine: it repeats above every
 * section heading, which is what buys each section the freedom to change
 * layout underneath (CLAUDE.md Design Taste, reference 3). Do not add a third
 * variant for a section — `chip` exists only for the Hero, which sits above
 * the spine rather than inside it.
 */
export default function Eyebrow({
  children,
  tone = "light",
  variant = "dash",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  variant?: "dash" | "chip";
  className?: string;
}) {
  const dark = tone === "dark";

  if (variant === "chip") {
    return (
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border py-2 pr-4 pl-2.5 font-body text-label font-semibold tracking-[0.1em] uppercase ${
          dark
            ? "border-n-0/15 bg-n-0/5 text-brand-primary"
            : "border-brand-primary/30 bg-n-0/80 text-brand-secondary shadow-[var(--shadow-soft)] backdrop-blur-sm"
        } ${className}`}
      >
        <span
          aria-hidden="true"
          className="bg-brand-gradient h-2 w-2 shrink-0 rounded-full"
        />
        {children}
      </span>
    );
  }

  return (
    <span
      className={`flex items-center gap-3 font-body text-label font-semibold uppercase tracking-[0.14em] ${
        dark ? "text-brand-primary" : "text-brand-secondary"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="bg-brand-gradient h-0.5 w-[22px] shrink-0 rounded-full"
      />
      {children}
    </span>
  );
}
