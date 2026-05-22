import { redirect } from "next/navigation";
import { AccountBookings } from "@/components/account/AccountBookings";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");
  if (user.role === "host") redirect("/host/dashboard");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink">My bookings</h1>
      <p className="mt-2 text-muted">
        View and update your reservations, {user.fullName}.
      </p>
      <div className="mt-10">
        <AccountBookings />
      </div>
    </div>
  );
}
