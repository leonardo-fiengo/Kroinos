import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import EditorialImage from "@/components/EditorialImage";
import HomeRegionIndex from "@/components/HomeRegionIndex";
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
    <main>
      <header className="technical-grid border-b border-white/10 bg-charcoal px-4 pb-16 pt-32 text-cream md:pb-20 md:pt-40">
        <div className="editorial-shell public-reveal grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <Link href="/regions" className="home-secondary-link mb-12 inline-flex min-h-11 items-center gap-3 text-[.68rem] font-semibold uppercase tracking-[.04em] text-cream/58">
              <ArrowLeft size={15} aria-hidden="true" /> Tutti i territori
            </Link>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">{region.country} / {region.coordinates}</p>
            <h1 className="mt-6 font-serif text-7xl leading-[.8] sm:text-8xl md:text-9xl">{region.name}</h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-cream/68 md:text-lg">{region.introduction}</p>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden bg-white/5">
            <EditorialImage src={region.image} alt={region.imageAlt} priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover grayscale-[.25]" />
            <span className="absolute bottom-0 right-0 bg-wine px-4 py-3 text-[.68rem] font-semibold uppercase tracking-[.04em] text-white">
              {regionArticles.length} {regionArticles.length === 1 ? "storia" : "storie"}
            </span>
          </div>
        </div>
      </header>

      <section className="paper-section px-4 py-20 md:py-28">
        <div className="editorial-shell grid gap-14 lg:grid-cols-[270px_1fr] lg:gap-20">
          <aside className="h-fit border-t border-charcoal/20 pt-6 lg:sticky lg:top-28">
            <p className="text-[.68rem] font-semibold uppercase tracking-[.05em] text-wine">Coordinate</p>
            <p className="mt-5 font-serif text-3xl leading-tight text-charcoal">{region.climate}</p>
            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-charcoal/15 pt-5 text-[.68rem] font-semibold uppercase tracking-[.04em] text-charcoal/52">
              {region.focus.map((item) => <span key={item}>{item}</span>)}
            </div>
          </aside>

          <div>
            <header className="flex flex-col gap-4 border-b border-charcoal/20 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[.68rem] font-semibold uppercase tracking-[.05em] text-wine">Archivio locale</p>
                <h2 className="mt-4 font-serif text-5xl leading-none text-charcoal md:text-6xl">Storie dal territorio</h2>
              </div>
              <p className="text-sm text-charcoal/52">{regionArticles.length} {regionArticles.length === 1 ? "articolo" : "articoli"}</p>
            </header>

            {regionArticles.length > 0 ? (
              <div className="border-t border-charcoal/20">
                {regionArticles.map((article, index) => (
                  <article key={article.slug} className="archive-story-row group grid gap-5 border-b border-charcoal/20 py-7 sm:grid-cols-[36px_150px_1fr_20px] sm:items-center">
                    <span className="text-[.68rem] font-semibold text-wine">{String(index + 1).padStart(2, "0")}</span>
                    <Link href={`/article/${article.slug}`} className="relative aspect-[4/3] overflow-hidden bg-charcoal/10" tabIndex={-1} aria-hidden="true">
                      <EditorialImage src={article.image} alt="" sizes="150px" className="archive-story-image object-cover" />
                    </Link>
                    <div>
                      <p className="text-[.68rem] font-semibold uppercase tracking-[.04em] text-charcoal/46">{article.category} / {article.readTime} / {article.date}</p>
                      <h3 className="mt-3 font-serif text-3xl leading-none text-charcoal">
                        <Link href={`/article/${article.slug}`}>{article.title}</Link>
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-charcoal/60">{article.subtitle}</p>
                    </div>
                    <ArrowUpRight className="hidden text-wine sm:block" size={17} aria-hidden="true" />
                  </article>
                ))}
              </div>
            ) : (
              <div className="border-b border-charcoal/20 py-16">
                <p className="font-serif text-3xl text-charcoal">Il quaderno di questo territorio è in preparazione.</p>
                <p className="mt-3 text-sm text-charcoal/60">La prima storia arriverà presto.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <HomeRegionIndex regions={otherRegions} articles={articles} />
    </main>
  );
}
