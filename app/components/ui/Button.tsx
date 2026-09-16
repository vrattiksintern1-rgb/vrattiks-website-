import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "focus-glow inline-flex items-center justify-center gap-2 rounded-full font-semibold font-body whitespace-nowrap transition-[transform,box-shadow,background-color] duration-150 ease-out";

const sizes: Record<Size, string> = {
  sm: "text-[13px] px-[18px] py-[9px]",
  md: "text-[14.5px] px-[26px] py-[13px]",
  lg: "text-[16px] px-8 py-4",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-n-0 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5",
  secondary: "bg-brand-graphite text-n-0 hover:bg-n-800",
  outline:
    "bg-transparent text-brand-secondary border-[1.5px] border-brand-secondary hover:bg-n-50",
  ghost: "bg-transparent text-brand-secondary hover:bg-n-50",
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
