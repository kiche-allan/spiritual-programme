"use client";
import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setPct(docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0);
      setVisible(scrollY > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed", top: 60, left: 0, right: 0, zIndex: 50,
        height: 3, background: "transparent",
        opacity: visible ? 1 : 0,
        transition: "opacity .3s ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%", width: `${pct}%`,
          background: "#E8C97A",
          transition: "width .1s linear",
        }}
      />
    </div>
  );
}
