"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useConsoles } from "@/hooks/useConsoles";
import { ConsoleType } from "@/types";
import FilterBar, { FilterState } from "@/components/consoles/FilterBar";
import ConsoleGrid from "@/components/consoles/ConsoleGrid";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const MAX_PRICE = 250000;

export default function ConsolesPage() {
  const { t } = useLanguage();
  const { consoles: mockConsoles, isLoading } = useConsoles();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    types: [],
    status: "all",
    rentalType: "hourly",
    priceMax: MAX_PRICE,
    sort: "default",
  });

  useEffect(() => {
    if (typeParam) {
      setFilters((prev) => ({
        ...prev,
        types: [typeParam as ConsoleType],
      }));
    }
  }, [typeParam]);

  const filtered = useMemo(() => {
    let result = [...mockConsoles];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.includedGames.some((g) => g.toLowerCase().includes(q))
      );
    }

    if (filters.types.length > 0) {
      result = result.filter((c) => filters.types.includes(c.type));
    }

    if (filters.status === "available") {
      result = result.filter((c) => c.status === "available");
    }

    const priceKey =
      filters.rentalType === "hourly" ? "pricePerHour" : "pricePerDay";
    result = result.filter((c) => c[priceKey] <= filters.priceMax);

    switch (filters.sort) {
      case "priceLow":
        result.sort((a, b) => a[priceKey] - b[priceKey]);
        break;
      case "priceHigh":
        result.sort((a, b) => b[priceKey] - a[priceKey]);
        break;
      case "mostBooked":
        result.sort((a, b) => b.totalBookings - a.totalBookings);
        break;
    }

    return result;
  }, [filters, mockConsoles]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-neon-primary/30" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">{t("browse.title")}</h1>
        <p className="mt-1 text-text-secondary">{t("browse.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          maxPrice={MAX_PRICE}
          className="w-full lg:w-64 lg:flex-shrink-0"
        />

        <div className="flex-1">
          <p className="mb-4 text-sm text-text-secondary">
            {t("browse.results", { count: filtered.length })}
          </p>
          {filtered.length > 0 ? (
            <ConsoleGrid consoles={filtered} rentalType={filters.rentalType} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-bg-card py-20">
              <p className="text-text-muted">{t("browse.noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
