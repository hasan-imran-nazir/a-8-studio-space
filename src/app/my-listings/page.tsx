"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Edit,
  Trash2,
  MapPin,
  Star,
  Plus,
  Building2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Dummy data (পরবর্তীতে MongoDB থেকে fetch করা হবে - ownerEmail match করে)
const MY_STUDIOS = [
  {
    id: "sunlit-soho-daylight-loft",
    title: "Sunlit Soho Daylight Loft & Cyc Wall",
    category: "Photo Studio",
    location: "SoHo, Manhattan NY",
    price: 95,
    rating: 4.98,
    reviews: 124,
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
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
  },
];

export default function MyListingsPage() {
  const [studios, setStudios] = useState(MY_STUDIOS);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studioToDelete, setStudioToDelete] = useState<string | null>(null);

  const handleDeleteClick = (studioId: string) => {
    setStudioToDelete(studioId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (studioToDelete) {
      setStudios((prev) => prev.filter((studio) => studio.id !== studioToDelete));
      toast.success("Studio deleted successfully!");
    }
    setDeleteDialogOpen(false);
    setStudioToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setStudioToDelete(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 shadow-sm">
              <span className="size-1.5 rounded-full bg-blue-600" />
              Host Dashboard
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Studio Listings
            </h1>
            <p className="mt-2 text-slate-500">
              Manage your listed spaces and track performance.
            </p>
          </div>

          <Link href="/add-studio">
            <Button className="h-11 gap-2 bg-slate-900 hover:bg-slate-800 text-white font-heading font-semibold">
              <Plus className="size-4" />
              Add New Studio
            </Button>
          </Link>
        </div>

        {/* Studios Grid */}
        {studios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <Card
                key={studio.id}
                className="overflow-hidden border-slate-200 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <Image
                    src={studio.image}
                    alt={studio.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 backdrop-blur-sm">
                    {studio.category}
                  </span>
                </div>

                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-slate-900 line-clamp-1">
                      {studio.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="line-clamp-1">{studio.location}</span>
                    </div>
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

                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`/studios/edit/${studio.id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full gap-2 font-heading font-medium"
                      >
                        <Edit className="size-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 font-heading font-medium"
                      onClick={() => handleDeleteClick(studio.id)}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <Card className="border-dashed border-slate-300 bg-white">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-4">
                <Building2 className="size-12 text-slate-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-900">
                No studios listed yet
              </h3>
              <p className="mt-2 max-w-md text-slate-500">
                Start by adding your first creative space and reach thousands of
                creators looking for the perfect venue.
              </p>
              <Link href="/add-studio" className="mt-6">
                <Button className="gap-2 bg-slate-900 hover:bg-slate-800 text-white font-heading font-semibold">
                  <Plus className="size-4" />
                  Add Your First Studio
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="size-5 text-red-600" />
              </div>
              <AlertDialogTitle className="font-heading text-xl">
                Delete Studio?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                studio listing and remove all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDeleteCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Studio
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}