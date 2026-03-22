import { cn } from "./cn";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  children,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-heading text-3xl font-bold text-white/90 md:text-4xl",
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </h2>
  );
}
