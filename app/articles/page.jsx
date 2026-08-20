import ArticlesExplorer from "@/components/ArticlesExplorer";
import { getArticles } from "@/lib/article-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Articoli",
  description: "Tutte le storie di Kroinos: vino, sake, olio, clima e cultura dei territori.",
  alternates: { canonical: "/articles" }
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <header className="public-hero technical-grid border-b border-white/10 px-4 pb-16 pt-36 text-cream md:pb-20 md:pt-44">
        <div className="editorial-shell public-reveal grid gap-10 md:grid-cols-[1fr_340px] md:items-end">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Rivista / Archivio completo</p>
            <h1 className="public-display mt-6 font-serif leading-[.82]">Articoli</h1>
          </div>
          <div className="border-t border-white/20 pt-5">
            <p className="text-base leading-8 text-cream/68">Cronache, conversazioni e tecnica: ogni storia parte da un incontro e apre un territorio.</p>
            <p className="mt-5 text-[.68rem] font-semibold uppercase tracking-[.04em] text-cream/42">
              {articles.length} {articles.length === 1 ? "storia pubblicata" : "storie pubblicate"}
            </p>
          </div>
        </div>
      </header>

      <section className="paper-section px-4 py-16 md:py-24">
        <div className="editorial-shell">
          <div className="mb-9 grid gap-5 md:grid-cols-[1fr_320px] md:items-end">
            <h2 className="font-serif text-4xl leading-none text-charcoal md:text-5xl">Trova la tua prossima lettura.</h2>
            <p className="text-sm leading-7 text-charcoal/62">Cerca liberamente oppure restringi l’archivio per tema, luogo e livello.</p>
          </div>
          <ArticlesExplorer articles={articles} />
        </div>
      </section>
    </main>
  );
}
