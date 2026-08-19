import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden border-b border-white/10 bg-charcoal px-4 pb-14 pt-32 text-cream md:pb-20">
      <Image
        src="/images/grandi-langhe.png"
        alt="Sergio Germano durante un incontro dedicato al vino piemontese"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center grayscale-[.55]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/58 to-black/35" />
      <div className="technical-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-y-0 left-0 w-1 bg-wine" />

      <div className="editorial-shell hero-enter relative z-10">
        <div className="mb-8 flex items-center gap-4 text-xs uppercase text-cream/68">
          <span className="text-wine">KR / 001</span>
          <span className="h-px w-16 bg-white/30" />
          Archivio enologico
        </div>
        <h1 className="font-serif text-7xl font-medium leading-[.82] sm:text-8xl md:text-9xl">Kroinos</h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-cream/82 md:text-lg">
          Una bottiglia apre cultura, tecnica, memoria e luogo. Kroinos raccoglie le storie che restano nel bicchiere.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/articles" className="inline-flex min-h-14 items-center justify-between gap-8 border border-cream bg-cream px-5 py-4 text-xs font-semibold uppercase text-charcoal transition hover:bg-white">
            Leggi gli articoli <ArrowDownRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/regions" className="inline-flex min-h-14 items-center justify-between gap-8 border border-cream/40 px-5 py-4 text-xs font-semibold uppercase text-cream transition hover:border-wine hover:text-wine">
            Esplora i territori <ArrowDownRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
