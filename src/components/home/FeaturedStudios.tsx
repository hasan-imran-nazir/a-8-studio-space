import StudioCard from "@/components/home/StudioCard";
import { auth } from "@/lib/auth";
import type { Studio } from "@/types/studio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

async function getFeaturedStudios(): Promise<Studio[]> {
  let token: string | undefined;

  try {
    const reqHeaders = await headers();
    const result = await auth.api.getToken({ headers: reqHeaders });
    token = result?.token;
  } catch {
    // Not signed in: public studios can still be fetched below.
  }

  try {
    const res = await fetch("http://localhost:8000/studios", {
      method: "GET",
      cache: "no-store",
      headers: token ? { authorization: `Bearer ${token}` } : undefined,
    });

    if (!res.ok) return [];

    const allStudios: Studio[] = await res.json();
    return Array.isArray(allStudios) ? allStudios.slice(0, 6) : [];
  } catch (error) {
    console.error("Failed to fetch featured studios:", error);
    return [];
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section
      id="featured-studios"
      className="border-y border-slate-200/70 bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 shadow-sm sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-blue-600" />
            Curated Portfolios
          </span>

          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Featured Studios
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Hand-picked production spaces with verified amenities, transparent
            pricing, and instant booking options.
          </p>
        </div>
        {studios.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio, index) => (
              <StudioCard key={index} studio={studio} />
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
            No studios are available right now. Please check back soon.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-slate-800 shadow-xs transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Explore all 1,200+ studios
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
