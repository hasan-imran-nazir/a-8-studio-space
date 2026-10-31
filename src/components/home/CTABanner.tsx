import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-800 to-slate-900 px-6 py-12 shadow-2xl shadow-slate-900/20 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-sky-400/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-24 size-72 rounded-full bg-amber-400/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-100 backdrop-blur-sm sm:text-[11px]">
                <span className="size-1.5 rounded-full bg-amber-400" />
                Creator &amp; Host Network
              </span>

              <h2 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Ready to Book or Monetize Your Studio?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100/80 sm:text-base">
                Join thousands of professional directors, photographers, and
                spatial venue hosts building the next wave of iconic
                productions.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0 lg:flex-col xl:flex-row">
              <Link
                href="/studios"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-amber-400 px-7 font-heading text-sm font-semibold text-amber-950 shadow-sm transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Find a Studio Today
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/add-studio"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-7 font-heading text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <Plus className="size-4" />
                List Your Space
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
