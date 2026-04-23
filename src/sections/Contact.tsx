import type { Theme } from "../types/index";

export function Contact({ T, visible }: { T: Theme; visible: boolean }) {
  const rv: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: "opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1)",
  };
  const altBg = T.dark ? "#070c13" : "#f1f5f9";

  const inputStyle: React.CSSProperties = {
    width:"100%", background: T.dark?"#010409":"#f8fafc",
    border:`1px solid ${T.border}`, borderRadius:10,
    padding:"13px 16px", color:T.text, fontFamily:"inherit",
    fontSize:14, outline:"none", transition:"border-color .3s",
  };

  return (
    <section id="contact" style={{ padding:"80px 36px", background:altBg, borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:490, margin:"0 auto", textAlign:"center", ...rv }}>
        <div style={{ fontSize:9, letterSpacing:4, color:T.accent, textTransform:"uppercase", marginBottom:6 }}>LET'S TALK</div>
        <h2 style={{ fontFamily:"'Orbitron','Courier New',monospace", fontSize:"clamp(20px,4vw,34px)", fontWeight:700, marginBottom:12, color:T.text }}>Work Together</h2>
        <p style={{ color:T.muted, lineHeight:1.85, marginBottom:38, fontSize:14 }}>
          Always open to new projects, creative ideas, or just a conversation about tech.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:11, textAlign:"left" }}>
          <input style={inputStyle} type="text"  placeholder="Your name"    onFocus={e=>(e.currentTarget.style.borderColor=`${T.accent}66`)} onBlur={e=>(e.currentTarget.style.borderColor=T.border)} />
          <input style={inputStyle} type="email" placeholder="Your email"   onFocus={e=>(e.currentTarget.style.borderColor=`${T.accent}66`)} onBlur={e=>(e.currentTarget.style.borderColor=T.border)} />
          <textarea style={{...inputStyle,resize:"vertical"}} placeholder="Your message" rows={4} onFocus={e=>(e.currentTarget.style.borderColor=`${T.accent}66`)} onBlur={e=>(e.currentTarget.style.borderColor=T.border)} />
          <button style={{ padding:"11px 24px", borderRadius:8, fontWeight:700, fontSize:13, letterSpacing:2,
            textTransform:"uppercase", cursor:"pointer", transition:"all .3s",
            background:T.accentBg, color:T.accent, border:`1.5px solid ${T.accent}`, fontFamily:"inherit", marginTop:4 }}
            onMouseEnter={e=>{ Object.assign(e.currentTarget.style,{background:T.accent,color:T.dark?"#010409":"#fff",boxShadow:`0 0 22px ${T.accent}66`,transform:"translateY(-2px)"}); }}
            onMouseLeave={e=>{ Object.assign(e.currentTarget.style,{background:T.accentBg,color:T.accent,boxShadow:"none",transform:"none"}); }}>
            Send Message →
          </button>
        </div>
      </div>
    </section>
  );
}