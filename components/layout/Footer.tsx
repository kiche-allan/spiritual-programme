import Link from "next/link";
import { SignInLink } from "@/components/save/SignInLink";

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
      <p style={{ marginTop: 16, fontSize: 13, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <SignInLink className="underline" />
        <Link href="/privacy" className="underline" style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}>
          Privacy
        </Link>
      </p>
    </footer>
  );
}
