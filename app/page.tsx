"use client";

import Link from "next/link";
import {
  Gamepad2,
  Search,
  CalendarCheck,
  Zap,
  Star,
  Monitor,
} from "lucide-react";
import { useConsoles } from "@/hooks/useConsoles";
import { ConsoleType } from "@/types";
import Button from "@/components/ui/Button";
import NeonCard from "@/components/ui/NeonCard";
import ConsoleGrid from "@/components/consoles/ConsoleGrid";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const quickSelectTypes: {
  type: ConsoleType | "Xbox";
  labelKey: string;
  filterType?: ConsoleType;
  icon: React.ReactNode;
}[] = [
  { type: "PS4", labelKey: "consoleType.ps4", filterType: "PS4", icon: <Gamepad2 className="h-8 w-8" /> },
  { type: "PS5", labelKey: "consoleType.ps5", filterType: "PS5", icon: <Gamepad2 className="h-8 w-8" /> },
  { type: "Xbox", labelKey: "consoleType.xbox", filterType: "Xbox Series X", icon: <Gamepad2 className="h-8 w-8" /> },
  { type: "Nintendo Switch", labelKey: "consoleType.nintendoSwitch", filterType: "Nintendo Switch", icon: <Gamepad2 className="h-8 w-8" /> },
  { type: "PC Gaming", labelKey: "consoleType.pcGaming", filterType: "PC Gaming", icon: <Monitor className="h-8 w-8" /> },
];

const testimonials = [
  {
    name: "Rizky P.",
    quote: "Best rental spot in town! PS5 runs flawlessly and the staff knows their games.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
  },
  {
    name: "Dewi S.",
    quote: "Booked a Switch for a party — everyone had a blast. Super easy process!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  },
  {
    name: "Andi W.",
    quote: "The PC rig with RTX 4070 is insane. Worth every rupiah for ranked grind sessions.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop",
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const { consoles, isLoading } = useConsoles();
  const featured = consoles.filter((c) => c.status === "available").slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden neon-grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-primary/10 via-transparent to-bg-base" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
          <h1 className="font-heading text-4xl font-bold leading-tight text-text-primary md:text-6xl">
            {t("home.hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/consoles">
              <Button size="lg">{t("home.hero.browse")}</Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="ghost">
                {t("home.hero.howItWorks")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Select */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-center font-heading text-2xl font-semibold">
          {t("home.quickSelect")}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {quickSelectTypes.map((item) => (
            <Link
              key={item.labelKey}
              href={`/consoles?type=${encodeURIComponent(item.filterType ?? item.type)}`}
            >
              <NeonCard
                hoverable
                className="flex w-36 flex-col items-center gap-3 py-6 text-center"
              >
                <div className="text-neon-primary">{item.icon}</div>
                <span className="text-sm font-medium text-text-primary">
                  {t(item.labelKey as "consoleType.ps4")}
                </span>
              </NeonCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-bg-card py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold">
                {t("home.featured")}
              </h2>
              <p className="mt-1 text-text-secondary">
                {t("home.featured.subtitle")}
              </p>
            </div>
            <Link href="/consoles">
              <Button variant="outline" size="sm">
                {t("home.viewAll")}
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-xl bg-bg-elevated"
                />
              ))}
            </div>
          ) : (
            <ConsoleGrid consoles={featured} columns={4} />
          )}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-center font-heading text-2xl font-semibold">
          {t("home.howItWorks.title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Search, title: t("home.howItWorks.step1.title"), desc: t("home.howItWorks.step1.desc") },
            { icon: CalendarCheck, title: t("home.howItWorks.step2.title"), desc: t("home.howItWorks.step2.desc") },
            { icon: Zap, title: t("home.howItWorks.step3.title"), desc: t("home.howItWorks.step3.desc") },
          ].map((step, i) => (
            <NeonCard key={i} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-primary/20 text-neon-primary">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{step.desc}</p>
            </NeonCard>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-bg-elevated py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 px-6 text-center md:gap-16">
          {[t("home.stats.sessions"), t("home.stats.types"), t("home.stats.open")].map(
            (stat) => (
              <p
                key={stat}
                className="font-heading text-xl font-bold text-neon-secondary md:text-2xl"
              >
                {stat}
              </p>
            )
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-center font-heading text-2xl font-semibold">
          {t("home.testimonials.title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <NeonCard key={item.name}>
              <div className="mb-3 flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-neon-yellow text-neon-yellow"
                  />
                ))}
              </div>
              <p className="text-sm text-text-secondary">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-medium text-text-primary">{item.name}</span>
              </div>
            </NeonCard>
          ))}
        </div>
      </section>
    </>
  );
}
