const reviews = [
  {
    quote:
      "The tie-dye workshop in Xizhou was the highlight of our Yunnan trip. Yang Mei explained every step in perfect English.",
    name: "Sophie T.",
    meta: "London · Bai tie-dye, Dali",
    rating: 5,
  },
  {
    quote:
      "Hotpot class in Chengdu felt like cooking with family. We still use Chef Zhang's sauce recipe at home.",
    name: "Marcus L.",
    meta: "Berlin · Sichuan hotpot",
    rating: 5,
  },
  {
    quote:
      "Small group, beautiful lake ride, and I shipped my pottery home. Craft Routes made booking effortless.",
    name: "Emma R.",
    meta: "Sydney · Erhai cycling & pottery",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-line bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
          What guests say
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
