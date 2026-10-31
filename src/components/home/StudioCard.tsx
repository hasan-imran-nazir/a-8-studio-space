"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

type StudioCardProps = {
  studio: Studio;
  className?: string;
};

export default function StudioCard({ studio, className }: StudioCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-slate-200">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url("${studio.image}")` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent"
        />

        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col items-start gap-1.5">
          <span className="rounded-full border border-white/15 bg-slate-950/55 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white backdrop-blur-md">
            {studio.category}
          </span>
          {studio.instantBook && (
            <span className="rounded-full bg-amber-400/95 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-950 shadow-sm backdrop-blur-md">
              Instant Book
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={
            isSaved
              ? `Remove ${studio.title} from wishlist`
              : `Save ${studio.title} to wishlist`
          }
          aria-pressed={isSaved}
          onClick={() => setIsSaved((saved) => !saved)}
          className="absolute right-2.5 top-2.5 z-10 flex size-8 items-center justify-center rounded-full border border-white/20 bg-slate-950/35 text-white backdrop-blur-md transition-colors hover:bg-slate-950/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Heart
            className={cn(
              "size-3.5 transition-colors",
              isSaved ? "fill-rose-500 text-rose-500" : "text-white",
            )}
          />
        </button>

        <span className="absolute bottom-2.5 left-2.5 z-10 rounded-full bg-white/90 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-slate-900 shadow-sm backdrop-blur-md">
          {studio.sqft.toLocaleString()} sqft
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="flex min-w-0 items-center gap-1 text-[11px] text-slate-500">
            <MapPin className="size-3 shrink-0" />
            <span className="truncate">{studio.location}</span>
          </p>
          <p className="flex shrink-0 items-center gap-1 font-mono text-[11px] font-medium text-slate-700">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            {studio.rating.toFixed(2)}
          </p>
        </div>

        <h3 className="mt-2 line-clamp-2 min-h-11 font-heading text-base font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
          <Link
            href={`/studios/${studio.id}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            {studio.title}
          </Link>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="font-mono text-base font-bold text-blue-700">
            ${studio.price}
            <span className="ml-0.5 text-[10px] font-medium text-slate-500">
              /hr
            </span>
          </p>
          <Link
            href={`/studios/${studio.id}`}
            className="group/link inline-flex items-center gap-1 font-heading text-[10px] font-semibold uppercase tracking-widest text-slate-900 transition-colors hover:text-blue-700"
          >
            View Details
            <ArrowRight className="size-3 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
