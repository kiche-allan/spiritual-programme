"use client";

interface Props {
  src: string;
  /** Darkness of the overlay that keeps text on top readable. */
  scrim?: "soft" | "strong";
}

/**
 * Absolutely-positioned photo + dark overlay for a card cover. The parent must
 * be `position: relative; overflow: hidden` and keeps its own gradient
 * background, which shows through if the photo fails to load.
 */
export function CardPhoto({ src, scrim = "soft" }: Props) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="card-photo-img"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span className={`card-photo-scrim card-photo-scrim--${scrim}`} aria-hidden="true" />
    </>
  );
}
