import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import HeroSection from "@/components/HeroSection";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCta from "@/components/NewsletterCta";
import RegionCard from "@/components/RegionCard";
import { getArticles } from "@/lib/article-store";
import { regions } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await getArticles();
  const featured = articles.find((article) => article.featured) || articles[0];

  return (
    <AnimatedPageWrapper>
      <HeroSection />
      <FeaturedArticle article={featured} />

      <section className="editorial-shell border-t border-white/10 py-16">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_320px] md:items-end">
          <div>
            <p className="eyebrow"><span className="text-wine">02</span> / Archivio editoriale</p>
            <h2 className="mt-5 font-serif text-5xl text-cream md:text-7xl">Storie recenti</h2>
          </div>
          <p className="text-sm leading-7 text-cream/68">
            Articoli lunghi che partono da persone e luoghi, poi aprono conoscenza sul vino.
          </p>
        </div>
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {articles.slice(1, 5).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Link href="/articles" className="mt-8 inline-flex min-h-14 items-center gap-8 border border-white/20 px-5 py-4 text-xs font-semibold uppercase text-cream transition hover:border-wine hover:text-wine">
          Apri tutto l’archivio <ArrowUpRight size={16} />
        </Link>
      </section>

      <section className="technical-grid border-t border-white/10 px-4 py-20">
        <div className="editorial-shell">
          <div className="mb-10 grid gap-6 md:grid-cols-[1fr_360px] md:items-end">
            <div>
              <p className="eyebrow"><span className="text-wine">03</span> / Atlante</p>
              <h2 className="mt-5 font-serif text-5xl text-cream md:text-7xl">Tre territori, tre grammatiche</h2>
            </div>
            <p className="text-sm leading-7 text-cream/68">
              Segui un luogo attraverso le storie, le materie e le parole che lo rendono riconoscibile.
            </p>
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region, index) => (
              <RegionCard
                key={region.id}
                region={region}
                index={index}
                articleCount={articles.filter((article) => article.region === region.name).length}
              />
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta light />
    </AnimatedPageWrapper>
  );
}
