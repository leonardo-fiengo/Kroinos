import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: "Lettere",
  description: "La newsletter mensile di Kroinos: un territorio, tre bottiglie e una storia da conservare.",
  alternates: { canonical: "/newsletter" }
};

const promises = [
  ["01", "Una volta al mese", "Il tempo necessario per scegliere, assaggiare e scrivere bene."],
  ["02", "Curata a mano", "Un territorio, tre bottiglie e un dettaglio felicemente inutile."],
  ["03", "Sempre revocabile", "Niente rumore: puoi uscire dalla lista con un solo gesto."]
];

export default function NewsletterPage() {
  return (
    <main className="technical-grid min-h-screen bg-charcoal px-4 pb-20 pt-32 text-cream md:pb-28 md:pt-40">
      <div className="editorial-shell public-reveal grid overflow-hidden border border-white/15 lg:grid-cols-[.92fr_1.08fr]">
        <section className="relative flex min-h-[620px] flex-col justify-between overflow-hidden p-8 md:p-12 lg:p-14">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Lettere / Numero mensile</p>
            <h1 className="mt-7 max-w-[9ch] font-serif text-6xl leading-[.86] sm:text-7xl md:text-8xl">Lettere, senza rumore.</h1>
            <p className="mt-8 max-w-md text-base leading-8 text-cream/68">
              Un territorio, tre bottiglie, un’idea di abbinamento e una storia da conservare. Solo quando c’è davvero qualcosa da dire.
            </p>
          </div>

          <p className="mt-16 max-w-sm border-t border-white/15 pt-6 font-serif text-2xl leading-tight text-cream/72">
            “Una piccola pausa dal flusso, da leggere con il tempo di un bicchiere.”
          </p>
          <span className="pointer-events-none absolute -bottom-16 -right-4 font-serif text-[15rem] leading-none text-white/[.025]" aria-hidden="true">K</span>
        </section>

        <section className="paper-section p-8 md:p-12 lg:p-14">
          <p className="text-[.7rem] font-semibold uppercase tracking-[.06em] text-wine">Il prossimo numero</p>
          <h2 className="mt-5 max-w-[12ch] font-serif text-4xl leading-none text-charcoal md:text-5xl">Versati nella lista.</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-charcoal/64">Lascia il tuo indirizzo. Riceverai una richiesta di conferma e poi soltanto le lettere di Kroinos.</p>

          <NewsletterForm />

          <ol className="mt-10 border-t border-charcoal/20">
            {promises.map(([number, title, text]) => (
              <li key={number} className="grid gap-3 border-b border-charcoal/20 py-5 sm:grid-cols-[36px_150px_1fr] sm:items-baseline">
                <span className="text-[.68rem] font-semibold text-wine">{number}</span>
                <h3 className="font-serif text-2xl text-charcoal">{title}</h3>
                <p className="text-sm leading-6 text-charcoal/60">{text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
