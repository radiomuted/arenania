"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-neon-primary text-white hover:bg-neon-primary/90 shadow-neon-primary hover:shadow-neon-primary",
  secondary:
    "bg-neon-secondary text-bg-base hover:bg-neon-secondary/90 shadow-glow-cyan",
  ghost:
    "bg-transparent text-text-primary hover:bg-bg-elevated border border-border hover:border-neon-primary",
  danger:
    "bg-neon-red/20 text-neon-red border border-neon-red/30 hover:bg-neon-red/30",
  outline:
    "bg-transparent text-neon-primary border border-neon-primary hover:bg-neon-primary/10 hover:shadow-neon-active",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
