"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      wrapperClassName = "",
      type,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLanguage();
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={`w-full rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-text-primary placeholder:text-text-muted transition-colors focus:border-neon-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:cursor-not-allowed disabled:opacity-50 ${isPassword ? "pr-11" : ""} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
              aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-neon-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
