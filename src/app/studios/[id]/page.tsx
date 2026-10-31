import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Share2,
  Heart,
  Shield,
  BadgeCheck,
  Camera,
  Wifi,
  Car,
  UtensilsCrossed,
  Bath,
  Sun,
  VolumeX,
  Sparkles,
  Scissors,
  Users,
  Clock,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Wifi,
  Sun,
  Car,
  UtensilsCrossed,
  VolumeX,
  Scissors,
  Bath,
};

const getIconForAmenity = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("wifi")) return "Wifi";
  if (lower.includes("parking")) return "Car";
  if (lower.includes("kitchen")) return "UtensilsCrossed";
  if (lower.includes("restroom") || lower.includes("bath")) return "Bath";
  if (lower.includes("natural light") || lower.includes("sun")) return "Sun";
  if (lower.includes("sound") || lower.includes("volume")) return "VolumeX";
  if (lower.includes("makeup") || lower.includes("scissors")) return "Scissors";
  if (lower.includes("cyclorama") || lower.includes("sparkles")) return "Sparkles";
  return "Sparkles";
};

export default async function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch EXACTLY from your API. No mock data.
  const response = await fetch(`http://localhost:8000/studios/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  // This is the REAL data from your MongoDB
  const studio = await response.json();

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/studios" className="hover:text-blue-700 transition-colors">
            Studios
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-slate-900 font-medium truncate max-w-50">
            {studio.title}
          </span>
        </nav>

        <div className="mb-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-blue-900 uppercase tracking-wider">
                {studio.category}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              {studio.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                <span>{studio.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm">
              <Share2 className="size-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="size-4 mr-2 text-rose-500 fill-rose-500" />
              Save
            </Button>
          </div>
        </div>

        <div className="relative aspect-21/9 w-full overflow-hidden rounded-xl shadow-sm mb-12 bg-slate-100">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-10">
            
            {/* Host Info (Using real hostName/hostEmail from DB) */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl">
                      {studio.hostName ? studio.hostName.charAt(0).toUpperCase() : "H"}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-blue-900 text-white rounded-full p-1">
                      <BadgeCheck className="size-3.5" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-slate-900">
                      Hosted by {studio.hostName || "Studio Host"}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {studio.hostEmail || "Contact via platform"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overview */}
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                About the Space
              </h2>
              <p className="text-slate-600 leading-relaxed">{studio.overview}</p>
            </section>

            {/* Amenities (Mapped directly from DB array) */}
            <section className="space-y-6">
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                Included Equipment & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {studio.amenities && studio.amenities.map((amenity: string, index: number) => {
                  const iconName = getIconForAmenity(amenity);
                  const Icon = ICON_MAP[iconName] || Sparkles;
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white shadow-sm flex items-start gap-3 border border-slate-100"
                    >
                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900 shrink-0">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-slate-900">
                          {amenity}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Location */}
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                Location
              </h2>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm border border-slate-100">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-slate-900">
                    {studio.location}
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Booking Card */}
          <div className="lg:col-span-4">
            <Card className="border-slate-200 shadow-xl sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-3xl font-bold text-blue-900 tracking-tight">
                      ${studio.hourlyRate}
                    </span>
                    <span className="text-slate-500">/ hour</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                  <Clock className="size-4 text-blue-900" />
                  <span>Max Capacity: {studio.maxCapacity} people</span>
                </div>

                <div className="space-y-3 py-3 border-y border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      ${studio.hourlyRate} × 4 hrs (min)
                    </span>
                    <span className="font-medium text-slate-900">
                      ${Number(studio.hourlyRate) * 4}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Security Deposit</span>
                    <span className="font-medium text-slate-900">${studio.securityDeposit}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-100">
                    <span className="font-heading font-bold text-slate-900">
                      Estimated Total
                    </span>
                    <span className="font-heading text-xl font-bold text-blue-900">
                      ${Number(studio.hourlyRate) * 4 + Number(studio.securityDeposit)}
                    </span>
                  </div>
                </div>

                <Button className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-base">
                  <Sparkles className="size-5 mr-2" />
                  Request to Book
                </Button>

                <div className="pt-2 text-center space-y-2">
                  <p className="text-xs text-slate-500">
                    You won&apos;t be charged yet
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <Shield className="size-4" />
                    <span>Secure Booking</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}