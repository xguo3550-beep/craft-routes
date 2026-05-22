import { redirect } from "next/navigation";
import { WorkshopForm } from "@/components/host/WorkshopForm";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function NewWorkshopPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/host/workshops/new");
  if (user.role !== "host") redirect("/account");

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink">New experience</h1>
      <p className="mt-2 text-muted">Add details, price, and sessions after saving.</p>
      <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <WorkshopForm />
      </div>
    </div>
  );
}
