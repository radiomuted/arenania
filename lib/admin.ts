import { NextResponse } from "next/server";
import { verifyAdminJwt, getAdminCookie } from "@/lib/auth";

export async function requireAdmin() {
  const token = getAdminCookie();
  if (!token) return null;
  try {
    const payload = await verifyAdminJwt(token);
    if (payload.sub !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}

export function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}
