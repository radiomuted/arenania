"use client";

import { ConsoleType } from "@/types";
import Input from "@/components/ui/Input";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { formatIDR } from "@/lib/utils";

export type SortOption = "default" | "priceLow" | "priceHigh" | "mostBooked";
export type StatusFilter = "all" | "available";

export interface FilterState {
  search: string;
  types: ConsoleType[];
  status: StatusFilter;
  rentalType: "hourly" | "daily";
  priceMax: number;
  sort: SortOption;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  maxPrice: number;
  className?: string;
}

const ALL_TYPES: ConsoleType[] = [
  "PS4",
  "PS5",
  "Xbox Series S",
  "Xbox Series X",
  "Nintendo Switch",
  "PC Gaming",
];

export default function FilterBar({
  filters,
  onChange,
  maxPrice,
  className = "",
}: FilterBarProps) {
  const { t } = useLanguage();

  const toggleType = (type: ConsoleType) => {
    const types = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types });
  };

  return (
    <aside className={`space-y-6 ${className}`}>
      <h2 className="font-heading text-lg font-semibold text-text-primary">
        {t("browse.filters")}
      </h2>

      <Input
        placeholder={t("browse.search")}
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />

      <div>
        <p className="mb-3 text-sm font-medium text-text-secondary">
          {t("browse.consoleType")}
        </p>
        <div className="space-y-2">
          {ALL_TYPES.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-2 text-sm text-text-primary"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggleType(type)}
                className="h-4 w-4 rounded border-border bg-bg-elevated text-neon-primary focus:ring-neon-primary focus:ring-offset-bg-base"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-text-secondary">
          {t("browse.status")}
        </p>
        <div className="space-y-2">
          {(["all", "available"] as StatusFilter[]).map((s) => (
            <label
              key={s}
              className="flex cursor-pointer items-center gap-2 text-sm text-text-primary"
            >
              <input
                type="radio"
                name="status"
                checked={filters.status === s}
                onChange={() => onChange({ ...filters, status: s })}
                className="h-4 w-4 border-border bg-bg-elevated text-neon-primary focus:ring-neon-primary"
              />
              {s === "all" ? t("browse.status.all") : t("browse.status.availableOnly")}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-text-secondary">
          {t("browse.rentalType")}
        </p>
        <div className="flex rounded-lg border border-border overflow-hidden">
          {(["hourly", "daily"] as const).map((rt) => (
            <button
              key={rt}
              type="button"
              onClick={() => onChange({ ...filters, rentalType: rt })}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary ${
                filters.rentalType === rt
                  ? "bg-neon-primary text-white"
                  : "bg-bg-elevated text-text-secondary hover:text-text-primary"
              }`}
            >
              {rt === "hourly" ? t("browse.hourly") : t("browse.daily")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-text-secondary">
          {t("browse.priceRange")}
        </p>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={5000}
          value={filters.priceMax}
          onChange={(e) =>
            onChange({ ...filters, priceMax: Number(e.target.value) })
          }
          className="w-full accent-neon-primary"
        />
        <p className="mt-1 font-mono text-sm text-neon-secondary">
          {formatIDR(filters.priceMax)}
        </p>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-text-secondary">
          {t("browse.sort")}
        </p>
        <select
          value={filters.sort}
          onChange={(e) =>
            onChange({ ...filters, sort: e.target.value as SortOption })
          }
          className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm text-text-primary focus:border-neon-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-primary"
        >
          <option value="default">{t("browse.sort.default")}</option>
          <option value="priceLow">{t("browse.sort.priceLow")}</option>
          <option value="priceHigh">{t("browse.sort.priceHigh")}</option>
          <option value="mostBooked">{t("browse.sort.mostBooked")}</option>
        </select>
      </div>
    </aside>
  );
}
