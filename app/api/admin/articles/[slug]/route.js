import { revalidatePath } from "next/cache";
import { hasAdminSession } from "@/lib/admin-auth";
import { ArticleStoreError, deleteArticle, updateArticle } from "@/lib/article-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function authorize(request) {
  if (!hasAdminSession()) {
    return Response.json({ error: "Your admin session has expired." }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }
  return null;
}

function refreshPublicPages(...slugs) {
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/canteen");
  revalidatePath("/regions");
  slugs.filter(Boolean).forEach((slug) => revalidatePath(`/article/${slug}`));
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
}

function articleResponse(article) {
  return {
    slug: article.slug,
    title: article.title,
    url: `/article/${article.slug}`,
    publishedAt: article.publishedAt,
    date: article.date,
    category: article.category,
    image: article.image,
    imageAlt: article.imageAlt
  };
}

export async function PUT(request, { params }) {
  const unauthorized = authorize(request);
  if (unauthorized) return unauthorized;

  const maxPayloadSize = 12 * 1024 * 1024;
  if (Number(request.headers.get("content-length") || 0) > maxPayloadSize) {
    return Response.json({ error: "The article payload is too large." }, { status: 413 });
  }

  try {
    const rawPayload = await request.text();
    if (rawPayload.length > maxPayloadSize) {
      return Response.json({ error: "The article payload is too large." }, { status: 413 });
    }

    let payload;
    try {
      payload = JSON.parse(rawPayload);
    } catch {
      return Response.json({ error: "The article payload is not valid JSON." }, { status: 400 });
    }

    const article = await updateArticle(params.slug, payload);
    refreshPublicPages(params.slug, article.slug);
    return Response.json({ ok: true, article: articleResponse(article) });
  } catch (error) {
    if (error instanceof ArticleStoreError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    console.error("Unable to update article", error);
    return Response.json({ error: "The article could not be updated." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const unauthorized = authorize(request);
  if (unauthorized) return unauthorized;

  try {
    const article = await deleteArticle(params.slug);
    refreshPublicPages(params.slug);
    return Response.json({ ok: true, article: articleResponse(article) });
  } catch (error) {
    if (error instanceof ArticleStoreError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    console.error("Unable to delete article", error);
    return Response.json({ error: "The article could not be deleted." }, { status: 500 });
  }
}
