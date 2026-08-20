import { permanentRedirect } from "next/navigation";

export default function LegacyArticleRoute({ params }) {
  permanentRedirect(`/article/${params.slug}`);
}
