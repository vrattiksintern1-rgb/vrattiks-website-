/**
 * Section eyebrow — mirrors the `.eyebrow` component in docs/index.html §6:
 * 13px, 600, 0.14em tracking, uppercase, preceded by a 22px gradient dash.
 */
export default function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`flex items-center gap-3 font-body text-label font-semibold uppercase tracking-[0.14em] ${
        tone === "dark" ? "text-brand-primary" : "text-brand-secondary"
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
