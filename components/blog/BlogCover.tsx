import { shadeColor } from "@/lib/utils";

interface Props {
  color: string;
  title?: string;
  eyebrow?: string;
  variant?: "card" | "hero";
  /** Optional real photo. The gradient stays underneath as the fallback. */
  image?: string | null;
}

export function BlogCover({ color, title, eyebrow, variant = "card", image }: Props) {
  const isHero = variant === "hero";
  const light = shadeColor(color, 16);
  const dark = shadeColor(color, -28);

  return (
    <div
      className={isHero ? "blog-cover blog-cover--hero" : "blog-cover blog-cover--card"}
      style={{
        background: `linear-gradient(135deg, ${light} 0%, ${color} 45%, ${dark} 100%)`,
      }}
    >
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="blog-cover-img"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <span className="blog-cover-scrim" aria-hidden="true" />
        </>
      ) : (
        <span className="blog-cover-pattern" aria-hidden="true" />
      )}
      {title && (
        <div className={isHero ? "blog-cover-text blog-cover-text-hero" : "blog-cover-text"}>
          {eyebrow && <span className="blog-cover-eyebrow">{eyebrow}</span>}
          <span className={isHero ? "blog-cover-title blog-cover-title-hero" : "blog-cover-title"}>
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
