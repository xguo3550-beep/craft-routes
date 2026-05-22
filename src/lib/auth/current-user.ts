import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { createServerClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth/session";
import { demoGetUserById } from "@/lib/auth/demo-store";
import type { SessionUser } from "@/lib/auth/types";

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieUser = await getSessionUser();
  if (!cookieUser) return null;

  const supabase = createServerClient();
  if (!isSupabaseConfigured() || !supabase || cookieUser.id.startsWith("demo-")) {
    return demoGetUserById(cookieUser.id) ?? cookieUser;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, host_display_name, host_bio")
    .eq("id", cookieUser.id)
    .single();

  if (!profile) return cookieUser;

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role,
    hostDisplayName: profile.host_display_name ?? undefined,
    hostBio: profile.host_bio ?? undefined,
  };
}

export function useSupabaseAuth(): boolean {
  return isSupabaseConfigured();
}
