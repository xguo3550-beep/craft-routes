import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SessionManager } from "@/components/host/SessionManager";
import { WorkshopForm } from "@/components/host/WorkshopForm";
import { getCurrentUser } from "@/lib/auth/current-user";
import { demoWorkshopById } from "@/lib/auth/demo-store";
import { createServerClient } from "@/lib/supabase/server";
import type { Workshop } from "@/types";

interface PageProps {
  params: { id: string };
}

export default async function EditWorkshopPage({ params }: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=/host/workshops/${params.id}/edit`);
  if (user.role !== "host") redirect("/account");

  let workshop: Workshop | null = null;
  const supabase = createServerClient();

  if (supabase && !user.id.startsWith("demo-")) {
    const { data } = await supabase
      .from("workshops")
      .select("*")
      .eq("id", params.id)
      .eq("host_user_id", user.id)
      .single();
    workshop = data as Workshop | null;
  } else {
    const w = demoWorkshopById(params.id);
    if (w && (w as Workshop & { host_user_id?: string }).host_user_id === user.id) {
      workshop = w;
    }
  }

  if (!workshop) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link href="/host/dashboard" className="text-sm font-medium text-brand-600 hover:underline">
        ← Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink">Edit experience</h1>

      <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <WorkshopForm workshop={workshop} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-ink">Sessions & availability</h2>
        <p className="mt-1 text-sm text-muted">Set when guests can book and how many spots are open.</p>
        <div className="mt-6">
          <SessionManager workshopId={workshop.id} />
        </div>
      </section>
    </div>
  );
}
