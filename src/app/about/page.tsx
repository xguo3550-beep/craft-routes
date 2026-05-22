import Link from "next/link";

const values = [
  {
    icon: "🤝",
    title: "Authentic connection",
    text: "No scripts. Real hosts sharing what they genuinely love in Dali and Sichuan.",
  },
  {
    icon: "🌱",
    title: "Fair to hosts",
    text: "Hosts keep the majority of every booking. We take a small platform fee.",
  },
  {
    icon: "🔍",
    title: "Quality over scale",
    text: "We'd rather have brilliant hosts than hundreds of mediocre listings.",
  },
  {
    icon: "♿",
    title: "Accessible",
    text: "Every experience notes language, dietary needs, and accessibility where relevant.",
  },
];

const team = [
  { initials: "YL", name: "Yuru L.", role: "Founder", color: "bg-pink-100 text-pink-800" },
  { initials: "MZ", name: "Ming Zhang", role: "Head of Hosts", color: "bg-emerald-100 text-emerald-800" },
  { initials: "SC", name: "Sarah Chen", role: "Operations", color: "bg-blue-100 text-blue-800" },
  { initials: "JW", name: "James Wu", role: "Design & Product", color: "bg-violet-100 text-violet-800" },
];

export const metadata = {
  title: "About · Craft Routes",
  description: "Authentic cultural workshops in Dali and Sichuan for international visitors.",
};

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-line bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Our story
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            The best way to understand a place is through its people
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Craft Routes connects foreign visitors with local artists, chefs, and
            craftspeople for workshops in homes and studios across Dali, Yunnan and
            Sichuan — not behind glass, but at the kitchen table and in the courtyard.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Why we built this</h2>
          <p className="mt-4 leading-relaxed text-muted">
            China is reopening to curious travellers who want more than a checklist of
            sights. We started Craft Routes because the moments that stay with you are
            often small: folding bao with a grandmother, dipping indigo cloth, or
            learning gongfu tea from someone who studied for years.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Every host is personally vetted. We only list experiences we would send our
            own family to.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-ink">Our values</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-line bg-white p-6 shadow-sm"
              >
                <span className="text-2xl" aria-hidden>
                  {v.icon}
                </span>
                <h3 className="mt-3 font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-ink">The team</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-line bg-white p-5 text-center"
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold ${member.color}`}
                >
                  {member.initials}
                </div>
                <p className="mt-3 font-semibold text-ink">{member.name}</p>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-xl border border-line bg-cream p-8 text-center">
          <h2 className="font-display text-xl font-bold text-ink">Work with us</h2>
          <p className="mt-3 text-muted">
            Are you a chef, artist, or craftsperson in Dali or Sichuan? Travel agents
            welcome too.
          </p>
          <a
            href="mailto:hello@craftroutes.com"
            className="btn-primary mt-6 inline-block"
          >
            Get in touch
          </a>
          <p className="mt-6">
            <Link href="/workshops" className="text-sm font-medium text-brand-600 hover:underline">
              Browse experiences →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
