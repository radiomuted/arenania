import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toAppConsole } from "@/lib/consoles";

export const dynamic = "force-dynamic";

export async function GET() {
  const records = await prisma.console.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json({
    ok: true,
    consoles: records.map(toAppConsole),
  });
}
