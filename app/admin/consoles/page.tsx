"use client";

import { useConsoles } from "@/hooks/useConsoles";
import { AdminGuard } from "@/components/layout/RouteGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ConsoleTable from "@/components/admin/ConsoleTable";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function AdminConsolesContent() {
  const { t } = useLanguage();
  const { consoles, addConsole, editConsole, removeConsole, changeStatus } =
    useConsoles();

  return (
    <div className="min-h-screen bg-bg-base lg:pl-64">
      <AdminSidebar />
      <main className="p-6 pt-16 lg:pt-6 lg:p-10">
        <h1 className="mb-8 font-heading text-3xl font-bold">
          {t("admin.consoles")}
        </h1>
        <ConsoleTable
          consoles={consoles}
          onAdd={addConsole}
          onEdit={editConsole}
          onDelete={removeConsole}
          onStatusChange={changeStatus}
        />
      </main>
    </div>
  );
}

export default function AdminConsolesPage() {
  return (
    <AdminGuard>
      <AdminConsolesContent />
    </AdminGuard>
  );
}
