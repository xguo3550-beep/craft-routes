"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  { value: "all", label: "All", href: "/workshops" },
  { value: "dali", label: "Dali", href: "/workshops?region=dali" },
  { value: "sichuan", label: "Sichuan", href: "/workshops?region=sichuan" },
  {
    value: "cooking",
    label: "Cooking",
    href: "/workshops?region=sichuan",
  },
  { value: "crafts", label: "Crafts", href: "/workshops?region=dali" },
  { value: "tea", label: "Tea ceremony", href: "/workshops/shuimo-painting-pandas" },
];

export function RegionFilter({ compact }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const region = searchParams.get("region") ?? "all";

  const pills = compact
    ? categories.slice(0, 3)
    : categories;

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((cat) => {
        const active =
          cat.value === "all"
            ? !region || region === "all"
            : region === cat.value;

        return (
          <Link
            key={cat.label}
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
