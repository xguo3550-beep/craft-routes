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
          Stories from Southwest China
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.15] text-ink sm:text-5xl lg:text-[3.25rem]">
          A softer, slower, more human version of China
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Curated for designers, tea people, and slow travellers — indigo textiles,
          mountain tea, ceramics, and teahouse life in Yunnan &amp; Sichuan. Not
          Shanghai checklist tourism. Alternative China at kitchen-table scale.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Indigo, tea, ceramics, Chengdu…"
            className="flex-1 rounded-lg border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button type="submit" className="btn-primary shrink-0 px-8">
            Explore
          </button>
        </form>

        <p className="mx-auto mt-6 max-w-lg text-sm text-muted">
          Five curated experiences · English-friendly hosts · Small groups
        </p>

        <div className="mx-auto mt-10 flex flex-wrap justify-center gap-2">
          {["Textiles", "Tea", "Ceramics", "Heritage", "Slow travel"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
