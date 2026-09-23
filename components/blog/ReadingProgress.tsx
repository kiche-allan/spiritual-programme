"use client";

import { useEffect, useRef, useState } from "react";

// Wraps the (server-rendered) article body so only this small island
// needs to hydrate — the article content itself stays static HTML.
export function ReadingProgress({ children }: { children: React.ReactNode }) {
  const [readPct, setReadPct] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const pct = Math.min(100, Math.max(0,
        Math.round(((window.innerHeight - top) / height) * 100)
      ));
      setReadPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="reading-progress-bar">
        <div className="reading-progress-fill" style={{ width: `${readPct}%` }} />
      </div>
      <div ref={articleRef}>{children}</div>
    </>
  );
}
