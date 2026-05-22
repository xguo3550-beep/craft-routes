import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  demoSessionsForWorkshop,
  demoUpsertSession,
  demoWorkshopById,
} from "@/lib/auth/demo-store";
import { createServerClient } from "@/lib/supabase/server";
import type { WorkshopSession } from "@/types";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "host") {
    return NextResponse.json({ error: "Host account required" }, { status: 403 });
  }

  const workshopId = request.nextUrl.searchParams.get("workshop_id");
  if (!workshopId) {
    return NextResponse.json({ error: "workshop_id required" }, { status: 400 });
  }

  const isDemoHost = user.id.startsWith("demo-");
  const owned = demoWorkshopById(workshopId);
  if (isDemoHost && (!owned || (owned as { host_user_id?: string }).host_user_id !== user.id)) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }

  const supabase = createServerClient();
  if (supabase) {
    let ownerQuery = supabase.from("workshops").select("id").eq("id", workshopId);
    if (!isDemoHost) {
      ownerQuery = ownerQuery.eq("host_user_id", user.id);
    }
    const { data: w } = await ownerQuery.single();

    if (!w && !owned) {
      return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("workshop_sessions")
      .select("*")
      .eq("workshop_id", workshopId)
      .order("starts_at", { ascending: true });

    if (!error) {
      const fromDb = data ?? [];
      const demo = demoSessionsForWorkshop(workshopId);
      const seen = new Set(fromDb.map((s) => s.id));
      const merged = [...fromDb, ...demo.filter((s) => !seen.has(s.id))];
      return NextResponse.json({ sessions: merged });
    }
  }

  if (!owned || (owned as { host_user_id?: string }).host_user_id !== user.id) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }

  return NextResponse.json({ sessions: demoSessionsForWorkshop(workshopId) });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "host") {
    return NextResponse.json({ error: "Host account required" }, { status: 403 });
  }

  const body = await request.json();
  const { workshop_id, starts_at, spots_available } = body;

  if (!workshop_id || !starts_at) {
    return NextResponse.json({ error: "workshop_id and starts_at required" }, { status: 400 });
  }

  const start = new Date(starts_at);
  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const isDemoHost = user.id.startsWith("demo-");
  const w = demoWorkshopById(workshop_id);
  if (isDemoHost && (!w || (w as { host_user_id?: string }).host_user_id !== user.id)) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }

  const supabase = createServerClient();

  if (supabase) {
    let ownerQuery = supabase
      .from("workshops")
      .select("duration_hours")
      .eq("id", workshop_id);
    if (!isDemoHost) {
      ownerQuery = ownerQuery.eq("host_user_id", user.id);
    }
    const { data: row } = await ownerQuery.single();
    const durationHours = row?.duration_hours ?? w?.duration_hours ?? 3;

    const ends = new Date(start);
    ends.setHours(ends.getHours() + durationHours);

    const { data, error } = await supabase
      .from("workshop_sessions")
      .insert({
        workshop_id,
        starts_at: start.toISOString(),
        ends_at: ends.toISOString(),
        spots_available: Number(spots_available) || w?.max_participants || 8,
      })
      .select("*")
      .single();

    if (!error && data) {
      demoUpsertSession(data as WorkshopSession);
      return NextResponse.json({ session: data });
    }

    if (!isDemoHost) {
      return NextResponse.json(
        { error: error?.message ?? "Workshop not found" },
        { status: error ? 500 : 404 }
      );
    }
  }

  if (!w || (w as { host_user_id?: string }).host_user_id !== user.id) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }

  const ends = new Date(start);
  ends.setHours(ends.getHours() + w.duration_hours);

  const session: WorkshopSession = {
    id: `demo-s-${Date.now()}`,
    workshop_id,
    starts_at: start.toISOString(),
    ends_at: ends.toISOString(),
    spots_available: Number(spots_available) || w.max_participants,
    created_at: new Date().toISOString(),
  };

  demoUpsertSession(session);
  return NextResponse.json({ session });
}
