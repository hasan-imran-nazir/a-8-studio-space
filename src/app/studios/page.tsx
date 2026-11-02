"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Star, Search, Filter, Zap, Loader2 } from "lucide-react";
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
import { API_URL } from "@/lib/api";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number | string;
  imageUrl: string;
  instantBook?: boolean;
  rating?: number;
  reviews?: number;
}

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await fetch(`${API_URL}/studios`, {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch studios");
        }
        const data = await response.json();
        setStudios(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching studios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const filteredStudios = studios.filter((studio) => {
    const matchesSearch =
      studio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studio.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || studio.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Filters */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Explore Studios
            </h1>
            <p className="mt-2 text-muted-foreground">
              Find the perfect space for your next creative project.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
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
                <SelectItem value="Podcast Lounge">Podcast Lounge</SelectItem>
                <SelectItem value="Music Suite">Music Suite</SelectItem>
                <SelectItem value="Art Workshop">Art Workshop</SelectItem>
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
                href={`/studios/${studio._id}`}
                key={studio._id}
                className="group block"
              >
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 backdrop-blur-sm">
                      {studio.category}
                    </span>
                    {studio.instantBook && (
                      <span className="absolute left-3 top-12 flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300 backdrop-blur-sm">
                        <Zap className="size-3" /> Instant Book
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-1 group-hover:text-blue-700 dark:hover:text-blue-400">
                        {studio.title}
                      </h3>
                    </div>
                    <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="line-clamp-1">{studio.location}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-foreground">
                          {studio.rating || 5.0}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({studio.reviews || 0})
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-heading text-lg font-bold text-blue-700 dark:text-blue-300">
                          ${studio.hourlyRate}
                        </span>
                        <span className="text-xs text-muted-foreground"> / hr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted py-20 text-center">
            <Search className="mb-4 size-12 text-muted-foreground/60" />
            <h3 className="font-heading text-xl font-semibold text-foreground">
              No studios found
            </h3>
            <p className="mt-2 text-muted-foreground">
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
