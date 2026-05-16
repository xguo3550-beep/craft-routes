"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const regions = [
  { value: "all", label: "All Regions" },
  { value: "dali", label: "Dali, Yunnan" },
  { value: "sichuan", label: "Sichuan" },
];

export function RegionFilter() {
  const searchParams = useSearchParams();
  const current = searchParams.get("region") ?? "all";

  return (
    <div className="flex flex-wrap gap-2">
      {regions.map((region) => {
        const href =
          region.value === "all"
            ? "/workshops"
            : `/workshops?region=${region.value}`;
        const active = current === region.value;

        return (
          <Link
            key={region.value}
            href={href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-earth-700 ring-1 ring-earth-200 hover:bg-earth-50"
            }`}
          >
            {region.label}
          </Link>
        );
      })}
    </div>
  );
}
