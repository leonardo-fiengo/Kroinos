import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Privacy",
  description: "Informativa essenziale sul trattamento dei dati personali in Kroinos.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <main className="paper-section min-h-screen px-4 pb-24 pt-36 md:pt-44">
      <article className="reading-shell public-reveal">
        <Link href="/newsletter" className="about-contact-link inline-flex min-h-11 items-center gap-3 text-[.68rem] font-semibold uppercase tracking-[.04em] text-charcoal/56">
          <ArrowLeft size={15} aria-hidden="true" /> Torna alle lettere
        </Link>
        <p className="mt-12 text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Informativa / Dati personali</p>
        <h1 className="mt-6 font-serif text-7xl leading-none text-charcoal md:text-8xl">Privacy</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-charcoal/64">Le informazioni essenziali su cosa viene raccolto quando ti iscrivi alle lettere di Kroinos.</p>

        <div className="mt-12 space-y-10 border-t border-charcoal/20 pt-10 text-base leading-8 text-charcoal/70">
          <section>
            <p className="text-[.68rem] font-semibold text-wine">01</p>
            <h2 className="mt-2 font-serif text-3xl text-charcoal">Newsletter</h2>
            <p className="mt-3">
              Quando ti iscrivi raccogliamo il tuo indirizzo email e la data del consenso esclusivamente per inviarti le lettere di Kroinos.
              Non vendiamo né cediamo l’indirizzo per finalità commerciali di terzi.
            </p>
          </section>

          <section className="border-t border-charcoal/15 pt-9">
            <p className="text-[.68rem] font-semibold text-wine">02</p>
            <h2 className="mt-2 font-serif text-3xl text-charcoal">Conservazione e fornitori</h2>
            <p className="mt-3">
              L’indirizzo viene trasmesso al servizio newsletter configurato dal titolare e conservato finché resti iscritto.
              Ogni comunicazione deve includere un collegamento per annullare l’iscrizione.
            </p>
          </section>

          <section className="border-t border-charcoal/15 pt-9">
            <p className="text-[.68rem] font-semibold text-wine">03</p>
            <h2 className="mt-2 font-serif text-3xl text-charcoal">I tuoi diritti</h2>
            <p className="mt-3">
              Puoi chiedere accesso, rettifica o cancellazione dei dati scrivendo a{" "}
              <a className="text-charcoal underline decoration-wine underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>.
            </p>
          </section>

          <p className="border-t border-charcoal/20 pt-8 text-sm text-charcoal/52">
            Questa informativa descrive le funzioni presenti nel sito. Prima della pubblicazione, verifica indirizzo di contatto,
            fornitore newsletter e requisiti legali applicabili.
          </p>
        </div>
      </article>
    </main>
  );
}
