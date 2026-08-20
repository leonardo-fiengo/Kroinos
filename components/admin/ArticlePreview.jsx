"use client";

import { Clock3 } from "lucide-react";

function PreviewBlock({ block, onSelect, selected }) {
  const shared = `group relative cursor-pointer rounded-sm outline-none transition hover:ring-2 hover:ring-wine/35 focus:ring-2 focus:ring-wine/50 ${selected ? "ring-2 ring-wine" : "ring-wine/0"}`;

  if (block.type === "heading") {
    return (
      <div role="button" tabIndex={0} onClick={onSelect} onKeyDown={(event) => event.key === "Enter" && onSelect()} className={`${shared} pt-7`}>
        <div className="mb-3 h-px w-16 bg-[#9b1327]/55" />
        <h2 className="font-serif text-3xl leading-none text-[#f1eee7]">{block.text || "Titolo della sezione"}</h2>
      </div>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote role="button" tabIndex={0} onClick={onSelect} onKeyDown={(event) => event.key === "Enter" && onSelect()} className={`${shared} border-l-2 border-[#9b1327] py-2 pl-5 font-serif text-2xl leading-tight text-[#f1eee7]`}>
        “{block.text || "Una citazione importante…"}”
      </blockquote>
    );
  }

  if (block.type === "image") {
    return (
      <figure role="button" tabIndex={0} onClick={onSelect} onKeyDown={(event) => event.key === "Enter" && onSelect()} className={shared}>
        {block.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.src} alt={block.alt || ""} className="aspect-[16/10] w-full object-cover" />
        ) : (
          <div className="grid aspect-[16/10] place-items-center border border-white/10 bg-white/5 text-xs uppercase text-white/35">URL immagine</div>
        )}
        {block.caption && <figcaption className="mt-2 text-xs text-white/42">{block.caption}</figcaption>}
      </figure>
    );
  }

  if (block.type === "button") {
    return (
      <div role="button" tabIndex={0} onClick={onSelect} onKeyDown={(event) => event.key === "Enter" && onSelect()} className={shared}>
        <span className="inline-flex min-h-11 items-center border border-[#f1eee7] bg-[#f1eee7] px-5 text-[.65rem] font-semibold uppercase text-[#080808]">{block.label || "Testo pulsante"}</span>
      </div>
    );
  }

  if (block.type === "divider") {
    return <hr role="button" tabIndex={0} onClick={onSelect} onKeyDown={(event) => event.key === "Enter" && onSelect()} className={`${shared} my-8 border-0 border-t border-white/18`} />;
  }

  return (
    <p role="button" tabIndex={0} onClick={onSelect} onKeyDown={(event) => event.key === "Enter" && onSelect()} className={`${shared} whitespace-pre-line text-[15px] leading-7 text-[#f1eee7]/72`}>
      {block.text || "Inizia a scrivere il paragrafo…"}
    </p>
  );
}

export default function ArticlePreview({ draft, readTime, viewport, onSelectBlock, selectedBlockId = "", onSelectArticle = () => {} }) {
  const previewWidth = viewport === "mobile" ? "max-w-[390px]" : "max-w-[1240px]";
  const cover = draft.coverPreview || draft.image;

  return (
    <div className="flex min-h-full justify-center bg-[#d8d3c9] p-3 sm:p-6 lg:p-8">
      <div className={`w-full ${previewWidth} overflow-hidden bg-[#080808] shadow-[0_20px_70px_rgba(0,0,0,.22)] transition-all`}>
        <header role="button" tabIndex={0} onClick={onSelectArticle} onKeyDown={(event) => event.key === "Enter" && onSelectArticle()} className={`relative flex cursor-pointer overflow-hidden outline-none ring-inset transition hover:ring-2 hover:ring-wine/35 ${viewport === "mobile" ? "min-h-[480px]" : "min-h-[620px]"} items-end p-6 sm:p-10 lg:p-14`}>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover grayscale-[.55]" />
          ) : (
            <div className="technical-grid absolute inset-0 bg-[#181818]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          <div className="relative text-[#f1eee7]">
            <p className="text-[.62rem] uppercase tracking-[.08em] text-white/58">
              {draft.category || "Categoria"} / {draft.publishedAt || "Data"} / {draft.author || "Autore"}
            </p>
            <h1 className={`mt-4 max-w-3xl font-serif leading-[.9] ${viewport === "mobile" ? "text-5xl" : "text-6xl sm:text-7xl"}`}>
              {draft.title || "Il titolo del tuo nuovo articolo"}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
              {draft.subtitle || "Il sottotitolo apparirà qui e accompagnerà il lettore dentro la storia."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[.6rem] uppercase text-white/58">
              <span className="flex items-center gap-2 border border-white/15 px-3 py-2"><Clock3 size={12} /> {readTime} min</span>
              <span className="border border-white/15 px-3 py-2">{draft.difficulty}</span>
              {(draft.tags || []).map((tag) => <span key={tag} className="border border-white/15 px-3 py-2">#{tag}</span>)}
            </div>
          </div>
        </header>

        <div className={`grid gap-12 p-6 text-[#f1eee7] sm:p-10 lg:p-14 ${viewport === "mobile" ? "" : "md:grid-cols-[minmax(0,760px)_260px] md:justify-between"}`}>
          <div>
            {draft.pullQuote && (
              <blockquote className="mb-9 border-y border-white/10 py-6 font-serif text-3xl leading-tight">“{draft.pullQuote}”</blockquote>
            )}
            <div className="space-y-6">
              {draft.blocks.map((block, index) => (
                <PreviewBlock key={block.id} block={block} selected={selectedBlockId === block.id} onSelect={() => onSelectBlock(block.id, index)} />
              ))}
            </div>
          </div>

          {viewport !== "mobile" && (
            <aside className="h-fit border border-white/10 bg-[#111] p-5">
              <p className="text-[.58rem] uppercase tracking-[.1em] text-[#c42b43]">In questa storia</p>
              <ol className="mt-4 grid gap-3 text-xs leading-5 text-white/55">
                {draft.blocks.filter((block) => block.type === "heading").map((block, index) => (
                  <li key={block.id} className="grid grid-cols-[20px_1fr] gap-2"><span className="text-[#c42b43]">{String(index + 1).padStart(2, "0")}</span>{block.text || "Sezione"}</li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
