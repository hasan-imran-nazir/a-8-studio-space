"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star, Search, Filter, Zap } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Homepage Featured Studios Data Format অনুযায়ী ডেটা
const STUDIOS = [
  {
    id: "sunlit-soho-daylight-loft",
    title: "Sunlit Soho Daylight Loft & Cyc Wall",
    category: "Photo Studio",
    location: "SoHo, Manhattan NY",
    price: 95,
    rating: 4.98,
    reviews: 124,
    sqft: 2400,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sound-stage-a-green-screen",
    title: "Sound Stage A with 30ft Green Screen",
    category: "Film Stage",
    location: "Burbank, CA",
    price: 160,
    rating: 4.95,
    reviews: 88,
    sqft: 4800,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "acoustic-master-podcast-lounge",
    title: "Acoustic Master Audio & Podcast Lounge",
    category: "Podcast Room",
    location: "Nashville, TN",
    price: 75,
    rating: 5.0,
    reviews: 64,
    sqft: 650,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "analog-synthesizer-live-music-suite",
    title: "Analog Synthesizer & Live Music Suite",
    category: "Music Suite",
    location: "Austin, TX",
    price: 110,
    rating: 4.92,
    reviews: 53,
    sqft: 1100,
    instantBook: false,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "minimalist-editorial-concrete-studio",
    title: "Minimalist Editorial Concrete Studio",
    category: "Photo Studio",
    location: "Chicago, IL",
    price: 85,
    rating: 4.97,
    reviews: 91,
    sqft: 1850,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "multi-set-content-creator-lab",
    title: "Multi-Set Content Creator & Streaming Lab",
    category: "Content Lab",
    location: "Atlanta, GA",
    price: 70,
    rating: 4.89,
    reviews: 112,
    sqft: 1400,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ExploreStudiosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredStudios = STUDIOS.filter((studio) => {
    const matchesSearch =
      studio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studio.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || studio.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Filters */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Explore Studios
            </h1>
            <p className="mt-2 text-slate-500">
              Find the perfect space for your next creative project.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search studios..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 size-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Photo Studio">Photo Studio</SelectItem>
                <SelectItem value="Film Stage">Film Stage</SelectItem>
                <SelectItem value="Podcast Room">Podcast Room</SelectItem>
                <SelectItem value="Music Suite">Music Suite</SelectItem>
                <SelectItem value="Content Lab">Content Lab</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Studios Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStudios.map((studio) => (
              <Link
                href={`/studios/${studio.id}`}
                key={studio.id}
                className="group block"
              >
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <Image
                      src={studio.image}
                      alt={studio.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 backdrop-blur-sm">
                      {studio.category}
                    </span>
                    {studio.instantBook && (
                      <span className="absolute left-3 top-12 flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 backdrop-blur-sm">
                        <Zap className="size-3" /> Instant Book
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-700">
                        {studio.title}
                      </h3>
                    </div>
                    <div className="mb-3 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="line-clamp-1">{studio.location}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-slate-900">
                          {studio.rating}
                        </span>
                        <span className="text-xs text-slate-400">
                          ({studio.reviews})
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-heading text-lg font-bold text-blue-900">
                          ${studio.price}
                        </span>
                        <span className="text-xs text-slate-500"> / hr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center">
            <Search className="mb-4 size-12 text-slate-300" />
            <h3 className="font-heading text-xl font-semibold text-slate-900">
              No studios found
            </h3>
            <p className="mt-2 text-slate-500">
              Try adjusting your search or filters.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
