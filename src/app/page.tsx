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

        <div className="mt-10 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Most loved experiences
          </h2>
          <Link
            href="/workshops"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            {all.length} workshops across Dali&apos;s lakeside crafts and
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
