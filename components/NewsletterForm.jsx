"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          consent: formData.get("consent") === "on",
          company: formData.get("company")
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Iscrizione non riuscita.");

      setStatus("success");
      setMessage("Iscrizione completata. Controlla la tua casella di posta.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={submit} className="mt-9 text-left">
      <label htmlFor="newsletter-email" className="block text-[.7rem] font-semibold uppercase tracking-[.05em] text-charcoal/58">
        Il tuo indirizzo email
      </label>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          id="newsletter-email"
          name="email"
          required
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="tu@cantina.it"
          disabled={status === "loading"}
          className="min-h-14 w-full border border-charcoal/25 bg-transparent px-5 text-charcoal outline-none transition-colors placeholder:text-charcoal/42 focus:border-wine disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="newsletter-submit inline-flex min-h-14 items-center justify-center gap-5 border border-charcoal bg-charcoal px-6 text-xs font-semibold uppercase text-cream disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "Invio…" : "Iscriviti"}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="newsletter-company">Azienda</label>
        <input id="newsletter-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-charcoal/64">
        <input name="consent" required type="checkbox" className="mt-1 h-4 w-4 accent-wine" />
        <span>
          Accetto di ricevere le lettere di Kroinos e ho letto l’{" "}
          <Link href="/privacy" className="text-charcoal underline decoration-wine underline-offset-4">informativa privacy</Link>.
        </span>
      </label>

      <div aria-live="polite" className="mt-4 min-h-7">
        {message && (
          <p className={`flex items-center gap-2 text-sm ${status === "success" ? "text-charcoal" : "text-wine"}`}>
            {status === "success" && <Check size={16} aria-hidden="true" />}
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
