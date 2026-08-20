"use client";

import Image from "next/image";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function AdminLogin({ configured }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Accesso non riuscito.");
      window.location.reload();
    } catch (submitError) {
      setError(submitError.message);
      setLoading(false);
    }
  }

  return (
    <main className="fixed inset-0 z-[100] grid min-h-[100dvh] overflow-y-auto bg-[#ebe7de] text-[#171614] lg:grid-cols-[1.1fr_.9fr]">
      <section className="relative hidden overflow-hidden bg-[#0a0a0a] p-12 text-cream lg:flex lg:flex-col lg:justify-between">
        <div className="technical-grid absolute inset-0 opacity-70" />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-wine/20 blur-[100px]" />
        <Image src="/logo-kroinos.png" alt="Kroinos" width={810} height={190} priority className="relative h-9 w-auto self-start" />
        <div className="relative max-w-xl">
          <p className="text-[13px] font-semibold text-wine">Studio editoriale riservato</p>
          <h1 className="mt-7 font-serif text-7xl leading-[.86]">Le storie iniziano qui.</h1>
          <p className="mt-7 max-w-md text-base leading-8 text-cream/62">
            Scrivi, ordina e guarda l’articolo esattamente come apparirà prima di pubblicarlo.
          </p>
        </div>
        <p className="relative text-[13px] text-cream/62">Kroinos / Studio editoriale</p>
      </section>

      <section className="flex min-h-[100dvh] items-center justify-center px-5 py-16 sm:px-10">
        <div className="w-full max-w-md">
          <Image src="/logo-kroinos.png" alt="Kroinos" width={810} height={190} priority className="mb-14 h-8 w-auto brightness-0 lg:hidden" />
          <div className="mb-9 flex h-12 w-12 items-center justify-center border border-[#171614]/15 bg-white/50">
            <ShieldCheck size={21} aria-hidden="true" />
          </div>
          <p className="text-[13px] font-semibold text-wine">Accesso riservato</p>
          <h2 className="mt-4 font-serif text-5xl leading-none">Studio editoriale</h2>
          <p className="mt-5 text-[15px] leading-7 text-[#171614]/68">
            Inserisci la chiave editoriale. La chiave resta sul server e la sessione scade automaticamente.
          </p>

          {!configured ? (
            <div className="mt-8 border border-amber-700/25 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              Configura <code className="font-semibold">ADMIN_ACCESS_KEY</code> nel file <code className="font-semibold">.env.local</code> prima di accedere.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-9">
              <label htmlFor="admin-key" className="text-[14px] font-medium text-[#171614]/72">
                Chiave di accesso
              </label>
              <div className="mt-3 flex border border-[#171614]/20 bg-white focus-within:border-wine">
                <span className="grid w-12 place-items-center text-[#171614]/38"><KeyRound size={17} aria-hidden="true" /></span>
                <input
                  id="admin-key"
                  type="password"
                  value={key}
                  onChange={(event) => setKey(event.target.value)}
                  autoComplete="current-password"
                  autoFocus
                  required
                  className="min-w-0 flex-1 bg-transparent px-2 py-4 text-sm outline-none"
                  placeholder="••••••••••••"
                />
              </div>

              {error && <p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}

              <button
                type="submit"
                disabled={loading || !key}
                className="mt-6 flex min-h-14 w-full items-center justify-between bg-wine px-5 text-[14px] font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#7f0f20] active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {loading ? "Verifica…" : "Entra nello studio"}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>
          )}

          <p className="mt-10 border-t border-[#171614]/10 pt-5 text-[13px] leading-5 text-[#171614]/62">
            Questa pagina non è collegata dalla navigazione pubblica né inclusa nella sitemap.
          </p>
        </div>
      </section>
    </main>
  );
}
