"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Chrome,
  Image as ImageIcon,
  Loader2,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
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

function getPasswordErrors(value: string) {
  const errors: string[] = [];

  if (!/[A-Z]/.test(value)) {
    errors.push("Add at least one uppercase letter.");
  }

  if (!/[a-z]/.test(value)) {
    errors.push("Add at least one lowercase letter.");
  }

  if (value.length < 6) {
    errors.push("Use at least 6 characters.");
  }

  return errors;
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const showPasswordErrors =
    (passwordTouched || password.length > 0) && passwordErrors.length > 0;

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (passwordTouched || value.length > 0) {
      setPasswordErrors(getPasswordErrors(value));
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordErrors(getPasswordErrors(password));
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      photoUrl: string;
      password: string;
    };
    const trimmedName = user.name.trim();
    const trimmedEmail = user.email.trim();
    const trimmedPhotoUrl = user.photoUrl.trim();
    const currentPasswordErrors = getPasswordErrors(user.password);

    if (!trimmedName) {
      toast.error("Name is required.");
      return;
    }

    if (!trimmedEmail) {
      toast.error("Email is required.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (!trimmedPhotoUrl) {
      toast.error("Photo URL is required.");
      return;
    }

    if (!isValidUrl(trimmedPhotoUrl)) {
      toast.error("Enter a valid photo URL starting with http or https.");
      return;
    }

    setPasswordTouched(true);
    setPasswordErrors(currentPasswordErrors);

    if (currentPasswordErrors.length > 0) {
      toast.error("Password does not meet the requirements.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password,
        image: trimmedPhotoUrl,
      });

      if (error) {
        toast.error(error.message ?? "Could not create your account.");
        return;
      }

      toast.success(`Account created! Welcome, ${trimmedName}`);
      router.push("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
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
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-muted/40 px-4 py-16 sm:px-6">
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

      <Card className="relative w-full max-w-md gap-0 border-border py-0 shadow-xl shadow-slate-900/5">
        <CardHeader className="gap-3 px-6 pb-6 pt-8 sm:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-blue-600" />
            Join the Network
          </span>
          <CardTitle className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Create Account
          </CardTitle>
          <CardDescription className="text-sm leading-6 text-muted-foreground">
            Set up your profile to book studios or start listing your own
            production space.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 sm:px-8">
          <form onSubmit={handleEmailSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name
              </Label>
              <div className="relative">
                <User
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Imran Nazir"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={isLoading}
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
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
              <Label htmlFor="photoUrl" className="text-foreground">
                Photo URL
              </Label>
              <div className="relative">
                <ImageIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="photoUrl"
                  name="photoUrl"
                  type="url"
                  autoComplete="photo"
                  placeholder="https://example.com/avatar.jpg"
                  required
                  value={photoUrl}
                  onChange={(event) => setPhotoUrl(event.target.value)}
                  disabled={isLoading}
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  required
                  value={password}
                  onChange={(event) => handlePasswordChange(event.target.value)}
                  onBlur={handlePasswordBlur}
                  disabled={isLoading}
                  aria-invalid={showPasswordErrors}
                  aria-describedby="password-requirements"
                  className="h-11 pl-9"
                />
              </div>

              <div id="password-requirements" aria-live="polite">
                {showPasswordErrors ? (
                  <ul className="space-y-1">
                    {passwordErrors.map((error) => (
                      <li
                        key={error}
                        className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
                      >
                        <span className="size-1 shrink-0 rounded-full bg-red-500" />
                        {error}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    6+ characters with at least one uppercase and one lowercase
                    letter.
                  </p>
                )}
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
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-muted" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              OR
            </span>
            <span className="h-px flex-1 bg-muted" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleGoogleSignin}
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

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-heading font-semibold text-blue-700 dark:text-blue-400 transition-colors hover:text-blue-800 dark:hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
