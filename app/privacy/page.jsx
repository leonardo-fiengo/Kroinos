import Link from "next/link";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Privacy",
  description: "Informativa essenziale sul trattamento dei dati personali in Kroinos.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <AnimatedPageWrapper className="technical-grid min-h-screen px-4 pb-24 pt-36">
      <article className="reading-shell">
        <p className="eyebrow"><span className="text-wine">PR</span> / Informativa</p>
        <h1 className="mt-6 font-serif text-6xl leading-none text-cream md:text-8xl">Privacy</h1>

        <div className="mt-12 space-y-9 border-t border-white/15 pt-10 text-base leading-8 text-cream/72">
          <section>
            <h2 className="font-serif text-3xl text-cream">Newsletter</h2>
            <p className="mt-3">
              Quando ti iscrivi raccogliamo il tuo indirizzo email e la data del consenso esclusivamente per inviarti le lettere di Kroinos.
              Non vendiamo né cediamo l’indirizzo per finalità commerciali di terzi.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-cream">Conservazione e fornitori</h2>
            <p className="mt-3">
              L’indirizzo viene trasmesso al servizio newsletter configurato dal titolare e conservato finché resti iscritto.
              Ogni comunicazione deve includere un collegamento per annullare l’iscrizione.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-cream">I tuoi diritti</h2>
            <p className="mt-3">
              Puoi chiedere accesso, rettifica o cancellazione dei dati scrivendo a{" "}
              <a className="text-cream underline decoration-wine underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>.
            </p>
          </section>

          <p className="border-t border-white/10 pt-8 text-sm text-cream/55">
            Questa informativa descrive le funzioni presenti nel sito. Prima della pubblicazione, verifica indirizzo di contatto,
            fornitore newsletter e requisiti legali applicabili.
          </p>
        </div>

        <Link href="/newsletter" className="mt-12 inline-flex border border-white/20 px-5 py-4 text-xs font-semibold uppercase text-cream hover:border-wine hover:text-wine">
          Torna alle lettere
        </Link>
      </article>
    </AnimatedPageWrapper>
  );
}
