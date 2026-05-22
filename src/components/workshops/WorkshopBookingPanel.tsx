"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Workshop, WorkshopSession } from "@/types";
import { formatPrice, formatShortDate } from "@/lib/format";
import { BOOKING_COPY, CONTACT_EMAIL, groupSizePhrase } from "@/lib/brand";
import { getWorkshopDetailExtra } from "@/lib/workshop-detail-content";

interface WorkshopBookingPanelProps {
  workshop: Workshop;
  sessions: WorkshopSession[];
}

export function WorkshopBookingPanel({ workshop, sessions }: WorkshopBookingPanelProps) {
  const extra = getWorkshopDetailExtra(workshop.slug);
  const [sessionId, setSessionId] = useState(sessions[0]?.id ?? "");
  const [guests, setGuests] = useState(extra.minGuests);

  const selected = sessions.find((s) => s.id === sessionId);
  const maxGuests = selected
    ? Math.min(selected.spots_available, workshop.max_participants)
    : extra.minGuests;

  const totalCents = workshop.price_cents * guests;

  const bookHref = useMemo(() => {
    if (!sessionId) return "#";
    const params = new URLSearchParams({
      session: sessionId,
      guests: String(guests),
    });
    return `/workshops/${workshop.slug}/book?${params.toString()}`;
  }, [sessionId, guests, workshop.slug]);

  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border border-line bg-cream p-6 text-sm text-muted">
        {BOOKING_COPY.noDates} Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-brand-600">
          {CONTACT_EMAIL}
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-cream/80 p-6">
      <h2 className="font-display text-xl font-bold text-ink">{BOOKING_COPY.panelTitle}</h2>
      <p className="mt-1 text-sm text-muted">
        An afternoon with {workshop.host_name}
      </p>
      <p className="mt-2 text-2xl font-bold text-ink">
        {formatPrice(workshop.price_cents, workshop.currency)}
        <span className="text-base font-normal text-muted"> per person</span>
      </p>
      <p className="mt-1 text-sm text-muted">
        Up to {workshop.max_participants} people
        {extra.minGuests > 1 ? ` · from ${extra.minGuests}` : ""}
      </p>

      <div className="mt-6">
        <p className="text-sm font-medium text-ink">{BOOKING_COPY.upcomingLabel}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {sessions.slice(0, 6).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSessionId(s.id)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                sessionId === s.id
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-white text-ink hover:border-brand-300"
              }`}
            >
              {formatShortDate(s.starts_at)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-ink">{BOOKING_COPY.groupLabel}</p>
        <div className="mt-2 inline-flex items-center gap-3 rounded-lg border border-line bg-white px-2 py-1">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(extra.minGuests, g - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md text-lg text-ink hover:bg-cream"
            aria-label="Smaller group"
          >
            −
          </button>
          <span className="min-w-[2rem] text-center font-semibold text-ink">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md text-lg text-ink hover:bg-cream"
            aria-label="Larger group"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-muted">
          <span>
            {formatPrice(workshop.price_cents)} × {groupSizePhrase(guests)}
          </span>
          <span>{formatPrice(totalCents, workshop.currency)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-2 text-base font-bold text-ink">
          <span>Total</span>
          <span>{formatPrice(totalCents, workshop.currency)}</span>
        </div>
      </div>

      <Link href={bookHref} className="btn-primary mt-6 w-full text-center">
        {BOOKING_COPY.joinCta}
      </Link>
      <p className="mt-3 text-center text-xs text-muted">
        {BOOKING_COPY.checkoutFooter}
      </p>
    </div>
  );
}
