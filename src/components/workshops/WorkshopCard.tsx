import Image from "next/image";
import Link from "next/link";
import type { Workshop } from "@/types";
import { formatPrice } from "@/lib/format";
import {
  regionCityLabel,
  regionPastelBg,
  workshopBadge,
  workshopEmoji,
  workshopRating,
} from "@/lib/workshop-meta";

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const badge = workshopBadge(workshop.slug, workshop.featured);
  const rating = workshopRating(workshop.id);
  const pastel = regionPastelBg(workshop.region);

  return (
    <Link href={`/workshops/${workshop.slug}`} className="card-minglu group block">
      <div className={`relative aspect-[5/4] ${pastel} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-3 overflow-hidden rounded-lg shadow-soft">
          <Image
            src={workshop.image_url}
            alt={workshop.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <span className="absolute right-4 top-4 text-3xl opacity-90 drop-shadow-sm">
          {workshopEmoji(workshop.slug)}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {regionCityLabel(workshop.region)}
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
