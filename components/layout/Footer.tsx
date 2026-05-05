export function Footer() {
  return (
    <footer style={{
      background: "var(--bg2)", borderTop: "1px solid var(--border)",
      padding: "36px 24px", textAlign: "center",
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: 18, fontStyle: "italic",
        color: "var(--tm)", marginBottom: 6,
      }}>
        &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;
      </p>
      <p style={{
        fontSize: 11, fontWeight: 700,
        letterSpacing: ".1em", textTransform: "uppercase", color: "var(--tl)",
      }}>
        Psalm 119:105
      </p>
    </footer>
  );
}
