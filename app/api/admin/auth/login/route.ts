import { NextResponse } from "next/server";
import { setAdminCookie, signAdminJwt } from "@/lib/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email?.trim() ?? "";
  const password = body?.password ?? "";

  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedEmail || !expectedPass) {
    return NextResponse.json(
      { ok: false, error: "Server not configured" },
      { status: 500 }
    );
  }

  if (email !== expectedEmail || password !== expectedPass) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = await signAdminJwt({ sub: "admin", email });
  setAdminCookie(token);
  return NextResponse.json({ ok: true });
}
