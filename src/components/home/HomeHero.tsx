"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HomeHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/workshops?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/workshops");
    }
  }

  return (
    <section className="bg-cream px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
          Authentic China
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.15] text-ink sm:text-5xl lg:text-[3.25rem]">
          Cook, create and connect with the people who call China home
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Hands-on workshops in Dali and Sichuan — tie-dye, pottery, Sichuan
          cooking, tea ceremonies, and mountain trails — with English-speaking
          local hosts.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, workshop or host…"
            className="flex-1 rounded-lg border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button type="submit" className="btn-primary shrink-0 px-8">
            Explore
          </button>
        </form>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { value: "6", label: "Workshops" },
            { value: "6", label: "Local hosts" },
            { value: "4.9", label: "Avg rating" },
            { value: "2", label: "Regions" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-ink sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
