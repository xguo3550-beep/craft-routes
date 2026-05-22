"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", match: "home" as const },
  { href: "/workshops", label: "Workshops", match: "workshops" as const },
  { href: "/workshops?region=dali", label: "Dali", match: "dali" as const },
  { href: "/workshops?region=sichuan", label: "Sichuan", match: "sichuan" as const },
];

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const region = searchParams.get("region");
  const [open, setOpen] = useState(false);

  function isActive(match: string) {
    if (match === "home") return pathname === "/";
    if (match === "workshops")
      return pathname.startsWith("/workshops") && !region;
    if (match === "dali")
      return pathname.startsWith("/workshops") && region === "dali";
    if (match === "sichuan")
      return pathname.startsWith("/workshops") && region === "sichuan";
    return false;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-ink">
          Craft Routes
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.match);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-0.5 text-sm font-medium transition ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand-600" />
                )}
              </Link>
            );
          })}
          <Link href="/workshops" className="btn-primary !rounded-lg !py-2.5 !px-5 text-sm">
            Book now
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-muted md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-cream"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/workshops"
              className="btn-primary mt-2 text-center"
              onClick={() => setOpen(false)}
            >
              Book now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
