"use client";

import Image from "next/image";
import Link from "next/link";
import { Console } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import NeonCard from "@/components/ui/NeonCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  CONSOLE_TYPE_COLORS,
  STATUS_COLORS,
  formatIDR,
  isLocalImage,
} from "@/lib/utils";

interface ConsoleCardProps {
  console: Console;
  rentalType?: "hourly" | "daily";
  className?: string;
  compact?: boolean;
}

export default function ConsoleCard({
  console: item,
  rentalType = "hourly",
  className = "",
  compact = false,
}: ConsoleCardProps) {
  const { t } = useLanguage();
  const isAvailable = item.status === "available";
  const isLocal = isLocalImage(item.imageUrl);

  const statusKey = `status.${item.status}` as const;
  const typeColor = CONSOLE_TYPE_COLORS[item.type] ?? "";
  const statusColor = STATUS_COLORS[item.status] ?? "";

  const price =
    rentalType === "hourly" ? item.pricePerHour : item.pricePerDay;
  const priceLabel =
    rentalType === "hourly" ? t("browse.perHour") : t("browse.perDay");

  return (
    <NeonCard hoverable className={`flex flex-col gap-4 ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-bg-elevated">
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
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className={`border ${typeColor}`}>{item.type}</Badge>
        </div>
        <div className="absolute right-3 top-3">
          <Badge className={`border ${statusColor}`}>{t(statusKey)}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-heading text-lg font-semibold text-text-primary line-clamp-1">
          {item.name}
        </h3>

        {!compact && (
          <ul className="flex flex-wrap gap-1.5">
            {item.specs.slice(0, 3).map((spec) => (
              <li
                key={spec}
                className="rounded-full bg-bg-elevated px-2 py-0.5 text-xs text-text-secondary"
              >
                {spec}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="font-mono text-lg font-semibold text-neon-secondary">
              {formatIDR(price)}
            </p>
            <p className="text-xs text-text-muted">{priceLabel}</p>
            {rentalType === "hourly" && (
              <p className="text-xs text-text-muted">
                {formatIDR(item.pricePerDay)}
                {t("browse.perDay")}
              </p>
            )}
          </div>

          {isAvailable ? (
            <Link href={`/console/${item.id}`}>
              <Button size="sm">{t("browse.bookNow")}</Button>
            </Link>
          ) : (
            <Button size="sm" disabled variant="ghost">
              {t("browse.unavailable")}
            </Button>
          )}
        </div>
      </div>
    </NeonCard>
  );
}
