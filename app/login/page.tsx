"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gamepad2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import NeonCard from "@/components/ui/NeonCard";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      if (email === "admin@arenania.com") {
        logout();
        setError(t("auth.login.error"));
        return;
      }
      router.push("/");
    } else {
      setError(t("auth.login.error"));
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-12">
      <NeonCard className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Gamepad2 className="mx-auto h-10 w-10 text-neon-primary" />
          <h1 className="mt-4 font-heading text-2xl font-bold">
            {t("auth.login.title")}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {t("auth.login.subtitle")}
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

        <p className="mt-6 text-center text-sm text-text-secondary">
          {t("auth.login.noAccount")}{" "}
          <Link
            href="/register"
            className="text-neon-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
          >
            {t("auth.login.register")}
          </Link>
        </p>
      </NeonCard>
    </div>
  );
}
