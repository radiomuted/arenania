"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  );
}
