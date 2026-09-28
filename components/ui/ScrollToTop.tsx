"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8"
      style={{
        width: 44, height: 44, borderRadius: "50%",
        border: "1.5px solid #E8C97A",
        background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", zIndex: 110,
        boxShadow: "var(--sh)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity .25s ease, transform .25s ease",
      }}
    >
      <ArrowUp size={18} color="#E8C97A" strokeWidth={2} />
    </button>
  );
}
