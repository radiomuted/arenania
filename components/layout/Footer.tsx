"use client";

import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-neon-primary" />
              <span className="font-heading text-lg font-bold text-neon-primary">
                ARENANIA
              </span>
            </div>
            <p className="text-sm text-text-secondary">{t("footer.tagline")}</p>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-text-primary">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/" className="hover:text-neon-primary transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/consoles" className="hover:text-neon-primary transition-colors">
                  {t("nav.browse")}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-neon-primary transition-colors">
                  {t("nav.signIn")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-text-primary">
              {t("footer.contact")}
            </h3>
            <p className="text-sm text-text-secondary">arenania@gaming.id</p>
            <p className="mt-1 text-sm text-text-secondary">+62 813-8831-8899-AREN</p>
            <p className="mt-2 text-sm text-text-muted">{t("footer.hours")}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-text-muted">
          © {new Date().getFullYear()} Arenania. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
