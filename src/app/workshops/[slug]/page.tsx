import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/booking/BookingForm";
import { getWorkshopBySlug } from "@/lib/data/workshops";
import { formatDate, formatPrice, formatTime, regionLabel } from "@/lib/format";

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

  return (
    <div className="pb-16">
      <div className="relative h-64 sm:h-80 lg:h-96">
        <Image
          src={workshop.image_url}
          alt={workshop.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              workshop.region === "dali"
                ? "bg-brand-500 text-white"
                : "bg-earth-600 text-white"
            }`}
          >
            {regionLabel(workshop.region)}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            {workshop.title}
          </h1>
          <p className="mt-2 text-earth-200">{workshop.location}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-6 grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-earth-200/60 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-earth-900">
                About this workshop
              </h2>
              <p className="mt-4 leading-relaxed text-earth-700">
                {workshop.long_description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-earth-600">
                <span>⏱ {workshop.duration_hours} hours</span>
                <span>👥 Max {workshop.max_participants} guests</span>
                <span>🗣 {workshop.language}</span>
                <span className="font-semibold text-brand-700">
                  {formatPrice(workshop.price_cents, workshop.currency)} / person
                </span>
              </div>
            </section>

            {workshop.gallery_urls.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-earth-900">
                  Gallery
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {workshop.gallery_urls.map((url, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                      <Image src={url} alt="" fill className="object-cover" sizes="200px" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100">
                <h3 className="font-semibold text-earth-900">Highlights</h3>
                <ul className="mt-3 space-y-2 text-sm text-earth-700">
                  {workshop.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-brand-600">✓</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-earth-50 p-6 ring-1 ring-earth-200">
                <h3 className="font-semibold text-earth-900">What&apos;s included</h3>
                <ul className="mt-3 space-y-2 text-sm text-earth-700">
                  {workshop.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-earth-500">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-earth-200/60">
              <h2 className="font-display text-xl font-semibold text-earth-900">
                Your host
              </h2>
              <p className="mt-1 font-medium text-brand-700">{workshop.host_name}</p>
              <p className="mt-3 text-earth-700">{workshop.host_bio}</p>
            </section>

            {workshop.sessions.length > 0 && (
              <section className="lg:hidden">
                <h2 className="font-display text-xl font-semibold text-earth-900">
                  Upcoming dates
                </h2>
                <ul className="mt-4 space-y-2">
                  {workshop.sessions.slice(0, 5).map((s) => (
                    <li
                      key={s.id}
                      className="flex justify-between rounded-lg bg-earth-50 px-4 py-3 text-sm"
                    >
                      <span>
                        {formatDate(s.starts_at)} · {formatTime(s.starts_at)}
                      </span>
                      <span className="text-earth-500">{s.spots_available} spots</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-earth-200/60">
              <h2 className="font-display text-xl font-semibold text-earth-900">
                Book your spot
              </h2>
              <p className="mt-1 text-2xl font-bold text-brand-700">
                {formatPrice(workshop.price_cents, workshop.currency)}
                <span className="text-sm font-normal text-earth-500"> / person</span>
              </p>
              <div className="mt-6">
                <BookingForm workshop={workshop} sessions={workshop.sessions} />
              </div>
              <p className="mt-4 text-center text-xs text-earth-500">
                Questions?{" "}
                <Link href="mailto:hello@craftroutes.com" className="text-brand-700 hover:underline">
                  Email us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
