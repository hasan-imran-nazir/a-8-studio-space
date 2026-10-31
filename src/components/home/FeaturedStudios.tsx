"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StudioCard from "@/components/home/StudioCard";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

const studios: Studio[] = [
  {
    id: "sunlit-soho-daylight-loft",
    title: "Sunlit Soho Daylight Loft",
    location: "SoHo, Manhattan",
    price: 95,
    category: "Photo Studio",
    sqft: 2400,
    rating: 4.98,
    instantBook: true,
    naturalLight: true,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sound-stage-a-green-screen",
    title: "Sound Stage A with 30ft Green Screen",
    location: "Burbank, CA",
    price: 160,
    category: "Film Stage",
    sqft: 4800,
    rating: 4.95,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "acoustic-master-podcast-lounge",
    title: "Acoustic Master Audio & Podcast Lounge",
    location: "Nashville, TN",
    price: 75,
    category: "Podcast Room",
    sqft: 650,
    rating: 5,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "analog-synthesizer-live-music-suite",
    title: "Analog Synthesizer & Live Music Suite",
    location: "Austin, TX",
    price: 110,
    category: "Music Suite",
    sqft: 1100,
    rating: 4.92,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "minimalist-editorial-concrete-studio",
    title: "Minimalist Editorial Concrete Studio",
    location: "Chicago, IL",
    price: 85,
    category: "Photo Studio",
    sqft: 1850,
    rating: 4.97,
    instantBook: true,
    naturalLight: true,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "multi-set-content-creator-lab",
    title: "Multi-Set Content Creator & Streaming Lab",
    location: "Atlanta, GA",
    price: 70,
    category: "Content Lab",
    sqft: 1400,
    rating: 4.89,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
  },
];

const filters = [
  { id: "all", label: "All Featured" },
  { id: "instant", label: "Instant Book" },
  { id: "under-100", label: "Under $100/hr" },
  { id: "natural-light", label: "Natural Light" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function FeaturedStudios() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredStudios = studios.filter((studio) => {
    switch (activeFilter) {
      case "instant":
        return studio.instantBook;
      case "under-100":
        return studio.price < 100;
      case "natural-light":
        return studio.naturalLight;
      default:
        return true;
    }
  });

  return (
    <section
      id="featured-studios"
      className="border-y border-slate-200/70 bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 shadow-sm sm:text-[11px]">
              <span className="size-1.5 rounded-full bg-blue-600" />
              Curated Portfolios
            </span>

            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Featured Studios
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Hand-picked production spaces with verified amenities,
              transparent pricing, and instant booking options.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {filters.map((filter) => {
              const active = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                    active
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {filteredStudios.length > 0 ? (
          <div className="mt-8 grid auto-rows-fr grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="font-heading text-lg font-semibold text-slate-900">
              No studios match this filter
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Try another filter or browse the full collection.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="mt-4 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-blue-700 transition-colors hover:text-blue-800"
            >
              Show all studios
            </button>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/studios"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-slate-900 px-6 font-heading text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Explore All Studios
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
