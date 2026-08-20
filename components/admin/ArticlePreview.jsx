"use client";

import {
  AlignLeft,
  ChevronDown,
  ChevronUp,
  Clock3,
  GripVertical,
  Image as ImageIcon,
  Minus,
  Plus,
  Quote,
  Square,
  Type
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const insertOptions = [
  { type: "heading", label: "Titolo", icon: Type },
  { type: "paragraph", label: "Paragrafo", icon: AlignLeft },
  { type: "image", label: "Immagine", icon: ImageIcon },
  { type: "button", label: "Pulsante", icon: Square },
  { type: "quote", label: "Citazione", icon: Quote },
  { type: "divider", label: "Separatore", icon: Minus }
];

function alignmentClass(align) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

function AutoTextarea({ value, onChange, onFocus, className, placeholder, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.max(element.scrollHeight, 44)}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onClick={(event) => event.stopPropagation()}
      onFocus={onFocus}
      aria-label={label}
      placeholder={placeholder}
      rows={1}
      className={`block w-full resize-none overflow-hidden bg-transparent outline-none placeholder:text-current placeholder:opacity-40 ${className}`}
    />
  );
}

function InsertControl({ index, open, onOpen, onInsert }) {
  return (
    <div className="group/insert relative z-20 flex h-7 items-center justify-center" data-insert-index={index}>
      <div className="absolute inset-x-0 h-px bg-white/0 transition-colors duration-150 group-hover/insert:bg-white/12 group-focus-within/insert:bg-white/12" />
      <button
        type="button"
        onClick={() => onOpen(open ? null : index)}
        className={`relative grid h-9 w-9 place-items-center border border-white/15 bg-[#151515] text-white shadow-lg transition-[opacity,transform,background-color] duration-150 active:scale-[.98] ${open ? "opacity-100" : "opacity-45 hover:opacity-100 focus:opacity-100"}`}
        aria-label="Aggiungi un blocco qui"
        aria-expanded={open}
      >
        <Plus size={16} strokeWidth={1.8} />
      </button>

      {open && (
        <div className="absolute top-10 z-30 grid w-[min(440px,calc(100vw-3rem))] grid-cols-2 gap-1 border border-white/15 bg-[#151515] p-2 text-cream shadow-2xl sm:grid-cols-3">
          {insertOptions.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => { onInsert(type, index); onOpen(null); }}
              className="flex min-h-11 items-center gap-2 px-3 text-left text-[13px] hover:bg-white/8 active:scale-[.98]"
            >
              <Icon size={16} strokeWidth={1.7} /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BlockControls({ index, total, onMove, onDragStart, onDragEnd }) {
  return (
    <div className="absolute -left-12 top-1 z-10 hidden flex-col overflow-hidden border border-white/15 bg-[#171717] text-white shadow-xl sm:flex">
      <span
        draggable
        onDragStart={(event) => { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", String(index)); onDragStart(index); }}
        onDragEnd={onDragEnd}
        className="grid h-9 w-9 cursor-grab place-items-center active:cursor-grabbing"
        title="Trascina per spostare"
      >
        <GripVertical size={16} strokeWidth={1.7} />
      </span>
      <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0} className="grid h-9 w-9 place-items-center border-t border-white/10 hover:bg-white/10 disabled:opacity-25" aria-label="Sposta il blocco in alto"><ChevronUp size={15} /></button>
      <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1} className="grid h-9 w-9 place-items-center border-t border-white/10 hover:bg-white/10 disabled:opacity-25" aria-label="Sposta il blocco in basso"><ChevronDown size={15} /></button>
    </div>
  );
}

function PreviewBlock({ block, index, total, selected, dragOver, readOnly, onSelect, onUpdate, onMove, onDragStart, onDragOver, onDrop, onDragEnd }) {
  const textClasses = `${alignmentClass(block.align)} ${block.bold ? "font-semibold" : ""} ${block.italic ? "italic" : ""}`;
  const shared = `group/block relative rounded-sm outline-none ring-inset transition-[box-shadow,background-color,opacity] duration-150 ${readOnly ? "" : "cursor-text hover:ring-2 hover:ring-wine/35 focus:ring-2 focus:ring-wine/50"} ${selected ? "bg-white/[.025] ring-2 ring-wine" : "ring-wine/0"} ${dragOver && !readOnly ? "before:absolute before:-top-3 before:inset-x-0 before:h-0.5 before:bg-wine" : ""}`;

  function selectOnKey(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  }

  let content;
  if (block.type === "heading") {
    const Heading = block.level === 3 ? "h3" : "h2";
    content = (
      <div className={`${shared} pt-7`} role={readOnly ? undefined : "group"} tabIndex={readOnly ? undefined : 0} onClick={readOnly ? undefined : onSelect} onKeyDown={readOnly ? undefined : selectOnKey}>
        <div className={`mb-3 h-px w-16 bg-[#9b1327]/55 ${block.align === "center" ? "mx-auto" : block.align === "right" ? "ml-auto" : ""}`} />
        {!readOnly ? (
          <AutoTextarea value={block.text} onChange={(text) => onUpdate({ text })} onFocus={onSelect} label="Testo del titolo" placeholder="Titolo della sezione" className={`${textClasses} font-serif ${block.level === 3 ? "text-2xl" : "text-3xl"} leading-none text-[#f1eee7]`} />
        ) : (
          <Heading className={`${textClasses} font-serif ${block.level === 3 ? "text-2xl" : "text-3xl"} leading-none text-[#f1eee7]`}>{block.text || "Titolo della sezione"}</Heading>
        )}
      </div>
    );
  } else if (block.type === "quote") {
    content = (
      <blockquote className={`${shared} border-l-2 border-[#9b1327] py-2 pl-5 font-serif text-2xl leading-tight text-[#f1eee7] ${textClasses}`} tabIndex={readOnly ? undefined : 0} onClick={readOnly ? undefined : onSelect} onKeyDown={readOnly ? undefined : selectOnKey}>
        {!readOnly ? <AutoTextarea value={block.text} onChange={(text) => onUpdate({ text })} onFocus={onSelect} label="Testo della citazione" placeholder="Una citazione importante…" className={`${textClasses} font-serif text-2xl leading-tight text-[#f1eee7]`} /> : <>“{block.text || "Una citazione importante…"}”</>}
      </blockquote>
    );
  } else if (block.type === "image") {
    const image = block.preview || block.src;
    content = (
      <figure className={shared} tabIndex={readOnly ? undefined : 0} onClick={readOnly ? undefined : onSelect} onKeyDown={readOnly ? undefined : selectOnKey}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="aspect-[16/10] w-full object-cover" />
        ) : (
          <div className="grid aspect-[16/10] place-items-center border border-dashed border-white/20 bg-white/5 text-center text-[13px] text-white/62">
            <span><ImageIcon size={22} className="mx-auto mb-3" />Seleziona il blocco e scegli un’immagine</span>
          </div>
        )}
        {block.caption && <figcaption className="mt-2 text-[13px] text-white/58">{block.caption}</figcaption>}
      </figure>
    );
  } else if (block.type === "button") {
    content = (
      <div className={shared} tabIndex={readOnly ? undefined : 0} onClick={readOnly ? undefined : onSelect} onKeyDown={readOnly ? undefined : selectOnKey}>
        <span className="inline-flex min-h-11 items-center border border-[#f1eee7] bg-[#f1eee7] px-5 text-xs font-semibold uppercase text-[#080808]">{block.label || "Testo pulsante"}</span>
      </div>
    );
  } else if (block.type === "divider") {
    content = <div className={`${shared} py-5`} tabIndex={readOnly ? undefined : 0} onClick={readOnly ? undefined : onSelect} onKeyDown={readOnly ? undefined : selectOnKey}><hr className="border-0 border-t border-white/18" /></div>;
  } else {
    content = (
      <div className={shared} tabIndex={readOnly ? undefined : 0} onClick={readOnly ? undefined : onSelect} onKeyDown={readOnly ? undefined : selectOnKey}>
        {!readOnly ? (
          <AutoTextarea value={block.text} onChange={(text) => onUpdate({ text })} onFocus={onSelect} label="Testo del paragrafo" placeholder="Inizia a scrivere il paragrafo…" className={`${textClasses} text-[16px] leading-8 text-[#f1eee7]/78`} />
        ) : (
          <p className={`${textClasses} whitespace-pre-line text-[16px] leading-8 text-[#f1eee7]/78`}>{block.text || "Inizia a scrivere il paragrafo…"}</p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative py-1 transition-opacity duration-150 ${selected ? "z-10" : ""}`}
      data-preview-index={index}
      onDragOver={(event) => { event.preventDefault(); onDragOver(index); }}
      onDrop={(event) => { event.preventDefault(); onDrop(index); }}
    >
      {selected && !readOnly && <BlockControls index={index} total={total} onMove={onMove} onDragStart={onDragStart} onDragEnd={onDragEnd} />}
      {content}
      {block.href && !readOnly && <span className="mt-2 block text-[12px] text-wine">Collegato a {block.href}</span>}
    </div>
  );
}

export default function ArticlePreview({
  draft,
  readTime,
  viewport,
  onSelectBlock,
  onUpdateBlock,
  onUpdateArticle,
  onInsertBlock,
  onMoveBlock,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  dragOverIndex,
  readOnly = false,
  selectedBlockId = "",
  onSelectArticle = () => {}
}) {
  const [insertAt, setInsertAt] = useState(null);
  const previewWidth = viewport === "mobile" ? "max-w-[390px]" : "max-w-[1240px]";
  const cover = draft.coverPreview || draft.image;
  const editingArticle = selectedBlockId === "article";

  return (
    <div className="flex min-h-full justify-center bg-[#d8d3c9] p-3 sm:p-6 lg:p-8">
      <div className={`w-full ${previewWidth} overflow-hidden bg-[#080808] shadow-[0_20px_70px_rgba(36,30,22,.22)] transition-[max-width] duration-300 ease-out`}>
        <header onClick={readOnly ? undefined : onSelectArticle} className={`group/header relative flex items-end overflow-hidden ring-inset transition-[box-shadow] duration-150 ${readOnly ? "" : "cursor-text hover:ring-2 hover:ring-wine/35"} ${editingArticle ? "ring-2 ring-wine" : ""} ${viewport === "mobile" ? "min-h-[480px]" : "min-h-[620px]"} p-6 sm:p-10 lg:p-14`}>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover grayscale-[.55]" />
          ) : <div className="technical-grid absolute inset-0 bg-[#181818]" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          {!readOnly && <button type="button" onClick={(event) => { event.stopPropagation(); onSelectArticle(); }} className="absolute right-4 top-4 z-10 min-h-11 border border-white/20 bg-black/60 px-4 text-[12px] text-white opacity-70 backdrop-blur-sm hover:opacity-100">Modifica testata</button>}
          <div className="relative w-full text-[#f1eee7]">
            <p className="text-[12px] uppercase tracking-[.05em] text-white/70">{draft.category || "Categoria"} / {draft.publishedAt || "Data"} / {draft.author || "Autore"}</p>
            {!readOnly ? (
              <AutoTextarea value={draft.title} onChange={(title) => onUpdateArticle("title", title)} onFocus={onSelectArticle} label="Titolo dell’articolo" placeholder="Titolo del nuovo articolo" className={`mt-4 max-w-3xl font-serif leading-[.9] ${viewport === "mobile" ? "text-5xl" : "text-6xl sm:text-7xl"}`} />
            ) : (
              <h1 className={`mt-4 max-w-3xl font-serif leading-[.9] ${viewport === "mobile" ? "text-5xl" : "text-6xl sm:text-7xl"}`}>{draft.title || "Il titolo del tuo nuovo articolo"}</h1>
            )}
            {!readOnly ? (
              <AutoTextarea value={draft.subtitle} onChange={(subtitle) => onUpdateArticle("subtitle", subtitle)} onFocus={onSelectArticle} label="Introduzione dell’articolo" placeholder="Scrivi una breve introduzione" className="mt-6 max-w-xl text-[15px] leading-7 text-white/78" />
            ) : (
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/78">{draft.subtitle || "Il sottotitolo apparirà qui e accompagnerà il lettore dentro la storia."}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-2 text-[12px] uppercase text-white/68">
              <span className="flex items-center gap-2 border border-white/15 px-3 py-2"><Clock3 size={13} /> {readTime} min</span>
              <span className="border border-white/15 px-3 py-2">{draft.difficulty}</span>
              {(draft.tags || []).map((tag) => <span key={tag} className="border border-white/15 px-3 py-2">#{tag}</span>)}
            </div>
          </div>
        </header>

        <div className={`grid gap-12 p-6 text-[#f1eee7] sm:p-10 lg:p-14 ${viewport === "mobile" ? "" : "md:grid-cols-[minmax(0,760px)_260px] md:justify-between"}`}>
          <div>
            {draft.pullQuote && <blockquote className="mb-9 border-y border-white/10 py-6 font-serif text-3xl leading-tight">“{draft.pullQuote}”</blockquote>}
            {!readOnly && <InsertControl index={0} open={insertAt === 0} onOpen={setInsertAt} onInsert={onInsertBlock} />}
            {draft.blocks.map((block, index) => (
              <div key={block.id}>
                <PreviewBlock
                  block={block}
                  index={index}
                  total={draft.blocks.length}
                  selected={selectedBlockId === block.id}
                  dragOver={dragOverIndex === index}
                  readOnly={readOnly}
                  onSelect={() => onSelectBlock(block.id, index)}
                  onUpdate={(patch) => onUpdateBlock(block.id, patch)}
                  onMove={onMoveBlock}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragEnd={onDragEnd}
                />
                {!readOnly && <InsertControl index={index + 1} open={insertAt === index + 1} onOpen={setInsertAt} onInsert={onInsertBlock} />}
              </div>
            ))}
          </div>

          {viewport !== "mobile" && (
            <aside className="h-fit border border-white/10 bg-[#111] p-5">
              <p className="text-[12px] font-semibold text-[#d94459]">In questa storia</p>
              <ol className="mt-4 grid gap-3 text-[13px] leading-5 text-white/65">
                {draft.blocks.filter((block) => block.type === "heading").map((block, index) => (
                  <li key={block.id} className="grid grid-cols-[20px_1fr] gap-2"><span className="text-[#d94459]">{String(index + 1).padStart(2, "0")}</span>{block.text || "Sezione"}</li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
