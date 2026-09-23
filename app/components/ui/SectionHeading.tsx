import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

/**
 * Standard section head. The eyebrow always renders through `Eyebrow` so the
 * gradient-dash treatment from docs/index.html §6 is consistent everywhere —
 * do not hand-roll an uppercase label span in a section file.
 *
 * `id` is required wherever the parent `Section` sets `labelledBy`, so each
 * section landmark is named by its own heading.
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <Eyebrow
          tone={tone}
          className={align === "center" ? "justify-center" : ""}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        id={id}
        className={`mt-5 font-display text-[clamp(28px,3.4vw,40px)] leading-heading font-bold tracking-[-0.025em] text-balance ${
          dark ? "text-n-0" : "text-n-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-body leading-relaxed ${dark ? "text-n-300" : "text-n-600"}`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
