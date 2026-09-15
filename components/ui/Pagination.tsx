import type { CSSProperties } from "react";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const numberStyle = (active: boolean): CSSProperties => ({
    minWidth: 34, height: 34, padding: "0 6px",
    borderRadius: 8,
    border: `1px solid ${active ? "#BF8B3A" : "var(--border)"}`,
    background: active ? "#BF8B3A" : "var(--bg)",
    color: active ? "#1A1610" : "var(--t2)",
    fontFamily: "Lato,sans-serif",
    fontSize: 13, fontWeight: 700,
    cursor: active ? "default" : "pointer",
    transition: "border-color .2s, background .2s",
  });

  const navStyle: CSSProperties = {
    minWidth: 34, height: 34, padding: "0 12px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--t2)",
    fontFamily: "Lato,sans-serif",
    fontSize: 12, fontWeight: 700,
    textTransform: "uppercase", letterSpacing: ".04em",
    cursor: "pointer",
  };

  return (
    <nav
      aria-label="Weeks pagination"
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 8, flexWrap: "wrap", marginTop: 8, marginBottom: 56,
      }}
    >
      <button
        type="button"
        style={{ ...navStyle, opacity: page === 1 ? .4 : 1, cursor: page === 1 ? "default" : "pointer" }}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ← Prev
      </button>

      {pages.map(p => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          style={numberStyle(p === page)}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        style={{ ...navStyle, opacity: page === totalPages ? .4 : 1, cursor: page === totalPages ? "default" : "pointer" }}
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next →
      </button>
    </nav>
  );
}
