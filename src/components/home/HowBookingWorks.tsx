import { Key, Lock, PlusCircle, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    subtitle: "Discovery Phase",
    description:
      "Filter by equipment inventories, ceiling heights, electrical power amperage, and verified acoustic isolation ratings.",
    feature: "Multi-filter search",
    icon: SlidersHorizontal,
    badgeClassName: "bg-blue-600 text-white shadow-sm shadow-blue-600/25",
  },
  {
    step: "02",
    title: "Select Hours & Add-ons",
    subtitle: "Customization",
    description:
      "Choose calendar hours and easily configure optional equipment rentals, lighting kits, or certified sound engineers.",
    feature: "Add lighting & gear",
    icon: PlusCircle,
    badgeClassName: "bg-blue-600/10 text-blue-700",
  },
  {
    step: "03",
    title: "Book Instantly",
    subtitle: "Transaction",
    description:
      "Guaranteed slot reservations with zero hidden surcharge policies and direct messaging with verified studio hosts.",
    feature: "Escrow protection",
    icon: Lock,
    badgeClassName: "bg-blue-600/10 text-blue-700",
  },
  {
    step: "04",
    title: "Create & Produce",
    subtitle: "Execution",
    description:
      "Seamless automated keypad check-in, dedicated on-site stage manager assistance, and fast checkout workflows.",
    feature: "Keyless digital entry",
    icon: Key,
    badgeClassName: "bg-amber-400 text-amber-950 shadow-sm shadow-amber-400/25",
  },
];

export default function HowBookingWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 shadow-sm sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-blue-600" />
            Seamless Production Flow
          </span>

          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How Booking Works
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            A transparent four-step workflow built to move from first search to
            final wrap without friction.
          </p>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-0.5 bg-slate-200 lg:block"
          />

          <div className="relative z-10 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(
              ({
                step,
                title,
                subtitle,
                description,
                feature,
                icon: Icon,
                badgeClassName,
              }) => (
                <article
                  key={step}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="flex justify-center">
                    <span
                      className={cn(
                        "flex size-12 items-center justify-center rounded-full font-mono text-sm font-bold",
                        badgeClassName,
                      )}
                    >
                      {step}
                    </span>
                  </div>

                  <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    {subtitle}
                  </p>

                  <h3 className="mt-2 text-center font-heading text-lg font-semibold leading-snug tracking-tight text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-3 text-center text-sm leading-6 text-slate-500">
                    {description}
                  </p>

                  <div className="mt-auto pt-5 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-600">
                      <Icon className="size-3.5 text-slate-500" />
                      {feature}
                    </span>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
