import { Suspense } from "react";
import { WorkshopCard } from "@/components/workshops/WorkshopCard";
import { RegionFilter } from "@/components/workshops/RegionFilter";
import { getWorkshops } from "@/lib/data/workshops";
import { regionLabel } from "@/lib/format";

interface PageProps {
  searchParams: { region?: string };
}

export default async function WorkshopsPage({ searchParams }: PageProps) {
  const { region } = searchParams;
  const workshops = await getWorkshops(region);
  const title =
    region && region !== "all"
      ? `Workshops in ${regionLabel(region)}`
      : "All Workshops";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-earth-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-earth-600">
          {workshops.length} experiences available. All workshops include
          English instruction and small-group settings.
        </p>
      </div>

      <Suspense fallback={<div className="mt-8 h-10" />}>
        <div className="mt-8">
          <RegionFilter />
        </div>
      </Suspense>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>

      {workshops.length === 0 && (
        <p className="mt-12 text-center text-earth-500">
          No workshops found in this region.
        </p>
      )}
    </div>
  );
}
