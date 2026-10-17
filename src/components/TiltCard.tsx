import { useRef, useState } from "react";
import type { Theme, Project } from "../types";
import { adjustLight } from "../utils/adjustLight";
import { PrivacyModal } from "./PrivacyModal";

export function TiltCard({ p, T }: { p: Project; T: Theme }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const c = T.dark ? p.color : adjustLight(p.color);

  const onMv = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -16, y: ((e.clientX - r.left) / r.width - 0.5) * 16 });
  };

  const handleClick = () => {
    if (p.private) {
      setShowModal(true);
    } else if (p.link) {
      window.open(p.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {showModal && (
        <PrivacyModal T={T} onClose={() => setShowModal(false)} projectTitle={p.title} />
      )}
      <div
        ref={ref}
        onMouseMove={onMv}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
        onClick={handleClick}
        style={{
          background: T.surface,
          border: `1px solid ${hov ? c + "88" : T.border}`,
          borderRadius: 14,
          padding: 22,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hov ? 10 : 0}px)`,
          transition: hov ? "border .2s,box-shadow .2s" : "all .55s cubic-bezier(.16,1,.3,1)",
          boxShadow: hov ? `0 18px 44px ${c}22` : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div
            style={{
              width: 32,
              height: 3,
              borderRadius: 2,
              background: c,
              opacity: 0.8,
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontFamily: "'Orbitron','Courier New',monospace",
              color: T.muted,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            {p.private ? "CONFIDENTIAL" : "LIVE PROJECT"}
          </span>
        </div>
        <h3
          style={{
            color: T.text,
            fontSize: 17,
            marginBottom: 8,
            fontWeight: 700,
            letterSpacing: -0.2,
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            color: T.muted,
            fontSize: 13.5,
            lineHeight: 1.7,
            marginBottom: 18,
            minHeight: "3.4em",
          }}
        >
          {p.desc}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                background: `${c}16`,
                color: c,
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
                border: `1px solid ${c}33`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA label */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: p.private ? T.muted : c,
            opacity: hov ? 1 : 0.55,
            transition: "opacity .25s",
          }}
        >
          {p.private ? (
            <>🔒 Privacy Mode</>
          ) : (
            <>↗ View Live</>
          )}
        </div>

        {hov && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg,transparent,${c},transparent)`,
            }}
          />
        )}
      </div>
    </>
  );
}