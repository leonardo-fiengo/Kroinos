"use client";

import Link from "next/link";
import { ArrowUpRight, FilePlus2, Library, LogOut, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import CanvasArticleEditor from "@/components/admin/CanvasArticleEditor";

function ArticleLibrary({ articles, storeStatus, onCreate, onEdit, onDelete }) {
  const [query, setQuery] = useState("");
  const filtered = articles.filter((article) => [article.title, article.category, article.region, article.author]
    .join(" ")
    .toLocaleLowerCase("it")
    .includes(query.toLocaleLowerCase("it")));

  return (
    <div className="h-full overflow-y-auto bg-[#ebe7de] p-4 sm:p-8 lg:p-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-[#171614]/12 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[.65rem] font-semibold uppercase tracking-[.14em] text-wine">Studio editoriale</p>
            <h1 className="mt-3 font-serif text-6xl leading-none">Articoli</h1>
            <p className="mt-4 text-sm text-[#171614]/52">Crea, modifica o elimina una storia.</p>
          </div>
          <button onClick={onCreate} className="flex min-h-14 items-center justify-between gap-10 bg-[#171614] px-6 text-xs font-semibold uppercase tracking-[.08em] text-white hover:bg-wine">
            Nuovo articolo <Plus size={18} />
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex min-h-12 w-full max-w-md items-center border border-[#171614]/14 bg-white px-4 focus-within:border-wine">
            <Search size={17} className="mr-3 text-[#171614]/35" />
            <span className="sr-only">Cerca articoli</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Cerca per titolo, categoria o autore…" />
          </label>
          <p className="text-xs text-[#171614]/42">{filtered.length} {filtered.length === 1 ? "articolo" : "articoli"} · {storeStatus.mode === "github" ? "GitHub collegato" : "Archivio locale"}</p>
        </div>

        <div className="mt-5 overflow-hidden border border-[#171614]/12 bg-white">
          {filtered.length > 0 ? filtered.map((article) => (
            <article key={article.slug} className="grid gap-4 border-b border-[#171614]/10 p-4 last:border-b-0 sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:items-center sm:p-5">
              <div className="relative hidden aspect-[4/3] overflow-hidden bg-[#171614]/5 sm:block">
                {article.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={article.image} alt="" className="absolute inset-0 h-full w-full object-cover grayscale-[.35]" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[.62rem] font-semibold uppercase tracking-[.09em] text-wine">{article.category} / {article.date}</p>
                <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">{article.title}</h2>
                <p className="mt-2 truncate text-xs text-[#171614]/42">/article/{article.slug}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Link href={`/article/${article.slug}`} target="_blank" className="grid h-11 w-11 place-items-center border border-[#171614]/12 text-[#171614]/45 hover:border-wine hover:text-wine" aria-label={`Apri ${article.title}`}><ArrowUpRight size={16} /></Link>
                <button onClick={() => onEdit(article)} className="flex min-h-11 items-center gap-2 border border-[#171614]/14 px-4 text-xs font-semibold uppercase hover:border-wine hover:text-wine"><Pencil size={15} /> Modifica</button>
                <button onClick={() => onDelete(article)} className="grid h-11 w-11 place-items-center border border-[#171614]/12 text-[#171614]/40 hover:border-red-700 hover:text-red-700" aria-label={`Elimina ${article.title}`}><Trash2 size={15} /></button>
              </div>
            </article>
          )) : (
            <div className="p-12 text-center"><p className="font-serif text-3xl">Nessun articolo trovato</p><p className="mt-3 text-sm text-[#171614]/45">Prova con un’altra ricerca.</p></div>
          )}
        </div>

        {!storeStatus.ready && <p className="mt-5 border-l-2 border-amber-600 bg-amber-50 p-4 text-sm text-amber-950">Configura l’archivio GitHub prima di pubblicare dal sito online.</p>}
      </div>
    </div>
  );
}

function DeleteDialog({ article, busy, onCancel, onConfirm }) {
  if (!article) return null;
  return (
    <div className="fixed inset-0 z-[140] grid place-items-center bg-black/65 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-title">
      <div className="w-full max-w-md bg-[#f8f6f1] p-6 text-[#171614] shadow-2xl sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center bg-red-50 text-red-700"><Trash2 size={20} /></div>
        <h2 id="delete-title" className="mt-6 font-serif text-4xl">Eliminare l’articolo?</h2>
        <p className="mt-4 text-sm leading-7 text-[#171614]/58">“{article.title}” non sarà più visibile sul sito. Questa azione viene salvata nell’archivio editoriale.</p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button onClick={onCancel} disabled={busy} className="min-h-12 border border-[#171614]/15 text-xs font-semibold uppercase hover:border-[#171614]">Annulla</button>
          <button onClick={onConfirm} disabled={busy} className="min-h-12 bg-red-700 text-xs font-semibold uppercase text-white hover:bg-red-800 disabled:opacity-45">{busy ? "Elimino…" : "Sì, elimina"}</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminStudio({ initialArticles, storeStatus }) {
  const [articles, setArticles] = useState(initialArticles);
  const [view, setView] = useState("library");
  const [editingArticle, setEditingArticle] = useState(null);
  const [editorKey, setEditorKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function createArticle() {
    setEditingArticle(null);
    setEditorKey((value) => value + 1);
    setView("editor");
  }

  function editArticle(article) {
    setEditingArticle(article);
    setEditorKey((value) => value + 1);
    setView("editor");
  }

  function handleSaved(article, previousSlug) {
    setArticles((current) => [article, ...current.filter((item) => item.slug !== previousSlug && item.slug !== article.slug)]);
    setEditingArticle(article);
  }

  async function deleteArticle() {
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/articles/${encodeURIComponent(deleteTarget.slug)}`, { method: "DELETE" });
      const result = await response.json();
      if (response.status === 401) return window.location.reload();
      if (!response.ok) throw new Error(result.error || "Non è stato possibile eliminare l’articolo.");
      setArticles((current) => current.filter((article) => article.slug !== deleteTarget.slug));
      setDeleteTarget(null);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setDeleting(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  if (view === "editor") {
    return <CanvasArticleEditor key={editorKey} article={editingArticle} storeStatus={storeStatus} onBack={() => setView("library")} onSaved={handleSaved} />;
  }

  return (
    <main className="fixed inset-0 z-[100] flex min-h-0 bg-[#ebe7de] text-[#171614]">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-white/10 bg-[#0b0b0b] p-5 text-white lg:flex">
        <Link href="/" target="_blank" className="px-2 py-4 font-serif text-3xl">Kroinos<span className="text-wine">.</span></Link>
        <nav className="mt-9 grid gap-2" aria-label="Admin">
          <button className="flex min-h-12 items-center gap-3 bg-white/10 px-3 text-left text-xs font-semibold uppercase tracking-[.07em] text-white"><Library size={16} /> Articoli</button>
          <button onClick={createArticle} className="flex min-h-12 items-center gap-3 px-3 text-left text-xs font-semibold uppercase tracking-[.07em] text-white/48 hover:text-white"><FilePlus2 size={16} /> Nuovo articolo</button>
        </nav>
        <div className="mt-auto border-t border-white/10 pt-5">
          <Link href="/" target="_blank" className="flex min-h-11 items-center gap-3 px-3 text-xs uppercase text-white/42 hover:text-white"><ArrowUpRight size={15} /> Apri il sito</Link>
          <button onClick={logout} className="flex min-h-11 w-full items-center gap-3 px-3 text-xs uppercase text-white/42 hover:text-white"><LogOut size={15} /> Esci</button>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-16 items-center border-b border-[#171614]/12 bg-[#f8f6f1] px-4 lg:hidden">
          <span className="font-serif text-2xl">Kroinos<span className="text-wine">.</span></span>
          <div className="ml-auto flex gap-1">
            <button className="grid h-10 w-10 place-items-center bg-[#171614] text-white" aria-label="Articoli"><Library size={16} /></button>
            <button onClick={createArticle} className="grid h-10 w-10 place-items-center text-[#171614]/45" aria-label="Nuovo articolo"><FilePlus2 size={16} /></button>
            <button onClick={logout} className="grid h-10 w-10 place-items-center text-[#171614]/45" aria-label="Esci"><LogOut size={16} /></button>
          </div>
        </header>
        <div className="min-h-0 flex-1"><ArticleLibrary articles={articles} storeStatus={storeStatus} onCreate={createArticle} onEdit={editArticle} onDelete={setDeleteTarget} /></div>
      </section>

      <DeleteDialog article={deleteTarget} busy={deleting} onCancel={() => setDeleteTarget(null)} onConfirm={deleteArticle} />
    </main>
  );
}
