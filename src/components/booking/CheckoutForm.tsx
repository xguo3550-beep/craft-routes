"use client";

import Link from "next/link";
import { useState } from "react";
import type { Workshop, WorkshopSession } from "@/types";
import { formatDate, formatPrice, formatTime } from "@/lib/format";

interface CheckoutFormProps {
  workshop: Workshop;
  session: WorkshopSession;
  guests: number;
}

export function CheckoutForm({ workshop, session, guests }: CheckoutFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCents = workshop.price_cents * guests;
  const guestName = `${firstName.trim()} ${lastName.trim()}`.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.id,
          guestName,
          guestEmail: email,
          guestsCount: guests,
          notes: notes || undefined,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-line bg-brand-50/50 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Total due today</span>
          <span className="text-2xl font-bold text-ink">
            {formatPrice(totalCents, workshop.currency)}
          </span>
        </div>
      </div>

      <section>
        <h2 className="font-display text-lg font-bold text-ink">Your details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-ink">
              First name
            </label>
            <input
              id="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-ink">
              Last name
            </label>
            <input
              id="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="notes" className="block text-sm font-medium text-ink">
            Any notes for your host? (dietary needs, accessibility, group info)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. One guest is vegetarian…"
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </section>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </p>
      )}

      <div className="rounded-xl bg-cream/80 px-4 py-4 text-sm text-muted">
        <p className="flex gap-2">
          <span aria-hidden>🔒</span>
          Payment is processed securely. You won&apos;t be charged until your host
          confirms the booking.
        </p>
        <p className="mt-2 flex gap-2">
          <span aria-hidden>✕</span>
          Free cancellation up to 48 hours before. Full refund guaranteed.
        </p>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Processing…" : "Confirm and pay"}
      </button>
      <p className="text-center text-xs text-muted">
        By booking you agree to our guest terms and cancellation policy
      </p>

      <p className="text-center text-sm text-muted">
        <Link
          href={`/workshops/${workshop.slug}`}
          className="font-medium text-brand-600 hover:underline"
        >
          ← Back to experience
        </Link>
        {" · "}
        {formatDate(session.starts_at)} · {formatTime(session.starts_at)} · {guests}{" "}
        {guests === 1 ? "guest" : "guests"}
      </p>
    </form>
  );
}
