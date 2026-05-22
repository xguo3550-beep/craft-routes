const steps = [
  {
    title: "Choose a gathering",
    desc: "Five hosted afternoons with vetted local hosts.",
  },
  {
    title: "Reserve your place",
    desc: "Pick a date and the size of your group.",
  },
  {
    title: "Spend the afternoon",
    desc: "Tea, indigo, clay, or village pace — unhurried, conversational.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
        How it works
      </h2>
      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
              {i + 1}
            </div>
            <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
