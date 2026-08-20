"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import EditorialImage from "@/components/EditorialImage";
import FilterBar from "@/components/FilterBar";

const keys = [
  { key: "category", label: "Categoria" },
  { key: "region", label: "Territorio" },
  { key: "difficulty", label: "Livello" }
];

export default function ArticlesExplorer({ articles }) {
  const [values, setValues] = useState({});
  const [query, setQuery] = useState("");
  const filters = keys.map((item) => ({
    ...item,
    options: [...new Set(articles.map((article) => article[item.key]))].sort((a, b) => a.localeCompare(b, "it"))
  }));

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("it");

    return articles.filter((article) => {
      const matchesFilters = keys.every(({ key }) => !values[key] || values[key] === "Tutti" || article[key] === values[key]);
      const searchable = [article.title, article.subtitle, article.category, article.region, article.author].join(" ").toLocaleLowerCase("it");
      return matchesFilters && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [articles, query, values]);

  return (
    <>
      <FilterBar
        filters={filters}
        values={values}
        query={query}
        onQueryChange={setQuery}
        onChange={(key, value) => setValues((current) => ({ ...current, [key]: value }))}
        onReset={() => { setValues({}); setQuery(""); }}
        resultCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <div className="border-t border-charcoal/20">
          {filtered.map((article, index) => (
            <article key={article.slug} className="archive-story-row group grid grid-cols-[32px_1fr] gap-5 border-b border-charcoal/20 py-7 md:grid-cols-[40px_220px_1fr_24px] md:items-center md:gap-7">
              <span className="text-[.68rem] font-semibold text-wine">{String(index + 1).padStart(2, "0")}</span>
              <Link href={`/article/${article.slug}`} className="relative col-span-2 aspect-[16/9] overflow-hidden bg-charcoal/10 md:col-span-1" tabIndex={-1} aria-hidden="true">
                <EditorialImage src={article.image} alt="" sizes="220px" className="archive-story-image object-cover" />
              </Link>
              <div className="col-span-2 md:col-span-1">
                <p className="text-[.68rem] font-semibold uppercase tracking-[.04em] text-charcoal/48">
                  {article.category} / {article.region} / {article.date}
                </p>
                <h2 className="mt-3 max-w-[22ch] font-serif text-3xl leading-[1.02] text-charcoal sm:text-4xl">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-charcoal/64">{article.subtitle}</p>
              </div>
              <ArrowUpRight className="hidden text-wine md:block" size={18} aria-hidden="true" />
            </article>
          ))}
        </div>
      ) : (
        <div className="border-b border-charcoal/20 px-6 py-20 text-center">
          <p className="font-serif text-4xl text-charcoal">Nessuna storia in questo incrocio.</p>
          <p className="mt-4 text-sm text-charcoal/62">Prova a cambiare territorio, livello o parola chiave.</p>
          <button type="button" onClick={() => { setValues({}); setQuery(""); }} className="home-primary-link mt-7 border border-charcoal bg-charcoal px-5 py-3 text-xs font-semibold uppercase text-cream">
            Azzera i filtri
          </button>
        </div>
      )}
    </>
  );
}
