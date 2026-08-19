import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: "Lettere",
  description: "La newsletter mensile di Kroinos: un territorio, tre bottiglie e una storia da conservare.",
  alternates: { canonical: "/newsletter" }
};

export default function NewsletterPage() {
  return (
    <AnimatedPageWrapper className="technical-grid grid min-h-screen place-items-center px-4 py-36 text-center">
      <section className="w-full max-w-5xl border border-white/15 bg-ink p-8 text-cream shadow-editorial md:p-16">
        <p className="eyebrow"><span className="text-wine">NL</span> / Lettere</p>
        <h1 className="mx-auto mt-6 max-w-4xl font-serif text-6xl leading-none md:text-8xl">Versati nel prossimo numero.</h1>
        <p className="mx-auto mt-7 max-w-2xl leading-8 text-cream/68">
          Una lettera mensile con un territorio, tre bottiglie, un’idea di abbinamento e un dettaglio felicemente inutile.
          Niente rumore, niente invii quotidiani.
        </p>
        <NewsletterForm />
        <div className="mx-auto mt-8 grid max-w-2xl gap-px bg-white/10 text-left text-xs uppercase text-cream/58 sm:grid-cols-3">
          <p className="bg-charcoal p-4"><span className="text-wine">01</span> / Mensile</p>
          <p className="bg-charcoal p-4"><span className="text-wine">02</span> / Curata</p>
          <p className="bg-charcoal p-4"><span className="text-wine">03</span> / Revocabile</p>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
