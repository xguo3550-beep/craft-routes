"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWorkshopDetailExtra } from "@/lib/workshop-detail-content";

interface BookingSuccessContentProps {
  bookingId?: string;
  email?: string;
  emailSentParam?: string;
  emailError?: string;
  payment?: string;
  sessionId?: string;
  guestName?: string;
  guestsCount?: string;
  workshopTitle?: string;
  workshopSlug?: string;
  sessionDate?: string;
  sessionTime?: string;
  location?: string;
  region?: string;
  total?: string;
  hostName?: string;
}

export function BookingSuccessContent({
  bookingId,
  email,
  emailSentParam,
  emailError,
  payment,
  sessionId,
  guestName,
  guestsCount,
  workshopTitle,
  workshopSlug,
  sessionDate,
  sessionTime,
  location,
  region,
  total,
  hostName,
}: BookingSuccessContentProps) {
  const [emailSent, setEmailSent] = useState(
    emailSentParam === "true" ? true : emailSentParam === "false" ? false : null
  );
  const [emailPending, setEmailPending] = useState(
    payment === "stripe" && emailSentParam !== "true"
  );

  const extra = workshopSlug ? getWorkshopDetailExtra(workshopSlug) : null;

  useEffect(() => {
    if (payment !== "stripe" || emailSent === true || emailSent === false) {
      return;
    }
    if (!bookingId || !sessionId || !email || !guestName || !guestsCount) {
      setEmailPending(false);
      setEmailSent(false);
      return;
    }

    let cancelled = false;

    async function requestConfirmationEmail() {
      try {
        const res = await fetch("/api/bookings/send-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId,
            sessionId,
            guestName,
            guestEmail: email,
            guestsCount: Number(guestsCount),
            paid: true,
          }),
        });
        const data = await res.json();
        if (!cancelled) {
          setEmailSent(data.sent === true);
          setEmailPending(false);
        }
      } catch {
        if (!cancelled) {
          setEmailSent(false);
          setEmailPending(false);
        }
      }
    }

    const timer = setTimeout(requestConfirmationEmail, 1500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    payment,
    bookingId,
    sessionId,
    email,
    guestName,
    guestsCount,
    emailSent,
  ]);

  const hostMessage = hostName
    ? `${hostName.split(" ")[0] ?? hostName} will be in touch within 24 hours with the full address and any last details.`
    : "Your host will be in touch within 24 hours with the full address and any last details.";

  return (
    <div className="bg-cream pb-20">
      <section className="border-b border-line bg-cream px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600">
          ✓
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          Booking confirmed
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          You&apos;re all set!
        </h1>
        {emailSent === true && email && (
          <p className="mx-auto mt-4 max-w-lg text-muted">
            A confirmation has been sent to{" "}
            <span className="font-medium text-ink">{email}</span>. {hostMessage}
          </p>
        )}
        {emailPending && (
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Sending your confirmation email…
          </p>
        )}
        {emailSent === false && (
          <p className="mx-auto mt-4 max-w-lg text-sm text-amber-900">
            Your booking is confirmed
            {bookingId ? ` (ref ${bookingId})` : ""}. We couldn&apos;t send email
            — contact{" "}
            <a href="mailto:hello@craftroutes.com" className="font-medium underline">
              hello@craftroutes.com
            </a>
            {emailError ? ` (${emailError})` : ""}.
          </p>
        )}
        {emailSent === null && !emailPending && (
          <p className="mx-auto mt-4 max-w-lg text-muted">{hostMessage}</p>
        )}
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {workshopTitle && (
          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <div className="h-1 bg-brand-600" />
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Your booking
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-ink">
                {workshopTitle}
              </h2>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                {sessionDate && (
                  <>
                    <dt className="text-muted">Date</dt>
                    <dd className="font-medium text-ink">{sessionDate}</dd>
                  </>
                )}
                {sessionTime && (
                  <>
                    <dt className="text-muted">Time</dt>
                    <dd className="font-medium text-ink">{sessionTime}</dd>
                  </>
                )}
                {guestsCount && (
                  <>
                    <dt className="text-muted">Guests</dt>
                    <dd className="font-medium text-ink">
                      {guestsCount} {Number(guestsCount) === 1 ? "guest" : "guests"}
                    </dd>
                  </>
                )}
                {total && (
                  <>
                    <dt className="text-muted">Total paid</dt>
                    <dd className="font-medium text-ink">{total}</dd>
                  </>
                )}
              </dl>
              {(location || region) && (
                <p className="mt-4 text-sm text-muted">
                  {location}
                  {region ? ` — ${region}` : ""} — full address in your confirmation
                  email
                </p>
              )}
            </div>
          </div>
        )}

        {hostName && (
          <div className="mt-6 rounded-xl border border-line bg-white p-6">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-xl">
                👤
              </span>
              <div>
                <p className="font-semibold text-ink">Your host: {hostName}</p>
                <p className="mt-2 text-sm text-muted">
                  They&apos;ll message you within 24 hours to confirm details and answer
                  questions.
                </p>
                {workshopSlug && (
                  <Link
                    href={`/workshops/${workshopSlug}`}
                    className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
                  >
                    View experience
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {extra && extra.whatToBring.length > 0 && (
          <div className="mt-6 rounded-xl border border-line bg-white p-6">
            <h3 className="font-display font-bold text-ink">What to bring</h3>
            <ul className="mt-4 space-y-3">
              {extra.whatToBring.map((item) => (
                <li key={item.text} className="flex gap-3 text-sm text-muted">
                  <span aria-hidden>{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/workshops" className="btn-secondary text-center">
            Browse more experiences
          </Link>
          <Link href="/" className="btn-primary text-center">
            Back to home
          </Link>
        </div>

        {bookingId && (
          <p className="mt-8 text-center text-xs text-muted">
            Reference: <span className="font-mono">{bookingId}</span>
          </p>
        )}
      </div>
    </div>
  );
}
