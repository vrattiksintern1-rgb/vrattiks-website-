import Reveal from "./Reveal";

/* `tone="dark"` is for headings sitting on the graphite band (Use Cases):
   heading goes to n-0, body copy to the muted n-300 ramp rather than pure
   white (CLAUDE.md Design Taste, reference 2). */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  id,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** id on the h2 — pass it as the parent Section's `labelledBy` */
  id?: string;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <span
          className={`mb-3 block font-body text-label font-semibold uppercase ${
            dark ? "text-brand-primary" : "text-brand-secondary"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        id={id}
        className={`text-[28px] leading-[1.15] tracking-[-0.02em] font-display font-bold md:text-h2 ${
          dark ? "text-n-0" : "text-n-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-body-lg ${dark ? "text-n-300" : "text-n-500"}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
