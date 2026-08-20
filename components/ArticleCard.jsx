import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ImageZoomLens from "@/components/ImageZoomLens";

export default function ArticleCard({ article, compact = false }) {
  return (
    <article className="card-lift group technical-panel overflow-hidden">
      <Link href={`/article/${article.slug}`} className="block h-full">
        <ImageZoomLens
          src={article.image}
          alt={article.imageAlt}
          className={compact ? "technical-image aspect-[16/9] bg-white/5" : "technical-image aspect-[16/10] bg-white/5"}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="p-6">
          <div className="flex items-center justify-between gap-4 text-[.7rem] uppercase text-cream/55">
            <span>{article.region} / {article.readTime}</span>
            <ArrowUpRight size={16} className="text-wine transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-serif text-3xl leading-[1.02] text-cream">{article.title}</h3>
          {!compact && <p className="mt-4 text-sm leading-7 text-cream/68">{article.subtitle}</p>}
          <p className="mt-6 border-t border-white/10 pt-4 text-[.7rem] uppercase text-cream/52">
            {article.category} / {article.date}
          </p>
        </div>
      </Link>
    </article>
  );
}
