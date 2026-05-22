import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE,
  encodeSession,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { demoRegister } from "@/lib/auth/demo-store";
import type { SignupPayload, UserRole } from "@/lib/auth/types";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignupPayload;
    const { email, password, fullName, role, hostDisplayName, hostBio } = body;

    if (!email || !password || !fullName || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!["customer", "host"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const supabase = createServerClient();

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          role,
          host_display_name: hostDisplayName ?? fullName,
          host_bio: hostBio ?? "",
        },
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      if (!data.user) {
        return NextResponse.json({ error: "Signup failed" }, { status: 500 });
      }

      const sessionUser = {
        id: data.user.id,
        email,
        fullName,
        role: role as UserRole,
        hostDisplayName: hostDisplayName ?? fullName,
        hostBio,
      };

      const res = NextResponse.json({ user: sessionUser });
      res.cookies.set(COOKIE, encodeSession(sessionUser), sessionCookieOptions());
      return res;
    }

    const result = demoRegister(
      email,
      password,
      fullName,
      role as UserRole,
      hostDisplayName ?? fullName,
      hostBio
    );

    if (result.error || !result.user) {
      return NextResponse.json({ error: result.error ?? "Signup failed" }, { status: 400 });
    }

    const res = NextResponse.json({ user: result.user });
    res.cookies.set(COOKIE, encodeSession(result.user), sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
