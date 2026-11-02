"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, User, LayoutDashboard, CalendarDays, PlusCircle, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const buttonBase =
  "inline-flex h-9 items-center justify-center rounded-md px-4 font-heading text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const buttonOutline = cn(
  buttonBase,
  "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
);

const buttonPrimary = cn(
  buttonBase,
  "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
);

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  return `${parts[0][0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

export default function AuthButtons({ className }: { className?: string }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div
        className={cn("flex h-9 items-center justify-center", className)}
        aria-label="Loading account"
      >
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const user = session?.user;


  if (!user) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Link href="/login" className={buttonOutline}>
          Login
        </Link>
        <Link href="/register" className={buttonPrimary}>
          Register
        </Link>
      </div>
    );
  }


  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-full border border-input bg-background p-1 pr-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className
          )}
        >
          <Avatar size="default">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {getInitials(user.name || "User")}
            </AvatarFallback>
          </Avatar>
          <span className="max-w-24 truncate font-heading text-xs font-semibold uppercase tracking-[0.12em] text-foreground sm:max-w-32">
            {user.name}
          </span>
        </button>
      </PopoverTrigger>
      
      <PopoverContent className="w-64 p-0" align="end">

        <div className="flex flex-col gap-1 border-b border-border p-4">
          <p className="font-heading text-sm font-semibold text-foreground">
            {user.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user.email}
          </p>
        </div>


        <div className="py-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <User className="size-4 text-muted-foreground" />
            Profile
          </Link>
          <Link
            href="/add-studio"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <PlusCircle className="size-4 text-blue-600 dark:text-blue-400" />
            Add New Studio
          </Link>
          <Link
            href="/my-listings"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <LayoutDashboard className="size-4 text-muted-foreground" />
            My Studio Listings
          </Link>
          <Link
            href="/my-bookings"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <CalendarDays className="size-4 text-muted-foreground" />
            My Bookings
          </Link>
        </div>


        <div className="border-t border-border py-2">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}