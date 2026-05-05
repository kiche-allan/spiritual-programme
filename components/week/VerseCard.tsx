import type { Verse } from "@/lib/content/types";

interface Props { verse: Verse; accent: string; bg: string; }

export function VerseCard({ verse, accent, bg }: Props) {
  return (
    <div className="verse-card" style={{ borderLeftColor: accent, background: bg }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".14em",
        textTransform: "uppercase", color: accent, marginBottom: 6,
      }}>
        {verse.label}
      </div>
      <p style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "1.1rem", lineHeight: 1.7,
        color: "var(--t2)", fontStyle: "italic", marginBottom: 6,
      }}>
        &ldquo;{verse.text}&rdquo;
      </p>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: ".06em",
        color: "var(--tm)", textTransform: "uppercase",
      }}>
        {verse.ref}
      </div>
    </div>
  );
}
