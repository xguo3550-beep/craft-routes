"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface BookingSuccessContentProps {
  bookingId?: string;
  email?: string;
  emailSentParam?: string;
  emailError?: string;
  payment?: string;
  sessionId?: string;
  guestName?: string;
  guestsCount?: string;
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
}: BookingSuccessContentProps) {
  const [emailSent, setEmailSent] = useState(
    emailSentParam === "true" ? true : emailSentParam === "false" ? false : null
  );
  const [emailPending, setEmailPending] = useState(
    payment === "stripe" && emailSentParam !== "true"
  );

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

  const reference = bookingId;

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl">
        ✓
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-ink">
        Booking confirmed!
      </h1>

      {emailSent === true && email && (
        <p className="mt-4 text-muted">
          We&apos;ve sent a confirmation email to{" "}
          <span className="font-medium text-ink">{email}</span> with your
          meeting point, what to bring, and your host&apos;s details.
        </p>
      )}

      {emailPending && (
        <p className="mt-4 text-muted">
          Sending your confirmation email
          {email ? (
            <>
              {" "}
              to <span className="font-medium text-ink">{email}</span>
            </>
          ) : null}
          …
        </p>
      )}

      {emailSent === false && (
        <div className="mt-4 rounded-xl bg-amber-50 px-4 py-4 text-left text-sm text-amber-950 ring-1 ring-amber-200">
          <p className="font-medium">Confirmation email could not be sent</p>
          <p className="mt-2 text-amber-900/90">
            Your booking is still recorded
            {reference ? (
              <>
                {" "}
                (reference <span className="font-mono">{reference}</span>)
              </>
            ) : null}
            . Save this page or contact{" "}
            <a
              href="mailto:hello@craftroutes.com"
              className="font-medium underline"
            >
              hello@craftroutes.com
            </a>{" "}
            and we&apos;ll resend your details.
          </p>
          {emailError && (
            <p className="mt-2 font-mono text-xs text-amber-800">
              Reason: {emailError}
            </p>
          )}
          <p className="mt-2 text-xs text-amber-800">
            Checklist: (1) Add <code className="rounded bg-amber-100 px-1">RESEND_API_KEY</code>{" "}
            and <code className="rounded bg-amber-100 px-1">EMAIL_FROM</code> in Vercel →
            redeploy. (2) With test sender{" "}
            <code className="rounded bg-amber-100 px-1">onboarding@resend.dev</code>, book using
            the same email as your Resend account.
          </p>
        </div>
      )}

      {emailSent === null && !emailPending && !email && (
        <p className="mt-4 text-muted">
          Thank you for booking with Craft Routes. Save your reference below for
          your records.
        </p>
      )}

      {reference && (
        <p className="mt-4 rounded-lg bg-cream px-4 py-3 text-sm text-muted">
          Reference: <span className="font-mono font-medium">{reference}</span>
        </p>
      )}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/workshops" className="btn-primary">
          Browse more workshops
        </Link>
        <Link href="/" className="btn-secondary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
