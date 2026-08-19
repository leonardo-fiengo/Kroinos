import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function RegionCard({ region, index = 0, articleCount = 0 }) {
  return (
    <article className="card-lift group technical-panel overflow-hidden">
      <Link href={`/regions/${region.id}`} className="block h-full">
        <div className="technical-grid relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-ink">
          <Image
            src={region.image}
            alt={region.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover grayscale-[.7] transition duration-500 group-hover:scale-[1.025] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
          <span className="absolute left-4 top-4 text-[.7rem] text-cream/65">TR / {String(index + 1).padStart(2, "0")}</span>
          <span className="absolute bottom-4 right-4 text-[.7rem] uppercase text-cream/72">{region.coordinates}</span>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-serif text-4xl text-cream">{region.name}</h3>
            <ArrowUpRight size={17} className="mt-2 text-wine" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm leading-7 text-cream/68">{region.introduction}</p>
          <p className="mt-6 border-t border-white/10 pt-4 text-[.7rem] uppercase text-cream/52">
            {articleCount} {articleCount === 1 ? "storia" : "storie"} / {region.climate}
          </p>
        </div>
      </Link>
    </article>
  );
}
