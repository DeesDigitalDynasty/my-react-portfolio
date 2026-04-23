import type { Theme } from "../types";
import { SKILLS_LIST } from "../data/skillsData";

export function Skills({ T, vis }: { T: Theme; vis: Record<string, boolean> }) {
  const altBg = T.dark ? "#070c13" : "#f1f5f9";

  return (
    <section id="skills" style={{ padding:"80px 36px", background:altBg, borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ opacity:vis.sk?1:0, transform:vis.sk?"translateY(0)":"translateY(28px)", transition:"opacity .7s, transform .7s cubic-bezier(.16,1,.3,1)" }}>
          <div style={{ fontSize:9, letterSpacing:4, color:T.accent, textTransform:"uppercase", marginBottom:6 }}>WHAT I KNOW</div>
          <h2 style={{ fontFamily:"'Orbitron','Courier New',monospace", fontSize:"clamp(20px,4vw,34px)", fontWeight:700, marginBottom:38, color:T.text }}>Skills & Stack</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:13 }}>
          {SKILLS_LIST.map((s, i) => {
            const c = T.dark ? s.dc : s.lc;
            const key = `s${i}`;
            return (
              <div key={s.name} data-s={key}
                style={{ opacity:vis[key]?1:0, transform:vis[key]?"translateY(0)":"translateY(28px)",
                  transition:`opacity .7s ease ${i*60}ms, transform .7s cubic-bezier(.16,1,.3,1) ${i*60}ms`,
                  background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:17 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:9 }}>
                  <span style={{ color:T.text, fontWeight:600, fontSize:13 }}>{s.name}</span>
                  <span style={{ color:c, fontSize:12, fontWeight:700 }}>{s.level}%</span>
                </div>
                <div style={{ height:3, background:T.dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.07)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:3, background:`linear-gradient(90deg,${c}66,${c})`,
                    width:vis[key]?`${s.level}%`:"0%", transition:`width 1.3s cubic-bezier(.16,1,.3,1) ${i*80}ms` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop:34, display:"flex", justifyContent:"center", flexWrap:"wrap", gap:9 }}>
          {["Git","Docker","Supabase","Vercel","REST APIs","OpenRouter","pytest","Linux","Figma"].map(t => (
            <span key={t} style={{ background:T.surface, border:`1px solid ${T.border}`, color:T.muted,
              padding:"5px 14px", borderRadius:20, fontSize:11, cursor:"default", transition:"all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${T.accent}55`; e.currentTarget.style.color=T.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.muted; }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}