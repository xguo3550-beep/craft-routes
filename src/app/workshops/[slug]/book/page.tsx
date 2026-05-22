import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckoutForm } from "@/components/booking/CheckoutForm";
import { getWorkshopBySlug } from "@/lib/data/workshops";
import { groupSizePhrase } from "@/lib/brand";
import { formatDate, formatPrice, formatTime, regionLabel } from "@/lib/format";

interface PageProps {
  params: { slug: string };
  searchParams: { session?: string; guests?: string };
}

export default async function WorkshopBookPage({ params, searchParams }: PageProps) {
  const workshop = await getWorkshopBySlug(params.slug);
  if (!workshop) notFound();

  const sessionId = searchParams.session;
  const guests = Math.max(1, Number(searchParams.guests) || 1);

  if (!sessionId) {
    redirect(`/workshops/${params.slug}`);
  }

  const session = workshop.sessions.find((s) => s.id === sessionId);
  if (!session) {
    redirect(`/workshops/${params.slug}`);
  }

  const totalCents = workshop.price_cents * guests;

  return (
    <div className="bg-cream pb-20">
      <div className="mx-auto max-w-xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href={`/workshops/${workshop.slug}`}
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          ← Back to experience
        </Link>

        <header className="mt-8">
          <h1 className="font-display text-2xl font-bold text-ink">{workshop.title}</h1>
          <p className="mt-2 text-sm text-muted">
            {formatDate(session.starts_at)} · {groupSizePhrase(guests)} ·{" "}
            {regionLabel(workshop.region)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {formatTime(session.starts_at)} · {workshop.location}
          </p>
        </header>

        <div className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <CheckoutForm workshop={workshop} session={session} guests={guests} />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          {formatPrice(workshop.price_cents)} × {guests} ={" "}
          <span className="font-semibold text-ink">
            {formatPrice(totalCents, workshop.currency)}
          </span>
        </p>
      </div>
    </div>
  );
}
