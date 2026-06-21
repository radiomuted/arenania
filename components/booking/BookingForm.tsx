"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Console } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import NeonCard from "@/components/ui/NeonCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { PENDING_BOOKING_KEY, formatIDR } from "@/lib/utils";

interface BookingFormProps {
  console: Console;
  className?: string;
}

export default function BookingForm({
  console: item,
  className = "",
}: BookingFormProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const isAvailable = item.status === "available";

  const [rentalType, setRentalType] = useState<"hourly" | "daily">("hourly");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [duration, setDuration] = useState(2);

  const unitPrice =
    rentalType === "hourly" ? item.pricePerHour : item.pricePerDay;
  const totalPrice = unitPrice * duration;

  const router = useRouter();

  const handleBook = () => {
    if (!date || !isAvailable) return;

    if (!user || user.role !== "customer") {
      router.push("/login");
      return;
    }

    const startDateTime = new Date(
      rentalType === "hourly" ? `${date}T${startTime}` : `${date}T09:00`
    );
    const endDateTime = new Date(startDateTime);
    if (rentalType === "hourly") {
      endDateTime.setHours(endDateTime.getHours() + duration);
    } else {
      endDateTime.setDate(endDateTime.getDate() + duration);
    }

    const pending = {
      consoleId: item.id,
      consoleName: item.name,
      consoleType: item.type,
      consoleImageUrl: item.imageUrl,
      rentalType,
      startDate: date,
      startTime: rentalType === "hourly" ? startTime : undefined,
      durationValue: duration,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
      basePrice: totalPrice,
      deposit: 50000,
      totalPrice: totalPrice + 50000,
    };

    localStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify(pending));
    router.push("/booking/confirm");
  };

  if (!isAvailable) {
    return (
      <NeonCard className={className}>
        <div className="rounded-lg border border-neon-yellow/30 bg-neon-yellow/10 p-4 text-center">
          <p className="font-heading font-semibold text-neon-yellow">
            {t("detail.unavailableBanner")}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {t("detail.unavailableDesc")}
          </p>
        </div>
      </NeonCard>
    );
  }

  return (
    <NeonCard className={`sticky top-24 space-y-5 ${className}`}>
      <h2 className="font-heading text-xl font-semibold">
        {t("detail.bookingPanel")}
      </h2>

      <div className="flex rounded-lg border border-border overflow-hidden">
        {(["hourly", "daily"] as const).map((rt) => (
          <button
            key={rt}
            type="button"
            onClick={() => {
              setRentalType(rt);
              setDuration(rt === "hourly" ? 2 : 1);
            }}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary ${
              rentalType === rt
                ? "bg-neon-primary text-white shadow-neon-active"
                : "bg-bg-elevated text-text-secondary hover:text-text-primary"
            }`}
          >
            {rt === "hourly" ? t("detail.perHour") : t("detail.perDay")}
          </button>
        ))}
      </div>

      <p className="font-mono text-2xl font-bold text-neon-secondary">
        {formatIDR(unitPrice)}
        <span className="text-sm font-normal text-text-muted">
          {rentalType === "hourly" ? t("browse.perHour") : t("browse.perDay")}
        </span>
      </p>

      <Input
        label={t("detail.date")}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
      />

      {rentalType === "hourly" && (
        <Input
          label={t("detail.startTime")}
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      )}

      <Input
        label={t("detail.duration")}
        type="number"
        min={1}
        max={rentalType === "hourly" ? 12 : 7}
        value={duration}
        onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
      />
      <p className="-mt-3 text-xs text-text-muted">
        {duration}{" "}
        {rentalType === "hourly" ? t("detail.hours") : t("detail.days")}
      </p>

      <div className="rounded-lg border border-border bg-bg-elevated p-4">
        <p className="text-sm text-text-secondary">{t("detail.totalPrice")}</p>
        <p className="font-mono text-2xl font-bold text-neon-primary">
          {formatIDR(totalPrice)}
        </p>
      </div>

      <Button className="w-full" size="lg" onClick={handleBook} disabled={!date}>
        {t("browse.bookNow")}
      </Button>
    </NeonCard>
  );
}
