"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  CalendarDays,
  Trash2,
  Sparkles,
  AlertCircle,
  Loader2,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import StudioCard from "@/components/home/StudioCard";
import { authClient } from "@/lib/auth-client";
import type { Studio } from "@/types/studio";

interface Booking extends Studio {
  _id: string;
  bookingDate?: string;
  userId?: string;
  userName?: string;
  email?: string;
  userImage?: string;
  createdAt?: string;
}

export default function MyBookingsPage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/my-bookings/${user.email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        const userBookings = Array.isArray(data)
          ? data.filter(
              (item: Booking) =>
                item.email?.toLowerCase() === user.email.toLowerCase()
            )
          : [];

        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Could not load bookings. Please ensure the backend is running.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user?.email]);

  const handleCancelClick = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!bookingToDelete) return;
    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:8000/bookings/${bookingToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking on server.");
      }

      setBookings((prev) => prev.filter((b) => b._id !== bookingToDelete));
      toast.success("Booking cancelled successfully!");
    } catch {
      setBookings((prev) => prev.filter((b) => b._id !== bookingToDelete));
      toast.success("Booking removed from your list!");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
    }
  };

  const handleCancelDismiss = () => {
    if (isDeleting) return;
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  if (isAuthPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <Loader2 className="size-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
        <Card className="w-full max-w-md border-slate-200 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-blue-50 p-4 text-blue-900">
              <LogIn className="size-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
              Sign In to View Bookings
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              You must be logged in to view and manage your studio bookings.
            </p>
            <Link href="/login" className="mt-6 w-full">
              <Button className="w-full bg-slate-900 font-heading font-semibold text-white hover:bg-slate-800">
                Log In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ৩. সবশেষে চেক করুন ডেটা লোড হচ্ছে কিনা (এখন আমরা নিশ্চিত যে ইউজার লগইন করা আছে)
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <Loader2 className="size-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 shadow-sm">
              <span className="size-1.5 rounded-full bg-emerald-600" />
              Client Dashboard
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Bookings
            </h1>
            <p className="mt-2 text-slate-500">
              Manage your reserved creative studio spaces and upcoming sessions.
            </p>
          </div>

          <Link href="/studios">
            <Button className="h-11 gap-2 bg-slate-900 font-heading font-semibold text-white hover:bg-slate-800">
              <Sparkles className="size-4" />
              Explore More Studios
            </Button>
          </Link>
        </div>

        {/* Bookings Grid */}
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {/* Booking Date / Session Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Calendar className="size-3.5 text-blue-900" />
                    <span>
                      Session:{" "}
                      <strong className="text-slate-900">
                        {booking.bookingDate || "Date confirmed"}
                      </strong>
                    </span>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                    Confirmed
                  </span>
                </div>

                {/* StudioCard Component */}
                <div className="flex-1">
                  <StudioCard
                    studio={booking}
                    className="rounded-none border-0 shadow-none hover:shadow-none"
                  />
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4">
                  <Link
                    href={`/studios/${booking.id || booking._id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-blue-700 hover:text-blue-900"
                  >
                    View Studio Details
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-red-200 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleCancelClick(booking._id)}
                  >
                    <Trash2 className="size-3.5" />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="border-dashed border-slate-300 bg-white">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-4">
                <CalendarDays className="size-12 text-slate-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-900">
                No bookings found
              </h3>
              <p className="mt-2 max-w-md text-slate-500">
                You haven&apos;t booked any studio sessions yet. Browse our
                handpicked spaces and reserve the right environment for your
                project.
              </p>
              <Link href="/studios" className="mt-6">
                <Button className="gap-2 bg-slate-900 font-heading font-semibold text-white hover:bg-slate-800">
                  <Sparkles className="size-4" />
                  Explore Studios
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Cancel Booking Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="size-5 text-red-600" />
              </div>
              <AlertDialogTitle className="font-heading text-xl">
                Cancel Booking?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this studio session? This action
                will remove the booking from your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isDeleting}
                onClick={handleCancelDismiss}
              >
                Keep Booking
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isDeleting}
                onClick={handleCancelConfirm}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? "Cancelling..." : "Cancel Booking"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}