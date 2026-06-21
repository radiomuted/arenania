"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import NeonCard from "@/components/ui/NeonCard";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const { login, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && isAdmin) {
      router.replace("/admin/dashboard");
    }
  }, [isLoading, isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email !== "admin@arenania.com" || password !== "admin999") {
      setError(t("auth.login.error"));
      return;
    }

    const sessionRes = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!sessionRes.ok) {
      setError(t("auth.login.error"));
      return;
    }

    const success = login(email, password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError(t("auth.login.error"));
    }
  };

  if (isLoading || isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="h-8 w-8 animate-pulse rounded-full bg-neon-primary/30" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-6 py-12">
      <NeonCard className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Gamepad2 className="mx-auto h-10 w-10 text-neon-primary" />
          <h1 className="mt-4 font-heading text-2xl font-bold">
            {t("auth.admin.login.title")}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {t("auth.admin.login.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t("auth.login.email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label={t("auth.login.password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-neon-red">{error}</p>}
          <Button type="submit" className="w-full" size="lg">
            {t("auth.login.submit")}
          </Button>
        </form>
      </NeonCard>
    </div>
  );
}
