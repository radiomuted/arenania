export type ConsoleType =
  | "PS4"
  | "PS5"
  | "Xbox Series S"
  | "Xbox Series X"
  | "Nintendo Switch"
  | "PC Gaming";

export type ConsoleStatus = "available" | "rented" | "maintenance";

export interface Console {
  id: string;
  name: string;
  type: ConsoleType;
  description: string;
  specs: string[];
  includedGames: string[];
  pricePerHour: number;
  pricePerDay: number;
  status: ConsoleStatus;
  imageUrl: string;
  totalBookings: number;
}

export type RentalType = "hourly" | "daily";

export type BookingStatus = "pending" | "active" | "completed" | "cancelled";

export interface Booking {
  id: string;
  consoleId: string;
  consoleName: string;
  consoleType: ConsoleType;
  userId: string;
  userName: string;
  rentalType: RentalType;
  startDateTime: string;
  endDateTime: string;
  durationValue: number;
  totalPrice: number;
  status: BookingStatus;
  bookingCode: string;
  createdAt: string;
}

export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  avatarUrl: string;
  totalBookings: number;
  totalSpent: number;
}

export interface PendingBooking {
  consoleId: string;
  consoleName: string;
  consoleType: ConsoleType;
  consoleImageUrl: string;
  rentalType: RentalType;
  startDate: string;
  startTime?: string;
  durationValue: number;
  startDateTime: string;
  endDateTime: string;
  basePrice: number;
  deposit: number;
  totalPrice: number;
}

export type PaymentMethod = "gopay" | "ovo" | "dana" | "bank" | "cash";
