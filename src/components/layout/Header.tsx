"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/workshops", label: "All Workshops" },
  { href: "/workshops?region=dali", label: "Dali" },
  { href: "/workshops?region=sichuan", label: "Sichuan" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-earth-200/80 bg-earth-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            CR
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-earth-900">
            Craft Routes
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-earth-700 transition hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/workshops" className="btn-primary !py-2 !px-5 text-xs">
            Book a Workshop
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-earth-700 md:hidden"
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
        <nav className="border-t border-earth-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-earth-800 hover:bg-earth-50"
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
              Book a Workshop
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
