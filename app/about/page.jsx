import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <main>
      <header className="paper-section overflow-hidden px-4 pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="editorial-shell public-reveal relative grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div className="relative z-10">
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Carmen Buongiovanni / Autrice</p>
            <h1 className="public-display mt-6 max-w-[8ch] font-serif leading-[.78] text-charcoal">L’astemia <em className="font-normal text-wine">pentita.</em></h1>
          </div>

          <div className="relative border-t border-charcoal/20 pb-3 pt-7">
            <blockquote className="relative z-10 max-w-lg font-serif text-3xl leading-tight text-charcoal md:text-4xl">
              “Prima del giudizio vengono il contesto, le persone e il tempo.”
            </blockquote>
            <p className="relative z-10 mt-6 max-w-md text-sm leading-7 text-charcoal/64">
              Sommelier, degustatrice e autrice. Kroinos nasce per raccontare ciò che rende un bicchiere più grande del suo assaggio.
            </p>
            <Image src="/Favicon.png" alt="" width={527} height={473} className="absolute -bottom-32 -right-20 w-72 opacity-[.08]" />
          </div>
        </div>
      </header>

      <section className="technical-grid border-y border-white/10 bg-charcoal px-4 py-20 text-cream md:py-28">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-24">
          <aside>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">La storia</p>
            <p className="mt-5 font-serif text-3xl leading-tight text-cream">Una scommessa, un corso da sommelier, poi una vita nuova.</p>
          </aside>

          <div className="max-w-[68ch] text-lg leading-9 text-cream/72 md:text-xl md:leading-10">
            <p className="about-dropcap">
              Dovessi definirmi in un modo, sceglierei il nome della cantina di Barolo “L’Astemia Pentita”.
              Ho cominciato a bere vino poco più di dieci anni fa per una scommessa con un’amica, che non finirò mai di ringraziare.
              Poi è arrivato il corso da sommelier, scelto per condividere una passione appena nata con il mio primogenito.
            </p>
            <p className="mt-9 border-t border-white/12 pt-9">
              Una laurea in Statistica computazionale, un master in economia e finanza e oltre vent’anni da manager in TIM
              hanno lasciato un metodo: osservare, verificare, mettere in relazione. Quella che doveva essere una pausa
              è diventata l’inizio di una vita nuova. Domani, chissà.
            </p>
          </div>
        </div>
      </section>

      <section className="paper-section px-4 py-20 md:py-24">
        <div className="editorial-shell">
          <header className="grid gap-7 border-b border-charcoal/20 pb-9 md:grid-cols-[1fr_320px] md:items-end">
            <div>
              <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Esperienza e metodo</p>
              <h2 className="mt-4 font-serif text-5xl leading-none text-charcoal md:text-6xl">Le coordinate.</h2>
            </div>
            <p className="text-sm leading-7 text-charcoal/62">Formazione sensoriale e strumenti analitici convivono nello stesso modo di fare ricerca.</p>
          </header>

          <dl className="border-t border-charcoal/20">
            {credentials.map(([title, text], index) => (
              <div key={title} className="grid gap-3 border-b border-charcoal/20 py-6 sm:grid-cols-[48px_180px_1fr] sm:items-baseline">
                <dt className="text-[.68rem] font-semibold text-wine">{String(index + 1).padStart(2, "0")}</dt>
                <dd className="font-serif text-3xl text-charcoal">{title}</dd>
                <dd className="text-sm leading-7 text-charcoal/64">{text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/articles" className="home-primary-link inline-flex min-h-14 items-center justify-between gap-8 border border-charcoal bg-charcoal px-5 py-4 text-xs font-semibold uppercase text-cream">
              Leggi le storie <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <a href={`mailto:${siteConfig.contactEmail}`} className="about-contact-link inline-flex min-h-14 items-center justify-between gap-8 border border-charcoal/30 px-5 py-4 text-xs font-semibold uppercase text-charcoal">
              Scrivimi <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
