import type { Theme } from "../types";
import { OrbitalHero } from "../components/OrbitalHero";
import { useTyping } from "../hooks/useTyping";

const ROLES = ["Full-Stack Developer", "React Enthusiast", "Python Programmer", "Web Builder", "CS Student"];

export function Hero({ T }: { T: Theme }) {
  const typed = useTyping(ROLES);
  const amber = T.dark ? "#f59e0b" : "#b45309";

  const btnPrimary: React.CSSProperties = {
    padding: "12px 28px",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all .3s",
    background: T.accentBg,
    color: T.accent,
    border: `1.5px solid ${T.accent}`,
    fontFamily: "inherit",
  };
  const btnSecondary: React.CSSProperties = {
    ...btnPrimary,
    background: "transparent",
    color: T.muted,
    border: `1.5px solid ${T.border}`,
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(80px,10vw,120px) clamp(16px,5vw,36px) 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${T.border}55 1px,transparent 1px),linear-gradient(90deg,${T.border}55 1px,transparent 1px)`,
          backgroundSize: "44px 44px",
          pointerEvents: "none",
        }}
      />
      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "4%",
          width: "clamp(160px,25vw,300px)",
          height: "clamp(160px,25vw,300px)",
          borderRadius: "50%",
          background: `${T.accent}07`,
          filter: "blur(72px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "4%",
          width: "clamp(130px,22vw,260px)",
          height: "clamp(130px,22vw,260px)",
          borderRadius: "50%",
          background: `${T.dark ? "#a78bfa" : "#5b21b6"}07`,
          filter: "blur(72px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 860,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 9,
            letterSpacing: 4,
            color: T.accent,
            textTransform: "uppercase",
            marginBottom: 10,
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          PORTFOLIO 2025 · IBADAN, NIGERIA
        </div>

        {/* Full name */}
        <div
          style={{
            fontSize: "clamp(11px,1.8vw,14px)",
            color: T.muted,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          Oludayo Oluboyede
        </div>

        <h1
          style={{
            fontFamily: "'Orbitron','Courier New',monospace",
            fontSize: "clamp(36px,8vw,82px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: -2,
            marginBottom: 8,
            textAlign: "center",
            color: T.text,
          }}
        >
          D.A.Y.O.
        </h1>
        <div
          style={{
            fontSize: "clamp(13px,2vw,20px)",
            color: amber,
            fontWeight: 300,
            marginBottom: 36,
            minHeight: "1.5em",
            textAlign: "center",
          }}
        >
          {typed}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "0.85em",
              background: amber,
              marginLeft: 3,
              verticalAlign: "middle",
              animation: "blink 1s infinite",
            }}
          />
        </div>

        <div
          style={{
            width: "100%",
            height: "clamp(280px,50vw,460px)",
            position: "relative",
            marginBottom: 20,
          }}
        >
          <OrbitalHero T={T} />
        </div>

        <p
          style={{
            color: T.muted,
            fontSize: 11,
            letterSpacing: 0.4,
            textAlign: "center",
            marginBottom: 28,
            opacity: 0.8,
          }}
        >
          Drag to spin the orbit &nbsp;·&nbsp; Click any node to explore
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            style={btnPrimary}
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, {
                background: T.accent,
                color: T.dark ? "#010409" : "#fff",
                boxShadow: `0 0 22px ${T.accent}66`,
                transform: "translateY(-2px)",
              });
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, {
                background: T.accentBg,
                color: T.accent,
                boxShadow: "none",
                transform: "none",
              });
            }}
          >
            View Projects
          </button>
          <button
            style={btnSecondary}
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, {
                borderColor: `${T.accent}66`,
                color: T.text,
              });
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, {
                borderColor: T.border,
                color: T.muted,
              });
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          animation: "float 2.2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            color: T.muted,
            fontSize: 8,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: 0.4,
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 30,
            background: `linear-gradient(to bottom,${T.muted}55,transparent)`,
          }}
        />
      </div>
    </section>
  );
}