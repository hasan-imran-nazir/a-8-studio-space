import Link from "next/link";
import { Aperture, Menu, X } from "lucide-react";
import AuthButtons from "@/components/layout/AuthButtons";
import ThemeToggle from "@/components/layout/ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

const navLink =
  "border-b-2 border-transparent px-3 py-2 font-heading text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground";

const mobileNavLink =
  "rounded-md border-l-2 border-transparent px-3 py-2.5 font-heading text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
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
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className={navLink}>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <AuthButtons />
        </div>

        <details className="group md:hidden">
          <summary
            className="inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent [&::-webkit-details-marker]:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="size-5 group-open:hidden" />
            <X className="hidden size-5 group-open:block" />
          </summary>

          <div className="absolute inset-x-0 top-16 border-t border-border bg-background shadow-sm">
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
              aria-label="Mobile navigation"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={mobileNavLink}
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
                <span className="font-heading text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Theme
                </span>
                <ThemeToggle />
              </div>

              <div className="mt-3 border-t border-border pt-4">
                <AuthButtons className="w-full" />
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
