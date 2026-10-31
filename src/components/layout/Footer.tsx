"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Aperture,
  ArrowRight,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

const categories = [
  { name: "Photography", href: "/studios?category=photography" },
  { name: "Music & Audio", href: "/studios?category=music-audio" },
  { name: "Podcasting", href: "/studios?category=podcasting" },
  { name: "Video Production", href: "/studios?category=video-production" },
  { name: "Event Space", href: "/studios?category=event-space" },
];

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube },
  { name: "Twitter / X", href: "https://x.com", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) return;

    toast.success("You're on the list", {
      description: `Studio updates will be sent to ${email}.`,
    });
    setEmail("");
  }

  return (
    <footer className="border-t border-white/10 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md bg-white text-slate-900 transition-colors group-hover:bg-slate-200">
                <Aperture className="size-5" strokeWidth={2} />
              </span>
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                StudioSpace
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Book production-ready studios, connect with creative
              professionals, and bring your next project to life.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Newsletter
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              New studios, gear drops, and booking tips. No spam.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleSubscribe}>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@studio.com"
                className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 font-mono text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30 focus:ring-2 focus:ring-white/10"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-white px-4 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-slate-900 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Subscribe
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/terms"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
