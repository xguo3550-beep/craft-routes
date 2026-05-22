import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  demoBookingById,
  demoUpsertBooking,
} from "@/lib/auth/demo-store";
import { createServerClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (user.role !== "customer") {
    return NextResponse.json({ error: "Customer account required" }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  if (supabase && !user.id.startsWith("demo-")) {
    const { data: existing } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", params.id)
      .eq("customer_user_id", user.id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (existing.status === "cancelled") {
      return NextResponse.json({ error: "Booking already cancelled" }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (body.cancel === true) {
      updates.status = "cancelled";
    }
    if (body.guests_count !== undefined) {
      updates.guests_count = Math.max(1, Number(body.guests_count));
    }
    if (body.notes !== undefined) {
      updates.notes = String(body.notes);
    }
    if (body.guest_name !== undefined) {
      updates.guest_name = String(body.guest_name);
    }

    const { data, error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", params.id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ booking: data });
  }

  const existing = demoBookingById(params.id);
  if (
    !existing ||
    ((existing as { customer_user_id?: string }).customer_user_id !== user.id &&
      existing.guest_email.toLowerCase() !== user.email.toLowerCase())
  ) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (existing.status === "cancelled") {
    return NextResponse.json({ error: "Booking already cancelled" }, { status: 400 });
  }

  const updated = {
    ...existing,
    guests_count:
      body.guests_count !== undefined ? Math.max(1, Number(body.guests_count)) : existing.guests_count,
    guest_name: body.guest_name !== undefined ? String(body.guest_name) : existing.guest_name,
    status: body.cancel === true ? ("cancelled" as const) : existing.status,
    ...(body.notes !== undefined && { notes: String(body.notes) }),
  };

  demoUpsertBooking(updated as typeof existing);
  return NextResponse.json({ booking: updated });
}
