import Link from "next/link";
import { CITIES } from "@/lib/cities";

export const metadata = {
  title: "Cities · Craft Routes",
  description: "Local experiences across Dali, Yunnan, Sichuan, and more regions in China.",
};

export default function CitiesPage() {
  const live = CITIES.filter((c) => c.available);
  const coming = CITIES.filter((c) => !c.available);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-ink">Cities</h1>
      <p className="mt-2 text-muted">
        Experiences in {live.length} cities across Yunnan and Sichuan — with more
        regions opening soon.
      </p>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-brand-600">
        Open now
      </h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {live.map((city) => (
          <Link
            key={city.slug}
            href={city.href}
            className="card-minglu group block p-6 transition hover:ring-brand-200"
          >
            <span className="text-3xl" aria-hidden>
              {city.icon}
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-ink group-hover:text-brand-700">
              {city.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{city.experienceCount}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {city.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mt-14 text-sm font-semibold uppercase tracking-wider text-muted">
        More coming
      </h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coming.map((city) => (
          <div
            key={city.slug}
            className="flex flex-col rounded-xl border border-dashed border-line bg-cream/50 p-6"
          >
            <span className="text-3xl opacity-70" aria-hidden>
              {city.icon}
            </span>
            <h2 className="mt-4 font-display text-lg font-bold text-muted">
              {city.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{city.experienceCount}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {city.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
