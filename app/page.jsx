import HeroSection from "@/components/HeroSection";
import HomeLatestStories from "@/components/HomeLatestStories";
import HomeRegionIndex from "@/components/HomeRegionIndex";
import NewsletterCta from "@/components/NewsletterCta";
import { getArticles } from "@/lib/article-store";
import { regions } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await getArticles();
  const featured = articles.find((article) => article.featured) || articles[0];
  const recentArticles = articles.filter((article) => article.slug !== featured?.slug).slice(0, 4);

  return (
    <main>
      <HeroSection article={featured} articleCount={articles.length} />
      <HomeLatestStories articles={recentArticles} />
      <HomeRegionIndex regions={regions} articles={articles} />
      <NewsletterCta light />
    </main>
  );
}
