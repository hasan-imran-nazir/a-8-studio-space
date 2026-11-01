"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chrome, Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Email is required.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (!password) {
      toast.error("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: trimmedEmail,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "Invalid email or password.");
        return;
      }

      toast.success("Welcome back! Redirecting to your dashboard.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "Google sign-in failed. Try again.");
        setIsGoogleLoading(false);
      }
    } catch {
      toast.error("Google sign-in is unavailable right now.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-16 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
      />

      <Card className="relative w-full max-w-md gap-0 border-slate-200 py-0 shadow-xl shadow-slate-900/5">
        <CardHeader className="gap-3 px-6 pb-6 pt-8 sm:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Secure Access
          </span>
          <CardTitle className="font-heading text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm leading-6 text-slate-500">
            Sign in to manage your studio bookings, saved spaces, and host
            dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 sm:px-8">
          <form onSubmit={handleLoginSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isLoading}
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <Link
                  href="/login"
                  className="font-heading text-xs font-medium text-blue-700 transition-colors hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={isLoading}
                  className="h-11 pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                  className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="h-11 w-full font-heading text-sm font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              OR
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="h-11 w-full gap-2.5 font-heading text-sm font-medium"
          >
            {isGoogleLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Chrome className="w-5 h-5" />
            )}
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-heading font-semibold text-blue-700 transition-colors hover:text-blue-800"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
