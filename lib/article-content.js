import "server-only";

import { readFileSync } from "fs";
import { join } from "path";

function normalizeTitle(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("it")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

function slugify(value, index) {
  const slug = normalizeTitle(value).replace(/\s+/g, "-").slice(0, 70);
  return `${slug || "sezione"}-${index}`;
}

function isHeading(value) {
  const clean = value.trim();
  if (!clean || clean.length > 100 || /[?.!]$/.test(clean)) return false;
  return clean.split(/\s+/).length <= 10;
}

function isQuestion(value) {
  return value.includes("?") && value.length <= 1000;
}

function readArticleText(article) {
  if (!article.textFile) return [];

  try {
    const filePath = join(process.cwd(), "testi", article.textFile);
    const raw = readFileSync(filePath, "utf8").replace(/\r\n/g, "\n").trim();
    return raw
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function normalizeEditorBlocks(article) {
  if (!Array.isArray(article.blocks) || article.blocks.length === 0) return [];

  return article.blocks
    .map((block, index) => {
      const type = ["heading", "paragraph", "quote", "image", "button", "divider"].includes(block.type)
        ? block.type
        : "paragraph";

      if (type === "image") {
        return {
          type,
          src: block.src || "",
          alt: block.alt || "",
          caption: block.caption || ""
        };
      }

      if (type === "button") {
        return {
          type,
          label: block.label || "",
          href: block.href || ""
        };
      }

      if (type === "divider") return { type };

      const text = String(block.text || "").trim();
      if (!text) return null;

      return {
        type,
        text,
        align: ["left", "center", "right"].includes(block.align) ? block.align : "left",
        bold: Boolean(block.bold),
        italic: Boolean(block.italic),
        href: block.href || "",
        ...(type === "heading" ? { level: Number(block.level) === 3 ? 3 : 2 } : {}),
        ...(type === "heading" ? { id: slugify(text, index) } : {})
      };
    })
    .filter(Boolean);
}

function contentFallback(article) {
  if (!Array.isArray(article.content)) return [];

  return article.content.flatMap((section, sectionIndex) => [
    ...(section.heading
      ? [{ type: "heading", text: section.heading, id: slugify(section.heading, sectionIndex) }]
      : []),
    ...(Array.isArray(section.paragraphs)
      ? section.paragraphs.map((text) => ({ type: "paragraph", text }))
      : [])
  ]);
}

export function getArticleNodes(article) {
  const editorBlocks = normalizeEditorBlocks(article);
  if (editorBlocks.length > 0) return editorBlocks;

  const interview = [
    "intervista-alterata-fabio-rizzari",
    "grandi-langhe-sergio-germano",
    "max-d-addario-stilista-olio"
  ].includes(article.slug);

  const nodes = [];
  const sourceTitles = [article.title, article.sourceTitle]
    .filter(Boolean)
    .map(normalizeTitle);

  readArticleText(article).forEach((block, blockIndex) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);

    if (blockIndex === 0 && lines[0]) {
      const firstLine = normalizeTitle(lines[0]);
      if (sourceTitles.includes(firstLine)) return;
    }

    if (lines.length > 1 && isHeading(lines[0])) {
      const heading = lines[0];
      const body = lines.slice(1).join("\n");
      nodes.push({ type: "heading", text: heading, id: slugify(heading, blockIndex) });
      if (body) nodes.push({ type: interview && isQuestion(body) ? "question" : "paragraph", text: body });
      return;
    }

    if (isHeading(block)) {
      nodes.push({ type: "heading", text: block, id: slugify(block, blockIndex) });
    } else if (interview && isQuestion(block)) {
      nodes.push({ type: "question", text: block });
    } else {
      nodes.push({ type: "paragraph", text: block });
    }
  });

  return nodes.length > 0 ? nodes : contentFallback(article);
}
