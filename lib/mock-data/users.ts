import { User } from "@/types";

export const users: User[] = [
  {
    id: "u1",
    name: "Rizky Pratama",
    email: "player@arenania.com",
    phone: "+62 812-3456-7890",
    password: "play123",
    role: "customer",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    totalBookings: 12,
    totalSpent: 1250000,
  },
  {
    id: "u2",
    name: "Dewi Sari",
    email: "gamer@arenania.com",
    phone: "+62 813-9876-5432",
    password: "game456",
    role: "customer",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    totalBookings: 8,
    totalSpent: 890000,
  },
  {
    id: "u3",
    name: "Admin Arenania",
    email: "admin@arenania.com",
    phone: "+62 821-0000-0001",
    password: "admin999",
    role: "admin",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    totalBookings: 0,
    totalSpent: 0,
  },
];
