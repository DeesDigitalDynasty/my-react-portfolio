import type { Theme } from "../types";
import { TiltCard } from "../components/TiltCard";
import { PROJECTS } from "../data/projectsData";

export function Projects({ T, visible }: { T: Theme; visible: boolean }) {
  const rv: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: "opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1)",
  };
  return (
    <section
      id="projects"
      style={{
        padding: "clamp(60px,8vw,80px) clamp(16px,5vw,36px)",
        borderTop: `1px solid ${T.border}`,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", ...rv }}>
        <div
          style={{
            fontSize: 9,
            letterSpacing: 4,
            color: T.accent,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          WHAT I'VE BUILT
        </div>
        <h2
          style={{
            fontFamily: "'Orbitron','Courier New',monospace",
            fontSize: "clamp(20px,4vw,34px)",
            fontWeight: 700,
            marginBottom: 12,
            color: T.text,
          }}
        >
          Featured Projects
        </h2>
        <p
          style={{
            color: T.muted,
            fontSize: 13,
            marginBottom: 38,
            lineHeight: 1.7,
          }}
        >
          Click any card to explore. Public projects open live — private ones are locked. 🔒
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 18,
          }}
        >
          {PROJECTS.map((p) => (
            <TiltCard key={p.title} p={p} T={T} />
          ))}
        </div>
      </div>
    </section>
  );
}