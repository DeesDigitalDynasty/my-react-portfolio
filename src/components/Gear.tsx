import { useState, useEffect, useRef } from "react";
import type { Theme } from "../types";

export function Gear({ T }: { T: Theme }) {
  const [ang, setAng] = useState(0);
  const spd = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const go = () => {
      if (spd.current > 0) {
        setAng(a => a + spd.current);
        spd.current *= 0.972;
        if (spd.current < 0.08) spd.current = 0;
      }
      raf.current = requestAnimationFrame(go);
    };
    raf.current = requestAnimationFrame(go);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const R = 44, th = 10, teeth = 12;
  const pts = Array.from({ length: teeth }, (_, k) => {
    const a = (k / teeth) * Math.PI * 2;
    const a1=a-.14, a2=a+.14, a3=a+(Math.PI*2/teeth)-.14, a4=a+(Math.PI*2/teeth)+.14;
    return `L${(R+th)*Math.cos(a1)},${(R+th)*Math.sin(a1)} L${(R+th)*Math.cos(a2)},${(R+th)*Math.sin(a2)} L${R*Math.cos(a3)},${R*Math.sin(a3)} L${R*Math.cos(a4)},${R*Math.sin(a4)}`;
  }).join(" ");

  return (
    <div onClick={() => { spd.current = 14; }} style={{ cursor:"pointer", textAlign:"center", userSelect:"none" }}>
      <svg width={116} height={116} viewBox="-58 -58 116 116">
        <g transform={`rotate(${ang})`}>
          <path d={`M${R+th},0 ${pts} Z`} fill={`${T.accent}18`} stroke={T.accent} strokeWidth="1.5" />
          <circle r={20} fill={T.surface} stroke={T.accent} strokeWidth="1.5" />
          <circle r={7} fill={`${T.accent}55`} />
          {[0,60,120,180,240,300].map(deg => (
            <line key={deg}
              x1={8*Math.cos(deg*Math.PI/180)} y1={8*Math.sin(deg*Math.PI/180)}
              x2={18*Math.cos(deg*Math.PI/180)} y2={18*Math.sin(deg*Math.PI/180)}
              stroke={T.accent} strokeWidth="1.5" />
          ))}
        </g>
      </svg>
      <p style={{ color:T.accent, fontSize:9, letterSpacing:3, marginTop:2, opacity:.65 }}>CLICK TO SPIN</p>
    </div>
  );
}