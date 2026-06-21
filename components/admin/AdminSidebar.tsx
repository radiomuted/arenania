"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gamepad2,
  CalendarDays,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { t, locale, setLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/admin/dashboard", label: t("admin.dashboard"), icon: LayoutDashboard },
    { href: "/admin/consoles", label: t("admin.consoles"), icon: Gamepad2 },
    { href: "/admin/bookings", label: t("admin.bookings"), icon: CalendarDays },
  ];

  const sidebarContent = (
    <>
      <div className="mb-8 flex items-center gap-2 px-2">
        <Gamepad2 className="h-7 w-7 text-neon-primary" />
        <span className="font-heading text-lg font-bold text-neon-primary">
          ARENANIA
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary ${
                active
                  ? "bg-neon-primary/20 text-neon-primary shadow-neon-active"
                  : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-border pt-4">
        <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`flex-1 px-2 py-1.5 ${locale === "en" ? "bg-neon-primary text-white" : "text-text-secondary"}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLocale("id")}
            className={`flex-1 px-2 py-1.5 ${locale === "id" ? "bg-neon-primary text-white" : "text-text-secondary"}`}
          >
            ID
          </button>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neon-red transition-colors hover:bg-neon-red/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
        >
          <LogOut className="h-5 w-5" />
          {t("nav.signOut")}
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-lg border border-border bg-bg-elevated p-2 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-bg-elevated p-6 lg:flex">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-bg-elevated p-6 lg:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
