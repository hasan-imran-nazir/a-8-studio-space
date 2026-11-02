import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Mic,
  Music,
  Palette,
  Video,
} from "lucide-react";

const categories = [
  {
    title: "Photo Studios",
    description: "Cyc walls, natural light lofts, strobes & modifiers.",
    count: "1,420+ spaces",
    href: "/studios?category=photo",
    icon: Camera,
  },
  {
    title: "Sound Stages",
    description: "Black boxes, green screen cycloramas, truss grid rigging.",
    count: "890+ spaces",
    href: "/studios?category=sound-stage",
    icon: Video,
  },
  {
    title: "Podcast Rooms",
    description:
      "Multi-mic arrays, 4K broadcast cameras & acoustic baffle design.",
    count: "680+ spaces",
    href: "/studios?category=podcast",
    icon: Mic,
  },
  {
    title: "Music Suites",
    description:
      "Isolated vocal booths, analog synthesizers, SSL & Neve desks.",
    count: "540+ spaces",
    href: "/studios?category=music",
    icon: Music,
  },
  {
    title: "Art & Creator Labs",
    description:
      "Bespoke thematic backdrops, prop houses & styling vanity stations.",
    count: "670+ spaces",
    href: "/studios?category=creator-lab",
    icon: Palette,
  },
];

export default function BrowseByCategory() {
  return (
    <section
      id="categories"
      className="border-b border-border/70 bg-muted/40 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shadow-sm sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-blue-600" />
            Tailored Environments
          </span>

          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Browse by Category
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Find the right environment for your next shoot, session, or stream
            — from daylight lofts to fully isolated audio suites.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ title, description, count, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 dark:text-blue-400 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>

              <h3 className="mt-5 font-heading text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-blue-700 dark:hover:text-blue-400">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>

              <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {count}
                </span>
                <ArrowRight className="size-4 text-muted-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
