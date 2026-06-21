interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export default function Badge({
  children,
  className = "",
  variant = "default",
}: BadgeProps) {
  const base =
    variant === "outline"
      ? "border rounded-full px-2.5 py-0.5 text-xs font-medium"
      : "rounded-full px-2.5 py-0.5 text-xs font-medium";

  return (
    <span className={`inline-flex items-center ${base} ${className}`}>
      {children}
    </span>
  );
}
