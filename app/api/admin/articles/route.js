import { revalidatePath } from "next/cache";
import { hasAdminSession } from "@/lib/admin-auth";
import { ArticleStoreError, getArticleStoreStatus, publishArticle } from "@/lib/article-store";

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

export async function POST(request) {
  if (!hasAdminSession()) {
    return Response.json({ error: "La sessione è scaduta. Accedi di nuovo." }, { status: 401 });
  }

  if (!sameOrigin(request)) {
    return Response.json({ error: "Origine della richiesta non valida." }, { status: 403 });
  }

  const maxPayloadSize = 12 * 1024 * 1024;
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxPayloadSize) {
    return Response.json({ error: "L’articolo e le immagini sono troppo pesanti." }, { status: 413 });
  }

  try {
    const rawPayload = await request.text();
    if (rawPayload.length > maxPayloadSize) {
      return Response.json({ error: "L’articolo e le immagini sono troppo pesanti." }, { status: 413 });
    }
    let payload;
    try {
      payload = JSON.parse(rawPayload);
    } catch {
      return Response.json({ error: "I dati dell’articolo non sono validi." }, { status: 400 });
    }
    const article = await publishArticle(payload);

    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath(`/article/${article.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");

    return Response.json({
      ok: true,
      article: {
        slug: article.slug,
        title: article.title,
        url: `/article/${article.slug}`,
        publishedAt: article.publishedAt,
        date: article.date,
        category: article.category,
        image: article.image,
        imageAlt: article.imageAlt,
        blocks: article.blocks
      },
      storage: getArticleStoreStatus().mode
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ArticleStoreError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Unable to publish article", error);
    return Response.json({ error: "Non è stato possibile pubblicare l’articolo." }, { status: 500 });
  }
}
