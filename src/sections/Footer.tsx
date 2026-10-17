import type { Theme } from "../types";

export function Footer({ T }: { T: Theme }) {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "clamp(20px,4vw,28px) clamp(16px,5vw,36px)",
        borderTop: `1px solid ${T.border}`,
        color: T.muted,
        fontSize: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontFamily: "'Orbitron','Courier New',monospace",
          color: T.accent,
          fontWeight: 900,
          letterSpacing: 3,
          opacity: 0.5,
        }}
      >
        D·A·Y·O
      </span>
      <span style={{ color: T.border }}>·</span>
      <span>
        Built with React by{" "}
        <span style={{ color: T.text, fontWeight: 600 }}>Oludayo Oluboyede</span>
      </span>
      <span style={{ color: T.border }}>·</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
}