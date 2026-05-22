import { POSITIONING } from "@/lib/brand";

export function PremiumNote() {
  return (
    <section className="border-t border-line bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
          {POSITIONING.pacing}
        </p>
      </div>
    </section>
  );
}
