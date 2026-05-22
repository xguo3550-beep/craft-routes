import { createServerClient } from "@/lib/supabase/server";
import { demoAllHostWorkshopsForPublic, demoSessionsForWorkshop } from "@/lib/auth/demo-store";
import { getWorkshopCity, isCitySlug } from "@/lib/cities";
import {
  getMockWorkshopBySlug,
  getMockWorkshops,
  getMockSession,
} from "@/lib/data/mock-workshops";
import type { Workshop, WorkshopWithSessions, WorkshopSession } from "@/types";
import { normalizeWorkshopImageUrl } from "@/lib/workshop-cover-images";

function withCoverImage(workshop: Workshop): Workshop {
  return {
    ...workshop,
    image_url: normalizeWorkshopImageUrl(workshop),
  };
}

function filterByCity(workshops: Workshop[], city: string): Workshop[] {
  if (!isCitySlug(city)) return workshops;
  return workshops.filter(
    (w) => getWorkshopCity(w.slug, w.region) === city
  );
}

function mergeWorkshopLists(primary: Workshop[], extra: Workshop[]): Workshop[] {
  const seen = new Set(primary.map((w) => w.slug));
  const merged = [...primary];
  for (const w of extra) {
    if (!seen.has(w.slug)) {
      merged.push(w);
      seen.add(w.slug);
    }
  }
  return merged;
}

export async function getWorkshops(
  region?: string,
  city?: string
): Promise<Workshop[]> {
  const supabase = createServerClient();

  if (!supabase) {
    return getMockWorkshops(region, city);
  }

  let query = supabase.from("workshops").select("*").order("featured", { ascending: false });

  if (region && region !== "all") {
    query = query.eq("region", region);
  }

  const { data, error } = await query;

  if (error) {
    return getMockWorkshops(region, city);
  }

  const fromDb = (data ?? []).map((w) => withCoverImage(w as Workshop));
  const base = fromDb.length > 0 ? fromDb : getMockWorkshops();
  let workshops = mergeWorkshopLists(
    base,
    demoAllHostWorkshopsForPublic().map(withCoverImage)
  );
  if (city) {
    workshops = filterByCity(workshops, city);
  } else if (region && region !== "all") {
    workshops = workshops.filter((w) => w.region === region);
  }

  return workshops;
}

export async function getFeaturedWorkshops(): Promise<Workshop[]> {
  const workshops = await getWorkshops();
  return workshops.filter((w) => w.featured).slice(0, 3);
}

async function sessionsForWorkshop(
  workshopId: string,
  supabase: ReturnType<typeof createServerClient>
): Promise<WorkshopSession[]> {
  const demo = demoSessionsForWorkshop(workshopId);
  if (!supabase) return demo;

  const { data: sessions } = await supabase
    .from("workshop_sessions")
    .select("*")
    .eq("workshop_id", workshopId)
    .gte("starts_at", new Date().toISOString())
    .gt("spots_available", 0)
    .order("starts_at", { ascending: true });

  const fromDb = (sessions ?? []) as WorkshopSession[];
  const seen = new Set(fromDb.map((s) => s.id));
  const merged = [...fromDb];
  for (const s of demo) {
    if (!seen.has(s.id)) merged.push(s);
  }
  return merged.sort((a, b) => a.starts_at.localeCompare(b.starts_at));
}

export async function getWorkshopBySlug(
  slug: string
): Promise<WorkshopWithSessions | null> {
  const fromDemo = getMockWorkshopBySlug(slug);
  const supabase = createServerClient();

  if (!supabase) {
    return fromDemo;
  }

  const { data: workshop, error } = await supabase
    .from("workshops")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!error && workshop) {
    const w = withCoverImage(workshop as Workshop);
    return {
      ...w,
      sessions: await sessionsForWorkshop(w.id, supabase),
    };
  }

  return fromDemo;
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
    workshop: withCoverImage(workshop),
  };
}
