import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ImageZoomLens from "@/components/ImageZoomLens";

export default function FeaturedArticle({ article }) {
  return (
    <section className="editorial-shell py-20">
      <div className="grid border border-white/15 bg-ink text-cream lg:grid-cols-[1.1fr_.9fr]">
        <Link href={`/articles/${article.slug}`} className="group technical-image min-h-[420px] overflow-hidden bg-white/5">
          <ImageZoomLens
            src={article.image}
            alt={article.imageAlt}
            className="h-full min-h-[420px]"
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
          />
        </Link>
        <div className="flex flex-col p-8 md:p-12">
          <p className="eyebrow"><span className="text-wine">01</span> / In evidenza / {article.date}</p>
          <h2 className="mt-8 font-serif text-5xl leading-none md:text-6xl">{article.title}</h2>
          <p className="mt-6 leading-8 text-cream/72">{article.subtitle}</p>
          <Link href={`/articles/${article.slug}`} className="mt-10 flex items-center justify-between border-t border-white/15 pt-6 text-xs uppercase text-cream/65 transition hover:text-wine lg:mt-auto">
            Leggi l’articolo <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
