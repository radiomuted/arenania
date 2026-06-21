import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { toAppConsole, stringifyArray } from "@/lib/consoles";
import { ConsoleStatus, ConsoleType } from "@/types";
import { generateId } from "@/lib/utils";

type ConsoleBody = {
  id?: string;
  name?: string;
  type?: ConsoleType;
  description?: string;
  specs?: string[];
  includedGames?: string[];
  pricePerHour?: number;
  pricePerDay?: number;
  status?: ConsoleStatus;
  imageUrl?: string;
  totalBookings?: number;
};

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();

  const body = (await req.json().catch(() => null)) as ConsoleBody | null;
  if (!body?.name || !body.type) {
    return NextResponse.json(
      { ok: false, error: "name and type are required" },
      { status: 400 }
    );
  }

  const record = await prisma.console.create({
    data: {
      id: body.id ?? generateId(),
      name: body.name,
      type: body.type,
      description: body.description ?? "",
      specs: stringifyArray(body.specs ?? []),
      includedGames: stringifyArray(body.includedGames ?? []),
      pricePerHour: body.pricePerHour ?? 0,
      pricePerDay: body.pricePerDay ?? 0,
      status: body.status ?? "available",
      imageUrl:
        body.imageUrl ??
        "https://placehold.co/600x400/1A1A2E/7C3AED?text=Console",
      totalBookings: body.totalBookings ?? 0,
    },
  });

  return NextResponse.json({ ok: true, console: toAppConsole(record) });
}

export async function PUT(req: Request) {
  if (!(await requireAdmin())) return unauthorized();

  const body = (await req.json().catch(() => null)) as ConsoleBody | null;
  if (!body?.id) {
    return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });
  }

  const record = await prisma.console.update({
    where: { id: body.id },
    data: {
      name: body.name,
      type: body.type,
      description: body.description,
      specs: body.specs !== undefined ? stringifyArray(body.specs) : undefined,
      includedGames:
        body.includedGames !== undefined
          ? stringifyArray(body.includedGames)
          : undefined,
      pricePerHour: body.pricePerHour,
      pricePerDay: body.pricePerDay,
      status: body.status,
      imageUrl: body.imageUrl,
      totalBookings: body.totalBookings,
    },
  });

  return NextResponse.json({ ok: true, console: toAppConsole(record) });
}

export async function PATCH(req: Request) {
  if (!(await requireAdmin())) return unauthorized();

  const body = (await req.json().catch(() => null)) as ConsoleBody | null;
  if (!body?.id) {
    return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });
  }

  const record = await prisma.console.update({
    where: { id: body.id },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json({ ok: true, console: toAppConsole(record) });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin())) return unauthorized();

  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) {
    return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });
  }

  await prisma.console.delete({ where: { id: body.id } });
  return NextResponse.json({ ok: true });
}
