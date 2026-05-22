const steps = [
  {
    title: "Choose a salon",
    desc: "Five curated experiences — vetted hosts, premium pricing, max six guests.",
  },
  {
    title: "Reserve your place",
    desc: "Secure checkout. You are buying atmosphere and host time, not a discount tour.",
  },
  {
    title: "Spend the afternoon",
    desc: "Tea, indigo, clay, or village pace — conversational, unhurried, human scale.",
  },
  {
    title: "Return changed",
    desc: "The kind of memory creative professionals pay for — and share quietly.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
        How it works
      </h2>
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
