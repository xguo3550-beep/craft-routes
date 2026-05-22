import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import type { SessionUser } from "@/lib/auth/types";

const COOKIE = "cr_session";

function secret(): string {
  return process.env.AUTH_SECRET ?? "craft-routes-dev-secret-change-in-production";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeSession(user: SessionUser): string {
  const payload = Buffer.from(JSON.stringify(user)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(token: string): SessionUser | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString()) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookie = cookies().get(COOKIE)?.value;
  if (!cookie) return null;
  return decodeSession(cookie);
}

export function sessionCookieOptions(maxAge = 60 * 60 * 24 * 14) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export { COOKIE };
