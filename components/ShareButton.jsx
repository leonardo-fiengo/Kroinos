"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const data = { title, url: window.location.href };

    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2400);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        setCopied(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex min-h-11 items-center gap-3 border border-white/15 px-4 text-[.7rem] uppercase text-cream/68 hover:border-wine hover:text-wine"
    >
      {copied ? <Check size={15} aria-hidden="true" /> : <Share2 size={15} aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Link copiato" : "Condividi"}</span>
    </button>
  );
}
