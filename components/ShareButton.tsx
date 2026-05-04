"use client";
import { useState } from "react";
interface Props { title: string; text: string; url?: string; }
export default function ShareButton({ title, text, url }: Props) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = `${title}\n\n${text.slice(0,120)}...\n\n${shareUrl}`;
  const fb = () => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`, "_blank", "width=600,height=400"); setOpen(false); };
  const wa = () => { window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank"); setOpen(false); };
  const copy = async () => { try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(()=>setCopied(false),2000); } catch {} setOpen(false); };
  const items: [string, string, ()=>void][] = [["📘","Facebook",fb],["💬","WhatsApp",wa],["🔗","Copy link",copy]];
  return (
    <div style={{ position:"relative", display:"inline-block" }}>
      <button onClick={()=>setOpen(!open)} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:"1.5px solid var(--border)", background:"transparent", color:"var(--tm)", fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", cursor:"pointer", fontFamily:"Lato,sans-serif" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        {copied ? "Copied!" : "Share"}
      </button>
      {open && (
        <>
          <div style={{ position:"fixed", inset:0, zIndex:99 }} onClick={()=>setOpen(false)} />
          <div style={{ position:"absolute", bottom:"calc(100% + 8px)", right:0, background:"var(--bg)", border:"1px solid var(--border)", borderRadius:12, boxShadow:"0 8px 32px rgba(0,0,0,.15)", padding:8, zIndex:100, minWidth:170 }}>
            {items.map(([icon,label,fn])=>(
              <button key={label} onClick={fn} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 12px", borderRadius:8, border:"none", background:"transparent", color:"var(--t2)", fontSize:13, cursor:"pointer", fontFamily:"Lato,sans-serif", textAlign:"left" }}
                onMouseEnter={e=>(e.currentTarget.style.background="var(--bg2)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                <span>{icon}</span><span style={{fontWeight:500}}>{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
