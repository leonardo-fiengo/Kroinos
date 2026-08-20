import Image from "next/image";

export default function EditorialImage({
  src,
  alt = "",
  sizes = "100vw",
  priority = false,
  className = ""
}) {
  const remote = /^https?:\/\//i.test(src || "");

  if (remote) {
    // Remote editorial images are intentionally rendered without Next's host allowlist.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
