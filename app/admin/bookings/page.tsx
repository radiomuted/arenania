"use client";

import { useState } from "react";
import { bookings as initialBookings } from "@/lib/mock-data/bookings";
import { Booking, BookingStatus, ConsoleType } from "@/types";
import { AdminGuard } from "@/components/layout/RouteGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import BookingTable from "@/components/admin/BookingTable";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CONSOLE_TYPES: ConsoleType[] = [
  "PS4",
  "PS5",
  "Xbox Series S",
  "Xbox Series X",
  "Nintendo Switch",
  "PC Gaming",
];

function AdminBookingsContent() {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<ConsoleType | "all">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  return (
    <div className="min-h-screen bg-bg-base lg:pl-64">
      <AdminSidebar />
      <main className="p-6 pt-16 lg:pt-6 lg:p-10">
        <h1 className="mb-8 font-heading text-3xl font-bold">
          {t("admin.bookings")}
        </h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label className="mb-1 block text-xs text-text-muted">
              {t("admin.filterStatus")}
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as BookingStatus | "all")
              }
              className="rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
            >
              <option value="all">{t("admin.all")}</option>
              <option value="pending">{t("status.pending")}</option>
              <option value="active">{t("status.active")}</option>
              <option value="completed">{t("status.completed")}</option>
              <option value="cancelled">{t("status.cancelled")}</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-muted">
              {t("admin.filterType")}
            </label>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as ConsoleType | "all")
              }
              className="rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
            >
              <option value="all">{t("admin.all")}</option>
              {CONSOLE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-muted">
              {t("admin.filterDateFrom")}
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-muted">
              {t("admin.filterDateTo")}
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
            />
          </div>
        </div>

        <BookingTable
          bookings={bookings}
          onUpdate={setBookings}
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      </main>
    </div>
  );
}

export default function AdminBookingsPage() {
  return (
    <AdminGuard>
      <AdminBookingsContent />
    </AdminGuard>
  );
}
