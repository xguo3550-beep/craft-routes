"use client";

import { useRouter } from "next/navigation";
import { notifyAuthChange } from "@/lib/auth/auth-events";

export function HeaderSignOutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    notifyAuthChange(null);
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={() => void logout()} className={className}>
      Sign out
    </button>
  );
}
