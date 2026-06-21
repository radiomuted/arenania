"use client";

import { CustomerGuard } from "@/components/layout/RouteGuard";
import Avatar from "@/components/ui/Avatar";
import Input from "@/components/ui/Input";
import NeonCard from "@/components/ui/NeonCard";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function ProfileContent() {
  const { t } = useLanguage();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 font-heading text-3xl font-bold">
        {t("profile.title")}
      </h1>

      <NeonCard className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
          <div>
            <p className="font-heading text-xl font-semibold">{user.name}</p>
            <p className="text-sm text-text-muted">{t("profile.memberSince")}</p>
          </div>
        </div>

        <Input label={t("profile.name")} value={user.name} readOnly />
        <Input label={t("profile.email")} value={user.email} readOnly />
        <Input label={t("profile.phone")} value={user.phone} readOnly />

        <p className="text-sm text-text-muted">{t("profile.editNote")}</p>
      </NeonCard>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <CustomerGuard>
      <ProfileContent />
    </CustomerGuard>
  );
}
