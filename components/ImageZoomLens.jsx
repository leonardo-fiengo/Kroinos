import Image from "next/image";

export default function ImageZoomLens({
  src,
  alt = "",
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover grayscale-[.72] transition duration-500 ease-out group-hover:scale-[1.025] group-hover:grayscale-0"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 border border-white/10 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}
