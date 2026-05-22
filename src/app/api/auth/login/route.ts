import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE,
  encodeSession,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { demoLogin } from "@/lib/auth/demo-store";
import type { SessionUser } from "@/lib/auth/types";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { createServerClient } from "@/lib/supabase/server";
import { createAnonServerClient } from "@/lib/supabase/anon-server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const supabaseAdmin = createServerClient();

    if (isSupabaseConfigured() && supabaseAdmin) {
      const anon = createAnonServerClient();
      if (anon) {
        const { data, error } = await anon.auth.signInWithPassword({ email, password });
        if (error) {
          // Allow local demo accounts when Supabase rejects credentials
          const demo = demoLogin(email, password);
          if (demo.user) {
            const res = NextResponse.json({ user: demo.user });
            res.cookies.set(COOKIE, encodeSession(demo.user), sessionCookieOptions());
            return res;
          }
          const message =
            error.message === "Invalid login credentials"
              ? "Invalid email or password"
              : error.message;
          return NextResponse.json({ error: message }, { status: 401 });
        }
        if (!data.user) {
          return NextResponse.json({ error: "Login failed" }, { status: 401 });
        }

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id, email, full_name, role, host_display_name, host_bio")
          .eq("id", data.user.id)
          .single();

        const sessionUser: SessionUser = profile
          ? {
              id: profile.id,
              email: profile.email,
              fullName: profile.full_name,
              role: profile.role,
              hostDisplayName: profile.host_display_name ?? undefined,
              hostBio: profile.host_bio ?? undefined,
            }
          : {
              id: data.user.id,
              email,
              fullName: email.split("@")[0],
              role: "customer",
            };

        const res = NextResponse.json({ user: sessionUser });
        res.cookies.set(COOKIE, encodeSession(sessionUser), sessionCookieOptions());
        return res;
      }
    }

    const result = demoLogin(email, password);
    if (result.error || !result.user) {
      return NextResponse.json({ error: result.error ?? "Login failed" }, { status: 401 });
    }

    const res = NextResponse.json({ user: result.user });
    res.cookies.set(COOKIE, encodeSession(result.user), sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
