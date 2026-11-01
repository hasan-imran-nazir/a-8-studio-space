"use client";
import { Clock, Shield, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Studio } from "@/types/studio";


const BookingCard = ({ studio }: { studio: Studio }) => {
    return (
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
    );
};

export default BookingCard;