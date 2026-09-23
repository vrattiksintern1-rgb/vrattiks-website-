import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

/* Pill shape is the documented spec (docs/index.html §6: `border-radius: 999px`)
   and stays ours — the reference site's 10px rect was not adopted. What WAS
   adopted from it is the resting soft glow on the secondary/outline action,
   which is what stops a two-button row reading as "one real button plus a
   link", and the slightly taller `lg` tap target.

   `active:translate-y-0` cancels the hover lift on press — without it a pressed
   button stays lifted and the click reads as unregistered (kylezantos-design
   §2.4: most missing polish is a missing state, not a missing animation). */
const base =
  "focus-glow inline-flex items-center justify-center gap-2 rounded-full font-semibold font-body whitespace-nowrap transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "text-label px-[18px] py-[9px]",
  md: "text-ui px-[26px] py-[13px]",
  lg: "text-body px-8 py-[17px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-n-0 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-brand)] hover:-translate-y-0.5",
  secondary:
    "bg-brand-graphite text-n-0 hover:bg-n-800 hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]",
  outline:
    "bg-n-0/70 text-brand-secondary border-[1.5px] border-brand-secondary/35 shadow-[0_0_0_4px_rgba(183,154,243,0.10)] hover:border-brand-secondary hover:bg-n-0 hover:shadow-[0_0_0_5px_rgba(183,154,243,0.18)] hover:-translate-y-0.5",
  ghost: "bg-transparent text-brand-secondary hover:bg-n-50",
  /* For the graphite bands — brand-secondary on #16161d fails contrast, so the
     outline action inverts to a hairline in white rather than in brand violet. */
  onDark:
    "focus-glow-dark bg-n-0/5 text-n-0 border-[1.5px] border-n-0/25 hover:border-n-0/60 hover:bg-n-0/10 hover:-translate-y-0.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "href"
  >;

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
  >;

type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as NativeButtonProps;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
