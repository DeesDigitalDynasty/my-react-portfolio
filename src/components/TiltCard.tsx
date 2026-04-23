import { useRef, useState } from "react";
import type { Theme, Project } from "../types";
import { adjustLight } from "../utils/adjustLight";

export function TiltCard({ p, T }: { p: Project; T: Theme }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const c = T.dark ? p.color : adjustLight(p.color);

  const onMv = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - .5) * -16, y: ((e.clientX - r.left) / r.width - .5) * 16 });
  };

  return (
    <div ref={ref} onMouseMove={onMv} onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x:0, y:0 }); }}
      style={{ background:T.surface, border:`1px solid ${hov ? c+"88" : T.border}`, borderRadius:14, padding:22,
        cursor:"pointer", position:"relative", overflow:"hidden",
        transform:`perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hov?10:0}px)`,
        transition: hov ? "border .2s,box-shadow .2s" : "all .55s cubic-bezier(.16,1,.3,1)",
        boxShadow: hov ? `0 18px 44px ${c}22` : "none" }}>
      <div style={{ fontSize:30, marginBottom:10 }}>{p.emoji}</div>
      <h3 style={{ color:T.text, fontSize:15, marginBottom:7, fontWeight:700 }}>{p.title}</h3>
      <p style={{ color:T.muted, fontSize:13, lineHeight:1.7, marginBottom:14 }}>{p.desc}</p>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {p.tags.map(t => (
          <span key={t} style={{ background:`${c}16`, color:c, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, border:`1px solid ${c}33` }}>{t}</span>
        ))}
      </div>
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${c},transparent)` }} />}
    </div>
  );
}