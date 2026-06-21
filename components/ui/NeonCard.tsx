"use client";

import { ReactNode } from "react";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export default function NeonCard({
  children,
  className = "",
  hoverable = false,
  selected = false,
  onClick,
}: NeonCardProps) {
  const interactive = hoverable || onClick;

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`rounded-xl border bg-bg-card p-5 transition-all duration-200 ${
        selected
          ? "border-neon-secondary shadow-neon-active"
          : "border-border"
      } ${
        interactive
          ? "cursor-pointer hover:border-neon-primary hover:shadow-glow-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
