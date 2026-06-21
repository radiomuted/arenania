"use client";

import Link from "next/link";
import { Gamepad2, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const WHATSAPP_NUMBER = "6281388318899";
const INSTAGRAM_URL = "https://www.instagram.com/arenania/";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
            <p className="mt-4 flex items-start gap-2 text-sm text-text-secondary">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-secondary" />
              <span>{t("footer.address")}</span>
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-text-primary">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-neon-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/consoles"
                  className="transition-colors hover:text-neon-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
                >
                  {t("nav.browse")}
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="transition-colors hover:text-neon-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
                >
                  {t("nav.signIn")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-text-primary">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-text-secondary transition-colors hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
                >
                  <WhatsAppIcon className="h-5 w-5 flex-shrink-0 text-neon-green" />
                  <span>+62 813-8831-8899</span>
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-text-secondary transition-colors hover:text-neon-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
                >
                  <InstagramIcon className="h-5 w-5 flex-shrink-0 text-neon-primary" />
                  <span>{t("footer.instagram")}</span>
                </a>
              </li>
              <li className="text-text-secondary">arenania@gaming.id</li>
            </ul>
            <p className="mt-3 text-sm text-text-muted">{t("footer.hours")}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-text-muted">
          © {new Date().getFullYear()} Arenania. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
