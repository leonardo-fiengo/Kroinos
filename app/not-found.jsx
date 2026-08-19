import Link from "next/link";

export default function NotFound() {
  return (
    <main className="technical-grid grid min-h-[80vh] place-items-center px-4 pb-24 pt-36 text-center">
      <div className="max-w-3xl">
        <p className="eyebrow"><span className="text-wine">404</span> / Fuori mappa</p>
        <h1 className="mt-6 font-serif text-7xl leading-none text-cream md:text-9xl">Questa bottiglia non è qui.</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-cream/68">
          Il collegamento potrebbe essere cambiato. L’archivio, invece, è ancora aperto.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/articles" className="inline-flex min-h-14 items-center justify-center border border-cream bg-cream px-6 text-xs font-semibold uppercase text-charcoal hover:bg-white">
            Vai agli articoli
          </Link>
          <Link href="/" className="inline-flex min-h-14 items-center justify-center border border-white/25 px-6 text-xs font-semibold uppercase text-cream hover:border-wine hover:text-wine">
            Torna all’inizio
          </Link>
        </div>
      </div>
    </main>
  );
}
