import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EditorialImage from "@/components/EditorialImage";
import { getArticles } from "@/lib/article-store";
import { regions } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Territori",
  description: "L’atlante editoriale di Kroinos: Piemonte, Giappone e Abruzzo letti attraverso vino, sake, olio e cultura.",
  alternates: { canonical: "/regions" }
};

export default async function RegionsPage() {
  const articles = await getArticles();

  return (
    <main>
      <header className="public-hero technical-grid overflow-hidden border-b border-white/10 px-4 pb-16 pt-36 text-cream md:pt-44">
        <div className="editorial-shell public-reveal grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Atlante editoriale / 03 coordinate</p>
            <h1 className="public-display mt-6 max-w-[7ch] font-serif leading-[.78]">Territori</h1>
            <p className="mt-8 max-w-lg text-base leading-8 text-cream/68 md:text-lg">
              Un luogo non è uno sfondo. È clima, materia, lavoro e memoria: la grammatica invisibile di ciò che assaggiamo.
            </p>
          </div>

          <div className="grid h-[360px] grid-cols-3 gap-2 sm:h-[460px]">
            {regions.map((region, index) => (
              <Link key={region.id} href={`/regions/${region.id}`} className={`region-hero-image relative overflow-hidden bg-white/5 ${index === 1 ? "translate-y-8" : ""}`} aria-label={`Esplora ${region.name}`}>
                <EditorialImage src={region.image} alt={region.imageAlt} priority={index === 0} sizes="(min-width: 1024px) 20vw, 33vw" className="region-image object-cover grayscale-[.45]" />
                <span className="absolute inset-x-0 bottom-0 bg-black/75 px-3 py-3 font-serif text-xl text-cream sm:text-2xl">{region.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      <section className="paper-section px-4 py-20 md:py-28">
        <div className="editorial-shell">
          <header className="grid gap-8 border-b border-charcoal/20 pb-10 md:grid-cols-[1fr_360px] md:items-end">
            <div>
              <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">La mappa di Kroinos</p>
              <h2 className="mt-4 max-w-[12ch] font-serif text-5xl leading-[.95] text-charcoal md:text-7xl">Tre luoghi, tre modi di raccontare.</h2>
            </div>
            <p className="text-sm leading-7 text-charcoal/66">Dalla vite al riso, dall’acqua all’olio: ogni capitolo riunisce storie che condividono una stessa origine.</p>
          </header>

          <div>
            {regions.map((region, index) => {
              const articleCount = articles.filter((article) => article.region === region.name).length;

              return (
                <article key={region.id} className="grid gap-8 border-b border-charcoal/20 py-10 md:grid-cols-2 md:items-center md:gap-14 md:py-14">
                  <Link href={`/regions/${region.id}`} className={`region-chapter-image relative aspect-[16/11] overflow-hidden bg-charcoal/10 ${index % 2 ? "md:order-2" : ""}`} tabIndex={-1} aria-hidden="true">
                    <EditorialImage src={region.image} alt="" sizes="(min-width: 768px) 48vw, 100vw" className="region-image object-cover" />
                  </Link>
                  <div className={index % 2 ? "md:order-1" : ""}>
                    <div className="flex items-center justify-between gap-5 text-[.68rem] font-semibold uppercase tracking-[.04em] text-charcoal/46">
                      <span><span className="text-wine">{String(index + 1).padStart(2, "0")}</span> / {region.country}</span>
                      <span>{region.coordinates}</span>
                    </div>
                    <h3 className="mt-5 font-serif text-5xl leading-none text-charcoal md:text-6xl">
                      <Link href={`/regions/${region.id}`} className="home-title-link">{region.name}</Link>
                    </h3>
                    <p className="mt-6 max-w-xl text-base leading-8 text-charcoal/68">{region.introduction}</p>
                    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-charcoal/15 pt-5 text-[.68rem] font-semibold uppercase tracking-[.04em] text-charcoal/48">
                      {region.focus.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <Link href={`/regions/${region.id}`} className="region-chapter-link mt-7 inline-flex min-h-12 items-center gap-5 border-b border-charcoal pb-2 text-xs font-semibold uppercase text-charcoal">
                      {articleCount} {articleCount === 1 ? "storia" : "storie"} da leggere <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="grid gap-8 border-b border-charcoal/20 py-10 md:grid-cols-3">
            {[
              ["Materia", "Uva, riso, acqua e olio: ciò che un luogo rende possibile."],
              ["Clima", "Temperature e stagioni trasformano tecnica, annate e linguaggio."],
              ["Persone", "Chi produce e chi studia rende il territorio cultura condivisa."]
            ].map(([title, text], index) => (
              <div key={title}>
                <p className="text-[.68rem] font-semibold text-wine">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-3xl text-charcoal">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/64">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
