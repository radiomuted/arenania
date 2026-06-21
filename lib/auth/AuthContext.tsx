"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { users } from "@/lib/mock-data/users";
import { User } from "@/types";

interface AuthContextValue {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function stripPassword(user: User): Omit<User, "password"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;
  return rest;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("arenania_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("arenania_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const safeUser = stripPassword(found);
      setUser(safeUser);
      localStorage.setItem("arenania_user", JSON.stringify(safeUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    if (user?.role === "admin") {
      fetch("/api/admin/auth/logout", { method: "POST" }).catch(() => {});
    }
    setUser(null);
    localStorage.removeItem("arenania_user");
  }, [user?.role]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isCustomer: user?.role === "customer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
