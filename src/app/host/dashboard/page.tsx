import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { demoHostWorkshops } from "@/lib/auth/demo-store";
import { formatPrice } from "@/lib/format";
import { createServerClient } from "@/lib/supabase/server";
import type { Workshop } from "@/types";

export default async function HostDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/host/dashboard");
  if (user.role !== "host") redirect("/account");

  let workshops: Workshop[] = [];
  const supabase = createServerClient();

  if (supabase && !user.id.startsWith("demo-")) {
    const { data } = await supabase
      .from("workshops")
      .select("*")
      .eq("host_user_id", user.id)
      .order("created_at", { ascending: false });
    workshops = (data ?? []) as Workshop[];
  } else {
    workshops = demoHostWorkshops(user.id);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Host dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink">
            Your experiences
          </h1>
          <p className="mt-2 text-muted">Signed in as {user.fullName}</p>
        </div>
        <Link href="/host/workshops/new" className="btn-primary">
          + New experience
        </Link>
      </div>

      <ul className="mt-10 space-y-4">
        {workshops.length === 0 && (
          <li className="rounded-xl border border-dashed border-line p-10 text-center text-muted">
            You haven&apos;t listed an experience yet.{" "}
            <Link href="/host/workshops/new" className="font-medium text-brand-600">
              Create your first one
            </Link>
          </li>
        )}
        {workshops.map((w) => (
          <li
            key={w.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white p-5"
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">{w.title}</h2>
              <p className="text-sm text-muted">
                {formatPrice(w.price_cents)} / person · {w.duration_hours}h · {w.location}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/workshops/${w.slug}`}
                className="text-sm font-medium text-muted hover:text-ink"
              >
                View public page
              </Link>
              <Link
                href={`/host/workshops/${w.id}/edit`}
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                Edit & sessions
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
