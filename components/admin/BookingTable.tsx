"use client";

import { Booking, BookingStatus, ConsoleType } from "@/types";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { STATUS_COLORS, formatDateTime, formatIDR } from "@/lib/utils";

interface BookingTableProps {
  bookings: Booking[];
  onUpdate: (bookings: Booking[]) => void;
  className?: string;
  statusFilter?: BookingStatus | "all";
  typeFilter?: ConsoleType | "all";
  dateFrom?: string;
  dateTo?: string;
}

export default function BookingTable({
  bookings,
  onUpdate,
  className = "",
  statusFilter = "all",
  typeFilter = "all",
  dateFrom = "",
  dateTo = "",
}: BookingTableProps) {
  const { t } = useLanguage();

  const filtered = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (typeFilter !== "all" && b.consoleType !== typeFilter) return false;
    if (dateFrom && new Date(b.startDateTime) < new Date(dateFrom)) return false;
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59);
      if (new Date(b.startDateTime) > end) return false;
    }
    return true;
  });

  const updateStatus = (id: string, status: BookingStatus) => {
    onUpdate(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  return (
    <div className={`overflow-x-auto rounded-xl border border-border ${className}`}>
      <table className="w-full text-sm">
        <thead className="bg-bg-elevated text-left text-text-secondary">
          <tr>
            <th className="px-4 py-3">{t("dashboard.code")}</th>
            <th className="px-4 py-3">{t("admin.customer")}</th>
            <th className="px-4 py-3">{t("dashboard.console")}</th>
            <th className="px-4 py-3">{t("booking.duration")}</th>
            <th className="px-4 py-3">{t("booking.start")}</th>
            <th className="px-4 py-3">{t("dashboard.price")}</th>
            <th className="px-4 py-3">{t("dashboard.status")}</th>
            <th className="px-4 py-3">{t("admin.actions")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filtered.map((booking) => (
            <tr key={booking.id} className="bg-bg-card hover:bg-bg-elevated/50">
              <td className="px-4 py-3 font-mono text-neon-secondary">
                {booking.bookingCode}
              </td>
              <td className="px-4 py-3 text-text-primary">{booking.userName}</td>
              <td className="px-4 py-3">
                <p className="text-text-primary">{booking.consoleName}</p>
                <p className="text-xs text-text-muted">{booking.consoleType}</p>
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {booking.durationValue}{" "}
                {booking.rentalType === "hourly" ? "hrs" : "days"}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                {formatDateTime(booking.startDateTime)}
              </td>
              <td className="px-4 py-3 font-mono text-text-primary">
                {formatIDR(booking.totalPrice)}
              </td>
              <td className="px-4 py-3">
                <Badge className={`border ${STATUS_COLORS[booking.status]}`}>
                  {t(`status.${booking.status}`)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <select
                  value={booking.status}
                  onChange={(e) =>
                    updateStatus(booking.id, e.target.value as BookingStatus)
                  }
                  className="rounded-lg border border-border bg-bg-elevated px-2 py-1 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
                >
                  <option value="pending">{t("status.pending")}</option>
                  <option value="active">{t("status.active")}</option>
                  <option value="completed">{t("status.completed")}</option>
                  <option value="cancelled">{t("status.cancelled")}</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && (
        <p className="p-8 text-center text-text-muted">No bookings found.</p>
      )}
    </div>
  );
}
