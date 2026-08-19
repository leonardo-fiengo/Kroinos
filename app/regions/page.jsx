import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import RegionCard from "@/components/RegionCard";
import { articles, regions } from "@/lib/data";

export const metadata = {
  title: "Territori",
  description: "L’atlante editoriale di Kroinos: Piemonte, Giappone e Abruzzo letti attraverso vino, sake, olio e cultura.",
  alternates: { canonical: "/regions" }
};

export default function RegionsPage() {
  return (
    <AnimatedPageWrapper className="technical-grid min-h-screen px-4 pb-24 pt-36">
      <section className="editorial-shell">
        <div className="grid gap-8 border-b border-white/15 pb-12 md:grid-cols-[1fr_360px] md:items-end">
          <div>
            <p className="eyebrow"><span className="text-wine">TR</span> / Atlante</p>
            <h1 className="mt-5 font-serif text-6xl leading-none text-cream md:text-8xl">Territori</h1>
          </div>
          <p className="leading-8 text-cream/68">Luoghi letti come coordinate: clima, materia e cultura spiegano ciò che accade nel bicchiere.</p>
        </div>
        <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {regions.map((region, index) => (
            <RegionCard
              key={region.id}
              region={region}
              index={index}
              articleCount={articles.filter((article) => article.region === region.name).length}
            />
          ))}
        </div>

        <div className="paper-section mt-16 grid gap-px md:grid-cols-3">
          {[
            ["01", "Materia", "Uva, riso, acqua, olio: ogni storia comincia da ciò che un luogo rende possibile."],
            ["02", "Clima", "Temperature, pioggia ed escursioni trasformano tecnica, annate e linguaggio."],
            ["03", "Persone", "Produttori, studiosi e sommelier rendono il territorio una cultura condivisa."]
          ].map(([number, title, text]) => (
            <article key={number} className="border border-charcoal/10 p-7">
              <p className="text-[.7rem] uppercase text-wine">{number} / Coordinate</p>
              <h2 className="mt-5 font-serif text-4xl text-charcoal">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/70">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
