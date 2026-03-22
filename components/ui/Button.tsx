import { cn } from "./cn";

interface ButtonProps {
  variant?: "primary" | "outline";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  href,
  children,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-heading text-sm font-semibold transition-all";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-secondary px-6 py-3 text-background hover:shadow-[0_0_24px_rgba(0,240,200,0.3)]",
    outline:
      "border border-primary/40 px-6 py-3 text-primary hover:bg-primary/10 hover:border-primary/60",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}
