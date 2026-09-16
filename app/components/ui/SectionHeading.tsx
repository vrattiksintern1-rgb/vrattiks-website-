import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <span className="mb-3 block font-body text-[12.5px] font-semibold uppercase tracking-[0.06em] text-brand-secondary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-[28px] leading-[1.15] font-display font-bold text-n-900 md:text-[32px] md:leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[15.5px] leading-[1.65] text-n-500">{description}</p>
      ) : null}
    </Reveal>
  );
}
