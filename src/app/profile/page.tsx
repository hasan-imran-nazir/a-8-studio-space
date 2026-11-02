"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  Loader2,
  LogIn,
  Pencil,
  PlusCircle,
  Save,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  return `${parts[0][0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Could not sign out. Please try again.");
    }
  };

  if (isPending) {
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
              Sign In to View Your Profile
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              You must be logged in to manage your profile and account details.
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

  const openNameDialog = () => {
    setNameInput(user.name ?? "");
    setIsNameDialogOpen(true);
  };

  const handleSaveName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextName = nameInput.trim();

    if (!nextName) {
      toast.error("Name cannot be empty.");
      return;
    }

    if (nextName === user.name) {
      setIsNameDialogOpen(false);
      return;
    }

    setIsSavingName(true);

    try {
      const { error } = await authClient.updateUser({ name: nextName });

      if (error) {
        toast.error(error.message ?? "Could not update your name.");
        return;
      }

      await refetch();
      toast.success("Name updated successfully.");
      setIsNameDialogOpen(false);
      router.refresh();
    } catch {
      toast.error("Could not update your name. Please try again.");
    } finally {
      setIsSavingName(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 shadow-sm">
          <span className="size-1.5 rounded-full bg-blue-600" />
          Account
        </span>

        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          My Profile
        </h1>
        <p className="mt-2 text-slate-500">
          Your account details and quick links to your studio activity.
        </p>

        <Card className="mt-8 border-slate-200 bg-white shadow-sm">
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
            <Avatar size="lg">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback className="bg-slate-900 text-sm font-semibold text-white">
                {getInitials(user.name || "User")}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 space-y-1">
              <p className="flex items-center gap-2 font-heading text-lg font-semibold text-slate-900">
                <UserRound className="size-4 text-slate-400" />
                {user.name}
              </p>
              <p className="truncate text-sm text-slate-500">{user.email}</p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100"
                onClick={openNameDialog}
              >
                <Pencil className="size-4" />
                Edit Name
              </Button>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/add-studio"
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
          >
            <PlusCircle className="size-4 text-blue-600" />
            Add Studio
          </Link>
          <Link
            href="/my-listings"
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
          >
            <LayoutDashboard className="size-4 text-slate-500" />
            My Listings
          </Link>
          <Link
            href="/my-bookings"
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
          >
            <CalendarDays className="size-4 text-slate-500" />
            My Bookings
          </Link>
        </div>
      </div>

      <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSaveName} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Edit your name</DialogTitle>
              <DialogDescription>
                This name is shown on your profile, listings, and bookings.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                placeholder="Your name"
                maxLength={80}
                autoFocus
                required
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSavingName}>
                {isSavingName ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
