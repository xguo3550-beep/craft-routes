"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HeaderAuth } from "@/components/layout/HeaderAuth";

const navLinks = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  {
    href: "/workshops",
    label: "Experiences",
    match: (p: string) => p.startsWith("/workshops") || p.startsWith("/booking"),
  },
  { href: "/cities", label: "Cities", match: (p: string) => p === "/cities" },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-ink">
          Craft Routes
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = link.match(pathname);
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
          <HeaderAuth />
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-muted md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
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
            <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-cream" onClick={() => setOpen(false)}>
              Sign in
            </Link>
            <Link href="/signup" className="rounded-lg px-3 py-2 text-sm font-medium text-brand-600 hover:bg-cream" onClick={() => setOpen(false)}>
              Sign up
            </Link>
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
