// components/blog/SubstackSubscribe.tsx

export function SubstackSubscribe() {
  return (
    <div style={{
      background: "#FF671908",
      border: "1px solid #FF671930",
      borderRadius: 4,
      padding: "28px 28px",
      textAlign: "center",
    }}>
      {/* Substack icon */}
      <div style={{ marginBottom: 14 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
            fill="#FF6719"/>
        </svg>
      </div>

      <h3 style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "1.5rem", fontWeight: 400,
        color: "var(--t1)", marginBottom: 8,
      }}>
        Read the full article on Substack
      </h3>

      <p style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: 15, fontStyle: "italic",
        color: "var(--tm)", lineHeight: 1.7, marginBottom: 20,
      }}>
        Longer reflections on faith, purpose, Scripture and the walking life —
        published alongside the weekly programme.
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <a
          href="https://allankiche.substack.com/p/created-on-purpose-god-never-makes"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "11px 22px", borderRadius: 4,
            background: "#FF6719", color: "#fff",
            fontFamily: "Lato,sans-serif",
            fontSize: 12, fontWeight: 700, letterSpacing: ".08em",
            textTransform: "uppercase", textDecoration: "none",
          }}
        >
          Read Latest Article
        </a>
        <a
          href="https://allankiche.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "11px 22px", borderRadius: 4,
            border: "1px solid #FF671950",
            background: "transparent", color: "#FF6719",
            fontFamily: "Lato,sans-serif",
            fontSize: 12, fontWeight: 700, letterSpacing: ".08em",
            textTransform: "uppercase", textDecoration: "none",
          }}
        >
          Subscribe on Substack
        </a>
      </div>
    </div>
  );
}
