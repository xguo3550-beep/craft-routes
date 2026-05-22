import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  demoDeleteWorkshop,
  demoHostWorkshops,
  demoUpsertWorkshop,
  demoWorkshopById,
} from "@/lib/auth/demo-store";
import { createServerClient } from "@/lib/supabase/server";

async function requireHost() {
  const user = await getCurrentUser();
  if (!user) return { error: "Not signed in", status: 401 as const };
  if (user.role !== "host") return { error: "Host account required", status: 403 as const };
  return { user };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireHost();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const supabase = createServerClient();
  if (supabase && !auth.user.id.startsWith("demo-")) {
    const { data, error } = await supabase
      .from("workshops")
      .select("*")
      .eq("id", params.id)
      .eq("host_user_id", auth.user.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }
    return NextResponse.json({ workshop: data });
  }

  const workshop = demoWorkshopById(params.id);
  if (!workshop || (workshop as { host_user_id?: string }).host_user_id !== auth.user.id) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }
  return NextResponse.json({ workshop });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireHost();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const supabase = createServerClient();

  const isDemoHost = auth.user.id.startsWith("demo-");

  if (supabase) {
    const updates: Record<string, unknown> = {};
    const fields = [
      "title",
      "description",
      "long_description",
      "region",
      "location",
      "duration_hours",
      "max_participants",
      "price_cents",
      "image_url",
      "host_bio",
      "language",
      "highlights",
      "includes",
    ] as const;
    for (const f of fields) {
      if (body[f] !== undefined) updates[f] = body[f];
    }

    let query = supabase.from("workshops").update(updates).eq("id", params.id);
    if (!isDemoHost) {
      query = query.eq("host_user_id", auth.user.id);
    }

    const { data, error } = await query.select("*").single();

    if (!error && data) {
      demoUpsertWorkshop(data as import("@/types").Workshop);
      return NextResponse.json({ workshop: data });
    }

    if (!isDemoHost) {
      return NextResponse.json(
        { error: error?.message ?? "Workshop not found" },
        { status: error ? 500 : 404 }
      );
    }
  }

  const existing = demoWorkshopById(params.id);
  if (!existing || (existing as { host_user_id?: string }).host_user_id !== auth.user.id) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }

  const updated = {
    ...existing,
    ...body,
    price_cents: body.price_cents !== undefined ? Math.round(Number(body.price_cents)) : existing.price_cents,
    id: existing.id,
    slug: existing.slug,
  };
  demoUpsertWorkshop(updated);
  return NextResponse.json({ workshop: updated });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireHost();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const supabase = createServerClient();
  if (supabase && !auth.user.id.startsWith("demo-")) {
    const { error } = await supabase
      .from("workshops")
      .delete()
      .eq("id", params.id)
      .eq("host_user_id", auth.user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  if (!demoDeleteWorkshop(params.id, auth.user.id)) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
