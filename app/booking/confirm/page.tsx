"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PendingBooking, PaymentMethod, Booking } from "@/types";
import { CustomerGuard } from "@/components/layout/RouteGuard";
import BookingSummary from "@/components/booking/BookingSummary";
import Button from "@/components/ui/Button";
import NeonCard from "@/components/ui/NeonCard";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  PENDING_BOOKING_KEY,
  CUSTOMER_BOOKINGS_KEY,
  generateBookingCode,
  generateId,
  formatDateTime,
} from "@/lib/utils";

const PAYMENT_METHODS: { value: PaymentMethod; labelKey: string }[] = [
  { value: "gopay", labelKey: "booking.payment.gopay" },
  { value: "ovo", labelKey: "booking.payment.ovo" },
  { value: "dana", labelKey: "booking.payment.dana" },
  { value: "bank", labelKey: "booking.payment.bank" },
  { value: "cash", labelKey: "booking.payment.cash" },
];

function ConfirmContent() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState<PendingBooking | null>(null);
  const [payment, setPayment] = useState<PaymentMethod>("gopay");
  const [confirmed, setConfirmed] = useState<{
    code: string;
    booking: PendingBooking;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(PENDING_BOOKING_KEY);
    if (stored) {
      try {
        setPending(JSON.parse(stored));
      } catch {
        router.replace("/consoles");
      }
    } else {
      router.replace("/consoles");
    }
  }, [router]);

  const handleConfirm = () => {
    if (!pending || !user) return;

    const code = generateBookingCode();
    const newBooking: Booking = {
      id: generateId(),
      consoleId: pending.consoleId,
      consoleName: pending.consoleName,
      consoleType: pending.consoleType,
      userId: user.id,
      userName: user.name,
      rentalType: pending.rentalType,
      startDateTime: pending.startDateTime,
      endDateTime: pending.endDateTime,
      durationValue: pending.durationValue,
      totalPrice: pending.totalPrice,
      status: "pending",
      bookingCode: code,
      createdAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem(CUSTOMER_BOOKINGS_KEY);
    const bookings: Booking[] = existing ? JSON.parse(existing) : [];
    bookings.push(newBooking);
    localStorage.setItem(CUSTOMER_BOOKINGS_KEY, JSON.stringify(bookings));
    localStorage.removeItem(PENDING_BOOKING_KEY);

    setConfirmed({ code, booking: pending });
  };

  if (!pending && !confirmed) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-neon-primary/30" />
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <div className="checkmark-animate mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neon-green/20">
          <CheckCircle2 className="h-12 w-12 text-neon-green" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-neon-green">
          {t("booking.success.title")}
        </h1>
        <p className="mt-2 text-text-secondary">{t("booking.success.code")}</p>
        <p className="mt-4 font-mono text-3xl font-bold text-neon-primary">
          {confirmed.code}
        </p>
        <NeonCard className="mt-8 text-left">
          <p className="font-heading font-semibold">{confirmed.booking.consoleName}</p>
          <p className="mt-1 text-sm text-text-secondary">
            {formatDateTime(confirmed.booking.startDateTime)} —{" "}
            {formatDateTime(confirmed.booking.endDateTime)}
          </p>
        </NeonCard>
        <p className="mt-6 text-sm text-text-secondary">
          {t("booking.success.instruction")}
        </p>
        <Link href="/dashboard" className="mt-8 inline-block">
          <Button size="lg">{t("booking.success.viewBookings")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 font-heading text-3xl font-bold">
        {t("booking.confirm")}
      </h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <BookingSummary booking={pending!} />

        <NeonCard className="space-y-6">
          <h2 className="font-heading text-xl font-semibold">
            {t("booking.payment")}
          </h2>
          <p className="text-sm text-text-muted">{t("booking.paymentNote")}</p>

          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                  payment === method.value
                    ? "border-neon-primary bg-neon-primary/10 shadow-neon-active"
                    : "border-border hover:border-neon-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.value}
                  checked={payment === method.value}
                  onChange={() => setPayment(method.value)}
                  className="accent-neon-primary"
                />
                <span className="font-medium">
                  {t(method.labelKey as "booking.payment.gopay")}
                </span>
              </label>
            ))}
          </div>

          <Button className="w-full" size="lg" onClick={handleConfirm}>
            {t("booking.confirm")}
          </Button>
        </NeonCard>
      </div>
    </div>
  );
}

export default function BookingConfirmPage() {
  return (
    <CustomerGuard>
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-8 w-8 animate-pulse rounded-full bg-neon-primary/30" />
          </div>
        }
      >
        <ConfirmContent />
      </Suspense>
    </CustomerGuard>
  );
}
