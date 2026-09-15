import { shadeColor } from "@/lib/utils";

interface Props {
  color: string;
  title?: string;
  eyebrow?: string;
  variant?: "card" | "hero";
}

export function BlogCover({ color, title, eyebrow, variant = "card" }: Props) {
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
      <span className="blog-cover-pattern" aria-hidden="true" />
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
