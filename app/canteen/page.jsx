import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import EditorialImage from "@/components/EditorialImage";
import TastingMeter from "@/components/TastingMeter";
import { getArticles, getCellarAnalyses } from "@/lib/article-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cantina",
  description: "Profili editoriali di vino, sake e olio: mappe sensoriali, contesto e storie di riferimento.",
  alternates: { canonical: "/canteen" }
};

const method = [
  ["01", "Contesto", "Ogni profilo nasce da una storia e da un territorio, mai da un punteggio isolato."],
  ["02", "Intensità", "Le barre mostrano relazioni sensoriali: servono a orientarsi, non a stilare classifiche."],
  ["03", "Approfondimento", "Ogni scheda riporta al racconto completo e, quando presente, alla fonte originale."]
];

export default async function CanteenPage() {
  const cellarAnalyses = getCellarAnalyses(await getArticles());

  return (
    <main>
      <header className="public-hero technical-grid relative min-h-[76svh] overflow-hidden border-b border-white/10 px-4 pb-16 pt-36 text-cream md:pt-44">
        <div className="editorial-shell public-reveal relative z-10 grid min-h-[560px] gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="relative z-10">
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Quaderno tecnico / Profili sensoriali</p>
            <h1 className="public-display mt-6 max-w-[7ch] font-serif leading-[.78]">Cantina</h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-cream/70 md:text-lg">
              Vino, sake e olio letti come mappe. Non voti da inseguire, ma intensità da mettere in relazione.
            </p>
            <a href="#profili" className="home-secondary-link mt-9 inline-flex min-h-14 items-center gap-8 border border-white/25 px-5 py-4 text-xs font-semibold uppercase text-cream">
              Apri i profili <ArrowDownRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="relative hidden h-full min-h-[520px] lg:block" aria-hidden="true">
            <span className="absolute right-0 top-8 font-serif text-[12rem] leading-none text-white/[.025]">01</span>
            <Image src="/images/wine-bottle-cutout.png" alt="" fill priority sizes="360px" className="object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,.5)]" />
          </div>
        </div>
      </header>

      <section className="paper-section px-4 py-16 md:py-24">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Il metodo</p>
            <h2 className="mt-4 max-w-[10ch] font-serif text-5xl leading-[.95] text-charcoal md:text-6xl">Come leggere una scheda.</h2>
          </div>
          <ol className="border-t border-charcoal/20">
            {method.map(([number, title, text]) => (
              <li key={number} className="grid gap-4 border-b border-charcoal/20 py-6 sm:grid-cols-[48px_150px_1fr] sm:items-baseline">
                <span className="text-[.68rem] font-semibold text-wine">{number}</span>
                <h3 className="font-serif text-3xl text-charcoal">{title}</h3>
                <p className="text-sm leading-7 text-charcoal/66">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="profili" className="technical-grid scroll-mt-20 border-t border-white/10 bg-charcoal px-4 py-20 text-cream md:py-28">
        <div className="editorial-shell">
          <header className="grid gap-7 border-b border-white/15 pb-9 md:grid-cols-[1fr_320px] md:items-end">
            <div>
              <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Archivio di cantina</p>
              <h2 className="mt-4 font-serif text-5xl leading-none md:text-7xl">Profili</h2>
            </div>
            <p className="text-sm leading-7 text-cream/60">{cellarAnalyses.length} mappe sensoriali, tutte collegate alle storie da cui hanno origine.</p>
          </header>

          {cellarAnalyses.length > 0 ? (
            <div className="border-t border-white/15">
              {cellarAnalyses.map((analysis, index) => (
                <article key={analysis.slug} className="cellar-profile-row grid gap-7 border-b border-white/15 py-8 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_300px] lg:items-center">
                  <Link href={analysis.articleUrl} className="relative aspect-[4/3] overflow-hidden bg-white/5" tabIndex={-1} aria-hidden="true">
                    <EditorialImage src={analysis.image} alt="" sizes="220px" className="cellar-profile-image object-cover grayscale-[.45]" />
                  </Link>

                  <div>
                    <p className="text-[.68rem] font-semibold uppercase tracking-[.04em] text-cream/44">
                      {String(index + 1).padStart(2, "0")} / {analysis.category} / {analysis.region}
                    </p>
                    <h3 className="mt-3 max-w-[18ch] font-serif text-3xl leading-none text-cream md:text-4xl">
                      <Link href={analysis.articleUrl}>{analysis.title}</Link>
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-cream/58">{analysis.context}</p>
                    <div className="mt-5 flex flex-wrap gap-5 text-[.68rem] font-semibold uppercase tracking-[.04em]">
                      <Link href={analysis.articleUrl} className="cellar-profile-link inline-flex min-h-10 items-center gap-3 text-cream/76">
                        Leggi l’articolo <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                      {analysis.sourceUrl && (
                        <a href={analysis.sourceUrl} target="_blank" rel="noreferrer" className="cellar-profile-link inline-flex min-h-10 items-center gap-3 text-cream/48">
                          Fonte <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 md:col-start-2 lg:col-start-auto lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    <p className="mb-5 text-[.68rem] font-semibold uppercase tracking-[.04em] text-wine">Relazioni sensoriali</p>
                    <TastingMeter notes={analysis.notes} />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-b border-white/15 py-20 text-center">
              <p className="font-serif text-4xl">La cantina è in preparazione.</p>
              <p className="mt-3 text-sm text-cream/58">I primi profili arriveranno con le prossime storie.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
