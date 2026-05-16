import { createServerClient } from "@/lib/supabase/server";
import {
  getMockWorkshopBySlug,
  getMockWorkshops,
  getMockSession,
} from "@/lib/data/mock-workshops";
import type { Workshop, WorkshopWithSessions, WorkshopSession } from "@/types";

export async function getWorkshops(region?: string): Promise<Workshop[]> {
  const supabase = createServerClient();

  if (!supabase) {
    return getMockWorkshops(region);
  }

  let query = supabase.from("workshops").select("*").order("featured", { ascending: false });

  if (region && region !== "all") {
    query = query.eq("region", region);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return getMockWorkshops(region);
  }

  return data as Workshop[];
}

export async function getFeaturedWorkshops(): Promise<Workshop[]> {
  const workshops = await getWorkshops();
  return workshops.filter((w) => w.featured).slice(0, 3);
}

export async function getWorkshopBySlug(
  slug: string
): Promise<WorkshopWithSessions | null> {
  const supabase = createServerClient();

  if (!supabase) {
    return getMockWorkshopBySlug(slug);
  }

  const { data: workshop, error } = await supabase
    .from("workshops")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !workshop) {
    return getMockWorkshopBySlug(slug);
  }

  const { data: sessions } = await supabase
    .from("workshop_sessions")
    .select("*")
    .eq("workshop_id", workshop.id)
    .gte("starts_at", new Date().toISOString())
    .gt("spots_available", 0)
    .order("starts_at", { ascending: true });

  return {
    ...(workshop as Workshop),
    sessions: (sessions ?? []) as WorkshopSession[],
  };
}

export async function getSessionWithWorkshop(sessionId: string) {
  const supabase = createServerClient();

  if (!supabase) {
    return getMockSession(sessionId);
  }

  const { data: session, error } = await supabase
    .from("workshop_sessions")
    .select("*, workshops(*)")
    .eq("id", sessionId)
    .single();

  if (error || !session) {
    return getMockSession(sessionId);
  }

  const workshop = session.workshops as Workshop;
  const { workshops: _, ...sessionData } = session;

  return {
    ...(sessionData as WorkshopSession),
    workshop,
  };
}
