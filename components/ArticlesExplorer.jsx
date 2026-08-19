"use client";

import { useMemo, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
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
        <div className="mt-10 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-white/15 bg-ink px-6 py-16 text-center">
          <p className="font-serif text-4xl text-cream">Nessuna storia in questo incrocio.</p>
          <p className="mt-4 text-sm text-cream/62">Prova a cambiare territorio, livello o parola chiave.</p>
          <button type="button" onClick={() => { setValues({}); setQuery(""); }} className="mt-7 border border-white/20 px-5 py-3 text-xs uppercase text-cream hover:border-wine hover:text-wine">
            Azzera i filtri
          </button>
        </div>
      )}
    </>
  );
}
