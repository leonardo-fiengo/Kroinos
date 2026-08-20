import { Search, X } from "lucide-react";

export default function FilterBar({ filters, values, query, onQueryChange, onChange, onReset, resultCount }) {
  const active = query || Object.values(values).some((value) => value && value !== "Tutti");

  return (
    <div className="border-y border-charcoal/20">
      <div className="grid md:grid-cols-2 lg:grid-cols-[1.25fr_repeat(3,.75fr)]">
        <label className="grid gap-3 border-b border-charcoal/15 py-5 md:border-r md:px-5 lg:border-b-0 lg:pl-0">
          <span className="text-[.68rem] font-semibold uppercase tracking-[.05em] text-charcoal/52">Cerca</span>
          <span className="relative">
            <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/45" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              type="search"
              placeholder="Titolo, tema, luogo…"
              className="min-h-12 w-full border border-charcoal/20 bg-transparent py-3 pl-10 pr-3 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/42 focus:border-wine"
            />
          </span>
        </label>

        {filters.map((filter, index) => (
          <label key={filter.key} className={`grid gap-3 border-charcoal/15 py-5 md:px-5 ${index < filters.length - 1 ? "md:border-r" : ""} ${index < 1 ? "border-b lg:border-b-0" : ""}`}>
            <span className="text-[.68rem] font-semibold uppercase tracking-[.05em] text-charcoal/52">{filter.label}</span>
            <select
              value={values[filter.key] || "Tutti"}
              onChange={(event) => onChange(filter.key, event.target.value)}
              className="min-h-12 border border-charcoal/20 bg-transparent px-3 py-3 text-sm text-charcoal outline-none transition-colors focus:border-wine"
            >
              <option>Tutti</option>
              {filter.options.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </div>

      <div className="flex min-h-14 items-center justify-between gap-4 border-t border-charcoal/20 py-3 text-[.68rem] font-semibold uppercase tracking-[.04em] text-charcoal/52">
        <p>{resultCount} {resultCount === 1 ? "storia trovata" : "storie trovate"}</p>
        {active && (
          <button type="button" onClick={onReset} className="archive-filter-reset inline-flex min-h-10 items-center gap-2 text-charcoal/70">
            Azzera <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
