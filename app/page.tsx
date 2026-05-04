"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { WEEKS_META, loadProgress, weekProgress } from "@/lib/weeks";

export default function HomePage() {
  const [prog, setProg] = useState<Record<number,{pct:number;done:number}>>({});
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle"|"ok"|"err">("idle");

  useEffect(() => {
    const store = loadProgress();
    const d: Record<number,{pct:number;done:number}> = {};
    WEEKS_META.forEach(w => {
      d[w.id] = { pct: weekProgress(store, w.id, w.totalDays), done: Object.values(store[String(w.id)]??{}).filter(Boolean).length };
    });
    setProg(d);
  }, []);

  const sorted = [...WEEKS_META].sort((a,b)=>new Date(b.publishedAt).getTime()-new Date(a.publishedAt).getTime());
  const latest = sorted[0];
  const rest = sorted.slice(1);
  const totalDone = Object.values(prog).reduce((s,v)=>s+v.done,0);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setSubStatus("err"); return; }
    await new Promise(r=>setTimeout(r,600));
    setSubStatus("ok"); setEmail("");
  };

  const T = (s: string, extra?: React.CSSProperties) => ({ style: { fontFamily:"'Cormorant Garamond',Georgia,serif", ...extra }, children: s });

  return (
    <>
      <Navbar />
      {/* HERO */}
      <header style={{ background:"var(--hero)", color:"var(--hero-t)", padding:"110px 24px 72px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:.03, backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"50px 50px", pointerEvents:"none" }} />
        <div style={{ maxWidth:660, margin:"0 auto", position:"relative" }}>
          <div className="fade-up d1" style={{ fontSize:11, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"var(--hero-a)", marginBottom:14 }}>Weekly Devotional Programme</div>
          <h1 className="fade-up d2" style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2.6rem,6vw,4rem)", fontWeight:300, lineHeight:1.15, marginBottom:18 }}>
            Walking With God,<br /><em style={{ fontStyle:"italic", color:"#E8C97A" }}>Week by Week</em>
          </h1>
          <p className="fade-up d3" style={{ fontSize:16, color:"var(--hero-a)", lineHeight:1.75, maxWidth:500, margin:"0 auto 28px", fontWeight:300 }}>
            A new 7-day spiritual programme every week — scripture, deep revelation, morning prayer, and daily practices.
          </p>
          {/* Stats */}
          <div className="fade-up d4" style={{ display:"inline-flex", borderRadius:12, border:"1px solid rgba(255,255,255,.12)", overflow:"hidden", marginBottom:28 }}>
            {[[WEEKS_META.length,"Weeks Published"],[totalDone,"Days You've Read"],[sorted.filter(w=>(prog[w.id]?.done??0)>0).length,"Weeks Started"]].map(([v,l],i)=>(
              <div key={i} style={{ padding:"12px 22px", borderRight:i<2?"1px solid rgba(255,255,255,.12)":"none", textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:26, color:"#E8C97A" }}>{v}</div>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--hero-a)", opacity:.7, marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="fade-up d5" style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
            <Link href={`/week/${latest.id}`} style={{ padding:"13px 28px", borderRadius:8, background:"#E8C97A", color:"#1A1610", fontSize:13, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", textDecoration:"none", fontFamily:"Lato,sans-serif" }}>This Week →</Link>
            <a href="#weeks" style={{ padding:"13px 28px", borderRadius:8, border:"1.5px solid rgba(255,255,255,.2)", color:"rgba(255,255,255,.8)", fontSize:13, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", textDecoration:"none", fontFamily:"Lato,sans-serif" }}>All Weeks</a>
          </div>
        </div>
      </header>

      {/* WEEKS */}
      <section id="weeks" style={{ maxWidth:1200, margin:"0 auto", padding:"56px 24px 20px" }}>
        <Eyebrow text="Featured" />
        <SectionTitle text="This Week's Programme" />
        <div style={{ marginBottom:48 }}>
          <WeekCard week={latest} prog={prog[latest.id]} isLatest />
        </div>
        {rest.length > 0 && <>
          <Eyebrow text="Archive" />
          <SectionTitle text="Previous Weeks" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20, marginBottom:56 }}>
            {rest.map(w => <WeekCard key={w.id} week={w} prog={prog[w.id]} />)}
          </div>
        </>}
      </section>

      {/* SUBSCRIBE */}
      <section id="subscribe" style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"60px 24px", textAlign:"center" }}>
        <div style={{ maxWidth:500, margin:"0 auto" }}>
          <Eyebrow text="Never miss a week" />
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:300, color:"var(--t1)", lineHeight:1.2, marginBottom:12 }}>A new week, every Monday</h2>
          <p style={{ fontSize:15, color:"var(--tm)", lineHeight:1.7, marginBottom:26 }}>Subscribe and receive the programme in your inbox every Monday morning.</p>
          {subStatus === "ok"
            ? <div style={{ background:"#EBF5EF", border:"1px solid #2E6B50", borderRadius:10, padding:"16px 20px", color:"#1A3D2E", fontSize:14 }}>✓ You're subscribed! New weeks land in your inbox every Monday.</div>
            : <form onSubmit={subscribe} style={{ display:"flex", gap:10, maxWidth:400, margin:"0 auto" }}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                  style={{ flex:1, padding:"12px 16px", borderRadius:8, border:`1.5px solid ${subStatus==="err"?"#7A1A1A":"var(--border)"}`, background:"var(--bg)", color:"var(--t1)", fontSize:14, outline:"none", fontFamily:"Lato,sans-serif" }} />
                <button type="submit" style={{ padding:"12px 22px", borderRadius:8, border:"none", background:"#5A2D82", color:"#fff", fontSize:13, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", cursor:"pointer", fontFamily:"Lato,sans-serif", whiteSpace:"nowrap" }}>Subscribe</button>
              </form>
          }
          <p style={{ fontSize:12, color:"var(--tl)", marginTop:12 }}>No spam. Unsubscribe any time.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)", padding:"36px 24px", textAlign:"center" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:18, fontStyle:"italic", color:"var(--tm)", marginBottom:6 }}>&ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;</p>
        <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--tl)" }}>Psalm 119:105</p>
      </footer>
    </>
  );
}

function Eyebrow({ text }: { text: string }) {
  return <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"var(--tl)", marginBottom:6 }}>{text}</div>;
}
function SectionTitle({ text }: { text: string }) {
  return <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:400, color:"var(--t1)", marginBottom:20 }}>{text}</h2>;
}

function WeekCard({ week, prog, isLatest }: { week: (typeof WEEKS_META)[0]; prog?: {pct:number;done:number}; isLatest?: boolean }) {
  const date = new Date(week.publishedAt).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  return (
    <Link href={`/week/${week.id}`} className="week-card">
      <div style={{ height:4, background:week.accentColor }} />
      <div style={{ padding:"18px 22px 20px", position:"relative" }}>
        {isLatest && <div style={{ position:"absolute", top:18, right:18, background:week.accentColor, color:"#fff", fontSize:9, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", padding:"3px 10px", borderRadius:20 }}>This Week</div>}
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:week.accentColor, marginBottom:6 }}>{week.subtitle}</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1.2rem,2.5vw,1.55rem)", fontWeight:400, lineHeight:1.25, color:"var(--t1)", marginBottom:8 }}>{week.title}</h2>
        <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:13, fontStyle:"italic", color:"var(--tm)", lineHeight:1.6, marginBottom:12 }}>&ldquo;{week.heroVerse}&rdquo; — {week.heroRef}</p>
        <p style={{ fontSize:13, lineHeight:1.65, color:"var(--tm)", marginBottom:14 }}>{week.description}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
          {week.themes.map(t=>(
            <span key={t.label} style={{ fontSize:10, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", padding:"3px 10px", borderRadius:20, background:`${t.color}18`, color:t.color, border:`1px solid ${t.color}40` }}>{t.label}</span>
          ))}
        </div>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:11, color:"var(--tl)", fontWeight:700, letterSpacing:".06em" }}>
              {!prog||prog.done===0 ? "Not started" : prog.done===week.totalDays ? "✓ Complete" : `${prog.done} / ${week.totalDays} days`}
            </span>
            <span style={{ fontSize:11, color:"var(--tl)" }}>{date}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width:`${prog?.pct??0}%` }} /></div>
        </div>
      </div>
    </Link>
  );
}
