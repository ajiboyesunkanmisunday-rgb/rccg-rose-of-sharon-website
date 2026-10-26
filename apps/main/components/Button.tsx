"use client";
import { A } from "@ros/shared/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  variant,
  ...rest
}: ButtonProps) {
  const base =
    "flex justify-center items-center gap-2 bg-clip-padding px-4 sm:px-5 border rounded-full border-solid border-foreground h-10 sm:h-12 text-sm sm:text-base transition duration-300 ease-in-out";

  const variantClass =
    variant === "secondary"
      ? "border-foreground/[.145] hover:bg-foreground/[.145] sm:min-w-44"
      : "bg-foreground hover:bg-foreground/80 hover:border-foreground/80 text-background";

  const classes = `${base} ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <A href={href} target={target} rel={rel} className={classes}>
        {children}
      </A>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
