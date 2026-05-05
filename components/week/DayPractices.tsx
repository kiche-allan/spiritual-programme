interface Props { practices: string[]; accent: string; }

export function DayPractices({ practices, accent }: Props) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
      gap: 10,
    }}>
      {practices.map((p, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "flex-start", gap: 10,
          background: "var(--bg2)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "12px 14px",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: accent, marginTop: 5, flexShrink: 0,
          }} />
          <span style={{ fontSize: 13, lineHeight: 1.55, color: "var(--t2)" }}>
            {p}
          </span>
        </div>
      ))}
    </div>
  );
}
