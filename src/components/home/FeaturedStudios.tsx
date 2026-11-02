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
    location: "Greenpoint, Brooklyn",
    price: 85,
    category: "Photo Studio",
    sqft: 1800,
    rating: 4.88,
    instantBook: true,
    naturalLight: true,
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "industrial-high-ceiling-dance-movement-space",
    title: "Industrial High-Ceiling Dance & Movement Space",
    location: "Chicago, IL",
    price: 70,
    category: "Dance Studio",
    sqft: 3200,
    rating: 4.97,
    naturalLight: true,
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
  },
];

const filters = [
  { id: "all", label: "All Studios" },
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
        return Number(studio.price ?? studio.hourlyRate ?? 0) < 100;
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
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Curated Spaces
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Featured Studios
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
              Hand-picked, high-demand spaces vetted for sound, lighting, and
              creative flow.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter studios"
            className="inline-flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-xs"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-heading text-xs font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
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
