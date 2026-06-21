"use client";

import { useCallback, useEffect, useState } from "react";
import { Console, ConsoleStatus } from "@/types";

async function fetchConsoles(): Promise<Console[]> {
  const res = await fetch("/api/consoles");
  const data = (await res.json().catch(() => null)) as
    | { ok?: boolean; consoles?: Console[]; error?: string }
    | null;
  if (!res.ok || !data?.ok || !data.consoles) {
    throw new Error(data?.error || "Failed to load consoles");
  }
  return data.consoles;
}

export function useConsoles() {
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchConsoles();
      setConsoles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load consoles");
    }
  }, []);

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const addConsole = useCallback(
    async (console: Console) => {
      const res = await fetch("/api/consoles/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(console),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; console?: Console; error?: string }
        | null;
      if (!res.ok || !data?.ok || !data.console) {
        throw new Error(data?.error || "Failed to create console");
      }
      setConsoles((prev) => [...prev, data.console!]);
    },
    []
  );

  const editConsole = useCallback(async (console: Console) => {
    const res = await fetch("/api/consoles/manage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(console),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; console?: Console; error?: string }
      | null;
    if (!res.ok || !data?.ok || !data.console) {
      throw new Error(data?.error || "Failed to update console");
    }
    setConsoles((prev) =>
      prev.map((c) => (c.id === data.console!.id ? data.console! : c))
    );
  }, []);

  const removeConsole = useCallback(async (id: string) => {
    const res = await fetch("/api/consoles/manage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;
    if (!res.ok || !data?.ok) {
      throw new Error(data?.error || "Failed to delete console");
    }
    setConsoles((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const changeStatus = useCallback(async (id: string, status: ConsoleStatus) => {
    const res = await fetch("/api/consoles/manage", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; console?: Console; error?: string }
      | null;
    if (!res.ok || !data?.ok || !data.console) {
      throw new Error(data?.error || "Failed to update status");
    }
    setConsoles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: data.console!.status } : c))
    );
  }, []);

  return {
    consoles,
    isLoading,
    error,
    refresh,
    addConsole,
    editConsole,
    removeConsole,
    changeStatus,
  };
}
