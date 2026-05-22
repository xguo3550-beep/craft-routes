"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { UserRole } from "@/lib/auth/types";

interface AuthFormProps {
  mode: "login" | "signup";
  role?: UserRole;
}

export function AuthForm({ mode, role = "customer" }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [hostDisplayName, setHostDisplayName] = useState("");
  const [hostBio, setHostBio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const url = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const body =
        mode === "login"
          ? { email, password }
          : {
              email,
              password,
              fullName,
              role,
              hostDisplayName: role === "host" ? hostDisplayName || fullName : undefined,
              hostBio: role === "host" ? hostBio : undefined,
            };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      if (data.user.role === "host") {
        router.push("/host/dashboard");
      } else {
        router.push("/account");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const isHost = role === "host";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {mode === "signup" && (
        <div>
          <label className="block text-sm font-medium text-ink">Full name</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
          />
        </div>
      )}

      {mode === "signup" && isHost && (
        <>
          <div>
            <label className="block text-sm font-medium text-ink">Host / studio name</label>
            <input
              value={hostDisplayName}
              onChange={(e) => setHostDisplayName(e.target.value)}
              placeholder="e.g. Yang Mei Studio"
              className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">Short bio</label>
            <textarea
              rows={3}
              value={hostBio}
              onChange={(e) => setHostBio(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-ink">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading
          ? "Please wait…"
          : mode === "login"
            ? "Sign in"
            : isHost
              ? "Create host account"
              : "Create account"}
      </button>

      <p className="text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            No account?{" "}
            <Link href="/signup" className="font-medium text-brand-600 hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-brand-600 hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
