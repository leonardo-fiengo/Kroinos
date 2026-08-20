import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HomeRegionIndex({ regions, articles }) {
  return (
    <section className="technical-grid border-t border-white/10 bg-charcoal px-4 py-20 text-cream md:py-28">
      <div className="editorial-shell">
        <header className="grid gap-8 md:grid-cols-[1fr_360px] md:items-end">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Atlante editoriale</p>
            <h2 className="mt-4 max-w-[12ch] font-serif text-5xl leading-[.95] sm:text-6xl md:text-7xl">Ogni territorio ha una voce.</h2>
          </div>
          <p className="max-w-[46ch] text-sm leading-7 text-cream/64 md:justify-self-end">
            Non semplici provenienze, ma paesaggi da leggere attraverso persone, clima, gesti e parole.
          </p>
        </header>

        <div className="mt-12 border-t border-white/15 md:mt-16">
          {regions.map((region, index) => {
            const articleCount = articles.filter((article) => article.region === region.name).length;

            return (
              <Link key={region.id} href={`/regions/${region.id}`} className="home-region-row group grid min-h-36 gap-5 border-b border-white/15 py-7 sm:grid-cols-[48px_1fr_auto] sm:items-center md:grid-cols-[64px_1.1fr_.9fr_auto_24px] md:gap-8">
                <span className="text-[.7rem] text-wine">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-4xl leading-none text-cream sm:text-5xl">{region.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-cream/55 md:hidden">{region.tone}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm leading-6 text-cream/62">{region.tone}</p>
                  <p className="mt-2 text-[.65rem] uppercase tracking-[.04em] text-cream/36">{region.coordinates}</p>
                </div>
                <p className="text-[.68rem] font-semibold uppercase tracking-[.04em] text-cream/48 sm:text-right">
                  {articleCount} {articleCount === 1 ? "storia" : "storie"}
                </p>
                <ArrowUpRight className="hidden text-wine md:block" size={18} aria-hidden="true" />
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Link href="/regions" className="home-secondary-link inline-flex min-h-12 items-center gap-6 border border-white/25 px-5 py-3 text-xs font-semibold uppercase text-cream">
            Apri l’atlante <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
