import { Search, X } from "lucide-react";

export default function FilterBar({ filters, values, query, onQueryChange, onChange, onReset, resultCount }) {
  const active = query || Object.values(values).some((value) => value && value !== "Tutti");

  return (
    <div className="technical-panel p-px">
      <div className="grid gap-px bg-white/10 lg:grid-cols-[1.2fr_repeat(3,.8fr)]">
        <label className="grid gap-3 bg-ink p-4 text-[.7rem] font-semibold uppercase text-cream/58">
          Cerca
          <span className="relative">
            <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cream/58" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              type="search"
              placeholder="Titolo, tema, luogo…"
              className="min-h-12 w-full border border-white/15 bg-charcoal py-3 pl-10 pr-3 text-sm font-normal normal-case text-cream outline-none transition placeholder:text-cream/50 focus:border-wine"
            />
          </span>
        </label>

        {filters.map((filter) => (
          <label key={filter.key} className="grid gap-3 bg-ink p-4 text-[.7rem] font-semibold uppercase text-cream/58">
            {filter.label}
            <select
              value={values[filter.key] || "Tutti"}
              onChange={(event) => onChange(filter.key, event.target.value)}
              className="min-h-12 border border-white/15 bg-charcoal px-3 py-3 text-sm font-normal normal-case text-cream outline-none transition focus:border-wine"
            >
              <option>Tutti</option>
              {filter.options.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </div>

      <div className="flex min-h-12 items-center justify-between gap-4 bg-ink px-4 py-2 text-[.7rem] uppercase text-cream/55">
        <p>{resultCount} {resultCount === 1 ? "storia trovata" : "storie trovate"}</p>
        {active && (
          <button type="button" onClick={onReset} className="inline-flex min-h-10 items-center gap-2 text-cream/72 hover:text-wine">
            Azzera <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
