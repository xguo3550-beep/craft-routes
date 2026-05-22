import { Suspense } from "react";
import Link from "next/link";
import { WorkshopCard } from "@/components/workshops/WorkshopCard";
import { RegionFilter } from "@/components/workshops/RegionFilter";
import { getWorkshops } from "@/lib/data/workshops";
import { cityDisplayLabel, isCitySlug } from "@/lib/cities";
import { regionLabel } from "@/lib/format";

interface PageProps {
  searchParams: { region?: string; city?: string; q?: string };
}

export default async function WorkshopsPage({ searchParams }: PageProps) {
  const { region, city, q } = searchParams;
  let workshops = await getWorkshops(region, city);

  if (q?.trim()) {
    const query = q.trim().toLowerCase();
    workshops = workshops.filter(
      (w) =>
        w.title.toLowerCase().includes(query) ||
        w.description.toLowerCase().includes(query) ||
        w.location.toLowerCase().includes(query) ||
        w.host_name.toLowerCase().includes(query) ||
        w.region.includes(query)
    );
  }

  const title =
    city && isCitySlug(city)
      ? `Experiences in ${cityDisplayLabel(city)}`
      : region && region !== "all"
        ? `Experiences in ${regionLabel(region)}`
        : q
          ? `Results for “${q}”`
          : "All experiences";

  return (
    <div className="bg-cream">
      <div className="border-b border-line bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            Craft Routes
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            {workshops.length} experiences · English instruction · Small groups
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-10" />}>
          <RegionFilter />
        </Suspense>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>

        {workshops.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted">No workshops found.</p>
            <Link href="/workshops" className="mt-4 inline-block text-sm font-semibold text-brand-600">
              View all workshops
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
