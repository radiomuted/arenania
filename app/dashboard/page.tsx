"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Booking, ConsoleType } from "@/types";
import { bookings as mockBookings } from "@/lib/mock-data/bookings";
import { CustomerGuard } from "@/components/layout/RouteGuard";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import NeonCard from "@/components/ui/NeonCard";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  CUSTOMER_BOOKINGS_KEY,
  STATUS_COLORS,
  formatDateTime,
  formatIDR,
} from "@/lib/utils";

function DashboardContent() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CUSTOMER_BOOKINGS_KEY);
    const local: Booking[] = stored ? JSON.parse(stored) : [];
    const mock = mockBookings.filter((b) => b.userId === user?.id);
    const merged = [...mock, ...local.filter((lb) => !mock.some((m) => m.id === lb.id))];
    setBookings(merged);
  }, [user?.id]);

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
    const stored = localStorage.getItem(CUSTOMER_BOOKINGS_KEY);
    if (stored) {
      const local: Booking[] = JSON.parse(stored);
      const updated = local.map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b
      );
      localStorage.setItem(CUSTOMER_BOOKINGS_KEY, JSON.stringify(updated));
    }
  };

  const active = bookings.filter(
    (b) => b.status === "active" || b.status === "pending"
  );
  const history = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  const recentTypes = useMemo(() => {
    const types = bookings
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((b) => b.consoleType);
    return Array.from(new Set(types)).slice(0, 2) as ConsoleType[];
  }, [bookings]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10 flex flex-wrap items-center gap-6">
        <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
        <div>
          <h1 className="font-heading text-3xl font-bold">{user.name}</h1>
          <p className="text-text-secondary">{t("dashboard.title")}</p>
        </div>
        <div className="ml-auto flex gap-6">
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-neon-primary">
              {user.totalBookings + bookings.length}
            </p>
            <p className="text-xs text-text-muted">{t("dashboard.totalBookings")}</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-neon-secondary">
              {formatIDR(user.totalSpent)}
            </p>
            <p className="text-xs text-text-muted">{t("dashboard.totalSpent")}</p>
          </div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-heading text-xl font-semibold">
          {t("dashboard.activeBookings")}
        </h2>
        {active.length === 0 ? (
          <p className="text-text-muted">{t("dashboard.noActive")}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {active.map((booking) => (
              <NeonCard key={booking.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-sm text-neon-secondary">
                      {booking.bookingCode}
                    </p>
                    <h3 className="mt-1 font-heading font-semibold">
                      {booking.consoleName}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {formatDateTime(booking.startDateTime)} —{" "}
                      {formatDateTime(booking.endDateTime)}
                    </p>
                  </div>
                  <Badge className={`border ${STATUS_COLORS[booking.status]}`}>
                    {t(`status.${booking.status}`)}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono font-semibold">
                    {formatIDR(booking.totalPrice)}
                  </span>
                  {booking.status !== "cancelled" && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      {t("dashboard.cancel")}
                    </Button>
                  )}
                </div>
              </NeonCard>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-heading text-xl font-semibold">
          {t("dashboard.bookingHistory")}
        </h2>
        {history.length === 0 ? (
          <p className="text-text-muted">{t("dashboard.noHistory")}</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-bg-elevated text-left text-text-secondary">
                <tr>
                  <th className="px-4 py-3">{t("dashboard.console")}</th>
                  <th className="px-4 py-3">{t("dashboard.duration")}</th>
                  <th className="px-4 py-3">{t("dashboard.price")}</th>
                  <th className="px-4 py-3">{t("dashboard.date")}</th>
                  <th className="px-4 py-3">{t("dashboard.status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {history.map((booking) => (
                  <tr key={booking.id} className="bg-bg-card">
                    <td className="px-4 py-3">{booking.consoleName}</td>
                    <td className="px-4 py-3">
                      {booking.durationValue}{" "}
                      {booking.rentalType === "hourly" ? "hrs" : "days"}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {formatIDR(booking.totalPrice)}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {formatDateTime(booking.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`border ${STATUS_COLORS[booking.status]}`}>
                        {t(`status.${booking.status}`)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {recentTypes.length > 0 && (
        <section>
          <h2 className="mb-4 font-heading text-xl font-semibold">
            {t("dashboard.quickRebook")}
          </h2>
          <div className="flex flex-wrap gap-4">
            {recentTypes.map((type) => (
              <Link key={type} href={`/consoles?type=${encodeURIComponent(type)}`}>
                <NeonCard hoverable className="px-8 py-4 text-center">
                  <p className="font-heading font-semibold text-neon-primary">
                    {type}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {t("browse.bookNow")}
                  </p>
                </NeonCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <CustomerGuard>
      <DashboardContent />
    </CustomerGuard>
  );
}
