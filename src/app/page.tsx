import Link from "next/link";
import { Suspense } from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { TrustBar } from "@/components/home/TrustBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { WorkshopCard } from "@/components/workshops/WorkshopCard";
import { RegionFilter } from "@/components/workshops/RegionFilter";
import { getFeaturedWorkshops, getWorkshops } from "@/lib/data/workshops";

export default async function HomePage() {
  const featured = await getFeaturedWorkshops();
  const all = await getWorkshops();

  return (
    <>
      <HomeHero />
      <TrustBar />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-10" />}>
          <RegionFilter />
        </Suspense>

        <div className="mt-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            Curated for the creative class
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            Five stories from Southwest China
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            Each experience is a host portrait — tea lifestyle, indigo craft,
            lakeside clay, teahouse afternoons, and heritage walking. Quality over
            quantity.
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </section>

      <HowItWorks />
      <Testimonials />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-line bg-white p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold text-ink">
            Two regions, countless stories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {all.length} curated experiences — Dali&apos;s slow craft life and
            Sichuan&apos;s food, art, and tea culture.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/workshops?region=dali" className="btn-primary">
              Explore Dali
            </Link>
            <Link href="/workshops?region=sichuan" className="btn-secondary">
              Explore Sichuan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
