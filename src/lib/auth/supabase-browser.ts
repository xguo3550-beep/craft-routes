import { createBrowserClient } from "@/lib/supabase/client";

export function getSupabaseBrowser() {
  return createBrowserClient();
}
