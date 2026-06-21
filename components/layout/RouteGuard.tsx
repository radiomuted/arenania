"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface CustomerGuardProps {
  children: ReactNode;
}

export function CustomerGuard({ children }: CustomerGuardProps) {
  const { user, isLoading, isCustomer } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !isCustomer)) {
      router.replace("/login");
    }
  }, [user, isLoading, isCustomer, router]);

  if (isLoading || !user || !isCustomer) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-neon-primary/30" />
      </div>
    );
  }

  return <>{children}</>;
}

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoading, isAdmin, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.replace("/admin");
    }
  }, [user, isLoading, isAdmin, router]);

  useEffect(() => {
    if (!isLoading && isAdmin) {
      fetch("/api/admin/auth/me")
        .then((res) => {
          if (!res.ok) logout();
        })
        .catch(() => logout());
    }
  }, [isLoading, isAdmin, logout]);

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="h-8 w-8 animate-pulse rounded-full bg-neon-primary/30" />
      </div>
    );
  }

  return <>{children}</>;
}
