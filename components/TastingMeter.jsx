const labels = {
  acidity: "Acidità",
  body: "Corpo",
  tannins: "Tannini",
  sweetness: "Dolcezza",
  finish: "Persistenza"
};

export default function TastingMeter({ notes }) {
  return (
    <div className="grid gap-5">
      {Object.entries(notes).map(([key, value]) => (
        <div key={key}>
          <div className="mb-2 flex justify-between text-[.7rem] uppercase text-cream/58">
            <span>{labels[key]}</span><span className="text-cream">{value}</span>
          </div>
          <div className="h-1 overflow-hidden bg-white/10">
            <div className="h-full bg-wine transition-[width] duration-700" style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
