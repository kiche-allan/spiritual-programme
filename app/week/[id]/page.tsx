"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ShareButton from "@/components/ShareButton";
import { WEEKS_META, loadProgress, saveProgress, toggleDay, weekProgress } from "@/lib/weeks";
import { getWeekContent } from "@/lib/content";
import type { DayContent } from "@/lib/content";

export default function WeekPage() {
  const { id } = useParams();
  const weekId = Number(id);
  const meta = WEEKS_META.find(w => w.id === weekId);
  const days: DayContent[] = getWeekContent(weekId) ?? [];

  const [cur, setCur] = useState(0);
  const [prog, setProg] = useState<Record<string,boolean>>({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    const store = loadProgress();
    setProg(store[String(weekId)] ?? {});
    window.scrollTo(0,0);
  }, [weekId]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(()=>setToast(""),2500); };

  const toggle = useCallback((dayNum: number) => {
    const store = loadProgress();
    const next = toggleDay(store, weekId, dayNum);
    saveProgress(next);
    setProg(next[String(weekId)] ?? {});
    showToast(next[String(weekId)]?.[String(dayNum)] ? "✓ Day marked complete" : "Day unmarked");
  }, [weekId]);

  const pct = weekProgress({ [String(weekId)]: prog }, weekId, days.length);
  const doneCount = Object.values(prog).filter(Boolean).length;
  const prevW = WEEKS_META.find(w=>w.id===weekId-1);
  const nextW = WEEKS_META.find(w=>w.id===weekId+1);

  if (!meta) return (
    <div style={{ padding:"120px 24px", textAlign:"center", color:"var(--tm)" }}>
      Week not found. <a href="/" style={{ color:"var(--t1)" }}>← Home</a>
    </div>
  );

  if (days.length === 0) return (
    <>
      <Navbar />
      <div style={{ padding:"120px 24px", textAlign:"center", color:"var(--tm)" }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"2rem", color:"var(--t1)", marginBottom:12 }}>{meta.title}</h2>
        <p>Content for this week is coming soon.</p>
        <a href="/" style={{ display:"inline-block", marginTop:20, color:"var(--t1)", fontWeight:700 }}>← All Weeks</a>
      </div>
    </>
  );

  const day = days[cur];
  const isDone = prog[String(day.num)] ?? false;

  return (
    <>
      <Navbar />

      {/* HERO */}
      <header style={{ background:"var(--hero)", color:"var(--hero-t)", padding:"90px 24px 52px", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <a href="/" style={{ display:"inline-block", fontSize:12, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--hero-a)", textDecoration:"none", marginBottom:18, opacity:.7 }}>← All Weeks</a>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"var(--hero-a)", marginBottom:8 }}>{meta.subtitle}</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,5vw,3.2rem)", fontWeight:300, lineHeight:1.18, marginBottom:10 }}>{meta.title}</h1>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1rem", fontStyle:"italic", color:"var(--hero-a)", opacity:.8, marginBottom:22 }}>&ldquo;{meta.heroVerse}&rdquo; — {meta.heroRef}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:22 }}>
            {meta.themes.map(t=>(
              <span key={t.label} style={{ fontSize:10, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", padding:"4px 12px", borderRadius:20, background:`${t.color}25`, color:"#fff", border:`1px solid ${t.color}50` }}>{t.label} · {t.days}</span>
            ))}
          </div>
          <div style={{ maxWidth:380 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:11, color:"var(--hero-a)", fontWeight:700, letterSpacing:".06em", opacity:.8 }}>
                {doneCount===0?"Not started":doneCount===days.length?"✓ Complete!":`${doneCount} of ${days.length} days`}
              </span>
              <span style={{ fontSize:11, color:"var(--hero-a)", opacity:.6 }}>{pct}%</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width:`${pct}%` }} /></div>
          </div>
        </div>
      </header>

      {/* LAYOUT */}
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", minHeight:"70vh" }}>

        {/* Sidebar */}
        <aside style={{ width:220, flexShrink:0, padding:"2rem 0 2rem 1.5rem", position:"sticky", top:60, height:"fit-content" }}
          className="hide-mobile">
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--tl)", marginBottom:14, paddingLeft:4 }}>Days</div>
          {days.map((d, i) => {
            const done = prog[String(d.num)] ?? false;
            const active = i === cur;
            return (
              <button key={d.num} onClick={()=>{setCur(i);window.scrollTo({top:260,behavior:"smooth"});}}
                style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 10px", border:"none", background:active?"var(--bg2)":"transparent", cursor:"pointer", borderRadius:8, textAlign:"left", marginBottom:2, transition:"background .15s" }}>
                <div onClick={e=>{e.stopPropagation();toggle(d.num);}}
                  style={{ width:24, height:24, borderRadius:"50%", border:done?"none":`1.5px solid ${active?d.accent:"var(--border)"}`, background:done?d.accent:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer", transition:"all .2s" }}>
                  {done && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:active?700:400, color:active?"var(--t1)":"var(--t2)" }}>{d.name}</div>
                  <div style={{ fontSize:11, color:"var(--tl)" }}>{d.title.split(" ").slice(0,4).join(" ")}{d.title.split(" ").length>4?"…":""}</div>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <main style={{ flex:1, padding:"2.5rem 2rem 4rem", borderLeft:"1px solid var(--border)", minWidth:0 }}>

          {/* Day header */}
          <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:"2rem", paddingBottom:"1.5rem", borderBottom:"1px solid var(--border)", flexWrap:"wrap" }}>
            <div style={{ width:60, height:60, borderRadius:14, flexShrink:0, background:day.bg, border:`1.5px solid ${day.accent}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", lineHeight:1.1 }}>
              <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:day.accent }}>{day.abbr}</span>
              <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:28, fontWeight:600, color:day.accent }}>{day.num}</span>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:400, color:"var(--t1)", lineHeight:1.2, marginBottom:4 }}>{day.title}</h2>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:day.accent }}>{day.theme}</div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
              <ShareButton title={`Day ${day.num}: ${day.title}`} text={day.revelation[0]} />
              <button onClick={()=>toggle(day.num)} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:`1.5px solid ${isDone?day.accent:"var(--border)"}`, background:isDone?day.accent:"transparent", color:isDone?"#fff":"var(--tm)", fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", cursor:"pointer", fontFamily:"Lato,sans-serif", transition:"all .2s" }}>
                {isDone ? "✓ Done" : "Mark Done"}
              </button>
            </div>
          </div>

          {/* Scriptures */}
          <Section label="Three Scriptures" color={day.accent}>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {day.verses.map(v=>(
                <div key={v.label} className="verse-card" style={{ borderLeftColor:day.accent }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:day.accent, marginBottom:6 }}>{v.label}</div>
                  <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.1rem", lineHeight:1.7, color:"var(--t2)", fontStyle:"italic", marginBottom:6 }}>&ldquo;{v.text}&rdquo;</p>
                  <div style={{ fontSize:11, fontWeight:700, letterSpacing:".06em", color:"var(--tm)", textTransform:"uppercase" }}>{v.ref}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Revelation */}
          <Section label="Revelation" color={day.accent}>
            <div style={{ fontSize:15, lineHeight:1.85, color:"var(--t2)" }}>
              {day.revelation.map((p,i)=><p key={i} style={{ marginBottom:".9rem" }}>{p}</p>)}
            </div>
          </Section>

          {/* Prayer */}
          <Section label="Morning Prayer" color={day.accent}>
            <div style={{ background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:12, padding:"1.5rem" }}>
              {day.prayers.map((p,i)=><p key={i} style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.1rem", lineHeight:1.9, color:"var(--t2)", fontStyle:"italic", marginBottom:".85rem" }}>{p}</p>)}
              <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1rem", fontStyle:"normal", fontWeight:600, color:"var(--t1)" }}>{day.amen}</p>
            </div>
          </Section>

          {/* Practices */}
          <Section label="Daily Practices" color={day.accent}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:10 }}>
              {day.practices.map((p,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:10, padding:"12px 14px" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:day.accent, marginTop:5, flexShrink:0 }} />
                  <span style={{ fontSize:13, lineHeight:1.55, color:"var(--t2)" }}>{p}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Day nav */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"2.5rem", paddingTop:"1.5rem", borderTop:"1px solid var(--border)" }}>
            <NavBtn label="← Previous" disabled={cur===0} onClick={()=>{setCur(c=>c-1);window.scrollTo({top:260,behavior:"smooth"});}} />
            <span style={{ fontSize:12, color:"var(--tl)", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" }}>Day {cur+1} of {days.length}</span>
            <NavBtn label="Next →" disabled={cur===days.length-1} onClick={()=>{setCur(c=>c+1);window.scrollTo({top:260,behavior:"smooth"});}} />
          </div>
        </main>
      </div>

      {/* WEEK NAV */}
      <div style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)", padding:"28px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          {prevW
            ? <a href={`/week/${prevW.id}`} style={{ textDecoration:"none" }}><div style={{ fontSize:10, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"var(--tl)", marginBottom:4 }}>← Previous Week</div><div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.1rem", color:"var(--t1)" }}>{prevW.title}</div></a>
            : <div />}
          <a href="/" style={{ fontSize:12, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--tm)", textDecoration:"none" }}>All Weeks</a>
          {nextW
            ? <a href={`/week/${nextW.id}`} style={{ textDecoration:"none", textAlign:"right" }}><div style={{ fontSize:10, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"var(--tl)", marginBottom:4 }}>Next Week →</div><div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.1rem", color:"var(--t1)" }}>{nextW.title}</div></a>
            : <div />}
        </div>
      </div>

      <footer style={{ background:"var(--hero)", color:"var(--hero-a)", textAlign:"center", padding:"28px 24px", fontSize:13 }}>
        <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.05rem", fontStyle:"italic", marginBottom:6 }}>&ldquo;{meta.heroVerse}&rdquo;</p>
        <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", opacity:.6 }}>{meta.heroRef}</p>
      </footer>

      {toast && <div className="toast">{toast}</div>}

      <style>{`
        @media(max-width:720px){.hide-mobile{display:none!important}main{border-left:none!important;padding:1.5rem 1rem 3rem!important}}
      `}</style>
    </>
  );
}

function Section({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:"1.75rem" }}>
      <div className="section-divider"><span style={{ color }}>{label}</span></div>
      {children}
    </div>
  );
}
function NavBtn({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: ()=>void }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ padding:"10px 20px", borderRadius:8, border:"1.5px solid var(--border)", background:"transparent", color:"var(--tm)", fontSize:13, fontWeight:700, letterSpacing:".05em", cursor:disabled?"default":"pointer", opacity:disabled?.3:1, fontFamily:"Lato,sans-serif", transition:"all .2s" }}>
      {label}
    </button>
  );
}
