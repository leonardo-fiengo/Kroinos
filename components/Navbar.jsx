"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const primaryLinks = [
  ["Articoli", "/articles"],
  ["Cantina", "/canteen"],
  ["Territori", "/regions"]
];

const secondaryLinks = [
  ["Chi sono", "/about"],
  ["Lettere", "/newsletter"]
];

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ label, href, pathname, onClick, featured = false }) {
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "nav-link",
        active ? "text-wine" : "text-cream/68",
        featured ? "border border-white/20 px-4 py-2.5 hover:border-wine" : ""
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  if (pathname === "/article") return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/92 backdrop-blur-xl">
      <nav className="editorial-shell grid h-20 grid-cols-[1fr_auto_1fr] items-center" aria-label="Navigazione principale">
        <div className="hidden items-center gap-7 lg:flex">
          {primaryLinks.map(([label, href]) => (
            <NavLink key={href} label={label} href={href} pathname={pathname} />
          ))}
        </div>

        <Link href="/" className="col-start-2 flex items-center px-3" aria-label="Kroinos, pagina iniziale">
          <Image src="/logo-kroinos.png" alt="Kroinos" width={810} height={190} priority className="h-7 w-auto sm:h-8" />
        </Link>

        <div className="hidden items-center justify-end gap-7 lg:flex">
          {secondaryLinks.map(([label, href], index) => (
            <NavLink
              key={href}
              label={label}
              href={href}
              pathname={pathname}
              featured={index === secondaryLinks.length - 1}
            />
          ))}
        </div>

        <button
          type="button"
          className="col-start-3 ml-auto grid h-11 w-11 place-items-center border border-white/30 bg-white/5 text-cream lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="technical-grid border-b border-white/10 bg-charcoal px-4 pb-5 lg:hidden">
          <nav className="editorial-shell grid" aria-label="Navigazione mobile">
            {[...primaryLinks, ...secondaryLinks].map(([label, href]) => (
              <NavLink key={href} label={label} href={href} pathname={pathname} onClick={() => setOpen(false)} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
