import type { Console as PrismaConsole } from "@prisma/client";
import { Console, ConsoleStatus, ConsoleType } from "@/types";

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    // ignore invalid JSON
  }
  return [];
}

export function toAppConsole(record: PrismaConsole): Console {
  return {
    id: record.id,
    name: record.name,
    type: record.type as ConsoleType,
    description: record.description,
    specs: parseJsonArray(record.specs),
    includedGames: parseJsonArray(record.includedGames),
    pricePerHour: record.pricePerHour,
    pricePerDay: record.pricePerDay,
    status: record.status as ConsoleStatus,
    imageUrl: record.imageUrl,
    totalBookings: record.totalBookings,
  };
}

export function stringifyArray(value: string[]): string {
  return JSON.stringify(value);
}
