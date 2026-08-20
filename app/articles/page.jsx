import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
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
    <AnimatedPageWrapper className="technical-grid min-h-screen px-4 pb-24 pt-36">
      <section className="editorial-shell">
        <div className="grid gap-8 border-b border-white/15 pb-12 md:grid-cols-[1fr_360px] md:items-end">
          <div>
            <p className="eyebrow"><span className="text-wine">AR</span> / Rivista</p>
            <h1 className="mt-5 font-serif text-6xl leading-none text-cream md:text-8xl">Articoli</h1>
          </div>
          <p className="leading-8 text-cream/68">Cronache, territori, conversazioni, tecnica, cultura e note raccolte in un archivio aperto.</p>
        </div>
        <div className="mt-10"><ArticlesExplorer articles={articles} /></div>
      </section>
    </AnimatedPageWrapper>
  );
}
