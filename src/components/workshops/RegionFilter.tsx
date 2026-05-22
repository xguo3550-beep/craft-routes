"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CITIES } from "@/lib/cities";

export function RegionFilter({ compact }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  const cityPills = CITIES.filter((c) => c.available).map((c) => ({
    value: c.slug,
    label: c.name,
    href: c.href,
  }));

  const pills = compact
    ? [{ value: "all", label: "All", href: "/workshops" }, ...cityPills.slice(0, 4)]
    : [{ value: "all", label: "All cities", href: "/workshops" }, ...cityPills];

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((cat) => {
        const active =
          cat.value === "all" ? !city : city === cat.value;

        return (
          <Link
            key={`${cat.label}-${cat.href}`}
            href={cat.href}
            className={active ? "pill-active" : "pill-inactive"}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
