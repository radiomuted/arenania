"use client";

import { useState } from "react";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import NeonCard from "@/components/ui/NeonCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError(t("auth.register.passwordMismatch"));
      return;
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-12">
        <NeonCard className="w-full max-w-md text-center">
          <Gamepad2 className="mx-auto h-10 w-10 text-neon-green" />
          <p className="mt-4 font-heading text-xl font-semibold text-neon-green">
            {t("auth.register.success")}
          </p>
          <Link href="/login" className="mt-6 inline-block">
            <Button>{t("auth.login.submit")}</Button>
          </Link>
        </NeonCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-12">
      <NeonCard className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Gamepad2 className="mx-auto h-10 w-10 text-neon-primary" />
          <h1 className="mt-4 font-heading text-2xl font-bold">
            {t("auth.register.title")}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {t("auth.register.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t("auth.register.name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label={t("auth.login.email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label={t("auth.register.phone")}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            label={t("auth.login.password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label={t("auth.register.confirmPassword")}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-neon-red">{error}</p>}
          <Button type="submit" className="w-full" size="lg">
            {t("auth.register.submit")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          {t("auth.register.hasAccount")}{" "}
          <Link
            href="/login"
            className="text-neon-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary rounded"
          >
            {t("auth.login.submit")}
          </Link>
        </p>
      </NeonCard>
    </div>
  );
}
