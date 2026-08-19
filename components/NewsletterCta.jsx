import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NewsletterCta({ light = false }) {
  return (
    <section className={light ? "paper-section px-4 py-20" : "technical-grid border-y border-white/10 px-4 py-20"}>
      <div className="editorial-shell grid gap-9 md:grid-cols-[1fr_360px] md:items-end">
        <div>
          <p className={`eyebrow ${light ? "!text-charcoal/60" : ""}`}><span className="text-wine">NL</span> / Lettere</p>
          <h2 className={`mt-5 max-w-3xl font-serif text-5xl leading-[.95] md:text-7xl ${light ? "text-charcoal" : "text-cream"}`}>
            Un territorio. Tre bottiglie. Una lettera.
          </h2>
        </div>
        <div>
          <p className={`text-sm leading-7 ${light ? "text-charcoal/70" : "text-cream/68"}`}>
            Una volta al mese: appunti di cantina, incontri e dettagli felicemente inutili.
          </p>
          <Link
            href="/newsletter"
            className={`mt-6 inline-flex min-h-14 items-center gap-8 border px-5 py-4 text-xs font-semibold uppercase transition ${
              light
                ? "border-charcoal bg-charcoal text-cream hover:bg-wine"
                : "border-cream bg-cream text-charcoal hover:bg-white"
            }`}
          >
            Ricevi le lettere <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
