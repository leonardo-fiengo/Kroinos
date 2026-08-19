import { readFileSync } from "fs";
import { join } from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCta from "@/components/NewsletterCta";
import ShareButton from "@/components/ShareButton";
import TastingMeter from "@/components/TastingMeter";
import WineProgressBar from "@/components/WineProgressBar";
import { articles } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

function readArticleText(article) {
  if (!article.textFile) return [];

  try {
    const filePath = join(process.cwd(), "testi", article.textFile);
    const raw = readFileSync(filePath, "utf8").replace(/\r\n/g, "\n").trim();
    return raw
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function normalizeTitle(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("it")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

function slugify(value, index) {
  const slug = normalizeTitle(value).replace(/\s+/g, "-").slice(0, 70);
  return `${slug || "sezione"}-${index}`;
}

function isHeading(value) {
  const clean = value.trim();
  if (!clean || clean.length > 100 || /[?.!]$/.test(clean)) return false;
  return clean.split(/\s+/).length <= 10;
}

function isQuestion(value) {
  return value.includes("?") && value.length <= 1000;
}

function parseArticle(article) {
  const interview = [
    "intervista-alterata-fabio-rizzari",
    "grandi-langhe-sergio-germano",
    "max-d-addario-stilista-olio"
  ].includes(article.slug);

  const nodes = [];
  const sourceTitles = [article.title, article.sourceTitle].filter(Boolean).map(normalizeTitle);

  readArticleText(article).forEach((block, blockIndex) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);

    if (blockIndex === 0 && lines[0]) {
      const firstLine = normalizeTitle(lines[0]);
      if (sourceTitles.includes(firstLine)) return;
    }

    if (lines.length > 1 && isHeading(lines[0])) {
      const heading = lines[0];
      const body = lines.slice(1).join("\n");
      nodes.push({ type: "heading", text: heading, id: slugify(heading, blockIndex) });
      if (body) nodes.push({ type: interview && isQuestion(body) ? "question" : "paragraph", text: body });
      return;
    }

    if (isHeading(block)) {
      nodes.push({ type: "heading", text: block, id: slugify(block, blockIndex) });
    } else if (interview && isQuestion(block)) {
      nodes.push({ type: "question", text: block });
    } else {
      nodes.push({ type: "paragraph", text: block });
    }
  });

  return nodes;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }) {
  const article = articles.find((item) => item.slug === params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.subtitle,
    authors: [{ name: article.author }],
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.subtitle,
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: [article.category, article.region, article.difficulty],
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

export default function ArticleDetailPage({ params }) {
  const article = articles.find((item) => item.slug === params.slug);
  if (!article) notFound();

  const nodes = parseArticle(article);
  const headings = nodes.filter((node) => node.type === "heading");
  const related = articles
    .filter((item) => item.slug !== article.slug && (item.category === article.category || item.region === article.region))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.subtitle,
    image: absoluteUrl(article.image),
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    articleSection: article.category,
    inLanguage: "it-IT"
  };

  return (
    <AnimatedPageWrapper>
      <WineProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }} />

      <article className="pb-20">
        <header className="relative flex min-h-[78svh] items-end overflow-hidden border-b border-white/10 px-4 pb-14 pt-36 text-cream">
          <Image src={article.image} alt={article.imageAlt} fill priority sizes="100vw" className="object-cover grayscale-[.55]" />
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

                return <p key={`${node.text.slice(0, 40)}-${index}`} className="whitespace-pre-line">{node.text}</p>;
              }) : <p>Testo non disponibile.</p>}
            </div>

            <div className="mt-14 border border-white/12 bg-ink p-6 text-sm leading-7 text-cream/62">
              <p className="text-[.7rem] uppercase text-wine">Fonte editoriale</p>
              <p className="mt-3">Questa storia rimanda alla pubblicazione originale su Vitae / AIS Italia.</p>
              <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-3 font-semibold text-cream hover:text-wine">
                Consulta la fonte originale <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

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

            <div className="technical-panel p-6">
              <p className="mb-3 text-[.7rem] uppercase text-wine">Mappa editoriale</p>
              <p className="mb-8 font-serif text-3xl leading-none text-cream">{article.bottle}</p>
              <p className="mb-6 text-[.7rem] uppercase text-cream/55">Relazioni sensoriali</p>
              <TastingMeter notes={article.notes} />
            </div>
          </aside>
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
