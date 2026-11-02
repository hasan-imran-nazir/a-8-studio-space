"use client";

import { useState } from "react";
import { Calendar, Clock, Shield, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Studio } from "@/types/studio";
import { authClient } from "@/lib/auth-client";

const BookingCard = ({ studio }: { studio: Studio }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const hourlyRate = Number(studio.hourlyRate ?? studio.price ?? 0);
  const securityDeposit = Number(studio.securityDeposit ?? 0);
  const minHours = 4;
  const estimatedTotal = hourlyRate * minHours + securityDeposit;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const bookingDate =
      (form.elements.namedItem("bookingdate") as HTMLInputElement)?.value ||
      selectedDate;

    const data = {
      userId: user?.id,
      userName: user?.name,
      email: user?.email,
      userImage: user?.image,
      bookingDate,
      ...studio,
    };

    const res = await fetch("http://localhost:8000/add-booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const bookingData = await res.json();
    console.log(bookingData);
  };

  return (
    <div className="lg:col-span-4">
      <Card className="sticky top-24 border-slate-200 shadow-xl">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-bold tracking-tight text-blue-900">
                ${hourlyRate}
              </span>
              <span className="text-slate-500">/ hour</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
            <Clock className="size-4 text-blue-900" />
            <span>Max Capacity: {studio.maxCapacity ?? "N/A"} people</span>
          </div>

          <div className="space-y-3 border-y border-slate-100 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                ${hourlyRate} × {minHours} hrs (min)
              </span>
              <span className="font-medium text-slate-900">
                ${hourlyRate * minHours}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Security Deposit</span>
              <span className="font-medium text-slate-900">
                ${securityDeposit}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
              <span className="font-heading font-bold text-slate-900">
                Estimated Total
              </span>
              <span className="font-heading text-xl font-bold text-blue-900">
                ${estimatedTotal}
              </span>
            </div>
          </div>

          <form onSubmit={handleBooking}>
            <div className="space-y-2">
              <Label
                htmlFor="booking-date"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                <Calendar className="size-3.5 text-blue-900" />
                Select Date
              </Label>
              <Input
                id="booking-date"
                name="bookingdate"
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-11 cursor-pointer bg-white text-slate-900"
                required
              />
            </div>

            <Button
              type="submit"
              className="mt-4.5 h-12 w-full bg-amber-500 font-heading text-base font-bold text-white hover:bg-amber-600"
            >
              <Sparkles className="mr-2 size-5" />
              Request to Book
            </Button>
          </form>

          <div className="space-y-2 pt-2 text-center">
            <p className="text-xs text-slate-500">
              You won&apos;t be charged yet
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-700">
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
