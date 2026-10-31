"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "add Studios", href: "/add-studio" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

const buttonBase =
  "inline-flex h-9 items-center justify-center rounded-md px-4 font-heading text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const buttonOutline = cn(
  buttonBase,
  "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
);

const buttonPrimary = cn(
  buttonBase,
  "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
);

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-slate-900 text-white transition-colors group-hover:bg-slate-700">
            <Aperture className="size-5" strokeWidth={2} />
          </span>
          <span className="font-heading text-lg font-bold tracking-tight">
            StudioSpace
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 px-3 py-2 font-heading text-xs font-medium uppercase tracking-[0.12em] transition-colors",
                  active
                    ? "border-blue-900 font-semibold text-blue-900"
                    : "border-transparent text-slate-600 hover:text-slate-900",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonOutline}>
            Login
          </Link>
          <Link href="/register" className={buttonPrimary}>
            Register
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "rounded-md border-l-2 px-3 py-2.5 font-heading text-sm font-medium uppercase tracking-[0.12em] transition-colors",
                    active
                      ? "border-blue-900 bg-blue-50 font-semibold text-blue-900"
                      : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-4">
              <Link
                href="/login"
                className={cn(buttonOutline, "w-full")}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(buttonPrimary, "w-full")}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
