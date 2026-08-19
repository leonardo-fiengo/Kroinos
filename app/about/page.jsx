import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Chi sono",
  description: "Carmen Buongiovanni: sommelier, degustatrice e autrice di Kroinos.",
  alternates: { canonical: "/about" }
};

const credentials = [
  ["AIS", "Sommelier e Degustatrice"],
  ["Sake", "Sake e Shochu Sommelier"],
  ["Whisky", "Master of Whisky"],
  ["Metodo", "Statistica, economia e ricerca"]
];

export default function AboutPage() {
  return (
    <AnimatedPageWrapper className="technical-grid min-h-screen px-4 pb-24 pt-36">
      <section className="editorial-shell">
        <div className="grid gap-px bg-white/10 lg:grid-cols-[.82fr_1.18fr]">
          <div className="relative min-h-[480px] overflow-hidden bg-charcoal p-8 md:p-12">
            <p className="eyebrow"><span className="text-wine">CB</span> / Chi sono</p>
            <h1 className="mt-6 max-w-xl font-serif text-6xl leading-[.88] text-cream md:text-8xl">L’astemia pentita.</h1>
            <p className="mt-7 max-w-md text-base leading-8 text-cream/68">
              Carmen Buongiovanni, sommelier e degustatrice. Kroinos nasce dal desiderio di mettere contesto prima del giudizio.
            </p>
            <Image src="/Favicon.png" alt="" width={527} height={473} className="absolute -bottom-12 -right-10 w-72 opacity-35 mix-blend-screen" />
          </div>

          <div className="bg-ink p-8 text-lg leading-9 text-cream/74 md:p-12">
            <p>
              Dovessi definirmi in un modo, sceglierei il nome della cantina di Barolo “L’Astemia Pentita”.
              Ho cominciato a bere vino poco più di dieci anni fa per una scommessa con un’amica, che non finirò mai di ringraziare.
              Poi è arrivato il corso da sommelier, scelto per condividere una passione appena nata con il mio primogenito.
            </p>
            <p className="mt-7 border-t border-white/10 pt-7">
              Una laurea in Statistica computazionale, un master in economia e finanza e oltre vent’anni da manager in TIM
              hanno lasciato un metodo: osservare, verificare, mettere in relazione. Quella che doveva essere una pausa
              è diventata l’inizio di una vita nuova. Domani, chissà.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/articles" className="inline-flex min-h-14 items-center gap-8 border border-cream bg-cream px-5 py-4 text-xs font-semibold uppercase text-charcoal hover:bg-white">
                Leggi le storie <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex min-h-14 items-center gap-8 border border-white/25 px-5 py-4 text-xs font-semibold uppercase text-cream hover:border-wine hover:text-wine">
                Scrivimi <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="paper-section grid gap-px md:grid-cols-2 lg:grid-cols-4">
          {credentials.map(([title, text], index) => (
            <div key={title} className="border border-charcoal/10 p-6">
              <p className="text-[.7rem] uppercase text-wine">{String(index + 1).padStart(2, "0")} / Profilo</p>
              <h2 className="mt-5 font-serif text-3xl text-charcoal">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-charcoal/68">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
