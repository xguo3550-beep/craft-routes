"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import type { Booking } from "@/types";

interface BookingRow extends Booking {
  workshops?: { title: string; slug: string; location: string };
  workshop_sessions?: { starts_at: string; ends_at: string };
}

export function AccountBookings() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/account/bookings")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setBookings(d.bookings ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function updateBooking(
    id: string,
    patch: { guests_count?: number; guest_name?: string; notes?: string; cancel?: boolean }
  ) {
    const res = await fetch(`/api/account/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...data.booking } : b))
      );
    } else {
      alert(data.error ?? "Update failed");
    }
  }

  if (loading) {
    return <p className="text-muted">Loading your bookings…</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line p-10 text-center">
        <p className="text-muted">You haven&apos;t booked anything yet.</p>
        <Link href="/workshops" className="btn-primary mt-4 inline-block">
          Browse experiences
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-6">
      {bookings.map((b) => {
        const title = b.workshops?.title ?? "Workshop";
        const slug = b.workshops?.slug;
        const when = b.workshop_sessions?.starts_at;

        return (
          <li key={b.id} className="rounded-xl border border-line bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {b.status}
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold text-ink">{title}</h2>
                {when && (
                  <p className="mt-1 text-sm text-muted">
                    {formatDate(when)} · {formatTime(when)}
                  </p>
                )}
                <p className="mt-1 text-sm font-medium text-ink">
                  {formatPrice(b.total_cents, b.currency)} · {b.guests_count} guests
                </p>
              </div>
              {slug && b.status !== "cancelled" && (
                <Link
                  href={`/workshops/${slug}`}
                  className="text-sm font-medium text-brand-600 hover:underline"
                >
                  View experience
                </Link>
              )}
            </div>

            {b.status !== "cancelled" && (
              <div className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted">Guests</label>
                  <input
                    type="number"
                    min={1}
                    defaultValue={b.guests_count}
                    className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm"
                    onBlur={(e) =>
                      updateBooking(b.id, { guests_count: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted">Name on booking</label>
                  <input
                    defaultValue={b.guest_name}
                    className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm"
                    onBlur={(e) => updateBooking(b.id, { guest_name: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted">Notes for host</label>
                  <textarea
                    rows={2}
                    defaultValue={b.notes ?? ""}
                    className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm"
                    onBlur={(e) => updateBooking(b.id, { notes: e.target.value })}
                  />
                </div>
              </div>
            )}

            {b.status !== "cancelled" && (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Cancel this booking? Free cancellation up to 48h before.")) {
                    updateBooking(b.id, { cancel: true });
                  }
                }}
                className="mt-4 text-sm font-medium text-red-600 hover:underline"
              >
                Cancel booking
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
