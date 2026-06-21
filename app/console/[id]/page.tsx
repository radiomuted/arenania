"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Gamepad2,
  ArrowLeft,
  Disc3,
} from "lucide-react";
import { useConsoles } from "@/hooks/useConsoles";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import BookingForm from "@/components/booking/BookingForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CONSOLE_TYPE_COLORS, STATUS_COLORS, isLocalImage } from "@/lib/utils";

export default function ConsoleDetailPage() {
  const params = useParams();
  const { t } = useLanguage();
  const { consoles, isLoading } = useConsoles();
  const item = consoles.find((c) => c.id === params.id);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-neon-primary/30" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold">{t("common.notFound")}</h1>
        <p className="mt-2 text-text-secondary">{t("common.notFoundDesc")}</p>
        <Link href="/consoles" className="mt-6 inline-block">
          <Button>{t("common.goHome")}</Button>
        </Link>
      </div>
    );
  }

  const isLocal = isLocalImage(item.imageUrl);
  const statusKey = `status.${item.status}` as const;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/consoles"
        className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("common.back")}
      </Link>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-bg-elevated">
            {isLocal ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className={`border ${CONSOLE_TYPE_COLORS[item.type]}`}>
              {item.type}
            </Badge>
            <Badge className={`border ${STATUS_COLORS[item.status]}`}>
              {t(statusKey)}
            </Badge>
          </div>

          <h1 className="font-heading text-3xl font-bold">{item.name}</h1>
          <p className="text-text-secondary leading-relaxed">{item.description}</p>

          <div>
            <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold">
              <Cpu className="h-5 w-5 text-neon-secondary" />
              {t("detail.specs")}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {item.specs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-center gap-2 rounded-lg bg-bg-card border border-border px-4 py-2.5 text-sm"
                >
                  <Gamepad2 className="h-4 w-4 text-neon-primary" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold">
              <Disc3 className="h-5 w-5 text-neon-secondary" />
              {t("detail.includedGames")}
            </h2>
            <div className="max-h-48 overflow-y-auto rounded-xl border border-border bg-bg-card p-4">
              <ul className="space-y-2">
                {item.includedGames.map((game) => (
                  <li
                    key={game}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-primary" />
                    {game}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <BookingForm console={item} />
        </div>
      </div>
    </div>
  );
}
