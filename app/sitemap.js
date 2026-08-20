import { getArticles } from "@/lib/article-store";
import { regions } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 0;

export default async function sitemap() {
  const articles = await getArticles();
  const staticRoutes = ["", "/articles", "/canteen", "/regions", "/about", "/newsletter", "/privacy"];
  const newestArticleDate = articles[0]?.publishedAt || new Date().toISOString();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || "/"),
      lastModified: newestArticleDate,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : .7
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/article/${article.slug}`),
      lastModified: article.publishedAt,
      changeFrequency: "yearly",
      priority: .8
    })),
    ...regions.map((region) => ({
      url: absoluteUrl(`/regions/${region.id}`),
      lastModified: newestArticleDate,
      changeFrequency: "monthly",
      priority: .65
    }))
  ];
}
