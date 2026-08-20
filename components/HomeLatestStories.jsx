import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EditorialImage from "@/components/EditorialImage";

function StoryMeta({ article }) {
  return (
    <p className="text-[.68rem] font-semibold uppercase tracking-[.04em] text-charcoal/52">
      {article.category} / {article.region} / {article.readTime}
    </p>
  );
}

export default function HomeLatestStories({ articles }) {
  const [lead, ...supporting] = articles;

  return (
    <section className="paper-section px-4 py-20 md:py-28">
      <div className="editorial-shell">
        <header className="grid gap-7 border-b border-charcoal/20 pb-9 md:grid-cols-[1fr_320px] md:items-end">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Dal giornale</p>
            <h2 className="mt-4 font-serif text-5xl leading-none text-charcoal sm:text-6xl md:text-7xl">Ultime storie</h2>
          </div>
          <div className="md:text-right">
            <p className="text-sm leading-7 text-charcoal/68">Conversazioni, geografie e tecniche per leggere il vino come fatto culturale.</p>
            <Link href="/articles" className="home-archive-link mt-5 inline-flex min-h-11 items-center gap-4 border-b border-charcoal pb-2 text-xs font-semibold uppercase text-charcoal">
              Tutto l’archivio <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </header>

        {lead ? (
          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.28fr)_minmax(320px,.72fr)] lg:gap-16">
            <article className="home-story-link group">
              <Link href={`/article/${lead.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-charcoal/10" aria-label={`Leggi ${lead.title}`}>
                <EditorialImage
                  src={lead.image}
                  alt={lead.imageAlt}
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="home-image object-cover"
                />
              </Link>
              <div className="mt-6 grid gap-5 border-t border-charcoal/20 pt-5 sm:grid-cols-[1fr_220px] sm:items-end">
                <div>
                  <StoryMeta article={lead} />
                  <h3 className="mt-3 max-w-[15ch] font-serif text-4xl leading-[.98] text-charcoal sm:text-5xl">
                    <Link href={`/article/${lead.slug}`} className="home-title-link">{lead.title}</Link>
                  </h3>
                </div>
                <p className="text-sm leading-6 text-charcoal/66">{lead.subtitle}</p>
              </div>
            </article>

            <div className="border-t border-charcoal/20">
              {supporting.slice(0, 3).map((article, index) => (
                <article key={article.slug} className="home-story-link group border-b border-charcoal/20 py-6 first:pt-0 lg:first:pt-6">
                  <div className="grid grid-cols-[1fr_104px] gap-5 sm:grid-cols-[1fr_132px]">
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <StoryMeta article={article} />
                        <span className="hidden text-[.68rem] text-charcoal/38 sm:block">0{index + 2}</span>
                      </div>
                      <h3 className="mt-4 font-serif text-3xl leading-[1.02] text-charcoal sm:text-[2.15rem]">
                        <Link href={`/article/${article.slug}`} className="home-title-link">{article.title}</Link>
                      </h3>
                      <Link href={`/article/${article.slug}`} className="mt-auto hidden items-center gap-3 pt-5 text-[.68rem] font-semibold uppercase text-charcoal/58 sm:inline-flex">
                        Leggi <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                    <Link href={`/article/${article.slug}`} className="relative aspect-[4/5] overflow-hidden bg-charcoal/10" tabIndex={-1} aria-hidden="true">
                      <EditorialImage
                        src={article.image}
                        alt=""
                        sizes="132px"
                        className="home-image object-cover"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-b border-charcoal/20 py-20 text-center">
            <p className="font-serif text-4xl text-charcoal">La prima storia sta prendendo forma.</p>
            <p className="mt-3 text-sm text-charcoal/62">Il giornale sarà presto online.</p>
          </div>
        )}
      </div>
    </section>
  );
}
