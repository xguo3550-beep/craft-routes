import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  demoAllSessions,
  demoDeleteSession,
  demoUpsertSession,
  demoWorkshopById,
} from "@/lib/auth/demo-store";
import { createServerClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "host") {
    return NextResponse.json({ error: "Host account required" }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  if (supabase && !user.id.startsWith("demo-")) {
    const updates: Record<string, unknown> = {};
    if (body.starts_at) {
      updates.starts_at = new Date(body.starts_at).toISOString();
    }
    if (body.ends_at) {
      updates.ends_at = new Date(body.ends_at).toISOString();
    }
    if (body.spots_available !== undefined) {
      updates.spots_available = Number(body.spots_available);
    }

    const { data: sess } = await supabase
      .from("workshop_sessions")
      .select("workshop_id")
      .eq("id", params.id)
      .single();

    if (!sess) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const { data: w } = await supabase
      .from("workshops")
      .select("id")
      .eq("id", sess.workshop_id)
      .eq("host_user_id", user.id)
      .single();

    if (!w) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("workshop_sessions")
      .update(updates)
      .eq("id", params.id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ session: data });
  }

  const sess = demoAllSessions().find((s) => s.id === params.id);
  if (!sess) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  const w = demoWorkshopById(sess.workshop_id);
  if (!w || (w as { host_user_id?: string }).host_user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = {
    ...sess,
    starts_at: body.starts_at ? new Date(body.starts_at).toISOString() : sess.starts_at,
    ends_at: body.ends_at ? new Date(body.ends_at).toISOString() : sess.ends_at,
    spots_available:
      body.spots_available !== undefined ? Number(body.spots_available) : sess.spots_available,
  };
  demoUpsertSession(updated);
  return NextResponse.json({ session: updated });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "host") {
    return NextResponse.json({ error: "Host account required" }, { status: 403 });
  }

  const supabase = createServerClient();
  if (supabase && !user.id.startsWith("demo-")) {
    const { data: sess } = await supabase
      .from("workshop_sessions")
      .select("workshop_id")
      .eq("id", params.id)
      .single();

    if (!sess) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { data: w } = await supabase
      .from("workshops")
      .select("id")
      .eq("id", sess.workshop_id)
      .eq("host_user_id", user.id)
      .single();

    if (!w) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await supabase.from("workshop_sessions").delete().eq("id", params.id);
    return NextResponse.json({ ok: true });
  }

  if (!demoDeleteSession(params.id, user.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
