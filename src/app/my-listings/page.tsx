"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StudioCard from "@/components/home/StudioCard";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";
import type { Studio } from "@/types/studio";

export default function MyListingsPage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const user = session?.user;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyStudios = async () => {
      try {
        const response = await authFetch(
          `/my-listings/${encodeURIComponent(user.email)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch your studios");
        }

        const data = await response.json();
        setStudios(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast.error("Could not load your studios. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyStudios();
  }, [user?.email]);

  if (isAuthPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-muted/40">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-muted/40 px-4 py-16">
        <Card className="w-full max-w-md border-border bg-card shadow-sm">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-blue-500/10 p-4 text-blue-700 dark:text-blue-300">
              <LogIn className="size-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Sign In to View Listings
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You must be logged in to view and manage your studio listings.
            </p>
            <Link href="/login" className="mt-6 w-full">
              <Button className="w-full bg-primary font-heading font-semibold text-primary-foreground hover:bg-primary/90">
                Log In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 3. Data Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-muted/40">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shadow-sm">
              <span className="size-1.5 rounded-full bg-blue-600" />
              Host Dashboard
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              My Studio Listings
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your listed creative spaces, update details, or remove
              them.
            </p>
          </div>

          <Link href="/add-studio">
            <Button className="h-11 gap-2 bg-primary font-heading font-semibold text-primary-foreground hover:bg-primary/90">
              <Sparkles className="size-4" />
              Add New Studio
            </Button>
          </Link>
        </div>

        {/* Studios Grid */}
        {studios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => {
              const studioId = studio._id;
              return <StudioCard key={studioId} studio={studio} />;
            })}
          </div>
        ) : (
          /* Empty State */
          <Card className="border-dashed border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <Sparkles className="size-12 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                No studios listed yet
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                You haven&apos;t added any studio spaces yet. Start hosting by
                listing your first creative space.
              </p>
              <Link href="/add-studio" className="mt-6">
                <Button className="gap-2 bg-primary font-heading font-semibold text-primary-foreground hover:bg-primary/90">
                  <Sparkles className="size-4" />
                  Add Your First Studio
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
