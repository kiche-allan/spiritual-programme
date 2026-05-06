"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const toggle = () => {
    const next = !dark; setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("spp_theme", next ? "dark" : "light");
  };
  const navBg = scrolled ? "var(--bg)" : "transparent";
  const navBorder = scrolled ? "1px solid var(--border)" : "1px solid transparent";
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:navBg, borderBottom:navBorder, backdropFilter:scrolled?"blur(12px)":"none", transition:"all .3s" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20, fontWeight:500, color:"var(--t1)", textDecoration:"none" }}>
          Walking With God
        </Link>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <a href="/progress" style={{ fontSize:12, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--tm)", textDecoration:"none" }}>Progress</a>
          <Link href="/#subscribe" style={{ fontSize:12, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--tm)", textDecoration:"none" }}>Subscribe</Link>
          <button onClick={toggle} aria-label="Toggle dark mode" style={{ width:36, height:36, borderRadius:"50%", border:"1.5px solid var(--border)", background:"var(--bg2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {dark
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--tm)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--tm)" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
        </div>
      </div>
    </nav>
  );
}
