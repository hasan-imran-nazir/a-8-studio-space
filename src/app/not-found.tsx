import Link from "next/link";
import { ArrowRight, Compass, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-background px-4 py-16 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shadow-sm sm:text-[11px]">
          <span className="size-1.5 rounded-full bg-amber-500" />
          Error 404
        </span>

        <p
          aria-hidden="true"
          className="mt-6 bg-gradient-to-br from-foreground via-foreground/70 to-foreground/30 bg-clip-text font-heading text-7xl font-bold tracking-tight text-transparent sm:text-8xl"
        >
          404
        </p>

        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          This set is still under construction
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
          The page you&apos;re looking for has moved, wrapped, or never made it
          past pre-production. Let&apos;s get you back to the studio floor.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-11 gap-2 font-heading">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 gap-2 font-heading"
          >
            <Link href="/studios">
              <Compass className="size-4" />
              Explore Studios
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:gap-6">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            Popular destinations
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/studios"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-blue-700 hover:underline dark:hover:text-blue-400"
            >
              Browse spaces
            </Link>
            <Link
              href="/login"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-blue-700 hover:underline dark:hover:text-blue-400"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-blue-700 hover:underline dark:hover:text-blue-400"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
