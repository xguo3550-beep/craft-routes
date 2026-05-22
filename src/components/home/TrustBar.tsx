import { POSITIONING } from "@/lib/brand";

export function TrustBar() {
  const items = [
    POSITIONING.groupSize,
    "Thoughtful pacing",
    "Hosts chosen for depth",
  ];

  return (
    <section className="border-y border-line bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-6">
            {i > 0 && (
              <span className="hidden h-1 w-1 rounded-full bg-brand-600 sm:inline-block" />
            )}
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-600" />
              {item}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
