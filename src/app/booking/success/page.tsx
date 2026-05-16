import Link from "next/link";

interface PageProps {
  searchParams: { booking_id?: string; session_id?: string };
}

export default function BookingSuccessPage({ searchParams }: PageProps) {
  const { booking_id, session_id } = searchParams;
  const reference = booking_id ?? session_id;

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl">
        ✓
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-earth-900">
        Booking confirmed!
      </h1>
      <p className="mt-4 text-earth-600">
        Thank you for booking with Craft Routes. We&apos;ve sent a confirmation
        email with all the details you need — meeting point, what to bring, and
        your host&apos;s contact info.
      </p>
      {reference && (
        <p className="mt-4 rounded-lg bg-earth-50 px-4 py-3 text-sm text-earth-700">
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
