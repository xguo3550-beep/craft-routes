import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailListSection } from "@/components/workshops/DetailListSection";
import { WorkshopBookingPanel } from "@/components/workshops/WorkshopBookingPanel";
import { getWorkshopBySlug } from "@/lib/data/workshops";
import { getWorkshopDetailExtra } from "@/lib/workshop-detail-content";
import { formatPrice, regionLabel } from "@/lib/format";
import {
  regionCityLabel,
  workshopEmoji,
  workshopRating,
} from "@/lib/workshop-meta";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const workshop = await getWorkshopBySlug(slug);
  if (!workshop) return { title: "Workshop not found" };
  return {
    title: workshop.title,
    description: workshop.description,
  };
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = params;
  const workshop = await getWorkshopBySlug(slug);

  if (!workshop) notFound();

  const extra = getWorkshopDetailExtra(slug);
  const rating = workshopRating(workshop.id);
  const cityLine = regionCityLabel(workshop.region);

  return (
    <div className="bg-cream pb-20">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/workshops"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          ← Back to experiences
        </Link>

        <header className="mt-8">
          <span className="text-4xl" aria-hidden>
            {workshopEmoji(slug)}
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-600">
            {cityLine} · {extra.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            {workshop.title}
          </h1>
          <p className="mt-3 text-muted">
            {workshop.duration_hours} hours · Up to {workshop.max_participants} guests
            {extra.minGuests > 1 && ` · Min. ${extra.minGuests} guests`}
          </p>
          <p className="mt-2 text-sm text-muted">
            ⭐ {rating} · {extra.reviewCount} reviews
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-10 lg:col-span-2">
            <div className="grid gap-10 sm:grid-cols-2">
              <DetailListSection title="What you'll do" items={extra.whatYouDo} />
              <DetailListSection title="Good to know" items={extra.goodToKnow} />
            </div>

            <section className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <div className="flex gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cream text-2xl"
                  aria-hidden
                >
                  👤
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">
                    {workshop.host_name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{extra.hostSubtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {workshop.host_bio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {extra.hostLanguages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-ink"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                About this workshop
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {workshop.long_description}
              </p>
              <p className="mt-4 text-sm text-muted">
                📍 {workshop.location} · {regionLabel(workshop.region)} ·{" "}
                {formatPrice(workshop.price_cents, workshop.currency)} per person
              </p>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <WorkshopBookingPanel workshop={workshop} sessions={workshop.sessions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
