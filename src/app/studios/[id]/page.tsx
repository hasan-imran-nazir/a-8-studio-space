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

interface Review {
  name: string;
  role: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface Host {
  name: string;
  role: string;
  joined: string;
  responseRate: string;
  responseTime: string;
  productions: string;
  avatar: string;
}

interface Amenity {
  name: string;
  icon: string;
}

interface Studio {
  id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  sqft: number;
  capacity: number;
  instantBook: boolean;
  image: string;
  host: Host;
  amenities: Amenity[];
  overview: string;
  reviewsList: Review[];
}

const STUDIOS_DATA: Record<string, Studio> = {
  "sunlit-soho-daylight-loft": {
    id: "sunlit-soho-daylight-loft",
    title: "Sunlit Soho Daylight Loft & Cyc Wall",
    category: "Photo Studio",
    location: "SoHo, Manhattan NY",
    price: 95,
    rating: 4.98,
    reviews: 124,
    sqft: 2400,
    capacity: 35,
    instantBook: true,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    host: {
      name: "Elena Rostova",
      role: "Studio Director & Fashion Producer",
      joined: "2021",
      responseRate: "100%",
      responseTime: "< 15 mins",
      productions: "450+",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    amenities: [
      { name: "24ft Cyclorama Wall", icon: "Sparkles" },
      { name: "WiFi - 1 Gbps Fiber", icon: "Wifi" },
      { name: "Natural Light", icon: "Sun" },
      { name: "Parking Available", icon: "Car" },
      { name: "Kitchen & Lounge", icon: "UtensilsCrossed" },
      { name: "Sound Isolation", icon: "VolumeX" },
      { name: "Makeup Station", icon: "Scissors" },
      { name: "Restroom", icon: "Bath" },
    ],
    overview:
      "Tucked into a landmark cast-iron building in prime Soho, this sun-drenched 2,400-square-foot daylight studio is engineered specifically for commercial film directors, fashion editorial teams, and product photographers who demand uncompromising natural light and complete spatial control. Featuring expansive south- and west-facing arched windows, the space enjoys soft morning luminance transitioning into dramatic, golden sunbeams throughout the afternoon.",
    reviewsList: [
      {
        name: "Marcus Chen",
        role: "Producer, Monolith Creative",
        date: "Oct 2024",
        rating: 5,
        comment:
          "One of the cleanest and most straightforward studios in Lower Manhattan. The natural light between 1pm and 5pm is extraordinary.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      },
      {
        name: "Chloe Aris",
        role: "Fashion Photographer",
        date: "Nov 2024",
        rating: 5,
        comment:
          "The cyclorama wall was in flawless shape—pure white without scuffs. My clients were thoroughly impressed with the lounge setup.",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
};

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

export default async function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studio = STUDIOS_DATA[id];

  if (!studio) {
    notFound();
  }

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
              {studio.instantBook && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  <Sparkles className="size-3" /> Instant Book
                </span>
              )}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              {studio.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-1 text-slate-900 font-medium">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span>{studio.rating}</span>
                <span className="text-slate-500 underline cursor-pointer hover:text-blue-700">
                  ({studio.reviews} verified reviews)
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                <span>{studio.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-emerald-700 font-medium">
                <BadgeCheck className="size-4" />
                <span>Verified Spatial Specs</span>
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
              Saved
            </Button>
          </div>
        </div>

        <div className="relative aspect-21/9 w-full overflow-hidden rounded-xl shadow-sm mb-12 bg-slate-100">
          <Image
            src={studio.image}
            alt={studio.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-10">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <Image
                      src={studio.host.avatar}
                      alt={studio.host.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-900 text-white rounded-full p-1">
                      <BadgeCheck className="size-3.5" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-slate-900">
                      Hosted by {studio.host.name}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {studio.host.role} · Joined {studio.host.joined}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="flex flex-col">
                    <span className="font-heading text-lg font-bold text-blue-900">
                      {studio.host.responseRate}
                    </span>
                    <span className="text-xs text-slate-500">Response rate</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-lg font-bold text-amber-600">
                      {studio.host.responseTime}
                    </span>
                    <span className="text-xs text-slate-500">Response time</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-lg font-bold text-emerald-700">
                      {studio.host.productions}
                    </span>
                    <span className="text-xs text-slate-500">Productions</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-blue-900 font-semibold block mb-4">
                  Spatial Architecture & Technical Specs
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50">
                    <Camera className="size-5 text-blue-900" />
                    <span className="text-xs text-slate-500">Floor Area</span>
                    <span className="font-heading text-sm font-semibold text-slate-900">
                      {studio.sqft.toLocaleString()} sq ft
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50">
                    <Users className="size-5 text-blue-900" />
                    <span className="text-xs text-slate-500">Capacity</span>
                    <span className="font-heading text-sm font-semibold text-slate-900">
                      {studio.capacity} Crew Max
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50">
                    <Clock className="size-5 text-blue-900" />
                    <span className="text-xs text-slate-500">Min Booking</span>
                    <span className="font-heading text-sm font-semibold text-slate-900">
                      4 Hours
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50">
                    <Sun className="size-5 text-blue-900" />
                    <span className="text-xs text-slate-500">Lighting</span>
                    <span className="font-heading text-sm font-semibold text-slate-900">
                      Natural
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section className="space-y-4">
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                About the Space
              </h2>
              <p className="text-slate-600 leading-relaxed">{studio.overview}</p>
            </section>

            <section className="space-y-6">
              <h2 className="font-heading text-xl font-semibold text-slate-900">
                Included Equipment & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {studio.amenities.map((amenity) => {
                  const Icon = ICON_MAP[amenity.icon] || Sparkles;
                  return (
                    <div
                      key={amenity.name}
                      className="p-4 rounded-xl bg-white shadow-sm flex items-start gap-3 border border-slate-100"
                    >
                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900 shrink-0">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-slate-900">
                          {amenity.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">Included</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

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
                  <p className="text-xs text-slate-500">
                    Precise address delivered upon booking confirmation.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-heading text-xl font-semibold text-slate-900">
                    Verified Reviews
                  </h2>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-blue-900 font-heading text-sm font-bold">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    {studio.rating}
                  </div>
                  <span className="text-sm text-slate-500">
                    ({studio.reviews} productions)
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studio.reviewsList.map((review) => (
                  <Card key={review.name} className="border-slate-200 shadow-sm">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-heading text-sm font-semibold text-slate-900">
                              {review.name}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {review.role} · {review.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="size-3.5 fill-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        &quot;{review.comment}&quot;
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <Card className="border-slate-200 shadow-xl sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-3xl font-bold text-blue-900 tracking-tight">
                      ${studio.price}
                    </span>
                    <span className="text-slate-500">/ hour</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">
                      {studio.rating}
                    </span>
                    <span className="text-slate-500">({studio.reviews})</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                  <Clock className="size-4 text-blue-900" />
                  <span>4-hour minimum session booking</span>
                </div>

                <div className="space-y-3 py-3 border-y border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      ${studio.price} × 6 hrs
                    </span>
                    <span className="font-medium text-slate-900">
                      ${studio.price * 6}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Cleaning fee</span>
                    <span className="font-medium text-slate-900">$45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Service fee</span>
                    <span className="font-medium text-slate-900">$35</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-100">
                    <span className="font-heading font-bold text-slate-900">
                      Total (USD)
                    </span>
                    <span className="font-heading text-xl font-bold text-blue-900">
                      ${studio.price * 6 + 45 + 35}
                    </span>
                  </div>
                </div>

                <Button className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-base">
                  <Sparkles className="size-5 mr-2" />
                  Request to Book
                </Button>

                <Button variant="outline" className="w-full">
                  Message Host
                </Button>

                <div className="pt-2 text-center space-y-2">
                  <p className="text-xs text-slate-500">
                    You won&apos;t be charged yet
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <Shield className="size-4" />
                    <span>$1M Host & Guest Protection Included</span>
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