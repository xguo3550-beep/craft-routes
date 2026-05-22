import Link from "next/link";
import type { Workshop } from "@/types";
import { WorkshopCover } from "@/components/workshops/WorkshopCover";
import { cityLabel, getWorkshopCity } from "@/lib/cities";
import { formatPrice } from "@/lib/format";
import { workshopBadge, workshopRating } from "@/lib/workshop-meta";

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const badge = workshopBadge(workshop.slug, workshop.featured);
  const rating = workshopRating(workshop.id);
  const city = getWorkshopCity(workshop.slug, workshop.region);
  return (
    <Link href={`/workshops/${workshop.slug}`} className="card-minglu group block overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        <WorkshopCover
          slug={workshop.slug}
          title={workshop.title}
          region={workshop.region}
          src={workshop.image_url}
          className="transition duration-700 group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent"
          aria-hidden
        />
        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-md px-2 py-0.5 text-xs font-medium shadow-sm ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          {cityLabel(city)}
        </p>

        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink group-hover:text-brand-700">
          {workshop.title}
        </h3>

        <p className="mt-1 text-sm text-muted">
          {workshop.host_name} · Local host
        </p>

        <p className="mt-3 text-base font-bold text-ink">
          {formatPrice(workshop.price_cents, workshop.currency)}
          <span className="text-sm font-normal text-muted"> / person</span>
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm text-muted">
          <span>
            {workshop.duration_hours} hrs · up to {workshop.max_participants}
          </span>
          <span className="font-medium text-brand-600">★ {rating}</span>
        </div>
      </div>
    </Link>
  );
}
