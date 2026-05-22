const reviews = [
  {
    quote:
      "The indigo afternoon in Xizhou felt like a design residency, not tourism. Yang Mei spoke about cloth the way we speak about colour in London.",
    name: "Sophie T.",
    meta: "Textile designer · London · Bai indigo",
    rating: 5,
  },
  {
    quote:
      "I came for tea culture and left with a story about the Tea Horse Road I still tell at dinner parties. Slow, literary, unhurried.",
    name: "James H.",
    meta: "Writer · Edinburgh · Mountain tea",
    rating: 5,
  },
  {
    quote:
      "Chengdu teahouse first, then cooking in Zhang's kitchen — community feeling, not a spice challenge. Exactly the China I wanted to see.",
    name: "Emma R.",
    meta: "Photographer · Bristol · Tea house afternoon",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-line bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
          Notes from guests
        </p>
        <h2 className="mt-2 text-center font-display text-2xl font-bold text-ink sm:text-3xl">
          For people who travel with curiosity, not a checklist
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-xl border border-line bg-cream/50 p-6"
            >
              <p className="text-brand-600" aria-hidden>
                {"★".repeat(r.rating)}
              </p>
              <p className="mt-4 text-sm italic leading-relaxed text-ink/90">
                &ldquo;{r.quote}&rdquo;
              </p>
              <p className="mt-4 font-semibold text-ink">{r.name}</p>
              <p className="text-sm text-muted">{r.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
