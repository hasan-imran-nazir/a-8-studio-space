import {
  BadgeCheck,
  Camera,
  Headphones,
  Shield,
  ShieldCheck,
} from "lucide-react";

const assurances = [
  {
    title: "$1,000,000 Property Damage",
    description:
      "Comprehensive umbrella coverage backing every verified booking against incidental stage or studio damages.",
    icon: Shield,
    iconClassName: "bg-blue-600/10 text-blue-700 dark:text-blue-400",
  },
  {
    title: "Verified ID & Production Trust",
    description:
      "Mandatory multi-tier biometric identification and enterprise insurance certificate verification for all production crews.",
    icon: BadgeCheck,
    iconClassName: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "Gear Protection Protocol",
    description:
      "On-site optical camera package and lighting equipment insurance included during studio operational hours.",
    icon: Camera,
    iconClassName: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  {
    title: "24/7 Priority Producer Desk",
    description:
      "Direct phone and live dispatched chat with studio coordinators for instant dispute and access resolution.",
    icon: Headphones,
    iconClassName: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
];

export default function HostGuarantee() {
  return (
    <section
      id="host-guarantee"
      className="border-y border-border/70 bg-muted/40 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shadow-sm sm:text-[11px]">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Enterprise Safety Protocol
            </span>

            <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Host Guarantee & Creator Protection
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Whether you are hosting a soundstage or shooting a national
              campaign, our dual-sided security model protects your time, gear,
              and spatial investments.
            </p>

            <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
              {assurances.map(
                ({ title, description, icon: Icon, iconClassName }) => (
                  <article
                    key={title}
                    className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    <span
                      className={`flex size-10 items-center justify-center rounded-lg ${iconClassName}`}
                    >
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>

                    <h3 className="mt-4 font-heading text-base font-semibold leading-snug tracking-tight text-foreground">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div
              aria-hidden="true"
              className="relative flex h-full min-h-80 items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 shadow-sm"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />
              <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-sky-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative flex size-20 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
                <ShieldCheck className="size-9 text-white" strokeWidth={1.6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
