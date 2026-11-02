
import StudioCard from "@/components/home/StudioCard";
import type { Studio } from "@/types/studio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function FeaturedStudios() {
  const res = await fetch("http://localhost:8000/studios");
  if (!res.ok) {
    throw new Error("Failed to fetch featured studios");
  }
  const allStudios: Studio[] = await res.json();
  const studios = allStudios.slice(0, 6);

  return (
    <section
      id="featured-studios"
      className="border-y border-slate-200/70 bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio, index) => (
            <StudioCard key={index} studio={studio} />
          ))}
        </div>

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
