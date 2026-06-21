"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gamepad2,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

export default function NavBar() {
  const { user, logout, isCustomer } = useAuth();
  const { t, locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/consoles", label: t("nav.browse") },
    { href: "/#how-it-works", label: t("nav.howItWorks") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded-lg"
        >
          <Gamepad2 className="h-7 w-7 text-neon-primary" />
          <span className="font-heading text-xl font-bold tracking-wider text-neon-primary">
            ARENANIA
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-neon-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded ${
                isActive(link.href)
                  ? "text-neon-primary"
                  : "text-text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary ${
                locale === "en"
                  ? "bg-neon-primary text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("id")}
              className={`px-2.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary ${
                locale === "id"
                  ? "bg-neon-primary text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              ID
            </button>
          </div>

          {isCustomer && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
              >
                <Avatar src={user.avatarUrl} alt={user.name} size="sm" />
                <ChevronDown className="h-4 w-4 text-text-secondary" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-bg-elevated py-2 shadow-glow-purple">
                  <p className="px-4 py-2 text-sm font-medium text-text-primary">
                    {user.name}
                  </p>
                  <hr className="border-border" />
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-bg-card hover:text-text-primary"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    {t("nav.myBookings")}
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-bg-card hover:text-text-primary"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    {t("nav.profile")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neon-red hover:bg-bg-card"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("nav.signOut")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  {t("nav.signIn")}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{t("nav.register")}</Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="md:hidden text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-bg-elevated px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-neon-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`flex-1 rounded-lg py-2 text-sm ${locale === "en" ? "bg-neon-primary text-white" : "border border-border"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("id")}
                className={`flex-1 rounded-lg py-2 text-sm ${locale === "id" ? "bg-neon-primary text-white" : "border border-border"}`}
              >
                ID
              </button>
            </div>
            {(!user || !isCustomer) && (
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full" size="sm">
                    {t("nav.signIn")}
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" size="sm">
                    {t("nav.register")}
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
