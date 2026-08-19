import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import TastingMeter from "@/components/TastingMeter";
import { cellarAnalyses } from "@/lib/data";

export const metadata = {
  title: "Cantina",
  description: "Profili editoriali di vino, sake e olio: mappe sensoriali, contesto e storie di riferimento.",
  alternates: { canonical: "/canteen" }
};

export default function CanteenPage() {
  return (
    <AnimatedPageWrapper className="technical-grid min-h-screen px-4 pb-24 pt-36">
      <section className="editorial-shell">
        <div className="grid gap-8 border-b border-white/15 pb-12 md:grid-cols-[1fr_360px] md:items-end">
          <div>
            <p className="eyebrow"><span className="text-wine">CA</span> / Quaderno tecnico</p>
            <h1 className="mt-5 font-serif text-5xl leading-none text-cream sm:text-6xl md:text-8xl">Profili di cantina</h1>
          </div>
          <p className="leading-8 text-cream/68">
            Vino, sake e olio letti come mappe: non voti né classifiche, ma intensità utili per orientarsi nelle storie.
          </p>
        </div>

        <div className="paper-section mt-10 grid gap-px md:grid-cols-3">
          {[
            ["01", "Contesto", "Ogni profilo nasce dall’articolo e dal territorio, non da un punteggio isolato."],
            ["02", "Intensità", "Le barre mostrano rapporti sensoriali e aiutano a confrontare linguaggi diversi."],
            ["03", "Approfondimento", "Ogni scheda conduce al testo completo e alla sua fonte editoriale."]
          ].map(([number, title, text]) => (
            <div key={number} className="border border-charcoal/10 p-6">
              <p className="text-[.7rem] uppercase text-wine">{number} / Metodo</p>
              <h2 className="mt-4 font-serif text-3xl text-charcoal">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal/70">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-3">
          {cellarAnalyses.map((analysis, index) => (
            <article key={analysis.slug} className="card-lift technical-panel flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 text-[.7rem] uppercase text-cream/55">
                <span>CA / {String(index + 1).padStart(2, "0")}</span>
                <span className="max-w-[55%] truncate text-right">{analysis.region}</span>
              </div>

              <div className="technical-grid relative aspect-[16/9] overflow-hidden border-y border-white/10 bg-charcoal">
                <Image
                  src={analysis.image}
                  alt={analysis.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale-[.65]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <p className="absolute bottom-4 left-5 text-[.7rem] uppercase text-cream/75">{analysis.category}</p>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="min-h-16 font-serif text-3xl leading-none text-cream">{analysis.title}</h2>
                <p className="mt-3 text-sm leading-6 text-cream/62">{analysis.context}</p>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <TastingMeter notes={analysis.notes} />
                </div>

                <div className="mt-7 grid gap-3 border-t border-white/10 pt-5 text-xs uppercase">
                  <Link href={analysis.articleUrl} className="flex min-h-10 items-center justify-between text-cream/75 transition hover:text-wine">
                    Leggi l’articolo <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                  <a href={analysis.sourceUrl} target="_blank" rel="noreferrer" className="flex min-h-10 items-center justify-between text-cream/58 transition hover:text-wine">
                    Fonte originale <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
