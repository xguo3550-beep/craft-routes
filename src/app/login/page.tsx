import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(user.role === "host" ? "/host/dashboard" : "/account");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-muted">
        Customers manage bookings; hosts manage experiences.
      </p>
      <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
