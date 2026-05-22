import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  demoHostWorkshops,
  demoUpsertWorkshop,
} from "@/lib/auth/demo-store";
import { workshopCoverImage } from "@/lib/workshop-cover-images";
import { slugify } from "@/lib/slug";
import { createServerClient } from "@/lib/supabase/server";
import type { Region, Workshop } from "@/types";

function requireHost(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) return { error: "Not signed in", status: 401 as const };
  if (user.role !== "host") return { error: "Host account required", status: 403 as const };
  return { user };
}

export async function GET() {
  const auth = requireHost(await getCurrentUser());
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const supabase = createServerClient();
  if (supabase && !auth.user.id.startsWith("demo-")) {
    const { data, error } = await supabase
      .from("workshops")
      .select("*")
      .eq("host_user_id", auth.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ workshops: data ?? [] });
  }

  return NextResponse.json({ workshops: demoHostWorkshops(auth.user.id) });
}

export async function POST(request: NextRequest) {
  const auth = requireHost(await getCurrentUser());
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = slugify(body.slug || title) + `-${Date.now().toString(36).slice(2, 6)}`;
  const region = (body.region === "sichuan" ? "sichuan" : "dali") as Region;
  const priceCents = Math.round(Number(body.price_cents) || 0);
  if (priceCents < 100) {
    return NextResponse.json({ error: "Price must be at least $1" }, { status: 400 });
  }

  const hostName = auth.user.hostDisplayName ?? auth.user.fullName;
  const workshop: Workshop & { host_user_id?: string } = {
    id: `demo-w-${Date.now()}`,
    slug,
    title,
    description: String(body.description ?? "").trim() || title,
    long_description: String(body.long_description ?? body.description ?? "").trim() || title,
    region,
    location: String(body.location ?? "").trim() || "Dali, Yunnan",
    duration_hours: Number(body.duration_hours) || 3,
    max_participants: Number(body.max_participants) || 8,
    price_cents: priceCents,
    currency: "usd",
    image_url: String(body.image_url ?? "").trim() || workshopCoverImage(slug),
    gallery_urls: [],
    highlights: Array.isArray(body.highlights) ? body.highlights : [],
    includes: Array.isArray(body.includes) ? body.includes : [],
    host_name: hostName,
    host_bio: String(body.host_bio ?? auth.user.hostBio ?? "").trim() || "Local host",
    language: String(body.language ?? "English"),
    featured: false,
    created_at: new Date().toISOString(),
    host_user_id: auth.user.id,
  };

  const supabase = createServerClient();
  if (supabase && !auth.user.id.startsWith("demo-")) {
    const { data, error } = await supabase
      .from("workshops")
      .insert({
        slug: workshop.slug,
        title: workshop.title,
        description: workshop.description,
        long_description: workshop.long_description,
        region: workshop.region,
        location: workshop.location,
        duration_hours: workshop.duration_hours,
        max_participants: workshop.max_participants,
        price_cents: workshop.price_cents,
        currency: workshop.currency,
        image_url: workshop.image_url,
        gallery_urls: workshop.gallery_urls,
        highlights: workshop.highlights,
        includes: workshop.includes,
        host_name: workshop.host_name,
        host_bio: workshop.host_bio,
        language: workshop.language,
        featured: false,
        host_user_id: auth.user.id,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ workshop: data });
  }

  demoUpsertWorkshop(workshop);
  return NextResponse.json({ workshop });
}
