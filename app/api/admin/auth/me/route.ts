import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  return NextResponse.json({ ok: true, email: admin.email });
}
