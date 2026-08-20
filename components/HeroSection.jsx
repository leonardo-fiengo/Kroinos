import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import EditorialImage from "@/components/EditorialImage";

export default function HeroSection({ article, articleCount = 0 }) {
  return (
    <section className="home-hero relative overflow-hidden border-b border-white/10 bg-charcoal px-4 pb-16 pt-32 text-cream md:pb-20 md:pt-36">
      <div className="technical-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute inset-y-0 left-[7vw] hidden w-px bg-white/10 xl:block" aria-hidden="true" />

      <div className="editorial-shell home-hero-layout relative z-10 grid gap-14 lg:grid-cols-[minmax(0,.82fr)_minmax(440px,1.18fr)] lg:items-end lg:gap-16">
        <div className="home-hero-copy flex flex-col lg:min-h-[680px] lg:justify-between">
          <div>
            <p className="home-reveal home-reveal-1 text-[.7rem] font-semibold uppercase tracking-[.08em] text-cream/58">
              Kroinos <span className="mx-2 text-wine">/</span> Rivista indipendente
            </p>
            <h1 className="home-display home-reveal home-reveal-2 mt-8 max-w-[8ch] font-serif font-medium text-cream">
              Vino,<br />
              <em className="font-normal text-wine">territori</em><br />
              e cultura.
            </h1>
            <p className="home-reveal home-reveal-3 mt-9 max-w-[34rem] text-base leading-8 text-cream/72 md:text-lg">
              Storie di persone, luoghi e materie. Per capire quello che c’è nel bicchiere — e tutto ciò che gli sta intorno.
            </p>
          </div>

          <div className="home-reveal home-reveal-4 mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mt-16">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/articles" className="home-primary-link inline-flex min-h-14 items-center justify-between gap-8 border border-cream bg-cream px-5 py-4 text-xs font-semibold uppercase text-charcoal">
                Leggi le storie <ArrowDownRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/regions" className="home-secondary-link inline-flex min-h-14 items-center justify-between gap-8 border border-white/25 px-5 py-4 text-xs font-semibold uppercase text-cream">
                Esplora i territori <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="text-[.68rem] uppercase leading-5 tracking-[.04em] text-cream/48">
              {articleCount} {articleCount === 1 ? "storia" : "storie"}<br />
              di Carmen Buongiovanni
            </p>
          </div>
        </div>

        {article ? (
          <article className="home-cover home-reveal home-reveal-cover border-t border-white/15 pt-4">
            <div className="mb-4 flex items-center justify-between gap-4 text-[.68rem] font-semibold uppercase tracking-[.05em] text-cream/58">
              <span><span className="text-wine">In copertina</span> / {article.category}</span>
              <span>{article.date}</span>
            </div>

            <Link href={`/article/${article.slug}`} className="home-cover-image group relative block aspect-[16/11] overflow-hidden bg-white/5" aria-label={`Leggi ${article.title}`}>
              <EditorialImage
                src={article.image}
                alt={article.imageAlt}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="home-image object-cover grayscale-[.3]"
              />
              <span className="absolute bottom-0 right-0 grid h-14 w-14 place-items-center bg-wine text-white" aria-hidden="true">
                <ArrowUpRight size={19} />
              </span>
            </Link>

            <div className="grid gap-5 border-b border-white/15 py-6 md:grid-cols-[1fr_180px] md:items-end">
              <div>
                <p className="text-[.7rem] uppercase tracking-[.04em] text-cream/48">{article.region} / {article.readTime}</p>
                <h2 className="mt-3 max-w-[14ch] font-serif text-4xl leading-[.95] text-cream md:text-5xl">
                  <Link href={`/article/${article.slug}`} className="home-title-link">{article.title}</Link>
                </h2>
              </div>
              <p className="text-sm leading-6 text-cream/62">{article.subtitle}</p>
            </div>
          </article>
        ) : (
          <div className="home-reveal home-reveal-cover grid min-h-[460px] place-items-center border border-white/15 px-8 text-center">
            <div>
              <p className="font-serif text-4xl">La prossima storia è in lavorazione.</p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-cream/60">Torna presto: il nuovo numero di Kroinos sta prendendo forma.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
