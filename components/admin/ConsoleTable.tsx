"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Pencil, Trash2 } from "lucide-react";
import { Console, ConsoleStatus, ConsoleType } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import NeonCard from "@/components/ui/NeonCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  CONSOLE_TYPE_COLORS,
  STATUS_COLORS,
  formatIDR,
  generateId,
  isLocalImage,
} from "@/lib/utils";

interface ConsoleTableProps {
  consoles: Console[];
  onAdd: (console: Console) => Promise<void>;
  onEdit: (console: Console) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onStatusChange: (id: string, status: ConsoleStatus) => Promise<void>;
  className?: string;
}

const CONSOLE_TYPES: ConsoleType[] = [
  "PS4",
  "PS5",
  "Xbox Series S",
  "Xbox Series X",
  "Nintendo Switch",
  "PC Gaming",
];

interface ConsoleFormData {
  name: string;
  type: ConsoleType;
  description: string;
  specs: string;
  includedGames: string;
  pricePerHour: string;
  pricePerDay: string;
  imageUrl: string;
}

const emptyForm: ConsoleFormData = {
  name: "",
  type: "PS5",
  description: "",
  specs: "",
  includedGames: "",
  pricePerHour: "",
  pricePerDay: "",
  imageUrl: "",
};

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = (await res.json().catch(() => null)) as
    | { ok?: boolean; path?: string; error?: string }
    | null;
  if (!res.ok) {
    throw new Error(data?.error || `Upload failed (${res.status})`);
  }
  if (!data?.ok || !data.path) {
    throw new Error(data?.error || "Upload failed (invalid response)");
  }
  return data.path;
}

function ImageUploadZone({
  imageUrl,
  onImageChange,
  onError,
  error,
}: {
  imageUrl: string;
  onImageChange: (url: string) => void;
  onError: (msg: string) => void;
  error?: string;
}) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      onError(t("admin.uploadError"));
      return;
    }
    onError("");
    setUploading(true);
    try {
      const path = await uploadFile(file);
      onImageChange(path);
    } catch {
      onError(t("admin.uploadError"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-text-secondary">
        {t("admin.imageUpload")}
      </p>
      <div
        role="button"
        tabIndex={0}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary ${
          dragOver
            ? "border-neon-primary bg-neon-primary/10 shadow-glow-purple"
            : "border-border hover:border-neon-primary/50"
        } ${uploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Preview"
              className="h-full max-h-[200px] w-full rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onImageChange("");
              }}
              className="absolute right-2 top-2 rounded-full bg-bg-base/80 p-1 text-text-primary hover:bg-neon-red/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <Upload className="mb-2 h-8 w-8 text-text-muted" />
            <p className="text-sm text-text-secondary">
              {uploading ? "Uploading..." : t("admin.uploadHint")}
            </p>
            <p className="mt-1 text-xs text-text-muted">{t("admin.uploadFormats")}</p>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-neon-red">{error}</p>}
    </div>
  );
}

export default function ConsoleTable({
  consoles,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange,
  className = "",
}: ConsoleTableProps) {
  const { t } = useLanguage();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<ConsoleFormData>(emptyForm);
  const [uploadError, setUploadError] = useState("");
  const [saving, setSaving] = useState(false);

  const openEdit = (item: Console) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      type: item.type,
      description: item.description,
      specs: item.specs.join(", "),
      includedGames: item.includedGames.join(", "),
      pricePerHour: String(item.pricePerHour),
      pricePerDay: String(item.pricePerDay),
      imageUrl: item.imageUrl,
    });
    setShowAdd(false);
  };

  const closeForm = () => {
    setEditingId(null);
    setShowAdd(false);
    setForm(emptyForm);
    setUploadError("");
  };

  const saveForm = async () => {
    const payload: Console = {
      id: editingId ?? generateId(),
      name: form.name,
      type: form.type,
      description: form.description,
      specs: form.specs.split(",").map((s) => s.trim()).filter(Boolean),
      includedGames: form.includedGames.split(",").map((s) => s.trim()).filter(Boolean),
      pricePerHour: Number(form.pricePerHour),
      pricePerDay: Number(form.pricePerDay),
      imageUrl:
        form.imageUrl ||
        "https://placehold.co/600x400/1A1A2E/7C3AED?text=Console",
      status: editingId
        ? (consoles.find((c) => c.id === editingId)?.status ?? "available")
        : "available",
      totalBookings: editingId
        ? (consoles.find((c) => c.id === editingId)?.totalBookings ?? 0)
        : 0,
    };

    setSaving(true);
    try {
      if (editingId) {
        await onEdit(payload);
      } else {
        await onAdd(payload);
      }
      closeForm();
    } catch {
      setUploadError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const deleteConsole = async (id: string) => {
    if (window.confirm(t("admin.deleteConfirm"))) {
      try {
        await onDelete(id);
      } catch {
        window.alert("Failed to delete");
      }
    }
  };

  const updateStatus = async (id: string, status: ConsoleStatus) => {
    try {
      await onStatusChange(id, status);
    } catch {
      window.alert("Failed to update status");
    }
  };

  const formModal = (showAdd || editingId) && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <NeonCard className="max-h-[90vh] w-full max-w-lg overflow-y-auto space-y-4">
        <h3 className="font-heading text-lg font-semibold">
          {editingId ? t("admin.editConsole") : t("admin.addConsole")}
        </h3>
        <Input
          label={t("admin.name")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary">
            {t("admin.type")}
          </label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as ConsoleType })
            }
            className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-text-primary focus:border-neon-primary focus:outline-none"
          >
            {CONSOLE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary">
            {t("admin.description")}
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-text-primary focus:border-neon-primary focus:outline-none"
          />
        </div>
        <Input
          label={t("admin.specs")}
          value={form.specs}
          onChange={(e) => setForm({ ...form, specs: e.target.value })}
        />
        <Input
          label={t("admin.includedGames")}
          value={form.includedGames}
          onChange={(e) => setForm({ ...form, includedGames: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t("admin.pricePerHour")}
            type="number"
            value={form.pricePerHour}
            onChange={(e) => setForm({ ...form, pricePerHour: e.target.value })}
          />
          <Input
            label={t("admin.pricePerDay")}
            type="number"
            value={form.pricePerDay}
            onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
          />
        </div>
        <ImageUploadZone
          imageUrl={form.imageUrl}
          onImageChange={(url) => setForm({ ...form, imageUrl: url })}
          onError={setUploadError}
          error={uploadError}
        />
        <div className="flex gap-3 pt-2">
          <Button onClick={saveForm} disabled={!form.name || saving}>
            {saving ? "..." : t("admin.save")}
          </Button>
          <Button variant="ghost" onClick={closeForm} disabled={saving}>
            {t("admin.cancel")}
          </Button>
        </div>
      </NeonCard>
    </div>
  );

  return (
    <div className={className}>
      <div className="mb-6 flex justify-end">
        <Button onClick={() => { setShowAdd(true); setEditingId(null); setForm(emptyForm); }}>
          {t("admin.addConsole")}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated text-left text-text-secondary">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">{t("admin.name")}</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">{t("dashboard.status")}</th>
              <th className="px-4 py-3">{t("admin.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {consoles.map((item) => {
              const isLocal = isLocalImage(item.imageUrl);
              return (
                <tr key={item.id} className="bg-bg-card hover:bg-bg-elevated/50">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded bg-bg-elevated">
                      {isLocal ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{item.name}</p>
                    <Badge className={`mt-1 border ${CONSOLE_TYPE_COLORS[item.type]}`}>
                      {item.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-text-secondary">
                    <p>{formatIDR(item.pricePerHour)}/hr</p>
                    <p>{formatIDR(item.pricePerDay)}/day</p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(item.id, e.target.value as ConsoleStatus)
                      }
                      className={`rounded-full border px-2 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary ${STATUS_COLORS[item.status]}`}
                    >
                      <option value="available">{t("status.available")}</option>
                      <option value="rented">{t("status.rented")}</option>
                      <option value="maintenance">{t("status.maintenance")}</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteConsole(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {formModal}
    </div>
  );
}
