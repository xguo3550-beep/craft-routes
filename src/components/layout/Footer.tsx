import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-earth-200 bg-earth-900 text-earth-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Craft Routes
            </p>
            <p className="mt-2 text-sm text-earth-400">
              Authentic cultural workshops in Dali and Sichuan, curated for
              international travelers.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/workshops" className="hover:text-white">
                  All Workshops
                </Link>
              </li>
              <li>
                <Link href="/workshops?region=dali" className="hover:text-white">
                  Dali, Yunnan
                </Link>
              </li>
              <li>
                <Link href="/workshops?region=sichuan" className="hover:text-white">
                  Sichuan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <p className="mt-3 text-sm text-earth-400">
              hello@craftroutes.com
              <br />
              We reply within 24 hours in English.
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-earth-800 pt-6 text-center text-xs text-earth-500">
          © {new Date().getFullYear()} Craft Routes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
