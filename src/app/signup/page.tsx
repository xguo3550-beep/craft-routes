import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentUser } from "@/lib/auth/current-user";
import type { UserRole } from "@/lib/auth/types";

interface PageProps {
  searchParams: { role?: string };
}

export default async function SignupPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (user) {
    redirect(user.role === "host" ? "/host/dashboard" : "/account");
  }

  const role: UserRole = searchParams.role === "host" ? "host" : "customer";
  const isHost = role === "host";

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
        {isHost ? "Become a host" : "Join as a guest"}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">
        {isHost ? "Host sign up" : "Customer sign up"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {isHost
          ? "List experiences, set prices, and manage session times."
          : "Book workshops and manage your reservations in one place."}
      </p>

      <div className="mt-6 flex gap-2 rounded-lg bg-cream p-1">
        <Link
          href="/signup?role=customer"
          className={`flex-1 rounded-md py-2 text-center text-sm font-medium ${
            !isHost ? "bg-white text-ink shadow-sm" : "text-muted"
          }`}
        >
          Customer
        </Link>
        <Link
          href="/signup?role=host"
          className={`flex-1 rounded-md py-2 text-center text-sm font-medium ${
            isHost ? "bg-white text-ink shadow-sm" : "text-muted"
          }`}
        >
          Host
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <AuthForm mode="signup" role={role} />
      </div>
    </div>
  );
}
