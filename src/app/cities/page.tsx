import Link from "next/link";

const cities = [
  {
    slug: "dali",
    name: "Dali, Yunnan",
    icon: "🏔️",
    count: "4 experiences",
    tags: ["Tie-dye", "Cycling", "Village hikes"],
    href: "/workshops?region=dali",
  },
  {
    slug: "sichuan",
    name: "Sichuan",
    icon: "🐼",
    count: "2 experiences",
    tags: ["Hotpot", "Ink painting", "Tea"],
    href: "/workshops?region=sichuan",
  },
];

export const metadata = {
  title: "Cities · Craft Routes",
  description: "Workshops in Dali, Yunnan and Sichuan.",
};

export default function CitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-ink">Regions</h1>
      <p className="mt-2 text-muted">
        Experiences currently available in Dali, Yunnan and Sichuan.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
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
            <p className="mt-1 text-sm text-muted">{city.count}</p>
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

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-cream/50 p-6 text-center">
          <span className="text-2xl" aria-hidden>
            📍
          </span>
          <p className="mt-3 font-medium text-muted">More coming</p>
          <p className="mt-1 text-sm text-muted">Chengdu · Lijiang · Jingdezhen</p>
          <span className="mt-3 rounded-full bg-line px-3 py-1 text-xs font-medium text-muted">
            2025
          </span>
        </div>
      </div>
    </div>
  );
}
