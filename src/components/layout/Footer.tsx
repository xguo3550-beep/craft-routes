import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold text-ink">Craft Routes</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Authentic cultural workshops in Dali and Sichuan, curated for
              international travelers.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/workshops" className="hover:text-brand-600">
                  All workshops
                </Link>
              </li>
              <li>
                <Link href="/workshops?region=dali" className="hover:text-brand-600">
                  Dali, Yunnan
                </Link>
              </li>
              <li>
                <Link href="/workshops?region=sichuan" className="hover:text-brand-600">
                  Sichuan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Contact</p>
            <p className="mt-3 text-sm text-muted">
              <a href="mailto:hello@craftroutes.com" className="hover:text-brand-600">
                hello@craftroutes.com
              </a>
              <br />
              We reply within 24 hours in English.
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-line pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} Craft Routes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
