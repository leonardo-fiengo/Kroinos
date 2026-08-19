const platformHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const siteConfig = {
  name: "Kroinos",
  description: "Un archivio editoriale di vino, tempo, territori e persone.",
  url: process.env.NEXT_PUBLIC_SITE_URL || (platformHost ? `https://${platformHost}` : "http://localhost:3000"),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "redazione@kroinos.it",
  author: "Carmen Buongiovanni"
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
