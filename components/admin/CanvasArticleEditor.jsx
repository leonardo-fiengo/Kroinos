"use client";

import {
  AlignLeft,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Image as ImageIcon,
  Maximize2,
  Minimize2,
  Minus,
  Monitor,
  Plus,
  Quote,
  Save,
  Settings,
  Smartphone,
  Square,
  Trash2,
  Type,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ArticlePreview from "@/components/admin/ArticlePreview";

const inputClass = "mt-2 w-full border border-black/12 bg-white px-3 py-3 text-sm outline-none transition focus:border-black";
const labelClass = "text-[.62rem] font-semibold uppercase tracking-[.1em] text-black/48";

const blockLibrary = [
  { type: "heading", label: "Heading", icon: Type },
  { type: "paragraph", label: "Paragraph", icon: AlignLeft },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "button", label: "Button", icon: Square },
  { type: "quote", label: "Quote", icon: Quote },
  { type: "divider", label: "Divider", icon: Minus }
];

function blockId() {
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createBlock(type) {
  if (type === "image") return { id: blockId(), type, src: "", alt: "", caption: "" };
  if (type === "button") return { id: blockId(), type, label: "Scopri di più", href: "/articles" };
  if (type === "divider") return { id: blockId(), type };
  return { id: blockId(), type, text: "" };
}

function createDraft(article = null) {
  if (article) {
    return {
      ...article,
      tags: article.tags || [],
      coverImageData: "",
      coverPreview: "",
      notes: article.notes || { acidity: 50, body: 50, tannins: 30, sweetness: 10, finish: 60 },
      blocks: (article.blocks || []).map((block) => ({ ...block, id: block.id || blockId() }))
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
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function countWords(blocks) {
  return blocks.reduce((total, block) => total + (block.text?.trim().split(/\s+/).filter(Boolean).length || 0), 0);
}

function blockName(type) {
  return blockLibrary.find((item) => item.type === type)?.label || "Block";
}

function blockSummary(block) {
  if (block.type === "image") return block.alt || block.src || "Empty image";
  if (block.type === "button") return block.label || "Button";
  if (block.type === "divider") return "Divider";
  return block.text || `Empty ${blockName(block.type).toLowerCase()}`;
}

function Field({ label, children, className = "" }) {
  return <label className={`block ${className}`}><span className={labelClass}>{label}</span>{children}</label>;
}

function BlockPalette({ onAdd }) {
  return (
    <section className="shrink-0 border-b border-black/10 p-4">
      <p className="mb-4 text-sm font-medium">Add block</p>
      <div className="grid gap-1">
        {blockLibrary.map(({ type, label, icon: Icon }) => (
          <button key={type} type="button" onClick={() => onAdd(type)} className="group flex min-h-12 items-center gap-3 px-2 text-left text-sm hover:bg-black/[.035]">
            <Icon size={18} strokeWidth={1.7} />
            <span>{label}</span>
            <Plus size={16} className="ml-auto text-black/55 group-hover:text-black" />
          </button>
        ))}
      </div>
    </section>
  );
}

function LayersPanel({ blocks, selectedId, dragIndex, dragOverIndex, onSelect, onDragStart, onDragOver, onDrop, onDragEnd }) {
  return (
    <section className="flex min-h-0 flex-1 flex-col p-4">
      <p className="mb-3 text-[.62rem] font-semibold uppercase tracking-[.11em] text-black/48">Layers</p>
      <button onClick={() => onSelect("article")} className={`mb-1 flex min-h-10 items-center gap-3 px-2 text-left text-sm ${selectedId === "article" ? "bg-black text-white" : "hover:bg-black/[.035]"}`}>
        <Settings size={15} /> Article settings
      </button>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            draggable
            onDragStart={(event) => { event.dataTransfer.effectAllowed = "move"; onDragStart(index); }}
            onDragOver={(event) => { event.preventDefault(); onDragOver(index); }}
            onDrop={(event) => { event.preventDefault(); onDrop(index); }}
            onDragEnd={onDragEnd}
            className={`group flex min-h-11 cursor-grab items-center gap-2 border-t px-2 active:cursor-grabbing ${dragOverIndex === index && dragIndex !== index ? "border-t-2 border-black" : "border-black/8"} ${selectedId === block.id ? "bg-black text-white" : "hover:bg-black/[.035]"}`}
          >
            <GripVertical size={15} className={selectedId === block.id ? "text-white/65" : "text-black/35"} />
            <button onClick={() => onSelect(block.id)} className="min-w-0 flex-1 py-3 text-left">
              <span className="block text-[.62rem] uppercase tracking-[.08em] opacity-55">{blockName(block.type)}</span>
              <span className="mt-0.5 block truncate text-xs">{blockSummary(block)}</span>
            </button>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[.68rem] leading-5 text-black/42">Drag layers to change their position.</p>
    </section>
  );
}

function ArticleInspector({ draft, setField, fileInput, onCover }) {
  return (
    <div className="space-y-6 p-5">
      <div>
        <p className="text-[.62rem] font-semibold uppercase tracking-[.1em] text-black/45">Article</p>
        <h2 className="mt-2 text-lg font-medium">Page settings</h2>
      </div>

      <Field label="Title"><textarea value={draft.title} onChange={(event) => setField("title", event.target.value)} rows={2} className={`${inputClass} resize-y font-serif text-xl`} placeholder="Article title" /></Field>
      <Field label="Introduction"><textarea value={draft.subtitle} onChange={(event) => setField("subtitle", event.target.value)} rows={4} className={`${inputClass} resize-y leading-6`} placeholder="Short introduction" /></Field>
      <Field label="Article URL">
        <div className="mt-2 flex border border-black/12 bg-white focus-within:border-black">
          <span className="flex items-center border-r border-black/8 bg-black/[.025] px-2 text-[.68rem] text-black/42">/article/</span>
          <input value={draft.slug} onChange={(event) => setField("slug", slugify(event.target.value), { manualSlug: true })} className="min-w-0 flex-1 px-2 py-3 text-xs outline-none" />
        </div>
      </Field>

      <div>
        <p className={labelClass}>Cover image</p>
        <button type="button" onClick={() => fileInput.current?.click()} className="relative mt-2 grid aspect-[16/10] w-full place-items-center overflow-hidden border border-dashed border-black/20 bg-black/[.025] hover:border-black">
          {(draft.coverPreview || draft.image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.coverPreview || draft.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : <span className="flex items-center gap-2 text-xs text-black/45"><ImageIcon size={17} /> Choose image</span>}
          {(draft.coverPreview || draft.image) && <span className="relative bg-black/75 px-3 py-2 text-[.6rem] uppercase text-white">Change</span>}
        </button>
        <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={onCover} className="sr-only" />
        <input value={draft.image} onChange={(event) => setField("image", event.target.value, { clearUpload: true })} className={inputClass} placeholder="Or paste an image URL" />
      </div>
      <Field label="Image description"><input value={draft.imageAlt} onChange={(event) => setField("imageAlt", event.target.value)} className={inputClass} /></Field>

      <details open className="border-t border-black/10 pt-5">
        <summary className="cursor-pointer text-sm font-medium">Publishing details</summary>
        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category"><select value={draft.category} onChange={(event) => setField("category", event.target.value)} className={inputClass}>{["Vino", "Sake", "Olio", "Clima", "Cultura"].map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Level"><select value={draft.difficulty} onChange={(event) => setField("difficulty", event.target.value)} className={inputClass}>{["Accessibile", "Curioso", "Intermedio", "Tecnico"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          </div>
          <Field label="Region"><input value={draft.region} onChange={(event) => setField("region", event.target.value)} className={inputClass} /></Field>
          <Field label="Author"><input value={draft.author} onChange={(event) => setField("author", event.target.value)} className={inputClass} /></Field>
          <Field label="Date"><input type="date" value={draft.publishedAt} onChange={(event) => setField("publishedAt", event.target.value)} className={inputClass} /></Field>
          <Field label="Tags"><input value={draft.tags.join(", ")} onChange={(event) => setField("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} className={inputClass} placeholder="wine, langhe" /></Field>
          <label className="flex items-center gap-3 border border-black/10 bg-black/[.025] p-3 text-sm"><input type="checkbox" checked={draft.featured} onChange={(event) => setField("featured", event.target.checked)} className="h-4 w-4 accent-black" /> Featured article</label>
        </div>
      </details>

      <details className="border-t border-black/10 pt-5">
        <summary className="cursor-pointer text-sm font-medium">Advanced</summary>
        <div className="mt-4 grid gap-4">
          <Field label="Opening quote"><textarea value={draft.pullQuote} onChange={(event) => setField("pullQuote", event.target.value)} rows={3} className={inputClass} /></Field>
          <Field label="Source URL"><input value={draft.sourceUrl} onChange={(event) => setField("sourceUrl", event.target.value)} className={inputClass} /></Field>
          <Field label="Source name"><input value={draft.sourceLabel} onChange={(event) => setField("sourceLabel", event.target.value)} className={inputClass} /></Field>
          <Field label="Editorial map"><input value={draft.bottle} onChange={(event) => setField("bottle", event.target.value)} className={inputClass} /></Field>
        </div>
      </details>
    </div>
  );
}

function BlockInspector({ block, index, total, onChange, onMove, onDelete }) {
  if (!block) {
    return <div className="grid h-full place-items-center p-8 text-center text-sm leading-6 text-black/48">Click a block in the preview,<br />or select one in Layers.</div>;
  }

  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-3 border-b border-black/10 pb-5">
        <div><p className="text-[.62rem] font-semibold uppercase tracking-[.1em] text-black/45">Selected block</p><h2 className="mt-2 text-lg font-medium">{blockName(block.type)}</h2></div>
        <button onClick={onDelete} className="grid h-9 w-9 place-items-center border border-black/10 text-black/42 hover:border-red-700 hover:text-red-700" aria-label="Delete block"><Trash2 size={15} /></button>
      </div>

      <div className="mt-5">
        {block.type === "heading" && <Field label="Heading text"><textarea value={block.text} onChange={(event) => onChange("text", event.target.value)} rows={4} className={`${inputClass} resize-y font-serif text-xl`} /></Field>}
        {block.type === "paragraph" && <Field label="Paragraph text"><textarea value={block.text} onChange={(event) => onChange("text", event.target.value)} rows={10} className={`${inputClass} resize-y leading-7`} /></Field>}
        {block.type === "quote" && <Field label="Quote text"><textarea value={block.text} onChange={(event) => onChange("text", event.target.value)} rows={7} className={`${inputClass} resize-y font-serif text-lg`} /></Field>}
        {block.type === "image" && (
          <div className="grid gap-4">
            <Field label="Image URL"><input value={block.src} onChange={(event) => onChange("src", event.target.value)} className={inputClass} /></Field>
            <Field label="Description"><input value={block.alt} onChange={(event) => onChange("alt", event.target.value)} className={inputClass} /></Field>
            <Field label="Caption"><input value={block.caption} onChange={(event) => onChange("caption", event.target.value)} className={inputClass} /></Field>
          </div>
        )}
        {block.type === "button" && (
          <div className="grid gap-4">
            <Field label="Button label"><input value={block.label} onChange={(event) => onChange("label", event.target.value)} className={inputClass} /></Field>
            <Field label="Link"><input value={block.href} onChange={(event) => onChange("href", event.target.value)} className={inputClass} placeholder="/articles or https://…" /></Field>
          </div>
        )}
        {block.type === "divider" && <p className="text-sm leading-6 text-black/48">A divider creates a quiet visual break between two sections.</p>}
      </div>

      <div className="mt-7 border-t border-black/10 pt-5">
        <p className={labelClass}>Position</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => onMove(-1)} disabled={index === 0} className="flex min-h-11 items-center justify-center gap-2 border border-black/10 text-xs hover:border-black disabled:opacity-25"><ChevronUp size={15} /> Move up</button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} className="flex min-h-11 items-center justify-center gap-2 border border-black/10 text-xs hover:border-black disabled:opacity-25"><ChevronDown size={15} /> Move down</button>
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
  const [message, setMessage] = useState(null);
  const fileInput = useRef(null);
  const words = useMemo(() => countWords(draft.blocks), [draft.blocks]);
  const readTime = Math.max(1, Math.ceil(words / 210));
  const selectedIndex = draft.blocks.findIndex((block) => block.id === selectedId);
  const selectedBlock = selectedIndex >= 0 ? draft.blocks[selectedIndex] : null;
  const draftKey = `kroinos-article-draft-${originalSlug || "new"}`;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(draftKey);
      if (saved) setDraft((current) => ({ ...current, ...JSON.parse(saved), coverImageData: "", coverPreview: "" }));
    } catch {
      // Ignore malformed local drafts.
    }
  }, [draftKey]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const { coverImageData: _imageData, coverPreview: _preview, ...safeDraft } = draft;
      window.localStorage.setItem(draftKey, JSON.stringify(safeDraft));
    }, 350);
    return () => window.clearTimeout(timer);
  }, [draft, draftKey]);

  function setField(field, value, options = {}) {
    setDraft((current) => ({
      ...current,
      [field]: value,
      ...(field === "title" && autoSlug ? { slug: slugify(value) } : {}),
      ...(options.clearUpload ? { coverImageData: "", coverPreview: "" } : {})
    }));
    if (options.manualSlug) setAutoSlug(false);
  }

  function addBlock(type) {
    const block = createBlock(type);
    setDraft((current) => ({ ...current, blocks: [...current.blocks, block] }));
    setSelectedId(block.id);
    setMobilePanel("inspector");
  }

  function updateSelectedBlock(field, value) {
    setDraft((current) => ({ ...current, blocks: current.blocks.map((block) => block.id === selectedId ? { ...block, [field]: value } : block) }));
  }

  function deleteSelectedBlock() {
    setDraft((current) => ({ ...current, blocks: current.blocks.filter((block) => block.id !== selectedId) }));
    setSelectedId("article");
  }

  function moveSelectedBlock(direction) {
    if (selectedIndex < 0) return;
    setDraft((current) => {
      const target = selectedIndex + direction;
      if (target < 0 || target >= current.blocks.length) return current;
      const blocks = [...current.blocks];
      [blocks[selectedIndex], blocks[target]] = [blocks[target], blocks[selectedIndex]];
      return { ...current, blocks };
    });
  }

  function dropBlock(targetIndex) {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    setDraft((current) => {
      const blocks = [...current.blocks];
      const [moved] = blocks.splice(dragIndex, 1);
      blocks.splice(targetIndex, 0, moved);
      return { ...current, blocks };
    });
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function handleCover(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type) || file.size > 8 * 1024 * 1024) {
      setMessage({ type: "error", text: "Use a PNG, JPEG, WebP, or GIF smaller than 8 MB." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setDraft((current) => ({ ...current, coverImageData: reader.result, coverPreview: reader.result, image: "" }));
    reader.readAsDataURL(file);
  }

  async function saveArticle() {
    setMessage(null);
    setSaving(true);
    try {
      const { coverPreview: _preview, ...payload } = draft;
      const editing = Boolean(originalSlug);
      const response = await fetch(editing ? `/api/admin/articles/${encodeURIComponent(originalSlug)}` : "/api/admin/articles", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.status === 401) return window.location.reload();
      if (!response.ok) throw new Error(result.error || "The article could not be saved.");

      window.localStorage.removeItem(draftKey);
      const savedArticle = { ...draft, ...result.article, coverImageData: "", coverPreview: "" };
      const previousSlug = originalSlug;
      setOriginalSlug(result.article.slug);
      setDraft(savedArticle);
      setMessage({ type: "success", text: editing ? "Changes saved" : "Article published" });
      onSaved(savedArticle, previousSlug);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  }

  const closeMobilePanel = () => setMobilePanel("");
  const selectFromPreview = (id) => { setSelectedId(id); setMobilePanel("inspector"); };

  return (
    <div className="fixed inset-0 z-[100] flex min-h-0 flex-col bg-[#f4f4f2] text-black">
      <header className={`grid min-h-14 shrink-0 grid-cols-[1fr_auto] items-center border-t-2 border-black border-b border-black/10 bg-white ${canvasOnly ? "" : "xl:grid-cols-[280px_minmax(0,1fr)_320px]"}`}>
        <div className="flex items-center gap-3 px-3 sm:px-4">
          <button onClick={onBack} className="grid h-9 w-9 place-items-center hover:bg-black/[.04]" aria-label="Back to articles"><ArrowLeft size={17} /></button>
          <span className="font-serif text-sm uppercase tracking-[.04em]">Kroinos</span>
        </div>
        {!canvasOnly && (
          <div className="hidden min-w-0 items-center justify-between border-x border-black/8 px-4 xl:flex">
            <p className="truncate font-mono text-[.7rem]">preview · /article/{draft.slug || "new-article"}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setViewport("desktop")} className={`grid h-8 w-8 place-items-center ${viewport === "desktop" ? "bg-black text-white" : "hover:bg-black/[.04]"}`} aria-label="Desktop preview"><Monitor size={14} /></button>
              <button onClick={() => setViewport("mobile")} className={`grid h-8 w-8 place-items-center ${viewport === "mobile" ? "bg-black text-white" : "hover:bg-black/[.04]"}`} aria-label="Mobile preview"><Smartphone size={14} /></button>
              <button onClick={() => setCanvasOnly(true)} className="grid h-8 w-8 place-items-center hover:bg-black/[.04]" aria-label="Full-width preview"><Maximize2 size={14} /></button>
            </div>
          </div>
        )}
        <div className="ml-auto flex items-center justify-end gap-2 px-3 sm:px-4">
          {canvasOnly && <button onClick={() => setCanvasOnly(false)} className="flex h-9 items-center gap-2 px-3 text-xs hover:bg-black/[.04]"><Minimize2 size={14} /> Editor</button>}
          {!canvasOnly && <button onClick={() => setMobilePanel("blocks")} className="grid h-9 w-9 place-items-center hover:bg-black/[.04] xl:hidden" aria-label="Blocks"><Plus size={17} /></button>}
          {!canvasOnly && <button onClick={() => setMobilePanel("inspector")} className="grid h-9 w-9 place-items-center hover:bg-black/[.04] xl:hidden" aria-label="Settings"><Settings size={16} /></button>}
          <button onClick={saveArticle} disabled={saving || !storeStatus.ready} className="flex min-h-10 items-center gap-2 bg-black px-4 text-[.65rem] font-semibold uppercase tracking-[.06em] text-white hover:bg-wine disabled:opacity-35"><Save size={14} /> {saving ? "Saving…" : originalSlug ? "Save" : "Publish"}</button>
        </div>
      </header>

      {message && (
        <div className={`flex shrink-0 items-center justify-between px-4 py-2.5 text-xs ${message.type === "success" ? "bg-emerald-50 text-emerald-950" : "bg-red-50 text-red-900"}`}>
          <span className="flex items-center gap-2">{message.type === "success" && <CheckCircle2 size={14} />}{message.text}</span>
          <button onClick={() => setMessage(null)}><X size={14} /></button>
        </div>
      )}

      <div className={`grid min-h-0 flex-1 ${canvasOnly ? "grid-cols-1" : "xl:grid-cols-[280px_minmax(0,1fr)_320px]"}`}>
        {!canvasOnly && (
          <aside className={`${mobilePanel === "blocks" ? "fixed inset-y-0 left-0 z-[130] flex w-[min(320px,90vw)] pt-14" : "hidden"} min-h-0 flex-col border-r border-black/10 bg-white xl:static xl:flex xl:w-auto xl:pt-0`}>
            <BlockPalette onAdd={addBlock} />
            <LayersPanel blocks={draft.blocks} selectedId={selectedId} dragIndex={dragIndex} dragOverIndex={dragOverIndex} onSelect={(id) => { setSelectedId(id); closeMobilePanel(); }} onDragStart={(index) => { setDragIndex(index); setDragOverIndex(index); }} onDragOver={setDragOverIndex} onDrop={dropBlock} onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }} />
          </aside>
        )}

        <main className="flex min-h-0 min-w-0 flex-col bg-[#efefed]">
          <div className="flex min-h-11 shrink-0 items-center justify-between border-b border-black/8 px-4 xl:hidden">
            <p className="truncate font-mono text-[.68rem]">preview · /article/{draft.slug || "new-article"}</p>
            <div className="flex gap-1"><button onClick={() => setViewport("desktop")} className={`grid h-8 w-8 place-items-center ${viewport === "desktop" ? "bg-black text-white" : ""}`}><Monitor size={14} /></button><button onClick={() => setViewport("mobile")} className={`grid h-8 w-8 place-items-center ${viewport === "mobile" ? "bg-black text-white" : ""}`}><Smartphone size={14} /></button></div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ArticlePreview draft={draft} readTime={readTime} viewport={viewport} selectedBlockId={selectedId} onSelectArticle={() => { setSelectedId("article"); setMobilePanel("inspector"); }} onSelectBlock={(id) => selectFromPreview(id)} />
          </div>
        </main>

        {!canvasOnly && (
          <aside className={`${mobilePanel === "inspector" ? "fixed inset-y-0 right-0 z-[130] block w-[min(360px,94vw)] pt-14" : "hidden"} min-h-0 overflow-y-auto border-l border-black/10 bg-white xl:static xl:block xl:w-auto xl:pt-0`}>
            <div className="sticky top-0 z-10 flex min-h-12 items-center justify-between border-b border-black/8 bg-white px-4 xl:hidden"><span className="text-sm font-medium">Edit</span><button onClick={closeMobilePanel}><X size={17} /></button></div>
            {selectedId === "article" ? (
              <ArticleInspector draft={draft} setField={setField} fileInput={fileInput} onCover={handleCover} />
            ) : (
              <BlockInspector block={selectedBlock} index={selectedIndex} total={draft.blocks.length} onChange={updateSelectedBlock} onMove={moveSelectedBlock} onDelete={deleteSelectedBlock} />
            )}
          </aside>
        )}

        {mobilePanel && <button onClick={closeMobilePanel} className="fixed inset-0 z-[125] bg-black/25 xl:hidden" aria-label="Close panel" />}
      </div>
    </div>
  );
}
