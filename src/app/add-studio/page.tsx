"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

export interface StudioFormData {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
  hostName: string;
  hostEmail: string;
}

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
] as const;

const AMENITIES_OPTIONS = [
  "WiFi",
  "Parking",
  "Kitchen",
  "Restroom",
  "Equipment Rental",
  "Natural Light",
  "Sound Isolation",
  "Green Screen",
  "Cyclorama Wall",
  "Makeup Station",
] as const;

type FormErrors = Partial<Record<keyof StudioFormData, string>>;

export default function AddStudioPage() {
  const { data } = authClient.useSession();
  const user = data?.user;

  const router = useRouter();
  const [formData, setFormData] = useState<StudioFormData>({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    imageUrl: "",
    amenities: [],
    overview: "",
    hostName: user?.name ?? "",
    hostEmail: user?.email ?? "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: keyof StudioFormData, value: unknown) => {
    switch (name) {
      case "title":
        return !String(value).trim() ? "Title is required." : undefined;
      case "category":
        return !String(value).trim() ? "Category is required." : undefined;
      case "hourlyRate": {
        const num = Number(value);
        if (value === "" || isNaN(num)) return "Hourly rate is required.";
        if (num < 0) return "Hourly rate must be a positive number.";
        return undefined;
      }
      case "securityDeposit": {
        const num = Number(value);
        if (value === "" || isNaN(num)) return "Security deposit is required.";
        if (num < 0) return "Security deposit must be a positive number.";
        return undefined;
      }
      case "maxCapacity": {
        const num = Number(value);
        if (value === "" || isNaN(num)) return "Max capacity is required.";
        if (num < 1) return "Max capacity must be at least 1.";
        return undefined;
      }
      case "location":
        return !String(value).trim()
          ? "Location/Address is required."
          : undefined;
      case "imageUrl":
        return !String(value).trim() ? "Image URL is required." : undefined;
      case "overview": {
        const text = String(value).trim();
        if (!text) return "Detailed overview is required.";
        if (text.length < 50) {
          return `Overview must be at least 50 characters (current: ${text.length}).`;
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleChange = (
    field: keyof StudioFormData,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      const amenities = exists
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof StudioFormData>).forEach((field) => {
      if (
        field === "hostName" ||
        field === "hostEmail" ||
        field === "amenities"
      ) {
        return;
      }
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill up the form");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        hostName: user?.name ?? formData.hostName,
        hostEmail: user?.email ?? formData.hostEmail,
        hourlyRate: Number(formData.hourlyRate),
        securityDeposit: Number(formData.securityDeposit),
        maxCapacity: Number(formData.maxCapacity),
      };
      const res = await authFetch("/add-studio", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        let message = `Failed to add studio (HTTP ${res.status}).`;

        try {
          const parsed = JSON.parse(text) as { error?: string };
          if (parsed?.error) message = parsed.error;
        } catch {
        }

        throw new Error(message);
      }

      toast.success("Studio added successfully!");
      router.push("/studios");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shadow-sm sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-blue-600" />
            Host Portal
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Add New Studio
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            List your creative space on StudioSpace
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* 1. STUDIO INFORMATION */}
          <Card className="border-border shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-foreground">
                1. Studio Information
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Provide core details about your venue pricing and capacity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">
                  Studio Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Industrial Daylight Loft & Cyc"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={
                    errors.title
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.title && (
                  <p className="text-xs text-red-600 dark:text-red-400">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => handleChange("category", val)}
                  >
                    <SelectTrigger
                      id="category"
                      className={
                        errors.category
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-xs text-red-600 dark:text-red-400">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxCapacity" className="text-foreground">
                    Max Capacity (Persons){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="maxCapacity"
                    type="number"
                    min="1"
                    placeholder="e.g. 25"
                    value={formData.maxCapacity}
                    onChange={(e) =>
                      handleChange("maxCapacity", e.target.value)
                    }
                    className={
                      errors.maxCapacity
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.maxCapacity && (
                    <p className="text-xs text-red-600 dark:text-red-400">{errors.maxCapacity}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-foreground">
                    Hourly Rate ($ USD) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 95"
                    value={formData.hourlyRate}
                    onChange={(e) => handleChange("hourlyRate", e.target.value)}
                    className={
                      errors.hourlyRate
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.hourlyRate && (
                    <p className="text-xs text-red-600 dark:text-red-400">{errors.hourlyRate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="securityDeposit" className="text-foreground">
                    Security Deposit ($ USD){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 250"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      handleChange("securityDeposit", e.target.value)
                    }
                    className={
                      errors.securityDeposit
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.securityDeposit && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {errors.securityDeposit}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. LOCATION & MEDIA */}
          <Card className="border-border shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-foreground">
                2. Location & Media
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Where is your studio located and what does it look like?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground">
                  Location / Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. SoHo, Manhattan, NY"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className={
                    errors.location
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.location && (
                  <p className="text-xs text-red-600 dark:text-red-400">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-foreground">
                  Image URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="Upload image to imgbb/postimage and paste URL here"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className={
                    errors.imageUrl
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.imageUrl && (
                  <p className="text-xs text-red-600 dark:text-red-400">{errors.imageUrl}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 3. AMENITIES */}
          <Card className="border-border shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-foreground">
                3. Amenities
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Select all features and equipment available on site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {AMENITIES_OPTIONS.map((amenity) => {
                  const checked = formData.amenities.includes(amenity);

                  return (
                    <label
                      key={amenity}
                      className="flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted cursor-pointer"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <span className="font-sans text-sm font-medium text-foreground">
                        {amenity}
                      </span>
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 4. DESCRIPTION */}
          <Card className="border-border shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-foreground">
                4. Description
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Tell creators what makes your studio unique (minimum 50
                characters).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="overview" className="text-foreground">
                  Detailed Overview <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="overview"
                  rows={5}
                  placeholder="Describe your studio space, equipment, lighting conditions, and unique features..."
                  value={formData.overview}
                  onChange={(e) => handleChange("overview", e.target.value)}
                  className={
                    errors.overview
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                <div className="flex items-center justify-between">
                  {errors.overview ? (
                    <p className="text-xs text-red-600 dark:text-red-400">{errors.overview}</p>
                  ) : (
                    <span />
                  )}
                  <span
                    className={`text-xs font-mono ${
                      formData.overview.trim().length < 50
                        ? "text-muted-foreground"
                        : "text-emerald-600 dark:text-emerald-400 font-medium"
                    }`}
                  >
                    {formData.overview.trim().length}/50 chars min
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. HOST INFORMATION */}
          <Card className="border-border shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-foreground">
                5. Host Information
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Associated host credentials for this listing (auto-filled).
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hostName" className="text-foreground">
                  Host Name
                </Label>
                <Input
                  id="hostName"
                  disabled
                  value={user?.name}
                  className="bg-muted text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hostEmail" className="text-foreground">
                  Host Email
                </Label>
                <Input
                  id="hostEmail"
                  type="email"
                  disabled
                  value={user?.email}
                  className="bg-muted text-muted-foreground"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="h-12 w-full bg-primary font-heading text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Adding Studio...
              </>
            ) : (
              <>
                <PlusCircle className="size-5" />
                Add Studio
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
