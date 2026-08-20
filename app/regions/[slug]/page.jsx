import Image from "next/image";
import { notFound } from "next/navigation";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import ArticleCard from "@/components/ArticleCard";
import RegionCard from "@/components/RegionCard";
import { getArticles } from "@/lib/article-store";
import { regions } from "@/lib/data";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.id }));
}

export function generateMetadata({ params }) {
  const region = regions.find((item) => item.id === params.slug);
  if (!region) return {};

  return {
    title: region.name,
    description: region.introduction,
    alternates: { canonical: `/regions/${region.id}` },
    openGraph: {
      title: `${region.name} — Atlante Kroinos`,
      description: region.introduction,
      images: [{ url: region.image, alt: region.imageAlt }]
    }
  };
}

export default async function RegionDetailPage({ params }) {
  const region = regions.find((item) => item.id === params.slug);
  if (!region) notFound();

  const articles = await getArticles();
  const regionArticles = articles.filter((article) => article.region === region.name);
  const otherRegions = regions.filter((item) => item.id !== region.id);

  return (
    <AnimatedPageWrapper>
      <header className="relative flex min-h-[70svh] items-end overflow-hidden border-b border-white/10 px-4 pb-14 pt-36">
        <Image src={region.image} alt={region.imageAlt} fill priority sizes="100vw" className="object-cover grayscale-[.45]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
        <div className="technical-grid absolute inset-0 opacity-70" />
        <div className="editorial-shell relative">
          <p className="eyebrow"><span className="text-wine">TR</span> / {region.country} / {region.coordinates}</p>
          <h1 className="mt-6 font-serif text-7xl leading-[.85] text-cream md:text-9xl">{region.name}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/78">{region.introduction}</p>
        </div>
      </header>

      <section className="editorial-shell grid gap-10 py-16 lg:grid-cols-[300px_1fr]">
        <aside className="technical-panel h-fit p-6 lg:sticky lg:top-28">
          <p className="eyebrow"><span className="text-wine">01</span> / Coordinate</p>
          <p className="mt-6 font-serif text-3xl leading-tight text-cream">{region.climate}</p>
          <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {region.focus.map((item) => (
              <span key={item} className="border border-white/15 px-3 py-2 text-[.7rem] uppercase text-cream/65">{item}</span>
            ))}
          </div>
        </aside>

        <div>
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <p className="eyebrow"><span className="text-wine">02</span> / Archivio locale</p>
              <h2 className="mt-4 font-serif text-5xl text-cream">Storie dal territorio</h2>
            </div>
            <p className="text-sm text-cream/55">{regionArticles.length} {regionArticles.length === 1 ? "articolo" : "articoli"}</p>
          </div>

          {regionArticles.length > 0 ? (
            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {regionArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
          ) : (
            <p className="border border-white/10 p-8 text-cream/68">Il quaderno di questo territorio è in preparazione.</p>
          )}
        </div>
      </section>

      <section className="technical-grid border-t border-white/10 px-4 py-16">
        <div className="editorial-shell">
          <p className="eyebrow"><span className="text-wine">03</span> / Continua l’atlante</p>
          <div className="mt-8 grid gap-px bg-white/10 md:grid-cols-2">
            {otherRegions.map((item, index) => (
              <RegionCard
                key={item.id}
                region={item}
                index={index}
                articleCount={articles.filter((article) => article.region === item.name).length}
              />
            ))}
          </div>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
