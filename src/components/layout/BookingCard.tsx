"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Loader2, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Studio } from "@/types/studio";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

const BookingCard = ({ studio }: { studio: Studio }) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const hourlyRate = Number(studio.hourlyRate ?? studio.price);
  const securityDeposit = Number(studio.securityDeposit ?? 0);
  const minHours = 4;
  const estimatedTotal = hourlyRate * minHours + securityDeposit;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to request a booking.");
      router.push("/login");
      return;
    }

    const form = e.currentTarget;
    const bookingDate =
      (form.elements.namedItem("bookingdate") as HTMLInputElement)?.value ||
      selectedDate;

    if (!bookingDate) {
      toast.error("Please select a date for your booking.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { _id, ...studioDetails } = studio;
      const data = {
        userId: user?.id,
        userName: user?.name,
        email: user?.email,
        userImage: user?.image,
        bookingDate,
        studioId: _id || studio.id,
        ...studioDetails,
      };

      const res = await authFetch("/add-booking", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to add booking");
      }

      toast.success("Studio booked successfully!");
      router.push("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error((error as { message: string }).message || "Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-4">
      <Card className="sticky top-24 border-border shadow-xl">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
                ${hourlyRate}
              </span>
              <span className="text-muted-foreground">/ hour</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="size-4 text-blue-700 dark:text-blue-300" />
            <span>Max Capacity: {studio.maxCapacity ?? "N/A"} people</span>
          </div>

          <div className="space-y-3 border-y border-border py-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                ${hourlyRate} × {minHours} hrs (min)
              </span>
              <span className="font-medium text-foreground">
                ${hourlyRate * minHours}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Security Deposit</span>
              <span className="font-medium text-foreground">
                ${securityDeposit}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-t border-border pt-3">
              <span className="font-heading font-bold text-foreground">
                Estimated Total
              </span>
              <span className="font-heading text-xl font-bold text-blue-700 dark:text-blue-300">
                ${estimatedTotal}
              </span>
            </div>
          </div>

          <form onSubmit={handleBooking}>
            <div className="space-y-2">
              <Label
                htmlFor="booking-date"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <Calendar className="size-3.5 text-blue-700 dark:text-blue-300" />
                Select Date
              </Label>
              <Input
                id="booking-date"
                name="bookingdate"
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-11 cursor-pointer bg-card text-foreground"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4.5 h-12 w-full bg-amber-500 font-heading text-base font-bold text-white hover:bg-amber-600 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-5" />
                  Request to Book
                </>
              )}
            </Button>
          </form>

          <div className="space-y-2 pt-2 text-center">
            <p className="text-xs text-muted-foreground">
              You won&apos;t be charged yet
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <Shield className="size-4" />
              <span>Secure Booking</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCard;
