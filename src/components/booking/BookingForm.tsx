"use client";

import { useState } from "react";
import type { Workshop, WorkshopSession } from "@/types";
import { formatDate, formatPrice, formatTime } from "@/lib/format";

interface BookingFormProps {
  workshop: Workshop;
  sessions: WorkshopSession[];
  preselectedSessionId?: string;
}

export function BookingForm({
  workshop,
  sessions,
  preselectedSessionId,
}: BookingFormProps) {
  const [sessionId, setSessionId] = useState(
    preselectedSessionId ?? sessions[0]?.id ?? ""
  );
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedSession = sessions.find((s) => s.id === sessionId);
  const totalCents = workshop.price_cents * guestsCount;
  const maxGuests = selectedSession
    ? Math.min(selectedSession.spots_available, workshop.max_participants)
    : 1;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          guestName,
          guestEmail,
          guestsCount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl bg-amber-50 p-6 text-amber-900 ring-1 ring-amber-200">
        <p className="font-medium">No upcoming sessions</p>
        <p className="mt-1 text-sm">
          Check back soon or email hello@craftroutes.com to request a date.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="session" className="block text-sm font-medium text-ink">
          Select a date
        </label>
        <select
          id="session"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          required
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {formatDate(s.starts_at)} · {formatTime(s.starts_at)} —{" "}
              {s.spots_available} spots left
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-ink">
          Number of guests
        </label>
        <select
          id="guests"
          value={guestsCount}
          onChange={(e) => setGuestsCount(Number(e.target.value))}
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Full name
        </label>
        <input
          id="name"
          type="text"
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Your name"
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </p>
      )}

      <div className="rounded-xl bg-cream p-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted">
            {formatPrice(workshop.price_cents)} × {guestsCount}
          </span>
          <span className="font-semibold text-ink">
            {formatPrice(totalCents, workshop.currency)}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted">
          Secure payment via Stripe. Free cancellation up to 48 hours before.
        </p>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Redirecting to payment…" : "Continue to payment"}
      </button>
    </form>
  );
}
