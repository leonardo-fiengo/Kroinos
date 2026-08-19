import Image from "next/image";
import Link from "next/link";

const editorialLinks = [
  ["Articoli", "/articles"],
  ["Cantina", "/canteen"],
  ["Territori", "/regions"]
];

const projectLinks = [
  ["Chi sono", "/about"],
  ["Lettere", "/newsletter"],
  ["Privacy", "/privacy"]
];

export default function Footer() {
  return (
    <footer className="technical-grid border-t border-white/10 bg-charcoal px-4 py-16 text-cream">
      <div className="editorial-shell grid gap-12 lg:grid-cols-[1.25fr_.55fr_.55fr]">
        <div>
          <Image src="/logo-kroinos.png" alt="Kroinos" width={810} height={190} className="h-8 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-7 text-cream/68">
            Un archivio editoriale indipendente di vino, tempo, territori e persone.
          </p>
          <Link href="/newsletter" className="mt-7 inline-flex border border-white/25 px-5 py-3 text-xs font-semibold uppercase text-cream hover:border-wine hover:text-wine">
            Ricevi le lettere
          </Link>
        </div>

        <nav className="grid content-start gap-3 text-xs uppercase text-cream/65" aria-label="Sezioni editoriali">
          <p className="mb-2 text-[.7rem] text-cream/52">Esplora</p>
          {editorialLinks.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-wine">{label}</Link>
          ))}
        </nav>

        <nav className="grid content-start gap-3 text-xs uppercase text-cream/65" aria-label="Informazioni">
          <p className="mb-2 text-[.7rem] text-cream/52">Kroinos</p>
          {projectLinks.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-wine">{label}</Link>
          ))}
          <a href="/feed.xml" className="hover:text-wine">Feed RSS</a>
        </nav>
      </div>

      <div className="editorial-shell mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[.7rem] uppercase text-cream/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kroinos</p>
        <p>Testi e ricerca di Carmen Buongiovanni</p>
      </div>
    </footer>
  );
}
