"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Restore saved theme
    const saved = localStorage.getItem("spp_theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
    // Scroll listener
    const fn = () => setScrolled(window.scrollY > 20);
    fn(); // check on mount
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("spp_theme", next ? "dark" : "light");
  };

  // When not scrolled — transparent over hero (always dark bg)
  // so text must always be light
  // When scrolled — opaque bg, text uses theme variables
  const isOverHero = !scrolled;

  const navBg    = isOverHero ? "transparent" : "var(--bg)";
  const navBorder = isOverHero
    ? "1px solid transparent"
    : "1px solid var(--border)";

  // Text colours
  const logoSubColor  = "#E8C97A";                                    // gold always
  const logoMainColor = isOverHero ? "#FAF7F2" : "var(--t1)";        // cream over hero, ink when scrolled
  const linkColor     = isOverHero ? "rgba(250,247,242,0.85)" : "var(--tm)"; // light over hero, muted when scrolled
  const btnBorder     = isOverHero ? "1.5px solid rgba(255,255,255,0.2)" : "1.5px solid var(--border)";
  const btnBg         = isOverHero ? "rgba(255,255,255,0.08)" : "var(--bg2)";
  const iconStroke    = isOverHero ? "#FAF7F2" : "var(--tm)";

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: navBg,
      borderBottom: navBorder,
      backdropFilter: isOverHero ? "none" : "blur(12px)",
      WebkitBackdropFilter: isOverHero ? "none" : "blur(12px)",
      transition: "background .3s, border-color .3s",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: logoSubColor,
              marginBottom: 3,
              transition: "color .3s",
            }}>
              Hope &nbsp;·&nbsp; Faith &nbsp;·&nbsp; Purpose
            </span>
            <span style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.2rem",
              fontWeight: 400,
              color: logoMainColor,
              lineHeight: 1.2,
              transition: "color .3s",
            }}>
              Walking With God
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link
            href="/progress"
            style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase",
              color: linkColor, textDecoration: "none",
              transition: "color .3s",
            }}
          >
            Progress
          </Link>
          <Link
            href="/blog"
            style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase",
              color: linkColor, textDecoration: "none",
              transition: "color .3s",
            }}
          >
            Blog
          </Link>
          <Link
            href="/#subscribe"
            style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase",
              color: linkColor, textDecoration: "none",
              transition: "color .3s",
            }}
          >
            Subscribe
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            style={{
              width: 34, height: 34,
              borderRadius: "50%",
              border: btnBorder,
              background: btnBg,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .3s",
              flexShrink: 0,
            }}
          >
            {dark
              ? (
                <svg width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke={iconStroke}
                  strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1"  x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1"  y1="12" x2="3"  y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
                  <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke={iconStroke}
                  strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )
            }
          </button>
        </div>
      </div>
    </nav>
  );
}