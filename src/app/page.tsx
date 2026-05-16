import Image from "next/image";
import Link from "next/link";
import { WorkshopCard } from "@/components/workshops/WorkshopCard";
import { getFeaturedWorkshops } from "@/lib/data/workshops";

export default async function HomePage() {
  const featured = await getFeaturedWorkshops();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-earth-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">
            Dali & Sichuan · China
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Authentic workshops for curious travelers
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-100">
            Book hands-on cultural experiences — tie-dye, pottery, Sichuan
            cooking, tea ceremonies, and mountain hikes — with English-speaking
            local hosts.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/workshops" className="btn-primary !bg-white !text-brand-800 hover:!bg-brand-50">
              Browse workshops
            </Link>
            <Link href="/workshops?region=dali" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">
              Explore Dali
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { title: "English-friendly", desc: "Every host speaks English and welcomes first-time visitors." },
            { title: "Small groups", desc: "Workshops capped at 8–12 guests for a personal experience." },
            { title: "Secure booking", desc: "Pay safely with Stripe. Free cancellation 48 hours ahead." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-earth-200/60">
              <h3 className="font-semibold text-earth-900">{item.title}</h3>
              <p className="mt-2 text-sm text-earth-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-earth-900">
                Featured workshops
              </h2>
              <p className="mt-2 text-earth-600">
                Our most popular experiences for international guests
              </p>
            </div>
            <Link href="/workshops" className="hidden text-sm font-semibold text-brand-700 hover:text-brand-800 sm:block">
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
          <Link href="/workshops" className="mt-8 block text-center text-sm font-semibold text-brand-700 sm:hidden">
            View all workshops →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80"
              alt="Sichuan cuisine"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Two incredible regions
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-earth-900">
              Dali&apos;s lakeside crafts & Sichuan&apos;s fiery flavors
            </h2>
            <p className="mt-4 text-earth-600">
              In Dali, explore Bai minority traditions along Erhai Lake — tie-dye,
              pottery, and ancient village hikes. In Sichuan, dive into world-famous
              cuisine, ink painting, tea culture, and panda encounters.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/workshops?region=dali" className="btn-primary">
                Dali workshops
              </Link>
              <Link href="/workshops?region=sichuan" className="btn-secondary">
                Sichuan workshops
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
