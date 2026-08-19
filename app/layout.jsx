import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600", "700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Kroinos — Vino, territori e cultura",
    template: "%s / Kroinos"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  keywords: ["vino", "sake", "territori", "sommelier", "cultura del vino", "olio"],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml"
    }
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: siteConfig.name,
    title: "Kroinos — Vino, territori e cultura",
    description: siteConfig.description,
    images: [{ url: "/images/grandi-langhe.png", width: 838, height: 552, alt: "Kroinos" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kroinos — Vino, territori e cultura",
    description: siteConfig.description,
    images: ["/images/grandi-langhe.png"]
  },
  icons: {
    icon: "/Favicon.png",
    shortcut: "/Favicon.png",
    apple: "/Favicon.png"
  }
};

export const viewport = {
  themeColor: "#080808",
  colorScheme: "dark"
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#contenuto" className="skip-link">Vai al contenuto</a>
        <div className="noise" />
        <Navbar />
        <div id="contenuto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
