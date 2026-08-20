import "server-only";

import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { articles as seedArticles } from "@/lib/data";

const CONTENT_FILE = join(process.cwd(), "content", "articles.json");
const GITHUB_CONTENT_PATH = "content/articles.json";
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const BLOCK_TYPES = new Set(["heading", "paragraph", "quote", "image", "button", "divider"]);

export class ArticleStoreError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "ArticleStoreError";
    this.status = status;
  }
}

function githubConfig() {
  return {
    token: process.env.KROINOS_GITHUB_TOKEN?.trim() || "",
    repository: process.env.KROINOS_GITHUB_REPOSITORY?.trim() || "",
    branch: process.env.KROINOS_GITHUB_BRANCH?.trim() || "main"
  };
}

function hasGithubStore() {
  const config = githubConfig();
  return Boolean(config.token && config.repository);
}

function parseStoredState(value) {
  const articles = Array.isArray(value) ? value : value?.articles;
  const deletedSlugs = Array.isArray(value?.deletedSlugs) ? value.deletedSlugs : [];
  return {
    articles: Array.isArray(articles) ? articles : [],
    deletedSlugs: deletedSlugs.filter((slug) => typeof slug === "string")
  };
}

async function githubRequest(path, options = {}) {
  const { token } = githubConfig();
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers
    }
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    const message = detail?.message ? `: ${detail.message}` : "";
    throw new ArticleStoreError(`Salvataggio su GitHub non riuscito${message}`, response.status);
  }

  return response.json();
}

async function readGithubFile(path) {
  const { repository, branch } = githubConfig();
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(
    `https://api.github.com/repos/${repository}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubConfig().token}`,
        "X-GitHub-Api-Version": "2022-11-28"
      }
    }
  );

  if (response.status === 404) return { content: "", sha: "" };
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new ArticleStoreError(`Non è stato possibile leggere l’archivio GitHub: ${detail?.message || response.statusText}`, response.status);
  }

  const result = await response.json();
  return {
    content: Buffer.from(String(result.content || "").replace(/\n/g, ""), "base64").toString("utf8"),
    sha: result.sha || ""
  };
}

async function writeGithubFile(path, content, message, sha = "") {
  const { repository, branch } = githubConfig();
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return githubRequest(`/repos/${repository}/contents/${encodedPath}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      branch,
      content: Buffer.from(content).toString("base64"),
      ...(sha ? { sha } : {})
    })
  });
}

async function readArticleState() {
  if (hasGithubStore()) {
    const file = await readGithubFile(GITHUB_CONTENT_PATH);
    if (!file.content) return { articles: [], deletedSlugs: [] };
    return parseStoredState(JSON.parse(file.content));
  }

  try {
    return parseStoredState(JSON.parse(await readFile(CONTENT_FILE, "utf8")));
  } catch (error) {
    if (error.code === "ENOENT") return { articles: [], deletedSlugs: [] };
    throw new ArticleStoreError("Non è stato possibile leggere l’archivio locale degli articoli.");
  }
}

async function writeArticleState(state, message) {
  const serialized = `${JSON.stringify(state, null, 2)}\n`;

  if (hasGithubStore()) {
    const current = await readGithubFile(GITHUB_CONTENT_PATH);
    await writeGithubFile(
      GITHUB_CONTENT_PATH,
      serialized,
      message,
      current.sha
    );
    return;
  }

  if (process.env.VERCEL) {
    throw new ArticleStoreError(
      "Per pubblicare su Vercel devi configurare KROINOS_GITHUB_TOKEN e KROINOS_GITHUB_REPOSITORY.",
      503
    );
  }

  await mkdir(dirname(CONTENT_FILE), { recursive: true });
  const temporaryFile = `${CONTENT_FILE}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, serialized, "utf8");
  await rename(temporaryFile, CONTENT_FILE);
}

function cleanString(value, maxLength, required = false) {
  const clean = typeof value === "string" ? value.trim() : "";
  if (required && !clean) throw new ArticleStoreError("Completa tutti i campi obbligatori dell’articolo.", 400);
  return clean.slice(0, maxLength);
}

function cleanUrl(value, { allowLocal = false } = {}) {
  const clean = cleanString(value, 2048);
  if (!clean) return "";
  if (allowLocal && /^\/[a-zA-Z0-9/_.,%+()' -]*$/.test(clean)) return clean;

  try {
    const url = new URL(clean);
    if (["http:", "https:"].includes(url.protocol)) return url.toString();
  } catch {
    // Handled below.
  }

  throw new ArticleStoreError("Inserisci un indirizzo HTTPS valido oppure un percorso interno che inizi con /.", 400);
}

function cleanSlug(value) {
  const slug = cleanString(value, 90)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!slug) throw new ArticleStoreError("L’articolo deve avere un indirizzo valido.", 400);
  return slug;
}

function cleanBlocks(blocks) {
  if (!Array.isArray(blocks)) throw new ArticleStoreError("Aggiungi almeno un blocco di contenuto.", 400);

  const clean = blocks.slice(0, 100).map((block) => {
    const type = BLOCK_TYPES.has(block?.type) ? block.type : "paragraph";

    if (type === "image") {
      const src = cleanUrl(block.src, { allowLocal: true });
      if (!src) throw new ArticleStoreError("Scegli un’immagine per ogni blocco immagine.", 400);
      return {
        id: randomUUID(),
        type,
        src,
        alt: cleanString(block.alt, 240, true),
        caption: cleanString(block.caption, 300)
      };
    }

    if (type === "button") {
      return {
        id: randomUUID(),
        type,
        label: cleanString(block.label, 100, true),
        href: cleanUrl(cleanString(block.href, 2048, true), { allowLocal: true })
      };
    }

    if (type === "divider") {
      return { id: randomUUID(), type };
    }

    const align = ["left", "center", "right"].includes(block?.align) ? block.align : "left";

    return {
      id: randomUUID(),
      type,
      text: cleanString(block?.text, type === "heading" ? 180 : 20000, true),
      align,
      bold: Boolean(block?.bold),
      italic: Boolean(block?.italic),
      href: cleanUrl(block?.href, { allowLocal: true }),
      ...(type === "heading" ? { level: [2, 3].includes(Number(block?.level)) ? Number(block.level) : 2 } : {})
    };
  });

  if (clean.length === 0) throw new ArticleStoreError("Aggiungi almeno un blocco di contenuto.", 400);
  return clean;
}

function formatItalianDate(date) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T12:00:00Z`));
}

function validateArticle(input, existing = null) {
  const publishedAt = /^\d{4}-\d{2}-\d{2}$/.test(input?.publishedAt || "")
    ? input.publishedAt
    : new Date().toISOString().slice(0, 10);
  const blocks = cleanBlocks(input?.blocks);
  const wordCount = blocks.reduce((total, block) => total + (block.text?.split(/\s+/).filter(Boolean).length || 0), 0);
  const notes = input?.notes || {};
  const clampNote = (value) => Math.max(0, Math.min(100, Number(value) || 0));

  return {
    id: existing?.id || randomUUID(),
    slug: cleanSlug(input?.slug || input?.title),
    title: cleanString(input?.title, 180, true),
    subtitle: cleanString(input?.subtitle, 360, true),
    category: cleanString(input?.category, 50, true),
    date: formatItalianDate(publishedAt),
    publishedAt,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: cleanString(input?.author, 100, true),
    region: cleanString(input?.region, 100, true),
    difficulty: cleanString(input?.difficulty, 50) || "Accessibile",
    readTime: `${Math.max(1, Math.ceil(wordCount / 210))} min`,
    featured: Boolean(input?.featured),
    image: cleanUrl(input?.image, { allowLocal: true }),
    imageAlt: cleanString(input?.imageAlt, 240, true),
    pullQuote: cleanString(input?.pullQuote, 500),
    sourceUrl: cleanUrl(input?.sourceUrl),
    sourceLabel: cleanString(input?.sourceLabel, 180) || "Kroinos / Redazione",
    bottle: cleanString(input?.bottle, 180),
    tags: Array.isArray(input?.tags)
      ? input.tags.map((tag) => cleanString(tag, 40)).filter(Boolean).slice(0, 12)
      : [],
    notes: {
      acidity: clampNote(notes.acidity),
      body: clampNote(notes.body),
      tannins: clampNote(notes.tannins),
      sweetness: clampNote(notes.sweetness),
      finish: clampNote(notes.finish)
    },
    blocks
  };
}

function decodeImage(dataUrl) {
  const match = /^data:image\/(png|jpeg|webp|gif);base64,([a-zA-Z0-9+/=]+)$/.exec(dataUrl || "");
  if (!match) throw new ArticleStoreError("L'immagine deve essere PNG, JPEG, WebP o GIF.", 400);

  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length || buffer.length > MAX_IMAGE_BYTES) {
    throw new ArticleStoreError("L'immagine deve pesare meno di 8 MB.", 400);
  }

  return { buffer, extension: match[1] === "jpeg" ? "jpg" : match[1] };
}

async function saveImageData(dataUrl, filename, commitLabel) {
  if (!dataUrl) return "";
  const { buffer, extension } = decodeImage(dataUrl);
  const relativePath = `uploads/${filename}-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;

  if (hasGithubStore()) {
    await writeGithubFile(
      `public/${relativePath}`,
      buffer,
      commitLabel
    );
    const { repository, branch } = githubConfig();
    const remotePath = [branch, "public", ...relativePath.split("/")].map(encodeURIComponent).join("/");
    return `https://raw.githubusercontent.com/${repository}/${remotePath}`;
  } else {
    if (process.env.VERCEL) {
      throw new ArticleStoreError(
        "Per pubblicare immagini su Vercel devi configurare l’archivio GitHub.",
        503
      );
    }
    const destination = join(process.cwd(), "public", ...relativePath.split("/"));
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, buffer);
  }

  return `/${relativePath}`;
}

async function prepareArticleImages(input, slug) {
  const blocks = await Promise.all((Array.isArray(input?.blocks) ? input.blocks : []).map(async (block, index) => {
    if (block?.type !== "image" || !block.imageData) return block;
    const src = await saveImageData(block.imageData, `${slug}-block-${index + 1}`, `Upload article image: ${slug}`);
    return { ...block, src, imageData: undefined, preview: undefined };
  }));

  const image = input?.coverImageData
    ? await saveImageData(input.coverImageData, `${slug}-cover`, `Upload cover image: ${slug}`)
    : input?.image;

  return { ...input, image, blocks };
}

export function getArticleStoreStatus() {
  const config = githubConfig();
  const partialGithubConfig = Boolean(config.token || config.repository) && !hasGithubStore();

  return {
    mode: hasGithubStore() ? "github" : "local",
    ready: !process.env.VERCEL || hasGithubStore(),
    warning: partialGithubConfig
      ? "Completa entrambe le variabili dell’archivio GitHub prima di pubblicare."
      : ""
  };
}

function mergeArticleState(state) {
  const deleted = new Set(state.deletedSlugs);
  const customSlugs = new Set(state.articles.map((article) => article.slug));
  const builtInArticles = seedArticles.filter((article) => !deleted.has(article.slug) && !customSlugs.has(article.slug));
  return [...state.articles.filter((article) => !deleted.has(article.slug)), ...builtInArticles];
}

export async function getArticles() {
  let state = { articles: [], deletedSlugs: [] };
  try {
    state = await readArticleState();
  } catch (error) {
    console.error("Unable to read published articles; serving the built-in archive.", error);
  }

  return mergeArticleState(state).sort((left, right) => {
    const dateOrder = String(right.publishedAt || "").localeCompare(String(left.publishedAt || ""));
    return dateOrder || String(right.createdAt || "").localeCompare(String(left.createdAt || ""));
  });
}

export function getCellarAnalyses(articles) {
  return articles
    .filter((article) => ["Vino", "Sake", "Olio"].includes(article.category) && article.bottle)
    .map((article) => ({
      slug: article.slug,
      title: article.bottle,
      context: article.title,
      category: article.category,
      region: article.region,
      image: article.image,
      imageAlt: article.imageAlt,
      notes: article.notes,
      sourceUrl: article.sourceUrl,
      articleUrl: `/article/${article.slug}`
    }));
}

export async function publishArticle(input) {
  const requestedSlug = cleanSlug(input?.slug || input?.title);
  const state = await readArticleState();
  const allArticles = mergeArticleState(state);

  if (allArticles.some((article) => article.slug === requestedSlug)) {
    throw new ArticleStoreError("Questo indirizzo è già utilizzato. Scegline un altro.", 409);
  }

  const prepared = await prepareArticleImages(input, requestedSlug);
  const draft = validateArticle(prepared);

  if (!draft.image) throw new ArticleStoreError("Aggiungi un’immagine di copertina.", 400);

  await writeArticleState({
    articles: [draft, ...state.articles.filter((article) => article.slug !== draft.slug)],
    deletedSlugs: state.deletedSlugs.filter((slug) => slug !== draft.slug)
  }, `Publish article: ${draft.title}`);
  return draft;
}

export async function updateArticle(originalSlug, input) {
  const state = await readArticleState();
  const allArticles = mergeArticleState(state);
  const existing = allArticles.find((article) => article.slug === originalSlug);
  if (!existing) throw new ArticleStoreError("L’articolo non è stato trovato.", 404);

  const requestedSlug = cleanSlug(input?.slug || input?.title);
  if (requestedSlug !== originalSlug && allArticles.some((article) => article.slug === requestedSlug)) {
    throw new ArticleStoreError("Questo indirizzo è già utilizzato. Scegline un altro.", 409);
  }

  const prepared = await prepareArticleImages(input, requestedSlug);
  const updated = validateArticle(prepared, existing);

  if (!updated.image) throw new ArticleStoreError("Aggiungi un’immagine di copertina.", 400);

  const deletedSlugs = new Set(state.deletedSlugs);
  deletedSlugs.delete(updated.slug);
  if (originalSlug !== updated.slug) deletedSlugs.add(originalSlug);

  await writeArticleState({
    articles: [updated, ...state.articles.filter((article) => ![originalSlug, updated.slug].includes(article.slug))],
    deletedSlugs: [...deletedSlugs]
  }, `Update article: ${updated.title}`);

  return updated;
}

export async function deleteArticle(slug) {
  const state = await readArticleState();
  const existing = mergeArticleState(state).find((article) => article.slug === slug);
  if (!existing) throw new ArticleStoreError("L’articolo non è stato trovato.", 404);

  const deletedSlugs = new Set(state.deletedSlugs);
  deletedSlugs.add(slug);
  await writeArticleState({
    articles: state.articles.filter((article) => article.slug !== slug),
    deletedSlugs: [...deletedSlugs]
  }, `Delete article: ${existing.title}`);

  return existing;
}
