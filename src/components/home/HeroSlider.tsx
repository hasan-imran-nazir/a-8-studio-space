"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Plus,
  Shield,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  title: string;
  location: string;
  price: string;
  unit: string;
  category: string;
  status: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: "Industrial Daylight Loft",
    location: "Downtown LA",
    price: "$95",
    unit: "/hr",
    category: "Photo Studio",
    status: "Instant Confirmation",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Cyclorama Film Stage",
    location: "Brooklyn NY",
    price: "$160",
    unit: "/hr",
    category: "Film Stage",
    status: "Instant Confirmation",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Dolby Atmos Podcast Suite",
    location: "Austin TX",
    price: "$80",
    unit: "/hr",
    category: "Podcast Room",
    status: "Instant Confirmation",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80",
  },
];

const proofPoints = [
  {
    label: "4,200+ Verified Studios",
    icon: CheckCircle,
    iconClassName: "text-emerald-300",
  },
  {
    label: "4.9/5 Average Rating",
    icon: Star,
    iconClassName: "fill-amber-300 text-amber-300",
  },
  {
    label: "$1M Damage Guarantee",
    icon: Shield,
    iconClassName: "text-sky-300",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-900 via-blue-800 to-slate-900 py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-128 rounded-full bg-sky-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 size-112 rounded-full bg-blue-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-100 backdrop-blur-sm sm:text-[11px]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Architectural Studio Marketplace
            </span>

            <h1 className="mt-6 max-w-2xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Find Your Perfect{" "}
              <span className="bg-linear-to-r from-sky-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Creative Space
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100/80 sm:text-lg">
              Book professional studios for photography, film, podcast, and
              music by the hour with zero hidden fees.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/studios"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 font-heading text-sm font-semibold text-slate-900 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
              >
                Explore Studios
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/host"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 font-heading text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
              >
                <Plus className="size-4" />
                Host Your Space
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {proofPoints.map(({ label, icon: Icon, iconClassName }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-blue-100 backdrop-blur-sm sm:text-[11px]"
                >
                  <Icon className={cn("size-3.5 shrink-0", iconClassName)} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[1.75rem] border border-white/10 bg-white/3"
            />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl shadow-blue-950/60">
              <div className="relative aspect-4/3">
                {slides.map((slide, index) => {
                  const active = index === currentSlide;

                  return (
                    <div
                      key={slide.title}
                      aria-hidden={!active}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        active
                          ? "opacity-100"
                          : "pointer-events-none opacity-0",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out",
                          active ? "scale-105" : "scale-100",
                        )}
                        style={{ backgroundImage: `url("${slide.image}")` }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/45 to-slate-950/10" />

                      <span className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-slate-950/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        {slide.category}
                      </span>

                      <div className="absolute inset-x-4 bottom-4 z-10 rounded-xl border border-white/15 bg-slate-950/55 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h2 className="truncate font-heading text-lg font-semibold text-white sm:text-xl">
                              {slide.title}
                            </h2>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-blue-100/75">
                              <MapPin className="size-3.5 shrink-0" />
                              {slide.location}
                            </p>
                          </div>

                          <p className="shrink-0 text-right font-mono text-lg font-bold text-white">
                            {slide.price}
                            <span className="text-xs font-medium text-blue-100/60">
                              {slide.unit}
                            </span>
                          </p>
                        </div>

                        <div className="mt-3 flex items-center gap-1.5 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300">
                          <CheckCircle className="size-3.5 shrink-0" />
                          {slide.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    aria-label={`Go to ${slide.title}`}
                    aria-current={
                      index === currentSlide ? "true" : undefined
                    }
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index === currentSlide
                        ? "w-8 bg-white"
                        : "w-1.5 bg-white/35 hover:bg-white/60",
                    )}
                  />
                ))}
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-blue-100/60">
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous studio"
                  onClick={goToPrevious}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next studio"
                  onClick={goToNext}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
