"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Image as ImageIcon,
  Italic,
  Link2,
  Maximize2,
  Minimize2,
  Minus,
  Monitor,
  Plus,
  Quote,
  Redo2,
  Save,
  Settings,
  Smartphone,
  Square,
  Trash2,
  Type,
  Undo2,
  Upload,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ArticlePreview from "@/components/admin/ArticlePreview";

const inputClass = "mt-2 min-h-11 w-full border border-black/18 bg-white px-3 py-2.5 text-[15px] text-black/82 outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-black/42 focus:border-wine focus:ring-1 focus:ring-wine/25";
const labelClass = "text-[13px] font-medium text-black/68";
const iconButtonClass = "grid h-11 w-11 place-items-center border border-transparent text-black/60 transition-[color,background-color,border-color,transform] duration-150 hover:bg-black/[.045] hover:text-black active:scale-[.98] disabled:opacity-25";

const blockLibrary = [
  { type: "heading", label: "Titolo", icon: Type },
  { type: "paragraph", label: "Paragrafo", icon: AlignLeft },
  { type: "image", label: "Immagine", icon: ImageIcon },
  { type: "button", label: "Pulsante", icon: Square },
  { type: "quote", label: "Citazione", icon: Quote },
  { type: "divider", label: "Separatore", icon: Minus }
];

function blockId() {
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createBlock(type) {
  if (type === "image") return { id: blockId(), type, src: "", alt: "", caption: "", imageData: "", preview: "" };
  if (type === "button") return { id: blockId(), type, label: "Scopri di più", href: "/articles" };
  if (type === "divider") return { id: blockId(), type };
  return {
    id: blockId(),
    type,
    text: "",
    align: "left",
    bold: false,
    italic: false,
    href: "",
    ...(type === "heading" ? { level: 2 } : {})
  };
}

function normalizeBlock(block) {
  const normalized = { ...block, id: block.id || blockId() };
  if (["heading", "paragraph", "quote"].includes(normalized.type)) {
    return {
      ...normalized,
      align: ["left", "center", "right"].includes(normalized.align) ? normalized.align : "left",
      bold: Boolean(normalized.bold),
      italic: Boolean(normalized.italic),
      href: normalized.href || "",
      ...(normalized.type === "heading" ? { level: Number(normalized.level) === 3 ? 3 : 2 } : {})
    };
  }
  if (normalized.type === "image") return { ...normalized, imageData: "", preview: "" };
  return normalized;
}

function createDraft(article = null) {
  if (article) {
    return {
      ...article,
      tags: article.tags || [],
      coverImageData: "",
      coverPreview: "",
      notes: article.notes || { acidity: 50, body: 50, tannins: 30, sweetness: 10, finish: 60 },
      blocks: (article.blocks || []).map(normalizeBlock)
    };
  }

  return {
    title: "",
    subtitle: "",
    slug: "",
    author: "Carmen Buongiovanni",
    category: "Vino",
    region: "Italia",
    difficulty: "Accessibile",
    publishedAt: new Date().toISOString().slice(0, 10),
    image: "",
    imageAlt: "",
    coverImageData: "",
    coverPreview: "",
    pullQuote: "",
    sourceUrl: "",
    sourceLabel: "",
    bottle: "",
    tags: [],
    featured: false,
    notes: { acidity: 50, body: 50, tannins: 30, sweetness: 10, finish: 60 },
    blocks: [
      { ...createBlock("heading"), text: "Titolo della prima sezione" },
      { ...createBlock("paragraph"), text: "Inizia qui a scrivere il tuo articolo." }
    ]
  };
}

function slugify(value) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}

function countWords(blocks) {
  return blocks.reduce((total, block) => total + (block.text?.trim().split(/\s+/).filter(Boolean).length || 0), 0);
}

function blockName(type) {
  return blockLibrary.find((item) => item.type === type)?.label || "Blocco";
}

function blockSummary(block) {
  if (block.type === "image") return block.alt || block.src || "Immagine da scegliere";
  if (block.type === "button") return block.label || "Pulsante";
  if (block.type === "divider") return "Separatore";
  return block.text || `${blockName(block.type)} vuoto`;
}

function draftForLocalStorage(draft) {
  const { coverImageData: _coverData, coverPreview: _coverPreview, ...safeDraft } = draft;
  return {
    ...safeDraft,
    blocks: safeDraft.blocks.map(({ imageData: _imageData, preview: _preview, ...block }) => block)
  };
}

function draftForPublishing(draft) {
  const { coverPreview: _coverPreview, ...payload } = draft;
  return {
    ...payload,
    blocks: payload.blocks.map(({ preview: _preview, ...block }) => block)
  };
}

function Field({ label, hint, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>{label}</span>
      {hint && <span className="ml-2 text-[12px] text-black/48">{hint}</span>}
      {children}
    </label>
  );
}

function BlockPalette({ onAdd }) {
  return (
    <section className="shrink-0 border-b border-black/10 p-4">
      <h2 className="mb-3 text-[15px] font-semibold">Aggiungi un blocco</h2>
      <div className="grid grid-cols-2 gap-1 min-[1180px]:grid-cols-1">
        {blockLibrary.map(({ type, label, icon: Icon }) => (
          <button key={type} type="button" onClick={() => onAdd(type)} className="group flex min-h-12 items-center gap-3 px-3 text-left text-[14px] transition-[background-color,transform] duration-150 hover:bg-black/[.04] active:scale-[.98]">
            <Icon size={18} strokeWidth={1.7} />
            <span>{label}</span>
            <Plus size={16} strokeWidth={1.7} className="ml-auto text-black/50 group-hover:text-black" />
          </button>
        ))}
      </div>
    </section>
  );
}

function LayersPanel({ blocks, selectedId, dragIndex, dragOverIndex, onSelect, onDragStart, onDragOver, onDrop, onDragEnd, onMove, pointerHandlers }) {
  return (
    <section className="flex min-h-0 flex-1 flex-col p-4">
      <h2 className="mb-3 text-[13px] font-semibold text-black/62">Struttura dell’articolo</h2>
      <button onClick={() => onSelect("article")} className={`mb-2 flex min-h-11 items-center gap-3 border-l-2 px-3 text-left text-[14px] ${selectedId === "article" ? "border-wine bg-wine/[.07] text-wine" : "border-transparent hover:bg-black/[.035]"}`}>
        <Settings size={16} strokeWidth={1.7} /> Testata e pubblicazione
      </button>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            data-layer-index={index}
            onDragOver={(event) => { event.preventDefault(); onDragOver(index); }}
            onDrop={(event) => { event.preventDefault(); onDrop(index); }}
            className={`group grid min-h-14 grid-cols-[36px_minmax(0,1fr)_auto] items-center border-l-2 border-t px-1 transition-[background-color,border-color,opacity] duration-150 ${dragIndex === index ? "opacity-45" : ""} ${dragOverIndex === index && dragIndex !== index ? "border-t-wine" : "border-t-black/8"} ${selectedId === block.id ? "border-l-wine bg-wine/[.07]" : "border-l-transparent hover:bg-black/[.035]"}`}
          >
            <span
              draggable
              onDragStart={(event) => { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", String(index)); onDragStart(index); }}
              onDragEnd={onDragEnd}
              onPointerDown={(event) => pointerHandlers.start(event, index)}
              onPointerMove={pointerHandlers.move}
              onPointerUp={pointerHandlers.end}
              onPointerCancel={pointerHandlers.cancel}
              className="grid h-11 w-9 touch-none cursor-grab place-items-center text-black/48 active:cursor-grabbing"
              title="Trascina per spostare"
            >
              <GripVertical size={17} strokeWidth={1.7} />
            </span>
            <button onClick={() => onSelect(block.id)} className="min-w-0 py-2 text-left">
              <span className="block text-[12px] font-medium text-black/55">{blockName(block.type)}</span>
              <span className="mt-0.5 block truncate text-[13px] text-black/78">{blockSummary(block)}</span>
            </button>
            <div className={`flex ${selectedId === block.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
              <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0} className="grid h-10 w-8 place-items-center text-black/55 hover:text-black disabled:opacity-20" aria-label={`Sposta ${blockName(block.type)} in alto`}><ChevronUp size={15} /></button>
              <button type="button" onClick={() => onMove(index, 1)} disabled={index === blocks.length - 1} className="grid h-10 w-8 place-items-center text-black/55 hover:text-black disabled:opacity-20" aria-label={`Sposta ${blockName(block.type)} in basso`}><ChevronDown size={15} /></button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] leading-5 text-black/55">Trascina la maniglia oppure usa le frecce per cambiare l’ordine.</p>
    </section>
  );
}

function ArticleInspector({ draft, setField, fileInput, onCover }) {
  return (
    <div className="space-y-6 p-5">
      <div>
        <p className="text-[13px] font-medium text-wine">Articolo</p>
        <h2 className="mt-1 text-xl font-semibold">Testata e pubblicazione</h2>
        <p className="mt-2 text-[13px] leading-5 text-black/55">Titolo e introduzione si possono scrivere direttamente nell’anteprima.</p>
      </div>

      <Field label="Indirizzo dell’articolo">
        <div className="mt-2 flex border border-black/18 bg-white focus-within:border-wine focus-within:ring-1 focus-within:ring-wine/25">
          <span className="flex items-center border-r border-black/10 bg-black/[.025] px-2 text-[12px] text-black/58">/article/</span>
          <input value={draft.slug} onChange={(event) => setField("slug", slugify(event.target.value), { manualSlug: true })} className="min-w-0 flex-1 px-2 py-3 text-[13px] outline-none" />
        </div>
      </Field>

      <div>
        <p className={labelClass}>Immagine di copertina</p>
        <button type="button" onClick={() => fileInput.current?.click()} className="relative mt-2 grid aspect-[16/10] w-full place-items-center overflow-hidden border border-dashed border-black/25 bg-black/[.025] transition-[border-color,transform] duration-150 hover:border-wine active:scale-[.99]">
          {(draft.coverPreview || draft.image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.coverPreview || draft.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : <span className="flex items-center gap-2 text-[14px] text-black/62"><Upload size={18} /> Scegli un’immagine</span>}
          {(draft.coverPreview || draft.image) && <span className="relative bg-black/78 px-3 py-2 text-[12px] text-white">Cambia immagine</span>}
        </button>
        <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={onCover} className="sr-only" />
      </div>
      <Field label="Descrizione dell’immagine" hint="necessaria per l’accessibilità"><input value={draft.imageAlt} onChange={(event) => setField("imageAlt", event.target.value)} className={inputClass} /></Field>

      <details className="border-t border-black/10 pt-5">
        <summary className="cursor-pointer text-[14px] font-medium">Usa un indirizzo immagine</summary>
        <Field label="URL della copertina" className="mt-4"><input value={draft.image} onChange={(event) => setField("image", event.target.value, { clearUpload: true })} className={inputClass} placeholder="https://…" /></Field>
      </details>

      <details open className="border-t border-black/10 pt-5">
        <summary className="cursor-pointer text-[14px] font-medium">Dettagli di pubblicazione</summary>
        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Categoria"><select value={draft.category} onChange={(event) => setField("category", event.target.value)} className={inputClass}>{["Vino", "Sake", "Olio", "Clima", "Cultura"].map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Livello"><select value={draft.difficulty} onChange={(event) => setField("difficulty", event.target.value)} className={inputClass}>{["Accessibile", "Curioso", "Intermedio", "Tecnico"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          </div>
          <Field label="Regione"><input value={draft.region} onChange={(event) => setField("region", event.target.value)} className={inputClass} /></Field>
          <Field label="Autore"><input value={draft.author} onChange={(event) => setField("author", event.target.value)} className={inputClass} /></Field>
          <Field label="Data"><input type="date" value={draft.publishedAt} onChange={(event) => setField("publishedAt", event.target.value)} className={inputClass} /></Field>
          <Field label="Etichette" hint="separate da virgole"><input value={draft.tags.join(", ")} onChange={(event) => setField("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} className={inputClass} placeholder="vino, langhe" /></Field>
          <label className="flex min-h-12 items-center gap-3 border border-black/12 bg-black/[.025] p-3 text-[14px]"><input type="checkbox" checked={draft.featured} onChange={(event) => setField("featured", event.target.checked)} className="h-5 w-5 accent-wine" /> Metti in evidenza</label>
        </div>
      </details>

      <details className="border-t border-black/10 pt-5">
        <summary className="cursor-pointer text-[14px] font-medium">Opzioni avanzate</summary>
        <div className="mt-4 grid gap-4">
          <Field label="Citazione iniziale"><textarea value={draft.pullQuote} onChange={(event) => setField("pullQuote", event.target.value)} rows={3} className={`${inputClass} resize-y`} /></Field>
          <Field label="URL della fonte"><input value={draft.sourceUrl} onChange={(event) => setField("sourceUrl", event.target.value)} className={inputClass} /></Field>
          <Field label="Nome della fonte"><input value={draft.sourceLabel} onChange={(event) => setField("sourceLabel", event.target.value)} className={inputClass} /></Field>
          <Field label="Mappa editoriale"><input value={draft.bottle} onChange={(event) => setField("bottle", event.target.value)} className={inputClass} /></Field>
        </div>
      </details>
    </div>
  );
}

function FormatButton({ active, label, onClick, children }) {
  return <button type="button" onClick={onClick} aria-label={label} aria-pressed={active} title={label} className={`grid h-11 min-w-11 place-items-center border transition-[color,background-color,border-color,transform] duration-150 active:scale-[.98] ${active ? "border-wine bg-wine text-white" : "border-black/12 text-black/62 hover:border-black hover:text-black"}`}>{children}</button>;
}

function BlockInspector({ block, index, total, onChange, onMove, onDelete, onImage }) {
  const blockImageInput = useRef(null);
  if (!block) return <div className="grid h-full place-items-center p-8 text-center text-[14px] leading-6 text-black/58">Seleziona un blocco nell’anteprima<br />oppure nella struttura a sinistra.</div>;
  const isText = ["heading", "paragraph", "quote"].includes(block.type);

  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-3 border-b border-black/10 pb-5">
        <div><p className="text-[13px] font-medium text-wine">Blocco selezionato</p><h2 className="mt-1 text-xl font-semibold">{blockName(block.type)}</h2></div>
        <button onClick={onDelete} className="flex min-h-11 items-center gap-2 border border-black/12 px-3 text-[13px] text-red-700 hover:border-red-700" aria-label={`Elimina ${blockName(block.type)}`}><Trash2 size={16} /> Elimina</button>
      </div>

      {isText && (
        <div className="mt-5">
          <p className="text-[13px] leading-5 text-black/58">Scrivi direttamente nell’anteprima. Qui puoi cambiare l’aspetto del testo.</p>
          <div className="mt-4 flex flex-wrap gap-1" role="toolbar" aria-label="Formattazione del testo">
            <FormatButton active={block.bold} label="Grassetto" onClick={() => onChange({ bold: !block.bold })}><Bold size={17} /></FormatButton>
            <FormatButton active={block.italic} label="Corsivo" onClick={() => onChange({ italic: !block.italic })}><Italic size={17} /></FormatButton>
            <span className="mx-1 w-px bg-black/10" />
            <FormatButton active={block.align === "left"} label="Allinea a sinistra" onClick={() => onChange({ align: "left" })}><AlignLeft size={17} /></FormatButton>
            <FormatButton active={block.align === "center"} label="Centra" onClick={() => onChange({ align: "center" })}><AlignCenter size={17} /></FormatButton>
            <FormatButton active={block.align === "right"} label="Allinea a destra" onClick={() => onChange({ align: "right" })}><AlignRight size={17} /></FormatButton>
          </div>
          {block.type === "heading" && <Field label="Dimensione del titolo" className="mt-5"><select value={block.level || 2} onChange={(event) => onChange({ level: Number(event.target.value) })} className={inputClass}><option value={2}>Titolo principale della sezione</option><option value={3}>Sottotitolo</option></select></Field>}
          <Field label="Collegamento" hint="facoltativo" className="mt-5"><div className="relative"><Link2 size={16} className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-black/42" /><input value={block.href || ""} onChange={(event) => onChange({ href: event.target.value })} className={`${inputClass} pl-10`} placeholder="/article/... oppure https://…" /></div></Field>
        </div>
      )}

      {block.type === "image" && (
        <div className="mt-5 grid gap-4">
          <button type="button" onClick={() => blockImageInput.current?.click()} className="grid min-h-28 place-items-center border border-dashed border-black/25 bg-black/[.025] p-4 text-center text-[14px] text-black/62 hover:border-wine hover:text-wine">
            <span><Upload size={20} className="mx-auto mb-2" />{block.preview || block.src ? "Cambia immagine" : "Scegli un’immagine"}</span>
          </button>
          <input ref={blockImageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={onImage} className="sr-only" />
          <Field label="Descrizione" hint="necessaria"><input value={block.alt} onChange={(event) => onChange({ alt: event.target.value })} className={inputClass} /></Field>
          <Field label="Didascalia" hint="facoltativa"><input value={block.caption} onChange={(event) => onChange({ caption: event.target.value })} className={inputClass} /></Field>
          <details className="border-t border-black/10 pt-4"><summary className="cursor-pointer text-[13px] font-medium">Usa un indirizzo immagine</summary><Field label="URL immagine" className="mt-4"><input value={block.src} onChange={(event) => onChange({ src: event.target.value, imageData: "", preview: "" })} className={inputClass} placeholder="https://…" /></Field></details>
        </div>
      )}

      {block.type === "button" && <div className="mt-5 grid gap-4"><Field label="Testo del pulsante"><input value={block.label} onChange={(event) => onChange({ label: event.target.value })} className={inputClass} /></Field><Field label="Collegamento"><input value={block.href} onChange={(event) => onChange({ href: event.target.value })} className={inputClass} placeholder="/articles oppure https://…" /></Field></div>}
      {block.type === "divider" && <p className="mt-5 text-[14px] leading-6 text-black/58">Il separatore crea una pausa visiva tra due sezioni.</p>}

      <div className="mt-7 border-t border-black/10 pt-5">
        <p className={labelClass}>Posizione {index + 1} di {total}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => onMove(index, -1)} disabled={index === 0} className="flex min-h-11 items-center justify-center gap-2 border border-black/14 text-[13px] hover:border-black disabled:opacity-25"><ChevronUp size={16} /> Sposta su</button>
          <button onClick={() => onMove(index, 1)} disabled={index === total - 1} className="flex min-h-11 items-center justify-center gap-2 border border-black/14 text-[13px] hover:border-black disabled:opacity-25"><ChevronDown size={16} /> Sposta giù</button>
        </div>
      </div>
    </div>
  );
}

export default function CanvasArticleEditor({ article, storeStatus, onBack, onSaved }) {
  const [draft, setDraft] = useState(() => createDraft(article));
  const [originalSlug, setOriginalSlug] = useState(article?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!article);
  const [selectedId, setSelectedId] = useState("article");
  const [viewport, setViewport] = useState("desktop");
  const [canvasOnly, setCanvasOnly] = useState(false);
  const [mobilePanel, setMobilePanel] = useState("");
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [localStatus, setLocalStatus] = useState(article ? "Pubblicato" : "Bozza pronta");
  const [message, setMessage] = useState(null);
  const [deletedBlock, setDeletedBlock] = useState(null);
  const fileInput = useRef(null);
  const past = useRef([]);
  const future = useRef([]);
  const historyGroup = useRef({ key: "", time: 0 });
  const shortcutActions = useRef({});
  const touchDrag = useRef(null);
  const skipNextLoad = useRef(false);
  const words = useMemo(() => countWords(draft.blocks), [draft.blocks]);
  const readTime = Math.max(1, Math.ceil(words / 210));
  const selectedIndex = draft.blocks.findIndex((block) => block.id === selectedId);
  const selectedBlock = selectedIndex >= 0 ? draft.blocks[selectedIndex] : null;
  const draftKey = `kroinos-article-draft-${originalSlug || "new"}`;

  function commitDraft(updater, groupKey = "action") {
    setDirty(true);
    setLocalStatus("Salvataggio locale…");
    setDraft((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      if (next === current) return current;
      const now = Date.now();
      if (historyGroup.current.key !== groupKey || now - historyGroup.current.time > 700) {
        past.current = [...past.current.slice(-39), current];
        future.current = [];
      }
      historyGroup.current = { key: groupKey, time: now };
      return next;
    });
  }

  function undo() {
    const previous = past.current.at(-1);
    if (!previous) return;
    setDraft((current) => {
      future.current = [...future.current, current];
      return previous;
    });
    past.current = past.current.slice(0, -1);
    historyGroup.current = { key: "", time: 0 };
    setDirty(true);
    setLocalStatus("Modifica annullata");
  }

  function redo() {
    const next = future.current.at(-1);
    if (!next) return;
    setDraft((current) => {
      past.current = [...past.current, current];
      return next;
    });
    future.current = future.current.slice(0, -1);
    historyGroup.current = { key: "", time: 0 };
    setDirty(true);
    setLocalStatus("Modifica ripristinata");
  }

  useEffect(() => {
    if (skipNextLoad.current) {
      skipNextLoad.current = false;
      return;
    }
    try {
      const saved = window.localStorage.getItem(draftKey);
      if (saved) {
        setDraft((current) => createDraft({ ...current, ...JSON.parse(saved) }));
        setDirty(true);
        setLocalStatus("Bozza locale recuperata");
      }
    } catch {
      // Ignore malformed local drafts.
    }
  }, [draftKey]);

  useEffect(() => {
    if (!dirty) return undefined;
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(draftKey, JSON.stringify(draftForLocalStorage(draft)));
      setLocalStatus("Salvato sul dispositivo");
    }, 450);
    return () => window.clearTimeout(timer);
  }, [dirty, draft, draftKey]);

  useEffect(() => {
    if (!deletedBlock) return undefined;
    const timer = window.setTimeout(() => setDeletedBlock(null), 7000);
    return () => window.clearTimeout(timer);
  }, [deletedBlock]);

  useEffect(() => {
    if (message?.type !== "info") return undefined;
    const timer = window.setTimeout(() => setMessage(null), 3000);
    return () => window.clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    function onKeyDown(event) {
      if (!(event.ctrlKey || event.metaKey)) {
        if (event.key === "Escape") setMobilePanel("");
        return;
      }
      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        shortcutActions.current.save?.();
      }
      if (event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) shortcutActions.current.redo?.();
        else shortcutActions.current.undo?.();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function setField(field, value, options = {}) {
    commitDraft((current) => ({
      ...current,
      [field]: value,
      ...(field === "title" && autoSlug ? { slug: slugify(value) } : {}),
      ...(options.clearUpload ? { coverImageData: "", coverPreview: "" } : {})
    }), `article-${field}`);
    if (options.manualSlug) setAutoSlug(false);
  }

  function addBlock(type, requestedIndex = null) {
    const block = createBlock(type);
    const index = requestedIndex ?? (selectedIndex >= 0 ? selectedIndex + 1 : draft.blocks.length);
    commitDraft((current) => {
      const blocks = [...current.blocks];
      blocks.splice(Math.max(0, Math.min(index, blocks.length)), 0, block);
      return { ...current, blocks };
    }, "add-block");
    setSelectedId(block.id);
    if (window.innerWidth < 1180) setMobilePanel(type === "paragraph" || type === "heading" || type === "quote" ? "" : "inspector");
  }

  function updateBlock(id, patch) {
    commitDraft((current) => ({ ...current, blocks: current.blocks.map((block) => block.id === id ? { ...block, ...patch } : block) }), `block-${id}-${Object.keys(patch).join("-")}`);
  }

  function deleteSelectedBlock() {
    if (!selectedBlock) return;
    setMessage(null);
    setDeletedBlock({ block: selectedBlock, index: selectedIndex });
    commitDraft((current) => ({ ...current, blocks: current.blocks.filter((block) => block.id !== selectedId) }), "delete-block");
    const next = draft.blocks[selectedIndex + 1] || draft.blocks[selectedIndex - 1];
    setSelectedId(next?.id || "article");
  }

  function restoreDeletedBlock() {
    if (!deletedBlock) return;
    commitDraft((current) => {
      const blocks = [...current.blocks];
      blocks.splice(Math.min(deletedBlock.index, blocks.length), 0, deletedBlock.block);
      return { ...current, blocks };
    }, "restore-block");
    setSelectedId(deletedBlock.block.id);
    setDeletedBlock(null);
  }

  function moveBlock(index, direction) {
    const target = index + direction;
    if (index < 0 || target < 0 || target >= draft.blocks.length) return;
    commitDraft((current) => {
      const blocks = [...current.blocks];
      [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
      return { ...current, blocks };
    }, "move-block");
    setMessage({ type: "info", text: `Blocco spostato in posizione ${target + 1}.` });
  }

  function dropBlock(targetIndex, requestedSource = dragIndex) {
    if (requestedSource === null || requestedSource === targetIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const movedName = blockName(draft.blocks[requestedSource]?.type);
    commitDraft((current) => {
      const blocks = [...current.blocks];
      const [moved] = blocks.splice(requestedSource, 1);
      blocks.splice(targetIndex, 0, moved);
      return { ...current, blocks };
    }, "drag-block");
    setMessage({ type: "info", text: `${movedName} spostato in posizione ${targetIndex + 1}.` });
    setDragIndex(null);
    setDragOverIndex(null);
  }

  const pointerHandlers = {
    start(event, index) {
      if (event.pointerType === "mouse") return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      touchDrag.current = { source: index, target: index };
      setDragIndex(index);
      setDragOverIndex(index);
    },
    move(event) {
      if (!touchDrag.current) return;
      const target = document.elementsFromPoint(event.clientX, event.clientY).find((element) => element.dataset?.layerIndex !== undefined);
      if (target) {
        touchDrag.current.target = Number(target.dataset.layerIndex);
        setDragOverIndex(touchDrag.current.target);
      }
    },
    end() {
      if (!touchDrag.current) return;
      const { source, target } = touchDrag.current;
      touchDrag.current = null;
      dropBlock(target, source);
    },
    cancel() {
      touchDrag.current = null;
      setDragIndex(null);
      setDragOverIndex(null);
    }
  };

  function readImage(event, onReady) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type) || file.size > 8 * 1024 * 1024) {
      setMessage({ type: "error", text: "Scegli un’immagine PNG, JPEG, WebP o GIF più piccola di 8 MB." });
      return;
    }
    if (file.type === "image/gif") {
      const reader = new FileReader();
      reader.onload = () => onReady(reader.result);
      reader.readAsDataURL(file);
      event.target.value = "";
      return;
    }

    const source = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      const maximumSide = 1800;
      const initialScale = Math.min(1, maximumSide / Math.max(image.width, image.height));
      let width = Math.max(1, Math.round(image.width * initialScale));
      let height = Math.max(1, Math.round(image.height * initialScale));
      let result = "";

      for (let attempt = 0; attempt < 4; attempt += 1) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        result = canvas.toDataURL("image/webp", Math.max(0.58, 0.84 - attempt * 0.08));
        if (result.length <= 2.2 * 1024 * 1024) break;
        width = Math.max(800, Math.round(width * 0.82));
        height = Math.max(500, Math.round(height * 0.82));
      }

      URL.revokeObjectURL(source);
      onReady(result);
    };
    image.onerror = () => {
      URL.revokeObjectURL(source);
      setMessage({ type: "error", text: "Non è stato possibile leggere questa immagine." });
    };
    image.src = source;
    event.target.value = "";
  }

  function handleCover(event) {
    readImage(event, (result) => commitDraft((current) => ({ ...current, coverImageData: result, coverPreview: result, image: "" }), "cover-image"));
  }

  function handleBlockImage(event) {
    const id = selectedId;
    readImage(event, (result) => updateBlock(id, { imageData: result, preview: result, src: "" }));
  }

  async function saveArticle() {
    if (saving || !storeStatus.ready) return;
    setMessage(null);
    setSaving(true);
    setLocalStatus(originalSlug ? "Aggiornamento…" : "Pubblicazione…");
    try {
      const editing = Boolean(originalSlug);
      const response = await fetch(editing ? `/api/admin/articles/${encodeURIComponent(originalSlug)}` : "/api/admin/articles", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftForPublishing(draft))
      });
      const result = await response.json();
      if (response.status === 401) return window.location.reload();
      if (!response.ok) throw new Error(result.error || "Non è stato possibile salvare l’articolo.");

      window.localStorage.removeItem(draftKey);
      const savedArticle = createDraft({ ...draft, ...result.article });
      const previousSlug = originalSlug;
      skipNextLoad.current = true;
      setOriginalSlug(result.article.slug);
      setDraft(savedArticle);
      setDirty(false);
      setLocalStatus(editing ? "Articolo aggiornato" : "Articolo pubblicato");
      past.current = [];
      future.current = [];
      historyGroup.current = { key: "", time: 0 };
      onSaved(savedArticle, previousSlug);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      setLocalStatus("Salvataggio non riuscito");
    } finally {
      setSaving(false);
    }
  }

  shortcutActions.current = { save: saveArticle, undo, redo };
  const closeMobilePanel = () => setMobilePanel("");
  const leaveEditor = () => {
    if (dirty) window.localStorage.setItem(draftKey, JSON.stringify(draftForLocalStorage(draft)));
    onBack();
  };

  return (
    <div className="admin-editor fixed inset-0 z-[100] flex min-h-0 flex-col bg-[#f4f3f0] text-[#171614]">
      <header className={`grid min-h-16 shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center border-t-2 border-black border-b border-black/10 bg-white ${canvasOnly ? "" : "min-[1180px]:grid-cols-[248px_minmax(0,1fr)_296px]"}`}>
        <div className="flex min-w-0 items-center gap-2 px-2 sm:px-4">
          <button onClick={leaveEditor} className={iconButtonClass} aria-label="Torna agli articoli" title="Torna agli articoli"><ArrowLeft size={18} /></button>
          <span className="truncate font-serif text-lg">Kroinos<span className="text-wine">.</span></span>
        </div>

        {!canvasOnly && (
          <div className="hidden min-w-0 items-center justify-between border-x border-black/8 px-3 min-[1180px]:flex">
            <div className="min-w-0">
              <p className="truncate font-mono text-[12px] text-black/66">/article/{draft.slug || "nuovo-articolo"}</p>
              <p className="mt-0.5 text-[12px] text-black/55" aria-live="polite">{localStatus}{dirty ? "" : " · tutto salvato"}</p>
            </div>
            <div className="ml-3 flex items-center gap-1">
              <button onClick={() => setViewport("desktop")} className={`${iconButtonClass} ${viewport === "desktop" ? "bg-black text-white hover:bg-black hover:text-white" : ""}`} aria-label="Anteprima desktop" title="Anteprima desktop"><Monitor size={16} /></button>
              <button onClick={() => setViewport("mobile")} className={`${iconButtonClass} ${viewport === "mobile" ? "bg-black text-white hover:bg-black hover:text-white" : ""}`} aria-label="Anteprima telefono" title="Anteprima telefono"><Smartphone size={16} /></button>
              <button onClick={() => setCanvasOnly(true)} className={iconButtonClass} aria-label="Apri l’anteprima intera" title="Anteprima intera"><Maximize2 size={16} /></button>
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center justify-end gap-1 px-2 sm:px-3">
          {canvasOnly && <><button onClick={() => setViewport("desktop")} className={`${iconButtonClass} ${viewport === "desktop" ? "bg-black text-white" : ""}`} aria-label="Anteprima desktop"><Monitor size={16} /></button><button onClick={() => setViewport("mobile")} className={`${iconButtonClass} ${viewport === "mobile" ? "bg-black text-white" : ""}`} aria-label="Anteprima telefono"><Smartphone size={16} /></button><button onClick={() => setCanvasOnly(false)} className="flex min-h-11 items-center gap-2 px-3 text-[13px] hover:bg-black/[.04]"><Minimize2 size={16} /> <span className="hidden sm:inline">Torna all’editor</span></button></>}
          {!canvasOnly && <button onClick={() => setMobilePanel("blocks")} className={`${iconButtonClass} min-[1180px]:hidden`} aria-label="Blocchi e struttura" title="Blocchi e struttura"><Plus size={18} /></button>}
          {!canvasOnly && <button onClick={() => setMobilePanel("inspector")} className={`${iconButtonClass} min-[1180px]:hidden`} aria-label="Impostazioni" title="Impostazioni"><Settings size={17} /></button>}
          <button onClick={undo} disabled={past.current.length === 0} className={iconButtonClass} aria-label="Annulla" title="Annulla (Ctrl+Z)"><Undo2 size={17} /></button>
          <button onClick={redo} disabled={future.current.length === 0} className={`${iconButtonClass} hidden sm:grid`} aria-label="Ripristina" title="Ripristina (Ctrl+Maiusc+Z)"><Redo2 size={17} /></button>
          <button onClick={saveArticle} disabled={saving || !storeStatus.ready} title={!storeStatus.ready ? "Configura l’archivio GitHub per pubblicare online" : undefined} className="ml-1 flex min-h-11 items-center gap-2 bg-wine px-4 text-[13px] font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#7f0f20] active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40">
            <Save size={16} /> <span>{saving ? "Salvataggio…" : originalSlug ? "Aggiorna" : "Pubblica"}</span>
          </button>
        </div>
      </header>

      {(message || deletedBlock || !storeStatus.ready) && (
        <div className={`flex min-h-11 shrink-0 items-center justify-between gap-3 px-4 py-2 text-[13px] ${message?.type === "error" || !storeStatus.ready ? "bg-red-50 text-red-900" : deletedBlock ? "bg-[#171614] text-white" : "bg-blue-50 text-blue-950"}`} role="status" aria-live="polite">
          <span className="flex items-center gap-2">{(message?.type === "info" || deletedBlock) ? <CheckCircle2 size={15} /> : null}{message?.text || (deletedBlock ? `${blockName(deletedBlock.block.type)} eliminato.` : "Configura l’archivio GitHub prima di pubblicare dal sito online.")}</span>
          <div className="flex items-center gap-2">{deletedBlock && <button onClick={restoreDeletedBlock} className="min-h-9 border border-white/25 px-3 font-semibold hover:bg-white/10">Annulla</button>}{message && <button onClick={() => setMessage(null)} className="grid h-9 w-9 place-items-center" aria-label="Chiudi messaggio"><X size={16} /></button>}</div>
        </div>
      )}

      <div className={`grid min-h-0 flex-1 ${canvasOnly ? "grid-cols-1" : "min-[1180px]:grid-cols-[248px_minmax(0,1fr)_296px]"}`}>
        {!canvasOnly && (
          <aside className={`${mobilePanel === "blocks" ? "admin-drawer-left fixed inset-y-0 left-0 z-[130] flex w-[min(340px,92vw)] pt-16" : "hidden"} min-h-0 flex-col border-r border-black/10 bg-white min-[1180px]:static min-[1180px]:flex min-[1180px]:w-auto min-[1180px]:pt-0`}>
            <div className="sticky top-0 z-10 flex min-h-12 items-center justify-between border-b border-black/8 bg-white px-4 min-[1180px]:hidden"><span className="text-[15px] font-semibold">Blocchi e struttura</span><button onClick={closeMobilePanel} className={iconButtonClass} aria-label="Chiudi"><X size={18} /></button></div>
            <BlockPalette onAdd={addBlock} />
            <LayersPanel blocks={draft.blocks} selectedId={selectedId} dragIndex={dragIndex} dragOverIndex={dragOverIndex} onSelect={(id) => { setSelectedId(id); closeMobilePanel(); }} onDragStart={(index) => { setDragIndex(index); setDragOverIndex(index); }} onDragOver={setDragOverIndex} onDrop={dropBlock} onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }} onMove={moveBlock} pointerHandlers={pointerHandlers} />
          </aside>
        )}

        <main className="flex min-h-0 min-w-0 flex-col bg-[#efeeeb]">
          {!canvasOnly && <div className="flex min-h-12 shrink-0 items-center justify-between border-b border-black/8 px-3 min-[1180px]:hidden"><div className="min-w-0"><p className="truncate font-mono text-[12px] text-black/64">/article/{draft.slug || "nuovo-articolo"}</p><p className="text-[12px] text-black/52" aria-live="polite">{localStatus}</p></div><div className="flex gap-1"><button onClick={() => setViewport("desktop")} className={`${iconButtonClass} ${viewport === "desktop" ? "bg-black text-white" : ""}`} aria-label="Anteprima desktop"><Monitor size={16} /></button><button onClick={() => setViewport("mobile")} className={`${iconButtonClass} ${viewport === "mobile" ? "bg-black text-white" : ""}`} aria-label="Anteprima telefono"><Smartphone size={16} /></button><button onClick={() => setCanvasOnly(true)} className={iconButtonClass} aria-label="Anteprima intera"><Maximize2 size={16} /></button></div></div>}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ArticlePreview
              draft={draft}
              readTime={readTime}
              viewport={viewport}
              selectedBlockId={canvasOnly ? "" : selectedId}
              dragOverIndex={dragOverIndex}
              readOnly={canvasOnly}
              onSelectArticle={() => { if (!canvasOnly) { setSelectedId("article"); if (window.innerWidth < 1180) setMobilePanel(""); } }}
              onSelectBlock={(id) => { if (!canvasOnly) { setSelectedId(id); if (window.innerWidth < 1180) setMobilePanel(""); } }}
              onUpdateArticle={setField}
              onUpdateBlock={updateBlock}
              onInsertBlock={addBlock}
              onMoveBlock={moveBlock}
              onDragStart={(index) => { setDragIndex(index); setDragOverIndex(index); }}
              onDragOver={setDragOverIndex}
              onDrop={dropBlock}
              onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
            />
          </div>
        </main>

        {!canvasOnly && (
          <aside className={`${mobilePanel === "inspector" ? "admin-drawer-right fixed inset-y-0 right-0 z-[130] block w-[min(380px,94vw)] pt-16" : "hidden"} min-h-0 overflow-y-auto border-l border-black/10 bg-white min-[1180px]:static min-[1180px]:block min-[1180px]:w-auto min-[1180px]:pt-0`}>
            <div className="sticky top-0 z-10 flex min-h-12 items-center justify-between border-b border-black/8 bg-white px-4 min-[1180px]:hidden"><span className="text-[15px] font-semibold">Impostazioni</span><button onClick={closeMobilePanel} className={iconButtonClass} aria-label="Chiudi"><X size={18} /></button></div>
            {selectedId === "article" ? <ArticleInspector draft={draft} setField={setField} fileInput={fileInput} onCover={handleCover} /> : <BlockInspector block={selectedBlock} index={selectedIndex} total={draft.blocks.length} onChange={(patch) => updateBlock(selectedId, patch)} onMove={moveBlock} onDelete={deleteSelectedBlock} onImage={handleBlockImage} />}
          </aside>
        )}

        {mobilePanel && <button onClick={closeMobilePanel} className="fixed inset-0 z-[125] bg-black/30 min-[1180px]:hidden" aria-label="Chiudi pannello" />}
      </div>
    </div>
  );
}
