import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  demoCustomerBookings,
  demoWorkshopById,
} from "@/lib/auth/demo-store";
import { getMockSession } from "@/lib/data/mock-workshops";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (user.role !== "customer") {
    return NextResponse.json({ error: "Customer account required" }, { status: 403 });
  }

  const supabase = createServerClient();
  if (supabase && !user.id.startsWith("demo-")) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, workshops(title, slug, location), workshop_sessions(starts_at, ends_at)")
      .eq("customer_user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ bookings: data ?? [] });
  }

  const bookings = demoCustomerBookings(user.id, user.email).map((b) => {
    const sessionData = getMockSession(b.session_id);
    const workshop = sessionData?.workshop ?? demoWorkshopById(b.workshop_id);
    return {
      ...b,
      workshops: workshop
        ? { title: workshop.title, slug: workshop.slug, location: workshop.location }
        : undefined,
      workshop_sessions: sessionData
        ? { starts_at: sessionData.starts_at, ends_at: sessionData.ends_at }
        : undefined,
    };
  });
  return NextResponse.json({ bookings });
}
