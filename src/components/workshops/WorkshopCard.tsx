import Image from "next/image";
import Link from "next/link";
import type { Workshop } from "@/types";
import { formatPrice, regionLabel } from "@/lib/format";

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  return (
    <Link href={`/workshops/${workshop.slug}`} className="card group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={workshop.image_url}
          alt={workshop.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            workshop.region === "dali"
              ? "bg-brand-600 text-white"
              : "bg-earth-700 text-white"
          }`}
        >
          {regionLabel(workshop.region)}
        </span>
        {workshop.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-earth-900">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-earth-900 group-hover:text-brand-700">
          {workshop.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-earth-600">
          {workshop.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-earth-500">
            {workshop.duration_hours}h · {workshop.location}
          </span>
          <span className="font-semibold text-brand-700">
            {formatPrice(workshop.price_cents, workshop.currency)}
          </span>
        </div>
      </div>
    </Link>
  );
}
