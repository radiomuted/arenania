"use client";

import { useMemo } from "react";
import { bookings } from "@/lib/mock-data/bookings";
import { useConsoles } from "@/hooks/useConsoles";
import { AdminGuard } from "@/components/layout/RouteGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Badge from "@/components/ui/Badge";
import NeonCard from "@/components/ui/NeonCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { STATUS_COLORS, formatIDR } from "@/lib/utils";
function AdminDashboardContent() {
  const { t } = useLanguage();
  const { consoles } = useConsoles();

  const stats = useMemo(() => {
    const available = consoles.filter((c) => c.status === "available").length;
    const rented = consoles.filter((c) => c.status === "rented").length;
    const maintenance = consoles.filter((c) => c.status === "maintenance").length;
    const today = new Date().toISOString().split("T")[0];
    const todaysBookings = bookings.filter((b) =>
      b.startDateTime.startsWith(today)
    ).length;
    const revenue = bookings
      .filter((b) => b.status === "completed" || b.status === "active")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    const byType: Record<string, number> = {};
    bookings.forEach((b) => {
      byType[b.consoleType] = (byType[b.consoleType] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(byType), 1);

    return {
      available,
      rented,
      maintenance,
      todaysBookings,
      revenue,
      byType,
      maxCount,
    };
  }, [consoles]);

  const recent = bookings.slice(0, 5);

  return (
    <div className="min-h-screen bg-bg-base lg:pl-64">
      <AdminSidebar />
      <main className="p-6 pt-16 lg:pt-6 lg:p-10">
        <h1 className="mb-8 font-heading text-3xl font-bold">
          {t("admin.overview")}
        </h1>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { label: t("admin.totalConsoles"), value: consoles.length, color: "text-neon-primary" },
            { label: t("admin.availableNow"), value: stats.available, color: "text-neon-green" },
            { label: t("admin.rented"), value: stats.rented, color: "text-neon-red" },
            { label: t("admin.maintenance"), value: stats.maintenance, color: "text-neon-yellow" },
            { label: t("admin.todaysBookings"), value: stats.todaysBookings, color: "text-neon-secondary" },
            { label: t("admin.totalRevenue"), value: formatIDR(stats.revenue), color: "text-neon-primary" },
          ].map((card) => (
            <NeonCard key={card.label}>
              <p className="text-xs text-text-muted">{card.label}</p>
              <p className={`mt-1 font-mono text-2xl font-bold ${card.color}`}>
                {card.value}
              </p>
            </NeonCard>
          ))}
        </div>

        <div className="mb-10 grid gap-8 lg:grid-cols-2">
          <NeonCard>
            <h2 className="mb-6 font-heading text-lg font-semibold">
              {t("admin.bookingsByType")}
            </h2>
            <div className="space-y-4">
              {Object.entries(stats.byType).map(([type, count]) => (
                <div key={type}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-text-secondary">{type}</span>
                    <span className="font-mono text-text-primary">{count}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-bg-elevated">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-neon-primary to-neon-secondary transition-all"
                      style={{ width: `${(count / stats.maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </NeonCard>

          <NeonCard>
            <h2 className="mb-6 font-heading text-lg font-semibold">
              {t("admin.recentBookings")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-text-muted">
                  <tr>
                    <th className="pb-3">{t("admin.customer")}</th>
                    <th className="pb-3">{t("dashboard.console")}</th>
                    <th className="pb-3">{t("dashboard.status")}</th>
                    <th className="pb-3">{t("dashboard.price")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recent.map((b) => (
                    <tr key={b.id}>
                      <td className="py-2.5">{b.userName}</td>
                      <td className="py-2.5 text-text-secondary">{b.consoleName}</td>
                      <td className="py-2.5">
                        <Badge className={`border ${STATUS_COLORS[b.status]}`}>
                          {t(`status.${b.status}`)}
                        </Badge>
                      </td>
                      <td className="py-2.5 font-mono">{formatIDR(b.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </NeonCard>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}
