import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME, siteTitle } from "@/lib/brand";

const values = [
  {
    icon: "👥",
    title: "Small groups",
    text: "Most gatherings welcome up to six people — enough room to listen, ask, and stay unhurried.",
  },
  {
    icon: "🍵",
    title: "Thoughtful pacing",
    text: "Afternoons built around conversation, craft, and the rhythm of the place — not a timetable of sights.",
  },
  {
    icon: "🏺",
    title: "Depth over scale",
    text: "We list fewer hosts and protect their time. Each gathering is chosen for how they work, not how many seats they fill.",
  },
  {
    icon: "🤝",
    title: "Fair to hosts",
    text: "Pricing reflects real preparation and hospitality — so artisans and tea makers can host well, not often.",
  },
];

const team = [
  { initials: "YL", name: "Yuru L.", role: "Founder", color: "bg-pink-100 text-pink-800" },
  { initials: "MZ", name: "Ming Zhang", role: "Head of Hosts", color: "bg-emerald-100 text-emerald-800" },
  { initials: "SC", name: "Sarah Chen", role: "Operations", color: "bg-blue-100 text-blue-800" },
  { initials: "JW", name: "James Wu", role: "Design & Product", color: "bg-violet-100 text-violet-800" },
];

export const metadata = {
  title: siteTitle("About"),
  description: `${SITE_NAME} — hosted cultural gatherings with local hosts in Dali and Sichuan.`,
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
            {SITE_NAME} connects travellers with local artists, tea makers, village
            cooks, and craftspeople — for afternoons in homes, studios, and
            courtyards across Dali and Sichuan.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Why we built this</h2>
          <p className="mt-4 leading-relaxed text-muted">
            The moments that stay with you are often small: folding bao with a
            grandmother, dipping indigo cloth, learning gongfu tea from someone who
            studied for years. We started {SITE_NAME} to make those afternoons easier
            to find — and to host well.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            We list a handful of gatherings at a time. Every host is vetted in person
            or through someone we trust on the ground.
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
            Are you a chef, artist, or craftsperson in Dali or Sichuan?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/signup?role=host" className="btn-primary">
              Sign up as a host
            </Link>
            <Link href="/signup?role=customer" className="btn-secondary">
              Create an account
            </Link>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
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
