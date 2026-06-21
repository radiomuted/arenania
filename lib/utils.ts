export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateBookingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ARN-${code}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
    new Date(iso)
  );
}

export const CONSOLE_TYPE_COLORS: Record<string, string> = {
  PS4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  PS5: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Xbox Series S": "bg-green-500/20 text-green-400 border-green-500/30",
  "Xbox Series X": "bg-green-500/20 text-green-300 border-green-500/30",
  "Nintendo Switch": "bg-red-500/20 text-red-400 border-red-500/30",
  "PC Gaming": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export const STATUS_COLORS: Record<string, string> = {
  available: "bg-neon-green/20 text-neon-green border-neon-green/30",
  rented: "bg-neon-red/20 text-neon-red border-neon-red/30",
  maintenance: "bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30",
  pending: "bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30",
  active: "bg-neon-secondary/20 text-neon-secondary border-neon-secondary/30",
  completed: "bg-neon-green/20 text-neon-green border-neon-green/30",
  cancelled: "bg-neon-red/20 text-neon-red border-neon-red/30",
};

export const PENDING_BOOKING_KEY = "arenania_pending_booking";
export const CUSTOMER_BOOKINGS_KEY = "arenania_customer_bookings";

/** blob: or data: URLs — must use <img>, not next/image */
export function isLocalImage(url: string): boolean {
  return url.startsWith("blob:") || url.startsWith("data:");
}
