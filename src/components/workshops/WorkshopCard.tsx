import Link from "next/link";
import type { Workshop } from "@/types";
import { getWorkshopCity } from "@/lib/cities";
import { formatPrice } from "@/lib/format";
import {
  regionPastelBg,
  workshopBadge,
  workshopCityLabel,
  workshopRating,
} from "@/lib/workshop-meta";
import { WorkshopCardImage } from "@/components/workshops/WorkshopCardImage";

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const badge = workshopBadge(workshop.slug, workshop.featured);
  const rating = workshopRating(workshop.id);
  const pastel = regionPastelBg(workshop.region);
  const city = getWorkshopCity(workshop.slug, workshop.region);

  return (
    <Link href={`/workshops/${workshop.slug}`} className="card-minglu group block">
      <WorkshopCardImage
        slug={workshop.slug}
        title={workshop.title}
        imageUrl={workshop.image_url}
        pastelClass={pastel}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {workshopCityLabel(city)}
          </p>
          {badge && (
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${badge.className}`}
            >
              {badge.label}
            </span>
          )}
        </div>

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
