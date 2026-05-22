"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SessionUser } from "@/lib/auth/types";

export function HeaderAuth() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <Link href="/login" className="text-sm font-medium text-muted hover:text-ink">
          Sign in
        </Link>
        <Link href="/signup" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          Sign up
        </Link>
        <Link href="/workshops" className="btn-primary !rounded-lg !px-5 !py-2.5 text-sm">
          Book now
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-3 md:flex">
      {user.role === "host" ? (
        <Link href="/host/dashboard" className="text-sm font-medium text-muted hover:text-ink">
          Host dashboard
        </Link>
      ) : (
        <Link href="/account" className="text-sm font-medium text-muted hover:text-ink">
          My bookings
        </Link>
      )}
      <button
        type="button"
        onClick={logout}
        className="text-sm font-medium text-muted hover:text-ink"
      >
        Sign out
      </button>
      <Link href="/workshops" className="btn-primary !rounded-lg !px-5 !py-2.5 text-sm">
        Book now
      </Link>
    </div>
  );
}
