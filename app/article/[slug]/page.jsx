import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import ArticleCard from "@/components/ArticleCard";
import EditorialImage from "@/components/EditorialImage";
import NewsletterCta from "@/components/NewsletterCta";
import ShareButton from "@/components/ShareButton";
import TastingMeter from "@/components/TastingMeter";
import WineProgressBar from "@/components/WineProgressBar";
import { getArticleNodes } from "@/lib/article-content";
import { getArticles } from "@/lib/article-store";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.subtitle,
    authors: [{ name: article.author }],
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.subtitle,
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: [article.category, article.region, article.difficulty, ...(article.tags || [])],
      images: [{ url: article.image, alt: article.imageAlt }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle,
      images: [article.image]
    }
  };
}

export default async function ArticleDetailPage({ params }) {
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === params.slug);
  if (!article) notFound();

  const nodes = getArticleNodes(article);
  const headings = nodes.filter((node) => node.type === "heading");
  const related = articles
    .filter((item) => item.slug !== article.slug && (item.category === article.category || item.region === article.region))
    .slice(0, 3);
  const showEditorialMap = Boolean(article.bottle);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.subtitle,
    image: absoluteUrl(article.image),
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: absoluteUrl(`/article/${article.slug}`),
    articleSection: article.category,
    keywords: article.tags?.join(", "),
    inLanguage: "it-IT"
  };

  return (
    <AnimatedPageWrapper>
      <WineProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }} />

      <article className="pb-20">
        <header className="relative flex min-h-[78svh] items-end overflow-hidden border-b border-white/10 px-4 pb-14 pt-36 text-cream">
          <EditorialImage src={article.image} alt={article.imageAlt} priority sizes="100vw" className="object-cover grayscale-[.55]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/68 to-black/25" />
          <div className="technical-grid absolute inset-0 opacity-75" />
          <div className="editorial-shell relative">
            <Link href="/articles" className="mb-9 inline-flex min-h-11 items-center gap-3 text-[.7rem] uppercase text-cream/65 hover:text-wine">
              <ArrowLeft size={15} aria-hidden="true" /> Archivio
            </Link>
            <p className="text-xs uppercase text-cream/68">
              {article.category} / <time dateTime={article.publishedAt}>{article.date}</time> / {article.author}
            </p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[.9] text-cream sm:text-6xl md:text-8xl">{article.title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-cream/80">{article.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="border border-white/15 px-4 py-3 text-[.7rem] uppercase text-cream/65">{article.readTime} di lettura</span>
              <span className="border border-white/15 px-4 py-3 text-[.7rem] uppercase text-cream/65">{article.difficulty}</span>
              {(article.tags || []).map((tag) => (
                <span key={tag} className="border border-white/15 px-4 py-3 text-[.7rem] uppercase text-cream/65">#{tag}</span>
              ))}
              <ShareButton title={article.title} />
            </div>
          </div>
        </header>

        <div className="editorial-shell mt-16 grid gap-12 lg:grid-cols-[minmax(0,760px)_330px] lg:justify-between">
          <div className="max-w-none text-lg leading-9 text-cream/76">
            {article.pullQuote && (
              <blockquote className="mb-12 border-y border-white/12 py-8 font-serif text-3xl leading-tight text-cream md:text-4xl">
                “{article.pullQuote}”
              </blockquote>
            )}

            <div className="space-y-7">
              {nodes.length > 0 ? nodes.map((node, index) => {
                if (node.type === "heading") {
                  return (
                    <div key={`${node.id}-${index}`} className="scroll-mt-28 pt-10" id={node.id}>
                      <div className="mb-5 h-px w-24 bg-wine/40" />
                      <h2 className="font-serif text-4xl leading-none text-cream md:text-5xl">{node.text}</h2>
                    </div>
                  );
                }

                if (node.type === "question") {
                  return (
                    <div key={`${node.text.slice(0, 40)}-${index}`} className="border border-white/15 bg-ink p-6">
                      <p className="mb-3 text-[.7rem] uppercase text-wine">Domanda</p>
                      <p className="whitespace-pre-line font-serif text-2xl leading-tight text-cream md:text-3xl">{node.text}</p>
                    </div>
                  );
                }

                if (node.type === "quote") {
                  return (
                    <blockquote key={`${node.text.slice(0, 40)}-${index}`} className="border-l-2 border-wine pl-6 font-serif text-3xl leading-tight text-cream">
                      “{node.text}”
                    </blockquote>
                  );
                }

                if (node.type === "image") {
                  return (
                    <figure key={`${node.src}-${index}`} className="py-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={node.src} alt={node.alt} className="w-full border border-white/10" />
                      {node.caption && <figcaption className="mt-3 text-sm text-cream/55">{node.caption}</figcaption>}
                    </figure>
                  );
                }

                if (node.type === "button") {
                  const external = /^https?:\/\//i.test(node.href);
                  return (
                    <a key={`${node.href}-${index}`} href={node.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="inline-flex min-h-12 items-center border border-cream bg-cream px-5 text-xs font-semibold uppercase text-charcoal transition hover:bg-white">
                      {node.label}
                    </a>
                  );
                }

                if (node.type === "divider") {
                  return <hr key={`divider-${index}`} className="my-10 border-0 border-t border-white/15" />;
                }

                return <p key={`${node.text.slice(0, 40)}-${index}`} className="whitespace-pre-line">{node.text}</p>;
              }) : <p>Testo non disponibile.</p>}
            </div>

            {article.sourceUrl && (
              <div className="mt-14 border border-white/12 bg-ink p-6 text-sm leading-7 text-cream/62">
                <p className="text-[.7rem] uppercase text-wine">Fonte editoriale</p>
                <p className="mt-3">{article.sourceLabel || "Consulta la pubblicazione originale."}</p>
                <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-3 font-semibold text-cream hover:text-wine">
                  Consulta la fonte originale <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {(headings.length > 0 || showEditorialMap) && (
            <aside className="h-fit space-y-5 lg:sticky lg:top-28">
              {headings.length > 0 && (
                <nav className="technical-panel p-6" aria-label="Indice dell’articolo">
                  <p className="mb-5 text-[.7rem] uppercase text-wine">In questa storia</p>
                  <ol className="grid gap-3 text-sm leading-6 text-cream/65">
                    {headings.map((heading, index) => (
                      <li key={heading.id}>
                        <a href={`#${heading.id}`} className="grid grid-cols-[24px_1fr] gap-2 hover:text-cream">
                          <span className="text-wine">{String(index + 1).padStart(2, "0")}</span>
                          <span>{heading.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {showEditorialMap && (
                <div className="technical-panel p-6">
                  <p className="mb-3 text-[.7rem] uppercase text-wine">Mappa editoriale</p>
                  <p className="mb-8 font-serif text-3xl leading-none text-cream">{article.bottle}</p>
                  <p className="mb-6 text-[.7rem] uppercase text-cream/55">Relazioni sensoriali</p>
                  <TastingMeter notes={article.notes} />
                </div>
              )}
            </aside>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="technical-grid border-t border-white/10 px-4 py-16">
          <div className="editorial-shell">
            <p className="eyebrow"><span className="text-wine">RR</span> / Continua a leggere</p>
            <h2 className="mt-5 font-serif text-5xl text-cream md:text-6xl">Storie in relazione</h2>
            <div className="mt-9 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => <ArticleCard key={item.slug} article={item} compact />)}
            </div>
          </div>
        </section>
      )}

      <NewsletterCta light />
    </AnimatedPageWrapper>
  );
}
