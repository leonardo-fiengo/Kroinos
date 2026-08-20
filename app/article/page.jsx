import AdminLogin from "@/components/admin/AdminLogin";
import AdminStudio from "@/components/admin/AdminStudio";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { getArticleNodes } from "@/lib/article-content";
import { getArticles, getArticleStoreStatus } from "@/lib/article-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Editorial Studio",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true }
  }
};

export default async function AdminPage() {
  if (!hasAdminSession()) {
    return <AdminLogin configured={isAdminConfigured()} />;
  }

  const articles = await getArticles();
  const editableArticles = articles.map((article) => ({
    id: article.id || article.slug,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle,
    category: article.category,
    date: article.date,
    publishedAt: article.publishedAt,
    author: article.author,
    region: article.region,
    difficulty: article.difficulty,
    image: article.image,
    imageAlt: article.imageAlt,
    pullQuote: article.pullQuote || "",
    sourceUrl: article.sourceUrl || "",
    sourceLabel: article.sourceLabel || "",
    bottle: article.bottle || "",
    tags: article.tags || [],
    featured: Boolean(article.featured),
    notes: article.notes || { acidity: 50, body: 50, tannins: 30, sweetness: 10, finish: 60 },
    blocks: getArticleNodes(article).map((block, index) => ({
      ...block,
      id: `${article.slug}-${index}`,
      type: block.type === "question" ? "quote" : block.type
    }))
  }));

  return <AdminStudio initialArticles={editableArticles} storeStatus={getArticleStoreStatus()} />;
}
