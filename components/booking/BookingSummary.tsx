"use client";

import Image from "next/image";
import { PendingBooking } from "@/types";
import NeonCard from "@/components/ui/NeonCard";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CONSOLE_TYPE_COLORS, formatDateTime, formatIDR, isLocalImage } from "@/lib/utils";

interface BookingSummaryProps {
  booking: PendingBooking;
  className?: string;
}

export default function BookingSummary({
  booking,
  className = "",
}: BookingSummaryProps) {
  const { t } = useLanguage();
  const isLocal = isLocalImage(booking.consoleImageUrl);
  const typeColor = CONSOLE_TYPE_COLORS[booking.consoleType] ?? "";

  return (
    <NeonCard className={`space-y-5 ${className}`}>
      <h2 className="font-heading text-xl font-semibold">
        {t("booking.summary")}
      </h2>

      <div className="flex gap-4">
        <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-bg-elevated">
          {isLocal ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={booking.consoleImageUrl}
              alt={booking.consoleName}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={booking.consoleImageUrl}
              alt={booking.consoleName}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div>
          <Badge className={`mb-2 border ${typeColor}`}>
            {booking.consoleType}
          </Badge>
          <h3 className="font-heading font-semibold text-text-primary">
            {booking.consoleName}
          </h3>
        </div>
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-text-secondary">{t("booking.rentalType")}</dt>
          <dd className="font-medium capitalize">
            {booking.rentalType === "hourly"
              ? t("browse.hourly")
              : t("browse.daily")}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">{t("booking.start")}</dt>
          <dd className="font-mono text-text-primary">
            {formatDateTime(booking.startDateTime)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">{t("booking.end")}</dt>
          <dd className="font-mono text-text-primary">
            {formatDateTime(booking.endDateTime)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">{t("booking.duration")}</dt>
          <dd>
            {booking.durationValue}{" "}
            {booking.rentalType === "hourly"
              ? t("detail.hours")
              : t("detail.days")}
          </dd>
        </div>
      </dl>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">{t("booking.basePrice")}</span>
          <span className="font-mono">{formatIDR(booking.basePrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">{t("booking.deposit")}</span>
          <span className="font-mono">{formatIDR(booking.deposit)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>{t("booking.total")}</span>
          <span className="font-mono text-neon-primary text-lg">
            {formatIDR(booking.totalPrice)}
          </span>
        </div>
      </div>
    </NeonCard>
  );
}
