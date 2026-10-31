"use client";

import { useState } from "react";
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
    hostName: "John Doe",
    hostEmail: "john@example.com",
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
        return !String(value).trim() ? "Location/Address is required." : undefined;
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof StudioFormData>).forEach((field) => {
      if (field === "hostName" || field === "hostEmail" || field === "amenities") {
        return;
      }
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Studio added successfully!");
    }, 800);
  };

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 shadow-sm sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-blue-600" />
            Host Portal
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Add New Studio
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            List your creative space on StudioSpace
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* 1. STUDIO INFORMATION */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-slate-900">
                1. Studio Information
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Provide core details about your venue pricing and capacity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-700">
                  Studio Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Industrial Daylight Loft & Cyc"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-red-600">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-700">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => handleChange("category", val)}
                  >
                    <SelectTrigger
                      id="category"
                      className={errors.category ? "border-red-500 focus-visible:ring-red-500" : ""}
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
                    <p className="text-xs text-red-600">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxCapacity" className="text-slate-700">
                    Max Capacity (Persons) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="maxCapacity"
                    type="number"
                    min="1"
                    placeholder="e.g. 25"
                    value={formData.maxCapacity}
                    onChange={(e) => handleChange("maxCapacity", e.target.value)}
                    className={errors.maxCapacity ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.maxCapacity && (
                    <p className="text-xs text-red-600">{errors.maxCapacity}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-slate-700">
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
                    className={errors.hourlyRate ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.hourlyRate && (
                    <p className="text-xs text-red-600">{errors.hourlyRate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="securityDeposit" className="text-slate-700">
                    Security Deposit ($ USD) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 250"
                    value={formData.securityDeposit}
                    onChange={(e) => handleChange("securityDeposit", e.target.value)}
                    className={errors.securityDeposit ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.securityDeposit && (
                    <p className="text-xs text-red-600">{errors.securityDeposit}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. LOCATION & MEDIA */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-slate-900">
                2. Location & Media
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Where is your studio located and what does it look like?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-700">
                  Location / Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. SoHo, Manhattan, NY"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className={errors.location ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-xs text-red-600">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-slate-700">
                  Image URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="Upload image to imgbb/postimage and paste URL here"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className={errors.imageUrl ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.imageUrl && (
                  <p className="text-xs text-red-600">{errors.imageUrl}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 3. AMENITIES */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-slate-900">
                3. Amenities
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
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
                      className="flex items-center space-x-3 rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50 cursor-pointer"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <span className="font-sans text-sm font-medium text-slate-700">
                        {amenity}
                      </span>
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 4. DESCRIPTION */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-slate-900">
                4. Description
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Tell creators what makes your studio unique (minimum 50 characters).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="overview" className="text-slate-700">
                  Detailed Overview <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="overview"
                  rows={5}
                  placeholder="Describe your studio space, equipment, lighting conditions, and unique features..."
                  value={formData.overview}
                  onChange={(e) => handleChange("overview", e.target.value)}
                  className={errors.overview ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                <div className="flex items-center justify-between">
                  {errors.overview ? (
                    <p className="text-xs text-red-600">{errors.overview}</p>
                  ) : (
                    <span />
                  )}
                  <span
                    className={`text-xs font-mono ${
                      formData.overview.trim().length < 50
                        ? "text-slate-400"
                        : "text-emerald-600 font-medium"
                    }`}
                  >
                    {formData.overview.trim().length}/50 chars min
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. HOST INFORMATION */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="space-y-1.5 pb-6">
              <CardTitle className="font-heading text-xl font-semibold text-slate-900">
                5. Host Information
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Associated host credentials for this listing (auto-filled).
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hostName" className="text-slate-700">
                  Host Name
                </Label>
                <Input
                  id="hostName"
                  value={formData.hostName}
                  disabled
                  className="bg-slate-100 text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hostEmail" className="text-slate-700">
                  Host Email
                </Label>
                <Input
                  id="hostEmail"
                  type="email"
                  value={formData.hostEmail}
                  disabled
                  className="bg-slate-100 text-slate-500"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            style={{ backgroundColor: "#0f172a" }}
            className="h-12 w-full bg-slate-900 font-heading text-base font-semibold text-white hover:bg-slate-800"
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
