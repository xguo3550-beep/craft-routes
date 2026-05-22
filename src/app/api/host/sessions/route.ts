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

  const supabase = createServerClient();
  if (supabase && !user.id.startsWith("demo-")) {
    const { data: w } = await supabase
      .from("workshops")
      .select("id")
      .eq("id", workshopId)
      .eq("host_user_id", user.id)
      .single();

    if (!w) {
      return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("workshop_sessions")
      .select("*")
      .eq("workshop_id", workshopId)
      .order("starts_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ sessions: data ?? [] });
  }

  const w = demoWorkshopById(workshopId);
  if (!w || (w as { host_user_id?: string }).host_user_id !== user.id) {
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

  const supabase = createServerClient();

  if (supabase && !user.id.startsWith("demo-")) {
    const { data: w } = await supabase
      .from("workshops")
      .select("duration_hours")
      .eq("id", workshop_id)
      .eq("host_user_id", user.id)
      .single();

    if (!w) {
      return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }

    const ends = new Date(start);
    ends.setHours(ends.getHours() + w.duration_hours);

    const { data, error } = await supabase
      .from("workshop_sessions")
      .insert({
        workshop_id,
        starts_at: start.toISOString(),
        ends_at: ends.toISOString(),
        spots_available: Number(spots_available) || 8,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ session: data });
  }

  const w = demoWorkshopById(workshop_id);
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
